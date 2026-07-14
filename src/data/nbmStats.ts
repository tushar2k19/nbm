import { IMPLEMENTING_STATE_COUNT } from "@/data/bambooStateStats";

export type NbmStatIcon = "area" | "states" | "nursery" | "funds" | "map";

export type NbmStatLink = {
  to: "/dashboard";
  hash?: string;
};

export type NbmStatItem = {
  id: string;
  label: string;
  icon: NbmStatIcon;
  /** Numeric stat cards */
  value?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Link cards (e.g. India map) */
  link?: NbmStatLink;
  headline?: string;
  sublabel?: string;
};

export const nbmImpactStats: NbmStatItem[] = [
  {
    id: "bearing-area",
    value: 13.96,
    decimals: 2,
    suffix: " mn ha",
    label: "Bamboo bearing area",
    icon: "area",
  },
  {
    id: "states",
    value: IMPLEMENTING_STATE_COUNT,
    decimals: 0,
    suffix: " States",
    label: "Implementing NBM",
    icon: "states",
  },
  {
    id: "nurseries",
    value: 1200,
    decimals: 0,
    suffix: "+",
    label: "Nurseries established",
    icon: "nursery",
  },
  {
    id: "funds",
    value: 1290,
    decimals: 0,
    prefix: "₹",
    suffix: " Cr",
    label: "Funds released (since 2018–19)",
    icon: "funds",
  },
  {
    id: "india-map",
    icon: "map",
    headline: "State Analytics",
    label: "India Bamboo Map",
    sublabel: `${IMPLEMENTING_STATE_COUNT} implementing States · FY 2025-26`,
    link: { to: "/dashboard", hash: "map" },
  },
];
