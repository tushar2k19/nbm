import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import {
  vacancies,
  tenders,
  type TenderVacancyItem,
  type TenderVacancyTab,
} from "@/data/tendersVacancies";
import { Briefcase, FileSearch, Search, Info, Archive, EyeOff } from "lucide-react";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import { useMemo, useState } from "react";

/** Parse DD.MM.YYYY → Date, or return null on failure */
function parseDMY(s: string): Date | null {
  const parts = s.split(".");
  if (parts.length !== 3) return null;
  const [d, m, y] = parts.map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d);
}

function isExpired(endDate: string): boolean {
  const d = parseDMY(endDate);
  if (!d) return false;
  return d < new Date();
}

function FormatSizeBadge({ size }: { size: string }) {
  return (
    <span className="flex items-center gap-1 mt-0.5">
      <span className="inline-flex items-center gap-0.5 rounded border border-red-200 bg-red-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-red-700">
        PDF
      </span>
      <span className="text-[10px] text-muted-foreground" aria-label={`File size: ${size}`}>
        {size}
      </span>
      <span className="rounded bg-amber-50 border border-amber-200 px-1 py-0.5 text-[10px] font-medium text-amber-700">
        Sample
      </span>
    </span>
  );
}

export const Route = createFileRoute("/tenders-vacancies")({
  head: () => ({
    meta: [
      { title: "Tenders / Vacancies — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Official vacancies and tender notices published by the National Bamboo Mission, Government of India.",
      },
    ],
  }),
  component: TendersVacanciesPage,
});

function TendersVacanciesPage() {
  const [activeTab, setActiveTab] = useState<TenderVacancyTab>("vacancies");
  const [query, setQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const items = activeTab === "vacancies" ? vacancies : tenders;
  const archivedCount = useMemo(() => items.filter((i) => isExpired(i.endDate)).length, [items]);

  const filtered = useMemo(() => {
    const base = showArchived ? items : items.filter((i) => !isExpired(i.endDate));
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.publishDate.includes(q) ||
        item.startDate.includes(q) ||
        item.endDate.includes(q),
    );
  }, [items, query, showArchived]);

  return (
    <>
      <PageHero
        title="Tenders / Vacancies"
        subtitle="Official recruitment notices and tender invitations published by the National Bamboo Mission."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 rounded-xl border border-border bg-card shadow-soft overflow-hidden">
          {/* Vertical tabs — desktop */}
          <div className="lg:w-52 shrink-0 flex lg:flex-col border-b lg:border-b-0 lg:border-r border-border bg-secondary/40">
            <TabButton
              active={activeTab === "vacancies"}
              onClick={() => {
                setActiveTab("vacancies");
                setQuery("");
              }}
              icon={Briefcase}
              label="Vacancies"
              count={vacancies.length}
            />
            <TabButton
              active={activeTab === "tenders"}
              onClick={() => {
                setActiveTab("tenders");
                setQuery("");
              }}
              icon={FileSearch}
              label="Tenders"
              count={tenders.length}
            />
          </div>

          {/* Table area */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="px-4 sm:px-6 py-4 border-b border-border bg-background">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${activeTab}…`}
                  className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <p className="text-xs text-muted-foreground">
                  Showing {filtered.length} of {showArchived ? items.length : items.length - archivedCount}{" "}
                  {activeTab === "vacancies" ? "vacancy" : "tender"}
                  {filtered.length !== 1 ? " notices" : " notice"}
                  {!showArchived && archivedCount > 0 && (
                    <span className="ml-1 text-muted-foreground/70">
                      ({archivedCount} archived hidden)
                    </span>
                  )}
                </p>
                {archivedCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowArchived((v) => !v)}
                    aria-pressed={showArchived}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {showArchived ? (
                      <><EyeOff className="h-3 w-3" aria-hidden /> Hide Archived</>
                    ) : (
                      <><Archive className="h-3 w-3" aria-hidden /> Show Archived ({archivedCount})</>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[720px]">
                <caption className="sr-only">
                  {activeTab === "vacancies"
                    ? "Vacancies — National Bamboo Mission recruitment notices"
                    : "Tenders — National Bamboo Mission tender invitations"}
                </caption>
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th scope="col" className="text-left px-4 py-3 font-semibold whitespace-nowrap w-16">
                      Sr. No.
                    </th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold min-w-[280px]">Title</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      Start Date
                    </th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      End Date
                    </th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      Publish Date
                    </th>
                    <th scope="col" className="text-center px-4 py-3 font-semibold whitespace-nowrap w-24">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                        No {activeTab} found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item, idx) => (
                      <TableRow key={item.id} item={item} index={idx} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="mt-6 flex items-start gap-3 bg-secondary/60 border border-border rounded-xl px-5 py-4">
          <Info className="h-5 w-5 text-saffron shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p className="font-semibold text-foreground text-sm mb-1">Important Information</p>
            <p>
              All vacancies and tenders listed here are published by the National Bamboo Mission,
              Ministry of Agriculture and Farmers Welfare. Interested candidates and bidders must
              refer to the detailed notice before applying. For queries, contact{" "}
              <a href="mailto:nbm-agri@gov.in" className="text-primary font-medium hover:underline">
                nbm-agri@gov.in
              </a>{" "}
              or call the helpline at{" "}
              <a href="tel:18001801551" className="text-primary font-medium hover:underline">
                1800-180-1551
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Briefcase;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 lg:flex-none flex items-center justify-between lg:justify-start gap-3 px-5 py-4 text-sm font-semibold transition-colors border-l-4 lg:border-l-0 lg:border-r-4 ${
        active
          ? "bg-primary text-primary-foreground border-saffron lg:border-r-saffron"
          : "text-foreground hover:bg-secondary border-transparent"
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          active ? "bg-primary-foreground/20" : "bg-primary/10 text-primary"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function TableRow({ item, index }: { item: TenderVacancyItem; index: number }) {
  const expired = isExpired(item.endDate);
  return (
    <tr
      className={`border-b border-border transition-colors hover:bg-primary/5 ${
        expired ? "opacity-60" : index % 2 === 0 ? "bg-card" : "bg-secondary/30"
      } ${expired ? "bg-secondary/10" : ""}`}
      aria-label={expired ? `${item.title} (Expired)` : item.title}
    >
      <td scope="row" className="px-4 py-3.5 text-muted-foreground font-medium">{item.srNo}</td>
      <td className="px-4 py-3.5 leading-snug">
        <div className="flex flex-col gap-1">
          <span className={expired ? "text-muted-foreground line-through decoration-1" : "text-foreground"}>
            {item.title}
          </span>
          {expired && (
            <span
              className="inline-flex w-fit items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase text-red-700"
              aria-label="This notice has expired"
            >
              <Archive className="h-2.5 w-2.5" aria-hidden />
              Expired
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">{item.startDate}</td>
      <td className={`px-4 py-3.5 whitespace-nowrap font-medium ${expired ? "text-red-600" : "text-muted-foreground"}`}>
        {item.endDate}
      </td>
      <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">{item.publishDate}</td>
      <td className="px-4 py-3.5 text-center">
        <div className="inline-flex flex-col items-center gap-1">
          <DownloadPdfButton label={item.documentTitle} />
          <FormatSizeBadge size={item.documentSize} />
        </div>
      </td>
    </tr>
  );
}
