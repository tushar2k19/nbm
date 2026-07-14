import { useEffect, useRef, useState } from "react";
import type { GalleryCategory } from "@/data/galleryItems";
import { galleryCategories } from "@/data/galleryItems";

type GalleryFilterBarProps = {
  active: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
  counts: Record<GalleryCategory, number>;
};

export function GalleryFilterBar({ active, onChange, counts }: GalleryFilterBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<GalleryCategory, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const btn = pillRefs.current.get(active);
    const bar = barRef.current;
    if (!btn || !bar) return;

    const update = () => {
      const barRect = bar.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({
        left: btnRect.left - barRect.left,
        width: btnRect.width,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  return (
    <div
      ref={barRef}
      className="gallery-filter-bar relative mx-auto flex max-w-7xl flex-wrap items-center gap-1 rounded-2xl p-1.5 sm:gap-0"
      role="tablist"
      aria-label="Filter gallery by category"
    >
        <span
          className="gallery-filter-pill-bg pointer-events-none absolute top-1.5 h-[calc(100%-12px)]"
          style={{ left: indicator.left, width: indicator.width }}
          aria-hidden
        />
        {galleryCategories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              ref={(el) => {
                if (el) pillRefs.current.set(cat.id, el);
              }}
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
