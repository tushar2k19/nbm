import { Link } from "@tanstack/react-router";
import {
  featuredImplementingStates,
  IMPLEMENTING_STATES_OFFICIAL_COUNT,
} from "@/data/implementingStates";
import { StateMapCard } from "@/components/implementing-states/StateMapCard";
import { ArrowRight, MapPin } from "lucide-react";

export function ImplementingStatesPreview() {
  return (
    <section id="implementing-states" className="scroll-mt-28">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-7 w-1.5 rounded bg-saffron" />
        <h2 className="text-xl font-bold text-primary">Implementing States</h2>
      </div>

      <div className="is-preview">
        <div className="is-preview__inner">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary/60">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Pan-India coverage
            </p>
            <p className="mt-2 font-display text-lg font-bold text-primary sm:text-xl">
              {IMPLEMENTING_STATES_OFFICIAL_COUNT} States implementing the National Bamboo Mission
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              From the bamboo-rich North-East to the Deccan and Himalayan foothills, State Bamboo
              Missions drive plantation, nursery development, processing and livelihood programmes
              under centrally sponsored NBM funding — aligned with the official list at{" "}
              <a
                href="https://nbm.da.gov.in/Implementing-States"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                nbm.da.gov.in
              </a>
              .
            </p>
            <Link
              to="/implementing-states"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              View all implementing States
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="is-preview__grid">
            {featuredImplementingStates.map((state) => (
              <div key={state.id} className="is-preview__card">
                <StateMapCard state={state} showTagline={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
