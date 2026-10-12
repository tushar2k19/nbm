import { randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "@/server/db/mysql";
import type { PortalAuthContext } from "@/server/auth/require-portal-auth";
import { ENTRY_STATUS } from "@/data/dropdowns";
import { indianStates } from "@/data/indianStates";
import {
  indiaYearMonth,
  mergeReportingPeriods,
  periodDate,
  type ReportingPeriods,
  type StoredPeriod,
} from "@/lib/reporting-period";

export class PortalInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PortalInputError";
  }
}

export type EntryListOptions = {
  excludeDraft?: boolean;
  approvedOnly?: boolean;
  year: number;
  month?: number | null;
  /** Central staff only — narrow to one state; omit for all states. */
  stateCode?: string | null;
};

export async function listMonthlyEntries(auth: PortalAuthContext, opts: EntryListOptions) {
  const db = getMysqlPool();
  const { sql, params } = scopedWhere(auth, opts, "me");
  let entrySql = `SELECT me.*, sub.full_name AS submitted_by_name
     FROM monthly_entries me
     LEFT JOIN state_users sub ON sub.user_id = me.submitted_by
     WHERE ${sql} AND YEAR(me.month_year) = ?`;
  const entryParams = [...params, opts.year];
  if (opts.month != null) {
    entrySql += " AND MONTH(me.month_year) = ?";
    entryParams.push(opts.month);
  }
  entrySql += " ORDER BY me.month_year DESC, me.created_at DESC";

  const [rows] = await db.query<RowDataPacket[]>(entrySql, entryParams);
  const rowsWithCounts = await attachCommentCounts(rows);
  const periods = await listReportingPeriods(auth, opts);
  return { entries: rowsWithCounts.map(normalizeEntry), periods };
}

export async function listReportingPeriods(
  auth: PortalAuthContext,
  opts: Pick<EntryListOptions, "excludeDraft" | "approvedOnly">,
): Promise<ReportingPeriods> {
  const db = getMysqlPool();
  const { sql, params } = scopedWhere(auth, opts);
  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT DISTINCT YEAR(month_year) AS year, MONTH(month_year) AS month
     FROM monthly_entries
     WHERE ${sql}`,
    params,
  );
  const stored: StoredPeriod[] = rows.map((row) => ({
    year: Number(row.year),
    month: Number(row.month),
  }));
  return mergeReportingPeriods(stored);
}

export async function insertMonthlyEntry(auth: PortalAuthContext, body: Record<string, unknown>) {
  if (auth.profile.role !== "state_editor" || !auth.profile.state_code) {
    throw new Error("Only state editors can create entries for their state");
  }

  const monthYear = parseMonthYear(body.month_year);
  await assertWritableMonth(auth.profile.state_code, monthYear.year, monthYear.month);

  const id = randomUUID();
  const db = getMysqlPool();
  await db.query(
    `INSERT INTO monthly_entries (
      id, state_code, month_year, activity, beneficiary_name, beneficiary_type,
      father_husband_name, gender, age, category, mobile, village, block, district, state, pin_code,
      total_project_investment_lakhs, center_share_lakhs, state_share_lakhs, total_capacity,
      employment_generated, status, created_by, updated_by
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id,
      auth.profile.state_code,
      monthYear.iso,
      body.activity,
      body.beneficiary_name,
      body.beneficiary_type,
      body.father_husband_name ?? null,
      body.gender ?? null,
      body.age ?? null,
      body.category ?? null,
      body.mobile ?? null,
      body.village ?? null,
      body.block ?? null,
      body.district ?? null,
      body.state ?? null,
      body.pin_code ?? null,
      body.total_project_investment_lakhs ?? null,
      body.center_share_lakhs ?? null,
      body.state_share_lakhs ?? null,
      body.total_capacity ?? null,
      body.employment_generated ?? null,
      body.status ?? ENTRY_STATUS.DRAFT,
      auth.userId,
      auth.userId,
    ],
  );
  return id;
}

function parseEditableEntryFields(body: Record<string, unknown>) {
  const activity = String(body.activity ?? "").trim();
  const beneficiary_name = String(body.beneficiary_name ?? "").trim();
  const beneficiary_type = String(body.beneficiary_type ?? "").trim();
  const mobile = String(body.mobile ?? "").trim();
  const village = String(body.village ?? "").trim();
  const block = String(body.block ?? "").trim();
  const district = String(body.district ?? "").trim();
  const pin_code = String(body.pin_code ?? "").trim();

  if (!activity || !beneficiary_name || !beneficiary_type || !mobile || !village || !block || !district || !pin_code) {
    throw new PortalInputError("Fill in all required fields");
  }

  return {
    activity,
    beneficiary_name,
    beneficiary_type,
    father_husband_name: body.father_husband_name ? String(body.father_husband_name) : null,
    gender: body.gender ? String(body.gender) : null,
    age: body.age != null && body.age !== "" ? Number(body.age) : null,
    category: body.category ? String(body.category) : null,
    mobile,
    village,
    block,
    district,
    state: body.state ? String(body.state) : null,
    pin_code,
    total_project_investment_lakhs:
      body.total_project_investment_lakhs != null && body.total_project_investment_lakhs !== ""
        ? Number(body.total_project_investment_lakhs)
        : null,
    center_share_lakhs:
      body.center_share_lakhs != null && body.center_share_lakhs !== ""
        ? Number(body.center_share_lakhs)
        : null,
    state_share_lakhs:
      body.state_share_lakhs != null && body.state_share_lakhs !== ""
        ? Number(body.state_share_lakhs)
        : null,
    total_capacity: body.total_capacity ? String(body.total_capacity) : null,
    employment_generated:
      body.employment_generated != null && body.employment_generated !== ""
        ? Number(body.employment_generated)
        : null,
  };
}

export async function updateMonthlyEntry(
  auth: PortalAuthContext,
  id: string,
  body: Record<string, unknown>,
) {
  if (auth.profile.role !== "state_editor" || !auth.profile.state_code) {
    throw new Error("Only state editors can update entries for their state");
  }

  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM monthly_entries WHERE id = ? LIMIT 1", [id]);
  const entry = rows[0];
  if (!entry) throw new PortalInputError("Entry not found");
  if (String(entry.state_code) !== auth.profile.state_code) throw new Error("Forbidden");

  const status = String(entry.status);
  if (!isEditorEditableStatus(status)) {
    throw new PortalInputError("Approved entries cannot be edited");
  }

  const fields = parseEditableEntryFields(body);
  const revertDeclinedToDraft = status === ENTRY_STATUS.DECLINED;

  await db.query(
    `UPDATE monthly_entries SET
      activity = ?, beneficiary_name = ?, beneficiary_type = ?,
      father_husband_name = ?, gender = ?, age = ?, category = ?, mobile = ?,
      village = ?, block = ?, district = ?, state = ?, pin_code = ?,
      total_project_investment_lakhs = ?, center_share_lakhs = ?, state_share_lakhs = ?,
      total_capacity = ?, employment_generated = ?,
      status = ?, updated_by = ?
     WHERE id = ?`,
    [
      fields.activity,
      fields.beneficiary_name,
      fields.beneficiary_type,
      fields.father_husband_name,
      fields.gender,
      fields.age,
      fields.category,
      fields.mobile,
      fields.village,
      fields.block,
      fields.district,
      fields.state,
      fields.pin_code,
      fields.total_project_investment_lakhs,
      fields.center_share_lakhs,
      fields.state_share_lakhs,
      fields.total_capacity,
      fields.employment_generated,
      revertDeclinedToDraft ? ENTRY_STATUS.DRAFT : status,
      auth.userId,
      id,
    ],
  );
}

const REVIEWER_DECISIONS = new Set<string>([ENTRY_STATUS.APPROVED, ENTRY_STATUS.DECLINED]);
const REVIEWER_PENDING = new Set<string>([ENTRY_STATUS.SUBMITTED, ENTRY_STATUS.UNDER_REVIEW]);

function isEditorEditableStatus(status: string) {
  return (
    status === ENTRY_STATUS.DRAFT ||
    status === ENTRY_STATUS.SUBMITTED ||
    status === ENTRY_STATUS.UNDER_REVIEW ||
    status === ENTRY_STATUS.REVISION_REQUESTED ||
    status === ENTRY_STATUS.DECLINED
  );
}

export async function updateMonthlyEntryStatus(auth: PortalAuthContext, id: string, status: string) {
  if (auth.profile.role !== "state_reviewer" || !auth.profile.state_code) {
    throw new Error("Only state reviewers can approve or decline entries");
  }
  if (!REVIEWER_DECISIONS.has(status)) {
    throw new PortalInputError("Reviewers can only approve or decline an entry");
  }

  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM monthly_entries WHERE id = ? LIMIT 1", [id]);
  const entry = rows[0];
  if (!entry) throw new Error("Entry not found");
  if (String(entry.state_code) !== auth.profile.state_code) throw new Error("Forbidden");
  if (!REVIEWER_PENDING.has(String(entry.status))) {
    throw new PortalInputError("Only submitted entries can be approved or declined");
  }

  if (status === ENTRY_STATUS.APPROVED) {
    await db.query(
      `UPDATE monthly_entries
       SET status = ?, updated_by = ?, comments_resolved_at = CURRENT_TIMESTAMP, comments_resolved_by = ?
       WHERE id = ?`,
      [status, auth.userId, auth.userId, id],
    );
  } else {
    await db.query("UPDATE monthly_entries SET status = ?, updated_by = ? WHERE id = ?", [
      status,
      auth.userId,
      id,
    ]);
  }
}

export async function bulkSubmitEntries(auth: PortalAuthContext, ids: string[], monthYear: string) {
  if (auth.profile.role !== "state_editor" || !auth.profile.state_code) {
    throw new Error("Only state editors can submit entries");
  }
  if (ids.length === 0) return 0;

  const period = parseMonthYear(monthYear);
  const db = getMysqlPool();
  const placeholders = ids.map(() => "?").join(",");
  const [result] = await db.query(
    `UPDATE monthly_entries
     SET status = ?, submitted_at = NOW(), submitted_by = ?, updated_by = ?,
         comments_resolved_at = NULL, comments_resolved_by = NULL
     WHERE id IN (${placeholders})
       AND state_code = ?
       AND month_year = ?
       AND status IN (?, ?)`,
    [
      ENTRY_STATUS.SUBMITTED,
      auth.userId,
      auth.userId,
      ...ids,
      auth.profile.state_code,
      period.iso,
      ENTRY_STATUS.DRAFT,
      ENTRY_STATUS.REVISION_REQUESTED,
    ],
  );
  return (result as { affectedRows?: number }).affectedRows ?? 0;
}

export function parseListPeriod(yearRaw: string | null, monthRaw: string | null): { year: number; month: number | null } {
  const current = indiaYearMonth();
  let year = current.year;
  if (yearRaw != null && yearRaw !== "") {
    year = Number(yearRaw);
    if (!Number.isInteger(year) || year < 2000 || year > 2100) {
      throw new PortalInputError("Choose a reporting year");
    }
  }

  if (monthRaw == null || monthRaw === "" || monthRaw === "all") {
    return { year, month: null };
  }
  const month = Number(monthRaw);
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new PortalInputError("Choose a reporting month");
  }
  return { year, month };
}

export function parseOptionalStateFilter(
  auth: PortalAuthContext,
  raw: string | null,
): string | null {
  if (raw == null || raw === "" || raw === "all") return null;
  if (auth.profile.role !== "nbm_central") {
    throw new PortalInputError("State filter is only available to central staff");
  }
  const code = raw.toUpperCase();
  if (!indianStates.some((state) => state.code === code)) {
    throw new PortalInputError("Choose a valid state");
  }
  return code;
}

function scopedWhere(
  auth: PortalAuthContext,
  opts: Pick<EntryListOptions, "excludeDraft" | "approvedOnly" | "stateCode">,
  tableAlias?: string,
) {
  const { profile } = auth;
  const col = (name: string) => (tableAlias ? `${tableAlias}.${name}` : name);
  let sql = "1=1";
  const params: unknown[] = [];

  if (profile.role === "state_editor" || profile.role === "state_reviewer") {
    sql += ` AND ${col("state_code")} = ?`;
    params.push(profile.state_code);
  }

  if (profile.role === "nbm_central" && opts.stateCode) {
    sql += ` AND ${col("state_code")} = ?`;
    params.push(opts.stateCode);
  }

  if (opts.excludeDraft) {
    sql += ` AND ${col("status")} <> ?`;
    params.push(ENTRY_STATUS.DRAFT);
  }

  if (opts.approvedOnly) {
    sql += ` AND ${col("status")} = ?`;
    params.push(ENTRY_STATUS.APPROVED);
  }

  return { sql, params };
}

async function assertWritableMonth(stateCode: string, year: number, month: number) {
  const current = indiaYearMonth();
  if (year > current.year || (year === current.year && month > current.month)) {
    throw new PortalInputError("A future reporting month cannot be used");
  }
  if (year === current.year && month === current.month) return;

  const db = getMysqlPool();
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT 1 AS ok FROM monthly_entries WHERE state_code = ? AND month_year = ? LIMIT 1",
    [stateCode, periodDate(year, month)],
  );
  if (rows.length === 0) {
    throw new PortalInputError("That month has no entries for this state yet");
  }
}

function parseMonthYear(value: unknown): { year: number; month: number; iso: string } {
  const match = String(value ?? "").match(/^(\d{4})-(\d{2})-01(?:$|T)/);
  if (!match) throw new PortalInputError("Choose a reporting month");
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) throw new PortalInputError("Choose a reporting month");
  return { year, month, iso: periodDate(year, month) };
}

async function attachCommentCounts(rows: RowDataPacket[]): Promise<RowDataPacket[]> {
  if (rows.length === 0) return rows;
  const db = getMysqlPool();
  const ids = rows.map((row) => row.id);
  const placeholders = ids.map(() => "?").join(",");
  const [countRows] = await db.query<RowDataPacket[]>(
    `SELECT entry_id, COUNT(*) AS comment_count
     FROM entry_comments
     WHERE entry_id IN (${placeholders})
     GROUP BY entry_id`,
    ids,
  );
  const countByEntry = new Map(
    countRows.map((row) => [String(row.entry_id), Number(row.comment_count)]),
  );
  return rows.map((row) => ({
    ...row,
    comment_count: countByEntry.get(String(row.id)) ?? 0,
  }));
}

function normalizeEntry(row: RowDataPacket) {
  const submittedAt = row.submitted_at != null ? String(row.submitted_at) : null;
  const submittedByName =
    row.submitted_by_name != null && String(row.submitted_by_name).trim() !== ""
      ? String(row.submitted_by_name)
      : null;
  return {
    ...row,
    id: String(row.id),
    state_code: String(row.state_code),
    month_year: String(row.month_year ?? "").slice(0, 10),
    submitted_at: submittedAt,
    submitted_by_name: submittedByName,
    comment_count: row.comment_count != null ? Number(row.comment_count) : 0,
    comments_resolved: row.comments_resolved_at != null,
    is_active: row.is_active != null ? Boolean(row.is_active) : undefined,
    age: row.age != null ? Number(row.age) : null,
    employment_generated: row.employment_generated != null ? Number(row.employment_generated) : null,
    total_project_investment_lakhs:
      row.total_project_investment_lakhs != null ? Number(row.total_project_investment_lakhs) : null,
    center_share_lakhs: row.center_share_lakhs != null ? Number(row.center_share_lakhs) : null,
    state_share_lakhs: row.state_share_lakhs != null ? Number(row.state_share_lakhs) : null,
  };
}
