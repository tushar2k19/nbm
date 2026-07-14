import { Search } from "lucide-react";
import { ExportExcelButton } from "./ExportExcelButton";
import type { AgarbattiStickUnit } from "@/data/agarbattiStickUnits";

type Props = {
  total: number;
  filtered: number;
  search: string;
  onSearch: (q: string) => void;
  exportData: AgarbattiStickUnit[];
};

export function AgarbattiToolbar({ total, filtered, search, onSearch, exportData }: Props) {
  return (
    <div className="as-toolbar">
      <div className="as-toolbar__left">
        <p className="as-toolbar__count">
          Showing <strong>{filtered.toLocaleString("en-IN")}</strong> of{" "}
          <strong>{total.toLocaleString("en-IN")}</strong> units
        </p>
        <div className="as-search-wrap">
          <Search className="as-search-icon h-3.5 w-3.5" aria-hidden />
          <input
            type="search"
            className="as-search-input"
            placeholder="Search unit, district, species…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search agarbatti stick units"
          />
        </div>
      </div>
      <ExportExcelButton data={exportData} />
    </div>
  );
}
