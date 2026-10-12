import { createFileRoute } from "@tanstack/react-router";
import type { RowDataPacket } from "mysql2/promise";
import { isAuthError, requirePortalAuth } from "@/server/auth/require-portal-auth";
import { getMysqlPool } from "@/server/db/mysql";
import { createStateOfficer, requestOrigin, updateStateOfficer } from "@/server/portal/officers";
import type { NbmRole } from "@/lib/roles";
import { smtpConfigured } from "@/server/mail/deliver";

function mapUser(row: RowDataPacket) {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    full_name: String(row.full_name),
    email: String(row.email),
    mobile: row.mobile != null ? String(row.mobile) : null,
    state_code: row.state_code != null ? String(row.state_code) : null,
    role: String(row.role),
    is_active: Boolean(row.is_active),
    created_by: row.created_by != null ? String(row.created_by) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    latest_message_id: row.latest_message_id != null ? String(row.latest_message_id) : null,
  };
}

export const Route = createFileRoute("/api/portal/state-users")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;
          if (auth.profile.role !== "nbm_central") {
            return Response.json({ error: "Forbidden" }, { status: 403 });
          }

          const db = getMysqlPool();
          const [rows] = await db.query<RowDataPacket[]>(
            `SELECT s.id, s.user_id, s.full_name, s.email, s.mobile, s.state_code, s.role, s.is_active,
                    s.created_by, s.created_at, s.updated_at,
                    (
                      SELECT e.id FROM email_outbox e
                      WHERE e.related_user_id = s.user_id
                      ORDER BY e.created_at DESC
                      LIMIT 1
                    ) AS latest_message_id
             FROM state_users s
             ORDER BY s.state_code ASC, s.full_name ASC`,
          );

          return Response.json({ users: rows.map(mapUser) });
        } catch (err) {
          console.error("[api/portal/state-users GET]", err);
          const message = err instanceof Error ? err.message : "Failed to list users";
          return Response.json({ error: message }, { status: 500 });
        }
      },
      POST: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;
          if (auth.profile.role !== "nbm_central") {
            return Response.json({ error: "Forbidden" }, { status: 403 });
          }

          const body = (await request.json()) as {
            full_name?: string;
            email?: string;
            mobile?: string | null;
            state_code?: string;
            role?: NbmRole;
          };
          if (!body.full_name || !body.email || !body.state_code || !body.role) {
            return Response.json({ error: "Name, email, state, and role are required." }, { status: 400 });
          }

          const created = await createStateOfficer(
            {
              fullName: body.full_name,
              email: body.email,
              mobile: body.mobile ?? null,
              stateCode: body.state_code,
              role: body.role,
            },
            auth.userId,
            requestOrigin(request),
          );

          return Response.json(
            {
              id: created.id,
              messageId: created.messageId,
              previewPath: smtpConfigured() ? null : created.previewPath,
            },
            { status: 201 },
          );
        } catch (err) {
          console.error("[api/portal/state-users POST]", err);
          const message = err instanceof Error ? err.message : "Failed to create user";
          const status = /already exists|required|valid|Select|Role/.test(message) ? 400 : 500;
          return Response.json({ error: message }, { status });
        }
      },
      PATCH: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;
          if (auth.profile.role !== "nbm_central") {
            return Response.json({ error: "Forbidden" }, { status: 403 });
          }

          const body = (await request.json()) as {
            id?: string;
            full_name?: string;
            email?: string;
            mobile?: string | null;
            state_code?: string;
            role?: NbmRole;
            is_active?: boolean;
          };
          if (!body.id) {
            return Response.json({ error: "User id is required." }, { status: 400 });
          }

          const mail = await updateStateOfficer(
            body.id,
            {
              fullName: body.full_name,
              email: body.email,
              mobile: body.mobile,
              stateCode: body.state_code,
              role: body.role,
              isActive: body.is_active,
            },
            requestOrigin(request),
          );

          return Response.json({
            ok: true,
            previewPath: mail && !smtpConfigured() ? mail.previewPath : null,
            messageId: mail?.messageId ?? null,
          });
        } catch (err) {
          console.error("[api/portal/state-users PATCH]", err);
          const message = err instanceof Error ? err.message : "Failed to update user";
          const status = /not found/.test(message) ? 404 : /already exists|required|valid|Select|Role|Headquarters/.test(message) ? 400 : 500;
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
