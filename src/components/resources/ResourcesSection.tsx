import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { resourceLinks } from "@/data/resourceLinks";
import type { QuickServiceItem } from "@/data/quickServices";
import { QuickServicesBackdrop } from "@/components/quick-services/QuickServicesBackdrop";

function ResourceCard({
  item,
  active,
  onMouseEnter,
  className = "",
}: {
  item: QuickServiceItem;
  active: boolean;
  onMouseEnter?: () => void;
  className?: string;
}) {
  const { t } = useTranslation();
  const Icon = item.icon;

  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`qs-card ${active ? "qs-card--active" : "qs-card--idle"} ${className}`}
      style={
        active
          ? {
              background: item.highlight,
              ["--qs-glow" as string]: item.glow,
            }
          : { background: item.idleTint }
      }
    >
      <div
        className="qs-card-icon"
        style={{
          background: active ? "oklch(1 0 0 / 0.28)" : "white",
          boxShadow: active
            ? "inset 0 0 0 1px oklch(1 0 0 / 0.35)"
            : "0 2px 8px -2px oklch(0.3 0.06 150 / 0.12)",
        }}
      >
        <Icon
          className="h-5 w-5 transition-colors duration-300"
          style={{ color: active ? "white" : item.accent }}
          strokeWidth={2.25}
        />
      </div>

      <h3 className="font-semibold text-[12px] sm:text-[13px] text-foreground mb-1 leading-snug tracking-tight">
        {t(`resourceLinks.${item.id}.title`)}
      </h3>
      <p
        className={`text-[10px] sm:text-[11px] leading-relaxed flex-1 mb-3 ${
          active ? "text-foreground/80" : "text-muted-foreground"
        }`}
      >
        {t(`resourceLinks.${item.id}.desc`)}
      </p>

      <Link
        to={item.to}
        className="qs-card-cta"
        style={
          active
            ? { background: "white", color: item.ctaAccent, padding: "0.45rem 0.75rem", fontSize: "0.6875rem" }
            : { background: "oklch(0.34 0.10 150)", color: "white", padding: "0.45rem 0.75rem", fontSize: "0.6875rem" }
        }
      >
        {t(`resourceLinks.${item.id}.cta`)}
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

export function ResourcesSection({
  revealClass = "",
  sectionRef,
}: {
  revealClass?: string;
  sectionRef?: RefObject<HTMLElement | null>;
}) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const activeIdx = hoverIdx ?? highlightIdx;

  useEffect(() => {
    if (hoverIdx !== null) return;
    const id = window.setInterval(() => {
      setHighlightIdx((i) => (i + 1) % resourceLinks.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [hoverIdx]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / resourceLinks.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setHighlightIdx(Math.min(idx, resourceLinks.length - 1));
  }, []);

  const scrollToCard = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / resourceLinks.length;
    el.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
    setHighlightIdx(idx);
  };

  return (
    <section
      ref={sectionRef}
      className={`quick-services-section relative ${revealClass}`}
    >
      <QuickServicesBackdrop />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6">
        <div className="text-center mb-4 sm:mb-5">
          <div className="flex justify-center mb-2">
            <div className="qs-eyebrow">
              <span className="qs-eyebrow-dot" aria-hidden />
              {t("sections.resources.eyebrow")}
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-foreground font-display tracking-tight mb-1">
            {t("sections.resources.title")}
          </h2>
          <div className="w-12 h-1 bg-primary/20 rounded-full mx-auto mb-3" />
          <p className="mt-1.5 text-[13px] text-muted-foreground max-w-lg mx-auto leading-relaxed font-medium">
            {t("sections.resources.subtitle")}
          </p>
        </div>

        <div className="qs-cards-track">
          <div
            className="hidden lg:grid lg:grid-cols-6 gap-4 xl:gap-5 items-stretch"
            onMouseLeave={() => setHoverIdx(null)}
          >
            {resourceLinks.map((item, i) => (
              <div
                key={item.id}
                style={{
                  animation: "qsCardFadeIn 0.6s ease forwards",
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}
              >
                <ResourceCard
                  item={item}
                  active={activeIdx === i}
                  onMouseEnter={() => setHoverIdx(i)}
                />
              </div>
            ))}
          </div>

          <div className="lg:hidden" onMouseLeave={() => setHoverIdx(null)}>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {resourceLinks.map((item, i) => (
                <ResourceCard
                  key={item.id}
                  item={item}
                  active={activeIdx === i}
                  onMouseEnter={() => setHoverIdx(i)}
                  className="min-w-[260px] max-w-[280px] snap-start shrink-0"
                />
              ))}
            </div>
            <div className="qs-dot-container">
              {resourceLinks.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to ${t(`resourceLinks.${item.id}.title`)}`}
                  className={`qs-dot ${i === activeIdx ? "qs-dot--active" : "qs-dot--idle"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes qsCardFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
