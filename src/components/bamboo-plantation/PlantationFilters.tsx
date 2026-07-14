import { ALL, getPlantationFilterOptions } from "@/data/bambooPlantations";
import type { PlantationFilters } from "@/data/bambooPlantations";

type Props = {
  filters: PlantationFilters;
  onChange: (key: keyof PlantationFilters, value: string) => void;
};

export function PlantationFilters({ filters, onChange }: Props) {
  const { years, states, districts, blocks } = getPlantationFilterOptions(filters);

  const districtDisabled = filters.state === ALL;
  const blockDisabled = districtDisabled || filters.district === ALL;

  return (
    <div className="bp-filters" role="search" aria-label="Filter bamboo plantations">
      <div className="bp-filter-group">
        <label className="bp-filter-label" htmlFor="bp-filter-year">
          Year of Creation
        </label>
        <select
          id="bp-filter-year"
          className="bp-filter-select"
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

      <div className="bp-filter-group">
        <label className="bp-filter-label" htmlFor="bp-filter-state">
          State
        </label>
        <select
          id="bp-filter-state"
          className="bp-filter-select"
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

      <div className="bp-filter-group">
        <label className="bp-filter-label" htmlFor="bp-filter-district">
          District
        </label>
        <select
          id="bp-filter-district"
          className="bp-filter-select"
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

      <div className="bp-filter-group">
        <label className="bp-filter-label" htmlFor="bp-filter-block">
          Block
        </label>
        <select
          id="bp-filter-block"
          className="bp-filter-select"
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
