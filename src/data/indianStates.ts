/**
 * All 28 States and 8 Union Territories of India.
 * `code` follows the ISO 3166-2:IN two-letter subdivision code.
 */

export type IndianStateEntry = {
  code: string;
  name: string;
  type: "state" | "ut";
};

export const indianStates: IndianStateEntry[] = [
  // ── States (28) ──
  { code: "AP", name: "Andhra Pradesh", type: "state" },
  { code: "AR", name: "Arunachal Pradesh", type: "state" },
  { code: "AS", name: "Assam", type: "state" },
  { code: "BR", name: "Bihar", type: "state" },
  { code: "CT", name: "Chhattisgarh", type: "state" },
  { code: "GA", name: "Goa", type: "state" },
  { code: "GJ", name: "Gujarat", type: "state" },
  { code: "HR", name: "Haryana", type: "state" },
  { code: "HP", name: "Himachal Pradesh", type: "state" },
  { code: "JH", name: "Jharkhand", type: "state" },
  { code: "KA", name: "Karnataka", type: "state" },
  { code: "KL", name: "Kerala", type: "state" },
  { code: "MP", name: "Madhya Pradesh", type: "state" },
  { code: "MH", name: "Maharashtra", type: "state" },
  { code: "MN", name: "Manipur", type: "state" },
  { code: "ML", name: "Meghalaya", type: "state" },
  { code: "MZ", name: "Mizoram", type: "state" },
  { code: "NL", name: "Nagaland", type: "state" },
  { code: "OD", name: "Odisha", type: "state" },
  { code: "PB", name: "Punjab", type: "state" },
  { code: "RJ", name: "Rajasthan", type: "state" },
  { code: "SK", name: "Sikkim", type: "state" },
  { code: "TN", name: "Tamil Nadu", type: "state" },
  { code: "TG", name: "Telangana", type: "state" },
  { code: "TR", name: "Tripura", type: "state" },
  { code: "UP", name: "Uttar Pradesh", type: "state" },
  { code: "UK", name: "Uttarakhand", type: "state" },
  { code: "WB", name: "West Bengal", type: "state" },
  // ── Union Territories (8) ──
  { code: "AN", name: "Andaman and Nicobar Islands", type: "ut" },
  { code: "CH", name: "Chandigarh", type: "ut" },
  { code: "DN", name: "Dadra and Nagar Haveli and Daman and Diu", type: "ut" },
  { code: "DL", name: "Delhi (NCT)", type: "ut" },
  { code: "JK", name: "Jammu and Kashmir", type: "ut" },
  { code: "LA", name: "Ladakh", type: "ut" },
  { code: "LD", name: "Lakshadweep", type: "ut" },
  { code: "PY", name: "Puducherry", type: "ut" },
];

/** Map: state_code → state name */
export const stateCodeToName: Record<string, string> = Object.fromEntries(
  indianStates.map((s) => [s.code, s.name]),
);

/** Map: state name → state_code */
export const stateNameToCode: Record<string, string> = Object.fromEntries(
  indianStates.map((s) => [s.name, s.code]),
);

/** Get the display name for a state code, or the code itself as fallback */
export function getStateName(code: string): string {
  return stateCodeToName[code] ?? code;
}
