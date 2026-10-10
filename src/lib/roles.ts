/**
 * Role definitions for the NBM portal.
 * Maps to the `nbm_role` enum in Supabase.
 */

export const NBM_ROLES = {
  STATE_EDITOR: "state_editor",
  STATE_REVIEWER: "state_reviewer",
  NBM_CENTRAL: "nbm_central",
} as const;

export type NbmRole = (typeof NBM_ROLES)[keyof typeof NBM_ROLES];

// ── Type guards ──

export function isEditor(role: string | null | undefined): role is "state_editor" {
  return role === NBM_ROLES.STATE_EDITOR;
}

export function isReviewer(role: string | null | undefined): role is "state_reviewer" {
  return role === NBM_ROLES.STATE_REVIEWER;
}

export function isCentral(role: string | null | undefined): role is "nbm_central" {
  return role === NBM_ROLES.NBM_CENTRAL;
}

export function isStateRole(role: string | null | undefined): boolean {
  return isEditor(role) || isReviewer(role);
}

// ── Display helpers ──

export function getRoleLabel(role: string | null | undefined): string {
  switch (role) {
    case NBM_ROLES.STATE_EDITOR: return "State Editor";
    case NBM_ROLES.STATE_REVIEWER: return "State Reviewer";
    case NBM_ROLES.NBM_CENTRAL: return "NBM Central";
    default: return "Unknown";
  }
}

/** Portal path each role should land on after login */
export function getPortalPath(role: string | null | undefined): string {
  switch (role) {
    case NBM_ROLES.STATE_EDITOR: return "/portal/editor";
    case NBM_ROLES.STATE_REVIEWER: return "/portal/reviewer";
    case NBM_ROLES.NBM_CENTRAL: return "/portal/central";
    default: return "/login";
  }
}
