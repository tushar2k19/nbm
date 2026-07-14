import {
  Factory,
  GraduationCap,
  IndianRupee,
  Sprout,
} from "lucide-react";
import type { QuickServiceItem } from "@/data/quickServices";

export const missionPillars: QuickServiceItem[] = [
  {
    id: "plantation",
    icon: Sprout,
    title: "Plantation Development",
    desc: "Block, bund and farm-level plantations on government and private land.",
    to: "/guidelines",
    cta: "View Guidelines",
    accent: "oklch(0.52 0.15 145)",
    idleTint: "oklch(0.97 0.035 145)",
    highlight:
      "linear-gradient(152deg, oklch(0.48 0.14 145) 0%, oklch(0.56 0.16 140) 100%)",
    ctaAccent: "oklch(0.46 0.14 145)",
    glow: "oklch(0.48 0.14 145 / 0.35)",
  },
  {
    id: "product",
    icon: Factory,
    title: "Product Development",
    desc: "Setting up primary processing, treatment and product manufacturing units.",
    to: "/products",
    cta: "View Products",
    accent: "oklch(0.48 0.20 250)",
    idleTint: "oklch(0.97 0.03 250)",
    highlight:
      "linear-gradient(152deg, oklch(0.50 0.18 250) 0%, oklch(0.58 0.20 255) 100%)",
    ctaAccent: "oklch(0.44 0.18 250)",
    glow: "oklch(0.50 0.18 250 / 0.35)",
  },
  {
    id: "skilling",
    icon: GraduationCap,
    title: "Skilling & Capacity",
    desc: "Training of artisans, entrepreneurs and field functionaries across clusters.",
    to: "/knowledge-center",
    cta: "Start Learning",
    accent: "oklch(0.62 0.16 65)",
    idleTint: "oklch(0.98 0.025 75)",
    highlight:
      "linear-gradient(152deg, oklch(0.62 0.14 55) 0%, oklch(0.72 0.13 70) 100%)",
    ctaAccent: "oklch(0.50 0.13 58)",
    glow: "oklch(0.62 0.14 60 / 0.38)",
  },
  {
    id: "market",
    icon: IndianRupee,
    title: "Market Linkages",
    desc: "Retail outlets, e-marketing platforms and brand promotion for bamboo products.",
    to: "/products",
    cta: "Explore Markets",
    accent: "oklch(0.45 0.20 290)",
    idleTint: "oklch(0.97 0.03 290)",
    highlight:
      "linear-gradient(152deg, oklch(0.52 0.15 285) 0%, oklch(0.60 0.17 290) 100%)",
    ctaAccent: "oklch(0.46 0.16 285)",
    glow: "oklch(0.52 0.15 285 / 0.38)",
  },
];
