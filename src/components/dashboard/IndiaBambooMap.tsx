import { useCallback, useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import {
  getChoroplethColor,
  getStateByGeoName,
  getStateById,
  IMPLEMENTING_STATE_COUNT,
  implementingStates,
  type BambooStateStats,
} from "@/data/bambooStateStats";
import { StateMetricCard } from "@/components/dashboard/StateMetricCard";

const GEO_URL = "/geo/india-states.geojson";

/** Island UTs excluded from map viewport — they distort mainland scale when included */
const MAP_EXCLUDE = new Set(["Lakshadweep", "Andaman and Nicobar Islands"]);

const MAP_WIDTH = 720;
const MAP_HEIGHT = 580;

type GeoFeature = Feature<Geometry, GeoJsonProperties>;

function MapSvg({
  features,
  width,
  height,
  padding = 20,
  selectedId,
  highlightedId,
  hoveredId,
  onGeoEnter,
  onGeoMove,
  onGeoLeave,
  onGeoClick,
}: {
  features: GeoFeature[];
  width: number;
  height: number;
  padding?: number;
  selectedId: string | null;
  highlightedId?: string | null;
  hoveredId: string | null;
  onGeoEnter: (name: string, evt: React.MouseEvent) => void;
  onGeoMove: (evt: React.MouseEvent) => void;
  onGeoLeave: () => void;
  onGeoClick: (name: string) => void;
}) {
  const projection = useMemo(
    () =>
      geoMercator().fitExtent(
        [
          [padding, padding],
          [width - padding, height - padding],
        ],
        { type: "FeatureCollection", features },
      ),
    [features, width, height, padding],
  );

  const pathGen = useMemo(() => geoPath(projection), [projection]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" className="block">
      {features.map((feature) => {
        const geoName = (feature.properties?.NAME_1 as string) ?? "";
        const stats = getStateByGeoName(geoName);
        const d = pathGen(feature);
        if (!d) return null;
        const isActive =
          stats?.id === selectedId || stats?.id === highlightedId || stats?.id === hoveredId;
        const fill =
          stats?.id === hoveredId
            ? stats.hasCoverage
              ? "#e8740a"
              : "#c5d0c8"
            : stats
              ? getChoroplethColor(stats.plantationAreaHa, stats.hasCoverage)
              : "#e2e8e4";

        return (
          <path
            key={geoName}
            d={d}
            fill={fill}
            stroke={isActive ? "#e8740a" : "#ffffff"}
            strokeWidth={isActive ? 1.5 : 0.6}
            className="transition-colors duration-150 cursor-pointer"
            onMouseEnter={(evt) => onGeoEnter(geoName, evt)}
            onMouseMove={onGeoMove}
            onMouseLeave={onGeoLeave}
            onClick={() => onGeoClick(geoName)}
            aria-label={geoName}
          />
        );
      })}
    </svg>
  );
}

type IndiaBambooMapProps = {
  selectedId: string | null;
  onSelect: (state: BambooStateStats | null) => void;
  highlightedId?: string | null;
};

export function IndiaBambooMap({ selectedId, onSelect, highlightedId }: IndiaBambooMapProps) {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [hovered, setHovered] = useState<BambooStateStats | null>(null);
  const [hoverGeoName, setHoverGeoName] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`GeoJSON fetch failed: ${r.status}`);
        return r.json();
      })
      .then((d: FeatureCollection) => setGeoData(d))
      .catch(console.error);
  }, []);

  const mapFeatures = useMemo(
    () =>
      (geoData?.features.filter(
        (f) => !MAP_EXCLUDE.has((f.properties?.NAME_1 as string) ?? ""),
      ) ?? []) as GeoFeature[],
    [geoData],
  );

  const maxArea = useMemo(
    () => Math.max(...implementingStates.map((s) => s.plantationAreaHa)),
    [],
  );

  const handleGeoEnter = useCallback(
    (geoName: string, evt: React.MouseEvent) => {
      if (isTouch) return;
      const stats = getStateByGeoName(geoName);
      setHovered(stats);
      setHoverGeoName(geoName);
      setTooltipPos({ x: evt.clientX, y: evt.clientY });
      onSelect(stats);
    },
    [isTouch, onSelect],
  );

  const handleGeoMove = useCallback((evt: React.MouseEvent) => {
    setTooltipPos({ x: evt.clientX, y: evt.clientY });
  }, []);

  const handleGeoLeave = useCallback(() => {
    if (isTouch) return;
    setHovered(null);
    setHoverGeoName(null);
  }, [isTouch]);

  const handleGeoClick = useCallback(
    (geoName: string) => {
      setIsTouch(true);
      const stats = getStateByGeoName(geoName);
      onSelect(stats);
      setHovered(stats);
      setHoverGeoName(geoName);
    },
    [onSelect],
  );

  const activeState = hovered ?? (selectedId ? getStateById(selectedId) ?? null : null);
  const hoveredId = hovered?.id ?? null;

  if (!geoData) {
    return (
      <div className="flex h-[400px] items-center justify-center text-sm text-muted-foreground">
        Loading map…
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mx-auto" style={{ maxWidth: MAP_WIDTH }}>
        <MapSvg
          features={mapFeatures}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          selectedId={selectedId}
          highlightedId={highlightedId}
          hoveredId={hoveredId}
          onGeoEnter={handleGeoEnter}
          onGeoMove={handleGeoMove}
          onGeoLeave={handleGeoLeave}
          onGeoClick={handleGeoClick}
        />
      </div>

      {hovered && !isTouch && typeof window !== "undefined" && (
        <StateMetricCard
          state={hovered}
          geoName={hoverGeoName ?? undefined}
          variant="floating"
          style={{
            left: Math.min(tooltipPos.x + 16, window.innerWidth - 300),
            top: Math.min(tooltipPos.y + 16, window.innerHeight - 320),
          }}
        />
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">
          {IMPLEMENTING_STATE_COUNT} states with NBM coverage highlighted
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-6 rounded-sm" style={{ background: getChoroplethColor(maxArea * 0.2, true) }} />
          Low
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-6 rounded-sm" style={{ background: getChoroplethColor(maxArea * 0.5, true) }} />
          Medium
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-6 rounded-sm" style={{ background: getChoroplethColor(maxArea, true) }} />
          High
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-6 rounded-sm bg-[#e2e8e4] border border-border" />
          No coverage
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-6 rounded-sm bg-[#e8740a]" />
          Hovered
        </span>
      </div>

      <p className="mt-2 text-[10px] text-muted-foreground leading-relaxed">
        {IMPLEMENTING_STATE_COUNT} states with active bamboo coverage under NBM. Jammu &amp; Kashmir
        and Ladakh shown as separate UTs. Andaman &amp; Nicobar and Lakshadweep omitted from map
        viewport due to scale.
      </p>

      <div className="mt-4 lg:hidden">
        <StateMetricCard state={activeState} geoName={hoverGeoName ?? undefined} variant="panel" />
      </div>
    </div>
  );
}
