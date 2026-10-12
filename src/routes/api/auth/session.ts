import { createFileRoute } from "@tanstack/react-router";
import { isAuthError, requirePortalAuth } from "@/server/auth/require-portal-auth";

export const Route = createFileRoute("/api/auth/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;

          return Response.json({
            user: { id: auth.userId, email: auth.email },
            profile: auth.profile,
          });
        } catch (err) {
          console.error("[api/auth/session]", err);
          const message = err instanceof Error ? err.message : "Session check failed";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
