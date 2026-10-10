/**
 * AuthGuard — Protects portal routes by checking auth status and role.
 * 
 * Usage in a route:
 *   <AuthGuard allowedRoles={["state_editor"]}>
 *     <EditorDashboard />
 *   </AuthGuard>
 */

import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import type { NbmRole } from "@/lib/roles";

type AuthGuardProps = {
  /** Which NBM roles are allowed on this route. Empty = any authenticated user. */
  allowedRoles?: NbmRole[];
  children: ReactNode;
};

export function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    // Not logged in → redirect to login
    if (!user) {
      void navigate({ to: "/login", replace: true });
      return;
    }

    // Logged in but no NBM profile → they don't belong here
    if (!role) {
      void navigate({ to: "/login", replace: true });
      return;
    }

    // Role mismatch → redirect to login
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      void navigate({ to: "/login", replace: true });
    }
  }, [user, role, loading, allowedRoles, navigate]);

  // Still loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verifying access…</p>
        </div>
      </div>
    );
  }

  // Not authorised (redirect will fire via useEffect)
  if (!user || !role) return null;
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) return null;

  return <>{children}</>;
}
