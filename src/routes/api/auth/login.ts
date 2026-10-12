import { createFileRoute } from "@tanstack/react-router";
import { authenticatePortalUser } from "@/server/db/mysql";
import { signPortalToken } from "@/server/auth/jwt";
import { buildSessionSetCookie } from "@/server/auth/session-cookie";

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { email?: string; password?: string };
          if (!body.email || !body.password) {
            return Response.json({ error: "Email and password are required" }, { status: 400 });
          }

          const user = await authenticatePortalUser(body.email, body.password);
          if (user.status === "disabled") {
            return Response.json(
              { error: "This account is disabled. Contact NBM Headquarters." },
              { status: 403 },
            );
          }
          if (user.status !== "ok") {
            return Response.json({ error: "Invalid email or password" }, { status: 401 });
          }

          const token = signPortalToken({ sub: user.userId, email: user.email });
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": buildSessionSetCookie(token),
              "Cache-Control": "no-store",
            },
          });
        } catch (err) {
          console.error("[api/auth/login]", err);
          const message = err instanceof Error ? err.message : "Login failed";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
