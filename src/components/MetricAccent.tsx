import type { LucideIcon } from "lucide-react";

export const MITRA_GOLD_GRADIENT_ID = "nbm-mitra-gold-gradient";

/** SVG defs for gradient strokes on metric icons — mount once per page (e.g. SiteLayout). */
export function MitraGoldGradientDefs() {
  return (
    <svg aria-hidden className="absolute w-0 h-0 overflow-hidden pointer-events-none">
      <defs>
        <linearGradient id={MITRA_GOLD_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.78 0.14 70)" />
          <stop offset="100%" stopColor="oklch(0.73 0.16 58)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type MetricAccentProps = {
  icon: LucideIcon;
  children: React.ReactNode;
  iconClassName?: string;
  labelClassName?: string;
  className?: string;
};

/** KPI / metric label row — Mitra gold gradient (matches chatbot bubble). */
export function MetricAccent({
  icon: Icon,
  children,
  iconClassName = "h-5 w-5",
  labelClassName = "text-xs font-semibold uppercase tracking-wider",
  className = "flex items-center gap-2",
}: MetricAccentProps) {
  const gradientStroke = `url(#${MITRA_GOLD_GRADIENT_ID})`;

  return (
    <div className={className}>
      <Icon
        className={`shrink-0 ${iconClassName}`}
        style={{ stroke: gradientStroke, color: "var(--accent-warm)" }}
        aria-hidden
      />
      <span className={`text-gradient-mitra ${labelClassName}`}>{children}</span>
    </div>
  );
}
