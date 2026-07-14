import type { AccreditedNursery } from "@/data/accreditedNurseries";

type ExportRow = {
  "S.No": number;
  State: string;
  District: string;
  Block: string;
  "Nursery Name": string;
  Address: string;
  Source: string;
  Type: string;
  "Contact No.": string;
  Email: string;
  Latitude: number;
  Longitude: number;
  "Species Name": string;
  Stock: number;
  "Stock As On": string;
  "Total Stock (Nursery)": number;
};

function buildRows(nurseries: AccreditedNursery[]): ExportRow[] {
  const rows: ExportRow[] = [];
  for (const n of nurseries) {
    const totalStock = n.species.reduce((sum, s) => sum + s.stock, 0);
    if (n.species.length === 0) {
      rows.push({
        "S.No": n.srNo,
        State: n.state,
        District: n.district,
        Block: n.block,
        "Nursery Name": n.name,
        Address: n.address,
        Source: n.source,
        Type: n.type,
        "Contact No.": n.contact,
        Email: n.email,
        Latitude: n.latitude,
        Longitude: n.longitude,
        "Species Name": "",
        Stock: 0,
        "Stock As On": "",
        "Total Stock (Nursery)": 0,
      });
    } else {
      for (const sp of n.species) {
        rows.push({
          "S.No": n.srNo,
          State: n.state,
          District: n.district,
          Block: n.block,
          "Nursery Name": n.name,
          Address: n.address,
          Source: n.source,
          Type: n.type,
          "Contact No.": n.contact,
          Email: n.email,
          Latitude: n.latitude,
          Longitude: n.longitude,
          "Species Name": sp.name,
          Stock: sp.stock,
          "Stock As On": sp.asOn,
          "Total Stock (Nursery)": totalStock,
        });
      }
    }
  }
  return rows;
}

export async function exportAccreditedNurseriesXlsx(
  nurseries: AccreditedNursery[],
  filename?: string,
) {
  // Dynamic import so xlsx is only bundled when actually used
  const XLSX = await import("xlsx");
  const rows = buildRows(nurseries);
  const ws = XLSX.utils.json_to_sheet(rows);

  // Column widths for readability
  ws["!cols"] = [
    { wch: 6 },   // S.No
    { wch: 16 },  // State
    { wch: 18 },  // District
    { wch: 16 },  // Block
    { wch: 28 },  // Nursery Name
    { wch: 36 },  // Address
    { wch: 16 },  // Source
    { wch: 12 },  // Type
    { wch: 14 },  // Contact No.
    { wch: 30 },  // Email
    { wch: 10 },  // Latitude
    { wch: 11 },  // Longitude
    { wch: 32 },  // Species Name
    { wch: 12 },  // Stock
    { wch: 14 },  // Stock As On
    { wch: 22 },  // Total Stock (Nursery)
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Accredited Nurseries");

  const today = new Date().toISOString().slice(0, 10);
  const file = filename ?? `accredited-nurseries-${today}.xlsx`;
  XLSX.writeFile(wb, file);
}
