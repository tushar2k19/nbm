import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { getPortalPath } from "@/lib/roles";

export const Route = createFileRoute("/portal/")({
  component: PortalIndex,
});

function PortalIndex() {
  const { role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && role) {
      void navigate({ to: getPortalPath(role), replace: true });
    }
  }, [role, loading, navigate]);

  return (
    <div className="flex h-48 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
