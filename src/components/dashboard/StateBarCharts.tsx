import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { implementingStates, topStatesBy } from "@/data/bambooStateStats";
import { Download, Flower2, Sprout, Users } from "lucide-react";

type BarPanelProps = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  data: { name: string; value: number }[];
  gradientId: string;
  fromColor: string;
  toColor: string;
  accentClass: string;
};

function HorizontalBarPanel({
  title,
  icon: Icon,
  data,
  gradientId,
  fromColor,
  toColor,
  accentClass,
}: BarPanelProps) {
  const chartConfig = { value: { label: title, color: fromColor } };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      <div className={`h-1 ${accentClass}`} />
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="font-display font-bold text-primary">{title}</h3>
      </div>
      <div className="p-4">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={fromColor} />
                <stop offset="100%" stopColor={toColor} />
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
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
              {data.map((_, i) => (
                <Cell key={i} fill={`url(#${gradientId})`} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <ul className="mt-2 space-y-1.5">
          {data.map((d) => (
            <li key={d.name} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate pr-2">{d.name}</span>
              <span className="font-semibold text-foreground shrink-0">{d.value.toLocaleString("en-IN")}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function exportCsv() {
  const headers = ["State", "Plantations", "Area (ha)", "Nurseries", "Processing Units", "Beneficiaries", "Funds (Cr)"];
  const rows = implementingStates.map((s) =>
    [s.name, s.plantations, s.plantationAreaHa, s.nurseries, s.processingUnits, s.beneficiaries, s.fundsCr].join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nbm-state-beneficiaries.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function StateBarCharts() {
  const plantationData = topStatesBy("plantations").map((s) => ({ name: s.name, value: s.plantations }));
  const nurseryData = topStatesBy("nurseries").map((s) => ({ name: s.name, value: s.nurseries }));
  const beneficiaryData = topStatesBy("beneficiaries").map((s) => ({ name: s.name, value: s.beneficiaries }));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <HorizontalBarPanel
        title="Bamboo Plantation"
        icon={Sprout}
        data={plantationData}
        gradientId="plantationGrad"
        fromColor="oklch(0.55 0.08 60)"
        toColor="oklch(0.78 0.06 90)"
        accentClass="bg-bark"
      />
      <HorizontalBarPanel
        title="Accredited Nurseries"
        icon={Flower2}
        data={nurseryData}
        gradientId="nurseryGrad"
        fromColor="oklch(0.38 0.11 150)"
        toColor="oklch(0.62 0.12 140)"
        accentClass="bg-primary"
      />
      <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
        <div className="h-1 bg-saffron" />
        <div className="px-5 py-4 border-b border-border flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <h3 className="font-display font-bold text-primary">Beneficiaries by State</h3>
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded hover:opacity-90 transition"
          >
            <Download className="h-3.5 w-3.5" /> Export Data
          </button>
        </div>
        <div className="p-4 pt-3">
          <span className="inline-block text-[10px] font-medium text-muted-foreground bg-secondary px-2 py-1 rounded mb-3">
            Last Updated: Today, 09:00 AM
          </span>
          <ChartContainer config={{ value: { label: "Beneficiaries", color: "oklch(0.48 0.13 145)" } }} className="h-[260px] w-full">
            <BarChart data={beneficiaryData} layout="vertical" margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
              <defs>
                <linearGradient id="beneficiaryGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.48 0.13 145)" />
                  <stop offset="100%" stopColor="oklch(0.72 0.10 130)" />
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
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                {beneficiaryData.map((_, i) => (
                  <Cell key={i} fill="url(#beneficiaryGrad)" />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          <ul className="mt-2 space-y-1.5">
            {beneficiaryData.map((d) => (
              <li key={d.name} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground truncate pr-2">{d.name}</span>
                <span className="font-semibold text-foreground shrink-0">{d.value.toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
