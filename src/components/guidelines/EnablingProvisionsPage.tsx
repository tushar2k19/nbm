import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { SectionHero } from "@/components/SectionHero";
import {
  enablingProvisions,
  enablingProvisionsStats,
  type EnablingProvision,
} from "@/data/enablingProvisions";
import {
  ChevronLeft,
  ExternalLink,
  FileText,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

function ProvisionDescription({ provision }: { provision: EnablingProvision }) {
  if (provision.pdfUrl) {
    return (
      <a
        href={provision.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-start gap-2 font-medium text-primary hover:underline"
        title={`Open PDF — ${provision.description}`}
      >
        <span className="leading-snug">{provision.description}</span>
        <ExternalLink
          className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60 group-hover/link:opacity-100"
          aria-hidden
        />
      </a>
    );
  }

  return <span className="leading-snug text-foreground/90">{provision.description}</span>;
}

export function EnablingProvisionsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return enablingProvisions;
    return enablingProvisions.filter((p) => p.description.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <PageHero
        title="Enabling Provisions"
        subtitle="Policy and regulatory measures that support bamboo cultivation, transit, processing and marketing across India."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <Link
          to="/guidelines"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Guidelines & Documents
        </Link>

        <SectionHero
          panel
          eyebrow={
            <>
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Regulatory framework
            </>
          }
          title="Measures that enable the bamboo value chain"
          aside={
            <>
              <div className="section-hero__info">
                <div className="section-hero__info-label">
                  <Scale className="h-3.5 w-3.5" aria-hidden />
                  Coverage
                </div>
                <p className="section-hero__info-text">
                  {enablingProvisionsStats.total} provisions
                  <br />
                  {enablingProvisionsStats.pdfCount} official PDFs
                </p>
              </div>
            </>
          }
        >
          <p>
            The National Bamboo Mission is supported by a set of enabling provisions — amendments,
            notifications, guidelines and state-level rules that reduce regulatory barriers for
            bamboo production, transit, processing and marketing.
          </p>
          <p>
            Content reproduced from the official portal at{" "}
            <a
              href="https://nbm.da.gov.in/Enabling-Provisions"
              target="_blank"
              rel="noreferrer"
              className="section-hero__link"
            >
              nbm.da.gov.in/Enabling-Provisions
              <ExternalLink className="inline h-3 w-3" aria-hidden />
            </a>
            . Items with linked text open the corresponding official PDF document.
          </p>
        </SectionHero>

        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="bg-primary/5 border-b border-border px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Scale className="h-5 w-5 text-saffron" />
              <div>
                <h2 className="font-semibold text-primary text-sm sm:text-base">
                  Enabling Provisions
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {filtered.length} of {enablingProvisionsStats.total} provisions ·{" "}
                  {enablingProvisionsStats.pdfCount} downloadable PDFs
                </p>
              </div>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search provisions…"
                className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <caption className="sr-only">
                Enabling provisions for the National Bamboo Mission — regulatory notifications and
                policy measures
              </caption>
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="w-16 px-4 py-3 text-left font-semibold">
                    S.No.
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">
                    Description
                  </th>
                  <th scope="col" className="w-24 px-4 py-3 text-center font-semibold">
                    Document
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">
                      No provisions found matching your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((provision, idx) => (
                    <tr
                      key={provision.id}
                      id={provision.id}
                      className={`border-b border-border align-top scroll-mt-28 transition-colors hover:bg-primary/5 ${
                        idx % 2 === 0 ? "bg-card" : "bg-secondary/30"
                      }`}
                    >
                      <td className="px-4 py-3.5 font-medium text-muted-foreground whitespace-nowrap">
                        {provision.srNo}.
                      </td>
                      <td className="px-4 py-3.5">
                        <ProvisionDescription provision={provision} />
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {provision.pdfUrl ? (
                          <a
                            href={provision.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Download PDF — ${provision.description}`}
                            aria-label={`Open PDF for provision ${provision.srNo}`}
                            className="group inline-flex flex-col items-center gap-1 text-xs hover:text-primary transition-colors"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 border border-red-200 text-red-600 group-hover:bg-red-100 transition-colors">
                              <FileText className="h-4 w-4" />
                            </span>
                            <span className="text-[10px] text-muted-foreground group-hover:text-primary">
                              PDF
                            </span>
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
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
