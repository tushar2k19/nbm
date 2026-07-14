import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import {
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Accessibility,
  Monitor,
  Keyboard,
  Eye,
  Volume2,
  Calendar,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Accessibility statement for the National Bamboo Mission portal. WCAG 2.1 Level AA conformance, known limitations and contact for reporting barriers.",
      },
    ],
  }),
  component: AccessibilityPage,
});

const conformanceItems = [
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    desc: "All interactive elements are reachable and operable via keyboard alone. Tab order follows a logical reading sequence. Mega menus respond to focus events and support Escape to close.",
  },
  {
    icon: Eye,
    title: "Focus Indicators",
    desc: "Visible focus rings (3 px solid blue, 2 px offset) are applied globally to every interactive element — links, buttons, form fields and nav items — meeting WCAG 2.4.7.",
  },
  {
    icon: Volume2,
    title: "Screen Reader Support",
    desc: "Semantic HTML5 landmarks (header, nav, main, footer), ARIA roles, aria-label, aria-expanded and aria-live regions are used throughout. Skip to Main Content link is the first focusable element.",
  },
  {
    icon: Monitor,
    title: "UX4G Accessibility Widget",
    desc: "A persistent widget (bottom-right) provides: text size (5 steps), line height, letter spacing, dyslexia-friendly font (OpenDyslexic), high-contrast, dark mode, invert colours, hide images, large cursor, highlight links, text-to-speech and reset.",
  },
  {
    icon: Eye,
    title: "Text Resize",
    desc: "A–/A/A+ controls in the utility strip allow text scaling from 87.5% to 125% in five steps without loss of content or functionality, meeting WCAG 1.4.4.",
  },
  {
    icon: Accessibility,
    title: "Forms & CAPTCHA",
    desc: "All form inputs have explicit labels, autocomplete attributes and aria-describedby references. CAPTCHA uses an accessible arithmetic challenge instead of image-based verification.",
  },
];

const limitations = [
  {
    area: "PDF Documents",
    detail:
      "Downloadable files (reports, guidelines, tenders) are currently sample placeholder PDFs. When real government documents are published, they will be required to carry proper text layers, reading order tags and alt text for images as mandated by GIGW 3.0.",
    timeline: "To be resolved by the Department before public launch.",
  },
  {
    area: "Third-party Videos",
    detail:
      "Gallery and Success Stories embed YouTube videos. Auto-generated captions may be available on YouTube; manual captioning and audio descriptions have not been verified for all videos.",
    timeline: "To be audited and captioned before STQC certification.",
  },
  {
    area: "Google Translate (Regional Languages)",
    detail:
      "The language selector for 10 regional languages uses Google Translate widget, which is a third-party tool. Its own accessibility is outside our direct control.",
    timeline: "Planned replacement with NIC translation API after NIC handover.",
  },
];

const screenReaders = [
  { name: "NVDA (Windows)", url: "https://www.nvaccess.org/download/" },
  { name: "JAWS (Windows)", url: "https://www.freedomscientific.com/products/software/jaws/" },
  { name: "ORCA (Linux)", url: "https://help.gnome.org/users/orca/stable/" },
  { name: "VoiceOver (macOS / iOS)", url: "https://support.apple.com/guide/voiceover/welcome/mac" },
  { name: "TalkBack (Android)", url: "https://support.google.com/accessibility/android/answer/6007100" },
];

function AccessibilityPage() {
  return (
    <div className="accessibility-page">
      <PageHero
        eyebrow={
          <>
            <Accessibility className="h-3.5 w-3.5" aria-hidden />
            WCAG 2.1 Level AA · GIGW 3.0
          </>
        }
        title="Accessibility Statement"
        subtitle="National Bamboo Mission is committed to making this portal accessible to all citizens, including persons with disabilities. This statement describes our conformance level, the assistive features available and how to report any barriers you encounter."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">

          {/* ── Main content ── */}
          <div className="space-y-12">

            {/* Conformance Status */}
            <section aria-labelledby="conformance-heading">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden />
                <h2 id="conformance-heading" className="text-xl font-bold text-primary">
                  Conformance Status
                </h2>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                <p className="font-semibold">
                  This website is <strong>partially conformant</strong> with{" "}
                  <a
                    href="https://www.w3.org/TR/WCAG21/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-emerald-700 inline-flex items-center gap-0.5"
                  >
                    WCAG 2.1 Level AA <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>{" "}
                  and the{" "}
                  <a
                    href="https://ux4g.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-emerald-700 inline-flex items-center gap-0.5"
                  >
                    UX4G Design System <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>{" "}
                  issued by MeitY / NIC.
                </p>
                <p className="mt-2 text-emerald-800">
                  "Partially conformant" means some content does not fully conform; known limitations are listed below. Full conformance is being worked towards and will be submitted for{" "}
                  <abbr title="Standardisation Testing and Quality Certification">STQC</abbr> CQW audit after NIC handover.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {conformanceItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      <item.icon className="h-4 w-4 shrink-0" aria-hidden />
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical specification */}
            <section aria-labelledby="tech-heading">
              <h2 id="tech-heading" className="mb-4 text-xl font-bold text-primary">
                Technical Approach
              </h2>
              <div className="prose prose-sm max-w-none text-foreground/85 leading-relaxed space-y-3">
                <p>
                  This portal is built using <strong>React 19</strong>, <strong>TanStack Router</strong> and{" "}
                  <strong>Tailwind CSS v4</strong>. Technologies used for accessibility include:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Semantic HTML5 landmarks: <code className="text-xs bg-muted px-1 rounded">header</code>, <code className="text-xs bg-muted px-1 rounded">nav</code>, <code className="text-xs bg-muted px-1 rounded">main</code>, <code className="text-xs bg-muted px-1 rounded">footer</code>, <code className="text-xs bg-muted px-1 rounded">aside</code></li>
                  <li>WAI-ARIA attributes: <code className="text-xs bg-muted px-1 rounded">aria-label</code>, <code className="text-xs bg-muted px-1 rounded">aria-expanded</code>, <code className="text-xs bg-muted px-1 rounded">aria-haspopup</code>, <code className="text-xs bg-muted px-1 rounded">aria-live</code>, <code className="text-xs bg-muted px-1 rounded">aria-describedby</code></li>
                  <li>Noto Sans Devanagari (Google Fonts) for Hindi text, declared via <code className="text-xs bg-muted px-1 rounded">lang="hi"</code></li>
                  <li>OpenDyslexic font option via the accessibility widget</li>
                  <li>CSS <code className="text-xs bg-muted px-1 rounded">:focus-visible</code> for keyboard-only focus rings; mouse users see no rings</li>
                  <li>Screen Reader Access link in the utility strip listing NVDA, JAWS, ORCA, VoiceOver and TalkBack</li>
                </ul>
                <p>
                  The portal was tested with <strong>NVDA 2024.1</strong> on Chrome 124 (Windows 11) and ORCA 44 on Firefox (Ubuntu 22.04) during development.
                </p>
              </div>
            </section>

            {/* Known Limitations */}
            <section aria-labelledby="limitations-heading">
              <div className="mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" aria-hidden />
                <h2 id="limitations-heading" className="text-xl font-bold text-primary">
                  Known Limitations
                </h2>
              </div>
              <p className="mb-4 text-sm text-foreground/70">
                The following areas do not yet fully meet WCAG 2.1 AA. We are actively working on them.
              </p>
              <div className="space-y-4">
                {limitations.map((lim) => (
                  <div
                    key={lim.area}
                    className="rounded-lg border border-amber-200 bg-amber-50 p-4"
                  >
                    <h3 className="text-sm font-semibold text-amber-900">{lim.area}</h3>
                    <p className="mt-1 text-xs text-amber-800 leading-relaxed">{lim.detail}</p>
                    <p className="mt-2 text-xs font-medium text-amber-700">
                      Timeline: {lim.timeline}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Reporting */}
            <section aria-labelledby="report-heading">
              <h2 id="report-heading" className="mb-4 text-xl font-bold text-primary">
                Reporting Accessibility Barriers
              </h2>
              <p className="mb-4 text-sm text-foreground/80 leading-relaxed">
                If you experience any difficulty accessing content on this website or find that any page is not meeting our accessibility commitment, please let us know. We aim to respond within <strong>5 working days</strong> and resolve confirmed barriers within <strong>30 days</strong>.
              </p>
              <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold text-foreground">
                  National Bamboo Mission — Nodal Accessibility Officer
                </p>
                <div className="mt-3 flex flex-col gap-2 text-sm text-foreground/80">
                  <a
                    href="mailto:nbm-agri@gov.in"
                    className="inline-flex items-center gap-2 hover:text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    nbm-agri@gov.in
                  </a>
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    1800-180-1551 (Toll-free · Mon–Fri, 9 AM – 6 PM IST)
                  </span>
                </div>
                <p className="mt-3 text-xs text-foreground/60">
                  You may also use the{" "}
                  <Link to="/feedback" className="underline hover:text-primary">
                    online Feedback Form
                  </Link>{" "}
                  and select category "Accessibility Issue".
                </p>
              </div>
            </section>

            {/* Enforcement */}
            <section aria-labelledby="enforcement-heading">
              <h2 id="enforcement-heading" className="mb-3 text-xl font-bold text-primary">
                Enforcement Procedure
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                If you are not satisfied with our response to your accessibility complaint, you may contact the{" "}
                <a
                  href="https://www.meity.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary inline-flex items-center gap-0.5"
                >
                  Ministry of Electronics and Information Technology (MeitY) <ExternalLink className="h-3 w-3" aria-hidden />
                </a>{" "}
                which is the nodal ministry for GIGW compliance, or raise a grievance on{" "}
                <a
                  href="https://pgportal.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary inline-flex items-center gap-0.5"
                >
                  pgportal.gov.in <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
                .
              </p>
            </section>

          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-5" aria-label="Accessibility sidebar">

            {/* Review date */}
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Calendar className="h-4 w-4" aria-hidden />
                <h3 className="text-sm font-semibold">Last Reviewed</h3>
              </div>
              <p className="text-sm text-foreground/80">July 2026</p>
              <p className="mt-1 text-xs text-foreground/55">
                This statement is reviewed annually as mandated by GIGW 3.0.
              </p>
              <p className="mt-2 text-xs text-foreground/55">
                Next review due: <strong>July 2027</strong>
              </p>
            </div>

            {/* Standards */}
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Standards Applied</h3>
              <ul className="space-y-2 text-xs text-foreground/75">
                <li>
                  <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary inline-flex items-center gap-0.5">
                    WCAG 2.1 Level AA <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                </li>
                <li>
                  <a href="https://ux4g.gov.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary inline-flex items-center gap-0.5">
                    UX4G Design System (MeitY) <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                </li>
                <li>
                  <a href="https://stqc.gov.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary inline-flex items-center gap-0.5">
                    GIGW 3.0 (STQC, 2024) <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                </li>
                <li>
                  <a href="https://rti.gov.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary inline-flex items-center gap-0.5">
                    RTI Act 2005 — Section 4 <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                </li>
              </ul>
            </div>

            {/* Screen readers */}
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Free Screen Readers</h3>
              <ul className="space-y-2 text-xs">
                {screenReaders.map((sr) => (
                  <li key={sr.name}>
                    <a
                      href={sr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary underline hover:opacity-80"
                    >
                      {sr.name} <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Related Pages</h3>
              <ul className="space-y-2 text-xs">
                <li><Link to="/website-policies" className="text-primary underline hover:opacity-80">Website Policies</Link></li>
                <li><Link to="/feedback" className="text-primary underline hover:opacity-80">Submit Feedback</Link></li>
                <li><Link to="/disclaimer" className="text-primary underline hover:opacity-80">Disclaimer</Link></li>
                <li><Link to="/privacy-policy" className="text-primary underline hover:opacity-80">Privacy Policy</Link></li>
                <li><Link to="/sitemap" className="text-primary underline hover:opacity-80">Sitemap</Link></li>
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
