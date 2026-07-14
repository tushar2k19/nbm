import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { KnowledgeCenterSection } from "@/components/knowledge-center/KnowledgeCenterSection";
import { knowledgeCenterSections, institutes } from "@/data/knowledgeCenter";
import { downloadSamplePdf } from "@/lib/samplePdf";
import {
  FileText,
  Download,
  GraduationCap,
  Package,
  Building2,
  ArrowRight,
  MapPin,
  ExternalLink,
  BookOpen,
  Sparkles,
  Play,
} from "lucide-react";
import { researchPapers } from "@/data/researchPapers";
import { stateMissionRows } from "@/data/stateMission";
import { successStoryPdfGroups, successStoryVideos } from "@/data/successStories";
import { TrainingModulesPreview } from "@/components/training-modules/TrainingModulesPreview";
import "@/styles/knowledge-center.css";
import "@/styles/training-modules-kc-preview.css";

export const Route = createFileRoute("/knowledge-center/")({
  head: () => ({
    meta: [
      { title: "Knowledge Center — NBM" },
      {
        name: "description",
        content:
          "Training modules, institutes, value-added bamboo products and research papers from the National Bamboo Mission.",
      },
    ],
  }),
  component: KnowledgeCenterPage,
});

const sectionIcons = {
  "training-modules": GraduationCap,
  institutes: Building2,
  "value-added-products": Package,
  "research-papers": BookOpen,
  "state-mission": MapPin,
  "success-stories": Sparkles,
} as const;

const sectionVariants: Record<string, "default" | "elevated" | "muted"> = {
  "training-modules": "elevated",
  institutes: "muted",
  "value-added-products": "default",
  "research-papers": "default",
  "state-mission": "default",
  "success-stories": "elevated",
};

function InstitutesSection() {
  return (
    <div className="kc-institutes-grid">
      {institutes.map((inst) => (
        <article key={inst.id} id={`institutes-${inst.id}`} className="kc-institute-card scroll-mt-28">
          <div className="kc-institute-card-accent" aria-hidden />
          <div className="kc-institute-icon" aria-hidden>
            <Building2 className="h-5 w-5" />
          </div>
          <h3 className="kc-institute-name">{inst.name}</h3>
          <div className="kc-institute-location">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            {inst.location}
          </div>
          <p className="kc-institute-role">{inst.role}</p>
          <a href="#" className="kc-institute-link">
            Visit website
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </article>
      ))}
    </div>
  );
}

function KnowledgeCenterPage() {
  return (
    <>
      <PageHero
        title="Knowledge Center"
        subtitle="Training resources, partner institutes, product catalogues and official communications to support farmers, artisans and entrepreneurs."
      />
      <div className="kc-page">
        <div className="kc-page-inner mx-auto max-w-7xl px-4 sm:px-6">
          {knowledgeCenterSections.map((sec) => {
            const Icon = sectionIcons[sec.id as keyof typeof sectionIcons] ?? FileText;
            const variant = sectionVariants[sec.id] ?? "default";

            if (sec.id === "value-added-products") {
              return (
                <KnowledgeCenterSection
                  key={sec.id}
                  id={sec.id}
                  title={sec.title}
                  subtitle="Explore bamboo-based value added products — handicrafts, furniture, construction materials, charcoal, agarbatti sticks and lifestyle goods."
                  icon={Icon}
                  variant={variant}
                >
                  <div className="flex flex-col gap-5 rounded-xl border border-primary/10 bg-primary/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="kc-section-header-badge shrink-0" aria-hidden>
                        <Icon className="h-5 w-5" />
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {sec.items.map((item) => (
                          <li key={item.id}>
                            <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                              {item.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      to="/products"
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                      View products
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </KnowledgeCenterSection>
              );
            }

            if (sec.id === "research-papers") {
              return (
                <KnowledgeCenterSection
                  key={sec.id}
                  id={sec.id}
                  title={sec.title}
                  subtitle="Scientific and technical publications on bamboo cultivation, processing, composites and livelihoods."
                  icon={Icon}
                  variant={variant}
                >
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-primary text-primary-foreground">
                            <th className="w-14 px-4 py-3 text-left font-semibold">S. No.</th>
                            <th className="px-4 py-3 text-left font-semibold">Title</th>
                            <th className="w-28 px-4 py-3 text-left font-semibold">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {researchPapers.slice(0, 5).map((paper, idx) => (
                            <tr
                              key={paper.id}
                              className={`border-b border-border ${idx % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}
                            >
                              <td className="px-4 py-3 text-muted-foreground">{paper.srNo}</td>
                              <td className="px-4 py-3 leading-snug text-foreground">{paper.title}</td>
                              <td className="px-4 py-3 text-muted-foreground">{paper.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="border-t border-border bg-secondary/30 px-4 py-3 text-right">
                      <Link
                        to="/knowledge-center/research-papers"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        View all research papers <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </KnowledgeCenterSection>
              );
            }

            if (sec.id === "state-mission") {
              return (
                <KnowledgeCenterSection
                  key={sec.id}
                  id={sec.id}
                  title={sec.title}
                  subtitle="State nodal departments, Mission Directors, SLEC documents and bamboo production statistics from the official NBM portal."
                  icon={Icon}
                  variant={variant}
                >
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-primary text-primary-foreground">
                            <th className="px-4 py-3 text-left font-semibold">State</th>
                            <th className="px-4 py-3 text-left font-semibold">Nodal Department</th>
                            <th className="px-4 py-3 text-left font-semibold">Mission Director</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stateMissionRows.slice(0, 5).map((row, idx) => (
                            <tr
                              key={row.id}
                              className={`border-b border-border ${idx % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}
                            >
                              <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                                {row.stateName}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">{row.nodalDepartment}</td>
                              <td className="px-4 py-3 text-muted-foreground line-clamp-2">
                                {row.missionDirector}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="border-t border-border bg-secondary/30 px-4 py-3 text-right">
                      <Link
                        to="/knowledge-center/state-mission"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        View all state missions <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </KnowledgeCenterSection>
              );
            }

            if (sec.id === "training-modules") {
              return (
                <KnowledgeCenterSection
                  key={sec.id}
                  id={sec.id}
                  title={sec.title}
                  subtitle="Official skill development resources from partner institutes — entrepreneurship programmes, design training, cluster development and forestry research modules."
                  icon={Icon}
                  variant={variant}
                >
                  <TrainingModulesPreview />
                </KnowledgeCenterSection>
              );
            }

            if (sec.id === "success-stories") {
              return (
                <KnowledgeCenterSection
                  key={sec.id}
                  id={sec.id}
                  title={sec.title}
                  subtitle="Documented impact from State Bamboo Missions — farmer stories, agarbatti projects and SBDA documentaries from the official NBM archives."
                  icon={Icon}
                  variant={variant}
                >
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                    <div className="grid gap-0 md:grid-cols-2">
                      <div className="border-b border-border p-5 md:border-b-0 md:border-r">
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                          <FileText className="h-4 w-4 text-saffron" />
                          PDF Publications
                        </div>
                        <ul className="space-y-2 text-sm text-foreground/90">
                          {successStoryPdfGroups.slice(0, 3).map((g) => (
                            <li key={g.id} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                              <span>
                                <span className="font-medium">{g.state}</span>
                                <span className="text-muted-foreground"> — {g.stories.length} stories</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-5">
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                          <Play className="h-4 w-4 text-saffron" />
                          Video Documentaries
                        </div>
                        <ul className="space-y-2 text-sm text-foreground/90">
                          {successStoryVideos.map((v) => (
                            <li key={v.id} className="line-clamp-2 leading-snug">
                              {v.title}
                              <span className="text-muted-foreground"> · {v.duration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="border-t border-border bg-secondary/30 px-4 py-3 text-right">
                      <Link
                        to="/success-stories"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        View all success stories <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </KnowledgeCenterSection>
              );
            }

            if (sec.id === "institutes") {
              return (
                <KnowledgeCenterSection
                  key={sec.id}
                  id={sec.id}
                  title={sec.title}
                  subtitle="Research, training and technology institutions partnering with the National Bamboo Mission."
                  icon={Icon}
                  variant={variant}
                >
                  <InstitutesSection />
                </KnowledgeCenterSection>
              );
            }

            return (
              <KnowledgeCenterSection
                key={sec.id}
                id={sec.id}
                title={sec.title}
                icon={Icon}
                variant={variant}
              >
                <div className="grid gap-3 md:grid-cols-2">
                  {sec.items.map((d) => (
                    <button
                      key={d.id}
                      id={`${sec.id}-${d.id}`}
                      type="button"
                      onClick={() => downloadSamplePdf(d.title)}
                      className="group flex w-full cursor-pointer scroll-mt-28 items-start gap-4 rounded-lg border border-border bg-card p-4 text-left shadow-soft transition hover:border-primary hover:shadow-card"
                    >
                      <Icon className="h-8 w-8 shrink-0 text-saffron" />
                      <div className="flex-1">
                        <div className="font-medium text-foreground group-hover:text-primary">{d.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{d.description}</div>
                      </div>
                      <Download className="mt-1 h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              </KnowledgeCenterSection>
            );
          })}
        </div>
      </div>
    </>
  );
}
