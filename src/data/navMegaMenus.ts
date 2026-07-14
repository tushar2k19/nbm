import type { LucideIcon } from "lucide-react";
import {
  BarChart2,
  Map,
  Building2,
  GitBranch,
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
    ],
  },
  contact: {
    id: "contact",
    exploreAll: { to: "/contact/head-quarter", label: "View all contacts" },
    items: [
      {
        id: "head-quarter",
        label: "HQ",
        to: "/contact/head-quarter",
        description:
          "Official directory of National Bamboo Mission Cell (NBMC) officials at Krishi Bhawan and Shastri Bhawan, New Delhi.",
        icon: Building2,
      },
      /* Who's Who hidden — officials shown on HQ table instead
      {
        id: "whos-who",
        label: "Who's Who",
        to: "/contact/whos-who",
        description:
          "NBM-scoped official directory — ministry oversight, horticulture division leadership and NBMC functionaries.",
        icon: Users,
      },
      */
      {
        id: "state",
        label: "State",
        to: "/contact/state",
        description:
          "State Mission Directors, nodal officers and concerned staff across all implementing States and UTs.",
        icon: MapPin,
      },
      {
        id: "structure",
        label: "NBM Structure",
        to: "/contact/structure",
        description:
          "National, State and District governance framework — Executive Committee, NBMC, BTSG, SLEC and BDA.",
        icon: GitBranch,
      },
    ],
  },
};

export const navMegaMenuIcons: Record<NavMegaMenuId, LucideIcon> = {
  dashboard: LayoutDashboard,
  login: UserCircle,
  contact: Building2,
};
