import { FileText, MapPin, Sparkles } from "lucide-react";
import {
  groupAccentImages,
  successStoryPdfGroups,
  type SuccessStoryPdfGroup,
} from "@/data/successStories";

function PdfStoryRow({
  index,
  title,
  pdfUrl,
}: {
  index: number;
  title: string;
  pdfUrl: string;
}) {
  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noreferrer"
      className="ss-pdf-row group"
    >
      <span className="ss-pdf-icon" aria-hidden>
        <FileText className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Story {index}
        </span>
        <span className="block text-sm font-medium leading-snug text-foreground group-hover:text-primary">
          {title}
        </span>
      </span>
      <span className="shrink-0 rounded-md border border-border bg-secondary/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary opacity-0 transition-opacity group-hover:opacity-100">
        PDF
      </span>
    </a>
  );
}

function GroupCard({ group }: { group: SuccessStoryPdfGroup }) {
  const banner = groupAccentImages[group.id];

  return (
    <article id={group.id} className="ss-group-card scroll-mt-28">
      <div className="ss-group-card-accent" aria-hidden />
      <div className="ss-group-banner">
        <img src={banner} alt="" loading="lazy" />
        <div className="ss-group-banner-overlay" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
            <MapPin className="h-3 w-3" aria-hidden />
            {group.state}
          </div>
          <h3 className="font-display text-base font-bold leading-snug sm:text-lg">{group.title}</h3>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">{group.subtitle}</p>
        <div className="space-y-1">
          {group.stories.map((story, idx) => (
            <PdfStoryRow
              key={story.id}
              index={idx + 1}
              title={story.title}
              pdfUrl={story.pdfUrl}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export function SuccessStoriesPdfSection() {
  return (
    <section id="documents" className="scroll-mt-28">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-8 w-1.5 rounded bg-saffron" />
        <div>
          <h2 className="font-display text-xl font-bold text-primary sm:text-2xl">
            Document Stories
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Downloadable success story publications from implementing States and partner agencies.
          </p>
        </div>
      </div>

      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1 text-[11px] font-semibold text-primary">
        <Sparkles className="h-3.5 w-3.5 text-saffron" aria-hidden />
        {successStoryPdfGroups.reduce((n, g) => n + g.stories.length, 0)} PDF publications · sourced
        from nbm.da.gov.in
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {successStoryPdfGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}
