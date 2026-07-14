import { useEffect, useState } from "react";
import { BarChart3, ChevronDown, ChevronUp, ExternalLink, FileText } from "lucide-react";
import { annualActionPlanArchive } from "@/data/annualActionPlan";
import aapImg from "@/assets/bamboo-hero.jpg";

const INITIAL_VISIBLE = 5;

export function AnnualActionPlanSection() {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = annualActionPlanArchive.length - INITIAL_VISIBLE;
  const visibleEntries = expanded
    ? annualActionPlanArchive
    : annualActionPlanArchive.slice(0, INITIAL_VISIBLE);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash.startsWith("annual-action-plan-")) return;
    const targetIndex = annualActionPlanArchive.findIndex(
      (entry) => `annual-action-plan-${entry.id}` === hash
    );
    if (targetIndex >= INITIAL_VISIBLE) {
      setExpanded(true);
    }
  }, []);

  return (
    <div id="annual-action-plan" className="reports-section scroll-mt-28">
      <img
        src={aapImg}
        alt="Annual Action Plan"
        className="reports-section__image"
        loading="lazy"
      />
      <div className="min-w-0">
        <div className="reports-section__header">
          <BarChart3 className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
          <div className="min-w-0">
            <div className="reports-section__title">Annual Action Plan</div>
            <div className="reports-section__subtitle">
              State-wise annual action plans submitted under the National Bamboo Mission.
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="reports-data-table">
            <caption className="sr-only">
              Annual Action Plan archive — financial year and downloadable PDF documents
            </caption>
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th scope="col" className="w-28">Financial Year</th>
                <th scope="col">Description</th>
                <th scope="col" className="w-16 text-center">Document</th>
              </tr>
            </thead>
            <tbody>
              {visibleEntries.map((entry, idx) => (
                <tr
                  key={entry.id}
                  id={`annual-action-plan-${entry.id}`}
                  className={`scroll-mt-28 border-b border-border transition-colors hover:bg-primary/5 ${
                    idx % 2 === 0 ? "bg-card" : "bg-secondary/30"
                  }`}
                >
                  <td className="font-medium text-foreground whitespace-nowrap">
                    {entry.financialYear}
                  </td>
                  <td>
                    <a
                      href={entry.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                      title={`Open Annual Action Plan PDF — FY ${entry.financialYear}`}
                    >
                      Annual Action Plan
                      <ExternalLink
                        className="h-3 w-3 shrink-0 opacity-60 group-hover/link:opacity-100"
                        aria-hidden
                      />
                    </a>
                  </td>
                  <td className="text-center">
                    <a
                      href={entry.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Download PDF — FY ${entry.financialYear}`}
                      aria-label={`Open Annual Action Plan PDF for FY ${entry.financialYear}`}
                      className="reports-data-table__pdf-btn group hover:text-primary"
                    >
                      <span className="reports-data-table__pdf-icon transition-colors group-hover:bg-red-100">
                        <FileText className="h-3 w-3" aria-hidden />
                      </span>
                      <span className="text-muted-foreground group-hover:text-primary">PDF</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {hiddenCount > 0 && (
          <div className="border-t border-border bg-secondary/30 text-center">
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              className="reports-expand-btn"
            >
              {expanded ? (
                <>
                  Show less
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden />
                </>
              ) : (
                <>
                  Show more
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
