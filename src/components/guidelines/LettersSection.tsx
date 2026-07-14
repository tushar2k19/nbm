import type { NbmLetter } from "@/data/nbmLetters";
import { ExternalLink, FileText } from "lucide-react";

type LettersSectionProps = {
  items: NbmLetter[];
};

export function LettersSection({ items }: LettersSectionProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <caption className="sr-only">
            Official letters from the National Bamboo Mission — date and description
          </caption>
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th scope="col" className="w-36 px-4 py-2.5 text-left text-xs font-semibold">
                Date
              </th>
              <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold">
                Description
              </th>
              <th scope="col" className="w-16 px-4 py-2.5 text-center text-xs font-semibold">
                PDF
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((letter, idx) => (
              <tr
                key={letter.id}
                id={`letters-${letter.id}`}
                className={`scroll-mt-28 border-b border-border align-top transition-colors hover:bg-primary/5 ${
                  idx % 2 === 0 ? "bg-card" : "bg-secondary/30"
                }`}
              >
                <td className="px-4 py-3 text-xs font-medium text-foreground whitespace-nowrap">
                  {letter.date}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={letter.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-start gap-1.5 text-[13px] leading-snug font-medium text-primary hover:underline"
                    title={`Open PDF — ${letter.title}`}
                  >
                    <span>{letter.title}</span>
                    <ExternalLink
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60 group-hover/link:opacity-100"
                      aria-hidden
                    />
                  </a>
                </td>
                <td className="px-4 py-3 text-center">
                  <a
                    href={letter.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open PDF — ${letter.title}`}
                    aria-label={`Open PDF for letter dated ${letter.date}`}
                    className="group inline-flex flex-col items-center gap-0.5 text-[10px] transition-colors hover:text-primary"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
                      <FileText className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="text-muted-foreground group-hover:text-primary">PDF</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
