import { Link } from "@tanstack/react-router";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { nationalTotals, topStatesBy } from "@/data/bambooStateStats";
import { ArrowRight, Maximize2, TreePine } from "lucide-react";

export function BambooPlantationPreview() {
  const stateData = topStatesBy("plantations", 7).map((s) => ({
    name: s.name,
    value: s.plantations,
  }));
  const topStates = topStatesBy("plantations", 5);

  const chartConfig = { value: { label: "Plantations", color: "oklch(0.55 0.08 60)" } };

  return (
    <div
      id="plantations"
      className="bp-preview scroll-mt-28 bg-card border border-border rounded-lg shadow-soft overflow-hidden"
    >
      <div className="h-1 bg-bark" />
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <TreePine className="h-4 w-4 text-primary" />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-primary">Bamboo Plantation</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            State-wise summary · FY 2025-26 · Record-level MIS data on full directory
          </p>
        </div>
        <Link
          to="/plantation"
          className="an-expand-btn shrink-0"
          title="View full bamboo plantation directory"
          aria-label="View full bamboo plantation directory"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="bp-preview__grid">
        <div className="bp-preview__left">
          <div className="bp-preview__kpis">
            <div className="bp-preview__kpi">
              <div className="bp-preview__kpi-value">
                {nationalTotals.plantations.toLocaleString("en-IN")}
              </div>
              <div className="bp-preview__kpi-label">Total Plantations</div>
            </div>
            <div className="bp-preview__kpi">
              <div className="bp-preview__kpi-value">
                {nationalTotals.plantationAreaHa.toLocaleString("en-IN", { maximumFractionDigits: 0 })} Ha
              </div>
              <div className="bp-preview__kpi-label">Total Area</div>
            </div>
            <div className="bp-preview__kpi">
              <div className="bp-preview__kpi-value">{nationalTotals.species}</div>
              <div className="bp-preview__kpi-label">Total Species</div>
            </div>
            <div className="bp-preview__kpi">
              <div className="bp-preview__kpi-value">
                {(nationalTotals.culmsPlants / 1_000_000).toFixed(2)}M
              </div>
              <div className="bp-preview__kpi-label">Total Culms</div>
            </div>
          </div>

          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={stateData} layout="vertical" margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
              <defs>
                <linearGradient id="plantationPreviewGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.55 0.08 60)" />
                  <stop offset="100%" stopColor="oklch(0.78 0.06 90)" />
                </linearGradient>
              </defs>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={108}
                tick={{ fontSize: 11, fill: "oklch(0.45 0.02 150)" }}
                axisLine={false}
                tickLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
                {stateData.map((_, i) => (
                  <Cell key={i} fill="url(#plantationPreviewGrad)" />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          <p className="text-[10px] text-muted-foreground mt-2">
            Top states by plantation count
          </p>
        </div>

        <div className="bp-preview__right">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">
            Top States by Plantation Count
          </p>
          <ul className="bp-preview__list">
            {topStates.map((s) => (
              <li key={s.id} className="bp-preview__item">
                <div>
                  <div className="bp-preview__item-name">{s.name}</div>
                  <div className="bp-preview__item-meta">
                    {s.plantationAreaHa.toLocaleString("en-IN")} Ha · {s.culmsPlants.toLocaleString("en-IN")} culms
                  </div>
                </div>
                <div className="bp-preview__item-area">
                  {s.plantations.toLocaleString("en-IN")}
                </div>
              </li>
            ))}
          </ul>
          <Link to="/plantation" className="bp-preview__footer-link">
            View MIS plantation directory
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
