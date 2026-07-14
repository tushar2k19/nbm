import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { RtiActLinks } from "@/components/rti/RtiActLinks";
import { rtiSections, rtiSupplementaryLinks, type RtiOrgNode, type RtiSection } from "@/data/rti";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Scale,
  FileText,
  ExternalLink,
  Building2,
  Users,
  Network,
  Info,
  Download,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/rti")({
  head: () => ({
    meta: [
      { title: "Right to Information — National Bamboo Mission" },
      {
        name: "description",
        content:
          "RTI disclosures, CPIO details, organizational structure and proactive information under the Right to Information Act, 2005 — National Bamboo Mission.",
      },
    ],
  }),
  component: RtiPage,
});

const sectionIcons: Record<string, typeof Scale> = {
  overview: Building2,
  "nbm-scheme": FileText,
  "subordinate-offices": Users,
  "organization-details": Info,
  "org-chart": Network,
  "cpio-midh": Scale,
  "cpio-autonomous": Users,
  "national-agencies": Building2,
};

function RtiPage() {
  return (
    <div className="rti-page">
      <PageHero
        eyebrow={
          <>
            <Scale className="h-3.5 w-3.5" aria-hidden />
            RTI Act, 2005 · Government of India
          </>
        }
        title="Right to Information"
        subtitle="Proactive disclosures and public authority details under the Right to Information Act, 2005 — National Bamboo Mission."
      />

      <div className="rti-hero-bridge mx-auto max-w-7xl px-4 sm:px-6">
        <RtiActLinks />
      </div>

      <section className="rti-disclosure mx-auto max-w-7xl px-4 sm:px-6 pb-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* Accordion main */}
          <div>
            <div className="rti-section-heading">
              <div className="rti-section-heading__bar" aria-hidden />
              <h2 className="rti-section-heading__title font-display">
                Proactive Disclosure under Section 4
              </h2>
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue="overview"
              className="space-y-3"
            >
              {rtiSections.map((section, idx) => {
                const Icon = sectionIcons[section.id] ?? FileText;
                return (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    id={section.id}
                    className="rti-accordion-item border-0 scroll-mt-28 data-[state=open]:border-primary/30 transition-all duration-300"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-secondary/50 [&[data-state=open]]:bg-primary [&[data-state=open]]:text-primary-foreground group">
                      <span className="flex items-center gap-3 text-left">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-data-[state=open]:bg-primary-foreground/15 group-data-[state=open]:text-primary-foreground transition-colors">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-semibold text-sm sm:text-base leading-snug pr-2">
                          {section.title}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 pt-1">
                      <RtiSectionContent section={section} />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rti-sidebar-card p-5 sticky top-4">
              <h3 className="font-semibold text-primary text-sm mb-3">Quick Navigation</h3>
              <ul className="space-y-1">
                {rtiSections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0" />
                      <span className="line-clamp-2">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rti-sidebar-card rti-sidebar-card--accent p-5">
              <h3 className="font-semibold text-primary text-sm mb-2">How to file an RTI</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Applications under the RTI Act, 2005 may be submitted in writing to the concerned
                Central Public Information Officer (CPIO) listed above, or filed electronically
                through the Central Government online portal at{" "}
                <a
                  href="https://rtionline.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  rtionline.gov.in
                </a>
                . Fee as prescribed under the RTI Rules, 2019 is applicable. General information
                and PIO directories are available at{" "}
                <a
                  href="https://rti.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  rti.gov.in
                </a>
                .
              </p>
            </div>

            <div className="rti-sidebar-card p-5">
              <h3 className="font-semibold text-primary text-sm mb-3">Official RTI Documents</h3>
              <ul className="space-y-2">
                {rtiSupplementaryLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0 mt-0.5" aria-hidden />
                      <span className="leading-relaxed">{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rti-sidebar-card p-5">
              <h3 className="font-semibold text-primary text-sm mb-2">NBM Helpline</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                For general scheme-related queries (not RTI applications):
              </p>
              <a
                href="tel:18001801551"
                className="mt-2 block text-sm font-bold text-primary hover:text-saffron transition-colors"
              >
                1800-180-1551
              </a>
              <a
                href="mailto:nbm-agri@gov.in"
                className="mt-1 block text-xs text-primary hover:underline"
              >
                nbm-agri@gov.in
              </a>
            </div>
          </aside>
        </div>

        {/* Bottom info */}
        <div className="rti-notice">
          <Info className="rti-notice__icon h-5 w-5" aria-hidden />
          <p className="rti-notice__text">
            This page contains proactive disclosures under Section 4 of the Right to Information
            Act, 2005 for the National Bamboo Mission. Information is updated periodically. For
            documents not available here, please submit an RTI application to the concerned CPIO
            listed above. Last reviewed: June 2026.
          </p>
        </div>
      </section>
    </div>
  );
}

function RtiSectionContent({ section }: { section: RtiSection }) {
  switch (section.type) {
    case "text":
      return (
        <div className="space-y-4 text-sm text-foreground/90 leading-relaxed">
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {section.links && (
            <div className="flex flex-wrap gap-3 pt-2">
              {section.links.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <Download className="h-3.5 w-3.5" />
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );

    case "scheme":
      return (
        <div className="space-y-5">
          <div className="space-y-3 text-sm text-foreground/90 leading-relaxed">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm border-collapse min-w-[520px]">
              <caption className="sr-only">
                Sub-schemes under the National Bamboo Mission with target groups and beneficiary areas
              </caption>
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="text-left px-4 py-3 font-semibold w-16">Sr No.</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold">Sub Scheme</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold">Target Group / Area</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, idx) => (
                  <tr
                    key={row.srNo}
                    className={`border-b border-border ${idx % 2 === 0 ? "bg-card" : "bg-secondary/40"}`}
                  >
                    <td className="px-4 py-3 text-muted-foreground font-medium">{row.srNo}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{row.subScheme}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.targetGroup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.links && (
            <div className="flex flex-wrap gap-4 pt-1">
              <span className="text-xs font-semibold text-muted-foreground">More information:</span>
              {section.links.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  {l.label} <ExternalLink className="h-3 w-3" />
                </Link>
              ))}
            </div>
          )}
        </div>
      );

    case "list":
      return (
        <div className="space-y-6">
          {section.intro && (
            <p className="text-sm text-foreground/90 leading-relaxed">{section.intro}</p>
          )}
          {section.groups.map((group) => (
            <div key={group.heading}>
              <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                <span className="h-1 w-4 rounded-full bg-saffron" />
                {group.heading}
              </h4>
              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-xl border border-border bg-secondary/30 p-4 hover:border-primary/20 transition-colors"
                  >
                    <div className="font-semibold text-sm text-foreground">{item.title}</div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    {item.link && (
                      item.link.href.startsWith("http") ? (
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          {item.link.label}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <Link
                          to={item.link.href}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          {item.link.label}
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      )
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[640px]">
            <caption className="sr-only">{section.title}</caption>
            <thead>
              <tr className="bg-primary text-primary-foreground">
                {section.columns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={`text-left px-3 py-3 font-semibold align-top ${col.className ?? ""}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, idx) => (
                <tr
                  key={String(row.srNo)}
                  className={`border-b border-border align-top ${idx % 2 === 0 ? "bg-card" : "bg-secondary/40"}`}
                >
                  {section.columns.map((col) => (
                    <td key={col.key} className="px-3 py-3 text-foreground/90 whitespace-pre-line">
                      {String(row[col.key] ?? "")
                        .split("\n")
                        .map((line, i, arr) => {
                          const isEmail = line.includes("@");
                          if (isEmail) {
                            return (
                              <a
                                key={i}
                                href={`mailto:${line.trim()}`}
                                className="text-primary hover:underline block"
                              >
                                {line}
                              </a>
                            );
                          }
                          return (
                            <span key={i}>
                              {line}
                              {i < arr.length - 1 && <br />}
                            </span>
                          );
                        })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "org-chart":
      return (
        <div className="space-y-4">
          {section.intro && (
            <p className="text-sm text-muted-foreground leading-relaxed">{section.intro}</p>
          )}
          <div className="overflow-x-auto pb-4">
            <OrgChartNode node={section.root} isRoot />
          </div>
        </div>
      );

    case "agency-list":
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-4 py-3 font-semibold w-20">S. No.</th>
                <th className="text-left px-4 py-3 font-semibold">Name of Agency</th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, idx) => (
                <tr
                  key={row.srNo}
                  className={`border-b border-border ${idx % 2 === 0 ? "bg-card" : "bg-secondary/40"}`}
                >
                  <td className="px-4 py-2.5 text-muted-foreground font-medium">{row.srNo}</td>
                  <td className="px-4 py-2.5 text-foreground">{row.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function OrgChartNode({ node, isRoot = false }: { node: RtiOrgNode; isRoot?: boolean }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative rounded-lg border-2 px-4 py-2.5 text-center text-xs font-semibold whitespace-nowrap transition-all duration-300 hover:shadow-soft ${
          isRoot
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-card text-primary border-primary/40 hover:border-saffron"
        }`}
      >
        {node.label}
      </div>
      {hasChildren && (
        <>
          <div className="h-6 w-px bg-primary/40" />
          <div className="flex items-start gap-4 sm:gap-8">
            {node.children!.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="h-px w-full min-w-[2rem] bg-primary/40 self-center" />
                <div className="h-4 w-px bg-primary/40" />
                <OrgChartNode node={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
