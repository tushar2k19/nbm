/** Official NBM document base — SLEC PDFs hosted on nbm.da.gov.in */
export const NBM_OFFICIAL_BASE = "https://nbm.da.gov.in";

export type StateMissionRow = {
  id: string;
  stateName: string;
  nodalDepartment: string;
  missionDirector: string;
  /** Relative path under nbm.da.gov.in, or null when no SLEC PDF is published */
  slecPdfPath: string | null;
  /** Text shown in SLEC column when there is no PDF (e.g. "Constituted") */
  slecNote?: string;
  currentStock: string;
  harvestedLast5Years: string;
  proposedHarvest1819: string;
};

export function stateMissionPdfUrl(path: string | null): string | null {
  if (!path) return null;
  return `${NBM_OFFICIAL_BASE}/${path.replace(/^\//, "")}`;
}

/** State Mission table — sourced from nbm.da.gov.in/State-Mission (Jun 2022 snapshot) */
export const stateMissionRows: StateMissionRow[] = [
  {
    id: "andhra-pradesh",
    stateName: "Andhra Pradesh",
    nodalDepartment: "Mission Director (SBM)",
    missionDirector: "Dr. S. S. Sreedhar I.F.S",
    slecPdfPath: "Documents/SLEC/AndhraPradesh.pdf",
    currentStock: "NR",
    harvestedLast5Years: "1,44,919.93",
    proposedHarvest1819: "NR",
  },
  {
    id: "arunachal-pradesh",
    stateName: "Arunachal Pradesh",
    nodalDepartment: "Forest Department",
    missionDirector: "Shri. R.K. Singh, IFS, Mission Director, PCCF cum",
    slecPdfPath: "Documents/SLEC/ArunachalPradesh.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "assam",
    stateName: "Assam",
    nodalDepartment: "M.D, State Bamboo Development Agency",
    missionDirector: "Mr. Oinam Saran Kumar Singh",
    slecPdfPath: "Documents/SLEC/AssamSLEC.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "bihar",
    stateName: "Bihar",
    nodalDepartment: "Environment & Forest Department (Hariyali Mission)",
    missionDirector:
      "Shri. Sanjay Kumar Sinha, IFS State Mission Director (NBM) cum CCF cum Director, Hariyali Mission",
    slecPdfPath: "Documents/SLEC/Bihar.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "chhattisgarh",
    stateName: "Chhattisgarh",
    nodalDepartment: "Department of Agriculture & Bio-Technology",
    missionDirector: "Dr. M. Geeta Secretary & Agriculture Production Commissioner",
    slecPdfPath: "Documents/SLEC/Chhattisgarh.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "gujarat",
    stateName: "Gujarat",
    nodalDepartment: "Forest Department",
    missionDirector: "Shri Ram Kumar, IFS, APCCF",
    slecPdfPath: null,
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "himachal-pradesh",
    stateName: "Himachal Pradesh",
    nodalDepartment: "Agriculture Department",
    missionDirector: "Shri Deshraj Thakur SMD (NBM)",
    slecPdfPath: null,
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "jharkhand",
    stateName: "Jharkhand",
    nodalDepartment: "Forest Department",
    missionDirector:
      "Shri. Vishwanath Sah, State Mission Director (NBM) CCF-cum-Chief Co-ordinator",
    slecPdfPath: "Documents/SLEC/Jharkhand.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "karnataka",
    stateName: "Karnataka",
    nodalDepartment: "Forest Department",
    missionDirector: "Shri. Rajkumar Srivastava, IFS, APCCF and State Mission Director (NBM)",
    slecPdfPath: "Documents/SLEC/Karnataka.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "kerala",
    stateName: "Kerala",
    nodalDepartment: "Department of Industries & Commerce",
    missionDirector: "Shri. Bhandari Swagat Ranveerchand IAS",
    slecPdfPath: "Documents/SLEC/Kerala.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "madhya-pradesh",
    stateName: "Madhya Pradesh",
    nodalDepartment: "Madhya Pradesh State Bamboo Mission",
    missionDirector: "Dr. U.K. Subuddhi, State Mission Director",
    slecPdfPath: null,
    slecNote: "Constituted",
    currentStock: "76,58,000",
    harvestedLast5Years: "2,18,000",
    proposedHarvest1819: "1,08,000",
  },
  {
    id: "maharashtra",
    stateName: "Maharashtra",
    nodalDepartment: "Maharashtra Bamboo Development Board",
    missionDirector: "Shri. M. SRINIVASA RAO, IFS, MD, NBM",
    slecPdfPath: "Documents/SLEC/Maharashtra.pdf",
    currentStock: "62,65,000",
    harvestedLast5Years: "1,33,939",
    proposedHarvest1819: "30,293",
  },
  {
    id: "manipur",
    stateName: "Manipur",
    nodalDepartment: "Forest Department Manipur",
    missionDirector: "Shri. SS Chhabara IFS",
    slecPdfPath: "Documents/SLEC/Manipur.pdf",
    currentStock: "1,94,000",
    harvestedLast5Years: "15,46,900",
    proposedHarvest1819: "NR",
  },
  {
    id: "meghalaya",
    stateName: "Meghalaya",
    nodalDepartment: "Soil & Water Conservation Department",
    missionDirector: "Shri. L.N. Marak Mission Director Bamboo Development Agency",
    slecPdfPath: "Documents/SLEC/Meghalaya.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "mizoram",
    stateName: "Mizoram",
    nodalDepartment: "Horticulture Department",
    missionDirector: "Dr. Elizabeth Saipari, Director",
    slecPdfPath: "Documents/SLEC/MizoramSLEC.pdf",
    currentStock: "18,28,000",
    harvestedLast5Years: "1,43,756",
    proposedHarvest1819: "NR",
  },
  {
    id: "nagaland",
    stateName: "Nagaland",
    nodalDepartment: "Planning and Co-ordination Department (NBDA)",
    missionDirector: "Shri Tarep Imchen, NCS, State Mission Director (NBM)",
    slecPdfPath: "Documents/SLEC/Nagaland.pdf",
    currentStock: "3,54,870",
    harvestedLast5Years: "2,21,422",
    proposedHarvest1819: "22,141",
  },
  {
    id: "odisha",
    stateName: "Odisha",
    nodalDepartment: "Forest Department",
    missionDirector: "Shri Sudeep Nayak, IFS, State Mission Director (NBM)",
    slecPdfPath: "Documents/SLEC/Odisha.pdf",
    currentStock: "1,21,770",
    harvestedLast5Years: "51,039.42",
    proposedHarvest1819: "NR",
  },
  {
    id: "sikkim",
    stateName: "Sikkim",
    nodalDepartment: "Horticulture & Cash Crop Development Department",
    missionDirector: "Shri Manoj Kumar Subba, Director",
    slecPdfPath: "Documents/SLEC/Sikkim.pdf",
    currentStock: "1,24,000",
    harvestedLast5Years: "670",
    proposedHarvest1819: "464",
  },
  {
    id: "tamil-nadu",
    stateName: "Tamil Nadu",
    nodalDepartment: "Tamil Nadu Horticulture Development Agency",
    missionDirector: "Dr. N. Subbaiyan, I.A.S, Managing Director",
    slecPdfPath: null,
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "telangana",
    stateName: "Telangana",
    nodalDepartment: "Horticulture Department",
    missionDirector: "Shri. L. Venkatram Reddy, Director of Horticulture",
    slecPdfPath: "Documents/SLEC/Telangana.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "tripura",
    stateName: "Tripura",
    nodalDepartment: "Dept. of Industries and Commerce",
    missionDirector: "Shri. Raval H. Kumar, IAS",
    slecPdfPath: "Documents/SLEC/Tripura.pdf",
    currentStock: "17,16,000",
    harvestedLast5Years: "2,12,000 (2013-14 to 2016-17)",
    proposedHarvest1819: "NR",
  },
  {
    id: "uttarakhand",
    stateName: "Uttarakhand",
    nodalDepartment: "Forest Department",
    missionDirector: "Dr. Vijay Kumar-IFS",
    slecPdfPath: "Documents/SLEC/UttSLEC.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
  {
    id: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    nodalDepartment: "Forest Head Office",
    missionDirector: "Shri. K. Ilango, State Mission Director (NBM)",
    slecPdfPath: "Documents/SLEC/UttarPradesh.pdf",
    currentStock: "NR",
    harvestedLast5Years: "NR",
    proposedHarvest1819: "NR",
  },
];

export const stateMissionStats = {
  stateCount: stateMissionRows.length,
  slecPdfCount: stateMissionRows.filter((r) => r.slecPdfPath).length,
};
