import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { guidelineSections } from "@/data/guidelinesDocuments";
import { FileText, Download } from "lucide-react";

export const Route = createFileRoute("/guidelines")({
  head: () => ({
    meta: [
      { title: "Guidelines & Documents — NBM" },
      { name: "description", content: "Operational guidelines, circulars, RTI and downloadable documents of the National Bamboo Mission." },
    ],
  }),
  component: GuidelinesPage,
});

function GuidelinesPage() {
  return (
    <>
      <PageHero title="Guidelines & Documents" subtitle="Operational guidelines, circulars, action plans and reports under the National Bamboo Mission." />
      <section className="mx-auto max-w-7xl px-4 py-12 space-y-10">
        {guidelineSections.map((sec) => (
          <div key={sec.id} id={sec.id} className="scroll-mt-28">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-1.5 bg-saffron rounded" />
              <h2 className="text-xl font-bold text-primary">{sec.title}</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {sec.items.map((d) => (
                <a
                  key={d.id}
                  id={`${sec.id}-${d.id}`}
                  href="#"
                  className="group flex items-start gap-4 bg-card border border-border rounded-lg p-4 shadow-soft hover:shadow-card hover:border-primary transition scroll-mt-28"
                >
                  <FileText className="h-8 w-8 text-saffron shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-foreground group-hover:text-primary">{d.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{d.description}</div>
                  </div>
                  <Download className="h-5 w-5 text-muted-foreground group-hover:text-primary mt-1" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
