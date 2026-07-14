import { createFileRoute } from "@tanstack/react-router";
import { SuccessStoriesPage } from "@/components/success-stories/SuccessStoriesPage";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — Knowledge Center | NBM" },
      {
        name: "description",
        content:
          "National Bamboo Mission success stories — PDF publications and video documentaries from Madhya Pradesh, Maharashtra, Assam and other implementing States.",
      },
    ],
  }),
  component: SuccessStoriesPage,
});
