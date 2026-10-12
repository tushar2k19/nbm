import { createFileRoute } from "@tanstack/react-router";
import { isAuthError, requirePortalAuth } from "@/server/auth/require-portal-auth";
import {
  PortalInputError,
  bulkSubmitEntries,
  insertMonthlyEntry,
  listMonthlyEntries,
  parseListPeriod,
  parseOptionalStateFilter,
  updateMonthlyEntry,
  updateMonthlyEntryStatus,
} from "@/server/portal/monthly-entries";

export const Route = createFileRoute("/api/portal/monthly-entries")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;

          const url = new URL(request.url);
          const excludeDraft = url.searchParams.get("excludeDraft") === "1";
          const approvedOnly = url.searchParams.get("approvedOnly") === "1";
          const period = parseListPeriod(url.searchParams.get("year"), url.searchParams.get("month"));
          const stateCode = parseOptionalStateFilter(auth, url.searchParams.get("state"));
          const result = await listMonthlyEntries(auth, {
            excludeDraft,
            approvedOnly,
            stateCode,
            ...period,
          });
          return Response.json(result);
        } catch (err) {
          console.error("[api/portal/monthly-entries GET]", err);
          const message = err instanceof Error ? err.message : "Failed to list entries";
          const status = err instanceof PortalInputError ? 400 : 500;
          return Response.json({ error: message }, { status });
        }
      },
      POST: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;

          const body = (await request.json()) as Record<string, unknown>;
          const id = await insertMonthlyEntry(auth, body);
          return Response.json({ id }, { status: 201 });
        } catch (err) {
          console.error("[api/portal/monthly-entries POST]", err);
          const message = err instanceof Error ? err.message : "Failed to create entry";
          const status = err instanceof PortalInputError ? 400 : message.includes("Forbidden") ? 403 : 500;
          return Response.json({ error: message }, { status });
        }
      },
      PUT: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;

          const body = (await request.json()) as Record<string, unknown> & { id?: string };
          if (!body.id || typeof body.id !== "string") {
            return Response.json({ error: "Entry id is required" }, { status: 400 });
          }

          await updateMonthlyEntry(auth, body.id, body);
          return Response.json({ ok: true });
        } catch (err) {
          console.error("[api/portal/monthly-entries PUT]", err);
          const message = err instanceof Error ? err.message : "Failed to update entry";
          const status = err instanceof PortalInputError ? 400 : message.includes("Forbidden") ? 403 : 500;
          return Response.json({ error: message }, { status });
        }
      },
      PATCH: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;

          const body = (await request.json()) as {
            id?: string;
            status?: string;
            submitIds?: string[];
            monthYear?: string;
          };

          if (body.submitIds?.length) {
            if (!body.monthYear) {
              return Response.json({ error: "Choose a reporting month" }, { status: 400 });
            }
            const updated = await bulkSubmitEntries(auth, body.submitIds, body.monthYear);
            return Response.json({ updated });
          }

          if (!body.id || !body.status) {
            return Response.json({ error: "id and status are required" }, { status: 400 });
          }

          await updateMonthlyEntryStatus(auth, body.id, body.status);
          return Response.json({ ok: true });
        } catch (err) {
          console.error("[api/portal/monthly-entries PATCH]", err);
          const message = err instanceof Error ? err.message : "Failed to update entry";
          const status = err instanceof PortalInputError ? 400 : message.includes("Forbidden") ? 403 : 500;
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
