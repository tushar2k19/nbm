import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import {
  vacancies,
  tenders,
  type TenderVacancyItem,
  type TenderVacancyTab,
} from "@/data/tendersVacancies";
import { Briefcase, FileSearch, Download, Search, Info } from "lucide-react";
import { useMemo, useState } from "react";

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

  const items = activeTab === "vacancies" ? vacancies : tenders;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.publishDate.includes(q) ||
        item.startDate.includes(q) ||
        item.endDate.includes(q),
    );
  }, [items, query]);

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
              <p className="text-xs text-muted-foreground mt-2">
                Showing {filtered.length} of {items.length}{" "}
                {activeTab === "vacancies" ? "vacancy" : "tender"}
                {filtered.length !== 1 ? " notices" : " notice"}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap w-16">
                      Sr. No.
                    </th>
                    <th className="text-left px-4 py-3 font-semibold min-w-[280px]">Title</th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      Start Date
                    </th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      End Date
                    </th>
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      Publish Date
                    </th>
                    <th className="text-center px-4 py-3 font-semibold whitespace-nowrap w-24">
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
  return (
    <tr
      className={`border-b border-border transition-colors hover:bg-primary/5 ${
        index % 2 === 0 ? "bg-card" : "bg-secondary/30"
      }`}
    >
      <td className="px-4 py-3.5 text-muted-foreground font-medium">{item.srNo}</td>
      <td className="px-4 py-3.5 text-foreground leading-snug">{item.title}</td>
      <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">{item.startDate}</td>
      <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">{item.endDate}</td>
      <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">{item.publishDate}</td>
      <td className="px-4 py-3.5 text-center">
        <a
          href="#"
          title={`Download: ${item.documentTitle} (${item.documentSize})`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label={`Download ${item.documentTitle}`}
        >
          <Download className="h-5 w-5" />
        </a>
      </td>
    </tr>
  );
}
