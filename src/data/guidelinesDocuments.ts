export type GuidelineDoc = {
  id: string;
  title: string;
  description: string;
};

export type GuidelineSection = {
  id: string;
  title: string;
  menuGroup: "guidelines" | "policies" | "financials";
  items: GuidelineDoc[];
};

export const guidelineSections: GuidelineSection[] = [
  {
    id: "nbm-guidelines-2025",
    title: "NBM Guidelines 2025",
    menuGroup: "guidelines",
    items: [
      {
        id: "operational-guidelines-2025",
        title: "Operational Guidelines of National Bamboo Mission — 2025 Edition",
        description: "PDF · 4.6 MB · 12 Mar 2025",
      },
      {
        id: "revised-cost-norms-2025",
        title: "Revised Cost Norms & Subsidy Pattern (2025)",
        description: "PDF · 1.3 MB · 12 Mar 2025",
      },
      {
        id: "annexures-2025",
        title: "Annexures — Application & Sanction Formats (2025)",
        description: "PDF · 1.0 MB · 12 Mar 2025",
      },
    ],
  },
  {
    id: "state-bamboo-policies",
    title: "State Bamboo Policies",
    menuGroup: "policies",
    items: [
      { id: "assam-policy", title: "Assam State Bamboo Policy, 2019", description: "PDF · 1.8 MB" },
      { id: "tripura-policy", title: "Tripura State Bamboo Policy", description: "PDF · 1.4 MB" },
      {
        id: "mp-policy",
        title: "Madhya Pradesh State Bamboo Mission — Policy Framework",
        description: "PDF · 2.1 MB",
      },
      { id: "karnataka-policy", title: "Karnataka State Bamboo Policy", description: "PDF · 1.6 MB" },
      { id: "odisha-policy", title: "Odisha Bamboo Development Policy", description: "PDF · 1.9 MB" },
    ],
  },
  {
    id: "release-of-funds",
    title: "Release of Funds",
    menuGroup: "financials",
    items: [
      {
        id: "funds-2025-26-1",
        title: "Release of funds to States/UTs — FY 2025-26 (1st Instalment)",
        description: "PDF · 540 KB",
      },
      {
        id: "funds-2024-25-final",
        title: "Release of funds to States/UTs — FY 2024-25 (Final)",
        description: "PDF · 620 KB",
      },
      {
        id: "funds-2024-25-2",
        title: "Release of funds to States/UTs — FY 2024-25 (2nd Instalment)",
        description: "PDF · 510 KB",
      },
      { id: "funds-2023-24", title: "Release of funds to States/UTs — FY 2023-24", description: "PDF · 480 KB" },
    ],
  },
];

export const megaMenuGroups = [
  { id: "guidelines" as const, title: "Guidelines" },
  { id: "policies" as const, title: "Policies" },
  { id: "financials" as const, title: "Financials" },
];

export function sectionsForMenuGroup(group: GuidelineSection["menuGroup"]) {
  return guidelineSections.filter((s) => s.menuGroup === group);
}
