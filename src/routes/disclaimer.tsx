import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { OfficialPolicySection } from "@/components/policies/OfficialPolicySection";
import { websitePolicySections } from "@/data/websitePolicies";
import {
  Scale,
  Building2,
  Calendar,
  Mail,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer & Terms of Use — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Official disclaimer, copyright policy, hyperlinking policy and terms of use for the National Bamboo Mission portal.",
      },
    ],
  }),
  component: DisclaimerPage,
});

const policySections = websitePolicySections.filter(
  (s) => s.id === "copyright" || s.id === "hyperlinking" || s.id === "terms",
);

function DisclaimerPage() {
  return (
    <div className="disclaimer-page">
      <PageHero
        eyebrow={
          <>
            <Scale className="h-3.5 w-3.5" aria-hidden />
            Terms of Use · Government of India
          </>
        }
        title="Disclaimer"
        subtitle="Official copyright, hyperlinking and terms-of-use policies for the National Bamboo Mission portal."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
          <div className="space-y-8">
            <section id="ownership" aria-labelledby="ownership-heading">
              <div className="mb-3 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" aria-hidden />
                <h2 id="ownership-heading" className="text-xl font-bold text-primary">
                  Website Ownership
                </h2>
              </div>
              <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    This website belongs to the <strong>National Bamboo Mission</strong>, Ministry of Agriculture and Farmers Welfare, Government of India.
                  </p>
                </div>
                <p>
                  The portal is designed, developed and maintained by the National Informatics Centre (NIC). Content is provided by the Department of Agriculture and Farmers Welfare, Government of India.
                </p>
              </div>
            </section>

            {policySections.map((section) => (
              <OfficialPolicySection key={section.id} section={section} variant="card" />
            ))}

            <section aria-labelledby="contact-heading">
              <div className="mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" aria-hidden />
                <h2 id="contact-heading" className="text-xl font-bold text-primary">
                  Contact
                </h2>
              </div>
              <div className="rounded-lg border border-border bg-card p-5 text-sm text-foreground/80">
                <p className="font-semibold text-foreground">National Bamboo Mission</p>
                <p className="mt-1">Ministry of Agriculture and Farmers Welfare</p>
                <p>Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi – 110001</p>
                <a href="mailto:nbm-agri@gov.in" className="mt-2 inline-flex items-center gap-1.5 text-primary underline hover:opacity-80">
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  nbm-agri@gov.in
                </a>
                <p className="mt-3 text-xs text-foreground/60">
                  For copyright permission or to notify us of inbound links to this website, please write to the email above.
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-5" aria-label="Disclaimer sidebar">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Calendar className="h-4 w-4" aria-hidden />
                <h3 className="text-sm font-semibold">Policy source</h3>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Text carried forward from the official National Bamboo Mission website policies.
              </p>
              <Link to="/website-policies" className="mt-2 inline-block text-xs text-primary underline hover:opacity-80">
                View consolidated policies
              </Link>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Sections</h3>
              <nav aria-label="Disclaimer sections">
                <ul className="space-y-1.5 text-xs">
                  <li><a href="#ownership" className="text-primary underline hover:opacity-80">Website Ownership</a></li>
                  {policySections.map((sec) => (
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
              <h3 className="mb-2 text-sm font-semibold text-foreground">Related Pages</h3>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/website-policies" className="text-primary underline hover:opacity-80">Website Policies</Link></li>
                <li><Link to="/privacy-policy" className="text-primary underline hover:opacity-80">Privacy Policy</Link></li>
                <li><Link to="/accessibility" className="text-primary underline hover:opacity-80">Accessibility Statement</Link></li>
                <li><Link to="/sitemap" className="text-primary underline hover:opacity-80">Sitemap</Link></li>
                <li><Link to="/feedback" className="text-primary underline hover:opacity-80">Submit Feedback</Link></li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 shadow-sm text-xs text-foreground/70">
              <p className="font-semibold text-foreground mb-1">Official Reference</p>
              <a
                href="https://ux4g.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-primary underline hover:opacity-80"
              >
                UX4G / GIGW 3.0 Guidelines <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
