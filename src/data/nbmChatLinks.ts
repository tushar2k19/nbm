import type { LucideIcon } from "lucide-react";
import {
  FileText,
  BookOpen,
  BarChart3,
  LayoutDashboard,
  Map,
  Phone,
  Building2,
  Scale,
  Scale,
  Newspaper,
  Briefcase,
  GraduationCap,
  UserPlus,
  Package,
  Info,
  Sparkles,
  Users,
  MapPin,
} from "lucide-react";

export type NbmChatLink = {
  label: string;
  to: string;
  icon: LucideIcon;
  /** Lower-cased keywords/phrases that map a reply to this page. */
  keywords: string[];
};

/**
 * Registry of portal pages with the keywords that should surface them as
 * "Open page" buttons under a Bamboo Mitra reply. Ordered roughly by how
 * commonly they are referenced. Keep keywords lower-case.
 */
export const NBM_CHAT_LINKS: NbmChatLink[] = [
  {
    label: "Enabling Provisions",
    to: "/guidelines/enabling-provisions",
    icon: Scale,
    keywords: [
      "enabling provision",
      "enabling provisions",
      "regulatory barrier",
      "felling transit",
      "pan india transit",
      "agarbatti import",
      "forest act bamboo",
      "bamboo license",
      "assam forest regulation",
      "tripura forest transit",
    ],
  },
  {
    label: "Guidelines & Documents",
    to: "/guidelines",
    icon: FileText,
    keywords: [
      "guideline",
      "guidelines 2025",
      "operational guideline",
      "cost norm",
      "subsidy pattern",
      "annexure",
      "application format",
      "sanction format",
      "revised guideline",
      "credit linked",
      "back ended",
      "back-ended",
      "policy document",
      "pdf",
    ],
  },
  {
    label: "Knowledge Center",
    to: "/knowledge-center",
    icon: BookOpen,
    keywords: [
      "knowledge center",
      "knowledge centre",
      "training",
      "tutorial",
      "circular",
      "letter",
      "tissue culture lab",
      "empanelment",
      "agarbatti",
      "incense",
      "stick making",
      "value added product",
      "value-added",
      "species",
    ],
  },
  {
    label: "Success Stories",
    to: "/success-stories",
    icon: Sparkles,
    keywords: [
      "success story",
      "success stories",
      "farmer story",
      "gadchiroli",
      "agarbatti project",
      "sbda assam",
      "baihar",
      "madhya pradesh bamboo",
      "maharashtra bamboo",
      "video story",
      "documentary",
    ],
  },
  {
    label: "Reports & AAP",
    to: "/reports",
    icon: BarChart3,
    keywords: [
      "report",
      "annual action plan",
      "aap",
      "progress report",
      "quarterly",
      "fund release",
      "fund utilisation",
      "utilization",
    ],
  },
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
    keywords: [
      "dashboard",
      "statistics",
      "kpi",
      "interactive map",
      "achievement",
      "bearing area",
      "national data",
    ],
  },
  {
    label: "State Dashboard",
    to: "/state-dashboard",
    icon: Map,
    keywords: ["state dashboard", "state-wise", "state wise", "state performance"],
  },
  {
    label: "State Login",
    to: "/login",
    icon: UserPlus,
    keywords: [
      "login",
      "state login",
      "mis portal",
      "mis login",
      "officer login",
      "sign in",
    ],
  },
  {
    label: "Partner Institutes",
    to: "/institutes",
    icon: GraduationCap,
    keywords: [
      "institute",
      "icfre",
      "cbtc",
      "ipirti",
      "kfri",
      "inbar",
      "bcdi",
      "nerist",
      "research institute",
      "partner",
    ],
  },
  {
    label: "Products",
    to: "/products",
    icon: Package,
    keywords: ["product", "handicraft", "furniture", "charcoal", "flooring", "marketplace"],
  },
  {
    label: "RTI",
    to: "/rti",
    icon: Scale,
    keywords: ["rti", "right to information", "cpio", "disclosure"],
  },
  {
    label: "Tenders / Vacancies",
    to: "/tenders-vacancies",
    icon: Briefcase,
    keywords: ["tender", "vacancy", "vacancies", "recruitment", "job", "bid"],
  },
  {
    label: "News & Updates",
    to: "/news",
    icon: Newspaper,
    keywords: ["news", "update", "notification", "announcement", "mela", "event"],
  },
  {
    label: "Head Quarter Contacts",
    to: "/contact/head-quarter",
    icon: Building2,
    keywords: [
      "head quarter",
      "headquarter",
      "krishi bhawan",
      "bamboo mission cell",
      "nodal office",
    ],
  },
  {
    label: "Who's Who",
    to: "/contact/whos-who",
    icon: Users,
    keywords: [
      "who's who",
      "whos who",
      "directory",
      "officials",
      "minister",
      "secretary",
      "horticulture commissioner",
    ],
  },
  {
    label: "State Mission",
    to: "/knowledge-center/state-mission",
    icon: Map,
    keywords: [
      "state mission",
      "state bamboo mission",
      "slec",
      "nodal department",
      "planting material",
      "bamboo harvested",
      "state wise mission",
    ],
  },
  {
    label: "Structure of NBM",
    to: "/contact/structure",
    icon: Building2,
    keywords: [
      "structure",
      "nbm structure",
      "executive committee",
      "ec",
      "nbmc",
      "btsg",
      "bda",
      "slec",
      "governance",
      "organisational structure",
    ],
  },
  {
    label: "State Contacts",
    to: "/contact/state",
    icon: Phone,
    keywords: [
      "state contact",
      "state bamboo mission",
      "sbm",
      "state mission director",
      "nodal officer",
      "helpline",
      "contact your state",
    ],
  },
  {
    label: "About NBM",
    to: "/about",
    icon: Info,
    keywords: ["about nbm", "about the mission", "mission overview", "what is nbm", "objective"],
  },
  {
    label: "Implementing States",
    to: "/implementing-states",
    icon: MapPin,
    keywords: [
      "implementing states",
      "state map",
      "which states",
      "nbm states",
      "state bamboo mission",
      "26 states",
    ],
  },
  {
    label: "Gallery",
    to: "/gallery",
    icon: Images,
    keywords: ["gallery", "photo", "image", "picture", "video gallery", "video", "film"],
  },
];

/**
 * Returns up to `limit` portal pages relevant to a bot reply, ranked by the
 * number of keyword hits. Used to render "Open page" buttons under a message.
 */
export function findRelevantLinks(text: string, limit = 3): NbmChatLink[] {
  if (!text) return [];
  const haystack = text.toLowerCase();

  const scored = NBM_CHAT_LINKS.map((link) => {
    let score = 0;
    for (const kw of link.keywords) {
      if (haystack.includes(kw)) score += 1;
    }
    // Boost when the page label itself is mentioned.
    if (haystack.includes(link.label.toLowerCase())) score += 2;
    // Boost when the route path is mentioned directly (e.g. "/guidelines").
    if (haystack.includes(link.to)) score += 3;
    return { link, score };
  }).filter((entry) => entry.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((entry) => entry.link);
}
