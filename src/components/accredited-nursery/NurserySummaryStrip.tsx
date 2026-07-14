import { Leaf, Package, Sprout } from "lucide-react";
import { nurserySummary } from "@/data/accreditedNurseries";
import { KpiMetricsStrip } from "@/components/kpi-metrics/KpiMetricsStrip";
import type { KpiMetricItem } from "@/components/kpi-metrics/KpiMetricsStrip";

export function NurserySummaryStrip() {
  const { totalNurseries, totalSpecies, totalStock } = nurserySummary;

  const items: KpiMetricItem[] = [
    {
      tone: "tone-a",
      icon: Sprout,
      watermark: Sprout,
      label: "Total Nurseries",
      value: totalNurseries.toLocaleString("en-IN"),
      delta: "Pan-India accredited",
    },
    {
      tone: "tone-b",
      icon: Leaf,
      watermark: Leaf,
      label: "Total Species",
      value: totalSpecies.toLocaleString("en-IN"),
      delta: "Bamboo varieties covered",
    },
    {
      tone: "tone-d",
      icon: Package,
      watermark: Package,
      label: "Total Stock",
      value: totalStock.toLocaleString("en-IN"),
      delta: "Propagules available",
      valueAccent: true,
    },
  ];

  return (
    <KpiMetricsStrip
      title="Nursery Overview"
      meta="Accredited propagule network"
      ariaLabel="National nursery statistics"
      items={items}
      columns={3}
    />
  );
}
