import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { getChoroplethColor, getStateByGeoName } from "@/data/bambooStateStats";

const GEO_URL = "/geo/india-states.geojson";
const MAP_EXCLUDE = new Set(["Lakshadweep", "Andaman and Nicobar Islands"]);

const SIZES = {
  compact: { w: 220, h: 130, pad: 6 },
  hero: { w: 440, h: 260, pad: 8 },
} as const;

type GeoFeature = Feature<Geometry, GeoJsonProperties>;

/**
 * Mini choropleth for homepage stat card — same GeoJSON as dashboard
 * (Census 2011 / LGD boundaries via udit-001/india-maps-data, DataMeet-sourced).
 */
export function IndiaMapThumbnail({
  className,
  variant = "compact",
}: {
  className?: string;
  variant?: keyof typeof SIZES;
}) {
  const { w: W, h: H, pad } = SIZES[variant];
  const [geo, setGeo] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((data: FeatureCollection) => {
        if (!cancelled) setGeo(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const paths = useMemo(() => {
    if (!geo) return null;
    const features = geo.features.filter(
      (f) => !MAP_EXCLUDE.has((f.properties?.NAME_1 as string) ?? ""),
    ) as GeoFeature[];

    const collection: FeatureCollection = { type: "FeatureCollection", features };
    const projection = geoMercator().fitExtent(
      [[pad, pad], [W - pad, H - pad]],
      collection,
    );
    const pathGen = geoPath(projection);

    return features
      .map((feature) => {
        const geoName = (feature.properties?.NAME_1 as string) ?? "";
        const stats = getStateByGeoName(geoName);
        const d = pathGen(feature);
        if (!d) return null;
        return {
          key: geoName,
          d,
          fill: stats
            ? getChoroplethColor(stats.plantationAreaHa, stats.hasCoverage)
            : "#3d5c48",
        };
      })
      .filter(Boolean) as { key: string; d: string; fill: string }[];
  }, [geo, W, H, pad]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="impact-map-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.28 0.07 220)" />
          <stop offset="100%" stopColor="oklch(0.22 0.08 152)" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#impact-map-sky)" />
      {paths ? (
        paths.map((p) => (
          <path
            key={p.key}
            d={p.d}
            fill={p.fill}
            stroke="oklch(1 0 0 / 0.22)"
            strokeWidth={variant === "hero" ? 0.5 : 0.35}
          />
        ))
      ) : (
        <text
          x={W / 2}
          y={H / 2}
          textAnchor="middle"
          fill="oklch(0.9 0.02 110 / 0.5)"
          fontSize="10"
        >
          Loading…
        </text>
      )}
    </svg>
  );
}
