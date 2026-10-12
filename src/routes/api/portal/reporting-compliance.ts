import { createFileRoute } from "@tanstack/react-router";
import { isAuthError, requirePortalAuth } from "@/server/auth/require-portal-auth";
import { smtpConfigured } from "@/server/mail/deliver";
import { PortalInputError, parseOptionalStateFilter } from "@/server/portal/monthly-entries";
import {
  listReportingCompliance,
  recordComplianceReminder,
} from "@/server/portal/reporting-compliance";

function parsePeriod(url: URL) {
  const year = Number(url.searchParams.get("year"));
  const month = Number(url.searchParams.get("month"));
  return { year, month };
}

function errorStatus(err: unknown) {
  const message = err instanceof Error ? err.message : "Request failed";
  if (err instanceof PortalInputError) return { message, status: 400 };
  if (message.includes("Forbidden")) return { message, status: 403 };
  return { message, status: 500 };
}

export const Route = createFileRoute("/api/portal/reporting-compliance")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;
          if (auth.profile.role !== "nbm_central") {
            return Response.json({ error: "Forbidden" }, { status: 403 });
          }

          const url = new URL(request.url);
          const { year, month } = parsePeriod(url);
          const stateCode = parseOptionalStateFilter(auth, url.searchParams.get("state"));
          const result = await listReportingCompliance(auth, year, month, stateCode);
          return Response.json(result);
        } catch (err) {
          console.error("[api/portal/reporting-compliance GET]", err);
          const { message, status } = errorStatus(err);
          return Response.json({ error: message }, { status });
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
            stateCode?: string;
            year?: number;
            month?: number;
          };
          if (!body.stateCode || body.year == null || body.month == null) {
            return Response.json({ error: "stateCode, year, and month are required" }, { status: 400 });
          }

          const stateCode = parseOptionalStateFilter(auth, body.stateCode);
          if (!stateCode) {
            return Response.json({ error: "Choose a single state" }, { status: 400 });
          }

          const result = await recordComplianceReminder(auth, stateCode, Number(body.year), Number(body.month));
          return Response.json(
            {
              ...result,
              previewPath: smtpConfigured() ? null : result.previewPath,
            },
            { status: 201 },
          );
        } catch (err) {
          console.error("[api/portal/reporting-compliance POST]", err);
          const { message, status } = errorStatus(err);
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
