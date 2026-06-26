import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  FileText,
  Newspaper,
  Sprout,
  Factory,
  GraduationCap,
  IndianRupee,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Play,
  Pause,
  Leaf,
  Map,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback, type RefObject } from "react";
import { newsItems } from "@/data/news";
import { IMPLEMENTING_STATE_COUNT } from "@/data/bambooStateStats";
import { tagClass } from "@/lib/news";
import heroImg from "@/assets/bamboo-hero.jpg";
import modiImg1 from "@/assets/bamboo_modi.jpeg";
import modiImg2 from "@/assets/banboo_modi2.jpeg";
import processingImg from "@/assets/bamboo-processing.jpg";
import cultivationImg from "@/assets/bamboo-cultivation.jpg";
import groveImg from "@/assets/bamboo-grove.jpg";
import farmerImg from "@/assets/bamboo-farmer.jpg";
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
    tagColor: "saffron" as const,
    heading: "Green Gold of India — Building a Bamboo-led Bioeconomy",
    sub: "Reviving the bamboo sector through plantations, processing, value addition and market linkages — empowering farmers, artisans and entrepreneurs across India.",
    cta1: { label: "About the Mission", to: "/about" },
    cta2: { label: "Guidelines & Documents", to: "/guidelines" },
    credit: "Bamboo grove, Assam",
    overlay: "from-primary/90 via-primary/60 to-primary/20",
  },
  {
    id: 2,
    img: modiImg1,
    tag: "Prime Minister's Vision",
    tagColor: "white" as const,
    heading: "Bamboo to Business — Empowering Rural India",
    sub: "Hon'ble Prime Minister highlights bamboo as a transformative crop for rural livelihoods and India's green economy on Mann Ki Baat.",
    cta1: { label: "Mission Overview", to: "/about" },
    cta2: { label: "Farmer Benefits", to: "/guidelines" },
    credit: "PM Mann Ki Baat — Bamboo to Business",
    overlay: "from-black/80 via-black/50 to-black/10",
  },
  {
    id: 3,
    img: modiImg2,
    tag: "National Leadership",
    tagColor: "saffron" as const,
    heading: "India's Bamboo Revolution — Growing from the Grassroots",
    sub: "Under the National Bamboo Mission, India is transforming bamboo into a pillar of rural prosperity, sustainable development and green infrastructure.",
    cta1: { label: "View Schemes", to: "/guidelines" },
    cta2: { label: "Contact Us", to: "/contact/head-quarter" },
    credit: "Prime Minister with bamboo",
    overlay: "from-primary/85 via-primary/55 to-primary/15",
  },
  {
    id: 4,
    img: processingImg,
    tag: "Industry & Processing",
    tagColor: "saffron" as const,
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
    tagColor: "saffron" as const,
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
      <div className="absolute top-0 inset-x-0 z-30 h-1 bg-gradient-to-r from-saffron via-white to-primary opacity-90" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 h-full flex flex-col justify-center">
        <div
          key={current}
          className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both"
        >
          <span
            className={`hero-eyebrow inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded ${
              slide.tagColor === "saffron"
                ? "bg-saffron text-saffron-foreground"
                : "bg-white/20 text-white backdrop-blur-sm border border-white/30"
            }`}
          >
            {slide.tag}
          </span>

          <h1 className="hero-heading mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight drop-shadow-lg">
            {slide.heading}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl leading-relaxed drop-shadow">
            {slide.sub}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={slide.cta1.to}
              className="inline-flex items-center gap-2 bg-saffron text-saffron-foreground px-5 py-2.5 rounded font-semibold text-sm hover:brightness-110 transition shadow-lg"
            >
              {slide.cta1.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={slide.cta2.to}
              className="inline-flex items-center gap-2 bg-white/15 text-white border border-white/40 backdrop-blur-sm px-5 py-2.5 rounded font-semibold text-sm hover:bg-white/25 transition"
            >
              {slide.cta2.label}
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
            className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/35 transition"
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          >
            {playing ? <Pause className="h-2.5 w-2.5 fill-white" /> : <Play className="h-2.5 w-2.5 fill-white" />}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const stats = [
  {
    v: "13.96 mn ha",
    l: "Bamboo bearing area",
    icon: Leaf,
    accent: "oklch(0.52 0.15 145)",
  },
  {
    v: `${IMPLEMENTING_STATE_COUNT} States`,
    l: "Implementing NBM",
    icon: Map,
    accent: "oklch(0.48 0.2 250)",
  },
  {
    v: "1,200+",
    l: "Nurseries established",
    icon: Sprout,
    accent: "oklch(0.52 0.15 155)",
  },
  {
    v: "₹1,290 Cr",
    l: "Funds released (since 2018-19)",
    icon: IndianRupee,
    accent: "oklch(0.62 0.16 65)",
  },
];

const pillars = [
  {
    icon: Sprout,
    t: "Plantation Development",
    d: "Block, bund & farm-level plantations on government and private land.",
    accent: "oklch(0.52 0.15 145)",
    lightBg: "oklch(0.52 0.15 145 / 0.1)",
  },
  {
    icon: Factory,
    t: "Product Development",
    d: "Setting up of primary processing, treatment & product manufacturing units.",
    accent: "oklch(0.48 0.2 250)",
    lightBg: "oklch(0.48 0.2 250 / 0.1)",
  },
  {
    icon: GraduationCap,
    t: "Skilling & Capacity",
    d: "Training of artisans, entrepreneurs and field functionaries.",
    accent: "oklch(0.62 0.16 65)",
    lightBg: "oklch(0.62 0.16 65 / 0.1)",
  },
  {
    icon: IndianRupee,
    t: "Market Linkages",
    d: "Retail outlets, e-marketing platforms and brand promotion.",
    accent: "oklch(0.45 0.2 290)",
    lightBg: "oklch(0.45 0.2 290 / 0.1)",
  },
];

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useReveal<T extends HTMLElement = HTMLElement>(): { ref: RefObject<T>; inView: boolean } {
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

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "376px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="news-scroll-inner"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {doubled.map((n, idx) => (
          <div
            key={`${n.id}-${idx}`}
            className="px-4 py-3 border-b border-border hover:bg-secondary/70 transition-colors group"
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-3 w-3 text-muted-foreground shrink-0" />
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
              className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug block"
            >
              {n.title}
            </Link>
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
  const aboutReveal = useReveal<HTMLElement>();
  const statsReveal = useReveal<HTMLElement>();
  const pillarsReveal = useReveal<HTMLElement>();
  const groundReveal = useReveal<HTMLElement>();

  return (
    <>
      <HeroCarousel />

      {/* ── Ticker ── */}
      <div className="bg-saffron text-saffron-foreground overflow-hidden border-y border-saffron/30 ticker-wrapper">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-4 text-sm">
          <span className="font-bold whitespace-nowrap shrink-0">📢 What's New:</span>
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

      {/* ── About + Auto-scroll News ── */}
      <section
        ref={aboutReveal.ref}
        className={`mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 lg:grid-cols-3 reveal ${aboutReveal.inView ? "in-view" : ""}`}
      >
        {/* About */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-7 w-1 rounded-full bg-saffron" />
            <h2 className="text-xl font-bold text-primary font-display">About Us</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 items-start">
            <img
              src={groveImg}
              alt="Bamboo grove"
              className="rounded-xl shadow-card w-full h-48 object-cover"
              width={1024}
              height={768}
              loading="lazy"
            />
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
                className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mt-1"
              >
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Auto-scrolling News */}
        <aside className="bg-card border border-border rounded-xl shadow-soft overflow-hidden flex flex-col">
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Newspaper className="h-4 w-4" /> News & Press Releases
            </div>
            <span className="text-[10px] opacity-70 uppercase tracking-wider">Latest</span>
          </div>
          <AutoScrollNews />
          <div className="border-t border-border px-4 py-2.5 text-right shrink-0">
            <Link
              to="/news"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              View All <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </section>

      {/* ── Stats ── */}
      <section
        ref={statsReveal.ref}
        className={`bg-primary bamboo-texture-bg reveal ${statsReveal.inView ? "in-view" : ""}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className="bg-primary-foreground/10 border border-primary-foreground/15 rounded-xl p-5 text-center backdrop-blur-sm"
                style={{
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full mx-auto mb-3"
                  style={{ background: "oklch(1 0 0 / 0.15)" }}
                >
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary-foreground font-display">
                  {s.v}
                </div>
                <div className="text-xs sm:text-sm text-primary-foreground/70 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Pillars ── */}
      <section
        ref={pillarsReveal.ref}
        className={`bg-secondary bamboo-texture-bg reveal ${pillarsReveal.inView ? "in-view" : ""}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-saffron font-bold mb-1">
              Our Approach
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-display">
              Mission Pillars
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-xl mx-auto">
              A holistic, cluster-based approach to grow India's bamboo economy.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div
                key={p.t}
                className="bg-card border border-border rounded-xl p-5 shadow-soft card-lift group overflow-hidden relative"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Colored top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                  style={{ background: p.accent }}
                />
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.lightBg }}
                >
                  <p.icon className="h-5 w-5" style={{ color: p.accent }} />
                </div>
                <div className="font-semibold text-sm text-primary mb-1.5">{p.t}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── On the Ground ── */}
      <section
        ref={groundReveal.ref}
        className={`bg-background reveal ${groundReveal.inView ? "in-view" : ""}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="text-center mb-7">
            <div className="text-xs uppercase tracking-widest text-saffron font-bold mb-1">
              On the Ground
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary font-display">
              Bamboo Processing & Cultivation across India
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl mx-auto">
              Modern processing units and expanding plantations are powering India's bamboo
              bioeconomy — from farm to factory.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <figure className="bg-card border border-border rounded-xl overflow-hidden shadow-card card-lift group">
              <div className="overflow-hidden">
                <img
                  src={processingImg}
                  alt="Modern bamboo processing unit in India"
                  className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                  width={1280}
                  height={832}
                  loading="lazy"
                />
              </div>
              <figcaption className="p-4">
                <div className="text-[11px] uppercase tracking-wider text-saffron font-bold">
                  Processing Unit
                </div>
                <div className="mt-1 font-semibold text-primary text-sm">
                  Industrial-scale bamboo processing
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Mechanised splitting, treatment and finishing lines supported under NBM are
                  creating new product streams and jobs.
                </div>
              </figcaption>
            </figure>
            <figure className="bg-card border border-border rounded-xl overflow-hidden shadow-card card-lift group">
              <div className="overflow-hidden">
                <img
                  src={cultivationImg}
                  alt="Bamboo cultivation field in India"
                  className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                  width={1280}
                  height={832}
                  loading="lazy"
                />
              </div>
              <figcaption className="p-4">
                <div className="text-[11px] uppercase tracking-wider text-saffron font-bold">
                  Cultivation
                </div>
                <div className="mt-1 font-semibold text-primary text-sm">
                  Block & farm-level plantations
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Quality planting material from accredited nurseries is expanding bamboo cover
                  across {IMPLEMENTING_STATE_COUNT} States.
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative isolate overflow-hidden" data-hero>
        <img
          src={farmerImg}
          alt="Bamboo farmer"
          className="absolute inset-0 h-full w-full object-cover"
          width={1024}
          height={768}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/88" />
        {/* Bamboo line pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(105deg, transparent, transparent 24px, oklch(1 0 0 / 0.5) 24px, oklch(1 0 0 / 0.5) 25px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 text-primary-foreground grid gap-6 md:grid-cols-[2fr_1fr] items-center">
          <div>
            <div className="hero-eyebrow text-xs uppercase tracking-widest text-saffron font-bold mb-2">
              For Farmers, Entrepreneurs & Artisans
            </div>
            <h2 className="image-banner-heading text-xl sm:text-3xl font-bold font-display">
              Are you a farmer, entrepreneur or artisan?
            </h2>
            <p className="mt-2 text-sm opacity-85 max-w-xl leading-relaxed">
              Discover technical assistance and market opportunities offered under the National
              Bamboo Mission.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/guidelines"
              className="inline-flex items-center gap-2 bg-saffron text-saffron-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:brightness-110 transition shadow-lg"
            >
              <FileText className="h-4 w-4" /> View Schemes
            </Link>
            <Link
              to="/contact/head-quarter"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/30 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary-foreground/20 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
