import hero from "@/assets/bamboo-hero.jpg";
import grove from "@/assets/bamboo-grove.jpg";
import handicrafts from "@/assets/bamboo-handicrafts.jpg";
import farmer from "@/assets/bamboo-farmer.jpg";
import furniture from "@/assets/bamboo-furniture.jpg";
import plantation from "@/assets/bamboo-plantation.jpg";
import northeast from "@/assets/bamboo-northeast.jpg";
import artisan from "@/assets/bamboo-artisan.jpg";
import agarbatti from "@/assets/bamboo-agarbatti.jpg";
import charcoal from "@/assets/bamboo-charcoal.jpg";
import construction from "@/assets/bamboo-construction.jpg";
import products from "@/assets/bamboo-products.jpg";

export type GalleryCategory = "all" | "plantations" | "artisans" | "industry";

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  location: string;
  category: Exclude<GalleryCategory, "all">;
  featured?: boolean;
  /** Grid footprint for bento layout */
  span: "hero" | "tall" | "wide" | "standard";
};

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All Stories" },
  { id: "plantations", label: "Plantations" },
  { id: "artisans", label: "Artisans & Crafts" },
  { id: "industry", label: "Industry & Products" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "grove-nilgiris",
    src: grove,
    caption: "Bamboo grove, Bokkapuram, Nilgiris",
    location: "Tamil Nadu",
    category: "plantations",
    featured: true,
    span: "hero",
  },
  {
    id: "northeast-park",
    src: northeast,
    caption: "Bamboo park, Rangsapara village, North East India",
    location: "North East",
    category: "plantations",
    featured: true,
    span: "tall",
  },
  {
    id: "artisan-purulia",
    src: artisan,
    caption: "Bamboo craft artisan, Purulia, West Bengal",
    location: "West Bengal",
    category: "artisans",
    featured: true,
    span: "tall",
  },
  {
    id: "handicrafts-kolkata",
    src: handicrafts,
    caption: "Hand-painted bamboo goods at a handicrafts fair, Kolkata",
    location: "West Bengal",
    category: "artisans",
    span: "standard",
  },
  {
    id: "tripura-handicraft",
    src: products,
    caption: "Traditional bamboo handicraft of Tripura",
    location: "Tripura",
    category: "artisans",
    span: "wide",
  },
  {
    id: "agarbatti-sticks",
    src: agarbatti,
    caption: "Round bamboo agarbatti sticks",
    location: "Processing unit",
    category: "industry",
    span: "standard",
  },
  {
    id: "bamboo-charcoal",
    src: charcoal,
    caption: "Bamboo charcoal — bioenergy product",
    location: "Value chain",
    category: "industry",
    span: "tall",
  },
  {
    id: "scaffolding-kolkata",
    src: construction,
    caption: "Bamboo scaffolding in use, Kolkata",
    location: "West Bengal",
    category: "industry",
    span: "wide",
  },
  {
    id: "cane-furniture",
    src: furniture,
    caption: "Indian bamboo cane furniture",
    location: "Artisan cluster",
    category: "industry",
    span: "standard",
  },
  {
    id: "aerial-plantation",
    src: plantation,
    caption: "Aerial view — bamboo plantation, North East",
    location: "North East",
    category: "plantations",
    span: "wide",
  },
  {
    id: "farmer-assam",
    src: farmer,
    caption: "Bamboo farmer at sunrise, Assam",
    location: "Assam",
    category: "plantations",
    span: "standard",
  },
  {
    id: "sunlit-canopy",
    src: hero,
    caption: "Sunlit canopy, bamboo grove",
    location: "India",
    category: "plantations",
    span: "tall",
  },
];

export const galleryStats = {
  photos: galleryItems.length,
  regions: new Set(galleryItems.map((i) => i.location)).size,
  themes: galleryCategories.length - 1,
};
