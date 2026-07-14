import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { ContactSubNav } from "@/components/contact/ContactSubNav";
import { SectionHero } from "@/components/SectionHero";
import { headquarterContacts, decodeGovEmail } from "@/data/contacts";
import { Building2, Phone, MapPin, Clock, Info, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contact/head-quarter")({
  head: () => ({
    meta: [
      { title: "Head Quarter Contacts — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Official contact directory of the National Bamboo Mission Cell (NBMC), Department of Agriculture and Farmers Welfare, New Delhi.",
      },
    ],
  }),
  component: HeadQuarterContactsPage,
});

function EmailCell({ email }: { email: string }) {
  if (!email) return <span className="text-muted-foreground">—</span>;
  const decoded = decodeGovEmail(email);
  return (
    <a href={`mailto:${decoded}`} className="text-primary hover:underline break-all">
      {email}
    </a>
  );
}

function HeadQuarterContactsPage() {
  return (
    <>
      <PageHero
        title="Head Quarter Contacts"
        subtitle="National Bamboo Mission Cell (NBMC) — Department of Agriculture and Farmers Welfare, Government of India."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <ContactSubNav active="head-quarter" />

        {/* Who's Who CTA hidden — NBMC core team now listed in the table below
        <Link
          to="/contact/whos-who"
          className="mb-6 flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/8 via-card to-accent-warm/10 px-5 py-4 shadow-soft transition-all hover:border-primary/35 hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Users className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-primary sm:text-base">
                View full Who&apos;s Who directory
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                NBMC core team — Horticulture Commissioner, Additional Commissioner, Section Officer &amp; STA
              </p>
            </div>
          </div>
          <span className="hidden shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground sm:inline">
            Open Who&apos;s Who →
          </span>
        </Link>
        */}

        <SectionHero
          panel
          eyebrow={
            <>
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              National Bamboo Mission Cell
            </>
          }
          title="NBMC — National Nodal Office for the Mission"
          aside={
            <>
              <div className="section-hero__info">
                <div className="section-hero__info-label">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  Office location
                </div>
                <p className="section-hero__info-text">
                  Krishi Bhawan &amp; Shastri Bhawan,
                  <br />
                  New Delhi — 110001
                </p>
              </div>
              <div className="section-hero__info">
                <div className="section-hero__info-label">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  Public dealing hours
                </div>
                <p className="section-hero__info-text">
                  Mon–Fri, 9:00 AM – 5:30 PM IST
                  <br />
                  (except gazetted holidays)
                </p>
              </div>
            </>
          }
        >
          <p>
            All officials listed below belong to the{" "}
            <strong>National Bamboo Mission Cell (NBMC)</strong>, established at the Department of
            Agriculture and Farmers Welfare, Government of India. NBMC administers implementation of
            the National Bamboo Mission, scrutinises Annual Action Plans, coordinates with State
            Bamboo Missions, and serves as the national repository for scheme guidelines, fund
            release and monitoring.
          </p>
          <p>
            The Cell functions under the Natural Resource Management Division and is co-located at{" "}
            <strong>Krishi Bhawan</strong> and <strong>Shastri Bhawan</strong>, New Delhi — in line
            with the official directory published on{" "}
            <a
              href="https://nbm.da.gov.in/Contacts"
              target="_blank"
              rel="noreferrer"
              className="section-hero__link"
            >
              nbm.da.gov.in
              <ExternalLink className="inline h-3 w-3" aria-hidden />
            </a>
            .
          </p>
        </SectionHero>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-5 py-4">
            <Building2 className="h-5 w-5 text-saffron" aria-hidden />
            <div>
              <h2 className="text-sm font-semibold text-primary sm:text-base">
                NBMC Official Directory
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {headquarterContacts.length} officials · National Bamboo Mission Cell, New Delhi
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-sm">
              <caption className="sr-only">
                NBMC Official Directory — National Bamboo Mission Cell headquarters contacts
              </caption>
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-left font-semibold">Name</th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                    Designation
                  </th>
                  <th scope="col" className="w-16 whitespace-nowrap px-4 py-3 text-left font-semibold">
                    Extn.
                  </th>
                  <th scope="col" className="w-24 whitespace-nowrap px-4 py-3 text-left font-semibold">
                    Room No.
                  </th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                    Phone Number
                  </th>
                  <th scope="col" className="whitespace-nowrap px-4 py-3 text-left font-semibold">
                    E-mail ID
                  </th>
                  <th scope="col" className="min-w-[180px] px-4 py-3 text-left font-semibold">Address</th>
                </tr>
              </thead>
              <tbody>
                {headquarterContacts.map((row, idx) => (
                  <tr
                    key={`${row.name}-${row.roomNo}`}
                    className={`border-b border-border align-top transition-colors hover:bg-primary/5 ${
                      idx % 2 === 0 ? "bg-card" : "bg-secondary/30"
                    }`}
                  >
                    <td className="whitespace-nowrap px-4 py-3.5 font-medium text-foreground">
                      {row.name}
                    </td>
                    <td className="px-4 py-3.5 text-foreground/90">{row.designation}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{row.extn || "—"}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{row.roomNo || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">
                      {row.phone ? (
                        <a
                          href={`tel:${row.phone.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-1 hover:text-primary"
                        >
                          <Phone className="h-3 w-3 shrink-0" aria-hidden />
                          {row.phone}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <EmailCell email={row.email} />
                    </td>
                    <td className="px-4 py-3.5 text-xs leading-relaxed text-muted-foreground">
                      <span className="inline-flex items-start gap-1">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-saffron" aria-hidden />
                        {row.address}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-secondary/60 px-5 py-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-saffron" aria-hidden />
          <div className="text-xs leading-relaxed text-muted-foreground">
            <p>
              For general scheme-related enquiries to NBMC, you may also write to{" "}
              <a href="mailto:nbm-agri@gov.in" className="font-medium text-primary hover:underline">
                nbm-agri@gov.in
              </a>{" "}
              or call the Kisan Call Centre &amp; NBM Helpline at{" "}
              <a href="tel:18001801551" className="font-medium text-primary hover:underline">
                1800-180-1551
              </a>{" "}
              (Mon–Fri, 9 AM – 6 PM IST).
            </p>
            <p className="mt-2">
              Contact details are sourced from the official National Bamboo Mission directory and
              may be updated periodically. For Ministry-wide telephone listings, refer to the{" "}
              <a
                href="https://agriwelfare.gov.in/en/who"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Department of Agriculture and Farmers Welfare directory
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
