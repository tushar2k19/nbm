import { createFileRoute, notFound } from "@tanstack/react-router";
import { TrainingModuleDetailPage } from "@/components/training-modules/TrainingModuleDetailPage";
import { getTrainingModuleGroup } from "@/data/trainingModules";

export const Route = createFileRoute("/training-module/$groupId")({
  head: ({ params }) => {
    const group = getTrainingModuleGroup(params.groupId);
    return {
      meta: group
        ? [
            { title: `${group.shortTitle} — Training Modules | NBM` },
            { name: "description", content: group.description },
          ]
        : [{ title: "Training module not found — NBM" }],
    };
  },
  loader: ({ params }) => {
    const group = getTrainingModuleGroup(params.groupId);
    if (!group) throw notFound();
    return { group };
  },
  component: TrainingModuleDetailRoute,
});

function TrainingModuleDetailRoute() {
  const { group } = Route.useLoaderData();
  return <TrainingModuleDetailPage group={group} />;
}
