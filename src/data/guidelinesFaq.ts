export type FaqCategory = "mission" | "portal" | "schemes" | "support";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: "mission", label: "About NBM" },
  { id: "portal", label: "This Portal" },
  { id: "schemes", label: "Schemes & Benefits" },
  { id: "support", label: "Help & Contact" },
];

export const guidelinesFaq: FaqItem[] = [
  {
    id: "what-is-nbm",
    category: "mission",
    question: "What is the National Bamboo Mission (NBM)?",
    answer:
      "The National Bamboo Mission is a Centrally Sponsored Scheme of the Government of India, restructured in 2018–19, to promote the holistic development of the bamboo sector. It focuses on plantation development, nurseries, primary processing, product development, skilling and market linkages — connecting farmers, artisans and entrepreneurs across the value chain.",
  },
  {
    id: "who-implements",
    category: "mission",
    question: "Which States implement NBM and who coordinates the Mission?",
    answer:
      "NBM is implemented in 26 States and Union Territories through State Bamboo Missions, with special emphasis on the North-Eastern region. The National Cell at Krishi Bhawan, New Delhi — under the Department of Agriculture and Farmers Welfare — coordinates policy, guidelines, fund release, monitoring and MIS reporting.",
  },
  {
    id: "portal-purpose",
    category: "portal",
    question: "What can I find on this NBM portal?",
    answer:
      "This portal is the official information and service hub for the National Bamboo Mission. You can browse operational guidelines and downloadable documents, view national and state dashboards, access the Knowledge Center (training modules, institutes, research papers), check tenders and vacancies, read news updates, and reach headquarters or state contact points.",
  },
  {
    id: "download-documents",
    category: "portal",
    question: "How do I download guidelines, circulars and annexures?",
    answer:
      "Open Guidelines & Documents from the main menu. Documents are grouped under NBM Guidelines, State Bamboo Policies, Release of Funds and Letters. Click any document card to download a PDF. You can also jump to a specific document from the Guidelines mega menu in the header.",
  },
  {
    id: "dashboard-access",
    category: "portal",
    question: "How do I view plantation progress and scheme statistics?",
    answer:
      "Use Dashboard in the navigation to open the Analytics hub with national-level KPIs, maps and charts on plantation area, nurseries, fund utilisation and processing units. For state-wise achievements, open State Dashboard from the Dashboard menu or visit /state-dashboard directly.",
  },
  {
    id: "who-can-benefit",
    category: "schemes",
    question: "Who can benefit from NBM schemes?",
    answer:
      "Farmers, FPOs, cooperatives, entrepreneurs, artisans, SHGs, nurseries, tissue culture labs, processing units and State implementing agencies can participate under approved components. Eligibility, subsidy ceilings and application formats are defined in the operational guidelines and cost norms published on this portal.",
  },
  {
    id: "plantation-subsidy",
    category: "schemes",
    question: "What support is available for bamboo plantation and nurseries?",
    answer:
      "NBM supports block, bund and farm-level plantations on government and private lands, along with establishment and strengthening of bamboo nurseries and accredited tissue culture units. Subsidy patterns and unit costs are specified in the Revised Cost Norms document. States prepare Annual Action Plans (AAPs) and release benefits through their State Bamboo Missions.",
  },
  {
    id: "state-vs-mis-login",
    category: "schemes",
    question: "What is the difference between State Login and MIS Login?",
    answer:
      "State Login is for State Bamboo Mission officials to submit Annual Action Plans, progress reports and fund utilisation statements. MIS Login is for field functionaries and data operators who enter monitoring data into the Management Information System. Both are available under Login in the header; access is restricted to authorised government users.",
  },
  {
    id: "training-resources",
    category: "support",
    question: "Where can I find training modules and technical knowledge?",
    answer:
      "Visit Knowledge Center in the main menu for training modules, partner institutes, value-added product catalogues and research papers. Official DO letters are under Guidelines & Documents. Training content supports farmers, artisans and entrepreneurs on cultivation, harvesting, processing and enterprise development.",
  },
  {
    id: "contact-helpline",
    category: "support",
    question: "How do I contact NBM for scheme or portal-related queries?",
    answer:
      "For general queries, call the Kisan Call Centre & NBM Helpline at 1800-180-1551 (Mon–Fri, 9 AM – 6 PM IST) or email nbm-agri@gov.in. For headquarters and state office addresses, use Contact in the navigation. RTI-related disclosures are available on the RTI page; formal RTI applications must be filed with the concerned CPIO as per the RTI Act, 2005.",
  },
];

export function faqByCategory(category: FaqCategory | "all") {
  if (category === "all") return guidelinesFaq;
  return guidelinesFaq.filter((item) => item.category === category);
}
