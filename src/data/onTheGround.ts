import {
  Factory,
  IndianRupee,
  MapPin,
  Palette,
  TreePine,
  Users,
  Leaf,
  Mountain,
  Store,
  ShoppingBag,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import processingImg from "@/assets/bamboo-processing.jpg";
import agarbattiImg from "@/assets/bamboo-agarbatti.jpg";
import artisanImg from "@/assets/bamboo-artisan.jpg";
import farmerImg from "@/assets/bamboo-farmer.jpg";
import productsImg from "@/assets/bamboo-products.jpg";
import plantationImg from "@/assets/bamboo-plantation.jpg";
import northeastImg from "@/assets/bamboo-northeast.jpg";
import { nbmImpactStats } from "@/data/nbmStats";

export type OnTheGroundTileKind = "metric" | "map" | "image" | "gallery";

export type OnTheGroundTile = {
  id: string;
  kind: OnTheGroundTileKind;
  icon: LucideIcon;
  image?: string;
  imageAlt?: string;
  to?: string;
  hash?: string;
  accent: string;
  idleTint: string;
  highlight: string;
  glow: string;
  ctaAccent: string;
  statValue?: number | string;
  statSuffix?: string;
  statPrefix?: string;
  gridClass: string;
};

const metricThemes: Record<
  string,
  Pick<OnTheGroundTile, "accent" | "idleTint" | "highlight" | "glow" | "ctaAccent" | "icon" | "gridClass">
> = {
  "bearing-area": {
    icon: Leaf,
    accent: "oklch(0.55 0.14 55)",
    idleTint: "oklch(0.98 0.03 65)",
    highlight:
      "linear-gradient(152deg, oklch(0.58 0.13 50) 0%, oklch(0.68 0.12 62) 100%)",
    ctaAccent: "oklch(0.48 0.12 52)",
    glow: "oklch(0.62 0.14 55 / 0.35)",
    gridClass: "otg-tile--bearing-area",
  },
  states: {
    icon: MapPin,
    accent: "oklch(0.52 0.15 145)",
    idleTint: "oklch(0.97 0.035 145)",
    highlight:
      "linear-gradient(152deg, oklch(0.48 0.14 145) 0%, oklch(0.56 0.16 140) 100%)",
    ctaAccent: "oklch(0.46 0.14 145)",
    glow: "oklch(0.48 0.14 145 / 0.35)",
    gridClass: "otg-tile--states",
  },
  nurseries: {
    icon: Flower2,
    accent: "oklch(0.48 0.14 148)",
    idleTint: "oklch(0.97 0.035 148)",
    highlight:
      "linear-gradient(152deg, oklch(0.44 0.13 148) 0%, oklch(0.56 0.15 142) 100%)",
    ctaAccent: "oklch(0.42 0.13 148)",
    glow: "oklch(0.48 0.14 148 / 0.38)",
    gridClass: "otg-tile--nurseries",
  },
  funds: {
    icon: IndianRupee,
    accent: "oklch(0.45 0.20 290)",
    idleTint: "oklch(0.97 0.03 290)",
    highlight:
      "linear-gradient(152deg, oklch(0.52 0.15 285) 0%, oklch(0.60 0.17 290) 100%)",
    ctaAccent: "oklch(0.46 0.16 285)",
    glow: "oklch(0.52 0.15 285 / 0.38)",
    gridClass: "otg-tile--funds",
  },
};

const metricIdMap: Record<string, string> = {
  "bearing-area": "bearingArea",
  states: "states",
  nurseries: "nurseries",
  funds: "funds",
};

const dashboardMetricHashes: Record<string, string> = {
  "bearing-area": "area",
  states: "states",
};

const metricSpecialRoutes: Record<string, { to: string; hash?: string }> = {
  nurseries: { to: "/accredited-nursery" },
  funds: { to: "/reports" },
};

function metricTilesFromStats(): OnTheGroundTile[] {
  return nbmImpactStats
    .filter((s) => s.icon !== "map" && s.value !== undefined)
    .map((stat) => {
      const theme = metricThemes[stat.id];
      const displayValue =
        stat.decimals !== undefined
          ? stat.value!.toFixed(stat.decimals)
          : String(stat.value);

      const special = metricSpecialRoutes[stat.id];
      return {
        id: metricIdMap[stat.id] ?? stat.id,
        kind: "metric" as const,
        icon: theme.icon,
        to: special ? special.to : "/dashboard",
        ...(special?.hash
          ? { hash: special.hash }
          : !special && dashboardMetricHashes[stat.id]
            ? { hash: dashboardMetricHashes[stat.id] }
            : {}),
        accent: theme.accent,
        idleTint: theme.idleTint,
        highlight: theme.highlight,
        ctaAccent: theme.ctaAccent,
        glow: theme.glow,
        statValue: displayValue,
        statPrefix: stat.prefix,
        statSuffix: stat.suffix,
        gridClass: theme.gridClass,
      };
    });
}

export const onTheGroundTiles: OnTheGroundTile[] = [
  {
    id: "stateMap",
    kind: "map",
    icon: MapPin,
    to: "/dashboard",
    hash: "map",
    accent: "oklch(0.50 0.16 220)",
    idleTint: "oklch(0.96 0.03 220)",
    highlight:
      "linear-gradient(152deg, oklch(0.38 0.12 220) 0%, oklch(0.48 0.14 210) 100%)",
    ctaAccent: "oklch(0.40 0.12 220)",
    glow: "oklch(0.50 0.14 220 / 0.38)",
    gridClass: "otg-tile--featured",
  },

  ...metricTilesFromStats(),

  {
    id: "processing",
    kind: "image",
    icon: Factory,
    image: processingImg,
    imageAlt: "Modern bamboo processing unit in India",
    to: "/products",
    accent: "oklch(0.48 0.20 250)",
    idleTint: "oklch(0.97 0.03 250)",
    highlight:
      "linear-gradient(152deg, oklch(0.50 0.18 250) 0%, oklch(0.58 0.20 255) 100%)",
    ctaAccent: "oklch(0.44 0.18 250)",
    glow: "oklch(0.50 0.18 250 / 0.35)",
    gridClass: "otg-tile--map",
  },

  {
    id: "valueAdded",
    kind: "image",
    icon: ShoppingBag,
    image: agarbattiImg,
    imageAlt: "Bamboo agarbatti incense stick production unit",
    to: "/agarbatti-stick",
    accent: "oklch(0.68 0.16 78)",
    idleTint: "oklch(0.98 0.03 75)",
    highlight:
      "linear-gradient(152deg, oklch(0.65 0.17 72) 0%, oklch(0.78 0.14 88) 100%)",
    ctaAccent: "oklch(0.56 0.15 74)",
    glow: "oklch(0.70 0.16 78 / 0.35)",
    gridClass: "otg-tile--cultivation",
  },
  {
    id: "artisan",
    kind: "image",
    icon: Palette,
    image: artisanImg,
    imageAlt: "Bamboo artisan crafting products",
    to: "/success-stories",
    accent: "oklch(0.52 0.14 40)",
    idleTint: "oklch(0.98 0.025 45)",
    highlight:
      "linear-gradient(152deg, oklch(0.52 0.13 38) 0%, oklch(0.62 0.12 48) 100%)",
    ctaAccent: "oklch(0.46 0.12 38)",
    glow: "oklch(0.55 0.13 40 / 0.35)",
    gridClass: "otg-tile--artisan",
  },
  {
    id: "markets",
    kind: "image",
    icon: Store,
    image: productsImg,
    imageAlt: "Bamboo products at market linkage outlets",
    to: "/knowledge-center",
    hash: "value-added-products",
    accent: "oklch(0.48 0.18 280)",
    idleTint: "oklch(0.97 0.03 280)",
    highlight:
      "linear-gradient(152deg, oklch(0.50 0.16 280) 0%, oklch(0.58 0.18 285) 100%)",
    ctaAccent: "oklch(0.44 0.16 280)",
    glow: "oklch(0.50 0.16 280 / 0.38)",
    gridClass: "otg-tile--markets",
  },

  {
    id: "northeast",
    kind: "gallery",
    icon: Mountain,
    image: northeastImg,
    imageAlt: "Bamboo cultivation and field stories across India",
    to: "/gallery",
    accent: "oklch(0.46 0.15 204)",
    idleTint: "oklch(0.97 0.03 204)",
    highlight:
      "linear-gradient(152deg, oklch(0.38 0.14 210) 0%, oklch(0.50 0.16 200) 100%)",
    ctaAccent: "oklch(0.40 0.13 208)",
    glow: "oklch(0.46 0.15 204 / 0.38)",
    gridClass: "otg-tile--northeast",
  },
  {
    id: "plantation",
    kind: "gallery",
    icon: TreePine,
    image: plantationImg,
    imageAlt: "Farm and block-level bamboo plantations under NBM",
    to: "/plantation",
    accent: "oklch(0.50 0.15 145)",
    idleTint: "oklch(0.97 0.035 145)",
    highlight:
      "linear-gradient(152deg, oklch(0.46 0.14 145) 0%, oklch(0.56 0.16 140) 100%)",
    ctaAccent: "oklch(0.44 0.14 145)",
    glow: "oklch(0.48 0.14 145 / 0.35)",
    gridClass: "otg-tile--plantation",
  },
  {
    id: "farmer",
    kind: "image",
    icon: Users,
    image: farmerImg,
    imageAlt: "Bamboo farmer in plantation",
    to: "/dashboard",
    hash: "beneficiaries",
    accent: "oklch(0.58 0.16 55)",
    idleTint: "oklch(0.98 0.025 55)",
    highlight:
      "linear-gradient(152deg, oklch(0.58 0.14 50) 0%, oklch(0.68 0.13 60) 100%)",
    ctaAccent: "oklch(0.50 0.13 52)",
    glow: "oklch(0.58 0.14 55 / 0.35)",
    gridClass: "otg-tile--farmer",
  },
];
