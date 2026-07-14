import { useState } from "react";
import { FileSpreadsheet, Loader2 } from "lucide-react";
import { exportPlantationsXlsx } from "@/lib/exportPlantations";
import type { BambooPlantation } from "@/data/bambooPlantations";

type Props = {
  data: BambooPlantation[];
};

export function ExportExcelButton({ data }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    if (loading || data.length === 0) return;
    setLoading(true);
    try {
      await exportPlantationsXlsx(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="bp-export-btn"
      onClick={handleExport}
      disabled={loading || data.length === 0}
      title={`Export ${data.length} plantations to Excel`}
      aria-label={`Export ${data.length} bamboo plantations to Excel spreadsheet`}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin bp-export-btn__icon" aria-hidden />
      ) : (
        <FileSpreadsheet className="h-3.5 w-3.5 bp-export-btn__icon" aria-hidden />
      )}
      {loading ? "Exporting…" : "Export to Excel"}
    </button>
  );
}
