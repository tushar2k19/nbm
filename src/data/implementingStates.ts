/** Implementing States — gallery from nbm.da.gov.in/Implementing-States; 26 States total (incl. Jammu & Kashmir, Punjab, Rajasthan). */

import { getStateById, IMPLEMENTING_STATE_COUNT } from "@/data/bambooStateStats";

const NBM_OFFICIAL = "https://nbm.da.gov.in";

export type ImplementingState = {
  id: string;
  name: string;
  mapImageUrl: string;
  /** Short line for cards / preview */
  tagline: string;
};

function mapUrl(fileStem: string) {
  return `${NBM_OFFICIAL}/images/StatesMap/${fileStem}.png`;
}

function taglineFor(id: string, fallback: string): string {
  const stats = getStateById(id);
  if (!stats) return fallback;
  if (stats.plantationAreaHa > 0) {
    return `${stats.plantationAreaHa.toLocaleString("en-IN")} Ha plantation area under NBM`;
  }
  return fallback;
}

/** Official list and order from nbm.da.gov.in/Implementing-States */
export const implementingStatesOfficial: ImplementingState[] = [
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    mapImageUrl: mapUrl("AndhraPradesh"),
    tagline: taglineFor("andhra-pradesh", "Southern implementing State"),
  },
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    mapImageUrl: mapUrl("ArunachalPradesh"),
    tagline: taglineFor("arunachal-pradesh", "Eastern Himalayan implementing State"),
  },
  {
    id: "assam",
    name: "Assam",
    mapImageUrl: mapUrl("Assam"),
    tagline: taglineFor("assam", "Major bamboo basket of the North-East"),
  },
  {
    id: "bihar",
    name: "Bihar",
    mapImageUrl: mapUrl("Bihar"),
    tagline: taglineFor("bihar", "Eastern Gangetic implementing State"),
  },
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    mapImageUrl: mapUrl("Chhattisgarh"),
    tagline: taglineFor("chhattisgarh", "Central tribal belt bamboo expansion"),
  },
  {
    id: "gujarat",
    name: "Gujarat",
    mapImageUrl: mapUrl("Gujarat"),
    tagline: taglineFor("gujarat", "Western processing & plantation hub"),
  },
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    mapImageUrl: mapUrl("HimachalPradesh"),
    tagline: taglineFor("himachal-pradesh", "Hill-State bamboo cultivation"),
  },
  {
    id: "jharkhand",
    name: "Jharkhand",
    mapImageUrl: mapUrl("Jharkhand"),
    tagline: taglineFor("jharkhand", "Forest-fringe plantation programmes"),
  },
  {
    id: "karnataka",
    name: "Karnataka",
    mapImageUrl: mapUrl("Karnataka"),
    tagline: taglineFor("karnataka", "Southern peninsula implementing State"),
  },
  {
    id: "kerala",
    name: "Kerala",
    mapImageUrl: mapUrl("Kerala"),
    tagline: taglineFor("kerala", "Coastal & homestead bamboo cultivation"),
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    mapImageUrl: mapUrl("MadhyaPradesh"),
    tagline: taglineFor("madhya-pradesh", "Central India bamboo value chain"),
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    mapImageUrl: mapUrl("Maharashtra"),
    tagline: taglineFor("maharashtra", "Largest plantation network in the Mission"),
  },
  {
    id: "manipur",
    name: "Manipur",
    mapImageUrl: mapUrl("Manipur"),
    tagline: taglineFor("manipur", "North-East artisan & plantation support"),
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    mapImageUrl: mapUrl("Meghalaya"),
    tagline: taglineFor("meghalaya", "Hill-State community bamboo programmes"),
  },
  {
    id: "mizoram",
    name: "Mizoram",
    mapImageUrl: mapUrl("Mizoram"),
    tagline: taglineFor("mizoram", "Extensive bamboo cover under NBM"),
  },
  {
    id: "nagaland",
    name: "Nagaland",
    mapImageUrl: mapUrl("Nagaland"),
    tagline: taglineFor("nagaland", "North-East implementing State"),
  },
  {
    id: "odisha",
    name: "Odisha",
    mapImageUrl: mapUrl("Odisha"),
    tagline: taglineFor("odisha", "Eastern coastal & tribal belt programmes"),
  },
  {
    id: "sikkim",
    name: "Sikkim",
    mapImageUrl: mapUrl("Sikkim"),
    tagline: taglineFor("sikkim", "Himalayan bamboo niche cultivation"),
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    mapImageUrl: mapUrl("TamilNadu"),
    tagline: taglineFor("tamil-nadu", "Southern implementing State"),
  },
  {
    id: "telangana",
    name: "Telangana",
    mapImageUrl: mapUrl("Telangana"),
    tagline: taglineFor("telangana", "Deccan plateau plantation drives"),
  },
  {
    id: "tripura",
    name: "Tripura",
    mapImageUrl: mapUrl("Tripura"),
    tagline: taglineFor("tripura", "North-East handicraft & plantation hub"),
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    mapImageUrl: mapUrl("Uttarakhand"),
    tagline: taglineFor("uttarakhand", "Himalayan foothill bamboo programmes"),
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    mapImageUrl: mapUrl("Uttarpradesh"),
    tagline: taglineFor("uttar-pradesh", "Northern Gangetic implementing State"),
  },
];

/** Authoritative NBM implementing-state count (26); gallery cards may lag until all maps are on official portal. */
export const IMPLEMENTING_STATES_OFFICIAL_COUNT = IMPLEMENTING_STATE_COUNT;

/** Featured on About page teaser */
export const featuredImplementingStateIds = [
  "assam",
  "maharashtra",
  "mizoram",
  "madhya-pradesh",
] as const;

export function getImplementingState(id: string) {
  return implementingStatesOfficial.find((s) => s.id === id);
}

export const featuredImplementingStates = featuredImplementingStateIds
  .map((id) => getImplementingState(id))
  .filter((s): s is ImplementingState => Boolean(s));
