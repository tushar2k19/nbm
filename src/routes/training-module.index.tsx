import { createFileRoute } from "@tanstack/react-router";
import { TrainingModulesPage } from "@/components/training-modules/TrainingModulesPage";

export const Route = createFileRoute("/training-module/")({
  head: () => ({
    meta: [
      { title: "Training Modules — Knowledge Center | NBM" },
      {
        name: "description",
        content:
          "Official training modules from BEDF Baihar, NID, NECBDC and ICFRI — skill development PDFs for farmers, artisans and field functionaries under the National Bamboo Mission.",
      },
    ],
  }),
  component: TrainingModulesPage,
});
