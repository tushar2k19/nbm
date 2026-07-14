import { ALL, getAgarbattiFilterOptions } from "@/data/agarbattiStickUnits";
import type { AgarbattiFilters } from "@/data/agarbattiStickUnits";

type Props = {
  filters: AgarbattiFilters;
  onChange: (key: keyof AgarbattiFilters, value: string) => void;
};

export function AgarbattiFilters({ filters, onChange }: Props) {
  const { years, states, districts, blocks } = getAgarbattiFilterOptions(filters);

  const districtDisabled = filters.state === ALL;
  const blockDisabled = districtDisabled || filters.district === ALL;

  return (
    <div className="as-filters" role="search" aria-label="Filter agarbatti stick units">
      <div className="as-filter-group">
        <label className="as-filter-label" htmlFor="as-filter-year">
          Year of Establishment
        </label>
        <select
          id="as-filter-year"
          className="as-filter-select"
          value={filters.year}
          onChange={(e) => onChange("year", e.target.value)}
        >
          <option value={ALL}>All Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="as-filter-group">
        <label className="as-filter-label" htmlFor="as-filter-state">
          State
        </label>
        <select
          id="as-filter-state"
          className="as-filter-select"
          value={filters.state}
          onChange={(e) => {
            onChange("state", e.target.value);
            onChange("district", ALL);
            onChange("block", ALL);
          }}
        >
          <option value={ALL}>All State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="as-filter-group">
        <label className="as-filter-label" htmlFor="as-filter-district">
          District
        </label>
        <select
          id="as-filter-district"
          className="as-filter-select"
          value={filters.district}
          onChange={(e) => {
            onChange("district", e.target.value);
            onChange("block", ALL);
          }}
          disabled={districtDisabled}
        >
          <option value={ALL}>All District</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="as-filter-group">
        <label className="as-filter-label" htmlFor="as-filter-block">
          Block
        </label>
        <select
          id="as-filter-block"
          className="as-filter-select"
          value={filters.block}
          onChange={(e) => onChange("block", e.target.value)}
          disabled={blockDisabled}
        >
          <option value={ALL}>All Block</option>
          {blocks.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
