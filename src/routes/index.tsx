import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Newspaper,
  Sprout,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Play,
  Pause,
  ExternalLink,
  FileText,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback, type RefObject } from "react";
import { QuickServicesSection } from "@/components/quick-services/QuickServicesSection";
import { MissionPillarsSection } from "@/components/mission-pillars/MissionPillarsSection";
import { ResourcesSection } from "@/components/resources/ResourcesSection";
import { OnTheGroundSection } from "@/components/home/OnTheGroundSection";
import { newsItems } from "@/data/news";
import { IMPLEMENTING_STATE_COUNT } from "@/data/bambooStateStats";
import { tagClass, attachmentCount } from "@/lib/news";
import heroImg from "@/assets/bamboo-hero.jpg";
import handicraftsMarketImg from "@/assets/bk2.png";
import weavingArtisansImg from "@/assets/bk3.png";
import processingImg from "@/assets/bamboo-processing.jpg";
import groveImg from "@/assets/bamboo-grove.jpg";
import frontPageImg from "@/assets/front_page.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "National Bamboo Mission | Government of India" },
      {
        name: "description",
        content:
          "Official portal of the National Bamboo Mission — promoting holistic growth of the bamboo sector across India.",
      },
      { property: "og:title", content: "National Bamboo Mission" },
      {
        property: "og:description",
        content:
          "Holistic development of bamboo sector — plantations, products, processing and livelihoods.",
      },
    ],
  }),
  component: HomePage,
});

/* ─────────────────────────────────────────────
   HERO CAROUSEL
───────────────────────────────────────────── */
const heroSlides = [
  {
    id: 1,
    img: heroImg,
    tag: "Restructured National Bamboo Mission",
    tagColor: "accent" as const,
    heading: "Green Gold of India — Building a Bamboo-led Bioeconomy",
    sub: "Reviving the bamboo sector through plantations, processing, value addition and market linkages — empowering farmers, artisans and entrepreneurs across India.",
    cta1: { label: "About the Mission", to: "/about" },
    cta2: { label: "Guidelines & Documents", to: "/guidelines" },
    credit: "Bamboo grove, Assam",
    overlay: "from-primary/90 via-primary/60 to-primary/20",
  },
  {
    id: 2,
    img: handicraftsMarketImg,
    tag: "Artisan Economy",
    tagColor: "accent" as const,
    heading: "From Bamboo to Handicrafts — Markets That Empower",
    sub: "Traditional bamboo markets connect artisans with buyers — woven baskets, furniture and everyday products that sustain rural households and local enterprise.",
    cta1: { label: "Value Added Products", to: "/knowledge-center" },
    cta2: { label: "Mission Overview", to: "/about" },
    credit: "Bamboo handicrafts market stall",
    overlay: "from-black/75 via-black/45 to-black/10",
  },
  {
    id: 3,
    img: weavingArtisansImg,
    tag: "Livelihoods & Skills",
    tagColor: "accent" as const,
    heading: "Weaving Livelihoods — Bamboo Skills at the Grassroots",
    sub: "Women artisans and self-help groups across India are turning bamboo strips into baskets and home products — building income, skills and sustainable rural employment.",
    cta1: { label: "View Schemes", to: "/guidelines" },
    cta2: { label: "Contact Us", to: "/contact/head-quarter" },
    credit: "Women artisans weaving bamboo baskets",
    overlay: "from-primary/85 via-primary/55 to-primary/15",
  },
  {
    id: 4,
    img: processingImg,
    tag: "Industry & Processing",
    tagColor: "accent" as const,
    heading: "Farm to Factory — India's Bamboo Value Chain",
    sub: `Modern processing units, treatment plants and product manufacturing hubs are creating skilled jobs and sustainable livelihoods across ${IMPLEMENTING_STATE_COUNT} States.`,
    cta1: { label: "Value Added Products", to: "/knowledge-center" },
    cta2: { label: "Reports", to: "/reports" },
    credit: "Bamboo processing unit, Karnataka",
    overlay: "from-primary/88 via-primary/60 to-primary/25",
  },
  {
    id: 5,
    img: frontPageImg,
    tag: "India's Bamboo Wealth",
    tagColor: "accent" as const,
    heading: "Dense Bamboo Forests — Nature's Gift to India",
    sub: "India holds one of the world's largest bamboo resources. The National Bamboo Mission harnesses this natural wealth to drive sustainable livelihoods and a green bioeconomy.",
    cta1: { label: "About the Mission", to: "/about" },
    cta2: { label: "Knowledge Centre", to: "/knowledge-center" },
    credit: "Bamboo forest, India",
    overlay: "from-primary/85 via-primary/50 to-primary/10",
  },
];

const SLIDE_DURATION = 5000;

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [animDir, setAnimDir] = useState<"next" | "prev">("next");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = heroSlides.length;

  const goTo = useCallback(
    (idx: number, dir: "next" | "prev" = "next") => {
      setAnimDir(dir);
      setCurrent((idx + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1, "next"), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, "prev"), [current, goTo]);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(() => next(), SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, playing, next]);

  const slide = heroSlides[current];
  void animDir;

  return (
    <section className="relative isolate overflow-hidden h-[64vh] min-h-[460px] max-h-[740px]" data-hero>
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          aria-hidden={i !== current}
        >
          <img
            src={s.img}
            alt={s.credit}
            className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-linear ${i === current ? "scale-110" : "scale-100"}`}
            width={1920}
            height={1080}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ))}

      {/* Tri-colour top bar */}
      <div className="absolute top-0 inset-x-0 z-30 h-1 bg-tri-banner opacity-90" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 h-full flex flex-col justify-center">
        <div
          key={current}
          className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
        >
          <span className="hero-eyebrow inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded">
            {slide.tag}
          </span>

          <h1 className="hero-heading mt-2 text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-display text-white leading-tight drop-shadow-lg">
            {slide.heading}
          </h1>

          <p className="mt-2 text-xs sm:text-sm lg:text-base text-white/90 max-w-xl leading-relaxed drop-shadow">
            {slide.sub}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
            <Link to={slide.cta1.to} className="btn-gold text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-2.5">
              {slide.cta1.label} <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
            <Link to={slide.cta2.to} className="btn-ghost-green text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-2.5">
              {slide.cta2.label}
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-80" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide counter + photo credit */}
      <div className="absolute bottom-16 right-4 sm:right-8 z-20 text-right select-none">
        <p className="text-white/50 text-xs">{slide.credit}</p>
        <p className="text-white/70 text-xs font-semibold mt-0.5">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => {
          prev();
          setPlaying(false);
        }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 border border-white/30 text-white backdrop-blur-sm hover:bg-white/30 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => {
          next();
          setPlaying(false);
        }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 border border-white/30 text-white backdrop-blur-sm hover:bg-white/30 transition"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>

      {/* Bottom controls: dots + play/pause */}
      <div className="absolute bottom-5 inset-x-0 z-30 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                goTo(i, i > current ? "next" : "prev");
                setPlaying(false);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === current ? 40 : 16, background: "rgba(255,255,255,0.3)" }}
            >
              {i === current && playing && (
                <span
                  className="absolute inset-y-0 left-0 bg-saffron rounded-full"
                  style={{ animation: `progress-bar ${SLIDE_DURATION}ms linear forwards` }}
                />
              )}
              {i === current && !playing && (
                <span className="absolute inset-0 bg-saffron rounded-full" />
              )}
            </button>
          ))}
          <button
            onClick={() => setPlaying((v) => !v)}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/35 transition"
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            aria-live="polite"
          >
            {playing ? <Pause className="h-3 w-3 fill-white" /> : <Play className="h-3 w-3 fill-white" />}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
function useReveal<T extends HTMLElement = HTMLElement>(): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

/* ─────────────────────────────────────────────
   AUTO-SCROLL NEWS
───────────────────────────────────────────── */
function AutoScrollNews() {
  const [paused, setPaused] = useState(false);
  const doubled = [...newsItems, ...newsItems];
  /** ~4s per item — readable pace for 51 items */
  const scrollDurationSec = newsItems.length * 4;

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "376px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="news-scroll-inner"
        style={{
          animationPlayState: paused ? "paused" : "running",
          animationDuration: `${scrollDurationSec}s`,
        }}
      >
        {doubled.map((n, idx) => (
          <div
            key={`${n.id}-${idx}`}
            className="news-item-accent px-4 py-3.5 border-b border-border/60 group"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Calendar className="h-3 w-3 text-primary/60 shrink-0" />
              <span className="text-xs text-muted-foreground">{n.date}</span>
              <span
                className={`ml-auto text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${tagClass(n.tag)}`}
              >
                {n.tag}
              </span>
            </div>
            <Link
              to="/news/$newsId"
              params={{ newsId: n.id }}
              className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug block pl-1"
            >
              {n.title}
            </Link>
            {attachmentCount(n) > 0 && (
              <p className="mt-1 pl-1 text-[10px] text-muted-foreground flex items-center gap-1">
                <FileText className="h-3 w-3 text-red-700/80" aria-hidden />
                {attachmentCount(n) === 1 ? "PDF / document attached" : `${attachmentCount(n)} documents`}
              </p>
            )}
          </div>
        ))}
      </div>
      {/* Fade overlay */}
      <div
        className="absolute bottom-0 inset-x-0 h-14 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(1 0 0), oklch(1 0 0 / 0))",
        }}
      />
      {/* Hover hint */}
      {paused && (
        <div className="absolute top-2 right-3 text-[10px] text-muted-foreground bg-background/80 px-2 py-0.5 rounded-full border border-border backdrop-blur-sm">
          Paused
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOMEPAGE
───────────────────────────────────────────── */
function HomePage() {
  const quickServicesReveal = useReveal<HTMLElement>();
  const aboutReveal = useReveal<HTMLElement>();
  const pillarsReveal = useReveal<HTMLElement>();
  const groundReveal = useReveal<HTMLElement>();
  const resourcesReveal = useReveal<HTMLElement>();

  return (
    <>
      <HeroCarousel />

      {/* ── Ticker ── */}
      <div className="ticker-bar overflow-hidden border-y ticker-wrapper">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-4 text-sm">
          <span className="font-bold whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-warm-foreground/15 text-xs">📢</span>
            What's New:
          </span>
          <div className="overflow-hidden flex-1 cursor-default select-none">
            <div className="marquee">
              <span className="mr-12">
                Application portal open for 2026-27 bamboo plantation subsidy — apply by 31 July 2026.
              </span>
              <span className="mr-12">
                Empanelment of Tissue Culture Labs — last date extended to 15 July 2026.
              </span>
              <span className="mr-12">
                Bamboo Artisan Mela at Pragati Maidan, 22-26 August 2026.
              </span>
              <span className="mr-12">
                Application portal open for 2026-27 bamboo plantation subsidy — apply by 31 July 2026.
              </span>
              <span className="mr-12">
                Empanelment of Tissue Culture Labs — last date extended to 15 July 2026.
              </span>
              <span className="mr-12">
                Bamboo Artisan Mela at Pragati Maidan, 22-26 August 2026.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Temporarily hidden — Quick Services section
      <QuickServicesSection
        sectionRef={quickServicesReveal.ref}
        revealClass={`reveal ${quickServicesReveal.inView ? "in-view" : ""}`}
      />
      */}

      {/* ── About + Auto-scroll News ── */}
      <section
        ref={aboutReveal.ref}
        className={`section-mint bamboo-watermark-bg reveal ${aboutReveal.inView ? "in-view" : ""}`}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-8 lg:grid-cols-3">
        {/* About */}
        <div className="lg:col-span-2">
          <div className="section-heading-accent mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-primary font-display">About Us</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 items-start">
            <div className="relative overflow-hidden rounded-2xl shadow-card card-hover">
              <img
                src={groveImg}
                alt="Bamboo grove"
                className="w-full h-52 object-cover transition-transform duration-700 hover:scale-105"
                width={1024}
                height={768}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
            </div>
            <div className="space-y-3">
              <p className="text-sm text-foreground/90 leading-relaxed">
                The <strong>National Bamboo Mission (NBM)</strong> was launched as a Centrally
                Sponsored Scheme during 2018-19, restructured from the earlier mission, with focus
                on the development of complete value chain of the bamboo sector. It aims at linking
                growers with consumers — starting from a cluster-based approach — by connecting farm
                to industry.
              </p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                The Mission is being implemented in <strong>{IMPLEMENTING_STATE_COUNT} States</strong> through
                dedicated State Bamboo Missions, with thrust on the North-Eastern region — the
                natural home of Indian bamboo.
              </p>
              <Link
                to="/about"
                className="btn-outline-primary mt-2"
              >
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* What's New sidebar */}
        <aside className="bg-card border border-border rounded-2xl shadow-card overflow-hidden flex flex-col card-hover">
          <div className="bg-primary text-primary-foreground px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Newspaper className="h-4 w-4" /> What's New
            </div>
            <span className="text-[10px] bg-primary-foreground/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Latest
            </span>
          </div>
          <AutoScrollNews />
          <div className="border-t border-border px-4 py-3 text-right shrink-0 bg-secondary/50">
            <Link
              to="/news"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              View All Updates <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </aside>
        </div>
      </section>

      <div className="home-pillars-ground relative">
        <MissionPillarsSection
          sectionRef={pillarsReveal.ref}
          revealClass={`reveal ${pillarsReveal.inView ? "in-view" : ""}`}
        />

        <OnTheGroundSection
          sectionRef={groundReveal.ref}
          revealClass={`reveal ${groundReveal.inView ? "in-view" : ""}`}
        />
      </div>

      {/* Temporarily hidden — Other Links / Resources section
      <ResourcesSection
        sectionRef={resourcesReveal.ref}
        revealClass={`reveal ${resourcesReveal.inView ? "in-view" : ""}`}
      />
      */}

      {/* Removed from homepage — Farmer CTA section
      <FarmerCtaSection />
      */}
    </>
  );
}
