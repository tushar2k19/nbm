import { Search } from "lucide-react";
import { ExportExcelButton } from "./ExportExcelButton";
import type { BambooPlantation } from "@/data/bambooPlantations";

type Props = {
  total: number;
  filtered: number;
  search: string;
  onSearch: (q: string) => void;
  exportData: BambooPlantation[];
};

export function PlantationToolbar({ total, filtered, search, onSearch, exportData }: Props) {
  return (
    <div className="bp-toolbar">
      <div className="bp-toolbar__left">
        <p className="bp-toolbar__count">
          Showing <strong>{filtered.toLocaleString("en-IN")}</strong> of{" "}
          <strong>{total.toLocaleString("en-IN")}</strong> plantations
        </p>
        <div className="bp-search-wrap">
          <Search className="bp-search-icon h-3.5 w-3.5" aria-hidden />
          <input
            type="search"
            className="bp-search-input"
            placeholder="Search name, code, district, species…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search bamboo plantations"
          />
        </div>
      </div>
      <ExportExcelButton data={exportData} />
    </div>
  );
}
