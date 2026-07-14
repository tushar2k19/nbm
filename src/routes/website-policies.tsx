import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { OfficialPolicySection } from "@/components/policies/OfficialPolicySection";
import { websitePolicySections } from "@/data/websitePolicies";
import { FileText, Mail, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/website-policies")({
  head: () => ({
    meta: [
      { title: "Website Policies — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Official website policies for the National Bamboo Mission portal — copyright, hyperlinking, privacy and terms of use.",
      },
    ],
  }),
  component: WebsitePoliciesPage,
});

function WebsitePoliciesPage() {
  return (
    <div className="website-policies-page">
      <PageHero
        eyebrow={
          <>
            <FileText className="h-3.5 w-3.5" aria-hidden />
            Government of India · Official Policies
          </>
        }
        title="Website Policies"
        subtitle="Copyright, hyperlinking, privacy and terms of use for the National Bamboo Mission portal — as published on the official website."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
          <div className="official-policy-list space-y-0">
            {websitePolicySections.map((section) => (
              <OfficialPolicySection key={section.id} section={section} />
            ))}

            <section className="mt-10 rounded-lg border border-border bg-card p-5 text-sm text-foreground/80">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Mail className="h-4 w-4" aria-hidden />
                <h2 className="text-base font-bold text-foreground">Permission &amp; enquiries</h2>
              </div>
              <p>
                For copyright permission, hyperlinking notifications, or policy-related queries, write to{" "}
                <a href="mailto:nbm-agri@gov.in" className="text-primary underline hover:opacity-80">
                  nbm-agri@gov.in
                </a>
                .
              </p>
            </section>
          </div>

          <aside className="space-y-5" aria-label="Website policies sidebar">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">On this page</h3>
              <nav aria-label="Website policy sections">
                <ul className="space-y-1.5 text-xs">
                  {websitePolicySections.map((sec) => (
                    <li key={sec.id}>
                      <a href={`#${sec.id}`} className="text-primary underline hover:opacity-80">
                        {sec.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Individual pages</h3>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link to="/privacy-policy" className="text-primary underline hover:opacity-80">
                    Privacy Policy (extended)
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-primary underline hover:opacity-80">
                    Disclaimer &amp; Terms
                  </Link>
                </li>
                <li>
                  <Link to="/accessibility" className="text-primary underline hover:opacity-80">
                    Accessibility Statement
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 shadow-sm text-xs text-foreground/70">
              <p className="mb-1 font-semibold text-foreground">Maintained by</p>
              <p>National Informatics Centre (NIC)</p>
              <p className="mt-2 mb-1 font-semibold text-foreground">Content by</p>
              <p>Department of Agriculture and Farmers Welfare, Government of India</p>
              <a
                href="https://ux4g.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-0.5 text-primary underline hover:opacity-80"
              >
                GIGW / UX4G Guidelines <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
