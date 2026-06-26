import type { LucideIcon } from "lucide-react";
import {
  BarChart2,
  Map,
  Users,
  Building2,
  Monitor,
  UserCircle,
  MapPin,
  Scale,
  LayoutDashboard,
} from "lucide-react";

export type NavMegaMenuId = "dashboard" | "login" | "contact";

export type NavMegaMenuItem = {
  id: string;
  label: string;
  to: string;
  hash?: string;
  description: string;
  icon: LucideIcon;
};

export type NavMegaMenuConfig = {
  id: NavMegaMenuId;
  exploreAll: { to: string; label: string };
  items: NavMegaMenuItem[];
};

export const navMegaMenus: Record<NavMegaMenuId, NavMegaMenuConfig> = {
  dashboard: {
    id: "dashboard",
    exploreAll: { to: "/dashboard", label: "Open dashboard hub" },
    items: [
      {
        id: "analytics",
        label: "Analytics",
        to: "/dashboard",
        description:
          "National-level analytics on plantation progress, fund utilisation, nurseries and processing units under NBM.",
        icon: BarChart2,
      },
      {
        id: "state-dashboard",
        label: "State Dashboard",
        to: "/state-dashboard",
        description:
          "State-wise performance dashboards for implementing States and UTs — physical and financial achievements.",
        icon: Map,
      },
      {
        id: "beneficiary",
        label: "Beneficiary Dashboard",
        to: "/beneficiary-dashboard",
        description:
          "Track beneficiary applications, subsidy status and scheme-wise disbursement for farmers and entrepreneurs.",
        icon: Users,
      },
    ],
  },
  login: {
    id: "login",
    exploreAll: { to: "/login", label: "Go to login portal" },
    items: [
      {
        id: "state-login",
        label: "State Login",
        to: "/login",
        hash: "state",
        description:
          "Secure login for State Bamboo Mission officials to submit AAPs, progress reports and fund utilisation statements.",
        icon: Building2,
      },
      {
        id: "mis-login",
        label: "MIS Login",
        to: "/mis-login",
        description:
          "Management Information System portal for data entry, monitoring and reporting by NBM field functionaries.",
        icon: Monitor,
      },
      {
        id: "beneficiary-login",
        label: "Beneficiary Login",
        to: "/login",
        hash: "beneficiary",
        description:
          "Login for farmers, artisans and entrepreneurs to track application status and beneficiary records.",
        icon: UserCircle,
      },
    ],
  },
  contact: {
    id: "contact",
    exploreAll: { to: "/contact/head-quarter", label: "View all contacts" },
    items: [
      {
        id: "head-quarter",
        label: "Head Quarter",
        to: "/contact/head-quarter",
        description:
          "Official directory of NBM headquarters staff at Krishi Bhawan and Shastri Bhawan, New Delhi.",
        icon: Building2,
      },
      {
        id: "state",
        label: "State",
        to: "/contact/state",
        description:
          "State Mission Directors, nodal officers and concerned staff across all implementing States and UTs.",
        icon: MapPin,
      },
      {
        id: "rti",
        label: "RTI",
        to: "/rti",
        description:
          "Right to Information disclosures, CPIO details and proactive information under RTI Act, 2005.",
        icon: Scale,
      },
    ],
  },
};

export const navMegaMenuIcons: Record<NavMegaMenuId, LucideIcon> = {
  dashboard: LayoutDashboard,
  login: UserCircle,
  contact: Building2,
};
