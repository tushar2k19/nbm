import {
  implementingStatesOfficial,
  type ImplementingState,
} from "@/data/implementingStates";
import { StateMapCard } from "@/components/implementing-states/StateMapCard";

type ImplementingStatesGridProps = {
  states?: ImplementingState[];
  showTagline?: boolean;
};

export function ImplementingStatesGrid({
  states = implementingStatesOfficial,
  showTagline = true,
}: ImplementingStatesGridProps) {
  return (
    <div className="is-grid" role="list">
      {states.map((state) => (
        <div key={state.id} role="listitem">
          <StateMapCard state={state} showTagline={showTagline} />
        </div>
      ))}
    </div>
  );
}
