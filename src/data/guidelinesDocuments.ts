export type GuidelineDoc = {
  id: string;
  title: string;
  description: string;
  /** Official PDF on nbm.da.gov.in — opens in a new tab when set */
  pdfUrl?: string;
};

export type GuidelineSection = {
  id: string;
  title: string;
  menuGroup: "guidelines" | "policies" | "financials";
  items: GuidelineDoc[];
};

const NBM_OFFICIAL = "https://nbm.da.gov.in";

export const guidelineSections: GuidelineSection[] = [
  {
    id: "nbm-guidelines-2025",
    title: "NBM Guidelines & Documents",
    menuGroup: "guidelines",
    items: [
      {
        id: "guideline-2025",
        title: "NBM Guidelines 2025",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/NBM_Guideline_2025.pdf`,
      },
      {
        id: "nbm-revised-guidelines",
        title: "Revised Guidelines",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/NBM_Revised_Guidelines.pdf`,
      },
      {
        id: "credit-linked-subsidy",
        title: "Credit Linked Back Ended Subsidy",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/Letters/Guidelines_for_Credit_Linked.pdf`,
      },
      {
        id: "nursery-accreditation",
        title: "Accreditation of Bamboo Nurseries",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/Guidelines_accreditation_Nurseries_10062019.pdf`,
      },
      {
        id: "neids-2017",
        title: "NE Industrial Development Scheme, 2017",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/NEIDS_2017_16April2018.pdf`,
      },
      {
        id: "pcr-propagation-bamboo-clumps",
        title: "Propagation of Improved Bamboo Clumps (NBM – BTSG Supported Project)",
        description: "PDF · Project Report",
        pdfUrl: `${NBM_OFFICIAL}/Documents/ProjectReport/PCR-Final_PropagationofBabooClumps.pdf`,
      },
    ],
  },
  {
    id: "state-bamboo-policies",
    title: "State Bamboo Policies",
    menuGroup: "policies",
    items: [
      {
        id: "felling-transit-royalty",
        title: "State wise status of Felling, Transit Royalty regime in respect of Bamboo",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/pdf/Statewise_status_on_Felling_Transit_Royalty_on%20Bamboo_06072020.pdf`,
      },
      {
        id: "assam-policy",
        title: "Assam State Bamboo & Cane Policy",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/Policies/AssamBambooAndCanePolicy.pdf`,
      },
      {
        id: "nagaland-policy",
        title: "Nagaland State Bamboo Policy",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/Policies/NagalandStateBambooPolicy.pdf`,
      },
      {
        id: "tripura-policy",
        title: "Tripura State Bamboo Policy",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/Policies/TripuraStateBambooPolicy.pdf`,
      },
      {
        id: "manipur-policy",
        title: "Draft Manipur State Bamboo Policy",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/Policies/DraftManipurBambooPolicy.pdf`,
      },
      {
        id: "maharashtra-policy",
        title: "Maharashtra State Bamboo Policy",
        description: "PDF",
        pdfUrl: `${NBM_OFFICIAL}/Documents/Policies/MaharashtraBambooPolicy.pdf`,
      },
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
  { id: "letters" as const, title: "Letters" },
  { id: "provisions" as const, title: "Enabling Provisions" },
  { id: "faq" as const, title: "FAQ" },
];

export type GuidelinesMenuGroup =
  | GuidelineSection["menuGroup"]
  | "letters"
  | "provisions"
  | "faq";

/** Quick-jump anchors on the Guidelines & Documents page (in-page sections only) */
export const guidelinesPageNav = [
  { id: "nbm-guidelines-2025", label: "Guidelines" },
  { id: "state-bamboo-policies", label: "Policies" },
  { id: "enabling-provisions", label: "Enabling Provisions" },
  { id: "release-of-funds", label: "Financials" },
  { id: "letters", label: "Letters" },
] as const;

export function sectionsForMenuGroup(group: GuidelineSection["menuGroup"]) {
  return guidelineSections.filter((s) => s.menuGroup === group);
}
