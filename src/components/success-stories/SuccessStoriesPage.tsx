import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, FileText, Play, Sparkles } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { SuccessStoriesPdfSection } from "@/components/success-stories/SuccessStoriesPdfSection";
import { SuccessStoriesVideoSection } from "@/components/success-stories/SuccessStoriesVideoSection";
import { successStoryStats } from "@/data/successStories";

type SectionTab = "documents" | "videos";

export function SuccessStoriesPage() {
  const [activeTab, setActiveTab] = useState<SectionTab>("documents");

  return (
    <div className="success-stories-page">
      <PageHero
        leading={
          <Link to="/knowledge-center">
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
            Back to Knowledge Center
          </Link>
        }
        eyebrow={
          <>
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Knowledge Center
          </>
        }
        title="Success Stories"
        subtitle="Real-world impact from State Bamboo Missions — farmer livelihoods, processing units, agarbatti projects and green economy initiatives documented as publications and films."
        aside={
          <>
            <div className="page-hero__metric">
              <span className="page-hero__metric-value page-hero__metric-value--gold">
                {successStoryStats.pdfCount}
              </span>
              <span className="page-hero__metric-label">PDF Stories</span>
            </div>
            <div className="page-hero__metric">
              <span className="page-hero__metric-value">{successStoryStats.videoCount}</span>
              <span className="page-hero__metric-label">Video Films</span>
            </div>
            <div className="page-hero__metric">
              <span className="page-hero__metric-value">{successStoryStats.stateCount}</span>
              <span className="page-hero__metric-label">States Featured</span>
            </div>
          </>
        }
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Section nav */}
        <nav
          className="success-stories-nav sticky top-0 z-30 mb-8 flex w-fit max-w-full flex-wrap gap-1 rounded-full p-1"
          aria-label="Success stories sections"
        >
          {(
            [
              { id: "documents" as const, label: "Document Stories", icon: FileText },
              { id: "videos" as const, label: "Video Stories", icon: Play },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`success-stories-nav-pill relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold sm:text-sm ${
                  isActive ? "success-stories-nav-pill--active" : "text-foreground/70 hover:text-primary"
                }`}
              >
                {isActive && <span className="success-stories-nav-pill-bg" aria-hidden />}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="space-y-14">
          <div
            onMouseEnter={() => setActiveTab("documents")}
            onFocus={() => setActiveTab("documents")}
          >
            <SuccessStoriesPdfSection />
          </div>

          <div onMouseEnter={() => setActiveTab("videos")} onFocus={() => setActiveTab("videos")}>
            <SuccessStoriesVideoSection />
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-secondary/50 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
          Content is reproduced from the official National Bamboo Mission portal. PDF and video files
          are hosted on{" "}
          <a
            href="https://nbm.da.gov.in/Success-Stories"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary hover:underline"
          >
            nbm.da.gov.in/Success-Stories
          </a>
          . For the latest additions, please refer to the official source.
        </div>
      </div>
    </div>
  );
}
