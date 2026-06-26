import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import handicraftsImg from "@/assets/bamboo-handicrafts.jpg";
import furnitureImg from "@/assets/bamboo-furniture.jpg";
import constructionImg from "@/assets/bamboo-construction.jpg";
import charcoalImg from "@/assets/bamboo-charcoal.jpg";
import agarbattiImg from "@/assets/bamboo-agarbatti.jpg";
import fashionImg from "@/assets/bamboo-fashion.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Value Added Products — NBM" },
      { name: "description", content: "Bamboo-based value added products: handicrafts, furniture, charcoal, flooring, agarbatti sticks and more." },
    ],
  }),
  component: ProductsPage,
});

const categories = [
  { img: handicraftsImg, t: "Handicrafts & Utility", d: "Baskets, trays, utensils, kitchenware and decor items crafted by skilled artisans across India." },
  { img: furnitureImg, t: "Furniture & Interiors", d: "Cane and engineered bamboo chairs, tables, partitions, lampshades and panels." },
  { img: constructionImg, t: "Industrial & Construction", d: "Bamboo flooring, mat board, ply, scaffolding and laminated structural elements." },
  { img: charcoalImg, t: "Charcoal & Bioenergy", d: "Bamboo charcoal, activated carbon, briquettes, pellets and biofuels." },
  { img: agarbattiImg, t: "Agarbatti & Incense Sticks", d: "Round bamboo sticks — a major MSME-driven segment supplying the agarbatti industry." },
  { img: fashionImg, t: "Lifestyle & Fashion", d: "Bamboo fabric, fibre clothing, accessories, jewelry and gift items." },
];

function ProductsPage() {
  return (
    <>
      <PageHero title="Value Added Products" subtitle="From plantation to product — a thriving ecosystem of bamboo-based goods supporting livelihoods across India." />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article key={c.t} className="bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-card transition">
              <img src={c.img} alt={c.t} loading="lazy" className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="font-semibold text-primary">{c.t}</h3>
                <p className="mt-2 text-sm text-foreground/80">{c.d}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-secondary border-l-4 border-saffron rounded-lg p-6">
          <h3 className="font-bold text-primary text-lg">Marketing & Branding Support</h3>
          <p className="mt-2 text-sm text-foreground/85 max-w-3xl">
            NBM supports retail outlets, participation in trade fairs (India International Trade Fair, IHGF Delhi Fair), e-commerce onboarding (GeM, ONDC) and a dedicated "Bamboo India" brand campaign to promote Indian bamboo products domestically and globally.
          </p>
        </div>
      </section>
    </>
  );
}
