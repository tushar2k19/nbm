import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  TrendingUp,
  MapPin,
  Sprout,
  Leaf,
  TreePine,
  Package,
  Mountain,
} from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { IndiaBambooMap } from "@/components/dashboard/IndiaBambooMap";
import { StateMetricCard } from "@/components/dashboard/StateMetricCard";
import { StateBarCharts } from "@/components/dashboard/StateBarCharts";
import {
  implementingStates,
  nationalTotals,
  IMPLEMENTING_STATE_COUNT,
  type BambooStateStats,
} from "@/data/bambooStateStats";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | National Bamboo Mission" },
      {
        name: "description",
        content: "Live dashboard of NBM physical and financial progress across States and UTs.",
      },
    ],
  }),
  component: DashboardPage,
});

const kpis = [
  {
    icon: Sprout,
    label: "Total Plantations",
    value: nationalTotals.plantations.toLocaleString("en-IN"),
    delta: "+12% vs last year",
    watermark: Sprout,
  },
  {
    icon: Mountain,
    label: "Total Area (Ha)",
    value: nationalTotals.plantationAreaHa.toLocaleString("en-IN", { maximumFractionDigits: 2 }),
    delta: `Across ${IMPLEMENTING_STATE_COUNT} states`,
    watermark: MapPin,
  },
  {
    icon: Leaf,
    label: "Total Species",
    value: String(nationalTotals.species),
    delta: "Categorized varieties",
    watermark: TreePine,
  },
  {
    icon: Package,
    label: "Total Culms/Plants",
    value: nationalTotals.culmsPlants.toLocaleString("en-IN"),
    delta: "Active stock",
    watermark: Package,
  },
];

function DashboardPage() {
  const [selected, setSelected] = useState<BambooStateStats | null>(null);

  const tableStates = [...implementingStates].sort(
    (a, b) => b.plantationAreaHa - a.plantationAreaHa,
  );

  return (
    <>
      <PageHero
        title="Dashboard"
        subtitle="Real-time view of physical and financial progress under the National Bamboo Mission."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 space-y-10">
        {/* KPI row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="relative overflow-hidden bg-card border border-border rounded-lg p-5 shadow-soft card-lift"
            >
              <k.watermark className="absolute -right-2 -bottom-2 h-20 w-20 text-primary/5" />
              <div className="flex items-center gap-2 text-saffron">
                <k.icon className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">{k.label}</span>
              </div>
              <div className="mt-2 text-2xl font-display font-bold text-primary">{k.value}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" /> {k.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Map hero */}
        <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden bamboo-texture-bg">
          <div className="bg-primary text-primary-foreground px-5 py-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-saffron" />
              <span className="font-semibold font-display">Bamboo Coverage Across India</span>
            </div>
            <span className="text-xs opacity-80">FY 2025-26 · Hover states for metrics</span>
          </div>
          <div className="grid gap-6 p-5 lg:grid-cols-[1fr_320px]">
            <IndiaBambooMap
              selectedId={selected?.id ?? null}
              highlightedId={selected?.id ?? null}
              onSelect={setSelected}
            />
            <div className="hidden lg:block">
              <StateMetricCard state={selected} variant="panel" />
            </div>
          </div>
          <p className="px-5 pb-4 text-[10px] text-muted-foreground">
            Data source: NBM-MIS portal · Updated quarterly by State Bamboo Missions.
          </p>
        </div>

        {/* Bar charts */}
        <StateBarCharts />

        {/* State table synced with map */}
        <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
          <div className="bg-primary text-primary-foreground px-5 py-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-saffron" />
            <span className="font-semibold">State-wise Progress (FY 2025-26)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-primary">State / UT</th>
                  <th className="px-4 py-3 font-semibold text-primary">Plantations</th>
                  <th className="px-4 py-3 font-semibold text-primary">Plantation Area</th>
                  <th className="px-4 py-3 font-semibold text-primary">Nurseries</th>
                  <th className="px-4 py-3 font-semibold text-primary">Processing Units</th>
                  <th className="px-4 py-3 font-semibold text-primary">Beneficiaries</th>
                  <th className="px-4 py-3 font-semibold text-primary">Funds Utilised</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tableStates.map((s) => (
                  <tr
                    key={s.id}
                    className={`hover:bg-secondary/40 cursor-pointer transition ${
                      selected?.id === s.id ? "bg-saffron/10 ring-1 ring-inset ring-saffron/30" : ""
                    }`}
                    onMouseEnter={() => setSelected(s)}
                    onClick={() => setSelected(s)}
                  >
                    <td className="px-4 py-3 font-medium">{s.name}</td>
                    <td className="px-4 py-3">{s.plantations.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3">{s.plantationAreaHa.toLocaleString("en-IN")} ha</td>
                    <td className="px-4 py-3">{s.nurseries}</td>
                    <td className="px-4 py-3">{s.processingUnits}</td>
                    <td className="px-4 py-3">{s.beneficiaries.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3">₹{s.fundsCr} Cr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Data source: NBM-MIS portal · Updated quarterly by State Bamboo Missions.
        </div>
      </section>
    </>
  );
}
