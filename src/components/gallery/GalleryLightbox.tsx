import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import type { GalleryItem } from "@/data/galleryItems";

type GalleryLightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function GalleryLightbox({ items, index, onClose, onNavigate }: GalleryLightboxProps) {
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(index - 1);
  }, [hasPrev, index, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(index + 1);
  }, [hasNext, index, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  if (!item) return null;

  return (
    <div
      className="gallery-lightbox-backdrop fixed inset-0 z-[100] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="text-sm font-medium text-white/80">
          <span className="text-white font-semibold">{index + 1}</span>
          <span className="mx-1 opacity-50">/</span>
          {items.length}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery viewer"
          className="gallery-lightbox-nav flex h-10 w-10 items-center justify-center rounded-full text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-2 sm:px-16">
        {hasPrev && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous photo"
            className="gallery-lightbox-nav absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <figure
          key={item.id}
          className="gallery-lightbox-img flex max-h-[min(72vh,720px)] max-w-5xl flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.src}
            alt={item.caption}
            className="max-h-[min(65vh,640px)] w-auto max-w-full rounded-xl object-contain shadow-2xl"
          />
          <figcaption className="mt-4 text-center text-white">
            <div className="mb-1 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider text-white/60">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {item.location}
            </div>
            <p className="text-base font-semibold sm:text-lg">{item.caption}</p>
          </figcaption>
        </figure>

        {hasNext && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next photo"
            className="gallery-lightbox-nav absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      <div
        className="flex shrink-0 gap-2 overflow-x-auto px-4 pb-4 pt-2 sm:justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((thumb, i) => (
          <button
            key={thumb.id}
            type="button"
            onClick={() => onNavigate(i)}
            aria-label={`View photo ${i + 1}: ${thumb.caption}`}
            className={`gallery-lightbox-thumb h-14 w-20 shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-24 ${
              i === index ? "gallery-lightbox-thumb--active" : ""
            }`}
          >
            <img src={thumb.src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
