import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart, Sprout, Factory, Leaf } from "lucide-react";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import { DocFormatBadge } from "@/components/DocFormatBadge";
import { PageHero } from "@/components/SiteLayout";
import { sectorReportSections } from "@/data/reportsDocuments";
import { reportPortalLinks } from "@/data/reportPortals";
import { ReportPortalBanner } from "@/components/reports/ReportPortalBanner";
import { AnnualActionPlanSection } from "@/components/reports/AnnualActionPlanSection";
import plantationImg from "@/assets/bamboo-plantation.jpg";
import agarbattiImg from "@/assets/bamboo-agarbatti.jpg";
import nurseryImg from "@/assets/bamboo-grove.jpg";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports | National Bamboo Mission" },
      {
        name: "description",
        content: "NBM annual action plans, bamboo plantation, agarbatti sticks production and accredited nurseries reports.",
      },
    ],
  }),
  component: ReportsPage,
});

const sectionImages: Record<string, string> = {
  "bamboo-plantation": plantationImg,
  "agarbatti-stick": agarbattiImg,
  "accredited-nurseries": nurseryImg,
};

const sectionIcons: Record<string, typeof Sprout> = {
  "bamboo-plantation": Sprout,
  "agarbatti-stick": Leaf,
  "accredited-nurseries": Factory,
};

function ReportsPage() {
  return (
    <>
      <PageHero
        title="Reports"
        subtitle="Annual action plans, public reports and statistical data on the Mission's progress."
      />
      <section className="reports-page mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reports-page__sections">
        <AnnualActionPlanSection />

        {sectorReportSections.map((s) => {
          const Icon = sectionIcons[s.id] ?? FileBarChart;
          const img = sectionImages[s.id] ?? plantationImg;

          return (
            <div key={s.id} id={s.id} className="reports-section scroll-mt-28">
              <img src={img} alt={s.title} className="reports-section__image" loading="lazy" />
              <div className="min-w-0">
                <div className="reports-section__header">
                  <Icon className="h-4 w-4 shrink-0 text-saffron" />
                  <div className="min-w-0">
                    <div className="reports-section__title">{s.title}</div>
                    <div className="reports-section__subtitle">{s.description}</div>
                  </div>
                </div>
                {reportPortalLinks[s.id] && (
                  <ReportPortalBanner config={reportPortalLinks[s.id]!} />
                )}
                <ul className="divide-y divide-border">
                  {s.items.map((i) => (
                    <li
                      key={i.id}
                      id={`${s.id}-${i.id}`}
                      className="reports-doc-list__item scroll-mt-28"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <FileBarChart className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <div className="min-w-0">
                          <div className="reports-doc-list__title text-foreground">{i.title}</div>
                          <DocFormatBadge description={i.description} />
                        </div>
                      </div>
                      <DownloadPdfButton
                        label={i.title}
                        variant="link"
                        showText
                        text="Download"
                        iconClassName="h-3 w-3"
                        className="text-[11px]"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
        </div>
      </section>
    </>
  );
}
