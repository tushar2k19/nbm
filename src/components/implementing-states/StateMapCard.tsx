import type { ImplementingState } from "@/data/implementingStates";

type StateMapCardProps = {
  state: ImplementingState;
  compact?: boolean;
  showTagline?: boolean;
};

export function StateMapCard({ state, showTagline = true }: StateMapCardProps) {
  return (
    <article className="is-state-card group" id={`state-${state.id}`}>
      <div className="is-state-card__map-wrap">
        <img
          src={state.mapImageUrl}
          alt={`${state.name} map`}
          className="is-state-card__map"
          loading="lazy"
          width={120}
          height={80}
        />
      </div>
      <h3 className="is-state-card__name group-hover:text-primary transition-colors">
        {state.name}
      </h3>
      {showTagline && <p className="is-state-card__tagline">{state.tagline}</p>}
    </article>
  );
}
