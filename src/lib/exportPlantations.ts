import type { BambooPlantation } from "@/data/bambooPlantations";

type ExportRow = {
  "S.No": number;
  Code: string;
  State: string;
  District: string;
  Block: string;
  "Person In-charge": string;
  "Contact No.": string;
  Email: string;
  Address: string;
  "Year of Creation": string;
  "Area (Ha)": number;
  Irrigated: string;
  Category: string;
  "Species Name": string;
  "No of Culms": number;
  "Total Culms (Plantation)": number;
};

function buildRows(plantations: BambooPlantation[]): ExportRow[] {
  const rows: ExportRow[] = [];
  for (const p of plantations) {
    const totalCulms = p.species.reduce((sum, s) => sum + s.culms, 0);
    if (p.species.length === 0) {
      rows.push({
        "S.No": p.srNo,
        Code: p.code,
        State: p.state,
        District: p.district,
        Block: p.block,
        "Person In-charge": p.personInCharge,
        "Contact No.": p.contact,
        Email: p.email,
        Address: p.address,
        "Year of Creation": p.yearOfCreation,
        "Area (Ha)": p.areaHa,
        Irrigated: p.irrigated ? "Yes" : "No",
        Category: p.category,
        "Species Name": "",
        "No of Culms": 0,
        "Total Culms (Plantation)": 0,
      });
    } else {
      for (const sp of p.species) {
        rows.push({
          "S.No": p.srNo,
          Code: p.code,
          State: p.state,
          District: p.district,
          Block: p.block,
          "Person In-charge": p.personInCharge,
          "Contact No.": p.contact,
          Email: p.email,
          Address: p.address,
          "Year of Creation": p.yearOfCreation,
          "Area (Ha)": p.areaHa,
          Irrigated: p.irrigated ? "Yes" : "No",
          Category: p.category,
          "Species Name": sp.name,
          "No of Culms": sp.culms,
          "Total Culms (Plantation)": totalCulms,
        });
      }
    }
  }
  return rows;
}

export async function exportPlantationsXlsx(
  plantations: BambooPlantation[],
  filename?: string,
) {
  const XLSX = await import("xlsx");
  const rows = buildRows(plantations);
  const ws = XLSX.utils.json_to_sheet(rows);

  ws["!cols"] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
    { wch: 16 },
    { wch: 22 },
    { wch: 14 },
    { wch: 30 },
    { wch: 36 },
    { wch: 14 },
    { wch: 10 },
    { wch: 10 },
    { wch: 12 },
    { wch: 32 },
    { wch: 14 },
    { wch: 22 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Bamboo Plantations");

  const today = new Date().toISOString().slice(0, 10);
  const file = filename ?? `bamboo-plantations-${today}.xlsx`;
  XLSX.writeFile(wb, file);
}
