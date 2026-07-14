export type NurserySpecies = {
  name: string;
  stock: number;
  asOn: string;
};

export type AccreditedNursery = {
  id: string;
  srNo: number;
  yearOfCreation: number;
  state: string;
  district: string;
  block: string;
  name: string;
  address: string;
  source: "Seed" | "Vegetative" | "Vegetative+Seed";
  type: "Farmer" | "Department" | "Private";
  contact: string;
  email: string;
  latitude: number;
  longitude: number;
  hasCertificate: boolean;
  species: NurserySpecies[];
};

export type NurserySummary = {
  totalNurseries: number;
  totalSpecies: number;
  totalStock: number;
};

/** National totals drawn from the official NBM portal banner */
export const nurserySummary: NurserySummary = {
  totalNurseries: 212,
  totalSpecies: 88,
  totalStock: 26_077_557,
};

export const accreditedNurseries: AccreditedNursery[] = [
  {
    id: "n001",
    srNo: 1,
    yearOfCreation: 2021,
    state: "Tripura",
    district: "Khowai",
    block: "Khowai",
    name: "37 Mile NBM Nurseryu",
    address: "Central Nursery, Mongiya Kaini, Khowai District, Tripura",
    source: "Seed",
    type: "Farmer",
    contact: "9862427467",
    email: "tripurabamboo@gmail.com",
    latitude: 23.876,
    longitude: 91.7038,
    hasCertificate: true,
    species: [
      { name: "Dendrocalamus longispathus", stock: 40000, asOn: "Mar 10 2021" },
    ],
  },
  {
    id: "n002",
    srNo: 2,
    yearOfCreation: 2022,
    state: "Madhya Pradesh",
    district: "East Nimar",
    block: "Burhanpur",
    name: "Aabna Nursery",
    address: "Aabna Nursery, Jaswadi, East Nimar, MP",
    source: "Vegetative",
    type: "Farmer",
    contact: "8817036053",
    email: "ccfre.khd@mp.gov.in",
    latitude: 21.8086,
    longitude: 76.3841,
    hasCertificate: true,
    species: [
      { name: "Dendrocalamus strictus", stock: 25000, asOn: "Apr 12 2022" },
      { name: "Bambusa bambos", stock: 15000, asOn: "Apr 12 2022" },
    ],
  },
  {
    id: "n003",
    srNo: 3,
    yearOfCreation: 2021,
    state: "Tripura",
    district: "South Tripura",
    block: "Belonia",
    name: "Amlighat Central Nursery",
    address: "Amlighat, South Tripura",
    source: "Seed",
    type: "Farmer",
    contact: "9862427467",
    email: "tripurabamboo@gmail.com",
    latitude: 22.9797,
    longitude: 91.569,
    hasCertificate: false,
    species: [
      { name: "Bambusa tulda", stock: 70000, asOn: "Apr 16 2021" },
    ],
  },
  {
    id: "n004",
    srNo: 4,
    yearOfCreation: 2022,
    state: "Madhya Pradesh",
    district: "Raisen",
    block: "Raisen",
    name: "Amrawad - I Nursery",
    address: "Amrawad, Raisen, MP",
    source: "Vegetative+Seed",
    type: "Farmer",
    contact: "9926835248",
    email: "ccfre.bpl@mp.gov.in",
    latitude: 23.3025,
    longitude: 77.8725,
    hasCertificate: true,
    species: [
      { name: "Dendrocalamus strictus", stock: 100000, asOn: "May 17 2022" },
      { name: "Bambusa bambos", stock: 2316, asOn: "May 17 2022" },
    ],
  },
  {
    id: "n005",
    srNo: 5,
    yearOfCreation: 2022,
    state: "Madhya Pradesh",
    district: "Raisen",
    block: "Raisen",
    name: "Amrawad - II Nursery",
    address: "Amrawad, Raisen, MP",
    source: "Vegetative+Seed",
    type: "Farmer",
    contact: "9754836014",
    email: "ccfre.bpl@mp.gov.in",
    latitude: 23.308,
    longitude: 77.8836,
    hasCertificate: true,
    species: [
      { name: "Dendrocalamus strictus", stock: 20000, asOn: "May 17 2022" },
      { name: "Bambusa bambos", stock: 59590, asOn: "May 17 2022" },
    ],
  },
  {
    id: "n006",
    srNo: 6,
    yearOfCreation: 2021,
    state: "Madhya Pradesh",
    district: "Seoni",
    block: "Barghat",
    name: "Amgaon",
    address: "Gram Amgaon, Block Barghat, Distt. Seoni",
    source: "Seed",
    type: "Farmer",
    contact: "8827776575",
    email: "ccfre.sni@mp.gov.in",
    latitude: 22.0868,
    longitude: 79.5434,
    hasCertificate: false,
    species: [
      { name: "Dendrocalamus strictus", stock: 4806, asOn: "Mar 23 2021" },
    ],
  },
  {
    id: "n007",
    srNo: 7,
    yearOfCreation: 2022,
    state: "Maharashtra",
    district: "Gadchiroli",
    block: "Gadchiroli",
    name: "Gadchiroli Forest Nursery",
    address: "Forest Division Campus, Gadchiroli, Maharashtra",
    source: "Seed",
    type: "Department",
    contact: "7741234560",
    email: "dfo.gadchiroli@mahaforest.gov.in",
    latitude: 20.1709,
    longitude: 80.0002,
    hasCertificate: true,
    species: [
      { name: "Bambusa bambos", stock: 60000, asOn: "Jun 5 2022" },
      { name: "Dendrocalamus strictus", stock: 40000, asOn: "Jun 5 2022" },
      { name: "Bambusa tulda", stock: 18000, asOn: "Jun 5 2022" },
    ],
  },
  {
    id: "n008",
    srNo: 8,
    yearOfCreation: 2022,
    state: "Maharashtra",
    district: "Yavatmal",
    block: "Yavatmal",
    name: "Yavatmal Bamboo Nursery",
    address: "Range Office, Yavatmal, Maharashtra",
    source: "Vegetative",
    type: "Department",
    contact: "7722198765",
    email: "rfo.yavatmal@mahaforest.gov.in",
    latitude: 20.3888,
    longitude: 78.1204,
    hasCertificate: true,
    species: [
      { name: "Bambusa bambos", stock: 85000, asOn: "Jul 12 2022" },
      { name: "Dendrocalamus stocksii", stock: 12000, asOn: "Jul 12 2022" },
    ],
  },
  {
    id: "n009",
    srNo: 9,
    yearOfCreation: 2021,
    state: "Assam",
    district: "Kamrup",
    block: "Hajo",
    name: "Hajo Bamboo Propagation Centre",
    address: "Forest Colony, Hajo, Kamrup, Assam",
    source: "Vegetative+Seed",
    type: "Department",
    contact: "9435678901",
    email: "bamboo.assam@gov.in",
    latitude: 26.2421,
    longitude: 91.5345,
    hasCertificate: true,
    species: [
      { name: "Bambusa balcooa", stock: 45000, asOn: "Mar 20 2021" },
      { name: "Bambusa tulda", stock: 30000, asOn: "Mar 20 2021" },
      { name: "Dendrocalamus hamiltonii", stock: 10000, asOn: "Mar 20 2021" },
    ],
  },
  {
    id: "n010",
    srNo: 10,
    yearOfCreation: 2022,
    state: "Assam",
    district: "Dibrugarh",
    block: "Dibrugarh",
    name: "Dibrugarh Bamboo Garden",
    address: "Bamunpukhuri, Dibrugarh, Assam",
    source: "Vegetative",
    type: "Farmer",
    contact: "9876501234",
    email: "dibru.bamboo@gmail.com",
    latitude: 27.4728,
    longitude: 94.9074,
    hasCertificate: false,
    species: [
      { name: "Bambusa balcooa", stock: 28000, asOn: "Apr 8 2022" },
      { name: "Melocanna baccifera", stock: 8500, asOn: "Apr 8 2022" },
    ],
  },
  {
    id: "n011",
    srNo: 11,
    yearOfCreation: 2021,
    state: "Uttar Pradesh",
    district: "Sonbhadra",
    block: "Robertsganj",
    name: "Sonbhadra NBM Nursery",
    address: "Forest Guest House Road, Robertsganj, Sonbhadra, UP",
    source: "Seed",
    type: "Department",
    contact: "9415012345",
    email: "dfo.sonbhadra@upforest.gov.in",
    latitude: 24.6873,
    longitude: 83.0593,
    hasCertificate: true,
    species: [
      { name: "Dendrocalamus strictus", stock: 55000, asOn: "May 4 2021" },
    ],
  },
  {
    id: "n012",
    srNo: 12,
    yearOfCreation: 2022,
    state: "Uttar Pradesh",
    district: "Mirzapur",
    block: "Chunar",
    name: "Chunar Bamboo Nursery",
    address: "Near Fort Road, Chunar, Mirzapur, UP",
    source: "Vegetative+Seed",
    type: "Farmer",
    contact: "9984567890",
    email: "chunar.bamboo@gmail.com",
    latitude: 25.1197,
    longitude: 82.5785,
    hasCertificate: true,
    species: [
      { name: "Dendrocalamus strictus", stock: 32000, asOn: "Jun 18 2022" },
      { name: "Bambusa bambos", stock: 18000, asOn: "Jun 18 2022" },
    ],
  },
  {
    id: "n013",
    srNo: 13,
    yearOfCreation: 2022,
    state: "Chhattisgarh",
    district: "Bastar",
    block: "Jagdalpur",
    name: "Jagdalpur Forest Nursery",
    address: "Collector Compound, Jagdalpur, Bastar, CG",
    source: "Seed",
    type: "Department",
    contact: "7714321098",
    email: "ccf.bastar@cgforest.gov.in",
    latitude: 19.0786,
    longitude: 82.033,
    hasCertificate: true,
    species: [
      { name: "Dendrocalamus strictus", stock: 70000, asOn: "Apr 1 2022" },
      { name: "Bambusa vulgaris", stock: 12000, asOn: "Apr 1 2022" },
    ],
  },
  {
    id: "n014",
    srNo: 14,
    yearOfCreation: 2021,
    state: "Telangana",
    district: "Bhadradri Kothagudem",
    block: "Bhadrachalam",
    name: "Bhadrachalam Bamboo Nursery",
    address: "Forest Office, Bhadrachalam, Bhadradri Kothagudem, Telangana",
    source: "Vegetative",
    type: "Department",
    contact: "9848765432",
    email: "dfo.bhadrachalam@telangana.gov.in",
    latitude: 17.6688,
    longitude: 80.8895,
    hasCertificate: false,
    species: [
      { name: "Bambusa bambos", stock: 50000, asOn: "Feb 15 2021" },
      { name: "Dendrocalamus brandisii", stock: 14000, asOn: "Feb 15 2021" },
    ],
  },
  {
    id: "n015",
    srNo: 15,
    yearOfCreation: 2022,
    state: "Karnataka",
    district: "Uttara Kannada",
    block: "Sirsi",
    name: "Sirsi Bamboo Research Farm",
    address: "KFRI Campus, Sirsi, Uttara Kannada, Karnataka",
    source: "Vegetative+Seed",
    type: "Department",
    contact: "8310456789",
    email: "kfri.sirsi@kar.gov.in",
    latitude: 14.6219,
    longitude: 74.8382,
    hasCertificate: true,
    species: [
      { name: "Bambusa bambos", stock: 30000, asOn: "Mar 9 2022" },
      { name: "Dendrocalamus strictus", stock: 18000, asOn: "Mar 9 2022" },
      { name: "Ochlandra travancorica", stock: 5000, asOn: "Mar 9 2022" },
    ],
  },
];

/* ── Filter helpers ───────────────────────────────────────────── */

export type NurseryFilters = {
  year: string;
  state: string;
  district: string;
  block: string;
};

export const ALL = "all";

export function getFilterOptions(filters: Partial<NurseryFilters>) {
  const allYears = [...new Set(accreditedNurseries.map((n) => String(n.yearOfCreation)))].sort();
  const allStates = [...new Set(accreditedNurseries.map((n) => n.state))].sort();

  const inState = filters.state && filters.state !== ALL
    ? accreditedNurseries.filter((n) => n.state === filters.state)
    : accreditedNurseries;

  const allDistricts = [...new Set(inState.map((n) => n.district))].sort();

  const inDistrict = filters.district && filters.district !== ALL
    ? inState.filter((n) => n.district === filters.district)
    : inState;

  const allBlocks = [...new Set(inDistrict.map((n) => n.block))].sort();

  return { years: allYears, states: allStates, districts: allDistricts, blocks: allBlocks };
}

export function filterAccreditedNurseries(
  filters: NurseryFilters,
  search: string,
): AccreditedNursery[] {
  let result = accreditedNurseries;

  if (filters.year !== ALL) {
    result = result.filter((n) => String(n.yearOfCreation) === filters.year);
  }
  if (filters.state !== ALL) {
    result = result.filter((n) => n.state === filters.state);
  }
  if (filters.district !== ALL) {
    result = result.filter((n) => n.district === filters.district);
  }
  if (filters.block !== ALL) {
    result = result.filter((n) => n.block === filters.block);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.state.toLowerCase().includes(q) ||
        n.district.toLowerCase().includes(q) ||
        n.address.toLowerCase().includes(q) ||
        n.email.toLowerCase().includes(q) ||
        n.contact.includes(q),
    );
  }

  return result;
}

export function getAccreditedNurserySummary() {
  return nurserySummary;
}

export type NurseryWithStock = AccreditedNursery & { totalStock: number };

export function topNurseriesByStock(limit = 5): NurseryWithStock[] {
  return [...accreditedNurseries]
    .map((n) => ({
      ...n,
      totalStock: n.species.reduce((sum, sp) => sum + sp.stock, 0),
    }))
    .sort((a, b) => b.totalStock - a.totalStock)
    .slice(0, limit);
}
