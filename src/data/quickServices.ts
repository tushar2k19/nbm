import {
  BookOpen,
  ClipboardCheck,
  LayoutDashboard,
  Phone,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

export type QuickServiceItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  to: string;
  cta: string;
  accent: string;
  idleTint: string;
  highlight: string;
  ctaAccent: string;
  glow: string;
};

export const quickServices: QuickServiceItem[] = [
  {
    id: "farmerRegistration",
    icon: UserPlus,
    title: "Farmer Registration",
    desc: "Register as a bamboo grower or beneficiary under NBM schemes.",
    to: "/login",
    cta: "Enroll Now",
    accent: "oklch(0.46 0.12 150)",
    idleTint: "oklch(0.97 0.035 145)",
    highlight:
      "linear-gradient(152deg, oklch(0.48 0.12 150) 0%, oklch(0.56 0.14 145) 100%)",
    ctaAccent: "oklch(0.46 0.12 150)",
    glow: "oklch(0.48 0.12 150 / 0.35)",
  },
  {
    id: "applicationStatus",
    icon: ClipboardCheck,
    title: "Application Status",
    desc: "Track scheme application, nursery accreditation or tender status.",
    to: "/dashboard",
    cta: "Check Now",
    accent: "oklch(0.46 0.11 205)",
    idleTint: "oklch(0.97 0.03 200)",
    highlight:
      "linear-gradient(152deg, oklch(0.50 0.11 205) 0%, oklch(0.58 0.12 198) 100%)",
    ctaAccent: "oklch(0.44 0.11 205)",
    glow: "oklch(0.50 0.11 205 / 0.35)",
  },
  {
    id: "knowledgeCenter",
    icon: BookOpen,
    title: "Knowledge Center",
    desc: "Training modules, research papers, institutes and value-added products.",
    to: "/knowledge-center",
    cta: "Explore Now",
    accent: "oklch(0.48 0.16 285)",
    idleTint: "oklch(0.97 0.03 290)",
    highlight:
      "linear-gradient(152deg, oklch(0.52 0.15 285) 0%, oklch(0.60 0.17 290) 100%)",
    ctaAccent: "oklch(0.46 0.16 285)",
    glow: "oklch(0.52 0.15 285 / 0.38)",
  },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
    desc: "Interactive India map with state-wise bamboo mission data and KPIs.",
    to: "/dashboard",
    cta: "Open Dashboard",
    accent: "oklch(0.42 0.10 175)",
    idleTint: "oklch(0.97 0.028 175)",
    highlight:
      "linear-gradient(152deg, oklch(0.46 0.11 175) 0%, oklch(0.54 0.12 168) 100%)",
    ctaAccent: "oklch(0.40 0.10 175)",
    glow: "oklch(0.46 0.11 175 / 0.35)",
  },
  {
    id: "contactRti",
    icon: Phone,
    title: "Contact & RTI",
    desc: "Headquarters, state contacts, helpline and Right to Information.",
    to: "/contact/head-quarter",
    cta: "Get in Touch",
    accent: "oklch(0.50 0.14 350)",
    idleTint: "oklch(0.98 0.025 350)",
    highlight:
      "linear-gradient(152deg, oklch(0.56 0.14 350) 0%, oklch(0.66 0.16 355) 100%)",
    ctaAccent: "oklch(0.48 0.14 350)",
    glow: "oklch(0.56 0.14 350 / 0.35)",
  },
];
