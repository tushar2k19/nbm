import { Link } from "@tanstack/react-router";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { nurserySummary, topNurseriesByStock } from "@/data/accreditedNurseries";
import { implementingStates, topStatesBy } from "@/data/bambooStateStats";
import { ArrowRight, Flower2, Maximize2 } from "lucide-react";

function formatStock(stock: number) {
  if (stock >= 1_000_000) return `${(stock / 1_000_000).toFixed(2)}M`;
  if (stock >= 1_000) return `${(stock / 1_000).toFixed(1)}K`;
  return stock.toLocaleString("en-IN");
}

export function AccreditedNurseryPreview() {
  const stateData = topStatesBy("nurseries", 7).map((s) => ({
    name: s.name,
    value: s.nurseries,
  }));
  const topNurseries = topNurseriesByStock(5);
  const statesWithNurseries = implementingStates.filter((s) => s.nurseries > 0).length;
  const { totalNurseries, totalSpecies, totalStock } = nurserySummary;

  const chartConfig = { value: { label: "Nurseries", color: "oklch(0.38 0.11 150)" } };

  return (
    <div
      id="nurseries"
      className="an-preview scroll-mt-28 bg-card border border-border rounded-lg shadow-soft overflow-hidden"
    >
      <div className="h-1 bg-primary" />
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Flower2 className="h-4 w-4 text-primary" />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-primary">Accredited Nurseries</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            MIS registry totals · State-wise nursery distribution · Full directory for records
          </p>
        </div>
        <Link
          to="/accredited-nursery"
          className="an-expand-btn shrink-0"
          title="View full accredited nursery directory"
          aria-label="View full accredited nursery directory"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="an-preview__grid">
        <div className="an-preview__left">
          <div className="an-preview__kpis">
            <div className="an-preview__kpi">
              <div className="an-preview__kpi-value">{totalNurseries.toLocaleString("en-IN")}</div>
              <div className="an-preview__kpi-label">Total Nurseries</div>
            </div>
            <div className="an-preview__kpi">
              <div className="an-preview__kpi-value">{totalSpecies}</div>
              <div className="an-preview__kpi-label">Total Species</div>
            </div>
            <div className="an-preview__kpi">
              <div className="an-preview__kpi-value">{formatStock(totalStock)}</div>
              <div className="an-preview__kpi-label">Propagule Stock</div>
            </div>
            <div className="an-preview__kpi">
              <div className="an-preview__kpi-value">{statesWithNurseries}</div>
              <div className="an-preview__kpi-label">States Covered</div>
            </div>
          </div>

          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={stateData} layout="vertical" margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
              <defs>
                <linearGradient id="nurseryPreviewGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.38 0.11 150)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.12 140)" />
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
                  <Cell key={i} fill="url(#nurseryPreviewGrad)" />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          <p className="text-[10px] text-muted-foreground mt-2">Top states by accredited nursery count</p>
        </div>

        <div className="an-preview__right">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">
            Top Nurseries by Stock
          </p>
          <ul className="an-preview__list">
            {topNurseries.map((n) => (
              <li key={n.id} className="an-preview__item">
                <div>
                  <div className="an-preview__item-name">{n.name}</div>
                  <div className="an-preview__item-meta">
                    {n.state} · {n.district} · {n.species.length} species
                  </div>
                </div>
                <div className="an-preview__item-stock">{formatStock(n.totalStock)}</div>
              </li>
            ))}
          </ul>
          <Link to="/accredited-nursery" className="an-preview__footer-link">
            View MIS nursery directory
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
