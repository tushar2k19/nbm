import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart, Sprout, Factory, Leaf, Download, BarChart3 } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { allReportSections } from "@/data/reportsDocuments";
import plantationImg from "@/assets/bamboo-northeast.jpg";
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
  "annual-action-plan": plantationImg,
  "bamboo-plantation": plantationImg,
  "agarbatti-stick": agarbattiImg,
  "accredited-nurseries": nurseryImg,
};

const sectionIcons: Record<string, typeof Sprout> = {
  "annual-action-plan": BarChart3,
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
      <section className="mx-auto max-w-7xl px-4 py-12 space-y-10">
        {allReportSections.map((s) => {
          const Icon = sectionIcons[s.id] ?? FileBarChart;
          const img = sectionImages[s.id] ?? plantationImg;

          return (
            <div
              key={s.id}
              id={s.id}
              className="scroll-mt-28 bg-card border border-border rounded-lg shadow-soft overflow-hidden grid md:grid-cols-[220px_1fr]"
            >
              <img src={img} alt={s.title} className="h-40 md:h-full w-full object-cover" loading="lazy" />
              <div>
                <div className="bg-primary text-primary-foreground px-5 py-3 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-saffron" />
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-xs opacity-90">{s.description}</div>
                  </div>
                </div>
                <ul className="divide-y divide-border">
                  {s.items.map((i) => (
                    <li
                      key={i.id}
                      id={`${s.id}-${i.id}`}
                      className="scroll-mt-28 flex items-center justify-between gap-4 px-5 py-3 hover:bg-secondary/60 transition"
                    >
                      <div className="flex items-center gap-3">
                        <FileBarChart className="h-4 w-4 text-primary shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{i.title}</div>
                          <div className="text-xs text-muted-foreground">{i.description}</div>
                        </div>
                      </div>
                      <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                        <Download className="h-3.5 w-3.5" /> Download
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
