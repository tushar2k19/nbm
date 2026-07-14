import { createFileRoute } from "@tanstack/react-router";
import { StateMissionPage } from "@/components/state-mission/StateMissionPage";

export const Route = createFileRoute("/knowledge-center/state-mission")({
  head: () => ({
    meta: [
      { title: "State Mission — Knowledge Center | NBM" },
      {
        name: "description",
        content:
          "State-wise National Bamboo Mission nodal departments, Mission Directors, SLEC PDF documents and bamboo production statistics.",
      },
    ],
  }),
  component: StateMissionPage,
});
