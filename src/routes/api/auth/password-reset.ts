import { createFileRoute } from "@tanstack/react-router";
import { consumeResetToken, lookupResetToken } from "@/server/auth/password-reset";

export const Route = createFileRoute("/api/auth/password-reset")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = new URL(request.url).searchParams.get("token") ?? "";
        const found = await lookupResetToken(token);
        if (!found) {
          return Response.json({ valid: false }, { status: 400 });
        }
        return Response.json({ valid: true, email: found.email, fullName: found.fullName, purpose: found.purpose });
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { token?: string; password?: string };
          if (!body.token || !body.password) {
            return Response.json({ error: "Token and password are required." }, { status: 400 });
          }
          await consumeResetToken(body.token, body.password);
          return Response.json({ ok: true });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Could not set password";
          const status = /invalid or has expired|at least|Include/.test(message) ? 400 : 500;
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
