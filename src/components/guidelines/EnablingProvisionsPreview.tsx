import { Link } from "@tanstack/react-router";
import {
  enablingProvisions,
  enablingProvisionsStats,
  type EnablingProvision,
} from "@/data/enablingProvisions";
import { ArrowRight, ExternalLink, FileText, Scale, ShieldCheck } from "lucide-react";

const PREVIEW_COUNT = 6;

function ProvisionRow({ provision }: { provision: EnablingProvision }) {
  const content = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-xs font-bold text-primary">
        {provision.srNo}
      </span>
      <p className="min-w-0 flex-1 text-sm leading-snug text-foreground/90 group-hover:text-primary transition-colors">
        {provision.description}
      </p>
      {provision.pdfUrl ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600">
          <FileText className="h-3.5 w-3.5" aria-hidden />
        </span>
      ) : (
        <span className="w-8 shrink-0" aria-hidden />
      )}
    </>
  );

  if (provision.pdfUrl) {
    return (
      <a
        href={provision.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-3 rounded-lg border border-transparent px-3 py-2.5 transition hover:border-primary/15 hover:bg-primary/[0.04]"
        title={`Open PDF — ${provision.description}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group flex items-start gap-3 rounded-lg px-3 py-2.5">
      {content}
    </div>
  );
}

export function EnablingProvisionsPreview() {
  const preview = enablingProvisions.slice(0, PREVIEW_COUNT);

  return (
    <div id="enabling-provisions" className="scroll-mt-28">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-7 w-1.5 rounded bg-saffron" />
        <h2 className="text-xl font-bold text-primary">Enabling Provisions</h2>
      </div>

      <div className="overflow-hidden rounded-xl border border-primary/12 bg-card shadow-soft">
        <div className="border-b border-primary/10 bg-gradient-to-r from-primary/[0.06] via-card to-accent-warm/[0.05] px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <Scale className="h-7 w-7 text-saffron" aria-hidden />
              </div>
              <div>
                <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary/60">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                  Regulatory framework
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-primary sm:text-xl">
                  Measures that enable the bamboo value chain
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Forest law amendments, transit permits, licensing clarifications and state-level
                  rules that reduce regulatory barriers for bamboo production, transit, processing
                  and marketing — sourced from{" "}
                  <a
                    href="https://nbm.da.gov.in/Enabling-Provisions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    nbm.da.gov.in/Enabling-Provisions
                    <ExternalLink className="ml-0.5 inline h-3 w-3" aria-hidden />
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="flex shrink-0 gap-3">
              <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-center min-w-[5.5rem]">
                <div className="font-display text-2xl font-bold text-primary">
                  {enablingProvisionsStats.total}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Provisions
                </div>
              </div>
              <div className="rounded-xl border border-red-200/60 bg-red-50/80 px-4 py-3 text-center min-w-[5.5rem]">
                <div className="font-display text-2xl font-bold text-red-700">
                  {enablingProvisionsStats.pdfCount}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-red-600/80">
                  PDFs
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="divide-y divide-border/80 p-2 sm:p-3">
            {preview.slice(0, 3).map((p) => (
              <ProvisionRow key={p.id} provision={p} />
            ))}
          </div>
          <div className="divide-y divide-border/80 p-2 sm:p-3">
            {preview.slice(3, 6).map((p) => (
              <ProvisionRow key={p.id} provision={p} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-primary/10 bg-secondary/30 px-5 py-4 sm:flex-row sm:px-6">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            Showing {PREVIEW_COUNT} of {enablingProvisionsStats.total} provisions ·{" "}
            {enablingProvisionsStats.pdfCount} with official PDF downloads
          </p>
          <Link
            to="/guidelines/enabling-provisions"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            View all provisions
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
