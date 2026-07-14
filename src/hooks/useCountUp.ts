import { useEffect, useState } from "react";

export function useCountUp(
  target: number,
  active: boolean,
  decimals = 0,
  duration = 1800,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let frame: number;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value);
}

export function formatStatValue(
  n: number,
  decimals: number,
  prefix = "",
  suffix = "",
): string {
  const formatted = decimals > 0 ? n.toFixed(decimals) : n.toLocaleString("en-IN");
  return `${prefix}${formatted}${suffix}`;
}
