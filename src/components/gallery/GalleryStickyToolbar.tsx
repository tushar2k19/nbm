import type { ReactNode } from "react";
import { GalleryModeBar, type GalleryMode } from "./GalleryModeBar";

type GalleryStickyToolbarProps = {
  mode: GalleryMode;
  onModeChange: (mode: GalleryMode) => void;
  photoCount: number;
  videoCount: number;
  children: ReactNode;
};

export function GalleryStickyToolbar({
  mode,
  onModeChange,
  photoCount,
  videoCount,
  children,
}: GalleryStickyToolbarProps) {
  return (
    <div className="gallery-sticky-toolbar">
      <div className="gallery-sticky-toolbar__inner mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6">
        <GalleryModeBar
          mode={mode}
          onChange={onModeChange}
          photoCount={photoCount}
          videoCount={videoCount}
        />
        {children}
      </div>
    </div>
  );
}
