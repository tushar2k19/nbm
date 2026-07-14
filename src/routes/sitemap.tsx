import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import {
  Map,
  Home,
  Info,
  FileText,
  BookOpen,
  BarChart2,
  Newspaper,
  ClipboardList,
  Scale,
  Image,
  LayoutDashboard,
  Phone,
  LogIn,
  Shield,
  Accessibility,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Complete sitemap of the National Bamboo Mission portal. Browse all sections and pages.",
      },
    ],
  }),
  component: SitemapPage,
});

interface SitemapLink {
  label: string;
  to: string;
  external?: boolean;
}

interface SitemapSection {
  id: string;
  icon: typeof Home;
  title: string;
  links: SitemapLink[];
}

const sitemapSections: SitemapSection[] = [
  {
    id: "home",
    icon: Home,
    title: "Home",
    links: [
      { label: "Home Page", to: "/" },
      { label: "About NBM", to: "/about" },
      { label: "Implementing States", to: "/implementing-states" },
    ],
  },
  {
    id: "guidelines",
    icon: FileText,
    title: "Guidelines & Documents",
    links: [
      { label: "Guidelines Overview", to: "/guidelines" },
      { label: "Official Letters", to: "/guidelines#letters" },
      { label: "Enabling Provisions", to: "/guidelines/enabling-provisions" },
      { label: "Guidelines FAQ", to: "/guidelines#faq" },
      { label: "Reports", to: "/reports" },
    ],
  },
  {
    id: "knowledge-center",
    icon: BookOpen,
    title: "Knowledge Center",
    links: [
      { label: "Knowledge Center Overview", to: "/knowledge-center" },
      { label: "Training Modules", to: "/training-module" },
      { label: "Research Papers", to: "/knowledge-center/research-papers" },
      { label: "State Mission", to: "/knowledge-center/state-mission" },
      { label: "Value Added Products", to: "/products" },
      { label: "Institutes", to: "/institutes" },
      { label: "Success Stories", to: "/success-stories" },
    ],
  },
  {
    id: "mis-reports",
    icon: BarChart2,
    title: "Reports & MIS",
    links: [
      { label: "Reports", to: "/reports" },
      { label: "State Dashboard", to: "/state-dashboard" },
      { label: "Interactive Dashboard", to: "/dashboard" },
    ],
  },
  {
    id: "news",
    icon: Newspaper,
    title: "News & Press Releases",
    links: [
      { label: "All News & Updates", to: "/news" },
    ],
  },
  {
    id: "tenders",
    icon: ClipboardList,
    title: "Tenders / Vacancies",
    links: [
      { label: "Tenders & Vacancies", to: "/tenders-vacancies" },
    ],
  },
  {
    id: "rti",
    icon: Scale,
    title: "Right to Information",
    links: [
      { label: "RTI Disclosures & CPIO Details", to: "/rti" },
    ],
  },
  {
    id: "gallery",
    icon: Image,
    title: "Gallery",
    links: [
      { label: "Photo Gallery", to: "/gallery" },
      { label: "Video Gallery", to: "/gallery?tab=videos" },
    ],
  },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
    links: [
      { label: "India Bamboo Dashboard", to: "/dashboard" },
      { label: "State Analytics Map", to: "/dashboard#map" },
      { label: "State Dashboard (MIS)", to: "/state-dashboard" },
    ],
  },
  {
    id: "contact",
    icon: Phone,
    title: "Contact",
    links: [
      { label: "Head Quarter (NBMC)", to: "/contact/head-quarter" },
      { label: "State Contacts", to: "/contact/state" },
      { label: "Structure of NBM", to: "/contact/structure" },
      { label: "Who's Who", to: "/contact/whos-who" },
    ],
  },
  {
    id: "login",
    icon: LogIn,
    title: "Login",
    links: [
      { label: "State Login", to: "/login" },
      { label: "MIS Login", to: "/mis-login" },
    ],
  },
  {
    id: "mandatory",
    icon: Shield,
    title: "Mandatory Pages",
    links: [
      { label: "Website Policies", to: "/website-policies" },
      { label: "Accessibility Statement", to: "/accessibility" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Disclaimer", to: "/disclaimer" },
      { label: "Feedback", to: "/feedback" },
      { label: "Sitemap", to: "/sitemap" },
    ],
  },
];

function SitemapPage() {
  return (
    <div className="sitemap-page">
      <PageHero
        eyebrow={
          <>
            <Map className="h-3.5 w-3.5" aria-hidden />
            GIGW 3.0 · All Pages
          </>
        }
        title="Sitemap"
        subtitle="A complete index of all sections and pages on the National Bamboo Mission portal to help you find information quickly."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Section quick-jump */}
        <nav aria-label="Jump to section" className="mb-10 rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Jump to Section</h2>
          <div className="flex flex-wrap gap-2">
            {sitemapSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <sec.icon className="h-3 w-3" aria-hidden />
                {sec.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Sections grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sitemapSections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              aria-labelledby={`${sec.id}-heading`}
              className="rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <sec.icon className="h-4 w-4 text-primary" aria-hidden />
                </div>
                <h2 id={`${sec.id}-heading`} className="text-sm font-bold text-foreground">
                  {sec.title}
                </h2>
              </div>
              <ul className="space-y-1.5" role="list">
                {sec.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to as Parameters<typeof Link>[0]["to"]}
                      className="flex items-center gap-1.5 text-xs text-primary underline-offset-2 hover:underline hover:text-primary/80 transition-colors"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 text-foreground/40" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* External / related portals */}
        <section className="mt-10" aria-labelledby="external-heading">
          <h2 id="external-heading" className="mb-4 text-lg font-bold text-foreground">
            Related Government Portals
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "india.gov.in — National Portal of India", url: "https://india.gov.in/" },
              { label: "agricoop.nic.in — Ministry of Agriculture", url: "https://agricoop.nic.in/" },
              { label: "ux4g.gov.in — UX4G Design System", url: "https://ux4g.gov.in/" },
              { label: "PMFBY — Fasal Bima Yojana", url: "https://pmfby.gov.in/" },
            ].map((ext) => (
              <a
                key={ext.url}
                href={ext.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border bg-card p-3 text-xs text-primary hover:bg-accent transition-colors flex items-start gap-1.5"
              >
                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-foreground/40" aria-hidden />
                {ext.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
