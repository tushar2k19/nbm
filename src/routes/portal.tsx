import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthGuard } from "@/components/AuthGuard";

export const Route = createFileRoute("/portal")({
  component: PortalLayout,
});

function PortalLayout() {
  return (
    <AuthGuard>
      <div className="min-h-[calc(100vh-400px)] bg-muted/30 pb-16 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </AuthGuard>
  );
}
