import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GallerySection } from "@/components/gallery/GallerySection";
import { GalleryVideoSection, GalleryVideoFilterBar } from "@/components/gallery/GalleryVideoSection";
import { GalleryStickyToolbar } from "@/components/gallery/GalleryStickyToolbar";
import { GalleryFilterBar } from "@/components/gallery/GalleryFilterBar";
import type { GalleryMode } from "@/components/gallery/GalleryModeBar";
import { galleryItems, type GalleryCategory } from "@/data/galleryItems";
import { galleryVideos, type GalleryVideoCategory } from "@/data/galleryVideos";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Photo and video gallery of bamboo plantations, events, artisans and value-added products under the National Bamboo Mission.",
      },
    ],
  }),
  component: GalleryPage,
  validateSearch: (search: Record<string, unknown>) => ({
    tab: search.tab === "videos" ? ("videos" as const) : ("photos" as const),
  }),
});

function GalleryPage() {
  const { tab } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<GalleryMode>(tab);
  const [photoCategory, setPhotoCategory] = useState<GalleryCategory>("all");
  const [videoCategory, setVideoCategory] = useState<GalleryVideoCategory>("all");

  useEffect(() => {
    setMode(tab);
  }, [tab]);

  const handleModeChange = (next: GalleryMode) => {
    setMode(next);
    void navigate({ to: "/gallery", search: { tab: next }, replace: true });
  };

  const photoCounts = useMemo(() => {
    const base: Record<GalleryCategory, number> = {
      all: galleryItems.length,
      plantations: 0,
      artisans: 0,
      industry: 0,
    };
    for (const item of galleryItems) base[item.category] += 1;
    return base;
  }, []);

  const videoCounts = useMemo(() => {
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

  return (
    <>
      <GalleryHero mode={mode} />
      <GalleryStickyToolbar
        mode={mode}
        onModeChange={handleModeChange}
        photoCount={galleryItems.length}
        videoCount={galleryVideos.length}
      >
        {mode === "photos" ? (
          <GalleryFilterBar
            active={photoCategory}
            onChange={setPhotoCategory}
            counts={photoCounts}
          />
        ) : (
          <GalleryVideoFilterBar
            active={videoCategory}
            onChange={setVideoCategory}
            counts={videoCounts}
          />
        )}
      </GalleryStickyToolbar>
      {mode === "photos" ? (
        <GallerySection category={photoCategory} />
      ) : (
        <GalleryVideoSection category={videoCategory} />
      )}
    </>
  );
}
