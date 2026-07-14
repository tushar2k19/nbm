import { useEffect, useMemo, useState } from "react";
import { ImageOff } from "lucide-react";
import {
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/galleryItems";
import { GalleryFilterBar } from "./GalleryFilterBar";
import { GalleryCard } from "./GalleryCard";
import { GalleryLightbox } from "./GalleryLightbox";

function sortForBento(items: GalleryItem[]) {
  const order = { hero: 0, tall: 1, wide: 2, standard: 3 } as const;
  return [...items].sort((a, b) => order[a.span] - order[b.span]);
}

export function GallerySection({ category }: { category: GalleryCategory }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setLightboxIndex(null);
  }, [category]);

  const filtered = useMemo(() => {
    const list =
      category === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === category);
    return sortForBento(list);
  }, [category]);

  const openLightbox = (item: GalleryItem) => {
    const idx = filtered.findIndex((i) => i.id === item.id);
    if (idx >= 0) setLightboxIndex(idx);
  };

  return (
    <section className="gallery-page relative pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {filtered.length === 0 ? (
          <div className="gallery-empty flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center">
            <ImageOff className="mb-3 h-10 w-10 text-muted-foreground/50" aria-hidden />
            <p className="text-sm font-medium text-muted-foreground">No photos in this category yet.</p>
          </div>
        ) : (
          <div className="gallery-bento" key={category}>
            {filtered.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} onOpen={() => openLightbox(item)} />
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
