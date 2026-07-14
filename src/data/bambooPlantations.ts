export type PlantationSpecies = {
  name: string;
  culms: number;
};

export type PlantationCategory = "Private" | "Government" | "SHG" | "FPO";

export type BambooPlantation = {
  id: string;
  srNo: number;
  code: string;
  yearOfCreation: string;
  state: string;
  district: string;
  block: string;
  personInCharge: string;
  contact: string;
  email: string;
  address: string;
  areaHa: number;
  irrigated: boolean;
  category: PlantationCategory;
  species: PlantationSpecies[];
};

export type PlantationSummary = {
  totalPlantations: number;
  totalAreaHa: number;
  totalSpecies: number;
  totalCulmsPlants: number;
};

/** National totals from the official NBM portal banner */
export const plantationSummary: PlantationSummary = {
  totalPlantations: 1328,
  totalAreaHa: 7611.16,
  totalSpecies: 100,
  totalCulmsPlants: 1_323_618,
};

export const bambooPlantations: BambooPlantation[] = [
  {
    id: "bp001",
    srNo: 1,
    code: "ARKATAPC0049",
    yearOfCreation: "2018-2019",
    state: "Arunachal Pradesh",
    district: "Kamle",
    block: "Tamen-Raga",
    personInCharge: "Nido Jeli",
    contact: "9366795210",
    email: "nidojeli1292@gmail.com",
    address: "Abo-Tani Colony, Itanagar",
    areaHa: 5,
    irrigated: false,
    category: "Private",
    species: [{ name: "Phyllostachys mannii", culms: 400 }],
  },
  {
    id: "bp002",
    srNo: 2,
    code: "ARWEBoP0054",
    yearOfCreation: "2018-2019",
    state: "Arunachal Pradesh",
    district: "West Kameng",
    block: "Bomdila",
    personInCharge: "Tsering Dorjee",
    contact: "9436045123",
    email: "tsering.dorjee@gmail.com",
    address: "Bomdila Township, West Kameng",
    areaHa: 40,
    irrigated: true,
    category: "Private",
    species: [{ name: "Bambusa tulda", culms: 800 }],
  },
  {
    id: "bp003",
    srNo: 3,
    code: "ARPASAP0067",
    yearOfCreation: "2018-2019",
    state: "Arunachal Pradesh",
    district: "Papum Pare",
    block: "Sagalee",
    personInCharge: "Kipa Taki",
    contact: "9862345678",
    email: "kipa.taki@gmail.com",
    address: "Sagalee Block, Papum Pare",
    areaHa: 30,
    irrigated: false,
    category: "Private",
    species: [
      { name: "Bambusa tulda", culms: 400 },
      { name: "Bambusa balcooa", culms: 400 },
      { name: "Dendrocalamus hamiltonii", culms: 400 },
    ],
  },
  {
    id: "bp003b",
    srNo: 4,
    code: "ARPABOP0073",
    yearOfCreation: "2018-2019",
    state: "Arunachal Pradesh",
    district: "Papum Pare",
    block: "Borum",
    personInCharge: "Sourav Sarkar",
    contact: "8787764334",
    email: "sunnyjr.16@gmail.com",
    address: "Forest Colony-II, Chimpu, Itanagar",
    areaHa: 30,
    irrigated: false,
    category: "Private",
    species: [
      { name: "Bambusa tulda", culms: 400 },
      { name: "Bambusa balcooa", culms: 400 },
      { name: "Dendrocalamus hamiltonii", culms: 400 },
    ],
  },
  {
    id: "bp004",
    srNo: 5,
    code: "ASJORKA0078",
    yearOfCreation: "2019-2020",
    state: "Assam",
    district: "Jorhat",
    block: "Jorhat",
    personInCharge: "Hemanta Baruah",
    contact: "9435012345",
    email: "hemanta.baruah@gmail.com",
    address: "Cinnamara, Jorhat, Assam",
    areaHa: 12,
    irrigated: true,
    category: "SHG",
    species: [
      { name: "Bambusa balcooa", culms: 1200 },
      { name: "Melocanna baccifera", culms: 600 },
    ],
  },
  {
    id: "bp005",
    srNo: 6,
    code: "ASDIKAM0082",
    yearOfCreation: "2019-2020",
    state: "Assam",
    district: "Dibrugarh",
    block: "Dibrugarh",
    personInCharge: "Rina Gogoi",
    contact: "9876501234",
    email: "dibru.plantation@gmail.com",
    address: "Bamunpukhuri, Dibrugarh, Assam",
    areaHa: 8,
    irrigated: false,
    category: "SHG",
    species: [{ name: "Bambusa tulda", culms: 950 }],
  },
  {
    id: "bp006",
    srNo: 7,
    code: "MHGADCH0091",
    yearOfCreation: "2020-2021",
    state: "Maharashtra",
    district: "Gadchiroli",
    block: "Gadchiroli",
    personInCharge: "Rajesh Wankhede",
    contact: "7741234560",
    email: "dfo.gadchiroli@mahaforest.gov.in",
    address: "Forest Division Campus, Gadchiroli",
    areaHa: 25,
    irrigated: true,
    category: "Government",
    species: [
      { name: "Dendrocalamus strictus", culms: 2000 },
      { name: "Bambusa bambos", culms: 1500 },
    ],
  },
  {
    id: "bp007",
    srNo: 8,
    code: "MPSEONI0103",
    yearOfCreation: "2019-2020",
    state: "Madhya Pradesh",
    district: "Seoni",
    block: "Barghat",
    personInCharge: "Suresh Patel",
    contact: "8827776575",
    email: "ccfre.sni@mp.gov.in",
    address: "Gram Amgaon, Block Barghat, Seoni",
    areaHa: 15,
    irrigated: false,
    category: "Private",
    species: [{ name: "Dendrocalamus strictus", culms: 1800 }],
  },
  {
    id: "bp008",
    srNo: 9,
    code: "TRWEST0115",
    yearOfCreation: "2020-2021",
    state: "Tripura",
    district: "West Tripura",
    block: "Jirania",
    personInCharge: "Biplab Debbarma",
    contact: "9862427467",
    email: "tripurabamboo@gmail.com",
    address: "Jirania Block, West Tripura",
    areaHa: 10,
    irrigated: true,
    category: "FPO",
    species: [{ name: "Melocanna baccifera", culms: 2200 }],
  },
  {
    id: "bp009",
    srNo: 10,
    code: "KAMYSUR0118",
    yearOfCreation: "2021-2022",
    state: "Karnataka",
    district: "Mysuru",
    block: "Hunsur",
    personInCharge: "Lakshmi Rao",
    contact: "8310456789",
    email: "hunsur.bamboo@kar.gov.in",
    address: "Hunsur Industrial Area, Mysuru",
    areaHa: 18,
    irrigated: true,
    category: "Government",
    species: [
      { name: "Bambusa bambos", culms: 1100 },
      { name: "Ochlandra travancorica", culms: 500 },
    ],
  },
  {
    id: "bp010",
    srNo: 11,
    code: "UPSONBH0124",
    yearOfCreation: "2019-2020",
    state: "Uttar Pradesh",
    district: "Sonbhadra",
    block: "Robertsganj",
    personInCharge: "Vijay Singh",
    contact: "9415012345",
    email: "dfo.sonbhadra@upforest.gov.in",
    address: "Forest Guest House Road, Robertsganj",
    areaHa: 22,
    irrigated: false,
    category: "Government",
    species: [{ name: "Dendrocalamus strictus", culms: 3500 }],
  },
  {
    id: "bp011",
    srNo: 12,
    code: "MZAIJAL0130",
    yearOfCreation: "2020-2021",
    state: "Mizoram",
    district: "Aizawl",
    block: "Aizawl",
    personInCharge: "Lalruatkima",
    contact: "9862345678",
    email: "nbm.mizoram@gmail.com",
    address: "Bamboo Mission Centre, Aizawl",
    areaHa: 6,
    irrigated: false,
    category: "SHG",
    species: [{ name: "Melocanna baccifera", culms: 900 }],
  },
  {
    id: "bp012",
    srNo: 13,
    code: "CGJAGD0136",
    yearOfCreation: "2021-2022",
    state: "Chhattisgarh",
    district: "Bastar",
    block: "Jagdalpur",
    personInCharge: "Ramesh Netam",
    contact: "7714321098",
    email: "ccf.bastar@cgforest.gov.in",
    address: "Collector Compound, Jagdalpur",
    areaHa: 35,
    irrigated: true,
    category: "Government",
    species: [
      { name: "Dendrocalamus strictus", culms: 2800 },
      { name: "Bambusa vulgaris", culms: 700 },
    ],
  },
  {
    id: "bp013",
    srNo: 14,
    code: "ODCUTT0142",
    yearOfCreation: "2020-2021",
    state: "Odisha",
    district: "Cuttack",
    block: "Cuttack",
    personInCharge: "Pradeep Mohanty",
    contact: "9438123456",
    email: "dfo.cuttack@odisha.gov.in",
    address: "Industrial Estate, Cuttack",
    areaHa: 14,
    irrigated: false,
    category: "Private",
    species: [{ name: "Bambusa bambos", culms: 1600 }],
  },
  {
    id: "bp014",
    srNo: 15,
    code: "TGBHAD0148",
    yearOfCreation: "2021-2022",
    state: "Telangana",
    district: "Bhadradri Kothagudem",
    block: "Bhadrachalam",
    personInCharge: "Srinivas Reddy",
    contact: "9848765432",
    email: "dfo.bhadrachalam@telangana.gov.in",
    address: "Forest Office, Bhadrachalam",
    areaHa: 20,
    irrigated: true,
    category: "FPO",
    species: [{ name: "Bambusa bambos", culms: 2400 }],
  },
  {
    id: "bp015",
    srNo: 16,
    code: "MLSHIL0155",
    yearOfCreation: "2019-2020",
    state: "Meghalaya",
    district: "East Khasi Hills",
    block: "Shillong",
    personInCharge: "Dorothy Khongwir",
    contact: "9436123456",
    email: "bamboo.meghalaya@gmail.com",
    address: "Laitumkhrah, Shillong",
    areaHa: 9,
    irrigated: false,
    category: "SHG",
    species: [
      { name: "Dendrocalamus hamiltonii", culms: 600 },
      { name: "Bambusa tulda", culms: 400 },
    ],
  },
];

/* ── Filter helpers ───────────────────────────────────────────── */

export type PlantationFilters = {
  year: string;
  state: string;
  district: string;
  block: string;
};

export const ALL = "all";

export function getPlantationSummary() {
  return plantationSummary;
}

export function getPlantationFilterOptions(filters: Partial<PlantationFilters>) {
  const allYears = [...new Set(bambooPlantations.map((p) => p.yearOfCreation))].sort();
  const allStates = [...new Set(bambooPlantations.map((p) => p.state))].sort();

  const inState =
    filters.state && filters.state !== ALL
      ? bambooPlantations.filter((p) => p.state === filters.state)
      : bambooPlantations;

  const allDistricts = [...new Set(inState.map((p) => p.district))].sort();

  const inDistrict =
    filters.district && filters.district !== ALL
      ? inState.filter((p) => p.district === filters.district)
      : inState;

  const allBlocks = [...new Set(inDistrict.map((p) => p.block))].sort();

  return { years: allYears, states: allStates, districts: allDistricts, blocks: allBlocks };
}

export function filterPlantations(
  filters: PlantationFilters,
  search: string,
): BambooPlantation[] {
  let result = bambooPlantations;

  if (filters.year !== ALL) {
    result = result.filter((p) => p.yearOfCreation === filters.year);
  }
  if (filters.state !== ALL) {
    result = result.filter((p) => p.state === filters.state);
  }
  if (filters.district !== ALL) {
    result = result.filter((p) => p.district === filters.district);
  }
  if (filters.block !== ALL) {
    result = result.filter((p) => p.block === filters.block);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (p) =>
        p.personInCharge.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.contact.includes(q) ||
        p.species.some((s) => s.name.toLowerCase().includes(q)),
    );
  }

  return result;
}

export function topStatesByPlantationArea(limit = 7) {
  const byState = new Map<string, number>();
  for (const p of bambooPlantations) {
    byState.set(p.state, (byState.get(p.state) ?? 0) + p.areaHa);
  }
  return [...byState.entries()]
    .map(([name, value]) => ({ name, value: Math.round(value * 10) / 10 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function topPlantationsByArea(limit = 5) {
  return [...bambooPlantations]
    .sort((a, b) => b.areaHa - a.areaHa)
    .slice(0, limit);
}
