import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronDown,
  ExternalLink,
  FileText,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";
import {
  trainingModuleGroups,
  trainingModuleStats,
  type TrainingModuleGroup,
  type TrainingModulePdf,
} from "@/data/trainingModules";

type TrainingModulesPreviewProps = {
  embedded?: boolean;
};

function KcPdfRow({ doc, index }: { doc: TrainingModulePdf; index: number }) {
  return (
    <li>
      <a
        href={doc.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="tm-kc-pdf-row group"
        aria-label={`Open ${doc.title} PDF (opens in new tab)`}
      >
        <span className="tm-kc-pdf-serial" aria-hidden>
          {index}
        </span>
        <span className="min-w-0 flex-1 text-xs font-medium leading-snug text-foreground group-hover:text-primary">
          {doc.title}
        </span>
        <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:text-primary group-hover:opacity-100" />
      </a>
    </li>
  );
}

function ProgrammePreviewCard({ group }: { group: TrainingModuleGroup }) {
  const [expanded, setExpanded] = useState(false);
  const previewDocs = group.documents.slice(0, 2);
  const visibleDocs = expanded ? group.documents : previewDocs;
  const hiddenCount = Math.max(0, group.documents.length - 2);
  const canExpand = group.documents.length > 2;

  return (
    <article className={`tm-kc-programme-card ${expanded ? "tm-kc-programme-card--expanded" : ""}`}>
      <div className="tm-kc-programme-banner">
        <Link to="/training-module/$groupId" params={{ groupId: group.id }} className="block h-full">
          <img src={group.bannerImage} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="tm-kc-programme-banner-overlay" />
          <div className="tm-kc-programme-banner-text">
            <span className="tm-kc-programme-location">
              <MapPin className="h-2.5 w-2.5 shrink-0" aria-hidden />
              {group.location}
            </span>
          </div>
        </Link>
      </div>

      <div className="tm-kc-programme-body">
        <p className="tm-kc-programme-partner">{group.partner}</p>
        <h3 className="tm-kc-programme-title line-clamp-2">
          <Link
            to="/training-module/$groupId"
            params={{ groupId: group.id }}
            className="hover:text-saffron transition-colors"
          >
            {group.shortTitle}
          </Link>
        </h3>

        <div className="tm-kc-programme-meta">
          <span className="tm-kc-programme-pdf-badge">
            <FileText className="h-3 w-3" aria-hidden />
            {group.documents.length} PDF{group.documents.length !== 1 ? "s" : ""}
          </span>
        </div>

        <ul className="tm-kc-pdf-list" aria-label={expanded ? "All training documents" : "Training document previews"}>
          {visibleDocs.map((doc, idx) => (
            <KcPdfRow key={doc.id} doc={doc} index={idx + 1} />
          ))}
        </ul>

        {canExpand && (
          <div className="tm-kc-programme-footer">
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className="tm-kc-expand-btn"
              aria-expanded={expanded}
              aria-label={expanded ? "Show fewer documents" : `Show ${hiddenCount} more documents`}
            >
              <span className="tm-kc-expand-btn-icon" aria-hidden>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
              </span>
              <span className="tm-kc-expand-btn-label">
                {expanded ? "Show less" : `Show ${hiddenCount} more`}
              </span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export function TrainingModulesPreview({ embedded = true }: TrainingModulesPreviewProps) {
  return (
    <>
      <div className="tm-kc-preview">
        <div className="tm-kc-kpi-strip" aria-label="Training modules summary">
          <div className="tm-kc-kpi">
            <span className="tm-kc-kpi-icon" aria-hidden>
              <GraduationCap className="h-5 w-5" />
            </span>
            <span>
              <span className="tm-kc-kpi-value tm-kc-kpi-value--gold">
                {trainingModuleStats.programCount}
              </span>
              <span className="tm-kc-kpi-label">Partner programmes</span>
            </span>
          </div>
          <div className="tm-kc-kpi">
            <span className="tm-kc-kpi-icon" aria-hidden>
              <FileText className="h-5 w-5" />
            </span>
            <span>
              <span className="tm-kc-kpi-value">{trainingModuleStats.documentCount}</span>
              <span className="tm-kc-kpi-label">Training PDFs</span>
            </span>
          </div>
          <div className="tm-kc-kpi">
            <span className="tm-kc-kpi-icon" aria-hidden>
              <Building2 className="h-5 w-5" />
            </span>
            <span>
              <span className="tm-kc-kpi-value">{trainingModuleStats.partnerCount}</span>
              <span className="tm-kc-kpi-label">Partner institutes</span>
            </span>
          </div>
        </div>

        <div className="tm-kc-grid">
          {trainingModuleGroups.map((group) => (
            <ProgrammePreviewCard key={group.id} group={group} />
          ))}
        </div>

        <div className="tm-kc-cta-bar">
          <p className="tm-kc-cta-text">
            <strong>Skill development under NBM</strong> — browse all partner programmes, expand
            document lists, and download official training PDFs hosted on nbm.da.gov.in.
          </p>
          <Link to="/training-module" className="tm-kc-cta-button">
            <span className="tm-kc-cta-button-icon" aria-hidden>
              <BookOpen className="h-3.5 w-3.5" />
            </span>
            Explore all training modules
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      {embedded && (
        <div className="kc-section-meta">
          <span>
            <Users className="h-3.5 w-3.5 text-saffron" aria-hidden />
            For farmers, artisans &amp; field staff
          </span>
          <span>
            <FileText className="h-3.5 w-3.5 text-saffron" aria-hidden />
            Official PDF documents on nbm.da.gov.in
          </span>
        </div>
      )}
    </>
  );
}
