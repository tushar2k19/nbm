import { decodeGovEmail } from "@/data/contacts";

export type WhosWhoOfficial = {
  id: string;
  name: string;
  designation: string;
  email?: string;
  office?: string;
  epabx?: string;
  roomNo?: string;
  address?: string;
  notes?: string;
  photo?: string;
  roleLabel?: string;
  photoPosition?: string;
  photoFit?: "cover" | "contain";
};

export type WhosWhoLeadershipTier = {
  id: string;
  officials: WhosWhoOfficial[];
};

export type WhosWhoSection = {
  id: string;
  title: string;
  subtitle: string;
  officials: WhosWhoOfficial[];
};

/* ── Ministry leadership (hidden on site — restore when full ministry scope returns) ──
import shivrajPhoto from "@/assets/whos-who/shivraj-singh-chouhan.jpg";
import ramnathPhoto from "@/assets/whos-who/ramnath-thakur.jpg";
import bhagirathPhoto from "@/assets/whos-who/bhagirath-choudhary.jpg";

export const whosWhoLeadership: WhosWhoLeadershipTier[] = [ ... ];
export const whosWhoPhotoCredit = "...";
── */

/** Stubs keep WhosWhoLeadership.tsx buildable when the section is commented out in the directory */
export const whosWhoLeadership: WhosWhoLeadershipTier[] = [];
export const whosWhoPhotoCredit = "";

/** NBMC core team — compact hierarchy (4 officials, single section) */
const nbmcCoreTeam: WhosWhoOfficial[] = [
  {
    id: "hort-commissioner",
    name: "Dr. Prabhat Kumar",
    designation: "Horticulture Commissioner",
    email: "hort[dot]comm-agri[at]gov[dot]in",
    office: "23381503",
    epabx: "4738",
    roomNo: "237",
    address: "Krishi Bhawan, New Delhi — 110001",
  },
  {
    id: "addl-commissioner",
    name: "Mrs. Kamna Sharma",
    designation: "Additional Commissioner",
    email: "kamna[dot]rajesh[at]gov[dot]in",
    office: "011-23384752",
    epabx: "4997",
    roomNo: "299-B",
    address: "Krishi Bhawan, New Delhi — 110001",
  },
  {
    id: "section-officer",
    name: "Ms. Pooja Singh",
    designation: "Section Officer",
    email: "Pooja[dot]89[at]gov[dot]in",
    epabx: "2783",
    roomNo: "118-B",
    address: "Shastri Bhawan, New Delhi — 110001",
  },
  {
    id: "senior-technical-assistant",
    name: "Mr. Dharambir Dhan",
    designation: "Senior Technical Assistant",
    email: "dharambir[dot]dhan[at]gov[dot]in",
    office: "011-23382101",
    address: "Shastri Bhawan, New Delhi — 110001",
    notes: "Scheme documentation, file processing and field-level coordination support",
  },
];

export const whosWhoSections: WhosWhoSection[] = [
  {
    id: "nbmc",
    title: "National Bamboo Mission Cell",
    subtitle:
      "Core administrative team at NBMC, Krishi Bhawan & Shastri Bhawan — scheme coordination, fund release and State liaison for the National Bamboo Mission.",
    officials: nbmcCoreTeam,
  },
];

export const whosWhoStats = {
  totalOfficials: whosWhoSections.reduce((n, s) => n + s.officials.length, 0),
  sections: whosWhoSections.length,
};

export function formatGovEmail(email: string): string {
  return decodeGovEmail(email);
}

export function searchWhosWho(query: string): WhosWhoSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return whosWhoSections;

  return whosWhoSections
    .map((section) => ({
      ...section,
      officials: section.officials.filter(
        (o) =>
          o.name.toLowerCase().includes(q) ||
          o.designation.toLowerCase().includes(q) ||
          o.email?.toLowerCase().includes(q) ||
          o.roomNo?.toLowerCase().includes(q),
      ),
    }))
    .filter((s) => s.officials.length > 0);
}
