import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
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

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — National Bamboo Mission" },
      { name: "description", content: "Photo gallery of bamboo plantations, events, artisans and value-added products under NBM." },
    ],
  }),
  component: GalleryPage,
});

const items = [
  { src: grove, cap: "Bamboo grove, Bokkapuram, Nilgiris" },
  { src: northeast, cap: "Bamboo park, Rangsapara village, North East India" },
  { src: artisan, cap: "Bamboo craft artisan, Purulia, West Bengal" },
  { src: handicrafts, cap: "Hand-painted bamboo goods at a handicrafts fair, Kolkata" },
  { src: products, cap: "Traditional bamboo handicraft of Tripura" },
  { src: agarbatti, cap: "Round bamboo agarbatti sticks" },
  { src: charcoal, cap: "Bamboo charcoal — bioenergy product" },
  { src: construction, cap: "Bamboo scaffolding in use, Kolkata" },
  { src: furniture, cap: "Indian bamboo cane furniture" },
  { src: plantation, cap: "Aerial view — bamboo plantation, North East" },
  { src: farmer, cap: "Bamboo farmer at sunrise, Assam" },
  { src: hero, cap: "Sunlit canopy, bamboo grove" },
];

function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" subtitle="Glimpses of the National Bamboo Mission — plantations, events, artisans and products." />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {items.map((it, i) => (
            <figure key={i} className="mb-4 break-inside-avoid rounded-lg overflow-hidden bg-card border border-border shadow-soft group">
              <img src={it.src} alt={it.cap} loading="lazy" className="w-full h-auto group-hover:scale-105 transition duration-500" />
              <figcaption className="p-3 text-xs text-muted-foreground border-t border-border">{it.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
