import { createFileRoute } from "@tanstack/react-router";
import type { RowDataPacket } from "mysql2/promise";
import { isAuthError, requirePortalAuth } from "@/server/auth/require-portal-auth";
import { getMysqlPool } from "@/server/db/mysql";
import { mailFromAddress, smtpConfigured } from "@/server/mail/deliver";

export const Route = createFileRoute("/api/mailbox/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          if (smtpConfigured()) {
            const auth = await requirePortalAuth(request);
            if (isAuthError(auth) || auth.profile.role !== "nbm_central") {
              return Response.json({ error: "Forbidden" }, { status: 403 });
            }
          }

          const db = getMysqlPool();
          const [rows] = await db.query<RowDataPacket[]>(
            `SELECT id, to_email, subject, html_body, text_body, created_at
             FROM email_outbox WHERE id = ? LIMIT 1`,
            [params.id],
          );
          const row = rows[0];
          if (!row) return Response.json({ error: "Message not found" }, { status: 404 });

          return Response.json({
            id: String(row.id),
            from: mailFromAddress(),
            to: String(row.to_email),
            subject: String(row.subject),
            html: String(row.html_body),
            text: String(row.text_body),
            createdAt: String(row.created_at),
          });
        } catch (err) {
          console.error("[api/mailbox]", err);
          const message = err instanceof Error ? err.message : "Could not load message";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
