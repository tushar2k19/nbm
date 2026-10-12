import { createFileRoute } from "@tanstack/react-router";
import { requestOrigin, requestPasswordReset } from "@/server/portal/officers";
import { smtpConfigured } from "@/server/mail/deliver";

export const Route = createFileRoute("/api/auth/forgot-password")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { email?: string };
          if (!body.email?.trim()) {
            return Response.json({ error: "Email is required." }, { status: 400 });
          }

          const previewPath = await requestPasswordReset(body.email, requestOrigin(request));
          return Response.json({
            ok: true,
            message: "If this address is registered, a password message is ready.",
            previewPath: !smtpConfigured() && previewPath ? previewPath : null,
          });
        } catch (err) {
          console.error("[api/auth/forgot-password]", err);
          const message = err instanceof Error ? err.message : "Could not start password reset";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
