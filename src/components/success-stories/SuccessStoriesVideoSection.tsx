import { useCallback, useEffect, useState } from "react";
import { MapPin, Play, X } from "lucide-react";
import { successStoryVideos, type SuccessStoryVideo } from "@/data/successStories";

function VideoCard({
  video,
  onPlay,
}: {
  video: SuccessStoryVideo;
  onPlay: (video: SuccessStoryVideo) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      className="ss-video-card w-full text-left"
    >
      <div className="ss-video-thumb relative">
        <img src={video.thumbnail} alt="" loading="lazy" />
        <div className="ss-video-play">
          <span className="ss-video-play-btn" aria-hidden>
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </div>
        <span className="ss-video-duration">{video.duration}</span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent-warm-text">
          <MapPin className="h-3 w-3" aria-hidden />
          {video.state} · {video.subtitle}
        </div>
        <h3 className="font-display text-base font-bold leading-snug text-primary-foreground sm:text-lg">
          {video.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-primary-foreground/70">
          {video.description}
        </p>
      </div>
    </button>
  );
}

function VideoModal({
  video,
  onClose,
}: {
  video: SuccessStoryVideo;
  onClose: () => void;
}) {
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

  return (
    <div
      className="ss-video-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
    >
      <div className="ss-video-modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-warm-on-dark">
              {video.state} · {video.duration}
            </p>
            <h3 className="mt-0.5 font-display text-sm font-bold text-white sm:text-base">
              {video.title}
            </h3>
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
        <div className="ss-video-modal-player">
          <video controls autoPlay playsInline preload="metadata" src={video.videoSrc}>
            Your browser does not support embedded video playback.
          </video>
        </div>
        <p className="px-4 py-3 text-xs leading-relaxed text-white/70 sm:px-5">{video.description}</p>
      </div>
    </div>
  );
}

export function SuccessStoriesVideoSection() {
  const [activeVideo, setActiveVideo] = useState<SuccessStoryVideo | null>(null);
  const close = useCallback(() => setActiveVideo(null), []);

  return (
    <section id="videos" className="scroll-mt-28">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-8 w-1.5 rounded bg-saffron" />
        <div>
          <h2 className="font-display text-xl font-bold text-primary sm:text-2xl">Video Stories</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Field documentaries and training highlights from the National Bamboo Mission archives.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {successStoryVideos.map((video) => (
          <VideoCard key={video.id} video={video} onPlay={setActiveVideo} />
        ))}
      </div>

      {activeVideo && <VideoModal video={activeVideo} onClose={close} />}
    </section>
  );
}
