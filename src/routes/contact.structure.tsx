import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { ContactSubNav } from "@/components/contact/ContactSubNav";
import { NbmStructureContent } from "@/components/contact/NbmStructureContent";
import { SectionHero } from "@/components/SectionHero";
import { nbmStructureLevels, nbmStructurePageTitle } from "@/data/nbmStructure";
import { GitBranch, Layers, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contact/structure")({
  head: () => ({
    meta: [
      { title: "Structure of NBM — National Bamboo Mission" },
      {
        name: "description",
        content:
          "National, State and District level governance structure of the National Bamboo Mission — Executive Committee, NBMC, BTSG, SLEC and Bamboo Development Agencies.",
      },
    ],
  }),
  component: NbmStructurePage,
});

function NbmStructurePage() {
  return (
    <>
      <PageHero
        title={nbmStructurePageTitle}
        subtitle="National, State and District governance framework for the National Bamboo Mission — as published by the Department of Agriculture and Farmers Welfare."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <ContactSubNav active="structure" />

        <SectionHero
          panel
          eyebrow={
            <>
              <Layers className="h-3.5 w-3.5" aria-hidden />
              Mission governance
            </>
          }
          title="How the National Bamboo Mission is organised"
          aside={
            <div className="section-hero__info">
              <div className="section-hero__info-label">
                <GitBranch className="h-3.5 w-3.5" aria-hidden />
                Three tiers
              </div>
              <p className="section-hero__info-text">
                National · State · District
                <br />
                EC → NBMC → BTSG → SLEC → BDA
              </p>
            </div>
          }
        >
          <p>
            The National Bamboo Mission operates through a multi-tier institutional framework
            spanning the <strong>Executive Committee (EC)</strong> at the national level,{" "}
            <strong>State Level Executive Committees (SLEC)</strong> and{" "}
            <strong>Bamboo Development Agencies (BDA)</strong> in implementing States, and{" "}
            <strong>District Level Agencies</strong> for ground-level coordination.
          </p>
          <p>
            The structure below is reproduced from the official NBM portal at{" "}
            <a
              href="https://nbm.da.gov.in/Structure"
              target="_blank"
              rel="noreferrer"
              className="section-hero__link"
            >
              nbm.da.gov.in/Structure
              <ExternalLink className="inline h-3 w-3" aria-hidden />
            </a>
            .
          </p>
        </SectionHero>

        <div className="mt-6">
          <NbmStructureContent levels={nbmStructureLevels} />
        </div>
      </section>
    </>
  );
}
