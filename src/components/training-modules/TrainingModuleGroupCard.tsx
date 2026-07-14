import { useState } from "react";
import { ChevronDown, ExternalLink, FileText, MapPin } from "lucide-react";
import {
  trainingModuleGroups,
  type TrainingModuleGroup,
  type TrainingModulePdf,
} from "@/data/trainingModules";

function HubPdfLink({ doc, index }: { doc: TrainingModulePdf; index: number }) {
  return (
    <li>
      <a
        href={doc.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="tm-hub-pdf-link group"
        aria-label={`Open ${doc.title} PDF (opens in new tab)`}
      >
        <span className="tm-hub-pdf-serial" aria-hidden>
          {index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium leading-snug text-foreground group-hover:text-primary">
            {doc.title}
          </span>
        </span>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:text-primary group-hover:opacity-100" />
      </a>
    </li>
  );
}

export function TrainingModuleGroupCard({ group }: { group: TrainingModuleGroup }) {
  const [expanded, setExpanded] = useState(false);
  const previewDocs = group.documents.slice(0, 2);
  const visibleDocs = expanded ? group.documents : previewDocs;

  return (
    <article className={`tm-group-card h-full ${expanded ? "tm-group-card--expanded" : ""}`}>
      <div className="tm-group-card-accent" aria-hidden />

      <div className="tm-group-banner">
        <img src={group.bannerImage} alt="" loading="lazy" />
        <div className="tm-group-banner-overlay" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
            <MapPin className="h-3 w-3" aria-hidden />
            {group.location}
          </div>
          <h3 className="font-display text-base font-bold leading-snug sm:text-lg line-clamp-2">
            {group.shortTitle}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-saffron">{group.partner}</p>
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">{group.description}</p>

        <div className="mb-4">
          <span className="tm-doc-count-pill">
            <FileText className="h-3 w-3" aria-hidden />
            {group.documents.length} training document{group.documents.length !== 1 ? "s" : ""}
          </span>
        </div>

        <ul className="mb-3 space-y-1.5" aria-label={expanded ? "All training documents" : "Document previews"}>
          {visibleDocs.map((doc, idx) => (
            <HubPdfLink key={doc.id} doc={doc} index={idx + 1} />
          ))}
        </ul>

        <div className="mt-auto border-t border-border pt-4">
          {group.documents.length > 2 ? (
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className="tm-expand-btn"
              aria-expanded={expanded}
              aria-label={
                expanded
                  ? "Show fewer documents"
                  : `Show ${group.documents.length - 2} more documents`
              }
            >
              <span className="tm-expand-btn-icon" aria-hidden>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                />
              </span>
              <span className="tm-expand-btn-label">
                {expanded ? "Show less" : `Show ${group.documents.length - 2} more`}
              </span>
            </button>
          ) : (
            <span className="text-xs text-muted-foreground">All documents listed above</span>
          )}
        </div>
      </div>
    </article>
  );
}

export function TrainingModulesGroupGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {trainingModuleGroups.map((group) => (
        <TrainingModuleGroupCard key={group.id} group={group} />
      ))}
    </div>
  );
}
