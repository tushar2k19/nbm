import grove from "@/assets/bamboo-grove.jpg";
import northeast from "@/assets/bamboo-northeast.jpg";
import artisan from "@/assets/bamboo-artisan.jpg";
import plantation from "@/assets/bamboo-plantation.jpg";
import farmer from "@/assets/bamboo-farmer.jpg";
import hero from "@/assets/bamboo-hero.jpg";

const OFFICIAL_BASE = "https://nbm.da.gov.in";

export type GalleryVideoCategory = "all" | "leadership" | "policy" | "field" | "events";

export type GalleryVideoSource =
  | { type: "youtube"; youtubeId: string }
  | { type: "mp4"; src: string };

export type GalleryVideo = {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<GalleryVideoCategory, "all">;
  source: GalleryVideoSource;
  thumbnail?: string;
  /** External page to open if embed is unavailable */
  externalUrl?: string;
};

export const galleryVideoCategories: { id: GalleryVideoCategory; label: string }[] = [
  { id: "all", label: "All Videos" },
  { id: "leadership", label: "Leadership" },
  { id: "policy", label: "Policy & Dialogue" },
  { id: "field", label: "Field Stories" },
  { id: "events", label: "Events & Workshops" },
];

export const galleryVideos: GalleryVideo[] = [
  {
    id: "pm-deregulating-bamboo",
    title: "PM Narendra Modi on deregulating bamboo trade and cultivation",
    subtitle: "Farmers' welfare focus",
    category: "leadership",
    source: { type: "youtube", youtubeId: "ks1TlIybRKg" },
    externalUrl: "https://www.youtube.com/watch?v=ks1TlIybRKg",
  },
  {
    id: "initiative-bamboo-mission",
    title: "Initiative of Bamboo Mission",
    subtitle: "News & Views",
    category: "policy",
    source: { type: "youtube", youtubeId: "Utn-heM_YS4" },
    externalUrl: "https://www.youtube.com/watch?v=Utn-heM_YS4",
  },
  {
    id: "talk-bamboo-cultivation",
    title: "Talk on bamboo cultivation",
    subtitle: "वाद संवाद — DD Kisan",
    category: "policy",
    source: { type: "youtube", youtubeId: "ycN_vkJufyY" },
    externalUrl: "https://www.youtube.com/watch?v=ycN_vkJufyY",
  },
  {
    id: "desh-deshantar-forest-bill",
    title: "Desh Deshantar: The Indian Forest (Amendment) Bill, 2017",
    subtitle: "Sansad TV · Policy dialogue",
    category: "policy",
    source: { type: "youtube", youtubeId: "shi-RPc0qUE" },
    externalUrl: "https://www.youtube.com/watch?v=shi-RPc0qUE",
  },
  {
    id: "bhima-bamboo-karnataka",
    title: "Cultivation of Bhima Bamboo — Social Forestry, Tumkur",
    subtitle: "Karnataka field story",
    category: "field",
    source: { type: "mp4", src: `${OFFICIAL_BASE}/Video/BhimaBamboo_Karnataka.mp4` },
    thumbnail: plantation,
    externalUrl: `${OFFICIAL_BASE}/Video/BhimaBamboo_Karnataka.mp4`,
  },
  {
    id: "nagaland-farmers-feedback",
    title: "Nagaland farmers' feedback",
    subtitle: "Voices from the field",
    category: "field",
    source: { type: "mp4", src: `${OFFICIAL_BASE}/Video/Farmers_Feedback.mp4` },
    thumbnail: northeast,
    externalUrl: `${OFFICIAL_BASE}/Video/Farmers_Feedback.mp4`,
  },
  {
    id: "nursery-intercropping",
    title: "Nursery and intercropping — weed control by population density",
    subtitle: "Technical demonstration",
    category: "field",
    source: {
      type: "mp4",
      src: `${OFFICIAL_BASE}/Video/Nursery_and_intercropping_weed_control_by_population_density.mp4`,
    },
    thumbnail: grove,
    externalUrl: `${OFFICIAL_BASE}/Video/Nursery_and_intercropping_weed_control_by_population_density.mp4`,
  },
  {
    id: "cbtc-world-bamboo-workshop",
    title: "3rd World Bamboo Workshop, Imphal (4–8 Feb 2019) under CBTC–NBM",
    subtitle: "North-East event",
    category: "events",
    source: { type: "mp4", src: `${OFFICIAL_BASE}/Video/CBTC_3rd_WorldBambooWorkshop.mp4` },
    thumbnail: artisan,
    externalUrl: `${OFFICIAL_BASE}/Video/CBTC_3rd_WorldBambooWorkshop.mp4`,
  },
  {
    id: "bamboo-farming-millionaire",
    title: "From struggle to success — a millionaire made of bamboo farming",
    subtitle: "Inspirational farmer story",
    category: "field",
    source: {
      type: "mp4",
      src: "https://videos.bhaskarassets.com/2021/01/22/db-original-positive-story-srbh_1611278612/mp4/v360.mp4",
    },
    thumbnail: farmer,
    externalUrl:
      "https://videos.bhaskarassets.com/2021/01/22/db-original-positive-story-srbh_1611278612/mp4/v360.mp4",
  },
];

export function youtubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function galleryVideoThumbnail(video: GalleryVideo): string {
  if (video.thumbnail) return video.thumbnail;
  if (video.source.type === "youtube") return youtubeThumbnail(video.source.youtubeId);
  return hero;
}

export const galleryVideoStats = {
  total: galleryVideos.length,
  youtube: galleryVideos.filter((v) => v.source.type === "youtube").length,
  hosted: galleryVideos.filter((v) => v.source.type === "mp4").length,
};
