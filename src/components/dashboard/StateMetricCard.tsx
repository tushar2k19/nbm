import { Factory, IndianRupee, Sprout, TreePine, Users, Leaf } from "lucide-react";
import type { BambooStateStats } from "@/data/bambooStateStats";

type StateMetricCardProps = {
  state: BambooStateStats | null;
  geoName?: string;
  variant?: "floating" | "panel";
  style?: React.CSSProperties;
  className?: string;
};

function MetricRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-secondary/50 px-3 py-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}

export function StateMetricCard({
  state,
  geoName,
  variant = "panel",
  style,
  className = "",
}: StateMetricCardProps) {
  const displayName = state?.name ?? geoName ?? "Select a state";

  if (!state) {
    return (
      <div
        className={`rounded-lg border border-border bg-card shadow-soft overflow-hidden ${className}`}
        style={style}
      >
        <div className="mega-menu-accent" />
        <div className="p-5 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">{displayName}</p>
          <p className="mt-2">Hover or tap a state on the map to view NBM progress metrics.</p>
        </div>
      </div>
    );
  }

  if (!state.hasCoverage) {
    return (
      <div
        className={`rounded-lg border border-border bg-card shadow-soft overflow-hidden ${className}`}
        style={style}
      >
        <div className="mega-menu-accent" />
        <div className="bg-muted px-4 py-3">
          <h3 className="font-display font-bold text-primary">{state.name}</h3>
          <span className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded">
            No NBM coverage
          </span>
        </div>
        <div className="p-4 text-sm text-muted-foreground">
          This state/UT is not currently under active National Bamboo Mission implementation.
        </div>
      </div>
    );
  }

  const wrapperClass =
    variant === "floating"
      ? `pointer-events-none fixed z-[60] w-72 rounded-lg border border-border bg-card shadow-card overflow-hidden ${className}`
      : `rounded-lg border border-border bg-card shadow-soft overflow-hidden ${className}`;

  return (
    <div className={wrapperClass} style={style}>
      <div className="mega-menu-accent" />
      <div className="bg-primary px-4 py-3 text-primary-foreground">
        <h3 className="font-display font-bold">{state.name}</h3>
        <span className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-wider bg-saffron text-saffron-foreground px-2 py-0.5 rounded">
          NBM Active
        </span>
      </div>
      <div className="grid gap-2 p-3">
        <MetricRow icon={Sprout} label="Plantations" value={state.plantations.toLocaleString("en-IN")} />
        <MetricRow icon={TreePine} label="Plantation Area" value={`${state.plantationAreaHa.toLocaleString("en-IN")} ha`} />
        <MetricRow icon={Leaf} label="Accredited Nurseries" value={state.nurseries.toLocaleString("en-IN")} />
        <MetricRow icon={Factory} label="Processing Units" value={state.processingUnits.toLocaleString("en-IN")} />
        <MetricRow icon={Users} label="Beneficiaries" value={state.beneficiaries.toLocaleString("en-IN")} />
        <MetricRow icon={IndianRupee} label="Funds Utilised" value={`₹${state.fundsCr} Cr`} />
      </div>
    </div>
  );
}
