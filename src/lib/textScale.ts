/** GIGW-style text sizing: 5 steps from smaller → medium (default) → larger */

export const TEXT_SCALE_STORAGE_KEY = "nbm-text-scale";

export const TEXT_SCALE_STEPS = [
  { label: "Smaller", percent: 87.5 },
  { label: "Small", percent: 93.75 },
  { label: "Medium", percent: 100 },
  { label: "Large", percent: 112.5 },
  { label: "Larger", percent: 125 },
] as const;

export const DEFAULT_TEXT_SCALE_LEVEL = 2;
export const MIN_TEXT_SCALE_LEVEL = 0;
export const MAX_TEXT_SCALE_LEVEL = TEXT_SCALE_STEPS.length - 1;

export type TextScaleLevel = 0 | 1 | 2 | 3 | 4;

function clampLevel(level: number): TextScaleLevel {
  return Math.max(
    MIN_TEXT_SCALE_LEVEL,
    Math.min(MAX_TEXT_SCALE_LEVEL, Math.round(level)),
  ) as TextScaleLevel;
}

export function getTextScaleLevel(): TextScaleLevel {
  if (typeof window === "undefined") return DEFAULT_TEXT_SCALE_LEVEL;
  const stored = localStorage.getItem(TEXT_SCALE_STORAGE_KEY);
  if (stored === null) return DEFAULT_TEXT_SCALE_LEVEL;
  const parsed = Number.parseInt(stored, 10);
  if (Number.isNaN(parsed)) return DEFAULT_TEXT_SCALE_LEVEL;
  return clampLevel(parsed);
}

export function applyTextScale(level: TextScaleLevel): TextScaleLevel {
  const clamped = clampLevel(level);
  document.documentElement.dataset.textScale = String(clamped);
  localStorage.setItem(TEXT_SCALE_STORAGE_KEY, String(clamped));
  window.dispatchEvent(new CustomEvent("nbm-text-scale-change", { detail: clamped }));
  return clamped;
}

export function decreaseTextScale(): TextScaleLevel {
  return applyTextScale((getTextScaleLevel() - 1) as TextScaleLevel);
}

export function resetTextScale(): TextScaleLevel {
  return applyTextScale(DEFAULT_TEXT_SCALE_LEVEL);
}

export function increaseTextScale(): TextScaleLevel {
  return applyTextScale((getTextScaleLevel() + 1) as TextScaleLevel);
}

export function initTextScale() {
  applyTextScale(getTextScaleLevel());
}

export const TEXT_SCALE_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("${TEXT_SCALE_STORAGE_KEY}");if(s!==null){var n=parseInt(s,10);if(n>=0&&n<=4)document.documentElement.dataset.textScale=String(n)}}catch(e){}})();`;
