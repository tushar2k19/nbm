import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, FileText, GraduationCap, MapPin } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { TrainingModulePdfList } from "@/components/training-modules/TrainingModulePdfList";
import {
  OFFICIAL_TRAINING_MODULE_URL,
  trainingModuleGroups,
  type TrainingModuleGroup,
} from "@/data/trainingModules";
import "@/styles/training-modules.css";

function DetailSidebar({ group }: { group: TrainingModuleGroup }) {
  const siblings = trainingModuleGroups.filter((g) => g.id !== group.id);

  return (
    <aside className="tm-sidebar p-5 lg:sticky lg:top-24 lg:self-start">
      <div className="mb-4 overflow-hidden rounded-lg">
        <img
          src={group.bannerImage}
          alt=""
          className="h-28 w-full object-cover"
          loading="lazy"
        />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-saffron">{group.partner}</p>
      <h2 className="mt-1 font-display text-base font-bold leading-snug text-primary">
        {group.shortTitle}
      </h2>
      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3 shrink-0" aria-hidden />
        {group.location}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="tm-sidebar-stat">
          <span className="tm-sidebar-stat-value">{group.documents.length}</span>
          <span className="tm-sidebar-stat-label">Documents</span>
        </div>
        <div className="tm-sidebar-stat">
          <span className="tm-sidebar-stat-value">PDF</span>
          <span className="tm-sidebar-stat-label">Format</span>
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{group.about}</p>

      <nav className="mt-6 border-t border-border pt-4" aria-label="Other training programmes">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Other programmes
        </p>
        <ul className="space-y-0.5">
          {siblings.map((s) => (
            <li key={s.id}>
              <Link
                to="/training-module/$groupId"
                params={{ groupId: s.id }}
                className="tm-sibling-link"
              >
                <ChevronRight className="h-3 w-3 shrink-0 opacity-50" aria-hidden />
                <span className="line-clamp-2">{s.shortTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export function TrainingModuleDetailPage({ group }: { group: TrainingModuleGroup }) {
  return (
    <div className="training-modules-page">
      <PageHero
        leading={
          <Link to="/training-module">
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
            All training modules
          </Link>
        }
        eyebrow={
          <>
            <GraduationCap className="h-3.5 w-3.5" aria-hidden />
            Training Modules
          </>
        }
        title={group.title}
        subtitle={group.description}
        aside={
          <>
            <div className="page-hero__metric">
              <span className="page-hero__metric-value page-hero__metric-value--gold">
                {group.documents.length}
              </span>
              <span className="page-hero__metric-label">PDF Documents</span>
            </div>
            <div className="page-hero__metric">
              <span className="page-hero__metric-value">{group.partner.split(" ")[0]}</span>
              <span className="page-hero__metric-label">Partner Institute</span>
            </div>
          </>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <nav
          className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link to="/knowledge-center" className="hover:text-primary hover:underline">
            Knowledge Center
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <Link to="/training-module" className="hover:text-primary hover:underline">
            Training Modules
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="font-medium text-foreground">{group.shortTitle}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr]">
          <DetailSidebar group={group} />

          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="h-8 w-1.5 rounded bg-saffron" />
              <div>
                <h2 className="font-display text-lg font-bold text-primary sm:text-xl">
                  Training documents
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Click a document to open the official PDF in a new tab.
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <FileText className="h-4 w-4 text-saffron" aria-hidden />
                About this programme
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">{group.about}</p>
            </div>

            <TrainingModulePdfList documents={group.documents} />
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-secondary/50 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
          Documents are hosted on the official National Bamboo Mission portal.{" "}
          <a
            href={`${OFFICIAL_TRAINING_MODULE_URL.replace("/Training-Module", "")}/TrainingModuleDetails.aspx?Details=${group.officialDetailsSlug}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:underline"
          >
            View on nbm.da.gov.in
          </a>
        </div>
      </div>
    </div>
  );
}
