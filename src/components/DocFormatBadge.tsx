import { FileText, Sheet, File } from "lucide-react";

/**
 * Parses a description like "PDF · 4.6 MB · 12 Mar 2025" or "XLSX · 880 KB"
 * and renders coloured format + size chips.
 */
export function DocFormatBadge({
  description,
  showSample = true,
}: {
  description: string;
  showSample?: boolean;
}) {
  const parts = description.split("·").map((p) => p.trim());
  const format = parts[0]?.toUpperCase() ?? "";
  const size = parts[1] ?? "";
  const date = parts[2] ?? "";

  const formatConfig: Record<
    string,
    { bg: string; text: string; Icon: typeof FileText }
  > = {
    PDF: { bg: "bg-red-50 border-red-200", text: "text-red-700", Icon: FileText },
    XLSX: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", Icon: Sheet },
    DOCX: { bg: "bg-blue-50 border-blue-200", text: "text-blue-700", Icon: File },
    DOC: { bg: "bg-blue-50 border-blue-200", text: "text-blue-700", Icon: File },
    CSV: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", Icon: Sheet },
  };

  const cfg = formatConfig[format] ?? {
    bg: "bg-muted border-border",
    text: "text-foreground/70",
    Icon: File,
  };

  return (
    <span className="flex flex-wrap items-center gap-1.5 mt-1">
      <span
        className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${cfg.bg} ${cfg.text}`}
        aria-label={`File format: ${format}`}
      >
        <cfg.Icon className="h-2.5 w-2.5" aria-hidden />
        {format || "DOC"}
      </span>
      {size && (
        <span className="text-[10px] text-muted-foreground" aria-label={`File size: ${size}`}>
          {size}
        </span>
      )}
      {date && (
        <span className="text-[10px] text-muted-foreground/60" aria-label={`Date: ${date}`}>
          · {date}
        </span>
      )}
      {showSample && (
        <span className="ml-0.5 rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
          Sample
        </span>
      )}
    </span>
  );
}
