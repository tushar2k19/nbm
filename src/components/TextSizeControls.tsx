import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_TEXT_SCALE_LEVEL,
  decreaseTextScale,
  getTextScaleLevel,
  increaseTextScale,
  MAX_TEXT_SCALE_LEVEL,
  MIN_TEXT_SCALE_LEVEL,
  resetTextScale,
  type TextScaleLevel,
} from "@/lib/textScale";

export function TextSizeControls() {
  const { t } = useTranslation();
  const [level, setLevel] = useState<TextScaleLevel>(DEFAULT_TEXT_SCALE_LEVEL);

  useEffect(() => {
    setLevel(getTextScaleLevel());

    const onChange = (event: Event) => {
      const next = (event as CustomEvent<TextScaleLevel>).detail;
      if (typeof next === "number") setLevel(next);
      else setLevel(getTextScaleLevel());
    };

    window.addEventListener("nbm-text-scale-change", onChange);
    return () => window.removeEventListener("nbm-text-scale-change", onChange);
  }, []);

  const handleDecrease = useCallback(() => {
    if (level <= MIN_TEXT_SCALE_LEVEL) return;
    setLevel(decreaseTextScale());
  }, [level]);

  const handleReset = useCallback(() => {
    setLevel(resetTextScale());
  }, []);

  const handleIncrease = useCallback(() => {
    if (level >= MAX_TEXT_SCALE_LEVEL) return;
    setLevel(increaseTextScale());
  }, [level]);

  const atMin = level <= MIN_TEXT_SCALE_LEVEL;
  const atMax = level >= MAX_TEXT_SCALE_LEVEL;
  const atDefault = level === DEFAULT_TEXT_SCALE_LEVEL;

  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="group"
      aria-label={t("textSize.groupLabel")}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={atMin}
        aria-label={t("textSize.decrease")}
        aria-pressed={level < DEFAULT_TEXT_SCALE_LEVEL}
        title={t("textSize.decrease")}
        className={`px-1 py-0.5 rounded transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[oklch(0.52_0.22_250)] focus-visible:outline-offset-2 ${
          level < DEFAULT_TEXT_SCALE_LEVEL
            ? "font-semibold text-primary-foreground underline underline-offset-2"
            : "hover:underline"
        } disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline disabled:font-normal`}
      >
        A-
      </button>
      <button
        type="button"
        onClick={handleReset}
        aria-label={t("textSize.reset")}
        aria-pressed={atDefault}
        title={t("textSize.reset")}
        className={`px-1 py-0.5 rounded transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[oklch(0.52_0.22_250)] focus-visible:outline-offset-2 ${
          atDefault
            ? "font-semibold text-primary-foreground underline underline-offset-2"
            : "hover:underline"
        }`}
      >
        A
      </button>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={atMax}
        aria-label={t("textSize.increase")}
        aria-pressed={level > DEFAULT_TEXT_SCALE_LEVEL}
        title={t("textSize.increase")}
        className={`px-1 py-0.5 rounded text-[0.8125rem] transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[oklch(0.52_0.22_250)] focus-visible:outline-offset-2 ${
          level > DEFAULT_TEXT_SCALE_LEVEL
            ? "font-semibold text-primary-foreground underline underline-offset-2"
            : "font-semibold hover:underline"
        } disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline disabled:font-normal`}
      >
        A+
      </button>
    </span>
  );
}
