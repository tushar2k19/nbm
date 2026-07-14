import { useMemo, useState } from "react";
import {
  Building2,
  Info,
  MapPin,
  Phone,
  Search,
  Sprout,
  Users,
  X,
} from "lucide-react";
import { SectionHero } from "@/components/SectionHero";
// import { WhosWhoLeadership } from "./WhosWhoLeadership";
import {
  formatGovEmail,
  searchWhosWho,
  whosWhoSections,
  whosWhoStats,
  type WhosWhoOfficial,
  type WhosWhoSection,
} from "@/data/whosWho";

function EmailLink({ email }: { email?: string }) {
  if (!email) return <span className="text-muted-foreground">—</span>;
  const decoded = formatGovEmail(email.split(";")[0]?.trim() ?? email);
  return (
    <a href={`mailto:${decoded}`} className="break-all text-primary hover:underline">
      {email}
    </a>
  );
}

function PhoneLink({ phone }: { phone?: string }) {
  if (!phone) return <span className="text-muted-foreground">—</span>;
  const tel = phone.replace(/[^\d,+]/g, "").replace(/^011/, "+9111");
  return (
    <a href={`tel:${tel}`} className="inline-flex items-start gap-1 hover:text-primary">
      <Phone className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
      <span>{phone}</span>
    </a>
  );
}

function OfficialTable({ officials }: { officials: WhosWhoOfficial[] }) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="whos-who-table w-full min-w-[720px] border-collapse text-sm">
        <caption className="sr-only">
          NBMC Who's Who — official directory of National Bamboo Mission Cell functionaries
        </caption>
        <thead>
          <tr>
            <th scope="col" className="px-4 py-3 text-left">Name</th>
            <th scope="col" className="px-4 py-3 text-left">Designation</th>
            <th scope="col" className="px-4 py-3 text-left">Email</th>
            <th scope="col" className="px-4 py-3 text-left">Office</th>
            <th scope="col" className="px-4 py-3 text-left">EPABX</th>
            <th scope="col" className="px-4 py-3 text-left">Room No.</th>
          </tr>
        </thead>
        <tbody>
          {officials.map((o, idx) => (
            <tr
              key={o.id}
              className={`border-b border-border ${idx % 2 === 0 ? "bg-card" : "bg-secondary/25"}`}
            >
              <td className="whitespace-nowrap px-4 py-3.5 font-semibold text-foreground">
                {o.name}
              </td>
              <td className="px-4 py-3.5 text-foreground/90">{o.designation}</td>
              <td className="max-w-[200px] px-4 py-3.5">
                <EmailLink email={o.email} />
              </td>
              <td className="px-4 py-3.5 text-muted-foreground">
                <PhoneLink phone={o.office} />
              </td>
              <td className="px-4 py-3.5 text-muted-foreground">{o.epabx || "—"}</td>
              <td className="px-4 py-3.5 text-muted-foreground">{o.roomNo || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OfficialCards({ officials }: { officials: WhosWhoOfficial[] }) {
  return (
    <div className="grid gap-3 md:hidden">
      {officials.map((o) => (
        <article key={o.id} className="whos-who-card rounded-xl p-4">
          <h4 className="whos-who-card__name font-display text-base font-bold text-primary">
            {o.name}
          </h4>
          <p className="mt-1 text-xs font-medium text-accent-warm-text">{o.designation}</p>
          <dl className="mt-3 grid gap-2 text-xs">
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 font-semibold text-muted-foreground">Email</dt>
              <dd className="min-w-0">
                <EmailLink email={o.email} />
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 font-semibold text-muted-foreground">Office</dt>
              <dd>
                <PhoneLink phone={o.office} />
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 font-semibold text-muted-foreground">EPABX</dt>
              <dd className="text-muted-foreground">{o.epabx || "—"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 font-semibold text-muted-foreground">Room</dt>
              <dd className="text-muted-foreground">{o.roomNo || "—"}</dd>
            </div>
            {o.address && (
              <div className="flex gap-2">
                <dt className="w-14 shrink-0 font-semibold text-muted-foreground">Address</dt>
                <dd className="inline-flex items-start gap-1 text-muted-foreground">
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-saffron" aria-hidden />
                  {o.address}
                </dd>
              </div>
            )}
          </dl>
        </article>
      ))}
    </div>
  );
}

function SectionBlock({
  section,
  index,
}: {
  section: WhosWhoSection;
  index: number;
}) {
  const icons = [Sprout, Building2, Users];
  const Icon = icons[index] ?? Users;

  return (
    <section
      id={`whos-who-${section.id}`}
      className="whos-who-section overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="whos-who-section__header flex items-start gap-3 px-5 py-4 sm:px-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-base font-bold text-white sm:text-lg">
            {section.title}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-white/75 sm:text-sm">
            {section.subtitle}
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
            {section.officials.length} official{section.officials.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <OfficialTable officials={section.officials} />
      <div className="p-4 md:hidden">
        <OfficialCards officials={section.officials} />
      </div>
    </section>
  );
}

export function WhosWhoDirectory() {
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(() => searchWhosWho(query), [query]);
  const resultCount = filteredSections.reduce((n, s) => n + s.officials.length, 0);

  return (
    <div className="whos-who-page">
      {/* Ministry leadership pyramid — hidden until full ministry scope is enabled
      <WhosWhoLeadership />
      */}

      {/* Directory — hero intro, search & section nav */}
      <section className="whos-who-directory-panel" aria-label="Official directory">
        <SectionHero
          eyebrow={
            <>
              <Users className="h-3.5 w-3.5" aria-hidden />
              Official Directory
            </>
          }
          title="NBMC Official Directory"
          aside={
            <div aria-label="Directory statistics">
              <div className="section-hero__metric">
                <span className="section-hero__metric-value text-gradient-mitra">
                  {whosWhoStats.totalOfficials}
                </span>
                <span className="section-hero__metric-label">Officials</span>
              </div>
              <div className="section-hero__metric">
                <span className="section-hero__metric-value section-hero__metric-value--light">
                  {whosWhoStats.sections}
                </span>
                <span className="section-hero__metric-label">Sections</span>
              </div>
            </div>
          }
        >
          <p className="section-hero__desc !mt-0">
            Compact Who&apos;s Who for the National Bamboo Mission Cell — core administrative
            team at Krishi Bhawan and Shastri Bhawan, New Delhi. For State-wise contacts, visit{" "}
            <a href="/contact/state" className="section-hero__link">
              State Contacts
            </a>
            .
          </p>
        </SectionHero>

        <div className="whos-who-directory-panel__search whos-who-directory-panel__search--elevated">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, designation, email or room number…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Search Who's Who directory"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {query && (
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
              {resultCount} result{resultCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {!query && whosWhoSections.length > 1 && (
          <div className="whos-who-directory-panel__footer">
            <p className="whos-who-directory-panel__jump-label">Jump to section</p>
            <nav className="whos-who-jump flex gap-1 overflow-x-auto" aria-label="Jump to section">
              {whosWhoSections.map((s) => (
                <a
                  key={s.id}
                  href={`#whos-who-${s.id}`}
                  className="whos-who-jump__pill"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        )}
      </section>

      {/* Sections */}
      {filteredSections.length === 0 ? (
        <div className="whos-who-empty rounded-2xl px-6 py-12 text-center">
          <Search className="mx-auto h-8 w-8 text-muted-foreground/50" aria-hidden />
          <p className="mt-3 font-medium text-foreground">No officials match your search</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different name or designation.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredSections.map((section, index) => (
            <SectionBlock key={section.id} section={section} index={index} />
          ))}
        </div>
      )}

      {/* Source attribution */}
      <section className="whos-who-aside" aria-label="Data source">
        <div className="whos-who-aside__note">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
          <p>
            Contact details are compiled from the official National Bamboo Mission directory (
            <a href="https://nbm.da.gov.in/Contacts" target="_blank" rel="noreferrer">
              nbm.da.gov.in
            </a>
            ) and the Department of Agriculture and Farmers Welfare Who&apos;s Who. Names and
            designations may be updated periodically — please verify before official correspondence.
          </p>
        </div>
      </section>
    </div>
  );
}
