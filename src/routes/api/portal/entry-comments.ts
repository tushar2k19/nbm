import { createFileRoute } from "@tanstack/react-router";
import { isAuthError, requirePortalAuth } from "@/server/auth/require-portal-auth";
import {
  addEntryComment,
  listEntryComments,
  markEntryCommentsResolved,
} from "@/server/portal/comments";

export const Route = createFileRoute("/api/portal/entry-comments")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;

          const url = new URL(request.url);
          const entryId = url.searchParams.get("entryId");
          if (!entryId) {
            return Response.json({ error: "entryId is required" }, { status: 400 });
          }

          const thread = await listEntryComments(auth, entryId);
          return Response.json(thread);
        } catch (err) {
          console.error("[api/portal/entry-comments GET]", err);
          const message = err instanceof Error ? err.message : "Failed to load comments";
          const status = message.includes("Forbidden") ? 403 : 500;
          return Response.json({ error: message }, { status });
        }
      },
      POST: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;

          const body = (await request.json()) as { entryId?: string; message?: string };
          if (!body.entryId || !body.message?.trim()) {
            return Response.json({ error: "entryId and message are required" }, { status: 400 });
          }

          const id = await addEntryComment(auth, body.entryId, body.message);
          return Response.json({ id }, { status: 201 });
        } catch (err) {
          console.error("[api/portal/entry-comments POST]", err);
          const message = err instanceof Error ? err.message : "Failed to add comment";
          const status = message.includes("Forbidden") ? 403 : 500;
          return Response.json({ error: message }, { status });
        }
      },
      PATCH: async ({ request }) => {
        try {
          const auth = await requirePortalAuth(request);
          if (isAuthError(auth)) return auth;

          const body = (await request.json()) as { entryId?: string; resolve?: boolean };
          if (!body.entryId) {
            return Response.json({ error: "entryId is required" }, { status: 400 });
          }
          if (body.resolve !== true) {
            return Response.json({ error: "Only resolve: true is supported" }, { status: 400 });
          }

          await markEntryCommentsResolved(auth, body.entryId);
          return Response.json({ ok: true });
        } catch (err) {
          console.error("[api/portal/entry-comments PATCH]", err);
          const message = err instanceof Error ? err.message : "Failed to update comments";
          const status = message.includes("Forbidden") ? 403 : message.includes("no comments") ? 400 : 500;
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
