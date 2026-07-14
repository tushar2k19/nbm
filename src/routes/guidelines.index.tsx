import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { GuidelinesFaqSection } from "@/components/guidelines/GuidelinesFaqSection";
import { EnablingProvisionsPreview } from "@/components/guidelines/EnablingProvisionsPreview";
import { guidelineSections, type GuidelineDoc } from "@/data/guidelinesDocuments";
import { nbmLetters } from "@/data/nbmLetters";
import { LettersSection } from "@/components/guidelines/LettersSection";
import { downloadSamplePdf } from "@/lib/samplePdf";
import { DocFormatBadge } from "@/components/DocFormatBadge";
import {
  FileText,
  Download,
  CircleHelp,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/guidelines/")({
  head: () => ({
    meta: [
      { title: "Guidelines & Documents — NBM" },
      {
        name: "description",
        content:
          "Operational guidelines, circulars, FAQs and downloadable documents of the National Bamboo Mission.",
      },
    ],
  }),
  component: GuidelinesPage,
});

function GuidelineDocCard({
  sectionId,
  doc,
}: {
  sectionId: string;
  doc: GuidelineDoc;
}) {
  const cardClass =
    "group flex w-full scroll-mt-28 items-start gap-4 rounded-lg border border-border bg-card p-4 text-left shadow-soft transition hover:border-primary hover:shadow-card";
  const inner = (
    <>
      <FileText className="h-8 w-8 shrink-0 text-saffron" />
      <div className="flex-1">
        <div className="font-medium text-foreground group-hover:text-primary">{doc.title}</div>
        <DocFormatBadge description={doc.description} showSample={!doc.pdfUrl} />
      </div>
      {doc.pdfUrl ? (
        <ExternalLink className="mt-1 h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" />
      ) : (
        <Download className="mt-1 h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" />
      )}
    </>
  );

  if (doc.pdfUrl) {
    return (
      <a
        id={`${sectionId}-${doc.id}`}
        href={doc.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        title={`Open PDF — ${doc.title}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      id={`${sectionId}-${doc.id}`}
      type="button"
      onClick={() => downloadSamplePdf(doc.title)}
      className={`${cardClass} cursor-pointer`}
    >
      {inner}
    </button>
  );
}

function GuidelineSectionBlock({ sectionId }: { sectionId: string }) {
  const sec = guidelineSections.find((s) => s.id === sectionId);
  if (!sec) return null;

  return (
    <div id={sec.id} className="scroll-mt-28">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-7 w-1.5 rounded bg-saffron" />
        <h2 className="text-xl font-bold text-primary">{sec.title}</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {sec.items.map((d) => (
          <GuidelineDocCard key={d.id} sectionId={sec.id} doc={d} />
        ))}
      </div>
    </div>
  );
}

function GuidelinesPage() {
  return (
    <>
      <PageHero
        title="Guidelines & Documents"
        subtitle="Operational guidelines, state policies, enabling provisions, official letters and downloadable documents under the National Bamboo Mission."
      />

      <section id="documents" className="mx-auto max-w-7xl scroll-mt-28 space-y-12 px-4 py-12 sm:px-6">
        <GuidelineSectionBlock sectionId="nbm-guidelines-2025" />
        <GuidelineSectionBlock sectionId="state-bamboo-policies" />
        <EnablingProvisionsPreview />
        <GuidelineSectionBlock sectionId="release-of-funds" />

        <div id="letters" className="scroll-mt-28">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-7 w-1.5 rounded bg-saffron" />
            <h2 className="text-xl font-bold text-primary">Letters</h2>
          </div>
          <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Official DO letters, circulars and policy communications from{" "}
            <a
              href="https://nbm.da.gov.in/Letters"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              nbm.da.gov.in/Letters
            </a>
            .
          </p>
          <LettersSection items={nbmLetters} />
        </div>

        <div className="rounded-xl border border-primary/15 bg-primary/5 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h3 className="font-display text-lg font-bold text-primary">Have a question about NBM?</h3>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Browse ten curated answers on the Mission, portal features, schemes and support
              options.
            </p>
          </div>
          <Link
            to="/guidelines"
            hash="faq"
            className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:mt-0"
          >
            <CircleHelp className="h-4 w-4" aria-hidden />
            View FAQ
          </Link>
        </div>
      </section>

      <GuidelinesFaqSection />
    </>
  );
}
