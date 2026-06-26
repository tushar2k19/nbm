export type BambooStateStats = {
  id: string;
  name: string;
  hasCoverage: boolean;
  plantations: number;
  plantationAreaHa: number;
  nurseries: number;
  processingUnits: number;
  beneficiaries: number;
  fundsCr: number;
  species: number;
  culmsPlants: number;
};

/** 26 states with NBM bamboo coverage (authoritative list) */
export const COVERAGE_STATE_IDS = [
  "andhra-pradesh",
  "arunachal-pradesh",
  "assam",
  "bihar",
  "chhattisgarh",
  "gujarat",
  "himachal-pradesh",
  "jammu-kashmir",
  "jharkhand",
  "karnataka",
  "kerala",
  "madhya-pradesh",
  "maharashtra",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "odisha",
  "punjab",
  "rajasthan",
  "sikkim",
  "tamil-nadu",
  "telangana",
  "tripura",
  "uttar-pradesh",
  "uttarakhand",
] as const;

export const IMPLEMENTING_STATE_COUNT = COVERAGE_STATE_IDS.length;

/** Maps GeoJSON NAME_1 / variant spellings → canonical stats id */
const GEO_NAME_ALIASES: Record<string, string> = {
  "andaman and nicobar": "andaman-nicobar",
  "andaman and nicobar islands": "andaman-nicobar",
  "andhra pradesh": "andhra-pradesh",
  "arunachal pradesh": "arunachal-pradesh",
  assam: "assam",
  bihar: "bihar",
  chandigarh: "chandigarh",
  chhattisgarh: "chhattisgarh",
  "dadra and nagar haveli": "dnh-dd",
  "daman and diu": "dnh-dd",
  "dadra and nagar haveli and daman and diu": "dnh-dd",
  delhi: "delhi",
  "nct of delhi": "delhi",
  goa: "goa",
  gujarat: "gujarat",
  haryana: "haryana",
  "himachal pradesh": "himachal-pradesh",
  "jammu and kashmir": "jammu-kashmir",
  jharkhand: "jharkhand",
  karnataka: "karnataka",
  kerala: "kerala",
  ladakh: "ladakh",
  lakshadweep: "lakshadweep",
  "madhya pradesh": "madhya-pradesh",
  maharashtra: "maharashtra",
  manipur: "manipur",
  meghalaya: "meghalaya",
  mizoram: "mizoram",
  nagaland: "nagaland",
  odisha: "odisha",
  orissa: "odisha",
  puducherry: "puducherry",
  punjab: "punjab",
  rajasthan: "rajasthan",
  sikkim: "sikkim",
  "tamil nadu": "tamil-nadu",
  telangana: "telangana",
  tripura: "tripura",
  "uttar pradesh": "uttar-pradesh",
  uttarakhand: "uttarakhand",
  uttaranchal: "uttarakhand",
  "west bengal": "west-bengal",
};

const coverageSet = new Set<string>(COVERAGE_STATE_IDS);

export const bambooStateStats: BambooStateStats[] = [
  { id: "maharashtra", name: "Maharashtra", hasCoverage: true, plantations: 2721, plantationAreaHa: 1240, nurseries: 186, processingUnits: 142, beneficiaries: 18420, fundsCr: 98, species: 12, culmsPlants: 284500 },
  { id: "telangana", name: "Telangana", hasCoverage: true, plantations: 578, plantationAreaHa: 890, nurseries: 64, processingUnits: 78, beneficiaries: 4210, fundsCr: 52, species: 9, culmsPlants: 98200 },
  { id: "himachal-pradesh", name: "Himachal Pradesh", hasCoverage: true, plantations: 530, plantationAreaHa: 620, nurseries: 48, processingUnits: 34, beneficiaries: 3180, fundsCr: 38, species: 7, culmsPlants: 76400 },
  { id: "chhattisgarh", name: "Chhattisgarh", hasCoverage: true, plantations: 516, plantationAreaHa: 1840, nurseries: 72, processingUnits: 56, beneficiaries: 5620, fundsCr: 68, species: 10, culmsPlants: 112300 },
  { id: "gujarat", name: "Gujarat", hasCoverage: true, plantations: 268, plantationAreaHa: 2410, nurseries: 52, processingUnits: 98, beneficiaries: 4890, fundsCr: 54, species: 8, culmsPlants: 67800 },
  { id: "mizoram", name: "Mizoram", hasCoverage: true, plantations: 204, plantationAreaHa: 5910, nurseries: 38, processingUnits: 142, beneficiaries: 6240, fundsCr: 128, species: 14, culmsPlants: 156200 },
  { id: "arunachal-pradesh", name: "Arunachal Pradesh", hasCoverage: true, plantations: 52, plantationAreaHa: 3980, nurseries: 28, processingUnits: 96, beneficiaries: 4120, fundsCr: 89, species: 16, culmsPlants: 89400 },
  { id: "assam", name: "Assam", hasCoverage: true, plantations: 412, plantationAreaHa: 8420, nurseries: 94, processingUnits: 284, beneficiaries: 12840, fundsCr: 196, species: 18, culmsPlants: 198600 },
  { id: "tripura", name: "Tripura", hasCoverage: true, plantations: 186, plantationAreaHa: 4260, nurseries: 42, processingUnits: 168, beneficiaries: 5680, fundsCr: 104, species: 11, culmsPlants: 72400 },
  { id: "madhya-pradesh", name: "Madhya Pradesh", hasCoverage: true, plantations: 324, plantationAreaHa: 3540, nurseries: 68, processingUnits: 121, beneficiaries: 7420, fundsCr: 76, species: 9, culmsPlants: 88600 },
  { id: "odisha", name: "Odisha", hasCoverage: true, plantations: 298, plantationAreaHa: 3120, nurseries: 58, processingUnits: 110, beneficiaries: 6890, fundsCr: 68, species: 10, culmsPlants: 81200 },
  { id: "karnataka", name: "Karnataka", hasCoverage: true, plantations: 276, plantationAreaHa: 2860, nurseries: 62, processingUnits: 134, beneficiaries: 6120, fundsCr: 62, species: 9, culmsPlants: 76800 },
  { id: "meghalaya", name: "Meghalaya", hasCoverage: true, plantations: 168, plantationAreaHa: 2840, nurseries: 36, processingUnits: 88, beneficiaries: 4820, fundsCr: 72, species: 13, culmsPlants: 54200 },
  { id: "nagaland", name: "Nagaland", hasCoverage: true, plantations: 124, plantationAreaHa: 2180, nurseries: 32, processingUnits: 64, beneficiaries: 3640, fundsCr: 58, species: 12, culmsPlants: 41800 },
  { id: "manipur", name: "Manipur", hasCoverage: true, plantations: 98, plantationAreaHa: 1920, nurseries: 26, processingUnits: 52, beneficiaries: 2980, fundsCr: 48, species: 11, culmsPlants: 32400 },
  { id: "sikkim", name: "Sikkim", hasCoverage: true, plantations: 64, plantationAreaHa: 840, nurseries: 18, processingUnits: 24, beneficiaries: 1240, fundsCr: 22, species: 8, culmsPlants: 18600 },
  { id: "jharkhand", name: "Jharkhand", hasCoverage: true, plantations: 218, plantationAreaHa: 2240, nurseries: 44, processingUnits: 68, beneficiaries: 4560, fundsCr: 46, species: 8, culmsPlants: 58200 },
  { id: "uttar-pradesh", name: "Uttar Pradesh", hasCoverage: true, plantations: 386, plantationAreaHa: 1980, nurseries: 76, processingUnits: 88, beneficiaries: 9120, fundsCr: 58, species: 7, culmsPlants: 104200 },
  { id: "bihar", name: "Bihar", hasCoverage: true, plantations: 192, plantationAreaHa: 1640, nurseries: 38, processingUnits: 42, beneficiaries: 3840, fundsCr: 34, species: 6, culmsPlants: 48600 },
  { id: "andhra-pradesh", name: "Andhra Pradesh", hasCoverage: true, plantations: 248, plantationAreaHa: 2120, nurseries: 46, processingUnits: 72, beneficiaries: 5280, fundsCr: 44, species: 8, culmsPlants: 62400 },
  { id: "tamil-nadu", name: "Tamil Nadu", hasCoverage: true, plantations: 164, plantationAreaHa: 1480, nurseries: 34, processingUnits: 58, beneficiaries: 3620, fundsCr: 36, species: 7, culmsPlants: 44200 },
  { id: "uttarakhand", name: "Uttarakhand", hasCoverage: true, plantations: 142, plantationAreaHa: 1120, nurseries: 28, processingUnits: 36, beneficiaries: 2840, fundsCr: 28, species: 6, culmsPlants: 36800 },
  // Newly added implementing states (mock MIS data)
  { id: "kerala", name: "Kerala", hasCoverage: true, plantations: 176, plantationAreaHa: 980, nurseries: 32, processingUnits: 48, beneficiaries: 2940, fundsCr: 32, species: 9, culmsPlants: 41200 },
  { id: "punjab", name: "Punjab", hasCoverage: true, plantations: 148, plantationAreaHa: 720, nurseries: 24, processingUnits: 38, beneficiaries: 2180, fundsCr: 26, species: 5, culmsPlants: 28400 },
  { id: "rajasthan", name: "Rajasthan", hasCoverage: true, plantations: 132, plantationAreaHa: 860, nurseries: 22, processingUnits: 34, beneficiaries: 1960, fundsCr: 24, species: 6, culmsPlants: 24800 },
  { id: "jammu-kashmir", name: "Jammu & Kashmir", hasCoverage: true, plantations: 118, plantationAreaHa: 1540, nurseries: 20, processingUnits: 42, beneficiaries: 2640, fundsCr: 42, species: 8, culmsPlants: 32600 },
  // Non-NBM states / UTs
  { id: "west-bengal", name: "West Bengal", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
  { id: "goa", name: "Goa", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
  { id: "haryana", name: "Haryana", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
  { id: "delhi", name: "Delhi", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
  { id: "ladakh", name: "Ladakh", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
  { id: "chandigarh", name: "Chandigarh", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
  { id: "puducherry", name: "Puducherry", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
  { id: "andaman-nicobar", name: "Andaman & Nicobar", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
  { id: "lakshadweep", name: "Lakshadweep", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
  { id: "dnh-dd", name: "Dadra & Nagar Haveli and Daman & Diu", hasCoverage: false, plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
].map((s) => ({ ...s, hasCoverage: coverageSet.has(s.id) }));

const statsById = new Map(bambooStateStats.map((s) => [s.id, s]));

export function normalizeGeoName(geoName: string): string | null {
  const key = geoName.trim().toLowerCase();
  return GEO_NAME_ALIASES[key] ?? null;
}

export function getStateByGeoName(geoName: string): BambooStateStats | null {
  const id = normalizeGeoName(geoName);
  if (!id) return null;
  return statsById.get(id) ?? null;
}

export function getStateById(id: string): BambooStateStats | undefined {
  return statsById.get(id);
}

export const implementingStates = bambooStateStats.filter((s) => s.hasCoverage);

export const nationalTotals = implementingStates.reduce(
  (acc, s) => ({
    plantations: acc.plantations + s.plantations,
    plantationAreaHa: acc.plantationAreaHa + s.plantationAreaHa,
    nurseries: acc.nurseries + s.nurseries,
    processingUnits: acc.processingUnits + s.processingUnits,
    beneficiaries: acc.beneficiaries + s.beneficiaries,
    fundsCr: acc.fundsCr + s.fundsCr,
    species: Math.max(acc.species, s.species),
    culmsPlants: acc.culmsPlants + s.culmsPlants,
  }),
  { plantations: 0, plantationAreaHa: 0, nurseries: 0, processingUnits: 0, beneficiaries: 0, fundsCr: 0, species: 0, culmsPlants: 0 },
);

nationalTotals.species = 100;

export type StatField = keyof Pick<
  BambooStateStats,
  "plantations" | "nurseries" | "beneficiaries" | "plantationAreaHa"
>;

export function topStatesBy(field: StatField, limit = 7): BambooStateStats[] {
  return [...implementingStates].sort((a, b) => b[field] - a[field]).slice(0, limit);
}

export function getChoroplethColor(areaHa: number, hasCoverage: boolean): string {
  if (!hasCoverage || areaHa === 0) return "#e2e8e4";
  if (areaHa >= 5000) return "#1a5632";
  if (areaHa >= 2500) return "#2d7a47";
  return "#5ba36b";
}
