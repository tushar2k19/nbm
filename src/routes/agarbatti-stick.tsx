import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, Flame } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { SectionHero } from "@/components/SectionHero";
import {
  ALL,
  agarbattiStickUnits,
  agarbattiSummary,
  filterAgarbattiUnits,
} from "@/data/agarbattiStickUnits";
import type { AgarbattiFilters } from "@/data/agarbattiStickUnits";
import { AgarbattiSummaryStrip } from "@/components/agarbatti-stick/AgarbattiSummaryStrip";
import { AgarbattiFilters as AgarbattiFiltersPanel } from "@/components/agarbatti-stick/AgarbattiFilters";
import { AgarbattiToolbar } from "@/components/agarbatti-stick/AgarbattiToolbar";
import { AgarbattiTable } from "@/components/agarbatti-stick/AgarbattiTable";
import { AgarbattiPagination } from "@/components/agarbatti-stick/AgarbattiPagination";

const PAGE_SIZE = 10;

const DEFAULT_FILTERS: AgarbattiFilters = {
  year: ALL,
  state: ALL,
  district: ALL,
  block: ALL,
};

export const Route = createFileRoute("/agarbatti-stick")({
  head: () => ({
    meta: [
      { title: "Agarbatti Stick — National Bamboo Mission" },
      {
        name: "description",
        content:
          "MIS directory of round bamboo agarbatti stick manufacturing units across India — production capacity, status and NBM support.",
      },
    ],
  }),
  component: AgarbattiStickPage,
});

function AgarbattiStickPage() {
  const [filters, setFilters] = useState<AgarbattiFilters>(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  function handleFilterChange(key: keyof AgarbattiFilters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }

  function handleSearch(q: string) {
    setSearch(q);
    setPage(0);
  }

  const filtered = useMemo(
    () => filterAgarbattiUnits(filters, search),
    [filters, search],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageRows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      <PageHero
        title="Agarbatti Stick"
        subtitle="Round bamboo stick manufacturing units under the National Bamboo Mission — import substitution, production capacity and market linkages."
      />

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-10 as-page">
        <Link
          to="/dashboard"
          hash="agarbatti-stick"
          className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div>
          <SectionHero
            eyebrow={
              <>
                <Flame className="h-3.5 w-3.5" aria-hidden />
                National Bamboo Mission · MIS
              </>
            }
            title="Agarbatti Stick Unit Directory"
            aside={
              <div aria-label="National agarbatti statistics" className="flex flex-col gap-1">
                <div className="section-hero__metric">
                  <span className="section-hero__metric-value text-gradient-mitra">
                    {agarbattiSummary.totalEnterprises}
                  </span>
                  <span className="section-hero__metric-label">Enterprises</span>
                </div>
                <div className="section-hero__metric">
                  <span className="section-hero__metric-value section-hero__metric-value--light">
                    {agarbattiSummary.enterprisesRunning}
                  </span>
                  <span className="section-hero__metric-label">Running</span>
                </div>
                <div className="section-hero__metric">
                  <span className="section-hero__metric-value section-hero__metric-value--light">
                    {agarbattiSummary.annualCapacityMt} MT
                  </span>
                  <span className="section-hero__metric-label">Capacity</span>
                </div>
              </div>
            }
          >
            <p className="section-hero__desc !mt-0">
              Pan-India registry of round bamboo stick manufacturing units documented under the NBM
              MIS module. Track enterprise status, annual production capacity, bamboo species used,
              and NBM support — supporting Atmanirbhar Bharat and import substitution in the
              agarbatti sector.
            </p>
          </SectionHero>

          <AgarbattiSummaryStrip />
        </div>

        <div className="as-directory-panel">
          <AgarbattiFiltersPanel filters={filters} onChange={handleFilterChange} />

          <AgarbattiToolbar
            total={agarbattiStickUnits.length}
            filtered={filtered.length}
            search={search}
            onSearch={handleSearch}
            exportData={filtered}
          />

          <AgarbattiTable units={pageRows} startIndex={page * PAGE_SIZE} />

          <AgarbattiPagination
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
