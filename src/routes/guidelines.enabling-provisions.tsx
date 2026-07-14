import { createFileRoute } from "@tanstack/react-router";
import { EnablingProvisionsPage } from "@/components/guidelines/EnablingProvisionsPage";

export const Route = createFileRoute("/guidelines/enabling-provisions")({
  head: () => ({
    meta: [
      { title: "Enabling Provisions — Guidelines & Documents | NBM" },
      {
        name: "description",
        content:
          "Policy and regulatory enabling provisions for the National Bamboo Mission — forest law amendments, transit permits, licensing clarifications and state rules.",
      },
    ],
  }),
  component: EnablingProvisionsPage,
});
