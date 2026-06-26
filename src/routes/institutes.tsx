import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/institutes")({
  beforeLoad: () => {
    throw redirect({ to: "/knowledge-center", hash: "institutes" });
  },
});
