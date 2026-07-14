import { useState } from "react";
import { FileSpreadsheet, Loader2 } from "lucide-react";
import { exportAccreditedNurseriesXlsx } from "@/lib/exportAccreditedNurseries";
import type { AccreditedNursery } from "@/data/accreditedNurseries";

type Props = {
  data: AccreditedNursery[];
};

export function ExportExcelButton({ data }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    if (loading || data.length === 0) return;
    setLoading(true);
    try {
      await exportAccreditedNurseriesXlsx(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="an-export-btn"
      onClick={handleExport}
      disabled={loading || data.length === 0}
      title={`Export ${data.length} nurseries to Excel`}
      aria-label={`Export ${data.length} nurseries to Excel spreadsheet`}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin an-export-btn__icon" aria-hidden />
      ) : (
        <FileSpreadsheet className="h-3.5 w-3.5 an-export-btn__icon" aria-hidden />
      )}
      {loading ? "Exporting…" : "Export to Excel"}
    </button>
  );
}
