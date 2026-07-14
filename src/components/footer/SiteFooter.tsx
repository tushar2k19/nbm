import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CSSProperties } from "react";
import bambooHeroBg from "@/assets/front_page.png";
import logo from "@/assets/nbm-logo.png";
import { navItems } from "@/data/siteNav";
import { navMegaMenus } from "@/data/navMegaMenus";
import type { NavMegaMenuId } from "@/data/navMegaMenus";
import { FooterKpiCard } from "./FooterKpiCard";
import { FooterSocial } from "./FooterSocial";
import { FooterGovBadges } from "./FooterGovBadges";

const relatedSites = [
  { href: "https://midh.gov.in", label: "MIDH" },
  { href: "https://agricoop.gov.in", label: "Department of Agriculture" },
  { href: "https://india.gov.in", label: "India.gov.in" },
  { href: "https://mygov.in", label: "MyGov" },
  { href: "https://pmfby.gov.in", label: "PM Fasal Bima Yojana" },
] as const;

function FooterQuickLinks() {
  const { t } = useTranslation();

  const links = navItems.slice(1).flatMap((item) => {
    if (item.megaMenu && item.megaMenu in navMegaMenus) {
      return navMegaMenus[item.megaMenu as NavMegaMenuId].items.map((c) => ({
        key: `${c.to}#${c.hash ?? ""}`,
        to: c.to,
        hash: c.hash,
        label: c.label,
      }));
    }
    return [{ key: item.to, to: item.to, hash: undefined, label: t(item.labelKey) }];
  });

  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-xs sm:grid-cols-2">
      {links.map((link) => (
        <li key={link.key}>
          <Link to={link.to} hash={link.hash} className="footer-link">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer
      className="site-footer text-primary-foreground"
      style={{ "--page-hero-bg": `url(${bambooHeroBg})` } as CSSProperties}
    >
      <div className="page-hero__stripe" aria-hidden />
      <div className="page-hero__photo" aria-hidden />
      <div className="page-hero__overlay" aria-hidden />

      <div className="site-footer-inner border-b border-white/10">
        <div className="footer-top-bar">
          <FooterSocial />
          <div className="footer-top-bar__kpis">
            <FooterKpiCard
              label={t("footer.helpline")}
              value="1800-180-1551"
              sub={t("footer.helplineHours")}
              icon={Phone}
              href="tel:18001801551"
            />
          </div>
        </div>
      </div>

      <div className="site-footer-inner mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-start gap-3">
              <img
                src={logo}
                alt={t("header.logoAlt")}
                className="footer-brand-logo h-12 w-12 shrink-0 rounded-xl object-contain p-1"
                width={48}
                height={48}
              />
              <div>
                <h2 className="footer-title font-display text-base font-bold leading-snug">
                  {t("footer.brandTitle")}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-white/75">{t("footer.brandDesc")}</p>
              </div>
            </div>
            <p className="footer-ministry-badge">
              <span className="footer-ministry-badge__text">{t("footer.ministry")}</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h3 className="footer-col-heading footer-title">{t("footer.quickLinks")}</h3>
            <FooterQuickLinks />
          </div>

          {/* Related + Reach */}
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-4 md:grid-cols-1 lg:grid-cols-2">
            <div>
              <h3 className="footer-col-heading footer-title">{t("footer.relatedSites")}</h3>
              <ul className="space-y-2 text-xs">
                {relatedSites.map((site) => (
                  <li key={site.href}>
                    <a
                      href={site.href}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-link"
                    >
                      {site.label}
                      <span className="text-[9px] opacity-40" aria-hidden>
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="footer-col-heading footer-title">{t("footer.reachUs")}</h3>
              <ul className="space-y-3 text-xs">
                <li className="flex gap-2.5 leading-relaxed">
                  <span className="footer-reach-icon">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="text-white/80">{t("footer.address")}</span>
                </li>
                <li>
                  <a href="tel:+911123382651" className="footer-link flex gap-2.5">
                    <span className="footer-reach-icon">
                      <Phone className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    +91-11-2338-2651
                  </a>
                </li>
                <li>
                  <a href="mailto:nbm-agri@gov.in" className="footer-link flex gap-2.5">
                    <span className="footer-reach-icon">
                      <Mail className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    nbm-agri@gov.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex min-w-0 flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Legal and mandatory links" className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/75">
            <Link to="/privacy-policy" className="footer-link opacity-100 hover:text-amber">
              {t("footer.privacy")}
            </Link>
            <span className="opacity-30" aria-hidden>·</span>
            <Link to="/disclaimer" className="footer-link opacity-100 hover:text-amber">
              {t("footer.disclaimer")}
            </Link>
            <span className="opacity-30" aria-hidden>·</span>
            <Link to="/accessibility" className="footer-link opacity-100 hover:text-amber">
              {t("footer.accessibility")}
            </Link>
            <span className="opacity-30" aria-hidden>·</span>
            <Link to="/sitemap" className="footer-link opacity-100 hover:text-amber">
              {t("footer.sitemap")}
            </Link>
            <span className="opacity-30" aria-hidden>·</span>
            <Link to="/feedback" className="footer-link opacity-100 hover:text-amber">
              {t("footer.feedback")}
            </Link>
            <span className="opacity-30" aria-hidden>·</span>
            <Link to="/help" className="footer-link opacity-100 hover:text-amber">
              {t("footer.help")}
            </Link>
          </nav>
          <FooterGovBadges />
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="site-footer-inner mx-auto flex max-w-7xl min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 text-[11px] text-white/75 sm:px-6">
          <p className="min-w-0 text-white/80 font-medium text-[11px]">
            {t("footer.ownershipStatement")}
          </p>
          <span className="shrink-0 text-white/60">{t("footer.lastUpdated", { date: "July 2026" })}</span>
        </div>
      </div>
    </footer>
  );
}
