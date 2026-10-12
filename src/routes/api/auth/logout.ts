import { createFileRoute } from "@tanstack/react-router";
import { buildSessionClearCookie } from "@/server/auth/session-cookie";

export const Route = createFileRoute("/api/auth/logout")({
  server: {
    handlers: {
      POST: async () => {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": buildSessionClearCookie(),
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
