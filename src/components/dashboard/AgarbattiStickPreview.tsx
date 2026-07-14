import { Link } from "@tanstack/react-router";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  agarbattiSummary,
  topStatesByAgarbattiCapacity,
  topUnitsByCapacity,
} from "@/data/agarbattiStickUnits";
import { ArrowRight, Flame, Maximize2 } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "Running"
      ? "as-badge--running"
      : status === "Closed"
        ? "as-badge--closed"
        : "as-badge--setup";
  return <span className={`as-badge ${cls}`}>{status}</span>;
}

export function AgarbattiStickPreview() {
  const stateData = topStatesByAgarbattiCapacity(7);
  const topUnits = topUnitsByCapacity(5);
  const { totalEnterprises, enterprisesRunning, annualCapacityMt, actualProductionMt } =
    agarbattiSummary;

  const chartConfig = { value: { label: "Annual Capacity (MT)", color: "oklch(0.72 0.14 80)" } };

  return (
    <div
      id="agarbatti-stick"
      className="as-preview scroll-mt-28 bg-card border border-border rounded-lg shadow-soft overflow-hidden"
    >
      <div className="h-1 bg-saffron" />
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Flame className="h-4 w-4 text-saffron" />
        <h3 className="font-display font-bold text-primary">Agarbatti Stick Production</h3>
        <Link
          to="/agarbatti-stick"
          className="an-expand-btn ml-auto"
          title="View full agarbatti stick directory"
          aria-label="View full agarbatti stick directory"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="as-preview__grid">
        {/* Left: KPIs + state chart */}
        <div className="as-preview__left">
          <div className="as-preview__kpis">
            <div className="as-preview__kpi">
              <div className="as-preview__kpi-value">{totalEnterprises}</div>
              <div className="as-preview__kpi-label">Total Enterprises</div>
            </div>
            <div className="as-preview__kpi">
              <div className="as-preview__kpi-value">{enterprisesRunning}</div>
              <div className="as-preview__kpi-label">Running</div>
            </div>
            <div className="as-preview__kpi">
              <div className="as-preview__kpi-value">{annualCapacityMt} MT</div>
              <div className="as-preview__kpi-label">Annual Capacity</div>
            </div>
            <div className="as-preview__kpi">
              <div className="as-preview__kpi-value">{actualProductionMt} MT</div>
              <div className="as-preview__kpi-label">Actual Production</div>
            </div>
          </div>

          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={stateData} layout="vertical" margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
              <defs>
                <linearGradient id="agarbattiGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.72 0.14 80)" />
                  <stop offset="100%" stopColor="oklch(0.85 0.10 90)" />
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
                  <Cell key={i} fill="url(#agarbattiGrad)" />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          <p className="text-[10px] text-muted-foreground mt-2">
            Top states by annual capacity (MT)
          </p>
        </div>

        {/* Right: top units list */}
        <div className="as-preview__right">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">
            Top Units by Capacity
          </p>
          <ul className="as-preview__unit-list">
            {topUnits.map((u) => (
              <li key={u.id} className="as-preview__unit-item">
                <div>
                  <div className="as-preview__unit-name">{u.name}</div>
                  <div className="as-preview__unit-meta">
                    {u.state} · <StatusBadge status={u.status} />
                  </div>
                </div>
                <div className="as-preview__unit-cap">{u.annualCapacityMt} MT</div>
              </li>
            ))}
          </ul>
          <Link to="/agarbatti-stick" className="as-preview__footer-link">
            View full directory
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
