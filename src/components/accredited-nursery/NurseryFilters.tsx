import { ALL, getFilterOptions } from "@/data/accreditedNurseries";
import type { NurseryFilters } from "@/data/accreditedNurseries";

type Props = {
  filters: NurseryFilters;
  onChange: (key: keyof NurseryFilters, value: string) => void;
};

export function NurseryFilters({ filters, onChange }: Props) {
  const { years, states, districts, blocks } = getFilterOptions(filters);

  const districtDisabled = filters.state === ALL;
  const blockDisabled = districtDisabled || filters.district === ALL;

  return (
    <div className="an-filters" role="search" aria-label="Filter nurseries">
      <div className="an-filter-group">
        <label className="an-filter-label" htmlFor="filter-year">
          Year of Creation
        </label>
        <select
          id="filter-year"
          className="an-filter-select"
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

      <div className="an-filter-group">
        <label className="an-filter-label" htmlFor="filter-state">
          State
        </label>
        <select
          id="filter-state"
          className="an-filter-select"
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

      <div className="an-filter-group">
        <label className="an-filter-label" htmlFor="filter-district">
          District
        </label>
        <select
          id="filter-district"
          className="an-filter-select"
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

      <div className="an-filter-group">
        <label className="an-filter-label" htmlFor="filter-block">
          Block
        </label>
        <select
          id="filter-block"
          className="an-filter-select"
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
