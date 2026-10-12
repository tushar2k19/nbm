import type { NavMegaMenuId } from "@/data/navMegaMenus";

export type MegaMenuType =
  | "guidelines"
  | "knowledge-center"
  | "reports"
  | "portal"
  | NavMegaMenuId;

export type NavItem = {
  to: string;
  labelKey: string;
  megaMenu?: MegaMenuType;
  menuAnchor?: "start" | "end";
};

export const navItems: NavItem[] = [
  { to: "/", labelKey: "nav.home" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/guidelines", labelKey: "nav.guidelines", megaMenu: "guidelines" },
  { to: "/gallery", labelKey: "nav.gallery" },
  { to: "/knowledge-center", labelKey: "nav.knowledgeCenter", megaMenu: "knowledge-center" },
  { to: "/reports", labelKey: "nav.reports", megaMenu: "reports" },
  { to: "/tenders-vacancies", labelKey: "nav.tenders" },
  { to: "/rti", labelKey: "nav.rti" },
  { to: "/dashboard", labelKey: "nav.dashboard", megaMenu: "dashboard", menuAnchor: "end" },
  { to: "/login", labelKey: "nav.login", megaMenu: "login", menuAnchor: "end" },
  { to: "/contact/head-quarter", labelKey: "nav.contact", megaMenu: "contact", menuAnchor: "end" },
];
