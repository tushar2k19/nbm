import { createHash, randomBytes, randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "@/server/db/mysql";
import { hashPassword } from "@/server/auth/password";
import { deliverPasswordEmail, type PasswordMailPurpose } from "@/server/mail/deliver";

const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;

export function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function passwordPolicyError(password: string): string | null {
  if (password.length < 8) return "Use at least 8 characters.";
  if (!/[a-z]/.test(password)) return "Include a lowercase letter.";
  if (!/[A-Z]/.test(password)) return "Include an uppercase letter.";
  if (!/[0-9]/.test(password)) return "Include a digit.";
  return null;
}

export async function issuePasswordLink(input: {
  userId: string;
  email: string;
  fullName: string;
  purpose: PasswordMailPurpose;
  origin: string;
}): Promise<{ messageId: string; previewPath: string }> {
  const token = randomBytes(32).toString("base64url");
  const id = randomUUID();
  const expires = new Date(Date.now() + TOKEN_TTL_MS);
  const db = getMysqlPool();

  await db.query(
    "UPDATE password_reset_tokens SET used_at = NOW() WHERE user_id = ? AND used_at IS NULL",
    [input.userId],
  );
  await db.query(
    `INSERT INTO password_reset_tokens (id, user_id, token_hash, purpose, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
    [id, input.userId, hashResetToken(token), input.purpose, expires],
  );

  const setPasswordUrl = `${input.origin}/set-password?token=${encodeURIComponent(token)}`;
  return deliverPasswordEmail({
    to: input.email,
    fullName: input.fullName,
    purpose: input.purpose,
    setPasswordUrl,
    relatedUserId: input.userId,
  });
}

export async function lookupResetToken(token: string): Promise<{
  email: string;
  fullName: string;
  purpose: PasswordMailPurpose;
} | null> {
  if (!token) return null;
  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT t.purpose, u.email, s.full_name
     FROM password_reset_tokens t
     JOIN portal_users u ON u.id = t.user_id
     JOIN state_users s ON s.user_id = t.user_id
     WHERE t.token_hash = ?
       AND t.used_at IS NULL
       AND t.expires_at > NOW()
       AND s.is_active = 1
     LIMIT 1`,
    [hashResetToken(token)],
  );
  const row = rows[0];
  if (!row) return null;
  return {
    email: String(row.email),
    fullName: String(row.full_name),
    purpose: row.purpose as PasswordMailPurpose,
  };
}

export async function consumeResetToken(token: string, password: string): Promise<void> {
  const policy = passwordPolicyError(password);
  if (policy) throw new Error(policy);

  const db = getMysqlPool();
  const tokenHash = hashResetToken(token);
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT t.id, t.user_id
     FROM password_reset_tokens t
     JOIN state_users s ON s.user_id = t.user_id
     WHERE t.token_hash = ?
       AND t.used_at IS NULL
       AND t.expires_at > NOW()
       AND s.is_active = 1
     LIMIT 1`,
    [tokenHash],
  );
  const row = rows[0];
  if (!row) throw new Error("This link is invalid or has expired.");

  await db.query("UPDATE portal_users SET password_hash = ? WHERE id = ?", [
    hashPassword(password),
    row.user_id,
  ]);
  await db.query("UPDATE password_reset_tokens SET used_at = NOW() WHERE user_id = ? AND used_at IS NULL", [
    row.user_id,
  ]);
}

export function unusablePasswordHash(): string {
  return hashPassword(randomBytes(24).toString("hex"));
}
