import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { IndiaBambooMap } from "@/components/dashboard/IndiaBambooMap";
import { DashboardKpiStrip } from "@/components/dashboard/DashboardKpiStrip";
import { StateMetricCard } from "@/components/dashboard/StateMetricCard";
import { StateBarCharts } from "@/components/dashboard/StateBarCharts";
import { BambooPlantationPreview } from "@/components/dashboard/BambooPlantationPreview";
import { AccreditedNurseryPreview } from "@/components/dashboard/AccreditedNurseryPreview";
import { AgarbattiStickPreview } from "@/components/dashboard/AgarbattiStickPreview";
import { useHashScroll } from "@/hooks/useHashScroll";
import {
  implementingStates,
  type BambooStateStats,
} from "@/data/bambooStateStats";
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | National Bamboo Mission" },
      {
        name: "description",
        content: "Latest NBM physical and financial progress across States and UTs.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [selected, setSelected] = useState<BambooStateStats | null>(null);
  useHashScroll();

  const tableStates = [...implementingStates].sort(
    (a, b) => b.plantationAreaHa - a.plantationAreaHa,
  );

  return (
    <>
      <PageHero
        title="Dashboard"
        subtitle="Latest physical and financial progress under the National Bamboo Mission."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 space-y-10">
        <DashboardKpiStrip />

        {/* Map hero */}
        <div
          id="map"
          className="scroll-mt-28 bg-card border border-border rounded-lg shadow-soft overflow-hidden bamboo-texture-bg"
        >
          <div className="bg-primary text-primary-foreground px-5 py-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-saffron" />
              <span className="font-semibold font-display">Bamboo Coverage Across India</span>
            </div>
            <span className="text-xs opacity-80">FY 2025-26 · Focus a state for metrics</span>
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
            Data source: NBM-MIS portal · Figures based on latest available state reports. Live integration in Phase 2.
          </p>
        </div>

        {/* Bar charts */}
        <StateBarCharts />

        {/* Bamboo plantation preview */}
        <BambooPlantationPreview />

        {/* Accredited nurseries preview */}
        <AccreditedNurseryPreview />

        {/* Agarbatti stick preview */}
        <AgarbattiStickPreview />

        {/* State table synced with map */}
        <div
          id="states"
          className="scroll-mt-28 bg-card border border-border rounded-lg shadow-soft overflow-hidden"
        >
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
                      selected?.id === s.id ? "bg-primary/10 ring-1 ring-inset ring-primary/35" : ""
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
          Data source: NBM-MIS portal · Figures based on latest available state reports. Live integration in Phase 2.
        </div>
      </section>
    </>
  );
}
