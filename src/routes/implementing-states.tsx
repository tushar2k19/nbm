import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { SectionHero } from "@/components/SectionHero";
import { ImplementingStatesGrid } from "@/components/implementing-states/ImplementingStatesGrid";
import {
  IMPLEMENTING_STATES_OFFICIAL_COUNT,
  implementingStatesOfficial,
} from "@/data/implementingStates";
import { ChevronLeft, ExternalLink, MapPin } from "lucide-react";

export const Route = createFileRoute("/implementing-states")({
  head: () => ({
    meta: [
      { title: "Implementing States — National Bamboo Mission" },
      {
        name: "description",
        content:
          "State-wise map gallery of all 26 States implementing the National Bamboo Mission across India.",
      },
    ],
  }),
  component: ImplementingStatesPage,
});

function ImplementingStatesPage() {
  return (
    <>
      <PageHero
        title="Implementing States"
        subtitle="State Bamboo Missions driving bamboo plantation, processing and livelihood programmes across India."
      />

      <div className="is-page">
        <section className="is-page-inner mx-auto max-w-7xl px-4 sm:px-6">
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline mb-6"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back to About NBM
          </Link>

          <SectionHero
            panel
            eyebrow={
              <>
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Official state coverage
              </>
            }
            title="Where NBM is active today"
            aside={
              <div className="section-hero__info">
                <div className="section-hero__info-label">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  Coverage
                </div>
                <p className="section-hero__info-text">
                  {IMPLEMENTING_STATES_OFFICIAL_COUNT} implementing States
                  <br />
                  Pan-India bamboo mission
                </p>
              </div>
            }
          >
            <p>
              The National Bamboo Mission is implemented through State Bamboo Missions in{" "}
              {IMPLEMENTING_STATES_OFFICIAL_COUNT} States. Each State prepares Annual Action Plans,
              establishes nurseries and processing units, and channels subsidies to farmers,
              artisans and entrepreneurs.
            </p>
            <p>
              State silhouettes reproduced from{" "}
              <a
                href="https://nbm.da.gov.in/Implementing-States"
                target="_blank"
                rel="noopener noreferrer"
                className="section-hero__link"
              >
                nbm.da.gov.in/Implementing-States
                <ExternalLink className="inline h-3 w-3" aria-hidden />
              </a>
              . Illustrative plantation statistics on cards are drawn from portal MIS summaries.
            </p>
          </SectionHero>

          <div className="mt-8">
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-primary sm:text-xl">
                  All implementing States
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {implementingStatesOfficial.length} States · alphabetical gallery
                </p>
              </div>
            </div>
            <ImplementingStatesGrid />
          </div>
        </section>
      </div>
    </>
  );
}
