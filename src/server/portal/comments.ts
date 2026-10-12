import { randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "@/server/db/mysql";
import type { PortalAuthContext } from "@/server/auth/require-portal-auth";

async function canAccessEntry(auth: PortalAuthContext, entryId: string): Promise<boolean> {
  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT state_code FROM monthly_entries WHERE id = ? LIMIT 1",
    [entryId],
  );
  const entry = rows[0];
  if (!entry) return false;
  if (auth.profile.role === "nbm_central") return true;
  return String(entry.state_code) === auth.profile.state_code;
}

async function getEntryCommentMeta(entryId: string) {
  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT comments_resolved_at, comments_resolved_by
     FROM monthly_entries WHERE id = ? LIMIT 1`,
    [entryId],
  );
  const row = rows[0];
  if (!row) return null;
  return {
    commentsResolved: row.comments_resolved_at != null,
    commentsResolvedAt: row.comments_resolved_at
      ? String(row.comments_resolved_at)
      : null,
    commentsResolvedBy: row.comments_resolved_by != null ? String(row.comments_resolved_by) : null,
  };
}

export async function listEntryComments(auth: PortalAuthContext, entryId: string) {
  if (!(await canAccessEntry(auth, entryId))) throw new Error("Forbidden");
  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM entry_comments WHERE entry_id = ? ORDER BY created_at ASC",
    [entryId],
  );
  const meta = await getEntryCommentMeta(entryId);
  return {
    comments: rows.map((row) => ({
      ...row,
      id: String(row.id),
      entry_id: String(row.entry_id),
      author_id: String(row.author_id),
    })),
    commentsResolved: meta?.commentsResolved ?? false,
    commentsResolvedAt: meta?.commentsResolvedAt ?? null,
    commentsResolvedBy: meta?.commentsResolvedBy ?? null,
  };
}

export async function markEntryCommentsResolved(auth: PortalAuthContext, entryId: string) {
  if (!(await canAccessEntry(auth, entryId))) throw new Error("Forbidden");
  const db = getMysqlPool();
  const [countRows] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS total FROM entry_comments WHERE entry_id = ?",
    [entryId],
  );
  const total = Number(countRows[0]?.total ?? 0);
  if (total === 0) {
    throw new Error("There are no comments to resolve");
  }

  await db.query(
    `UPDATE monthly_entries
     SET comments_resolved_at = CURRENT_TIMESTAMP, comments_resolved_by = ?
     WHERE id = ?`,
    [auth.userId, entryId],
  );
}

export async function addEntryComment(auth: PortalAuthContext, entryId: string, message: string) {
  if (!(await canAccessEntry(auth, entryId))) throw new Error("Forbidden");
  const id = randomUUID();
  const db = getMysqlPool();
  await db.query(
    `INSERT INTO entry_comments (id, entry_id, author_id, author_role, message)
     VALUES (?, ?, ?, ?, ?)`,
    [id, entryId, auth.userId, auth.profile.role, message.trim()],
  );
  await db.query(
    `UPDATE monthly_entries
     SET comments_resolved_at = NULL, comments_resolved_by = NULL
     WHERE id = ?`,
    [entryId],
  );
  return id;
}
