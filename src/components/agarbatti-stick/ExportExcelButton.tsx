import { useState } from "react";
import { FileSpreadsheet, Loader2 } from "lucide-react";
import { exportAgarbattiSticksXlsx } from "@/lib/exportAgarbattiSticks";
import type { AgarbattiStickUnit } from "@/data/agarbattiStickUnits";

type Props = {
  data: AgarbattiStickUnit[];
};

export function ExportExcelButton({ data }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    if (loading || data.length === 0) return;
    setLoading(true);
    try {
      await exportAgarbattiSticksXlsx(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="as-export-btn"
      onClick={handleExport}
      disabled={loading || data.length === 0}
      title={`Export ${data.length} units to Excel`}
      aria-label={`Export ${data.length} agarbatti stick units to Excel spreadsheet`}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin as-export-btn__icon" aria-hidden />
      ) : (
        <FileSpreadsheet className="h-3.5 w-3.5 as-export-btn__icon" aria-hidden />
      )}
      {loading ? "Exporting…" : "Export to Excel"}
    </button>
  );
}
