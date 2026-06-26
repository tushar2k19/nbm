import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/knowledge-center")({
  component: KnowledgeCenterLayout,
});

function KnowledgeCenterLayout() {
  return <Outlet />;
}
