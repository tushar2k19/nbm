import { FileText } from "lucide-react";
import type { TrainingModulePdf } from "@/data/trainingModules";

function PdfRow({ index, doc }: { index: number; doc: TrainingModulePdf }) {
  return (
    <li>
      <a
        href={doc.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="tm-pdf-row group"
        aria-label={`Open ${doc.title} PDF (opens in new tab)`}
      >
        <span className="tm-pdf-serial" aria-hidden>
          {index}
        </span>
        <span className="tm-pdf-icon" aria-hidden>
          <FileText className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium leading-snug text-foreground group-hover:text-primary">
            {doc.title}
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Portable Document Format
          </span>
        </span>
        <span className="tm-pdf-badge">Open PDF</span>
      </a>
    </li>
  );
}

export function TrainingModulePdfList({ documents }: { documents: TrainingModulePdf[] }) {
  return (
    <ol className="space-y-3" aria-label="Training module documents">
      {documents.map((doc, idx) => (
        <PdfRow key={doc.id} index={idx + 1} doc={doc} />
      ))}
    </ol>
  );
}
