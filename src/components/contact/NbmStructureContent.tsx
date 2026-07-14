import type { StructureLevel, StructureSection, StructureTableRow } from "@/data/nbmStructure";
import { Link } from "@tanstack/react-router";
import { GitBranch, Info, ExternalLink } from "lucide-react";

function StructureTable({
  leadership,
  rows,
  caption,
}: {
  leadership?: StructureTableRow[];
  rows: StructureTableRow[];
  caption: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        {leadership && leadership.length > 0 ? (
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th scope="col" className="px-4 py-3 text-left font-semibold align-top">
                {leadership.map((row) => (
                  <div key={row.office} className="py-0.5 font-medium">
                    {row.office}
                  </div>
                ))}
              </th>
              <th scope="col" className="w-40 px-4 py-3 text-left font-semibold align-top">
                {leadership.map((row) => (
                  <div key={`${row.office}-role`} className="py-0.5">
                    {row.role}
                  </div>
                ))}
              </th>
            </tr>
          </thead>
        ) : (
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th scope="col" className="px-4 py-3 text-left font-semibold">
                Office / Position
              </th>
              <th scope="col" className="w-40 px-4 py-3 text-left font-semibold">
                Role
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={`${row.office}-${row.role}`}
              className={`border-b border-border align-top transition-colors hover:bg-primary/5 ${
                idx % 2 === 0 ? "bg-card" : "bg-secondary/30"
              }`}
            >
              <td className="px-4 py-3.5 leading-snug text-foreground/90">{row.office}</td>
              <td className="whitespace-nowrap px-4 py-3.5 font-medium text-foreground">
                {row.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StructureSectionBlock({ section }: { section: StructureSection }) {
  if (section.kind === "prose") {
    return (
      <article id={section.id} className="scroll-mt-28 border-b border-border px-5 py-6 last:border-b-0">
        {section.heading ? (
          <h3 className="font-display text-base font-bold text-primary">{section.heading}</h3>
        ) : null}
        <div className={`space-y-3 text-sm leading-relaxed text-foreground/90 text-justify ${section.heading ? "mt-3" : ""}`}>
          {section.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </article>
    );
  }

  if (section.kind === "table") {
    return (
      <article id={section.id} className="scroll-mt-28 border-b border-border px-5 py-6 last:border-b-0">
        <h3 className="font-display text-base font-bold text-primary">{section.heading}</h3>
        {section.intro && (
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/90 text-justify">
            {section.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        )}
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <StructureTable
            leadership={section.leadership}
            rows={section.rows}
            caption={`${section.heading} — composition and roles`}
          />
        </div>
        {section.footnotes && section.footnotes.length > 0 && (
          <div className="mt-3 space-y-1 text-xs leading-relaxed text-muted-foreground">
            {section.footnotes.map((note) => (
              <p key={note.slice(0, 40)}>{note}</p>
            ))}
          </div>
        )}
        {section.closingParagraphs && section.closingParagraphs.length > 0 && (
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/90 text-justify">
            {section.closingParagraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        )}
      </article>
    );
  }

  return (
    <article id={section.id} className="scroll-mt-28 border-b border-border px-5 py-6 last:border-b-0">
      <h3 className="font-display text-base font-bold text-primary">{section.heading}</h3>
      {section.intro && (
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/90 text-justify">
          {section.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      )}
      {section.listTitle && (
        <p className="mt-4 text-sm font-semibold text-foreground">{section.listTitle}</p>
      )}
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/90">
        {section.items.map((item) => (
          <li key={item.slice(0, 48)} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" aria-hidden />
            <span className="text-justify">{item}</span>
          </li>
        ))}
      </ul>
      {section.outro && (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/90 text-justify">
          {section.outro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      )}
    </article>
  );
}

function StructureLevelCard({ level }: { level: StructureLevel }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-5 py-4">
        <GitBranch className="h-5 w-5 text-saffron" aria-hidden />
        <h2 className="font-display text-base font-bold text-primary sm:text-lg">{level.title}</h2>
      </div>
      <div>
        {level.sections.map((section) => (
          <StructureSectionBlock key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

export function NbmStructureContent({ levels }: { levels: StructureLevel[] }) {
  return (
    <div className="space-y-6">
      {levels.map((level) => (
        <StructureLevelCard key={level.id} level={level} />
      ))}

      <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/60 px-5 py-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-saffron" aria-hidden />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Governance structure reproduced from the official National Bamboo Mission portal at{" "}
          <a
            href="https://nbm.da.gov.in/Structure"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline"
          >
            nbm.da.gov.in/Structure
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
          . For NBMC contact details, see{" "}
          <Link to="/contact/head-quarter" className="font-medium text-primary hover:underline">
            Head Quarter Contacts
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
