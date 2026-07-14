import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, TreePine } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { SectionHero } from "@/components/SectionHero";
import {
  ALL,
  bambooPlantations,
  plantationSummary,
  filterPlantations,
} from "@/data/bambooPlantations";
import type { PlantationFilters } from "@/data/bambooPlantations";
import { PlantationSummaryStrip } from "@/components/bamboo-plantation/PlantationSummaryStrip";
import { PlantationFilters as PlantationFiltersPanel } from "@/components/bamboo-plantation/PlantationFilters";
import { PlantationToolbar } from "@/components/bamboo-plantation/PlantationToolbar";
import { PlantationTable } from "@/components/bamboo-plantation/PlantationTable";
import { PlantationPagination } from "@/components/bamboo-plantation/PlantationPagination";

const PAGE_SIZE = 10;

const DEFAULT_FILTERS: PlantationFilters = {
  year: ALL,
  state: ALL,
  district: ALL,
  block: ALL,
};

export const Route = createFileRoute("/plantation")({
  head: () => ({
    meta: [
      { title: "Bamboo Plantation — National Bamboo Mission" },
      {
        name: "description",
        content:
          "MIS directory of bamboo plantations across India — area, species, culms, irrigation status and beneficiary details under NBM.",
      },
    ],
  }),
  component: PlantationPage,
});

function PlantationPage() {
  const [filters, setFilters] = useState<PlantationFilters>(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  function handleFilterChange(key: keyof PlantationFilters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }

  function handleSearch(q: string) {
    setSearch(q);
    setPage(0);
  }

  const filtered = useMemo(
    () => filterPlantations(filters, search),
    [filters, search],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageRows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      <PageHero
        title="Bamboo Plantation"
        subtitle="Farm and block-level bamboo plantations under the National Bamboo Mission — species coverage, area, culms and beneficiary records."
      />

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-10 bp-page">
        <Link
          to="/dashboard"
          hash="plantations"
          className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div>
          <SectionHero
            eyebrow={
              <>
                <TreePine className="h-3.5 w-3.5" aria-hidden />
                National Bamboo Mission · MIS
              </>
            }
            title="Bamboo Plantation Directory"
            aside={
              <div aria-label="National plantation statistics" className="flex flex-col gap-1">
                <div className="section-hero__metric">
                  <span className="section-hero__metric-value text-gradient-mitra">
                    {plantationSummary.totalPlantations.toLocaleString("en-IN")}
                  </span>
                  <span className="section-hero__metric-label">Plantations</span>
                </div>
                <div className="section-hero__metric">
                  <span className="section-hero__metric-value section-hero__metric-value--light">
                    {plantationSummary.totalAreaHa.toLocaleString("en-IN", { maximumFractionDigits: 1 })} Ha
                  </span>
                  <span className="section-hero__metric-label">Total Area</span>
                </div>
                <div className="section-hero__metric">
                  <span className="section-hero__metric-value section-hero__metric-value--light">
                    {(plantationSummary.totalCulmsPlants / 1_000_000).toFixed(2)}M
                  </span>
                  <span className="section-hero__metric-label">Culms</span>
                </div>
              </div>
            }
          >
            <p className="section-hero__desc !mt-0">
              Pan-India registry of bamboo plantations documented under the NBM MIS portal.
              Each record includes location, plantation code, person in-charge, area under
              cultivation, irrigation status, ownership category, and species-wise culm counts.
            </p>
          </SectionHero>

          <PlantationSummaryStrip />
        </div>

        <div className="bp-directory-panel">
          <PlantationFiltersPanel filters={filters} onChange={handleFilterChange} />

          <PlantationToolbar
            total={bambooPlantations.length}
            filtered={filtered.length}
            search={search}
            onSearch={handleSearch}
            exportData={filtered}
          />

          <PlantationTable plantations={pageRows} startIndex={page * PAGE_SIZE} />

          <PlantationPagination
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
