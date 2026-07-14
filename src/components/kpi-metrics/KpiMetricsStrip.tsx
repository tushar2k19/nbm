import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

export type KpiMetricTone = "tone-a" | "tone-b" | "tone-c" | "tone-d";

export type KpiMetricItem = {
  id?: string;
  icon: LucideIcon;
  watermark?: LucideIcon;
  label: string;
  value: string;
  delta: string;
  trend?: boolean;
  tone?: KpiMetricTone;
  valueAccent?: boolean;
};

export type KpiMetricsStripProps = {
  title: string;
  meta?: string;
  ariaLabel: string;
  items: KpiMetricItem[];
  columns?: 3 | 4;
};

const DEFAULT_TONES: KpiMetricTone[] = ["tone-a", "tone-b", "tone-c", "tone-d"];

function KpiMetricCard({ item, tone }: { item: KpiMetricItem; tone: KpiMetricTone }) {
  const Icon = item.icon;
  const Watermark = item.watermark ?? item.icon;

  return (
    <article
      id={item.id}
      className={[
        "kpi-metric-card",
        `kpi-metric-card--${tone}`,
        item.valueAccent ? "kpi-metric-card--value-accent" : "",
        item.id ? "scroll-mt-28" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="kpi-metric-card__accent" aria-hidden />
      <div className="kpi-metric-card__head">
        <div className="kpi-metric-card__icon-wrap" aria-hidden>
          <Icon className="h-5 w-5" />
        </div>
        <Watermark className="kpi-metric-card__watermark" aria-hidden />
      </div>
      <div className="kpi-metric-card__value">{item.value}</div>
      <div className="kpi-metric-card__label">{item.label}</div>
      <div className="kpi-metric-card__delta-pill">
        <span>
          {item.trend && <TrendingUp className="h-3 w-3 shrink-0" aria-hidden />}
          {item.delta}
        </span>
      </div>
    </article>
  );
}

export function KpiMetricsStrip({
  title,
  meta,
  ariaLabel,
  items,
  columns = 4,
}: KpiMetricsStripProps) {
  const gridClass =
    columns === 3 ? "kpi-metric-grid kpi-metric-grid--cols-3" : "kpi-metric-grid";

  return (
    <div className="kpi-metric-panel" aria-label={ariaLabel}>
      <div className="kpi-metric-panel__header">
        <h2 className="kpi-metric-panel__title">{title}</h2>
        {meta ? <span className="kpi-metric-panel__meta">{meta}</span> : null}
      </div>
      <div className={gridClass}>
        {items.map((item, index) => (
          <KpiMetricCard
            key={item.id ?? item.label}
            item={item}
            tone={item.tone ?? DEFAULT_TONES[index % DEFAULT_TONES.length]}
          />
        ))}
      </div>
    </div>
  );
}
