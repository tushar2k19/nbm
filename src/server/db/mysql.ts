import mysql from "mysql2/promise";
import type { Pool, RowDataPacket } from "mysql2/promise";
import type { NbmRole } from "@/lib/roles";

export type StateUserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  mobile: string | null;
  state_code: string | null;
  role: NbmRole;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

let pool: Pool | undefined;

export function getMysqlPool(): Pool {
  if (pool) return pool;

  const host = process.env.MYSQL_HOST ?? "127.0.0.1";
  const port = Number(process.env.MYSQL_PORT ?? "3306");
  const user = process.env.MYSQL_USER ?? "nbm";
  const password = process.env.MYSQL_PASSWORD ?? "nbm_local_dev";
  const database = process.env.MYSQL_DATABASE ?? "nbm_portal";

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    dateStrings: true,
  });

  return pool;
}

export async function getActiveProfileByUserId(userId: string): Promise<StateUserProfile | null> {
  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT id, user_id, full_name, email, mobile, state_code, role, is_active,
            created_by, created_at, updated_at
     FROM state_users
     WHERE user_id = ? AND is_active = 1
     LIMIT 1`,
    [userId],
  );
  if (!rows[0]) return null;
  const row = rows[0];
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    full_name: String(row.full_name),
    email: String(row.email),
    mobile: row.mobile != null ? String(row.mobile) : null,
    state_code: row.state_code != null ? String(row.state_code) : null,
    role: row.role as NbmRole,
    is_active: Boolean(row.is_active),
    created_by: row.created_by != null ? String(row.created_by) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export type AuthAttempt =
  | { status: "ok"; userId: string; email: string }
  | { status: "invalid" }
  | { status: "disabled" };

export async function authenticatePortalUser(email: string, password: string): Promise<AuthAttempt> {
  const { verifyPassword } = await import("@/server/auth/password");
  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT u.id, u.email, u.password_hash, s.is_active
     FROM portal_users u
     LEFT JOIN state_users s ON s.user_id = u.id
     WHERE u.email = ?
     LIMIT 1`,
    [email.trim().toLowerCase()],
  );
  const row = rows[0];
  if (!row || !verifyPassword(password, String(row.password_hash))) return { status: "invalid" };
  if (row.is_active != null && !row.is_active) return { status: "disabled" };
  return { userId: String(row.id), email: String(row.email), status: "ok" };
}
