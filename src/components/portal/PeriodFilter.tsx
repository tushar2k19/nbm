import { monthLong, type ReportingPeriods } from "@/lib/reporting-period";

const selectCls =
  "h-9 rounded-md border border-border bg-background px-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring";

type PeriodFilterProps = {
  year: number;
  month: number | null;
  periods: ReportingPeriods;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number | null) => void;
  className?: string;
};

export function PeriodFilter({
  year,
  month,
  periods,
  onYearChange,
  onMonthChange,
  className = "",
}: PeriodFilterProps) {
  const months = periods.monthsByYear[String(year)] ?? [];

  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`}>
      <label htmlFor="reporting-year" className="sr-only">Year</label>
      <select
        id="reporting-year"
        aria-label="Year"
        className={`${selectCls} w-[5.25rem]`}
        value={year}
        onChange={(event) => onYearChange(Number(event.target.value))}
      >
        {periods.years.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <label htmlFor="reporting-month" className="sr-only">Month</label>
      <select
        id="reporting-month"
        aria-label="Month"
        className={`${selectCls} min-w-[7.5rem] max-w-[10.5rem]`}
        value={month ?? "all"}
        onChange={(event) => {
          const value = event.target.value;
          onMonthChange(value === "all" ? null : Number(value));
        }}
      >
        <option value="all">All months</option>
        {months.map((value) => (
          <option key={value} value={value}>
            {monthLong(value)}
          </option>
        ))}
      </select>
    </div>
  );
}
