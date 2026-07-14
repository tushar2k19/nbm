import { annualActionPlanArchive } from "./annualActionPlan";

export type ReportDoc = {
  id: string;
  title: string;
  description: string;
  /** Official PDF on nbm.da.gov.in — opens in a new tab when set */
  pdfUrl?: string;
};

export type ReportSection = {
  id: string;
  title: string;
  description: string;
  items: ReportDoc[];
};

export const annualActionPlan: ReportSection = {
  id: "annual-action-plan",
  title: "Annual Action Plan",
  description: "State-wise annual action plans submitted under the National Bamboo Mission.",
  items: annualActionPlanArchive.map((entry) => ({
    id: entry.id,
    title: `Annual Action Plan FY ${entry.financialYear}`,
    description: "PDF",
    pdfUrl: entry.pdfUrl,
  })),
};

export const sectorReportSections: ReportSection[] = [
  {
    id: "bamboo-plantation",
    title: "Bamboo Plantation",
    description: "State-wise area under bamboo plantation, species coverage and survival statistics.",
    items: [
      { id: "plantation-2025-26", title: "State-wise Plantation Area Report 2025-26", description: "PDF · 2.4 MB" },
      { id: "species-coverage", title: "Species-wise Plantation Coverage", description: "XLSX · 880 KB" },
      { id: "survival-2024-25", title: "Survival & Productivity Assessment 2024-25", description: "PDF · 3.1 MB" },
      { id: "ne-summary", title: "North-East Region Plantation Summary", description: "PDF · 1.6 MB" },
    ],
  },
  {
    id: "agarbatti-stick",
    title: "Agarbatti Stick",
    description: "Production, demand-supply and import substitution data for round bamboo sticks.",
    items: [
      { id: "agarbatti-2025-26", title: "Agarbatti Stick Production Report 2025-26", description: "PDF · 1.9 MB" },
      { id: "import-substitution", title: "Import Substitution Status — Round Sticks", description: "PDF · 1.2 MB" },
      { id: "approved-units", title: "Approved Agarbatti Stick Units (State-wise)", description: "XLSX · 540 KB" },
      { id: "msp-guidelines", title: "MSP & Procurement Guidelines", description: "PDF · 720 KB" },
    ],
  },
  {
    id: "accredited-nurseries",
    title: "Accredited Nurseries",
    description: "List of NBM accredited bamboo nurseries, tissue culture labs and certification status.",
    items: [
      { id: "nursery-list", title: "Accredited Bamboo Nurseries — National List", description: "PDF · 2.8 MB" },
      { id: "tc-labs", title: "Tissue Culture Labs Empanelled by NBM", description: "XLSX · 460 KB" },
      { id: "qpm-cert", title: "Quality Planting Material Certification", description: "PDF · 1.1 MB" },
      { id: "nursery-audit", title: "Nursery Performance Audit 2024-25", description: "PDF · 2.0 MB" },
    ],
  },
];

export const allReportSections: ReportSection[] = [annualActionPlan, ...sectorReportSections];
