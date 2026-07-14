import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import {
  Monitor,
  FileText,
  Type,
  Accessibility,
  LayoutGrid,
  MessageSquare,
  ChevronRight,
  Chrome,
  Globe,
  Phone,
  Info,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Help and guidance for using the National Bamboo Mission portal — browser requirements, PDF documents, text size, screen reader access and more.",
      },
    ],
  }),
  component: HelpPage,
});

type Section = {
  id: string;
  icon: typeof Monitor;
  title: string;
  content: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "browser",
    icon: Monitor,
    title: "Browser Requirements",
    content: (
      <div className="space-y-4 text-sm text-foreground/85 leading-relaxed">
        <p>
          This website is optimised for modern browsers. For the best experience, please use one of
          the following:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "Google Chrome", version: "100+", icon: Chrome },
            { name: "Mozilla Firefox", version: "100+", icon: Globe },
            { name: "Microsoft Edge", version: "100+", icon: Globe },
            { name: "Apple Safari", version: "15+", icon: Globe },
          ].map(({ name, version, icon: Icon }) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 px-4 py-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-sm text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">Version {version} or later</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
          <p className="text-amber-800">
            Internet Explorer is not supported. JavaScript must be enabled for all features to
            function correctly.
          </p>
        </div>
        <p>
          <strong>Mobile browsers:</strong> The site is fully responsive and tested on Chrome for
          Android and Safari for iOS (latest two major versions).
        </p>
      </div>
    ),
  },
  {
    id: "pdf",
    icon: FileText,
    title: "Opening PDF Documents",
    content: (
      <div className="space-y-4 text-sm text-foreground/85 leading-relaxed">
        <p>
          Many documents on this portal are available in PDF format. To open them, you need a PDF
          viewer installed or enabled in your browser.
        </p>
        <h4 className="font-semibold text-foreground">Recommended options</h4>
        <ul className="space-y-2 pl-4 list-disc">
          <li>
            <strong>Built-in browser PDF viewer</strong> — Chrome, Edge, Firefox and Safari all
            include a PDF viewer. Click the link and the document will open in a new tab.
          </li>
          <li>
            <strong>Adobe Acrobat Reader</strong> — Free download from{" "}
            <a
              href="https://get.adobe.com/reader/"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline hover:opacity-80"
            >
              get.adobe.com/reader
            </a>
            .
          </li>
          <li>
            <strong>Foxit PDF Reader</strong> — A lightweight alternative for Windows and macOS.
          </li>
        </ul>
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden />
          <p className="text-blue-800 text-xs">
            <strong>Note:</strong> All PDF documents currently on this portal are <em>sample
            placeholders</em>. Official documents will be uploaded by the Department before the
            site goes live. Each PDF link is clearly marked with a "Sample" badge.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "text-size",
    icon: Type,
    title: "Using Text Size Controls",
    content: (
      <div className="space-y-4 text-sm text-foreground/85 leading-relaxed">
        <p>
          You can change the text size on this website without changing your browser's default zoom
          level, using the <strong>A− / A / A+</strong> controls in the header utility bar (the
          green strip at the top).
        </p>
        <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-2">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-primary/15 font-bold text-primary text-xs">A−</span>
            <p>Decreases text size by one step (minimum: 14px base)</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-primary/15 font-bold text-primary text-sm">A</span>
            <p>Resets to default text size</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-primary/15 font-bold text-primary">A+</span>
            <p>Increases text size by one step (maximum: 20px base)</p>
          </div>
        </div>
        <p>
          The same controls are also available inside the{" "}
          <strong>Accessibility Widget</strong> (the blue button on the bottom-right of the screen).
          Your preference is saved in the browser and restored on your next visit.
        </p>
        <p>
          You can also use your browser's built-in zoom (
          <kbd className="rounded border border-border px-1.5 py-0.5 text-xs font-mono">Ctrl +</kbd>{" "}
          /{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5 text-xs font-mono">Ctrl −</kbd>
          ) at any time.
        </p>
      </div>
    ),
  },
  {
    id: "screen-reader",
    icon: Accessibility,
    title: "Screen Reader Access",
    content: (
      <div className="space-y-4 text-sm text-foreground/85 leading-relaxed">
        <p>
          This website is built to WCAG 2.1 Level AA and is compatible with popular screen readers.
          Use the <strong>Screen Reader Access</strong> link in the top green strip to view the
          officially recommended readers.
        </p>
        <h4 className="font-semibold text-foreground">Tested screen readers</h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { name: "NVDA", platform: "Windows", url: "https://www.nvaccess.org/download/" },
            { name: "JAWS", platform: "Windows", url: "https://www.freedomscientific.com/products/software/jaws/" },
            { name: "ORCA", platform: "Linux (GNOME)", url: "https://help.gnome.org/users/orca/stable/" },
            { name: "VoiceOver", platform: "macOS / iOS", url: null },
            { name: "TalkBack", platform: "Android", url: null },
            { name: "Narrator", platform: "Windows 10/11", url: null },
          ].map(({ name, platform, url }) => (
            <div key={name} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2.5">
              <div>
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{platform}</p>
              </div>
              {url && (
                <a href={url} target="_blank" rel="noreferrer" className="text-xs text-primary underline hover:opacity-80">
                  Download
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          All interactive elements have accessible labels, all images have alternative text, and all
          form fields have associated labels in compliance with WAI-ARIA 1.2.
        </p>
      </div>
    ),
  },
  {
    id: "a11y-widget",
    icon: LayoutGrid,
    title: "Using the Accessibility Widget",
    content: (
      <div className="space-y-4 text-sm text-foreground/85 leading-relaxed">
        <p>
          Click the blue <strong>Accessibility</strong> button fixed at the bottom-right of every
          page to open the widget panel. It includes the following controls:
        </p>
        <div className="space-y-3">
          {[
            {
              feature: "Text Size",
              description: "A− / A / A+ buttons to shrink or enlarge all text across the site.",
            },
            {
              feature: "Line Height",
              description:
                "Spreads out lines of text — helpful for readers with dyslexia or low vision.",
            },
            {
              feature: "Letter Spacing",
              description: "Adds extra space between characters for improved readability.",
            },
            {
              feature: "Word Spacing",
              description: "Adds extra space between words.",
            },
            {
              feature: "High Contrast",
              description:
                "Switches the entire site to a black-and-yellow high-contrast palette. Meets WCAG 1.4.6 Enhanced Contrast.",
            },
            {
              feature: "Reset All",
              description: "Restores all settings to the site defaults in one click.",
            },
          ].map(({ feature, description }) => (
            <div key={feature} className="flex gap-3">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-foreground">{feature}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          All preferences are saved in your browser's local storage and automatically restored on
          your next visit.
        </p>
      </div>
    ),
  },
  {
    id: "report",
    icon: MessageSquare,
    title: "Reporting Accessibility Issues",
    content: (
      <div className="space-y-4 text-sm text-foreground/85 leading-relaxed">
        <p>
          We are committed to making this website accessible to everyone. If you experience any
          accessibility barrier or technical difficulty, please let us know.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="font-semibold text-foreground mb-2">Online Feedback Form</p>
            <p className="text-xs text-muted-foreground mb-3">
              Submit a detailed report of the issue, including the page URL and the assistive
              technology you are using.
            </p>
            <Link
              to="/feedback"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              <MessageSquare className="h-3.5 w-3.5" aria-hidden />
              Submit Feedback
            </Link>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="font-semibold text-foreground mb-2">NBM Helpline</p>
            <p className="text-xs text-muted-foreground mb-2">
              For urgent queries or assistance, call our toll-free helpline:
            </p>
            <a
              href="tel:18001801551"
              className="flex items-center gap-2 text-lg font-bold text-primary hover:text-saffron transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden />
              1800-180-1551
            </a>
            <p className="mt-1 text-xs text-muted-foreground">
              Monday–Friday, 9:30 AM – 5:30 PM IST
            </p>
            <a href="mailto:nbm-agri@gov.in" className="mt-2 block text-xs text-primary hover:underline">
              nbm-agri@gov.in
            </a>
          </div>
        </div>
        <p>
          For formal accessibility concerns, you may also refer to the{" "}
          <Link to="/accessibility" className="text-primary underline hover:opacity-80">
            Accessibility Statement
          </Link>{" "}
          which outlines our conformance targets, known limitations, and the review schedule.
        </p>
      </div>
    ),
  },
];

function HelpPage() {
  const [active, setActive] = useState<string>(sections[0].id);
  const activeSection = sections.find((s) => s.id === active)!;

  return (
    <div className="help-page">
      <PageHero
        eyebrow={
          <>
            <Accessibility className="h-3.5 w-3.5" aria-hidden />
            GIGW 3.0 · User Help
          </>
        }
        title="Help"
        subtitle="Guidance on using the National Bamboo Mission portal — browser requirements, documents, text controls, screen readers and more."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">

          {/* Sidebar nav */}
          <nav
            aria-label="Help sections"
            className="shrink-0 lg:w-60"
          >
            <ol className="space-y-1">
              {sections.map((s, i) => {
                const Icon = s.icon;
                const isActive = s.id === active;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActive(s.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-foreground/75 hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
                          isActive ? "bg-white/20" : "bg-primary/10 text-primary group-hover:bg-primary/15"
                        }`}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span className="leading-snug">{s.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Quick links */}
            <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-4">
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Links
              </p>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link to="/accessibility" className="flex items-center gap-1.5 text-primary hover:underline">
                    <ChevronRight className="h-3 w-3" aria-hidden />
                    Accessibility Statement
                  </Link>
                </li>
                <li>
                  <Link to="/feedback" className="flex items-center gap-1.5 text-primary hover:underline">
                    <ChevronRight className="h-3 w-3" aria-hidden />
                    Feedback Form
                  </Link>
                </li>
                <li>
                  <Link to="/sitemap" className="flex items-center gap-1.5 text-primary hover:underline">
                    <ChevronRight className="h-3 w-3" aria-hidden />
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Content pane */}
          <main
            id="help-content"
            className="flex-1 min-w-0"
            tabIndex={-1}
          >
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <activeSection.icon className="h-5 w-5 text-primary" aria-hidden />
                </span>
                <h1 className="text-xl font-bold text-foreground font-display">
                  {activeSection.title}
                </h1>
              </div>
              {activeSection.content}
            </div>

            {/* Prev / Next nav */}
            <div className="mt-4 flex items-center justify-between gap-4">
              {sections.findIndex((s) => s.id === active) > 0 ? (
                <button
                  type="button"
                  onClick={() => setActive(sections[sections.findIndex((s) => s.id === active) - 1].id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/70 shadow-sm hover:text-foreground transition-colors"
                >
                  ← Previous
                </button>
              ) : (
                <span />
              )}
              {sections.findIndex((s) => s.id === active) < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActive(sections[sections.findIndex((s) => s.id === active) + 1].id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-primary/10 transition-colors"
                >
                  Next →
                </button>
              ) : (
                <span />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
