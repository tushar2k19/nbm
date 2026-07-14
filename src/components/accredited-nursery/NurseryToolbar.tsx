import { Search } from "lucide-react";
import { ExportExcelButton } from "./ExportExcelButton";
import type { AccreditedNursery } from "@/data/accreditedNurseries";

type Props = {
  total: number;
  filtered: number;
  search: string;
  onSearch: (q: string) => void;
  exportData: AccreditedNursery[];
};

export function NurseryToolbar({ total, filtered, search, onSearch, exportData }: Props) {
  return (
    <div className="an-toolbar">
      <div className="an-toolbar__left">
        <p className="an-toolbar__count">
          Showing <strong>{filtered.toLocaleString("en-IN")}</strong> of{" "}
          <strong>{total.toLocaleString("en-IN")}</strong> nurseries
        </p>
        <div className="an-search-wrap">
          <Search className="an-search-icon h-3.5 w-3.5" aria-hidden />
          <input
            type="search"
            className="an-search-input"
            placeholder="Search nursery, district, email…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search nurseries"
          />
        </div>
      </div>
      <ExportExcelButton data={exportData} />
    </div>
  );
}
