import { createFileRoute } from "@tanstack/react-router";
import { isAuthError, requirePortalAuth } from "@/server/auth/require-portal-auth";
import { smtpConfigured } from "@/server/mail/deliver";
import { PortalInputError, parseOptionalStateFilter } from "@/server/portal/monthly-entries";
import { previewComplianceReminderMail } from "@/server/portal/reporting-compliance";

function errorStatus(err: unknown) {
  const message = err instanceof Error ? err.message : "Request failed";
  if (err instanceof PortalInputError) return { message, status: 400 };
  if (message.includes("Forbidden")) return { message, status: 403 };
  return { message, status: 500 };
}

export const Route = createFileRoute("/api/portal/reporting-compliance-preview")({
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
          const year = Number(url.searchParams.get("year"));
          const month = Number(url.searchParams.get("month"));
          const stateCode = parseOptionalStateFilter(auth, url.searchParams.get("state"));
          if (!stateCode) {
            return Response.json({ error: "Choose a single state" }, { status: 400 });
          }

          const result = await previewComplianceReminderMail(auth, stateCode, year, month);
          return Response.json({
            ...result,
            previewPath: smtpConfigured() ? null : result.previewPath,
          });
        } catch (err) {
          console.error("[api/portal/reporting-compliance-preview GET]", err);
          const { message, status } = errorStatus(err);
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
