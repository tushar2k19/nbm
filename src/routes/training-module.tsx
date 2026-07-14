import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/training-module")({
  component: TrainingModuleLayout,
});

function TrainingModuleLayout() {
  return <Outlet />;
}
