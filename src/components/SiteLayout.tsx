import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Menu, X, Phone, MonitorSpeaker, Search } from "lucide-react";
import { useState, useRef, useEffect, useLayoutEffect, useCallback, type CSSProperties, type ReactNode } from "react";
import bambooHeroBg from "@/assets/front_page.png";
import { MegaMenuFloatingLayer } from "@/components/MegaMenuPrimitives";
import { useTranslation } from "react-i18next";
import logo from "@/assets/nbm-logo.png";
import nationalEmblem from "@/assets/national-emblem.svg";
import { GuidelinesMegaMenuPanel, GuidelinesMobileMenu } from "@/components/GuidelinesMegaMenu";
import { KnowledgeCenterMegaMenuPanel, KnowledgeCenterMobileMenu } from "@/components/KnowledgeCenterMegaMenu";
import { ReportsMegaMenuPanel, ReportsMobileMenu } from "@/components/ReportsMegaMenu";
import { NavDropdownMegaMenuPanel, NavDropdownMobileMenu } from "@/components/NavDropdownMegaMenu";
import { navItems, type MegaMenuType } from "@/data/siteNav";
import { TextSizeControls } from "@/components/TextSizeControls";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";

/* ── Screen Reader Access popover ── */
const screenReaders = [
  { name: "NVDA", platform: "Windows (Free)", url: "https://www.nvaccess.org/download/" },
  { name: "JAWS", platform: "Windows", url: "https://www.freedomscientific.com/products/software/jaws/" },
  { name: "ORCA", platform: "Linux (Free)", url: "https://help.gnome.org/users/orca/stable/" },
  { name: "VoiceOver", platform: "macOS / iOS", url: "https://www.apple.com/accessibility/vision/" },
  { name: "TalkBack", platform: "Android", url: "https://support.google.com/accessibility/android/answer/6007100" },
] as const;

function ScreenReaderPopover() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={`sr-access-wrap relative${open ? " z-[300]" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? "sr-access-panel" : undefined}
        aria-label={t("header.screenReader")}
        title={t("header.screenReader")}
        className="a11y-trigger"
      >
        <MonitorSpeaker className="h-3.5 w-3.5" aria-hidden />
      </button>
      {open && (
        <div
          id="sr-access-panel"
          className="sr-access-popover"
          role="dialog"
          aria-label={t("header.screenReader")}
        >
          <div className="sr-access-popover__title">{t("header.screenReader")}</div>
          <p className="sr-access-popover__desc">{t("header.screenReaderDesc")}</p>
          <ul className="sr-access-popover__list" role="list">
            {screenReaders.map((sr) => (
              <li key={sr.name} className="sr-access-popover__item">
                <span>
                  <span className="sr-access-popover__name">{sr.name}</span>
                  <span className="sr-access-popover__platform"> — {sr.platform}</span>
                </span>
                <a
                  href={sr.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="sr-access-popover__link"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Inline site search bar ── */
function SiteSearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      void navigate({ to: "/search", search: { q } });
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div className="relative flex shrink-0 items-center">
      {open ? (
        <form
          onSubmit={handleSubmit}
          role="search"
          aria-label="Search the site"
          className="absolute right-0 top-1/2 z-20 flex -translate-y-1/2 items-center gap-1 rounded-md border border-white/20 bg-[oklch(0.22_0.09_150)] px-1.5 py-0.5 shadow-lg"
        >
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search site…"
            aria-label="Search query"
            className="w-28 rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 sm:w-36 lg:w-40"
          />
          <button
            type="submit"
            aria-label="Submit search"
            className="shrink-0 rounded p-0.5 opacity-80 hover:opacity-100"
          >
            <Search className="h-3.5 w-3.5 text-white" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); setQuery(""); }}
            aria-label="Close search"
            className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100"
          >
            <X className="h-3.5 w-3.5 text-white" aria-hidden />
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open site search"
          className="inline-flex items-center gap-1 opacity-80 transition-opacity hover:opacity-100 hover:underline text-xs"
        >
          <Search className="h-3.5 w-3.5" aria-hidden />
          Search
        </button>
      )}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [expandedMegaMenu, setExpandedMegaMenu] = useState<MegaMenuType | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuType | null>(null);
  const megaMenuRefs = useRef<Partial<Record<MegaMenuType, HTMLLIElement | null>>>({});
  const megaMenuPanelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [menuAnchorRect, setMenuAnchorRect] = useState<DOMRect | null>(null);

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

  const syncMenuAnchorRect = useCallback(() => {
    if (!activeMegaMenu) {
      setMenuAnchorRect(null);
      return;
    }
    const trigger = megaMenuRefs.current[activeMegaMenu];
    setMenuAnchorRect(trigger ? trigger.getBoundingClientRect() : null);
  }, [activeMegaMenu]);

  useLayoutEffect(() => {
    syncMenuAnchorRect();
    if (!activeMegaMenu) return;

    const onReposition = () => syncMenuAnchorRect();
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [activeMegaMenu, syncMenuAnchorRect]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!activeMegaMenu) return;
      const target = event.target as Node;
      const trigger = megaMenuRefs.current[activeMegaMenu];
      const panel = megaMenuPanelRef.current;
      if (trigger?.contains(target) || panel?.contains(target)) return;
      setActiveMegaMenu(null);
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
    <header className="relative z-50 w-full max-w-full overflow-x-clip bg-background border-b border-border header-elevated">
      {/* Top utility strip — bamboo canopy backdrop (matches footer / page heroes) */}
      <div
        className="site-header-utility relative overflow-visible text-xs text-primary-foreground"
        style={{ "--page-hero-bg": `url(${bambooHeroBg})` } as CSSProperties}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="page-hero__photo" />
          <div className="page-hero__overlay" />
        </div>

        {/* Desktop / tablet */}
        <div className="relative z-[1] mx-auto hidden min-w-0 max-w-7xl items-center justify-between gap-3 px-4 py-1.5 sm:flex">
          <a
            href="tel:18001801551"
            className="group inline-flex min-w-0 max-w-[45%] items-center gap-2 font-semibold text-saffron transition-opacity hover:opacity-90 lg:max-w-none"
          >
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-saffron/20 ring-1 ring-saffron/45 transition-colors group-hover:bg-saffron/30">
              <Phone className="h-3 w-3" />
            </span>
            <span className="truncate">{t("header.helpline")}</span>
          </a>
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-2 gap-y-1 lg:gap-x-3">
            <a
              href="#main-content"
              className="shrink-0 opacity-80 transition-opacity hover:opacity-100 hover:underline"
            >
              {t("header.skipToContent")}
            </a>
            <span className="h-3.5 w-px bg-primary-foreground/25" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <span className="opacity-75">{t("header.textSize")}:</span>
              <TextSizeControls />
            </span>
            <span className="h-3.5 w-px bg-primary-foreground/25" aria-hidden />
            <LanguageSelector />
            <span className="h-3.5 w-px bg-primary-foreground/25" aria-hidden />
            <SiteSearchBar />
            <span className="h-3.5 w-px bg-primary-foreground/25" aria-hidden />
            <div className="inline-flex shrink-0 items-center gap-1.5">
              <ScreenReaderPopover />
              <AccessibilityWidget />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="relative z-[1] mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 sm:hidden">
          <a
            href="tel:18001801551"
            className="inline-flex items-center gap-1.5 font-semibold text-saffron shrink-0"
          >
            <Phone className="h-3 w-3" />
            {t("header.helplineShort")}
          </a>
          <div className="flex items-center gap-2.5">
            <a
              href="#main-content"
              className="shrink-0 opacity-85 hover:opacity-100 hover:underline text-[10px] leading-tight"
            >
              {t("header.skipToContent")}
            </a>
            <span className="h-3.5 w-px bg-primary-foreground/25" aria-hidden />
            <span className="inline-flex items-center gap-1 opacity-85">
              <span>{t("header.textSize")}:</span>
              <TextSizeControls />
            </span>
            <span className="h-3.5 w-px bg-primary-foreground/25" aria-hidden />
            <LanguageSelector />
            <span className="h-3.5 w-px bg-primary-foreground/25" aria-hidden />
            <div className="inline-flex shrink-0 items-center gap-1.5">
              <ScreenReaderPopover />
              <AccessibilityWidget />
            </div>
          </div>
        </div>
      </div>
      {/* Tri-color stripe */}
      <div className="h-1 bg-tri-banner" />
      {/* Brand row — GoI left, scheme right (PMFBY-style) */}
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-3 sm:gap-6">
        <Link
          to="/"
          aria-label={t("header.homeAria")}
          className="flex min-w-0 items-center gap-2 rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-4"
        >
          <img
            src={nationalEmblem}
            alt={t("header.emblemAlt")}
            className="h-8 w-auto shrink-0 object-contain sm:h-10 md:h-11"
            width={44}
            height={56}
          />
          <div className="hidden sm:block h-9 w-px shrink-0 bg-border" aria-hidden />
          <div className="min-w-0 text-[11px] sm:text-sm leading-snug">
            <div className="text-foreground" lang="hi">{t("header.brandGovtHi")}</div>
            <div className="font-semibold text-foreground">{t("header.brandGovtEn")}</div>
          </div>
          <div className="hidden md:block h-9 w-px shrink-0 bg-border" aria-hidden />
          <div className="hidden md:block min-w-0 text-xs sm:text-sm leading-snug">
            <div className="text-muted-foreground" lang="hi">{t("header.brandMinistryHi")}</div>
            <div className="font-semibold text-foreground">{t("header.brandMinistryEn")}</div>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link to="/" className="group flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <span
              className="relative shrink-0 rounded-xl bg-gradient-to-br from-accent-warm to-primary p-[2px] shadow-[0_4px_12px_-5px_oklch(0.32_0.1_150_/_0.45)] transition-transform duration-300 group-hover:scale-[1.03]"
            >
              <span className="flex items-center justify-center rounded-[10px] bg-white p-1">
                <img
                  src={logo}
                  alt={t("header.logoAlt")}
                  className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8 md:h-9 md:w-9"
                  width={56}
                  height={56}
                />
              </span>
            </span>
            <span className="min-w-0 flex flex-col justify-center">
              <span className="font-display text-[0.95rem] sm:text-lg md:text-[1.3rem] font-bold leading-[1.05] tracking-tight text-primary">
                {t("header.schemeTitle")}
              </span>
              <span className="mt-0.5 truncate text-sm font-normal tracking-[0.04em] text-accent-warm-text sm:text-[1.1rem]" lang="hi">
                {t("header.schemeTitleHi")}
              </span>
            </span>
          </Link>
          <button
            className="lg:hidden p-2 rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label={t("header.toggleMenu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className="header-divider mx-auto max-w-7xl px-4 sm:px-6" aria-hidden>
        <div className="header-divider-line" />
      </div>
      {/* Nav */}
      <nav aria-label="Main navigation" className={`site-nav ${open ? "block" : "hidden"} lg:block relative overflow-visible`}>
        <div className="site-nav-scroll mx-auto max-w-7xl lg:overflow-x-auto">
          <ul className="site-nav-list" role="list">
            {navItems.map((item) => {
              if (item.megaMenu) {
                const isExpanded = expandedMegaMenu === item.megaMenu;
                const isMegaOpen = activeMegaMenu === item.megaMenu;

                return (
                  <li
                    key={item.to}
                    ref={(el) => {
                      megaMenuRefs.current[item.megaMenu!] = el;
                    }}
                    className="relative"
                    onMouseEnter={() => openMegaMenu(item.megaMenu!)}
                    onMouseLeave={scheduleCloseMegaMenu}
                    onFocus={() => openMegaMenu(item.megaMenu!)}
                    onBlur={scheduleCloseMegaMenu}
                  >
                    <div className="flex items-stretch">
                      <Link
                        to={item.to}
                        onClick={closeMenu}
                        className={`site-nav-link${isMegaOpen ? " is-open" : ""}`}
                        inactiveProps={{ className: "is-inactive" }}
                        activeProps={{ className: "is-active" }}
                        aria-expanded={isMegaOpen}
                        aria-haspopup="true"
                      >
                        {t(item.labelKey)}
                        <span className="site-nav-chevron hidden lg:inline" aria-hidden>
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
                        aria-label={t("header.toggleMenuFor", { label: t(item.labelKey) })}
                      >
                        <span aria-hidden>{isExpanded ? "▴" : "▾"}</span>
                      </button>
                    </div>
                    {isExpanded && renderMobileMegaMenu(item.megaMenu)}
                  </li>
                );
              }
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={closeMenu}
                    className="site-nav-link"
                    inactiveProps={{ className: "is-inactive" }}
                    activeProps={{ className: "is-active" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Desktop mega menus — fixed layer outside nav scroll/overflow */}
      {activeMegaMenu && (
        <MegaMenuFloatingLayer
          open
          anchorRect={menuAnchorRect}
          anchor={navItems.find((i) => i.megaMenu === activeMegaMenu)?.menuAnchor ?? "start"}
          panelRef={megaMenuPanelRef}
          onMouseEnter={cancelCloseMegaMenu}
          onMouseLeave={scheduleCloseMegaMenu}
        >
          {renderMegaMenuPanel(
            activeMegaMenu,
            true,
            navItems.find((i) => i.megaMenu === activeMegaMenu)?.menuAnchor ?? "start",
          )}
        </MegaMenuFloatingLayer>
      )}
    </header>
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  leading,
  children,
  aside,
  panel,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: ReactNode;
  leading?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  panel?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`page-hero${className ? ` ${className}` : ""}`}
      data-hero
      style={{ "--page-hero-bg": `url(${bambooHeroBg})` } as CSSProperties}
    >
      <div className="page-hero__stripe" aria-hidden />
      <div className="page-hero__photo" aria-hidden />
      <div className="page-hero__overlay" aria-hidden />

      <div className="page-hero-inner page-hero__content">
        <div className={`page-hero__layout ${aside ? "page-hero__layout--with-aside" : ""}`}>
          <div className="page-hero__copy">
            {leading && <div className="page-hero__leading">{leading}</div>}
            {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
            <div className="page-hero__accent" aria-hidden />
            <h1 className="page-hero__title hero-heading font-display">{title}</h1>
            {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
            {children}
          </div>
          {aside && <div className="page-hero__aside">{aside}</div>}
        </div>
      </div>
      {panel && <div className="page-hero__panel">{panel}</div>}
      <div className="page-hero__fade" aria-hidden />
    </section>
  );
}

import BambooChatbot from "./BambooChatbot";
import { MitraGoldGradientDefs } from "@/components/MetricAccent";

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-clip">
      <MitraGoldGradientDefs />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none"><Outlet /></main>
      <SiteFooter />
      {/* Temporarily hidden — chatbot floating icon
      <BambooChatbot />
      */}
    </div>
  );
}
