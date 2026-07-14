import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { ImplementingStatesPreview } from "@/components/implementing-states/ImplementingStatesPreview";
import plantationImg from "@/assets/bamboo-plantation.jpg";
import { Target, Eye, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NBM — National Bamboo Mission" },
      { name: "description", content: "Background, vision, objectives and structure of the National Bamboo Mission." },
    ],
  }),
  component: AboutPage,
});

const objectives = [
  "To increase the area under bamboo plantation in non-forest Government and private lands to supplement farm income and contribute towards resilience to climate change as well as availability of quality raw material requirement of industries. The bamboo plantations will be promoted predominantly in farmers' fields, homesteads, community lands, arable wastelands, and along irrigation canals, water bodies etc.",
  "To improve post-harvest management through establishment of innovative primary processing units near the source of production, primary treatment and seasoning plants, preservation technologies and market infrastructure.",
  "To promote product development keeping in view market demand, by assisting R&D, entrepreneurship & business models at micro, small and medium levels and feed bigger industry.",
  "To rejuvenate the under developed bamboo industry in India.",
  "To promote skill development, capacity building, awareness generation for development of bamboo sector from production to market demand.",
  "To realign efforts so as to reduce dependency on import of bamboo and bamboo products by way of improved productivity and suitability of domestic raw material for industry, so as to enhance income of the primary producers.",
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Centrally Sponsored Scheme · Government of India"
        title="About NBM"
        subtitle="A restructured Centrally Sponsored Scheme of the Government of India to develop the complete value chain of the bamboo sector."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5 text-foreground/90 leading-relaxed">
          <h2 className="text-2xl font-bold text-primary">Background</h2>
          <p>
            The National Bamboo Mission (NBM) was launched in 2006-07 and is being implemented as a Centrally Sponsored Scheme since 2018-19 in restructured form. The Mission envisages promoting holistic growth of bamboo sector by adopting area-based, regionally differentiated strategy and to increase the area under bamboo cultivation and marketing.
          </p>
          <p>
            Under the Mission, steps have been taken to increase the availability of quality planting material by supporting the setting up of new nurseries and strengthening of existing ones. To address forward integration, the Mission is taking steps to strengthen marketing of bamboo products, especially of handicraft items.
          </p>
          <img src={plantationImg} alt="Bamboo plantation aerial view" className="rounded-lg shadow-card w-full" width={1024} height={768} loading="lazy" />
        </div>
        <aside className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5 shadow-soft">
            <div className="flex items-center gap-2 text-saffron font-semibold"><Eye className="h-5 w-5" /> Vision</div>
            <p className="mt-2 text-sm text-foreground/90">To position bamboo as a "Green Gold" — a sustainable resource that drives rural livelihoods and a green bioeconomy.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5 shadow-soft">
            <div className="flex items-center gap-2 text-saffron font-semibold"><Target className="h-5 w-5" /> Mission</div>
            <p className="mt-2 text-sm text-foreground/90">Holistic development of the complete value chain through cluster-based approach by connecting farmers with consumers and industry.</p>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ImplementingStatesPreview />
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Objectives</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {objectives.map((o) => (
              <li key={o} className="flex gap-3 bg-card border border-border rounded-lg p-4 shadow-soft">
                <CheckCircle2 className="h-5 w-5 text-leaf shrink-0 mt-0.5" />
                <span className="text-sm">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold text-primary mb-4">Implementation Structure</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead className="bg-primary text-primary-foreground">
              <tr><th className="text-left p-3">Level</th><th className="text-left p-3">Body</th><th className="text-left p-3">Role</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="p-3 font-medium">National</td><td className="p-3">General Council / Executive Committee</td><td className="p-3">Policy, approvals, monitoring</td></tr>
              <tr className="bg-secondary/50"><td className="p-3 font-medium">National Cell</td><td className="p-3">Bamboo Mission Cell, DA&FW</td><td className="p-3">Day-to-day coordination</td></tr>
              <tr><td className="p-3 font-medium">State</td><td className="p-3">State Bamboo Mission (SBM)</td><td className="p-3">Planning, fund flow, implementation</td></tr>
              <tr className="bg-secondary/50"><td className="p-3 font-medium">District</td><td className="p-3">District Bamboo Committee</td><td className="p-3">Selection of beneficiaries, monitoring</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
