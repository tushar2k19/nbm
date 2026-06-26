import { useEffect, useState } from "react";
import { Type } from "lucide-react";
import {
  applyFontTheme,
  FONT_THEME_LABELS,
  getFontTheme,
  type FontTheme,
} from "@/lib/fontTheme";

export function FontThemeSwitcher() {
  const [theme, setTheme] = useState<FontTheme>("header");

  useEffect(() => {
    setTheme(getFontTheme());
  }, []);

  const select = (next: FontTheme) => {
    applyFontTheme(next);
    setTheme(next);
  };

  return (
    <div
      className="fixed bottom-5 left-4 z-40 flex items-center gap-2 rounded-full border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur-sm"
      role="group"
      aria-label="Font theme comparison"
    >
      <Type className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden />
      <span className="text-[10px] font-medium text-muted-foreground hidden sm:inline">Fonts:</span>
      {(["header", "legacy"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => select(option)}
          aria-pressed={theme === option}
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
            theme === option
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          {FONT_THEME_LABELS[option]}
        </button>
      ))}
    </div>
  );
}
