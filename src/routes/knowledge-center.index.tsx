import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { knowledgeCenterSections, institutes } from "@/data/knowledgeCenter";
import {
  FileText,
  Download,
  GraduationCap,
  Package,
  Mail,
  Building2,
  ArrowRight,
  MapPin,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { researchPapers } from "@/data/researchPapers";

export const Route = createFileRoute("/knowledge-center/")({
  head: () => ({
    meta: [
      { title: "Knowledge Center — NBM" },
      {
        name: "description",
        content:
          "Training modules, institutes, value-added bamboo products and official letters from the National Bamboo Mission.",
      },
    ],
  }),
  component: KnowledgeCenterPage,
});

const sectionIcons = {
  "training-modules": GraduationCap,
  institutes: Building2,
  "value-added-products": Package,
  letters: Mail,
  "research-papers": BookOpen,
} as const;

function KnowledgeCenterPage() {
  return (
    <>
      <PageHero
        title="Knowledge Center"
        subtitle="Training resources, partner institutes, product catalogues and official communications to support farmers, artisans and entrepreneurs."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 space-y-10">
        {knowledgeCenterSections.map((sec) => {
          const Icon = sectionIcons[sec.id as keyof typeof sectionIcons] ?? FileText;

          if (sec.id === "value-added-products") {
            return (
              <div key={sec.id} id={sec.id} className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-7 w-1.5 bg-saffron rounded" />
                  <h2 className="text-xl font-bold text-primary">{sec.title}</h2>
                </div>
                <div className="bg-secondary border border-border rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Icon className="h-10 w-10 text-saffron shrink-0" />
                    <div>
                      <p className="text-foreground/85">
                        Explore bamboo-based value added products — handicrafts, furniture, construction materials,
                        charcoal, agarbatti sticks and lifestyle goods.
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {sec.items.map((item) => (
                          <li key={item.id}>
                            <span className="inline-block text-xs bg-card border border-border rounded-full px-3 py-1 text-muted-foreground">
                              {item.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 shrink-0 bg-primary text-primary-foreground px-5 py-2.5 rounded font-semibold hover:opacity-90 transition"
                  >
                    View products
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          }

          if (sec.id === "research-papers") {
            return (
              <div key={sec.id} id={sec.id} className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-7 w-1.5 bg-saffron rounded" />
                  <h2 className="text-xl font-bold text-primary">{sec.title}</h2>
                </div>
                <p className="mb-4 text-sm text-muted-foreground max-w-3xl">
                  Scientific and technical publications on bamboo cultivation, processing, composites and livelihoods.
                </p>
                <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse min-w-[640px]">
                      <thead>
                        <tr className="bg-primary text-primary-foreground">
                          <th className="text-left px-4 py-3 font-semibold w-14">S. No.</th>
                          <th className="text-left px-4 py-3 font-semibold">Title</th>
                          <th className="text-left px-4 py-3 font-semibold w-28">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {researchPapers.slice(0, 5).map((paper, idx) => (
                          <tr
                            key={paper.id}
                            className={`border-b border-border ${idx % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}
                          >
                            <td className="px-4 py-3 text-muted-foreground">{paper.srNo}</td>
                            <td className="px-4 py-3 text-foreground leading-snug">{paper.title}</td>
                            <td className="px-4 py-3 text-muted-foreground">{paper.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="border-t border-border px-4 py-3 text-right bg-secondary/30">
                    <Link
                      to="/knowledge-center/research-papers"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      View all research papers <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          }

          if (sec.id === "institutes") {
            return (
              <div key={sec.id} id={sec.id} className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-7 w-1.5 bg-saffron rounded" />
                  <h2 className="text-xl font-bold text-primary">{sec.title}</h2>
                </div>
                <p className="mb-6 text-sm text-muted-foreground max-w-3xl">
                  Research, training and technology institutions partnering with the National Bamboo Mission.
                </p>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {institutes.map((inst) => (
                    <div
                      key={inst.id}
                      id={`institutes-${inst.id}`}
                      className="scroll-mt-28 bg-card border border-border rounded-lg p-5 shadow-soft hover:shadow-card transition"
                    >
                      <Building2 className="h-7 w-7 text-saffron" />
                      <h3 className="mt-3 font-semibold text-primary leading-snug">{inst.name}</h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0" /> {inst.location}
                      </div>
                      <p className="mt-3 text-sm text-foreground/80">{inst.role}</p>
                      <a
                        href="#"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        Visit website <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
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
                    <Icon className="h-8 w-8 text-saffron shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground group-hover:text-primary">{d.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{d.description}</div>
                    </div>
                    <Download className="h-5 w-5 text-muted-foreground group-hover:text-primary mt-1" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
