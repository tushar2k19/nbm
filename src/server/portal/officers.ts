import { randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { indianStates } from "@/data/indianStates";
import { getMysqlPool } from "@/server/db/mysql";
import { issuePasswordLink, unusablePasswordHash } from "@/server/auth/password-reset";
import type { NbmRole } from "@/lib/roles";

const STATE_ROLES = new Set<NbmRole>(["state_editor", "state_reviewer"]);

export type OfficerInput = {
  fullName: string;
  email: string;
  mobile: string | null;
  stateCode: string;
  role: NbmRole;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function validateOfficer(input: OfficerInput): void {
  if (!input.fullName.trim()) throw new Error("Name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) throw new Error("Enter a valid official email.");
  if (!indianStates.some((state) => state.code === input.stateCode)) throw new Error("Select a state.");
  if (!STATE_ROLES.has(input.role)) throw new Error("Role must be State Editor or State Reviewer.");
}

export async function createStateOfficer(input: OfficerInput, createdBy: string, origin: string) {
  const email = normalizeEmail(input.email);
  validateOfficer({ ...input, email });
  const db = getMysqlPool();

  const [existing] = await db.query<RowDataPacket[]>(
    "SELECT id FROM portal_users WHERE email = ? LIMIT 1",
    [email],
  );
  if (existing[0]) throw new Error("An account with this email already exists.");

  const userId = randomUUID();
  const profileId = randomUUID();
  await db.query("INSERT INTO portal_users (id, email, password_hash) VALUES (?, ?, ?)", [
    userId,
    email,
    unusablePasswordHash(),
  ]);
  await db.query(
    `INSERT INTO state_users (id, user_id, full_name, email, mobile, state_code, role, is_active, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)`,
    [profileId, userId, input.fullName.trim(), email, input.mobile?.trim() || null, input.stateCode, input.role, createdBy],
  );

  const mail = await issuePasswordLink({
    userId,
    email,
    fullName: input.fullName.trim(),
    purpose: "invite",
    origin,
  });

  return { id: profileId, userId, ...mail };
}

export async function updateStateOfficer(
  profileId: string,
  patch: Partial<OfficerInput> & { isActive?: boolean },
  origin: string,
) {
  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT id, user_id, full_name, email, mobile, state_code, role, is_active
     FROM state_users WHERE id = ? LIMIT 1`,
    [profileId],
  );
  const current = rows[0];
  if (!current) throw new Error("User not found.");
  if (current.role === "nbm_central") throw new Error("Headquarters accounts are not edited here.");

  const next: OfficerInput = {
    fullName: (patch.fullName ?? String(current.full_name)).trim(),
    email: normalizeEmail(patch.email ?? String(current.email)),
    mobile: patch.mobile !== undefined ? patch.mobile : current.mobile != null ? String(current.mobile) : null,
    stateCode: patch.stateCode ?? String(current.state_code),
    role: (patch.role ?? current.role) as NbmRole,
  };
  validateOfficer(next);

  const emailChanged = next.email !== String(current.email);
  if (emailChanged) {
    const [clash] = await db.query<RowDataPacket[]>(
      "SELECT id FROM portal_users WHERE email = ? AND id <> ? LIMIT 1",
      [next.email, current.user_id],
    );
    if (clash[0]) throw new Error("An account with this email already exists.");
  }

  const isActive = patch.isActive === undefined ? Boolean(current.is_active) : patch.isActive;

  await db.query(
    `UPDATE state_users
     SET full_name = ?, email = ?, mobile = ?, state_code = ?, role = ?, is_active = ?
     WHERE id = ?`,
    [next.fullName, next.email, next.mobile?.trim() || null, next.stateCode, next.role, isActive ? 1 : 0, profileId],
  );
  await db.query("UPDATE portal_users SET email = ? WHERE id = ?", [next.email, current.user_id]);

  if (emailChanged) {
    await db.query("UPDATE portal_users SET password_hash = ? WHERE id = ?", [
      unusablePasswordHash(),
      current.user_id,
    ]);
    return issuePasswordLink({
      userId: String(current.user_id),
      email: next.email,
      fullName: next.fullName,
      purpose: "invite",
      origin,
    });
  }

  return null;
}

export async function requestPasswordReset(email: string, origin: string): Promise<string | null> {
  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT u.id AS user_id, s.full_name, s.role
     FROM portal_users u
     JOIN state_users s ON s.user_id = u.id
     WHERE u.email = ? AND s.is_active = 1
     LIMIT 1`,
    [normalizeEmail(email)],
  );
  const row = rows[0];
  if (!row) return null;
  if (row.role === "nbm_central") return null;

  const mail = await issuePasswordLink({
    userId: String(row.user_id),
    email: normalizeEmail(email),
    fullName: String(row.full_name),
    purpose: "reset",
    origin,
  });
  return mail.previewPath;
}

export function requestOrigin(request: Request): string {
  const configured = process.env.APP_ORIGIN?.trim();
  if (configured) return configured.replace(/\/$/, "");
  return new URL(request.url).origin;
}

export async function latestMessageIdForUser(userId: string): Promise<string | null> {
  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT id FROM email_outbox WHERE related_user_id = ? ORDER BY created_at DESC LIMIT 1",
    [userId],
  );
  return rows[0] ? String(rows[0].id) : null;
}
