import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { ContactSubNav } from "@/components/contact/ContactSubNav";
import { WhosWhoDirectory } from "@/components/contact/WhosWhoDirectory";

export const Route = createFileRoute("/contact/whos-who")({
  head: () => ({
    meta: [
      { title: "Who's Who — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Official Who's Who directory for the National Bamboo Mission Cell — core NBMC team at Krishi Bhawan and Shastri Bhawan, New Delhi.",
      },
    ],
  }),
  component: WhosWhoPage,
});

function WhosWhoPage() {
  return (
    <>
      <PageHero
        title="Who's Who"
        subtitle="Official directory of NBMC functionaries — Horticulture Commissioner through Senior Technical Assistant at Krishi Bhawan, New Delhi."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <ContactSubNav active="whos-who" />
        <WhosWhoDirectory />
      </section>
    </>
  );
}
