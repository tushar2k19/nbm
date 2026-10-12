import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { fetchMailboxMessage } from "@/lib/portal-client";
import { emailPreviewDocument } from "@/lib/nbm-email-template";
import { formatPortalDateTime } from "@/lib/portal-datetime";

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

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeSrcDoc = useMemo(
    () => (message ? emailPreviewDocument(message.html) : undefined),
    [message],
  );

  const resizeIframe = () => {
    const frame = iframeRef.current;
    const doc = frame?.contentDocument;
    if (!frame || !doc?.body) return;
    frame.style.height = `${Math.max(doc.body.scrollHeight + 32, 420)}px`;
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-muted/50 to-background">
      <section className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
          <Mail className="h-5 w-5 shrink-0 mt-0.5 text-amber-800" aria-hidden />
          <div>
            <p className="font-semibold">Local email preview</p>
            <p className="mt-0.5 text-amber-900/90 leading-relaxed">
              SMTP is not configured. Messages are stored for review only—the layout below matches what officers will receive
              when mail goes live.
            </p>
          </div>
        </div>

        {error ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {!message && !error ? (
          <p className="text-sm text-muted-foreground">Opening message…</p>
        ) : null}

        {message ? (
          <article className="overflow-hidden rounded-xl border border-border bg-card shadow-md">
            <header className="border-b border-border bg-muted/25 px-5 py-4 sm:px-6">
              <dl className="grid gap-2 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-4 sm:gap-y-2">
                <dt className="font-medium text-muted-foreground">From</dt>
                <dd className="text-foreground break-all">{message.from}</dd>
                <dt className="font-medium text-muted-foreground">To</dt>
                <dd className="text-foreground break-all">{message.to}</dd>
                <dt className="font-medium text-muted-foreground">Subject</dt>
                <dd className="font-semibold text-foreground leading-snug">{message.subject}</dd>
                <dt className="font-medium text-muted-foreground">Sent</dt>
                <dd className="text-muted-foreground">{formatPortalDateTime(message.createdAt)}</dd>
              </dl>
            </header>
            <div className="bg-[#ebe8e1] p-0">
              <iframe
                ref={iframeRef}
                title="Email body preview"
                className="block w-full min-h-[420px] border-0"
                sandbox="allow-same-origin"
                srcDoc={iframeSrcDoc}
                onLoad={resizeIframe}
              />
            </div>
          </article>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link to="/login" className="font-medium text-primary hover:underline">
            Back to State Login
          </Link>
          <Link to="/portal/central" className="text-muted-foreground hover:text-foreground hover:underline">
            Central portal
          </Link>
        </div>
      </section>
    </div>
  );
}
