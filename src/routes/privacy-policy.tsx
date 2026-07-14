import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { OfficialPolicySection } from "@/components/policies/OfficialPolicySection";
import {
  websitePolicySections,
} from "@/data/websitePolicies";
import {
  Shield,
  AlertTriangle,
  Info,
  Cookie,
  Lock,
  Mail,
  ExternalLink,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Privacy policy for the National Bamboo Mission portal. Official policy on data collection, cookies, DPDPA compliance and contact for privacy concerns.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

const privacySection = websitePolicySections.find((s) => s.id === "privacy")!;

const supplementarySections = [
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies and Session Data",
    content: (
      <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
        <p>
          In addition to the information described in the official policy above, this portal uses minimal, technically necessary browser storage. We do <strong>not</strong> use third-party advertising cookies or cross-site tracking.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-xs">
            <thead className="bg-muted">
              <tr>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Storage Key</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Purpose</th>
                <th scope="col" className="px-3 py-2 text-left font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-3 py-2 font-mono">nbm-a11y</td>
                <td className="px-3 py-2">Accessibility widget preferences</td>
                <td className="px-3 py-2">Persistent (localStorage)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono">nbm-text-scale</td>
                <td className="px-3 py-2">Selected text size (A–/A/A+)</td>
                <td className="px-3 py-2">Persistent (localStorage)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono">i18nextLng</td>
                <td className="px-3 py-2">User&apos;s selected display language</td>
                <td className="px-3 py-2">Persistent (localStorage)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono">nbm-font-theme</td>
                <td className="px-3 py-2">Typography theme preference</td>
                <td className="px-3 py-2">Persistent (localStorage)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The portal embeds content from <strong>YouTube</strong> (gallery videos), uses <strong>Google Fonts</strong> and <strong>Google Translate</strong>. These third parties may set their own cookies; please refer to Google&apos;s Privacy Policy for details.
        </p>
      </div>
    ),
  },
  {
    id: "dpdpa",
    icon: Lock,
    title: "DPDPA 2023 — Supplementary Notice",
    content: (
      <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
        <p>
          The <strong>Digital Personal Data Protection Act, 2023</strong> (DPDPA) governs the processing of digital personal data in India. Where personal data is collected beyond general browsing (for example, beneficiary registration or officer logins in a future phase), the following principles apply:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Lawful basis:</strong> Data is processed only for legitimate government functions or with consent where required.</li>
          <li><strong>Purpose limitation:</strong> Data collected for one purpose is not used for another without fresh consent or legal basis.</li>
          <li><strong>Data Principal rights:</strong> Citizens may request access, correction and erasure of personal data via nbm-agri@gov.in.</li>
        </ul>
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-900">
          <p className="flex items-start gap-2 text-xs font-medium">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>
              <strong>Department note:</strong> A full DPDPA-compliant Privacy Notice must be reviewed and approved by the Ministry before any live personal data processing commences.
            </span>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact for Privacy Concerns",
    content: (
      <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
        <p>For privacy queries or data access requests, please write to:</p>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="font-semibold text-foreground">Nodal Officer (Privacy)</p>
          <p className="mt-1 text-sm">National Bamboo Mission</p>
          <p className="text-sm">Ministry of Agriculture and Farmers Welfare, Government of India</p>
          <p className="text-sm">Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi – 110001</p>
          <a href="mailto:nbm-agri@gov.in" className="mt-2 inline-flex items-center gap-1.5 text-primary underline hover:opacity-80">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            nbm-agri@gov.in
          </a>
        </div>
      </div>
    ),
  },
];

function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy-page">
      <PageHero
        eyebrow={
          <>
            <Shield className="h-3.5 w-3.5" aria-hidden />
            Official Policy · Government of India
          </>
        }
        title="Privacy Policy"
        subtitle="Official privacy policy for the National Bamboo Mission portal, with supplementary notes on cookies and DPDPA 2023 compliance."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
          <div className="space-y-10">
            <OfficialPolicySection section={privacySection} variant="card" />

            <section aria-labelledby="portal-supplement-heading">
              <div className="mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" aria-hidden />
                <h2 id="portal-supplement-heading" className="text-xl font-bold text-primary">
                  Portal-specific information
                </h2>
              </div>
              <p className="mb-6 text-sm text-foreground/70 leading-relaxed">
                The following sections supplement the official policy above with details specific to this website&apos;s current features.
              </p>
              <div className="space-y-8">
                {supplementarySections.map((sec) => (
                  <section key={sec.id} id={sec.id} aria-labelledby={`${sec.id}-heading`}>
                    <div className="mb-3 flex items-center gap-2">
                      <sec.icon className="h-5 w-5 text-primary" aria-hidden />
                      <h3 id={`${sec.id}-heading`} className="text-lg font-bold text-foreground">
                        {sec.title}
                      </h3>
                    </div>
                    {sec.content}
                  </section>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5" aria-label="Policy sidebar">
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Calendar className="h-4 w-4" aria-hidden />
                <h3 className="text-sm font-semibold">Policy source</h3>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Core text is carried forward from the official National Bamboo Mission website policy.
              </p>
              <Link to="/website-policies" className="mt-2 inline-block text-xs text-primary underline hover:opacity-80">
                View all website policies
              </Link>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Sections</h3>
              <nav aria-label="Privacy policy sections">
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <a href="#privacy" className="text-primary underline hover:opacity-80">
                      Official Privacy Policy
                    </a>
                  </li>
                  {supplementarySections.map((sec) => (
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
                <li><Link to="/disclaimer" className="text-primary underline hover:opacity-80">Disclaimer &amp; Terms</Link></li>
                <li><Link to="/accessibility" className="text-primary underline hover:opacity-80">Accessibility Statement</Link></li>
                <li><Link to="/feedback" className="text-primary underline hover:opacity-80">Submit Feedback</Link></li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-4 shadow-sm text-xs text-foreground/70">
              <p className="font-semibold text-foreground mb-1">Legal Reference</p>
              <a
                href="https://www.meity.gov.in/content/digital-personal-data-protection-act-2023"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-primary underline hover:opacity-80"
              >
                DPDPA 2023 (MeitY) <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
