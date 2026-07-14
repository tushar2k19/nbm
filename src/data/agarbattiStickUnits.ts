export type AgarbattiUnitStatus = "Running" | "Closed" | "Under Setup";
export type AgarbattiOwnerType = "SHG" | "Farmer" | "Private" | "Cooperative" | "Department";

export type AgarbattiStickUnit = {
  id: string;
  srNo: number;
  yearOfEstablishment: number;
  state: string;
  district: string;
  block: string;
  name: string;
  address: string;
  ownerType: AgarbattiOwnerType;
  bambooSpecies: string;
  annualCapacityMt: number;
  actualProductionMt: number;
  status: AgarbattiUnitStatus;
  nbmSupported: boolean;
  contact: string;
  email: string;
  latitude: number;
  longitude: number;
};

export type AgarbattiSummary = {
  totalEnterprises: number;
  enterprisesRunning: number;
  annualCapacityMt: number;
  actualProductionMt: number;
};

/** National totals — MIS-style banner (illustrative, aligned with NBM sector reporting) */
export const agarbattiSummary: AgarbattiSummary = {
  totalEnterprises: 486,
  enterprisesRunning: 412,
  annualCapacityMt: 1240,
  actualProductionMt: 892,
};

export const agarbattiStickUnits: AgarbattiStickUnit[] = [
  {
    id: "as001",
    srNo: 1,
    yearOfEstablishment: 2019,
    state: "Assam",
    district: "Bajali",
    block: "Bajali",
    name: "Keshari Bio Products LLP",
    address: "Industrial Area, Bajali, Barpeta District, Assam",
    ownerType: "Private",
    bambooSpecies: "Bambusa tulda",
    annualCapacityMt: 48,
    actualProductionMt: 42,
    status: "Running",
    nbmSupported: true,
    contact: "9435012345",
    email: "keshari.bio@gmail.com",
    latitude: 26.4892,
    longitude: 91.1624,
  },
  {
    id: "as002",
    srNo: 2,
    yearOfEstablishment: 2020,
    state: "Maharashtra",
    district: "Gadchiroli",
    block: "Gadchiroli",
    name: "GAP Gadchiroli Unit — I",
    address: "Forest Division Campus, Gadchiroli, Maharashtra",
    ownerType: "Cooperative",
    bambooSpecies: "Bambusa bambos",
    annualCapacityMt: 72,
    actualProductionMt: 68,
    status: "Running",
    nbmSupported: true,
    contact: "7741234560",
    email: "gap.gadchiroli@mahaforest.gov.in",
    latitude: 20.1709,
    longitude: 80.0002,
  },
  {
    id: "as003",
    srNo: 3,
    yearOfEstablishment: 2021,
    state: "Maharashtra",
    district: "Gadchiroli",
    block: "Armori",
    name: "GAP Gadchiroli Unit — II",
    address: "Armori Industrial Estate, Gadchiroli, Maharashtra",
    ownerType: "SHG",
    bambooSpecies: "Dendrocalamus strictus",
    annualCapacityMt: 36,
    actualProductionMt: 31,
    status: "Running",
    nbmSupported: true,
    contact: "9823012345",
    email: "armori.gap@gmail.com",
    latitude: 20.7841,
    longitude: 79.9982,
  },
  {
    id: "as004",
    srNo: 4,
    yearOfEstablishment: 2020,
    state: "Madhya Pradesh",
    district: "East Nimar",
    block: "Burhanpur",
    name: "Burhanpur Bamboo Stick SHG",
    address: "Gram Panchayat Bhawan, Burhanpur, MP",
    ownerType: "SHG",
    bambooSpecies: "Bambusa bambos",
    annualCapacityMt: 24,
    actualProductionMt: 19,
    status: "Running",
    nbmSupported: true,
    contact: "8817036053",
    email: "ccfre.khd@mp.gov.in",
    latitude: 21.3086,
    longitude: 76.2304,
  },
  {
    id: "as005",
    srNo: 5,
    yearOfEstablishment: 2021,
    state: "Madhya Pradesh",
    district: "Seoni",
    block: "Barghat",
    name: "Seoni Round Stick Unit",
    address: "Barghat Block Office Road, Seoni, MP",
    ownerType: "Farmer",
    bambooSpecies: "Dendrocalamus strictus",
    annualCapacityMt: 18,
    actualProductionMt: 14,
    status: "Running",
    nbmSupported: false,
    contact: "8827776575",
    email: "ccfre.sni@mp.gov.in",
    latitude: 22.0868,
    longitude: 79.5434,
  },
  {
    id: "as006",
    srNo: 6,
    yearOfEstablishment: 2019,
    state: "Gujarat",
    district: "Surat",
    block: "Olpad",
    name: "Surat Agarbatti Stick Cluster",
    address: "Olpad Industrial Estate, Surat, Gujarat",
    ownerType: "Private",
    bambooSpecies: "Bambusa tulda",
    annualCapacityMt: 96,
    actualProductionMt: 88,
    status: "Running",
    nbmSupported: false,
    contact: "9876543210",
    email: "surat.sticks@gmail.com",
    latitude: 21.3351,
    longitude: 72.7539,
  },
  {
    id: "as007",
    srNo: 7,
    yearOfEstablishment: 2022,
    state: "Tripura",
    district: "West Tripura",
    block: "Jirania",
    name: "Jirania Bamboo Stick Unit",
    address: "Bamboo Processing Centre, Jirania, West Tripura",
    ownerType: "Department",
    bambooSpecies: "Melocanna baccifera",
    annualCapacityMt: 28,
    actualProductionMt: 22,
    status: "Running",
    nbmSupported: true,
    contact: "9862427467",
    email: "tripurabamboo@gmail.com",
    latitude: 23.7568,
    longitude: 91.2886,
  },
  {
    id: "as008",
    srNo: 8,
    yearOfEstablishment: 2020,
    state: "Uttar Pradesh",
    district: "Kanpur Nagar",
    block: "Kanpur",
    name: "Kanpur Round Stick Manufacturers",
    address: "Fazalganj Industrial Area, Kanpur, UP",
    ownerType: "Private",
    bambooSpecies: "Bambusa bambos",
    annualCapacityMt: 64,
    actualProductionMt: 52,
    status: "Running",
    nbmSupported: false,
    contact: "9415012345",
    email: "kanpur.sticks@gmail.com",
    latitude: 26.4499,
    longitude: 80.3319,
  },
  {
    id: "as009",
    srNo: 9,
    yearOfEstablishment: 2021,
    state: "Uttar Pradesh",
    district: "Ayodhya",
    block: "Faizabad",
    name: "Faizabad SHG Stick Unit",
    address: "KVIC Training Centre, Faizabad, UP",
    ownerType: "SHG",
    bambooSpecies: "Dendrocalamus strictus",
    annualCapacityMt: 12,
    actualProductionMt: 9,
    status: "Running",
    nbmSupported: true,
    contact: "9984567890",
    email: "faizabad.shg@gmail.com",
    latitude: 26.7606,
    longitude: 82.1332,
  },
  {
    id: "as010",
    srNo: 10,
    yearOfEstablishment: 2022,
    state: "Karnataka",
    district: "Mysuru",
    block: "Hunsur",
    name: "Hunsur Bamboo Processing Unit",
    address: "Hunsur Industrial Area, Mysuru, Karnataka",
    ownerType: "Cooperative",
    bambooSpecies: "Bambusa bambos",
    annualCapacityMt: 32,
    actualProductionMt: 26,
    status: "Running",
    nbmSupported: true,
    contact: "8310456789",
    email: "hunsur.bamboo@kar.gov.in",
    latitude: 12.3074,
    longitude: 76.2902,
  },
  {
    id: "as011",
    srNo: 11,
    yearOfEstablishment: 2020,
    state: "Assam",
    district: "Kamrup",
    block: "Rangia",
    name: "Rangia Stick Making Centre",
    address: "Bamboo Cluster, Rangia, Kamrup, Assam",
    ownerType: "Cooperative",
    bambooSpecies: "Bambusa balcooa",
    annualCapacityMt: 40,
    actualProductionMt: 35,
    status: "Running",
    nbmSupported: true,
    contact: "9435678901",
    email: "bamboo.assam@gov.in",
    latitude: 26.4486,
    longitude: 91.6204,
  },
  {
    id: "as012",
    srNo: 12,
    yearOfEstablishment: 2018,
    state: "Gujarat",
    district: "Ahmedabad",
    block: "Sanand",
    name: "Sanand Agarbatti Raw Material Unit",
    address: "GIDC Sanand, Ahmedabad, Gujarat",
    ownerType: "Private",
    bambooSpecies: "Bambusa tulda",
    annualCapacityMt: 56,
    actualProductionMt: 0,
    status: "Closed",
    nbmSupported: false,
    contact: "9725012345",
    email: "sanand.unit@gmail.com",
    latitude: 22.9925,
    longitude: 72.3818,
  },
  {
    id: "as013",
    srNo: 13,
    yearOfEstablishment: 2023,
    state: "Odisha",
    district: "Cuttack",
    block: "Cuttack",
    name: "Cuttack Bamboo Stick Enterprise",
    address: "Industrial Estate, Cuttack, Odisha",
    ownerType: "Department",
    bambooSpecies: "Dendrocalamus strictus",
    annualCapacityMt: 20,
    actualProductionMt: 0,
    status: "Under Setup",
    nbmSupported: true,
    contact: "9438123456",
    email: "dfo.cuttack@odisha.gov.in",
    latitude: 20.4625,
    longitude: 85.883,
  },
  {
    id: "as014",
    srNo: 14,
    yearOfEstablishment: 2021,
    state: "Telangana",
    district: "Warangal",
    block: "Warangal",
    name: "Warangal Round Stick Unit",
    address: "Industrial Park, Warangal, Telangana",
    ownerType: "Farmer",
    bambooSpecies: "Bambusa bambos",
    annualCapacityMt: 22,
    actualProductionMt: 18,
    status: "Running",
    nbmSupported: true,
    contact: "9848765432",
    email: "warangal.bamboo@telangana.gov.in",
    latitude: 17.9689,
    longitude: 79.5941,
  },
  {
    id: "as015",
    srNo: 15,
    yearOfEstablishment: 2022,
    state: "Mizoram",
    district: "Aizawl",
    block: "Aizawl",
    name: "Aizawl Bamboo Stick Cooperative",
    address: "Bamboo Mission Centre, Aizawl, Mizoram",
    ownerType: "Cooperative",
    bambooSpecies: "Melocanna baccifera",
    annualCapacityMt: 30,
    actualProductionMt: 24,
    status: "Running",
    nbmSupported: true,
    contact: "9862345678",
    email: "nbm.mizoram@gmail.com",
    latitude: 23.7271,
    longitude: 92.7176,
  },
];

/* ── Filter helpers ───────────────────────────────────────────── */

export type AgarbattiFilters = {
  year: string;
  state: string;
  district: string;
  block: string;
};

export const ALL = "all";

export function getAgarbattiSummary() {
  return agarbattiSummary;
}

export function getAgarbattiFilterOptions(filters: Partial<AgarbattiFilters>) {
  const allYears = [
    ...new Set(agarbattiStickUnits.map((u) => String(u.yearOfEstablishment))),
  ].sort();
  const allStates = [...new Set(agarbattiStickUnits.map((u) => u.state))].sort();

  const inState =
    filters.state && filters.state !== ALL
      ? agarbattiStickUnits.filter((u) => u.state === filters.state)
      : agarbattiStickUnits;

  const allDistricts = [...new Set(inState.map((u) => u.district))].sort();

  const inDistrict =
    filters.district && filters.district !== ALL
      ? inState.filter((u) => u.district === filters.district)
      : inState;

  const allBlocks = [...new Set(inDistrict.map((u) => u.block))].sort();

  return { years: allYears, states: allStates, districts: allDistricts, blocks: allBlocks };
}

export function filterAgarbattiUnits(filters: AgarbattiFilters, search: string): AgarbattiStickUnit[] {
  let result = agarbattiStickUnits;

  if (filters.year !== ALL) {
    result = result.filter((u) => String(u.yearOfEstablishment) === filters.year);
  }
  if (filters.state !== ALL) {
    result = result.filter((u) => u.state === filters.state);
  }
  if (filters.district !== ALL) {
    result = result.filter((u) => u.district === filters.district);
  }
  if (filters.block !== ALL) {
    result = result.filter((u) => u.block === filters.block);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.state.toLowerCase().includes(q) ||
        u.district.toLowerCase().includes(q) ||
        u.address.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.bambooSpecies.toLowerCase().includes(q) ||
        u.contact.includes(q),
    );
  }

  return result;
}

export function topStatesByAgarbattiCapacity(limit = 7) {
  const byState = new Map<string, number>();
  for (const u of agarbattiStickUnits) {
    byState.set(u.state, (byState.get(u.state) ?? 0) + u.annualCapacityMt);
  }
  return [...byState.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function topUnitsByCapacity(limit = 5) {
  return [...agarbattiStickUnits]
    .sort((a, b) => b.annualCapacityMt - a.annualCapacityMt)
    .slice(0, limit);
}
