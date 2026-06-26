export type FontTheme = "header" | "legacy";

export const FONT_THEME_STORAGE_KEY = "nbm-font-theme";

export const FONT_THEME_LABELS: Record<FontTheme, string> = {
  header: "All Plus Jakarta",
  legacy: "Serif titles",
};

export function getFontTheme(): FontTheme {
  if (typeof window === "undefined") return "header";
  const stored = localStorage.getItem(FONT_THEME_STORAGE_KEY);
  return stored === "legacy" ? "legacy" : "header";
}

export function applyFontTheme(theme: FontTheme) {
  document.documentElement.dataset.fontTheme = theme;
  localStorage.setItem(FONT_THEME_STORAGE_KEY, theme);
}

export function initFontTheme() {
  applyFontTheme(getFontTheme());
}
