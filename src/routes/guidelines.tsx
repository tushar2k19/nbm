import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/guidelines")({
  component: GuidelinesLayout,
});

function GuidelinesLayout() {
  return <Outlet />;
}
