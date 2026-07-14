import { Link } from "@tanstack/react-router";
import { ChevronLeft, GraduationCap, BookOpen, Building2, Users } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { TrainingModulesGroupGrid } from "@/components/training-modules/TrainingModuleGroupCard";
import {
  OFFICIAL_TRAINING_MODULE_URL,
  trainingModuleStats,
} from "@/data/trainingModules";
import "@/styles/training-modules.css";

export function TrainingModulesPage() {
  return (
    <div className="training-modules-page">
      <PageHero
        leading={
          <Link to="/knowledge-center" hash="training-modules">
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
            Back to Knowledge Center
          </Link>
        }
        eyebrow={
          <>
            <GraduationCap className="h-3.5 w-3.5" aria-hidden />
            Knowledge Center
          </>
        }
        title="Training Modules"
        subtitle="Official skill development resources from partner institutes — entrepreneurship programmes, design training, cluster development and forestry research modules for farmers, artisans and field functionaries."
        aside={
          <>
            <div className="page-hero__metric">
              <span className="page-hero__metric-value page-hero__metric-value--gold">
                {trainingModuleStats.programCount}
              </span>
              <span className="page-hero__metric-label">Partner Programmes</span>
            </div>
            <div className="page-hero__metric">
              <span className="page-hero__metric-value">{trainingModuleStats.documentCount}</span>
              <span className="page-hero__metric-label">Training Documents</span>
            </div>
            <div className="page-hero__metric">
              <span className="page-hero__metric-value">{trainingModuleStats.partnerCount}</span>
              <span className="page-hero__metric-label">Partner Institutes</span>
            </div>
          </>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-8 w-1.5 rounded bg-saffron" />
          <div>
            <h2 className="font-display text-lg font-bold text-primary sm:text-xl">
              Partner training programmes
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Select a programme to view and download individual training documents.
            </p>
          </div>
        </div>

        <TrainingModulesGroupGrid />

        <div className="tm-info-band mt-12 p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-saffron" aria-hidden />
            <h3 className="font-display text-base font-bold text-primary sm:text-lg">
              Skill development under the National Bamboo Mission
            </h3>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            <li className="flex items-start gap-2 text-sm text-foreground/85">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
              <span>
                <strong className="font-semibold text-primary">Farmers & growers</strong> — plantation,
                harvesting and nursery management training resources.
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground/85">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
              <span>
                <strong className="font-semibold text-primary">Artisans & entrepreneurs</strong> — design,
                product development and MSME setup modules.
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground/85">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
              <span>
                <strong className="font-semibold text-primary">Field functionaries</strong> — calendars,
                manuals and technical modules from research institutes.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Related resources
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link to="/guidelines" className="tm-related-link">
              <BookOpen className="h-5 w-5 shrink-0 text-saffron" aria-hidden />
              <span>
                <span className="block text-sm font-semibold text-primary">Mission Guidelines</span>
                <span className="text-xs text-muted-foreground">Operational documents & schemes</span>
              </span>
            </Link>
            <Link to="/knowledge-center" hash="institutes" className="tm-related-link">
              <Building2 className="h-5 w-5 shrink-0 text-saffron" aria-hidden />
              <span>
                <span className="block text-sm font-semibold text-primary">Partner Institutes</span>
                <span className="text-xs text-muted-foreground">Research & training organisations</span>
              </span>
            </Link>
            <Link to="/contact" className="tm-related-link">
              <Users className="h-5 w-5 shrink-0 text-saffron" aria-hidden />
              <span>
                <span className="block text-sm font-semibold text-primary">Contact Directory</span>
                <span className="text-xs text-muted-foreground">HQ and State Mission contacts</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-secondary/50 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
          Content is reproduced from the official National Bamboo Mission portal. Training documents
          are hosted on{" "}
          <a
            href={OFFICIAL_TRAINING_MODULE_URL}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:underline"
          >
            nbm.da.gov.in/Training-Module
          </a>
          . For the latest additions, please refer to the official source.
        </div>
      </div>
    </div>
  );
}
