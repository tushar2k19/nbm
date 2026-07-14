import { useNavigate } from "@tanstack/react-router";
import { Camera, MapPin, Play, Sparkles } from "lucide-react";
import { PageHero } from "@/components/SiteLayout";
import { galleryStats } from "@/data/galleryItems";
import { galleryVideoStats } from "@/data/galleryVideos";
import type { GalleryMode } from "@/components/gallery/GalleryModeBar";

export function GalleryHero({ mode }: { mode: GalleryMode }) {
  const navigate = useNavigate();

  return (
    <PageHero
      eyebrow={
        <>
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Visual Stories
        </>
      }
      title={mode === "photos" ? "Bamboo in Focus" : "Bamboo on Film"}
      subtitle={
        mode === "photos"
          ? "Plantations, artisan clusters, processing units and products under the National Bamboo Mission."
          : "Official films and broadcasts — PM addresses, field documentaries and workshop highlights from nbm.da.gov.in."
      }
      aside={
        <>
          <button
            type="button"
            onClick={() => navigate({ to: "/gallery", search: { tab: "photos" } })}
            className={`page-hero__metric page-hero__metric--action ${
              mode === "photos" ? "page-hero__metric--active" : ""
            }`}
          >
            <Camera className="page-hero__metric-icon h-4 w-4" aria-hidden />
            <div>
              <div className="page-hero__metric-value">{galleryStats.photos}</div>
              <div className="page-hero__metric-label">Photos</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/gallery", search: { tab: "videos" } })}
            className={`page-hero__metric page-hero__metric--action ${
              mode === "videos" ? "page-hero__metric--active" : ""
            }`}
          >
            <Play className="page-hero__metric-icon h-4 w-4" aria-hidden />
            <div>
              <div className="page-hero__metric-value">{galleryVideoStats.total}</div>
              <div className="page-hero__metric-label">Videos</div>
            </div>
          </button>
          <div className="page-hero__metric page-hero__metric--action">
            <MapPin className="page-hero__metric-icon h-4 w-4" aria-hidden />
            <div>
              <div className="page-hero__metric-value">{galleryStats.regions}</div>
              <div className="page-hero__metric-label">Regions</div>
            </div>
          </div>
        </>
      }
    />
  );
}
