import {
  Leaf,
  MapPin,
  Mountain,
  Package,
  Sprout,
  TreePine,
} from "lucide-react";
import {
  IMPLEMENTING_STATE_COUNT,
  nationalTotals,
} from "@/data/bambooStateStats";
import { KpiMetricsStrip } from "@/components/kpi-metrics/KpiMetricsStrip";
import type { KpiMetricItem } from "@/components/kpi-metrics/KpiMetricsStrip";

const kpiItems: KpiMetricItem[] = [
  {
    id: "kpi-plantations",
    tone: "tone-a",
    icon: Sprout,
    watermark: Sprout,
    label: "Total Plantations",
    value: nationalTotals.plantations.toLocaleString("en-IN"),
    delta: "+12% vs last year",
    trend: true,
  },
  {
    id: "area",
    tone: "tone-b",
    icon: Mountain,
    watermark: MapPin,
    label: "Total Area (Ha)",
    value: nationalTotals.plantationAreaHa.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    }),
    delta: `Across ${IMPLEMENTING_STATE_COUNT} states`,
  },
  {
    id: "species",
    tone: "tone-c",
    icon: Leaf,
    watermark: TreePine,
    label: "Total Species",
    value: String(nationalTotals.species),
    delta: "Categorized varieties",
  },
  {
    id: "culms",
    tone: "tone-d",
    icon: Package,
    watermark: Package,
    label: "Total Culms/Plants",
    value: nationalTotals.culmsPlants.toLocaleString("en-IN"),
    delta: "Active stock",
    valueAccent: true,
  },
];

export function DashboardKpiStrip() {
  return (
    <KpiMetricsStrip
      title="National Overview"
      meta="FY 2025-26 · Physical progress"
      ariaLabel="National bamboo mission statistics"
      items={kpiItems}
    />
  );
}
