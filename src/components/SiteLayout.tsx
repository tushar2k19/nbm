import { Link, Outlet } from "@tanstack/react-router";
import { Menu, X, Phone, Mail, MapPin, Twitter, Youtube, Facebook, Linkedin } from "lucide-react";
import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import logo from "@/assets/nbm-logo.png";
import digitalIndiaLogo from "@/assets/dig_ind.jpeg";
import nationalEmblem from "@/assets/national-emblem.svg";
import { GuidelinesMegaMenuPanel, GuidelinesMobileMenu } from "@/components/GuidelinesMegaMenu";
import { KnowledgeCenterMegaMenuPanel, KnowledgeCenterMobileMenu } from "@/components/KnowledgeCenterMegaMenu";
import { ReportsMegaMenuPanel, ReportsMobileMenu } from "@/components/ReportsMegaMenu";
import { NavDropdownMegaMenuPanel, NavDropdownMobileMenu } from "@/components/NavDropdownMegaMenu";
import type { NavMegaMenuId } from "@/data/navMegaMenus";
import { navMegaMenus } from "@/data/navMegaMenus";

type MegaMenuType = "guidelines" | "knowledge-center" | "reports" | NavMegaMenuId;

type NavItem = {
  to: string;
  label: string;
  megaMenu?: MegaMenuType;
  /** Right-align popup for items near the end of the nav bar */
  menuAnchor?: "start" | "end";
};

const navItems: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About NBM" },
  { to: "/guidelines", label: "Guidelines & Documents", megaMenu: "guidelines" },
  { to: "/gallery", label: "Gallery" },
  { to: "/knowledge-center", label: "Knowledge Center", megaMenu: "knowledge-center" },
  { to: "/reports", label: "Reports", megaMenu: "reports" },
  { to: "/tenders-vacancies", label: "Tenders / Vacancies" },
  { to: "/dashboard", label: "Dashboard", megaMenu: "dashboard", menuAnchor: "end" },
  { to: "/login", label: "Login", megaMenu: "login", menuAnchor: "end" },
  { to: "/contact/head-quarter", label: "Contact", megaMenu: "contact", menuAnchor: "end" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expandedMegaMenu, setExpandedMegaMenu] = useState<MegaMenuType | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuType | null>(null);
  const megaMenuRefs = useRef<Partial<Record<MegaMenuType, HTMLLIElement | null>>>({});
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setExpandedMegaMenu(null);
    setActiveMegaMenu(null);
  }, []);

  const openMegaMenu = useCallback((type: MegaMenuType) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMegaMenu(type);
  }, []);

  const scheduleCloseMegaMenu = useCallback(() => {
    const closing = activeMegaMenu;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setActiveMegaMenu((current) => (current === closing ? null : current));
    }, 150);
  }, [activeMegaMenu]);

  const cancelCloseMegaMenu = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!activeMegaMenu) return;
      const container = megaMenuRefs.current[activeMegaMenu];
      if (container && !container.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveMegaMenu(null);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMegaMenu]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function renderMegaMenuPanel(type: MegaMenuType, open: boolean, anchor: "start" | "end") {
    switch (type) {
      case "guidelines":
        return <GuidelinesMegaMenuPanel open={open} onNavigate={closeMenu} />;
      case "knowledge-center":
        return <KnowledgeCenterMegaMenuPanel open={open} onNavigate={closeMenu} />;
      case "reports":
        return <ReportsMegaMenuPanel open={open} onNavigate={closeMenu} />;
      case "dashboard":
      case "login":
      case "contact":
        return (
          <NavDropdownMegaMenuPanel
            menuId={type}
            open={open}
            onNavigate={closeMenu}
            anchor={anchor}
          />
        );
    }
  }

  function renderMobileMegaMenu(type: MegaMenuType) {
    switch (type) {
      case "guidelines":
        return <GuidelinesMobileMenu onNavigate={closeMenu} />;
      case "knowledge-center":
        return <KnowledgeCenterMobileMenu onNavigate={closeMenu} />;
      case "reports":
        return <ReportsMobileMenu onNavigate={closeMenu} />;
      case "dashboard":
      case "login":
      case "contact":
        return <NavDropdownMobileMenu menuId={type} onNavigate={closeMenu} />;
    }
  }

  return (
    <header className="relative z-50 bg-background border-b border-border shadow-soft">
      {/* Top strip */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="mx-auto max-w-7xl px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <span className="font-medium tracking-wide">
            भारत सरकार | Government of India &nbsp;·&nbsp; Ministry of Agriculture &amp; Farmers Welfare
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1.5 opacity-80">
              <Phone className="h-3 w-3" />
              Helpline: 1800-180-1551
            </span>
            <span className="opacity-40">|</span>
            <a href="#main-content" className="hover:underline opacity-80">Skip to Main Content</a>
            <span className="opacity-40">|</span>
            <span className="opacity-80">
              <button className="hover:underline mr-1" aria-label="Decrease font size">A-</button>
              <button className="font-semibold hover:underline mr-1" aria-label="Normal font size">A</button>
              <button className="text-sm font-semibold hover:underline" aria-label="Increase font size">A+</button>
            </span>
          </div>
        </div>
      </div>
      {/* Tri-color stripe */}
      <div className="h-1 bg-tri-banner" />
      {/* Brand row — GoI left, scheme right (PMFBY-style) */}
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <img
            src={nationalEmblem}
            alt="National Emblem of India — Satyameva Jayate"
            className="h-9 w-auto shrink-0 object-contain sm:h-12 md:h-14"
            width={44}
            height={56}
          />
          <div className="hidden sm:block h-10 w-px shrink-0 bg-border" aria-hidden />
          <div className="min-w-0 text-[11px] sm:text-sm leading-snug">
            <div className="font-medium text-foreground">भारत सरकार</div>
            <div className="text-muted-foreground">Government of India</div>
          </div>
          <div className="hidden md:block h-10 w-px shrink-0 bg-border" aria-hidden />
          <div className="hidden md:block min-w-0 text-xs sm:text-sm leading-snug text-muted-foreground">
            <div>कृषि एवं किसान कल्याण मंत्रालय</div>
            <div>Ministry of Agriculture and Farmers Welfare</div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link to="/" className="flex items-center gap-2 sm:gap-4 min-w-0">
            <img
              src={logo}
              alt="National Bamboo Mission emblem"
              className="h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12 md:h-14 md:w-14"
              width={56}
              height={56}
            />
            <div className="hidden sm:block h-10 w-px shrink-0 bg-border" aria-hidden />
            <div className="min-w-0">
              <div className="font-display text-sm sm:text-lg md:text-xl font-bold text-foreground leading-tight">
                National Bamboo Mission
              </div>
              <div className="hidden sm:block text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
                Ministry of Agriculture &amp; Farmers Welfare
              </div>
              <div className="sm:hidden text-[10px] text-muted-foreground truncate">राष्ट्रीय बांस मिशन</div>
            </div>
          </Link>
          <button
            className="lg:hidden p-2 rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {/* Nav */}
      <nav className={`${open ? "block" : "hidden"} lg:block border-t border-border bg-secondary relative`}>
        <ul className="mx-auto max-w-7xl px-2 flex flex-col lg:flex-row lg:flex-nowrap">
          {navItems.map((item) => {
            if (item.megaMenu) {
              const isExpanded = expandedMegaMenu === item.megaMenu;
              const isMegaOpen = activeMegaMenu === item.megaMenu;
              const anchor = item.menuAnchor ?? "start";

              return (
                <li
                  key={item.to}
                  ref={(el) => {
                    megaMenuRefs.current[item.megaMenu!] = el;
                  }}
                  className="relative"
                  onMouseEnter={() => openMegaMenu(item.megaMenu!)}
                  onMouseLeave={scheduleCloseMegaMenu}
                >
                  <div className="flex items-stretch lg:inline-flex">
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      className={`flex-1 lg:flex-none flex items-center gap-1 px-4 py-3 text-sm lg:text-[13.5px] font-medium transition-colors ${
                        isMegaOpen
                          ? "bg-primary text-primary-foreground"
                          : "text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                      activeProps={{
                        className:
                          "flex-1 lg:flex-none flex items-center gap-1 px-4 py-3 text-sm lg:text-[13.5px] font-semibold bg-primary text-primary-foreground",
                      }}
                    >
                      {item.label}
                      <span className="hidden lg:inline text-xs opacity-80" aria-hidden>
                        ▾
                      </span>
                    </Link>
                    <button
                      type="button"
                      className="lg:hidden px-3 py-3 text-secondary-foreground hover:bg-primary hover:text-primary-foreground border-l border-border/60"
                      onClick={() =>
                        setExpandedMegaMenu((v) => (v === item.megaMenu ? null : item.megaMenu!))
                      }
                      aria-expanded={isExpanded}
                      aria-label={`Toggle ${item.label} menu`}
                    >
                      <span aria-hidden>{isExpanded ? "▴" : "▾"}</span>
                    </button>
                  </div>
                  {isExpanded && renderMobileMegaMenu(item.megaMenu)}
                  <div onMouseEnter={cancelCloseMegaMenu} onMouseLeave={scheduleCloseMegaMenu}>
                    {renderMegaMenuPanel(item.megaMenu, isMegaOpen, anchor)}
                  </div>
                </li>
              );
            }
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={closeMenu}
                  className="block px-4 py-3 text-sm lg:text-[13.5px] font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  activeProps={{ className: "block px-4 py-3 text-sm lg:text-[13.5px] font-semibold bg-primary text-primary-foreground" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="h-1 bg-tri-banner" />

      {/* Social + Connect row */}
      <div className="border-b border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-60 mb-1 footer-eyebrow">Connect With Us</p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, label: "Twitter/X", href: "https://twitter.com" },
                { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-saffron hover:border-saffron transition-colors"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest opacity-60 mb-1 footer-eyebrow">Helpline</p>
            <a
              href="tel:18001801551"
              className="text-lg font-bold font-display hover:text-saffron transition-colors flex items-center gap-2 justify-end"
            >
              <Phone className="h-4 w-4" />
              1800-180-1551
            </a>
            <p className="text-xs opacity-60 mt-0.5">Mon–Fri, 9 AM – 6 PM IST</p>
          </div>
        </div>
      </div>

      {/* Main footer grid — Digital India in cols 3–4, parallel to lower Quick Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:items-start">
          {/* Brand */}
          <div>
            <div className="font-display footer-title text-base font-bold mb-2 leading-snug">
              National Bamboo Mission
            </div>
            <p className="text-xs opacity-80 leading-relaxed">
              A centrally sponsored scheme promoting the holistic growth of the bamboo sector in India
              through area-based, regionally differentiated strategy.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs opacity-60">Ministry of Agriculture &amp; Farmers Welfare</span>
            </div>
          </div>

          {/* Quick Links — spans 2 rows on desktop so Digital India sits beside lower links */}
          <div className="md:row-span-2">
            <div className="footer-title font-display text-sm font-bold mb-3 pb-2 border-b border-primary-foreground/20">
              Quick Links
            </div>
            <ul className="space-y-1.5 text-xs opacity-85">
              {navItems.slice(1).flatMap((i) => {
                if (i.megaMenu && i.megaMenu in navMegaMenus) {
                  return navMegaMenus[i.megaMenu as NavMegaMenuId].items.map((c) => (
                    <li key={`${c.to}#${c.hash ?? ""}`}>
                      <Link to={c.to} hash={c.hash} className="hover:text-saffron transition-colors">
                        {c.label}
                      </Link>
                    </li>
                  ));
                }
                return [
                  <li key={i.to}>
                    <Link to={i.to} className="hover:text-saffron transition-colors">
                      {i.label}
                    </Link>
                  </li>,
                ];
              })}
            </ul>
          </div>

          {/* Related Sites */}
          <div>
            <div className="footer-title font-display text-sm font-bold mb-3 pb-2 border-b border-primary-foreground/20">
              Related Sites
            </div>
            <ul className="space-y-1.5 text-xs opacity-85">
              {[
                { href: "https://midh.gov.in", label: "MIDH" },
                { href: "https://agricoop.gov.in", label: "Department of Agriculture" },
                { href: "https://india.gov.in", label: "India.gov.in" },
                { href: "https://mygov.in", label: "MyGov" },
                { href: "https://pmfby.gov.in", label: "PM Fasal Bima Yojana" },
              ].map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-saffron transition-colors inline-flex items-center gap-1"
                  >
                    {s.label}
                    <span className="opacity-40 text-[9px]">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Us */}
          <div>
            <div className="footer-title font-display text-sm font-bold mb-3 pb-2 border-b border-primary-foreground/20">
              Reach Us
            </div>
            <ul className="space-y-3 text-xs opacity-85">
              <li className="flex gap-2 leading-relaxed">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-saffron" />
                Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi – 110001
              </li>
              <li>
                <a href="tel:+911123382651" className="flex gap-2 hover:text-saffron transition-colors">
                  <Phone className="h-3.5 w-3.5 mt-0.5 shrink-0 text-saffron" />
                  +91-11-2338-2651
                </a>
              </li>
              <li>
                <a
                  href="mailto:nbm-agri@gov.in"
                  className="flex gap-2 hover:text-saffron transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 mt-0.5 shrink-0 text-saffron" />
                  nbm-agri@gov.in
                </a>
              </li>
            </ul>

            <div className="mt-5 pt-3 border-t border-primary-foreground/20">
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] opacity-70">
                <a href="#" className="hover:text-saffron transition-colors">Privacy Policy</a>
                <span className="opacity-40">·</span>
                <a href="#" className="hover:text-saffron transition-colors">Disclaimer</a>
                <span className="opacity-40">·</span>
                <a href="#" className="hover:text-saffron transition-colors">Accessibility</a>
              </div>
            </div>
          </div>

          {/* Digital India — below Related Sites & Reach Us, parallel to lower Quick Links */}
          <div className="sm:col-span-2 md:col-span-2 md:col-start-3 md:row-start-2 flex justify-start md:justify-end items-end">
            <img
              src={digitalIndiaLogo}
              alt="Digital India — Power To Empower"
              className="h-10 w-auto object-contain sm:h-12 bg-white/95 rounded px-2 py-1"
              width={140}
              height={48}
            />
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-primary-foreground/20 bg-primary-foreground/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 text-[11px] flex flex-wrap justify-between gap-2 opacity-75">
          <span>© {year} National Bamboo Mission, Ministry of Agriculture &amp; Farmers Welfare, Government of India. All rights reserved.</span>
          <span>Last updated: {lastUpdated}</span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="bg-gradient-hero text-primary-foreground" data-hero>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <nav className="text-xs opacity-80 mb-3">Home / {title}</nav>
        <h1 className="hero-heading font-display text-3xl sm:text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 max-w-3xl opacity-90">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

import BambooChatbot from "./BambooChatbot";

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1"><Outlet /></main>
      <SiteFooter />
      <BambooChatbot />
    </div>
  );
}
