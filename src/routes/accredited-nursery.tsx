import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, Sprout } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { SectionHero } from "@/components/SectionHero";
import {
  ALL,
  accreditedNurseries,
  filterAccreditedNurseries,
  nurserySummary,
} from "@/data/accreditedNurseries";
import type { NurseryFilters } from "@/data/accreditedNurseries";
import { NurserySummaryStrip } from "@/components/accredited-nursery/NurserySummaryStrip";
import { NurseryFilters as NurseryFiltersPanel } from "@/components/accredited-nursery/NurseryFilters";
import { NurseryToolbar } from "@/components/accredited-nursery/NurseryToolbar";
import { NurseryTable } from "@/components/accredited-nursery/NurseryTable";
import { NurseryPagination } from "@/components/accredited-nursery/NurseryPagination";

const PAGE_SIZE = 10;

const DEFAULT_FILTERS: NurseryFilters = {
  year: ALL,
  state: ALL,
  district: ALL,
  block: ALL,
};

export const Route = createFileRoute("/accredited-nursery")({
  head: () => ({
    meta: [
      { title: "Accredited Nurseries — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Comprehensive directory of NBM-accredited bamboo nurseries across India, with species stock, contact details and state-wise filters.",
      },
    ],
  }),
  component: AccreditedNurseryPage,
});

function AccreditedNurseryPage() {
  const [filters, setFilters] = useState<NurseryFilters>(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  function handleFilterChange(key: keyof NurseryFilters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }

  function handleSearch(q: string) {
    setSearch(q);
    setPage(0);
  }

  const filtered = useMemo(
    () => filterAccreditedNurseries(filters, search),
    [filters, search],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageRows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      <PageHero
        title="Accredited Nursery"
        subtitle="NBM-accredited bamboo nurseries across India — quality propagule sources for farmers, departments and private growers."
      />

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-10 an-page">
        {/* Back link */}
        <Link
          to="/dashboard"
          hash="nurseries"
          className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Section hero with national KPI strip inside */}
        <div>
          <SectionHero
            eyebrow={
              <>
                <Sprout className="h-3.5 w-3.5" aria-hidden />
                National Bamboo Mission
              </>
            }
            title="Accredited Nursery Directory"
            aside={
              <div aria-label="National nursery statistics" className="flex flex-col gap-1">
                <div className="section-hero__metric">
                  <span className="section-hero__metric-value text-gradient-mitra">
                    {nurserySummary.totalNurseries}
                  </span>
                  <span className="section-hero__metric-label">Nurseries</span>
                </div>
                <div className="section-hero__metric">
                  <span className="section-hero__metric-value section-hero__metric-value--light">
                    {nurserySummary.totalSpecies}
                  </span>
                  <span className="section-hero__metric-label">Species</span>
                </div>
                <div className="section-hero__metric">
                  <span className="section-hero__metric-value section-hero__metric-value--light">
                    {(nurserySummary.totalStock / 1_000_000).toFixed(1)}M
                  </span>
                  <span className="section-hero__metric-label">Propagules</span>
                </div>
              </div>
            }
          >
            <p className="section-hero__desc !mt-0">
              Pan-India registry of bamboo nurseries accredited under the National Bamboo Mission.
              Each nursery is certified for species quality, stock availability and propagation
              method — seed, vegetative, or both. Use the filters below to locate nurseries by
              state, district and block.
            </p>
          </SectionHero>

          {/* KPI stat strip */}
          <NurserySummaryStrip />
        </div>

        {/* Directory panel */}
        <div className="an-directory-panel">
          {/* Filters */}
          <NurseryFiltersPanel filters={filters} onChange={handleFilterChange} />

          {/* Toolbar: search + count + export */}
          <NurseryToolbar
            total={accreditedNurseries.length}
            filtered={filtered.length}
            search={search}
            onSearch={handleSearch}
            exportData={filtered}
          />

          {/* Data table */}
          <NurseryTable nurseries={pageRows} startIndex={page * PAGE_SIZE} />

          {/* Pagination */}
          <NurseryPagination
            page={page}
            totalPages={totalPages}
            total={filtered.length}
            pageSize={PAGE_SIZE}
            onPage={setPage}
          />
        </div>
      </section>
    </>
  );
}
