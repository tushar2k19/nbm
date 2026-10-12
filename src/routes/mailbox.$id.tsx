import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchMailboxMessage } from "@/lib/portal-client";

export const Route = createFileRoute("/mailbox/$id")({
  head: () => ({
    meta: [{ title: "Email preview | National Bamboo Mission" }],
  }),
  component: MailboxPreviewPage,
});

function MailboxPreviewPage() {
  const { id } = Route.useParams();
  const [message, setMessage] = useState<Awaited<ReturnType<typeof fetchMailboxMessage>> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchMailboxMessage(id)
      .then((data) => {
        if (!cancelled) setMessage(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not open this message");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
        Local email preview (development) — SMTP is not configured
      </p>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {!message && !error ? <p className="text-sm text-muted-foreground">Opening message…</p> : null}
      {message ? (
        <article className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
          <header className="border-b border-border bg-muted/30 px-5 py-4 text-sm space-y-1">
            <div><span className="text-muted-foreground">From:</span> {message.from}</div>
            <div><span className="text-muted-foreground">To:</span> {message.to}</div>
            <div><span className="text-muted-foreground">Subject:</span> <span className="font-semibold">{message.subject}</span></div>
            <div className="text-xs text-muted-foreground">{message.createdAt}</div>
          </header>
          <div
            className="px-5 py-5 text-sm leading-relaxed [&_a]:inline-block [&_a]:mt-2 [&_a]:bg-primary [&_a]:text-primary-foreground [&_a]:px-4 [&_a]:py-2 [&_a]:rounded [&_a]:font-semibold [&_a]:no-underline"
            dangerouslySetInnerHTML={{ __html: message.html }}
          />
        </article>
      ) : null}
      <Link to="/login" className="mt-4 inline-block text-sm text-primary hover:underline">
        Back to State Login
      </Link>
    </section>
  );
}
