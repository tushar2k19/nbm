import { Building2, Factory, Package, TrendingUp } from "lucide-react";
import { agarbattiSummary } from "@/data/agarbattiStickUnits";
import { KpiMetricsStrip } from "@/components/kpi-metrics/KpiMetricsStrip";
import type { KpiMetricItem } from "@/components/kpi-metrics/KpiMetricsStrip";

export function AgarbattiSummaryStrip() {
  const { totalEnterprises, enterprisesRunning, annualCapacityMt, actualProductionMt } =
    agarbattiSummary;

  const items: KpiMetricItem[] = [
    {
      tone: "tone-a",
      icon: Building2,
      watermark: Building2,
      label: "Total Enterprises",
      value: totalEnterprises.toLocaleString("en-IN"),
      delta: "Registered stick-making units",
    },
    {
      tone: "tone-b",
      icon: Factory,
      watermark: Factory,
      label: "Enterprises Running",
      value: enterprisesRunning.toLocaleString("en-IN"),
      delta: "Currently operational",
    },
    {
      tone: "tone-c",
      icon: Package,
      watermark: Package,
      label: "Annual Capacity",
      value: `${annualCapacityMt.toLocaleString("en-IN")} MT`,
      delta: "Combined production capacity",
    },
    {
      tone: "tone-d",
      icon: TrendingUp,
      watermark: TrendingUp,
      label: "Actual Production",
      value: `${actualProductionMt.toLocaleString("en-IN")} MT`,
      delta: "Reported output",
      valueAccent: true,
    },
  ];

  return (
    <KpiMetricsStrip
      title="Enterprise Overview"
      meta="Stick manufacturing units"
      ariaLabel="National agarbatti stick statistics"
      items={items}
    />
  );
}
