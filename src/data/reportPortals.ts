export type ReportPortalConfig = {
  to: "/plantation" | "/agarbatti-stick" | "/accredited-nursery";
  eyebrow: string;
  title: string;
  description: string;
  stat: string;
  accent: "bark" | "saffron" | "green";
  ctaLabel: string;
};

/** Links from Reports sections to interactive MIS directory pages */
export const reportPortalLinks: Partial<Record<string, ReportPortalConfig>> = {
  "bamboo-plantation": {
    to: "/plantation",
    eyebrow: "Interactive MIS Directory",
    title: "Bamboo Plantation Registry",
    description:
      "Search plantations by state, district and block — view species-wise culms, area, irrigation and beneficiary details.",
    stat: "1,328 plantations · 7,611 Ha",
    accent: "bark",
    ctaLabel: "Open Plantation Directory",
  },
  "agarbatti-stick": {
    to: "/agarbatti-stick",
    eyebrow: "Interactive MIS Directory",
    title: "Agarbatti Stick Unit Registry",
    description:
      "Explore round bamboo stick manufacturing units — production capacity, NBM support status and state-wise filters.",
    stat: "486 enterprises · 412 running",
    accent: "saffron",
    ctaLabel: "Open Agarbatti Directory",
  },
  "accredited-nurseries": {
    to: "/accredited-nursery",
    eyebrow: "Interactive MIS Directory",
    title: "Accredited Nursery Directory",
    description:
      "Locate NBM-accredited nurseries — species stock, certificates, contact details and national summary statistics.",
    stat: "212 nurseries · 88 species",
    accent: "green",
    ctaLabel: "Open Nursery Directory",
  },
};
