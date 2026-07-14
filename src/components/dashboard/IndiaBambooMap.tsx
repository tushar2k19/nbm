import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import { zoom, zoomIdentity, type ZoomBehavior } from "d3-zoom";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { Home, ZoomIn, ZoomOut } from "lucide-react";
import {
  getChoroplethColor,
  getStateByGeoName,
  getStateById,
  IMPLEMENTING_STATE_COUNT,
  implementingStates,
  type BambooStateStats,
} from "@/data/bambooStateStats";
import { StateMetricCard } from "@/components/dashboard/StateMetricCard";
import {
  MAP_FOCUS_FILL,
  MAP_FOCUS_FILL_MUTED,
  MAP_FOCUS_STROKE,
  MAP_FOCUS_STROKE_WIDTH,
  MapFocusDefs,
  MapFocusLegendSwatch,
} from "@/components/dashboard/mapFocusStyle";

const GEO_URL = "/geo/india-states.geojson";

/** Island UTs excluded from map viewport — they distort mainland scale when included */
const MAP_EXCLUDE = new Set(["Lakshadweep", "Andaman and Nicobar Islands"]);

const MAP_WIDTH = 720;
const MAP_HEIGHT = 580;
const ZOOM_MIN = 1;
const ZOOM_MAX = 8;

type GeoFeature = Feature<Geometry, GeoJsonProperties>;

function MapZoomControls({
  onZoomIn,
  onZoomOut,
  onReset,
  canReset,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  canReset: boolean;
}) {
  const btnClass =
    "flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/95 text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="absolute top-2 right-2 z-10 flex flex-col gap-1" role="group" aria-label="Map zoom controls">
      <button type="button" className={btnClass} onClick={onZoomIn} aria-label="Zoom in">
        <ZoomIn className="h-4 w-4" aria-hidden />
      </button>
      <button type="button" className={btnClass} onClick={onZoomOut} aria-label="Zoom out">
        <ZoomOut className="h-4 w-4" aria-hidden />
      </button>
      <button
        type="button"
        className={btnClass}
        onClick={onReset}
        disabled={!canReset}
        aria-label="Reset zoom"
      >
        <Home className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

function MapSvg({
  features,
  width,
  height,
  padding = 20,
  focusId,
  onGeoEnter,
  onGeoMove,
  onGeoLeave,
  onGeoClick,
}: {
  features: GeoFeature[];
  width: number;
  height: number;
  padding?: number;
  focusId: string | null;
  onGeoEnter: (name: string, evt: React.MouseEvent) => void;
  onGeoMove: (evt: React.MouseEvent) => void;
  onGeoLeave: () => void;
  onGeoClick: (name: string) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const transformRef = useRef(zoomIdentity);
  const didDragRef = useRef(false);
  const [canReset, setCanReset] = useState(false);

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

  const paths = useMemo(() => {
    return features
      .map((feature) => {
        const geoName = (feature.properties?.NAME_1 as string) ?? "";
        const stats = getStateByGeoName(geoName);
        const d = pathGen(feature);
        if (!d) return null;

        const isFocused = stats?.id === focusId;
        const fill = isFocused
          ? stats?.hasCoverage
            ? MAP_FOCUS_FILL
            : MAP_FOCUS_FILL_MUTED
          : stats
            ? getChoroplethColor(stats.plantationAreaHa, stats.hasCoverage)
            : "#e2e8e4";

        return { geoName, d, stats, isFocused, fill };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);
  }, [features, pathGen, focusId]);

  const basePaths = paths.filter((p) => !p.isFocused);
  const focusPaths = paths.filter((p) => p.isFocused);

  useEffect(() => {
    const svgEl = svgRef.current;
    const gEl = gRef.current;
    if (!svgEl || !gEl) return;

    const svg = select(svgEl);
    const g = select(gEl);

    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([ZOOM_MIN, ZOOM_MAX])
      .filter((event) => {
        if (event.type === "wheel") return true;
        const target = event.target as Element | null;
        const onPath = target?.tagName === "path";
        if (onPath && transformRef.current.k <= 1.01) return false;
        return (
          event.type === "mousedown" ||
          event.type === "touchstart" ||
          event.type === "mousemove" ||
          event.type === "touchmove"
        );
      })
      .on("start", () => {
        didDragRef.current = false;
      })
      .on("zoom", (event) => {
        const sourceType = event.sourceEvent?.type;
        if (
          sourceType === "mousemove" ||
          sourceType === "touchmove" ||
          sourceType === "pointermove"
        ) {
          didDragRef.current = true;
        }
        transformRef.current = event.transform;
        g.attr("transform", event.transform.toString());
        const moved =
          Math.abs(event.transform.k - 1) > 0.01 ||
          Math.abs(event.transform.x) > 0.5 ||
          Math.abs(event.transform.y) > 0.5;
        setCanReset(moved);
      });

    zoomRef.current = zoomBehavior;
    svg.call(zoomBehavior);

    return () => {
      svg.on(".zoom", null);
    };
  }, [features, width, height]);

  const handleZoomIn = useCallback(() => {
    const svgEl = svgRef.current;
    const zoomBehavior = zoomRef.current;
    if (!svgEl || !zoomBehavior) return;
    select(svgEl).transition().duration(200).call(zoomBehavior.scaleBy, 1.35);
  }, []);

  const handleZoomOut = useCallback(() => {
    const svgEl = svgRef.current;
    const zoomBehavior = zoomRef.current;
    if (!svgEl || !zoomBehavior) return;
    select(svgEl).transition().duration(200).call(zoomBehavior.scaleBy, 1 / 1.35);
  }, []);

  const handleResetZoom = useCallback(() => {
    const svgEl = svgRef.current;
    const zoomBehavior = zoomRef.current;
    if (!svgEl || !zoomBehavior) return;
    select(svgEl).transition().duration(250).call(zoomBehavior.transform, zoomIdentity);
    transformRef.current = zoomIdentity;
    setCanReset(false);
  }, []);

  const handlePathClick = useCallback(
    (geoName: string) => {
      if (didDragRef.current) return;
      onGeoClick(geoName);
    },
    [onGeoClick],
  );

  const renderPath = (p: (typeof paths)[number]) => (
    <path
      key={p.geoName}
      d={p.d}
      fill={p.fill}
      stroke={p.isFocused ? MAP_FOCUS_STROKE : "#ffffff"}
      strokeWidth={p.isFocused ? MAP_FOCUS_STROKE_WIDTH : 0.6}
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      filter={p.isFocused ? "url(#nbm-state-focus-halo)" : undefined}
      className="transition-[fill,stroke,stroke-width] duration-200 cursor-pointer"
      style={p.isFocused ? { paintOrder: "stroke fill" } : undefined}
      onMouseEnter={(evt) => onGeoEnter(p.geoName, evt)}
      onMouseMove={onGeoMove}
      onMouseLeave={onGeoLeave}
      onClick={() => handlePathClick(p.geoName)}
      aria-label={p.geoName}
      aria-current={p.isFocused ? "true" : undefined}
    />
  );

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-[#f8fafc]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="auto"
        className="block touch-none cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="India map showing NBM bamboo coverage by state. Scroll to zoom, drag to pan when zoomed in."
      >
        <g ref={gRef}>
          {basePaths.map(renderPath)}
          {focusPaths.map(renderPath)}
        </g>
      </svg>

      <MapZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleResetZoom}
        canReset={canReset}
      />

      <p className="pointer-events-none absolute bottom-2 left-2 rounded bg-background/80 px-2 py-0.5 text-[10px] text-muted-foreground shadow-sm">
        Scroll to zoom · Drag to pan when zoomed
      </p>
    </div>
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

  const hoveredId = hovered?.id ?? null;
  const focusId = hoveredId ?? selectedId ?? highlightedId ?? null;
  const activeState = hovered ?? (selectedId ? getStateById(selectedId) ?? null : null);

  if (!geoData) {
    return (
      <div className="flex h-[400px] items-center justify-center text-sm text-muted-foreground">
        Loading map…
      </div>
    );
  }

  return (
    <div className="relative">
      <svg aria-hidden className="absolute w-0 h-0 overflow-hidden pointer-events-none">
        <MapFocusDefs />
      </svg>

      <div className="mx-auto" style={{ maxWidth: MAP_WIDTH }}>
        <MapSvg
          features={mapFeatures}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          focusId={focusId}
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
          <MapFocusLegendSwatch />
          On focus
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
