/**
 * Focus styling for the India bamboo choropleth map.
 * Mitra gold gradient + white halo — matches chatbot "How may I help you" bubble.
 */

export const MAP_FOCUS_FILL = "url(#nbm-focus-gradient)";
export const MAP_FOCUS_FILL_MUTED = "url(#nbm-focus-gradient-muted)";

export const MAP_FOCUS_STROKE = "oklch(0.40 0.11 55)";
export const MAP_FOCUS_STROKE_WIDTH = 2.5;

export function MapFocusDefs() {
  return (
    <defs>
      <linearGradient id="nbm-focus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="oklch(0.78 0.14 82)" />
        <stop offset="50%" stopColor="oklch(0.76 0.15 78)" />
        <stop offset="100%" stopColor="oklch(0.68 0.17 52)" />
      </linearGradient>

      <linearGradient id="nbm-focus-gradient-muted" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="oklch(0.88 0.06 78)" />
        <stop offset="100%" stopColor="oklch(0.78 0.08 62)" />
      </linearGradient>

      <filter id="nbm-state-focus-halo" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="0" stdDeviation="2.8" floodColor="#ffffff" floodOpacity="0.95" />
        <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="oklch(0.35 0.08 55)" floodOpacity="0.35" />
      </filter>
    </defs>
  );
}

export function MapFocusLegendSwatch({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-3 w-6 rounded-sm border border-amber/40 shrink-0 ${className}`}
      style={{ background: "var(--gradient-mitra-gold)" }}
      aria-hidden
    />
  );
}
