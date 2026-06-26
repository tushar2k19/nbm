import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { headquarterContacts, decodeGovEmail } from "@/data/contacts";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact/head-quarter")({
  head: () => ({
    meta: [
      { title: "Head Quarter Contacts — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Official contact directory of National Bamboo Mission headquarters, Krishi Bhawan and Shastri Bhawan, New Delhi.",
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
        subtitle="National Bamboo Mission Cell — Department of Agriculture and Farmers Welfare, Government of India."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* Sub-nav tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            to="/contact/head-quarter"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground"
          >
            Head Quarter
          </Link>
          <Link
            to="/contact/state"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors"
          >
            State
          </Link>
          <Link
            to="/rti"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors"
          >
            RTI
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
          <div className="bg-primary/5 border-b border-border px-5 py-4 flex items-center gap-3">
            <Building2 className="h-5 w-5 text-saffron" />
            <div>
              <h2 className="font-semibold text-primary text-sm sm:text-base">
                Head Quarter Contacts
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {headquarterContacts.length} officials · Krishi Bhawan & Shastri Bhawan, New Delhi
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Name</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                    Designation
                  </th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Division</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap w-16">
                    Extn.
                  </th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap w-24">
                    Room No.
                  </th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                    Phone Number
                  </th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                    E-mail ID
                  </th>
                  <th className="text-left px-4 py-3 font-semibold min-w-[180px]">Address</th>
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
                    <td className="px-4 py-3.5 font-medium text-foreground whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="px-4 py-3.5 text-foreground/90">{row.designation}</td>
                    <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                      {row.division}
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">{row.extn || "—"}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{row.roomNo || "—"}</td>
                    <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                      {row.phone ? (
                        <a
                          href={`tel:${row.phone.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-1 hover:text-primary"
                        >
                          <Phone className="h-3 w-3 shrink-0" />
                          {row.phone}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <EmailCell email={row.email} />
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-xs leading-relaxed">
                      <span className="inline-flex items-start gap-1">
                        <MapPin className="h-3 w-3 shrink-0 mt-0.5 text-saffron" />
                        {row.address}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 bg-secondary/60 border border-border rounded-xl px-5 py-4">
          <Mail className="h-5 w-5 text-saffron shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            For general enquiries related to the National Bamboo Mission, you may also write to{" "}
            <a href="mailto:nbm-agri@gov.in" className="text-primary font-medium hover:underline">
              nbm-agri@gov.in
            </a>{" "}
            or call the helpline at{" "}
            <a href="tel:18001801551" className="text-primary font-medium hover:underline">
              1800-180-1551
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
