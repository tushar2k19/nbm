import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { researchPapers } from "@/data/researchPapers";
import { downloadSamplePdf } from "@/lib/samplePdf";
import { Download, FileText, Search, ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/knowledge-center/research-papers")({
  head: () => ({
    meta: [
      { title: "Research Papers — Knowledge Center | NBM" },
      {
        name: "description",
        content:
          "Research publications on bamboo cultivation, processing, composites, livelihoods and policy from NBM partner institutions.",
      },
    ],
  }),
  component: ResearchPapersPage,
});

function ResearchPapersPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return researchPapers;
    return researchPapers.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.date.includes(q),
    );
  }, [query]);

  return (
    <>
      <PageHero
        title="Research Papers"
        subtitle="Scientific and technical publications on bamboo sector development — from NBM partner institutes and research organisations."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <Link
          to="/knowledge-center"
          className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Knowledge Center
        </Link>

        <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
          <div className="bg-primary/5 border-b border-border px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-saffron" />
              <div>
                <h2 className="font-semibold text-primary text-sm sm:text-base">Research Papers</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {filtered.length} of {researchPapers.length} publications
                </p>
              </div>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, author or year…"
                className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <caption className="sr-only">
                Research papers and publications on bamboo cultivation, processing, composites and policy from NBM partner institutions
              </caption>
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="text-left px-4 py-3 font-semibold w-16">S. No.</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold min-w-[320px]">Title</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold min-w-[160px]">Author Name</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold w-20">Date</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold w-36">Download</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                      No research papers found matching your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((paper, idx) => (
                    <tr
                      key={paper.id}
                      id={paper.id}
                      className={`border-b border-border align-top scroll-mt-28 transition-colors hover:bg-primary/5 ${
                        idx % 2 === 0 ? "bg-card" : "bg-secondary/30"
                      }`}
                    >
                      <td className="px-4 py-3.5 text-muted-foreground font-medium">
                        {paper.srNo}
                      </td>
                      <td className="px-4 py-3.5 text-foreground leading-snug font-medium">
                        {paper.title}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">{paper.author}</td>
                      <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                        {paper.date}
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          type="button"
                          onClick={() => downloadSamplePdf(paper.title)}
                          title={`Download PDF — ${paper.fileSize}`}
                          aria-label={`Download PDF — ${paper.title}`}
                          className="group inline-flex items-center gap-2 text-xs hover:text-primary transition-colors"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 border border-red-200 text-red-600 group-hover:bg-red-100 transition-colors">
                            <Download className="h-4 w-4" />
                          </span>
                          <span className="text-muted-foreground group-hover:text-primary text-left">
                            Type: PDF
                            <br />
                            Size: {paper.fileSize}
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
