import { Leaf, MapPin, Package, Sprout, TreePine } from "lucide-react";
import { plantationSummary } from "@/data/bambooPlantations";
import { KpiMetricsStrip } from "@/components/kpi-metrics/KpiMetricsStrip";
import type { KpiMetricItem } from "@/components/kpi-metrics/KpiMetricsStrip";

export function PlantationSummaryStrip() {
  const { totalPlantations, totalAreaHa, totalSpecies, totalCulmsPlants } = plantationSummary;

  const items: KpiMetricItem[] = [
    {
      tone: "tone-a",
      icon: Sprout,
      watermark: Sprout,
      label: "Total Plantations",
      value: totalPlantations.toLocaleString("en-IN"),
      delta: "Pan-India registered",
    },
    {
      tone: "tone-b",
      icon: MapPin,
      watermark: MapPin,
      label: "Total Area",
      value: `${totalAreaHa.toLocaleString("en-IN", { maximumFractionDigits: 2 })} Ha`,
      delta: "Combined plantation area",
    },
    {
      tone: "tone-c",
      icon: Leaf,
      watermark: TreePine,
      label: "Total Species",
      value: totalSpecies.toLocaleString("en-IN"),
      delta: "Bamboo varieties planted",
    },
    {
      tone: "tone-d",
      icon: TreePine,
      watermark: Package,
      label: "Total Culms/Plants",
      value: totalCulmsPlants.toLocaleString("en-IN"),
      delta: "Propagules across plantations",
      valueAccent: true,
    },
  ];

  return (
    <KpiMetricsStrip
      title="Plantation Overview"
      meta="Pan-India MIS registry"
      ariaLabel="National bamboo plantation statistics"
      items={items}
    />
  );
}
