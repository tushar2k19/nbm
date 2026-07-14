import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { IndiaMapThumbnail } from "@/components/home/IndiaMapThumbnail";
import { BambooVerticalSideEdges } from "@/components/quick-services/QuickServicesBackdrop";
import { onTheGroundTiles, type OnTheGroundTile } from "@/data/onTheGround";

function TileLink({
  tile,
  children,
  className = "",
  onMouseEnter,
}: {
  tile: OnTheGroundTile;
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
}) {
  if (!tile.to) {
    return (
      <div className={className} onMouseEnter={onMouseEnter}>
        {children}
      </div>
    );
  }

  return (
    <Link
      to={tile.to}
      {...(tile.hash ? { hash: tile.hash } : {})}
      className={`block h-full cursor-pointer ${className}`}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </Link>
  );
}

function OnTheGroundTileCard({
  tile,
  active,
  onMouseEnter,
  index,
}: {
  tile: OnTheGroundTile;
  active: boolean;
  onMouseEnter?: () => void;
  index: number;
}) {
  const { t } = useTranslation();
  const Icon = tile.icon;
  const isFeatured = tile.gridClass === "otg-tile--featured";
  const isMetric = tile.kind === "metric";
  const isMap = tile.kind === "map";
  const isFeaturedMap = isMap && isFeatured;
  const isImage = tile.kind === "image" && !isFeatured;
  const isGallery = tile.kind === "gallery";
  const hasVisual = isFeatured || isImage || isGallery;

  return (
    <TileLink
      tile={tile}
      className={`otg-tile otg-tile-enter ${tile.gridClass} ${
        isFeatured ? "otg-tile--featured" : ""
      } ${isImage ? "otg-tile--image" : ""} ${isGallery ? "otg-tile--gallery" : ""} ${
        isMetric ? "otg-tile--metric" : ""
      } ${isMap ? "otg-tile--map-card" : ""} ${
        active ? "otg-tile--active" : ""
      }`}
      onMouseEnter={onMouseEnter}
    >
      <article
        className="h-full flex flex-col"
        style={{
          animationDelay: `${index * 0.06}s`,
          ["--tile-accent" as string]: tile.accent,
          ...(active
            ? {
                background: tile.highlight,
                ["--otg-stat-gradient" as string]: tile.highlight,
              }
            : { background: isFeatured ? undefined : tile.idleTint }),
        }}
      >
        {!isFeatured && !isMap && (
          <div
            className="otg-tile-accent-bar"
            style={{ background: tile.accent }}
            aria-hidden
          />
        )}

        {isMap && (
          <div className="otg-tile-map-visual" aria-hidden>
            <IndiaMapThumbnail
              className="otg-tile-map-svg"
              variant={isFeaturedMap ? "hero" : "compact"}
            />
            <div className="otg-tile-map-overlay" />
          </div>
        )}

        {hasVisual && tile.image && (
          <div className="otg-tile-visual" aria-hidden>
            <img
              src={tile.image}
              alt=""
              width={1280}
              height={832}
              loading="lazy"
            />
            <div className="otg-tile-visual-overlay" />
          </div>
        )}

        <div
          className={`otg-tile-body ${
            isFeatured || isGallery ? "" : "relative z-[1]"
          } ${isMap ? "otg-tile-body--map" : ""} ${isMetric ? "otg-tile-body--metric" : ""}`}
        >
          <div
            className="otg-tile-icon"
            style={{
              background: active
                ? "oklch(1 0 0 / 0.28)"
                : isGallery
                  ? "oklch(1 0 0 / 0.14)"
                  : "white",
              boxShadow: active
                ? "inset 0 0 0 1px oklch(1 0 0 / 0.35)"
                : isGallery
                  ? "inset 0 0 0 1px oklch(1 0 0 / 0.22)"
                  : `0 2px 8px -2px ${tile.glow}`,
            }}
          >
            <Icon
              className="h-3.5 w-3.5 transition-colors duration-300"
              style={{ color: active ? "white" : isGallery ? "oklch(0.97 0.02 85)" : tile.accent }}
              strokeWidth={2.25}
            />
          </div>

          <p
            className="otg-tile-label"
            style={isGallery && !active ? undefined : { color: active ? "oklch(0.95 0.02 80)" : tile.accent }}
          >
            {t(`onTheGround.${tile.id}.label`)}
          </p>

          {isMetric && tile.statValue !== undefined && (
            <div className="otg-stat-value mb-1">
              {tile.statPrefix}
              {tile.statValue}
              {tile.statSuffix}
            </div>
          )}

          <h3
            className="otg-tile-title"
            style={{
              color:
                active || isFeatured || isGallery || isMap
                  ? "oklch(0.98 0.01 110)"
                  : "oklch(0.22 0.08 150)",
            }}
          >
            {t(`onTheGround.${tile.id}.title`)}
          </h3>

          <p
            className="otg-tile-desc"
            style={{
              color:
                active || isFeatured || isGallery || isMap
                  ? "oklch(0.98 0.01 110 / 0.82)"
                  : "oklch(0.42 0.05 150 / 0.85)",
            }}
          >
            {t(`onTheGround.${tile.id}.desc`)}
          </p>

          {tile.to && (
            <span
              className="otg-tile-cta"
              style={
                active || isFeatured || isMap
                  ? { background: "white", color: tile.ctaAccent }
                  : isGallery
                    ? {
                        background: "oklch(1 0 0 / 0.14)",
                        color: "oklch(0.98 0.01 110)",
                        border: "1px solid oklch(1 0 0 / 0.30)",
                      }
                    : { background: tile.accent, color: "white" }
              }
            >
              {t(`onTheGround.${tile.id}.cta`)}
              <ArrowRight className="h-2.5 w-2.5" />
            </span>
          )}
        </div>
      </article>
    </TileLink>
  );
}

export function OnTheGroundSection({
  revealClass = "",
  sectionRef,
}: {
  revealClass?: string;
  sectionRef?: RefObject<HTMLElement | null>;
}) {
  const { t } = useTranslation();
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const activeIdx = hoverIdx ?? highlightIdx;

  useEffect(() => {
    if (hoverIdx !== null) return;
    const id = window.setInterval(() => {
      setHighlightIdx((i) => (i + 1) % onTheGroundTiles.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [hoverIdx]);

  return (
    <section
      ref={sectionRef}
      className={`on-the-ground-section relative ${revealClass}`}
      aria-labelledby="on-the-ground-heading"
    >
      <BambooVerticalSideEdges />
      <div className="otg-glow" aria-hidden />
      <div className="otg-glow otg-glow--right" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-5 pb-7 sm:pt-6 sm:pb-8">
        <header className="text-center mb-8 sm:mb-10">
          <div className="flex justify-center mb-2.5">
            <div className="otg-eyebrow">
              <span className="otg-eyebrow-dot" aria-hidden />
              {t("sections.onTheGround.eyebrow")}
            </div>
          </div>
          <h2
            id="on-the-ground-heading"
            className="otg-title text-xl sm:text-2xl lg:text-[1.75rem] font-bold font-display tracking-tight mb-1"
          >
            {t("sections.onTheGround.title")}
          </h2>
          <div
            className="w-14 h-1 rounded-full mx-auto mb-3"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.76 0.15 78), oklch(0.52 0.15 145), oklch(0.50 0.18 250))",
            }}
            aria-hidden
          />
          <p className="otg-subtitle mt-1.5 text-[13px] max-w-2xl mx-auto leading-relaxed font-medium">
            {t("sections.onTheGround.subtitle")}
          </p>
        </header>

        <div
          className="otg-bento"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {onTheGroundTiles.map((tile, i) => (
            <OnTheGroundTileCard
              key={tile.id}
              tile={tile}
              active={activeIdx === i}
              onMouseEnter={() => setHoverIdx(i)}
              index={i}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="otg-footer-bridge w-full" aria-hidden />
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold bg-white/15 border border-white/25 text-white/90 backdrop-blur-sm hover:bg-white/22 hover:text-white transition-all duration-200"
          >
            Explore Full Mission Data
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="otg-footer-fade" aria-hidden />
    </section>
  );
}
