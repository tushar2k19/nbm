export type RtiTableColumn = {
  key: string;
  label: string;
  className?: string;
};

export type RtiTableRow = Record<string, string | number>;

export type RtiListItem = {
  title: string;
  description: string;
  link?: { label: string; href: string };
};

export type RtiSchemeRow = {
  srNo: number;
  subScheme: string;
  targetGroup: string;
};

export type RtiOrgNode = {
  id: string;
  label: string;
  children?: RtiOrgNode[];
};

export type RtiSection =
  | {
      id: string;
      title: string;
      type: "text";
      paragraphs: string[];
      links?: { label: string; href: string }[];
    }
  | {
      id: string;
      title: string;
      type: "list";
      intro?: string;
      groups: { heading: string; items: RtiListItem[] }[];
    }
  | {
      id: string;
      title: string;
      type: "scheme";
      paragraphs: string[];
      rows: RtiSchemeRow[];
      links?: { label: string; href: string }[];
    }
  | {
      id: string;
      title: string;
      type: "table";
      columns: RtiTableColumn[];
      rows: RtiTableRow[];
    }
  | {
      id: string;
      title: string;
      type: "org-chart";
      intro?: string;
      root: RtiOrgNode;
    }
  | {
      id: string;
      title: string;
      type: "agency-list";
      rows: { srNo: number; name: string }[];
    };

export const rtiSections: RtiSection[] = [
  {
    id: "overview",
    title: "Overview of the Organization",
    type: "text",
    paragraphs: [
      "Bamboo is one of India's most versatile natural resources, supporting rural livelihoods, green infrastructure and a growing bioeconomy. India holds among the world's largest bamboo-bearing areas, with significant potential for plantation development, processing, value addition and market linkages.",
      "The National Bamboo Mission (NBM) was launched as a Centrally Sponsored Scheme during 2018-19 in restructured form, building on the earlier mission framework. It promotes holistic growth of the bamboo sector through an area-based, regionally differentiated strategy — connecting growers with industry and consumers via cluster-based approaches.",
      "The Mission is implemented in 26 States through dedicated State Bamboo Missions, with special emphasis on the North-Eastern region. NBM supports nurseries, plantations, primary processing units, artisan skilling, product development and market linkages — positioning bamboo as Green Gold for rural India.",
    ],
  },
  {
    id: "nbm-scheme",
    title: "Details of NBM Scheme",
    type: "scheme",
    paragraphs: [
      "The restructured National Bamboo Mission is a Centrally Sponsored Scheme under the Department of Agriculture and Farmers Welfare, Ministry of Agriculture and Farmers Welfare. The scheme is implemented through State Bamboo Missions with funding shared between the Centre and States as per standard CSS norms.",
      "The Mission adopts a cluster-based approach covering the complete bamboo value chain — from quality planting material and plantation development to primary processing, treatment, product manufacturing, skilling and market linkages. Special focus is given to the North-Eastern States, aspirational districts and bamboo-rich regions.",
      "Components include establishment of nurseries and tissue culture units, block and farm-level plantations, primary processing and treatment plants, bamboo artisan training, product development support, and brand promotion through retail outlets and e-marketing platforms.",
    ],
    rows: [
      {
        srNo: 1,
        subScheme: "Plantation Development",
        targetGroup: "Farmers, SHGs, FPOs, government and private landholders in implementing States/UTs",
      },
      {
        srNo: 2,
        subScheme: "Product Development & Processing",
        targetGroup: "Entrepreneurs, artisan clusters, cooperatives and processing units in bamboo clusters",
      },
      {
        srNo: 3,
        subScheme: "Skilling and Capacity Building",
        targetGroup: "Artisans, entrepreneurs, field functionaries and State Bamboo Mission staff",
      },
      {
        srNo: 4,
        subScheme: "Market Linkages and Brand Promotion",
        targetGroup: "Bamboo product manufacturers, retail outlets, e-marketing platforms and exporters",
      },
      {
        srNo: 5,
        subScheme: "Research, Innovation and Institutional Support",
        targetGroup: "Research institutions, KVKs, bamboo technology parks and accredited labs",
      },
    ],
    links: [
      { label: "Operational Guidelines 2025 (English)", href: "/guidelines" },
      { label: "Annual Action Plan Summary", href: "/reports" },
    ],
  },
  {
    id: "subordinate-offices",
    title: "List of Subordinate Offices and Partner Institutions under NBM",
    type: "list",
    intro:
      "The National Bamboo Mission coordinates with central institutions, State Bamboo Missions and partner organisations for scheme implementation, technical support and monitoring.",
    groups: [
      {
        heading: "Implementing Structure",
        items: [
          {
            title: "Bamboo Mission Cell, DA&FW",
            description:
              "The National Cell at Krishi Bhawan, New Delhi coordinates policy, fund release, monitoring and evaluation of NBM across all implementing States and UTs. It serves as the nodal point for guidelines, MIS reporting and stakeholder coordination.",
            link: { label: "Contact NBM Cell", href: "/contact/head-quarter" },
          },
          {
            title: "State Bamboo Missions (SBMs)",
            description:
              "Dedicated State-level missions in 26 States undertake planning, beneficiary selection, fund flow, physical progress monitoring and convergence with state schemes. Each SBM functions under the respective Department of Agriculture/Horticulture/Forestry.",
            link: { label: "State Dashboard", href: "/state-dashboard" },
          },
        ],
      },
      {
        heading: "Partner Institutions",
        items: [
          {
            title: "Indian Council of Forestry Research and Education (ICFRE)",
            description:
              "Provides technical support on bamboo species selection, plantation protocols, silvicultural practices and research on bamboo germplasm and productivity improvement.",
            link: { label: "www.icfre.gov.in", href: "https://icfre.gov.in" },
          },
          {
            title: "International Bamboo and Rattan Organisation (INBAR)",
            description:
              "NBM has signed an MoU with INBAR for international technology exchange, capacity building and best-practice sharing in bamboo processing and product development.",
            link: { label: "www.inbar.int", href: "https://inbar.int" },
          },
          {
            title: "Krishi Vigyan Kendras (KVKs) and Research Institutes",
            description:
              "A network of KVKs and agricultural universities support field demonstrations, farmer training, nursery quality assurance and adaptive research for region-specific bamboo cultivation.",
            link: { label: "Knowledge Centre", href: "/knowledge-center" },
          },
        ],
      },
    ],
  },
  {
    id: "organization-details",
    title: "Details of the Organization",
    type: "text",
    paragraphs: [
      "The Bamboo Mission Cell functions under the Department of Agriculture and Farmers Welfare, Ministry of Agriculture and Farmers Welfare, Government of India. The Cell is responsible for formulation of policy, preparation of operational guidelines, approval of annual action plans, release of central funds to States, and overall monitoring of the National Bamboo Mission.",
      "At the State level, State Bamboo Missions are constituted under the administrative control of respective State Governments. District Bamboo Committees support beneficiary identification, plantation verification and grassroots implementation. The Mission follows a three-tier monitoring framework — national, state and district — with progress reported through the NBM MIS portal.",
    ],
  },
  {
    id: "org-chart",
    title: "Organizational Chart — Bamboo Mission Cell",
    type: "org-chart",
    intro:
      "Administrative structure of the National Bamboo Mission Cell at the Department of Agriculture and Farmers Welfare, Krishi Bhawan, New Delhi.",
    root: {
      id: "hort-commissioner",
      label: "Horticulture Commissioner",
      children: [
        {
          id: "addl-commissioner",
          label: "Additional Commissioner",
          children: [
            {
              id: "section-officer",
              label: "Section Officer",
              children: [{ id: "sta", label: "Senior Technical Assistant" }],
            },
          ],
        },
      ],
    },
  },
  {
    id: "cpio-midh",
    title:
      "Central Public Information Officers and Appellate Authority under RTI Act, 2005 — Bamboo Mission Cell",
    type: "table",
    columns: [
      { key: "srNo", label: "S.No.", className: "w-12" },
      { key: "division", label: "Division" },
      { key: "cpio", label: "Name and designation of CPIO and e-mail ID" },
      { key: "subjects", label: "Subjects / Items of work allocated" },
      { key: "telephone", label: "Telephone (Landline / Mobile)" },
      { key: "appellate", label: "Appellate Authority, telephone and e-mail" },
    ],
    rows: [
      {
        srNo: 1,
        division: "NBM",
        cpio: "Sh. Amit Verma\nDeputy Secretary (NBM)\nnbm-cpio@gov.in",
        subjects:
          "National Bamboo Mission — Scheme implementation, guidelines, annual action plans, fund release to States, monitoring and evaluation, MIS portal, nursery accreditation, tissue culture lab empanelment, processing unit approvals, court cases and parliamentary matters related to NBM.",
        telephone: "011-2338-2651\n98765-43210",
        appellate:
          "Dr. Sunita Rao\nJoint Secretary (NBM)\n011-2338-2600\njs-nbm@gov.in",
      },
      {
        srNo: 2,
        division: "NBM — Plantation",
        cpio: "Sh. Rakesh Kumar\nUnder Secretary (Plantation)\nnbm-plantation@gov.in",
        subjects:
          "Plantation development component — block and farm-level plantations, nursery establishment, quality planting material, beneficiary selection norms, geo-tagging and physical verification protocols.",
        telephone: "011-2338-2652",
        appellate:
          "Sh. Amit Verma\nDeputy Secretary (NBM)\n011-2338-2651\nnbm-cpio@gov.in",
      },
      {
        srNo: 3,
        division: "NBM — Processing",
        cpio: "Ms. Priya Nair\nUnder Secretary (Processing)\nnbm-processing@gov.in",
        subjects:
          "Product development and processing units — primary processing, treatment plants, artisan clusters, skilling programmes, market linkage initiatives and bamboo technology park coordination.",
        telephone: "011-2338-2653",
        appellate:
          "Sh. Amit Verma\nDeputy Secretary (NBM)\n011-2338-2651\nnbm-cpio@gov.in",
      },
    ],
  },
  {
    id: "cpio-autonomous",
    title:
      "Details of CPIOs and Appellate Authority of Partner Institutions and State Nodal Agencies",
    type: "table",
    columns: [
      { key: "srNo", label: "S.No.", className: "w-12" },
      { key: "body", label: "Name of Institution / Agency" },
      { key: "cpio", label: "CPIO" },
      { key: "appellate", label: "Appellate Authority" },
      { key: "contact", label: "Contact Details" },
    ],
    rows: [
      {
        srNo: 1,
        body: "Assam State Bamboo Mission",
        cpio: "Sh. Diganta Bora\nDirector, SBM Assam",
        appellate: "Sh. Rajesh Das\nPrincipal Secretary (Agriculture)",
        contact: "0361-254-3200\nsbm-assam@gov.in",
      },
      {
        srNo: 2,
        body: "Tripura State Bamboo Mission",
        cpio: "Ms. Ananya Deb\nDirector, SBM Tripura",
        appellate: "Sh. Manik Sarkar\nSecretary (Agriculture)",
        contact: "0381-232-4500\nsbm-tripura@gov.in",
      },
      {
        srNo: 3,
        body: "Karnataka State Bamboo Mission",
        cpio: "Sh. Venkatesh M.\nDirector, SBM Karnataka",
        appellate: "Dr. Kavitha Reddy\nAdditional Chief Secretary",
        contact: "080-222-1180\nsbm-karnataka@gov.in",
      },
      {
        srNo: 4,
        body: "Madhya Pradesh State Bamboo Mission",
        cpio: "Sh. Arjun Patel\nDirector, SBM MP",
        appellate: "Sh. Vikram Singh\nPrincipal Secretary (Agriculture)",
        contact: "0755-244-1200\nsbm-mp@gov.in",
      },
      {
        srNo: 5,
        body: "ICFRE — Bamboo Research Division",
        cpio: "Dr. Meera Joshi\nScientist In-Charge",
        appellate: "Dr. R.P. Singh\nDirector General, ICFRE",
        contact: "0135-275-5275\nbamboo@icfre.gov.in",
      },
    ],
  },
  {
    id: "national-agencies",
    title: "State Bamboo Missions and Implementing Agencies",
    type: "agency-list",
    rows: [
      { srNo: 1, name: "Assam State Bamboo Mission, Guwahati" },
      { srNo: 2, name: "Arunachal Pradesh State Bamboo Mission, Itanagar" },
      { srNo: 3, name: "Manipur State Bamboo Mission, Imphal" },
      { srNo: 4, name: "Meghalaya State Bamboo Mission, Shillong" },
      { srNo: 5, name: "Mizoram State Bamboo Mission, Aizawl" },
      { srNo: 6, name: "Nagaland State Bamboo Mission, Kohima" },
      { srNo: 7, name: "Tripura State Bamboo Mission, Agartala" },
      { srNo: 8, name: "Sikkim State Bamboo Mission, Gangtok" },
      { srNo: 9, name: "Karnataka State Bamboo Mission, Bengaluru" },
      { srNo: 10, name: "Kerala State Bamboo Mission, Thiruvananthapuram" },
      { srNo: 11, name: "Madhya Pradesh State Bamboo Mission, Bhopal" },
      { srNo: 12, name: "Maharashtra State Bamboo Mission, Mumbai" },
      { srNo: 13, name: "Odisha State Bamboo Mission, Bhubaneswar" },
      { srNo: 14, name: "Tamil Nadu State Bamboo Mission, Chennai" },
      { srNo: 15, name: "Telangana State Bamboo Mission, Hyderabad" },
      { srNo: 16, name: "Uttarakhand State Bamboo Mission, Dehradun" },
      { srNo: 17, name: "Uttar Pradesh State Bamboo Mission, Lucknow" },
      { srNo: 18, name: "West Bengal State Bamboo Mission, Kolkata" },
      { srNo: 19, name: "Gujarat State Bamboo Mission, Gandhinagar" },
      { srNo: 20, name: "Jharkhand State Bamboo Mission, Ranchi" },
      { srNo: 21, name: "Chhattisgarh State Bamboo Mission, Raipur" },
      { srNo: 22, name: "Bamboo Mission Cell, DA&FW, Krishi Bhawan, New Delhi" },
      { srNo: 23, name: "ICFRE — Forest Research Institute, Dehradun" },
    ],
  },
];

export type RtiActLink = {
  id: string;
  label: string;
  href: string;
  description: string;
  source: string;
};

export const rtiActLinks: RtiActLink[] = [
  {
    id: "rti-act",
    label: "RTI Act, 2005 — Official Gazette",
    href: "https://rti.dopt.gov.in/Writereaddata/RTI-Act.pdf",
    description:
      "The Right to Information Act, 2005 (Act No. 22 of 2005) — official English text as published in the Gazette of India, Extraordinary, Part II, 21 June 2005.",
    source: "Department of Personnel & Training · rti.dopt.gov.in",
  },
  {
    id: "suo-motu",
    label: "Guidelines for suo motu disclosure under Section 4",
    href: "https://documents.doptcirculars.nic.in/D2/D02rti/Suo_moto_disclosure-15042013.pdf",
    description:
      "DoPT O.M. No. 1/6/2011-IR (15 April 2013) — guidelines for proactive disclosure under Section 4(1)(b), 4(2) and 4(3) of the RTI Act, 2005.",
    source: "documents.doptcirculars.nic.in",
  },
  {
    id: "rti-portal",
    label: "Online RTI Portal — rti.gov.in",
    href: "https://rti.gov.in/",
    description:
      "National Portal on Right to Information — PIO/AA directories, RTI Act & Rules, circulars, and gateway to file applications at rtionline.gov.in.",
    source: "Ministry of Personnel, Public Grievances & Pensions",
  },
];

/** Supplementary official RTI references (sidebar / footer) */
export const rtiSupplementaryLinks = [
  {
    label: "RTI Act, 2005 (Amended) — English PDF",
    href: "https://rti.dopt.gov.in/Writereaddata/RTI%20Act,%202005%20(Amended)-English%20Version.PDF",
  },
  {
    label: "RTI Rules, 2019",
    href: "https://documents.doptcirculars.nic.in/D2/D02rti/RTI_Rules_2019.pdf",
  },
  {
    label: "Suo motu disclosure — compliance guidelines (Sept 2022)",
    href: "https://documents.doptcirculars.nic.in/D2/D02rti/14%20sept%202022Btbp6.pdf",
  },
  {
    label: "File RTI application online — rtionline.gov.in",
    href: "https://rtionline.gov.in/",
  },
  {
    label: "DoPT RTI circulars & OMs",
    href: "https://doptcirculars.nic.in/Default.aspx?URL=e0joY8Gw069R",
  },
];
