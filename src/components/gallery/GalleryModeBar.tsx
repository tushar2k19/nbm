import { Camera, Play } from "lucide-react";

export type GalleryMode = "photos" | "videos";

type GalleryModeBarProps = {
  mode: GalleryMode;
  onChange: (mode: GalleryMode) => void;
  photoCount: number;
  videoCount: number;
};

export function GalleryModeBar({ mode, onChange, photoCount, videoCount }: GalleryModeBarProps) {
  const tabs: { id: GalleryMode; label: string; icon: typeof Camera; count: number }[] = [
    { id: "photos", label: "Photos", icon: Camera, count: photoCount },
    { id: "videos", label: "Videos", icon: Play, count: videoCount },
  ];

  return (
    <div
      className="gallery-mode-bar relative mx-auto flex max-w-7xl gap-1 rounded-full p-1"
      role="tablist"
      aria-label="Gallery content type"
    >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`gallery-mode-pill relative flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold sm:flex-none sm:px-6 ${
                isActive ? "gallery-mode-pill--active" : "text-foreground/70 hover:text-primary"
              }`}
            >
              {isActive && <span className="gallery-mode-pill-bg" aria-hidden />}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="h-4 w-4" aria-hidden />
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                  }`}
                >
                  {tab.count}
                </span>
              </span>
            </button>
          );
        })}
    </div>
  );
}
