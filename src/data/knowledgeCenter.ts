export type KnowledgeItem = {
  id: string;
  title: string;
  description: string;
};

export type Institute = {
  id: string;
  name: string;
  location: string;
  role: string;
};

export type KnowledgeSection = {
  id: string;
  title: string;
  items: KnowledgeItem[];
};

export const institutes: Institute[] = [
  {
    id: "icfre",
    name: "Indian Council of Forestry Research and Education (ICFRE)",
    location: "Dehradun, Uttarakhand",
    role: "Apex research on bamboo silviculture & genetic improvement.",
  },
  {
    id: "cbtc",
    name: "Cane and Bamboo Technology Centre (CBTC)",
    location: "Guwahati, Assam",
    role: "Technology development, design & artisan training for NE region.",
  },
  {
    id: "ipirti",
    name: "Indian Plywood Industries Research & Training Institute (IPIRTI)",
    location: "Bengaluru, Karnataka",
    role: "Bamboo composites, engineered bamboo, structural applications.",
  },
  {
    id: "kfri",
    name: "Kerala Forest Research Institute (KFRI)",
    location: "Peechi, Kerala",
    role: "Tissue culture, pest management, bamboo flowering studies.",
  },
  {
    id: "fri",
    name: "Forest Research Institute (FRI)",
    location: "Dehradun",
    role: "Propagation techniques and bamboo-based agroforestry models.",
  },
  {
    id: "nmba",
    name: "National Mission on Bamboo Applications (NMBA)",
    location: "New Delhi",
    role: "Applications in construction, energy and consumer products.",
  },
  {
    id: "nerist",
    name: "North Eastern Regional Institute of Science & Technology",
    location: "Itanagar, Arunachal Pradesh",
    role: "Skill development & bamboo entrepreneurship.",
  },
  {
    id: "bcdi",
    name: "Bamboo & Cane Development Institute (BCDI)",
    location: "Agartala, Tripura",
    role: "Design intervention, common facility centre for artisans.",
  },
  {
    id: "inbar",
    name: "INBAR — International Network for Bamboo & Rattan",
    location: "Liaison Office, New Delhi",
    role: "International cooperation, knowledge exchange.",
  },
];

export const knowledgeCenterSections: KnowledgeSection[] = [
  {
    id: "training-modules",
    title: "Training Modules",
    items: [
      {
        id: "plantation-techniques",
        title: "Bamboo Plantation Techniques & Nursery Management",
        description: "PDF · Video · 8 modules",
      },
      {
        id: "harvesting-seasoning",
        title: "Harvesting, Seasoning & Treatment of Bamboo",
        description: "PDF · Video · 6 modules",
      },
      {
        id: "artisan-skills",
        title: "Artisan Skills — Handicrafts & Utility Products",
        description: "PDF · Video · 10 modules",
      },
      {
        id: "entrepreneurship",
        title: "Bamboo Entrepreneurship & MSME Setup",
        description: "PDF · Video · 7 modules",
      },
      {
        id: "processing-units",
        title: "Bamboo Processing Units — Operations & Safety",
        description: "PDF · Video · 5 modules",
      },
      {
        id: "field-functionaries",
        title: "Training for Field Functionaries & State Mission Staff",
        description: "PDF · Video · 4 modules",
      },
    ],
  },
  {
    id: "institutes",
    title: "Institutes",
    items: institutes.map((i) => ({
      id: i.id,
      title: i.name,
      description: i.location,
    })),
  },
  {
    id: "value-added-products",
    title: "Value Added Products",
    items: [
      {
        id: "handicrafts",
        title: "Handicrafts & Utility",
        description: "Baskets, trays, utensils and decor items",
      },
      {
        id: "furniture",
        title: "Furniture & Interiors",
        description: "Chairs, tables, partitions and panels",
      },
      {
        id: "construction",
        title: "Industrial & Construction",
        description: "Flooring, mat board, ply and scaffolding",
      },
      {
        id: "charcoal",
        title: "Charcoal & Bioenergy",
        description: "Charcoal, briquettes, pellets and biofuels",
      },
      {
        id: "agarbatti",
        title: "Agarbatti & Incense Sticks",
        description: "Round bamboo sticks for agarbatti industry",
      },
      {
        id: "fashion",
        title: "Lifestyle & Fashion",
        description: "Bamboo fabric, accessories and gift items",
      },
    ],
  },
  {
    id: "letters",
    title: "Letters",
    items: [
      {
        id: "do-letter-aap",
        title: "DO Letter — Submission of AAP 2026-27 by State Bamboo Missions",
        description: "PDF · 220 KB · 02 Jun 2026",
      },
      {
        id: "empanelment-tc",
        title: "Letter — Empanelment of Tissue Culture Laboratories",
        description: "PDF · 310 KB",
      },
      {
        id: "mgnregs-advisory",
        title: "Advisory — Convergence with MGNREGS for bamboo plantations",
        description: "PDF · 290 KB",
      },
      {
        id: "qpr-format",
        title: "Letter — Quarterly Progress Reporting Format",
        description: "PDF · 180 KB",
      },
    ],
  },
  {
    id: "research-papers",
    title: "Research Papers",
    items: [
      {
        id: "bamboo-composites-construction",
        title: "Engineered Bamboo Composites for Affordable Rural Housing",
        description: "IPIRTI & NBM · 2025 · PDF",
      },
      {
        id: "tissue-culture-north-east",
        title: "Mass Propagation of Elite Bamboo Clones through Tissue Culture",
        description: "KFRI, Peechi · 2025 · PDF",
      },
      {
        id: "carbon-sequestration-plantations",
        title: "Carbon Sequestration Potential of NBM Plantations",
        description: "ICFRE · 2024 · PDF",
      },
      {
        id: "boucherie-treatment-efficacy",
        title: "Boucherie vs Pressure Treatment for Bamboo Preservation",
        description: "CBTC Guwahati · 2024 · PDF",
      },
      {
        id: "livelihood-cluster-model",
        title: "Cluster-based Livelihood Models for Bamboo Artisans",
        description: "NBM Evaluation Unit · 2024 · PDF",
      },
      {
        id: "agarbatti-value-chain",
        title: "Round Bamboo Stick Production for Agarbatti Industry",
        description: "NITRA · 2023 · PDF",
      },
    ],
  },
];
