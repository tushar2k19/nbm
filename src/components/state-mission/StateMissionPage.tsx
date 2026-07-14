import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import {
  stateMissionPdfUrl,
  stateMissionRows,
  stateMissionStats,
} from "@/data/stateMission";
import { ChevronLeft, ExternalLink, FileText, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";

export function StateMissionPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stateMissionRows;
    return stateMissionRows.filter(
      (row) =>
        row.stateName.toLowerCase().includes(q) ||
        row.nodalDepartment.toLowerCase().includes(q) ||
        row.missionDirector.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <PageHero
        title="State Mission"
        subtitle="State-wise nodal departments, Mission Directors, SLEC documents and bamboo production data — as published on the official NBM portal."
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
              <MapPin className="h-5 w-5 text-saffron" />
              <div>
                <h2 className="font-semibold text-primary text-sm sm:text-base">State Mission</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {filtered.length} of {stateMissionStats.stateCount} states ·{" "}
                  {stateMissionStats.slecPdfCount} SLEC PDFs
                </p>
              </div>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search state or department…"
                className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <p className="px-5 py-3 text-xs text-muted-foreground border-b border-border bg-secondary/20">
            Production figures are as reported on{" "}
            <a
              href="https://nbm.da.gov.in/State-Mission"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline inline-flex items-center gap-0.5"
            >
              nbm.da.gov.in/State-Mission
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
            . NR = Not Reported.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[960px]">
              <caption className="sr-only">
                State Mission nodal departments, Mission Directors, SLEC documents and bamboo
                production statistics for implementing States
              </caption>
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                    State Name
                  </th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold min-w-[180px]">
                    Nodal Department
                  </th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold min-w-[220px]">
                    Mission Director
                  </th>
                  <th scope="col" className="text-center px-4 py-3 font-semibold w-20">
                    SLEC
                  </th>
                  <th scope="col" className="text-center px-4 py-3 font-semibold min-w-[140px]">
                    Current Stock of Planting Material
                  </th>
                  <th scope="col" className="text-center px-4 py-3 font-semibold min-w-[140px]">
                    Bamboo Harvested in last 5 years (MT)
                  </th>
                  <th scope="col" className="text-center px-4 py-3 font-semibold min-w-[140px]">
                    Bamboo harvest proposed in 2018-19 (MT)
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                      No states found matching your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, idx) => {
                    const pdfUrl = stateMissionPdfUrl(row.slecPdfPath);
                    return (
                      <tr
                        key={row.id}
                        id={row.id}
                        className={`border-b border-border align-top scroll-mt-28 transition-colors hover:bg-primary/5 ${
                          idx % 2 === 0 ? "bg-card" : "bg-secondary/30"
                        }`}
                      >
                        <td className="px-4 py-3.5 font-medium text-foreground whitespace-nowrap">
                          {row.stateName}
                        </td>
                        <td className="px-4 py-3.5 text-muted-foreground leading-snug">
                          {row.nodalDepartment}
                        </td>
                        <td className="px-4 py-3.5 text-muted-foreground leading-snug">
                          {row.missionDirector}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          {pdfUrl ? (
                            <a
                              href={pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`SLEC — ${row.stateName} (PDF)`}
                              aria-label={`Download SLEC document for ${row.stateName}`}
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
                            <span className="text-muted-foreground">{row.slecNote ?? "NR"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-center text-muted-foreground whitespace-nowrap">
                          {row.currentStock}
                        </td>
                        <td className="px-4 py-3.5 text-center text-muted-foreground whitespace-nowrap">
                          {row.harvestedLast5Years}
                        </td>
                        <td className="px-4 py-3.5 text-center text-muted-foreground whitespace-nowrap">
                          {row.proposedHarvest1819}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
