import { indianStates } from "@/data/indianStates";

const selectCls =
  "h-9 rounded-md border border-border bg-background px-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring";

export type CentralStateFilterValue = string | null;

type CentralStateFilterProps = {
  value: CentralStateFilterValue;
  onChange: (stateCode: CentralStateFilterValue) => void;
  className?: string;
};

/** `null` = all states (national view). */
export function CentralStateFilter({ value, onChange, className = "" }: CentralStateFilterProps) {
  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`}>
      <label htmlFor="central-state-filter" className="sr-only">State</label>
      <select
        id="central-state-filter"
        aria-label="State"
        className={`${selectCls} min-w-[8.5rem] max-w-[11rem]`}
        value={value ?? "all"}
        onChange={(event) => {
          const next = event.target.value;
          onChange(next === "all" ? null : next);
        }}
      >
        <option value="all">All states</option>
        {indianStates.map((state) => (
          <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
}
