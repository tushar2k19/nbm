import type { AgarbattiStickUnit } from "@/data/agarbattiStickUnits";

type ExportRow = {
  "S.No": number;
  State: string;
  District: string;
  Block: string;
  "Unit Name": string;
  Address: string;
  "Owner Type": string;
  "Bamboo Species": string;
  "Annual Capacity (MT)": number;
  "Actual Production (MT)": number;
  Status: string;
  "NBM Supported": string;
  "Contact No.": string;
  Email: string;
  Latitude: number;
  Longitude: number;
};

function buildRows(units: AgarbattiStickUnit[]): ExportRow[] {
  return units.map((u) => ({
    "S.No": u.srNo,
    State: u.state,
    District: u.district,
    Block: u.block,
    "Unit Name": u.name,
    Address: u.address,
    "Owner Type": u.ownerType,
    "Bamboo Species": u.bambooSpecies,
    "Annual Capacity (MT)": u.annualCapacityMt,
    "Actual Production (MT)": u.actualProductionMt,
    Status: u.status,
    "NBM Supported": u.nbmSupported ? "Yes" : "No",
    "Contact No.": u.contact,
    Email: u.email,
    Latitude: u.latitude,
    Longitude: u.longitude,
  }));
}

export async function exportAgarbattiSticksXlsx(units: AgarbattiStickUnit[], filename?: string) {
  const XLSX = await import("xlsx");
  const rows = buildRows(units);
  const ws = XLSX.utils.json_to_sheet(rows);

  ws["!cols"] = [
    { wch: 6 },
    { wch: 16 },
    { wch: 18 },
    { wch: 16 },
    { wch: 32 },
    { wch: 36 },
    { wch: 14 },
    { wch: 24 },
    { wch: 20 },
    { wch: 20 },
    { wch: 12 },
    { wch: 14 },
    { wch: 14 },
    { wch: 30 },
    { wch: 10 },
    { wch: 11 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Agarbatti Stick Units");

  const today = new Date().toISOString().slice(0, 10);
  const file = filename ?? `agarbatti-stick-units-${today}.xlsx`;
  XLSX.writeFile(wb, file);
}
