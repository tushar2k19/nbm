import { Expand, MapPin } from "lucide-react";
import type { GalleryItem } from "@/data/galleryItems";

const categoryLabels: Record<GalleryItem["category"], string> = {
  plantations: "Plantations",
  artisans: "Artisans",
  industry: "Industry",
};

type GalleryCardProps = {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
};

export function GalleryCard({ item, index, onOpen }: GalleryCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`gallery-card gallery-card--${item.span} group gallery-card--enter`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="absolute inset-0">
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          className="gallery-card-img h-full w-full object-cover"
        />
        <div className="gallery-card-overlay absolute inset-0" aria-hidden />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="gallery-category-chip rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            {categoryLabels[item.category]}
          </span>
          <span className="gallery-card-zoom flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
            <Expand className="h-4 w-4" aria-hidden />
          </span>
        </div>

        <div className="gallery-card-caption text-white">
          <div className="mb-1 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-white/75">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            {item.location}
          </div>
          <p className="text-sm font-semibold leading-snug sm:text-base">{item.caption}</p>
        </div>
      </div>
    </article>
  );
}
