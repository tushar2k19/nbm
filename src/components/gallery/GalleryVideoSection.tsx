import { useCallback, useEffect, useMemo, useState } from "react";
import { ExternalLink, Play, X, Youtube } from "lucide-react";
import {
  galleryVideoCategories,
  galleryVideoThumbnail,
  galleryVideos,
  type GalleryVideo,
  type GalleryVideoCategory,
} from "@/data/galleryVideos";

function GalleryVideoFilterBar({
  active,
  onChange,
  counts,
}: {
  active: GalleryVideoCategory;
  onChange: (c: GalleryVideoCategory) => void;
  counts: Record<GalleryVideoCategory, number>;
}) {
  return (
    <div
      className="gallery-filter-bar relative mx-auto flex max-w-7xl flex-wrap items-center gap-1 rounded-2xl p-1.5"
      role="tablist"
      aria-label="Filter videos by category"
    >
        {galleryVideoCategories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(cat.id)}
              className={`gallery-filter-pill relative z-10 rounded-full px-3.5 py-2 text-xs font-semibold sm:px-4 sm:text-sm ${
                isActive ? "gallery-filter-pill--active" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {cat.label}
              <span
                className={`ml-1.5 text-[10px] font-bold ${isActive ? "text-white/70" : "text-muted-foreground"}`}
              >
                {counts[cat.id]}
              </span>
            </button>
          );
        })}
    </div>
  );
}

export { GalleryVideoFilterBar };

function VideoCard({
  video,
  index,
  onPlay,
}: {
  video: GalleryVideo;
  index: number;
  onPlay: (video: GalleryVideo) => void;
}) {
  const isYoutube = video.source.type === "youtube";

  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      className="gallery-video-card gallery-video-card--enter w-full"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <div className="gallery-video-thumb">
        <img src={galleryVideoThumbnail(video)} alt="" loading="lazy" />
        <div className="gallery-video-play-overlay">
          <span className="gallery-video-play-btn" aria-hidden>
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </div>
        <span className="gallery-video-source-badge">
          {isYoutube ? "YouTube" : "NBM Archive"}
        </span>
        {isYoutube && (
          <span
            className="absolute bottom-1.5 left-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
            aria-label="Closed captions available"
          >
            CC
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent-warm-text">
          {video.subtitle}
        </p>
        <h3 className="line-clamp-3 font-display text-sm font-bold leading-snug text-primary-foreground sm:text-[0.95rem]">
          {video.title}
        </h3>
      </div>
    </button>
  );
}

function VideoModal({ video, onClose }: { video: GalleryVideo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const isYoutube = video.source.type === "youtube";

  return (
    <div
      className="gallery-video-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
    >
      <div className="gallery-video-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-warm-on-dark">
              {video.subtitle}
            </p>
            <h3 className="mt-0.5 font-display text-sm font-bold text-white sm:text-base">{video.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close video"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="gallery-video-modal-player">
          {isYoutube ? (
            <iframe
              title={video.title}
              src={`https://www.youtube.com/embed/${video.source.youtubeId}?autoplay=1&rel=0&cc_load_policy=1&cc_lang_pref=en`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video controls autoPlay playsInline preload="metadata" src={video.source.src}>
              <track kind="captions" label="English (placeholder — to be provided by Department)" default />
              Your browser does not support embedded video playback.
            </video>
          )}
        </div>

        <div className="border-t border-white/10 px-4 py-2.5 sm:px-5">
          <p className="text-[10px] text-white/50">
            {isYoutube
              ? "Closed captions (CC) are enabled on this video. Click the CC button in the player if captions are not visible."
              : "Transcript: to be provided by the Department before public launch (WCAG 1.2.2)."}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <p className="text-xs text-white/60">
            Sourced from the official National Bamboo Mission video gallery.
          </p>
          {video.externalUrl && (
            <a
              href={video.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-warm-on-dark hover:underline"
            >
              {isYoutube ? <Youtube className="h-3.5 w-3.5" /> : <ExternalLink className="h-3.5 w-3.5" />}
              Open original
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function GalleryVideoSection({ category }: { category: GalleryVideoCategory }) {
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);
  const close = useCallback(() => setActiveVideo(null), []);

  const counts = useMemo(() => {
    const base: Record<GalleryVideoCategory, number> = {
      all: galleryVideos.length,
      leadership: 0,
      policy: 0,
      field: 0,
      events: 0,
    };
    for (const v of galleryVideos) base[v.category] += 1;
    return base;
  }, []);

  const filtered = useMemo(() => {
    if (category === "all") return galleryVideos;
    return galleryVideos.filter((v) => v.category === category);
  }, [category]);

  return (
    <section className="gallery-page relative pb-16" id="gallery-videos">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1 text-[11px] font-semibold text-primary">
          <Play className="h-3.5 w-3.5 text-saffron" aria-hidden />
          {filtered.length} videos · from{" "}
          <a
            href="https://nbm.da.gov.in/Video-Gallery"
            target="_blank"
            rel="noreferrer"
            className="hover:text-saffron hover:underline"
          >
            nbm.da.gov.in/Video-Gallery
          </a>
        </div>

        <div className="gallery-video-grid" key={category}>
          {filtered.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} onPlay={setActiveVideo} />
          ))}
        </div>

        <p className="mt-8 rounded-xl border border-border bg-secondary/40 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
          Video titles and sources are reproduced from the official NBM Video Gallery. Some YouTube
          uploads may be unavailable if the original broadcaster has changed visibility settings —
          use &ldquo;Open original&rdquo; to watch on the source platform when needed.
        </p>
      </div>

      {activeVideo && <VideoModal video={activeVideo} onClose={close} />}
    </section>
  );
}
