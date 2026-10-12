export const MONTH_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export type StoredPeriod = { year: number; month: number };

export type ReportingPeriods = {
  years: number[];
  monthsByYear: Record<string, number[]>;
};

export function indiaYearMonth(now = new Date()): { year: number; month: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
  }).formatToParts(now);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  return { year, month };
}

export function monthLong(month: number): string {
  return MONTH_LONG[month - 1] ?? String(month);
}

export function monthShort(month: number): string {
  return MONTH_SHORT[month - 1] ?? String(month);
}

export function periodDate(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}

export function formatMonthYear(value: unknown): string {
  const match = String(value ?? "").match(/^(\d{4})-(\d{2})/);
  if (!match) return value == null ? "" : String(value);
  return `${monthShort(Number(match[2]))} ${match[1]}`;
}

export function deadlineLabel(year: number, month: number): string {
  const next = month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
  return `${monthShort(next.month)} 7, ${next.year}`;
}

export function mergeReportingPeriods(stored: StoredPeriod[], now = new Date()): ReportingPeriods {
  const current = indiaYearMonth(now);
  const monthsByYear = new Map<number, Set<number>>();

  for (const row of stored) {
    const year = Number(row.year);
    const month = Number(row.month);
    if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) continue;
    if (year > current.year || (year === current.year && month > current.month)) continue;
    const months = monthsByYear.get(year) ?? new Set<number>();
    months.add(month);
    monthsByYear.set(year, months);
  }

  const openMonths = monthsByYear.get(current.year) ?? new Set<number>();
  openMonths.add(current.month);
  monthsByYear.set(current.year, openMonths);

  const years = [...monthsByYear.keys()].sort((a, b) => b - a);
  const monthsByYearRecord: Record<string, number[]> = {};
  for (const year of years) {
    monthsByYearRecord[String(year)] = [...(monthsByYear.get(year) ?? [])].sort((a, b) => b - a);
  }
  return { years, monthsByYear: monthsByYearRecord };
}

export function monthAfterYearChange(nextYear: number, month: number | null, periods: ReportingPeriods): number | null {
  const available = periods.monthsByYear[String(nextYear)] ?? [];
  if (month != null && available.includes(month)) return month;
  const today = indiaYearMonth();
  if (nextYear === today.year && available.includes(today.month)) return today.month;
  return available[0] ?? null;
}
