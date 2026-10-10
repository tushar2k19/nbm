/**
 * Dropdown options for NBM monthly entry forms.
 * These mirror the official NBM reporting format.
 */

// ── Activity (24 items) ──
export const ACTIVITY_OPTIONS = [
  "Nursery (in nos.)",
  "Plantation (in ha)",
  "Plantation Maintenance",
  "Promotion of bamboo treatment and preservation (in nos.)",
  "Product Development and Processing (in nos.)",
  "Establishment of processing units for value addition of Bamboo (in Nos.)",
  "Management of Bamboo waste in primary processing units",
  "Handicrafts/Cottage industry",
  "Furniture making",
  "Jewellery making",
  "Bamboo shoots processing",
  "Incense stick making",
  "Fabric/Fibre extraction",
  "Common facility centre (CFC)",
  "Bamboo board/mat/corrugated sheets/floor tiles making",
  "Bio Energy extraction",
  "Activated Carbon product",
  "Ethanol Gassifier",
  "Promotion and Development of Infrastructure for Bamboo Market (in nos.)",
  "Development of tools, equipment & machinery (in nos.)",
  "Capacity Building Training (in no. of persons)",
  "Workshop/seminar/trade fairs/exhibition (in nos.)",
  "Research & Development (in nos.)",
  "Project Management Cost",
] as const;

export type ActivityOption = (typeof ACTIVITY_OPTIONS)[number];

// ── Beneficiary Type (6 items) ──
export const BENEFICIARY_TYPE_OPTIONS = [
  "Institution- Govt.",
  "Institution- SHG",
  "Institution- FPO/ Cooperative",
  "Institution- University",
  "Institution- Others",
  "Individual",
] as const;

export type BeneficiaryTypeOption = (typeof BENEFICIARY_TYPE_OPTIONS)[number];

/** Whether the beneficiary type is an individual (not an institution) */
export function isIndividualBeneficiary(type: string): boolean {
  return type === "Individual";
}

// ── Gender ──
export const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;
export type GenderOption = (typeof GENDER_OPTIONS)[number];

// ── Category ──
export const CATEGORY_OPTIONS = ["General", "OBC", "SC", "ST"] as const;
export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];

// ── Entry Status (workflow states) ──
export const ENTRY_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  APPROVED: "approved",
  DECLINED: "declined",
  REVISION_REQUESTED: "revision_requested",
} as const;

export type EntryStatus = (typeof ENTRY_STATUS)[keyof typeof ENTRY_STATUS];

/** Human-readable label for a status */
export function getStatusLabel(status: string): string {
  switch (status) {
    case ENTRY_STATUS.DRAFT: return "Draft";
    case ENTRY_STATUS.SUBMITTED: return "Submitted";
    case ENTRY_STATUS.UNDER_REVIEW: return "Under Review";
    case ENTRY_STATUS.APPROVED: return "Approved";
    case ENTRY_STATUS.DECLINED: return "Declined";
    case ENTRY_STATUS.REVISION_REQUESTED: return "Revision Requested";
    default: return status;
  }
}

/** Status color for UI display */
export function getStatusColor(status: string): string {
  switch (status) {
    case ENTRY_STATUS.DRAFT: return "text-muted-foreground";
    case ENTRY_STATUS.SUBMITTED: return "text-amber-600";
    case ENTRY_STATUS.UNDER_REVIEW: return "text-blue-600";
    case ENTRY_STATUS.APPROVED: return "text-emerald-600";
    case ENTRY_STATUS.DECLINED: return "text-red-600";
    case ENTRY_STATUS.REVISION_REQUESTED: return "text-orange-600";
    default: return "text-muted-foreground";
  }
}
