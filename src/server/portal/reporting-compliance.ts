import { randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { indianStates } from "@/data/indianStates";
import { ENTRY_STATUS } from "@/data/dropdowns";
import { monthLong } from "@/lib/reporting-period";
import type { PortalAuthContext } from "@/server/auth/require-portal-auth";
import { getMysqlPool } from "@/server/db/mysql";
import { deliverComplianceReminderEmail } from "@/server/mail/reminder-email";
import { PortalInputError } from "@/server/portal/monthly-entries";

export type ComplianceStage =
  | "not_started"
  | "drafts_pending"
  | "awaiting_review"
  | "corrections_pending"
  | "review_in_progress"
  | "approved";

export type ComplianceAudience = "editors" | "reviewers";

export type ComplianceCounts = {
  total: number;
  draft: number;
  submitted: number;
  declined: number;
  approved: number;
};

export type ComplianceOfficer = {
  userId: string;
  fullName: string;
  email: string;
  role: "state_editor" | "state_reviewer";
};

export type ComplianceRow = {
  stateCode: string;
  stateName: string;
  stateType: "state" | "ut";
  stage: ComplianceStage;
  stageLabel: string;
  pendingWith: ComplianceAudience | "none";
  pendingWithLabel: string;
  counts: ComplianceCounts;
  recipients: ComplianceOfficer[];
  lastReminderAt: string | null;
  canRemind: boolean;
};

const STAGE_LABEL: Record<ComplianceStage, string> = {
  not_started: "Not started",
  drafts_pending: "Drafts not submitted",
  awaiting_review: "Awaiting review",
  corrections_pending: "Corrections pending",
  review_in_progress: "Review in progress",
  approved: "Approved",
};

const PENDING_LABEL: Record<ComplianceAudience | "none", string> = {
  editors: "Editors",
  reviewers: "Reviewers",
  none: "—",
};

type StatusBucket = {
  draft: number;
  submitted: number;
  declined: number;
  approved: number;
};

function emptyBucket(): StatusBucket {
  return { draft: 0, submitted: 0, declined: 0, approved: 0 };
}

function addStatus(bucket: StatusBucket, status: string, count: number) {
  if (status === ENTRY_STATUS.DRAFT || status === ENTRY_STATUS.REVISION_REQUESTED) {
    bucket.draft += count;
  } else if (status === ENTRY_STATUS.SUBMITTED || status === ENTRY_STATUS.UNDER_REVIEW) {
    bucket.submitted += count;
  } else if (status === ENTRY_STATUS.DECLINED) {
    bucket.declined += count;
  } else if (status === ENTRY_STATUS.APPROVED) {
    bucket.approved += count;
  }
}

export function classifyCompliance(counts: ComplianceCounts): {
  stage: ComplianceStage;
  pendingWith: ComplianceAudience | "none";
} {
  if (counts.total === 0) return { stage: "not_started", pendingWith: "editors" };
  if (counts.approved === counts.total) return { stage: "approved", pendingWith: "none" };
  if (counts.declined > 0) return { stage: "corrections_pending", pendingWith: "editors" };
  if (counts.submitted > 0 && counts.approved === 0) {
    return { stage: "awaiting_review", pendingWith: "reviewers" };
  }
  if (counts.draft > 0 && counts.submitted === 0) {
    return { stage: "drafts_pending", pendingWith: "editors" };
  }
  return { stage: "review_in_progress", pendingWith: "reviewers" };
}

function assertCentral(auth: PortalAuthContext) {
  if (auth.profile.role !== "nbm_central") {
    throw new Error("Forbidden");
  }
}

function assertMonth(month: number) {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new PortalInputError("Choose a reporting month");
  }
}

function assertYear(year: number) {
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    throw new PortalInputError("Choose a reporting year");
  }
}

function bucketToCounts(bucket: StatusBucket): ComplianceCounts {
  const total = bucket.draft + bucket.submitted + bucket.declined + bucket.approved;
  return { total, ...bucket };
}

export async function listReportingCompliance(
  auth: PortalAuthContext,
  year: number,
  month: number,
  stateCode: string | null,
) {
  assertCentral(auth);
  assertYear(year);
  assertMonth(month);

  const db = getMysqlPool();
  const [statusRows] = await db.query<RowDataPacket[]>(
    `SELECT state_code, status, COUNT(*) AS total
     FROM monthly_entries
     WHERE YEAR(month_year) = ? AND MONTH(month_year) = ?
     GROUP BY state_code, status`,
    [year, month],
  );

  const [officerRows] = await db.query<RowDataPacket[]>(
    `SELECT user_id, full_name, email, state_code, role
     FROM state_users
     WHERE is_active = 1
       AND role IN ('state_editor', 'state_reviewer')
       AND state_code IS NOT NULL
     ORDER BY full_name`,
  );

  const [reminderRows] = await db.query<RowDataPacket[]>(
    `SELECT state_code, MAX(created_at) AS last_reminder_at
     FROM portal_reminders
     WHERE year = ? AND month = ?
     GROUP BY state_code`,
    [year, month],
  );

  const byState = new Map<string, StatusBucket>();
  for (const row of statusRows) {
    const code = String(row.state_code);
    const bucket = byState.get(code) ?? emptyBucket();
    addStatus(bucket, String(row.status), Number(row.total));
    byState.set(code, bucket);
  }

  const officersByState = new Map<string, ComplianceOfficer[]>();
  for (const row of officerRows) {
    const code = String(row.state_code);
    const list = officersByState.get(code) ?? [];
    const role = String(row.role);
    if (role !== "state_editor" && role !== "state_reviewer") continue;
    list.push({
      userId: String(row.user_id),
      fullName: String(row.full_name),
      email: String(row.email),
      role,
    });
    officersByState.set(code, list);
  }

  const lastReminder = new Map(
    reminderRows.map((row) => {
      const value = row.last_reminder_at;
      const iso =
        value instanceof Date ? value.toISOString() : value != null && String(value) !== "" ? String(value) : null;
      return [String(row.state_code), iso] as const;
    }),
  );

  const catalog = stateCode
    ? indianStates.filter((state) => state.code === stateCode)
    : indianStates;

  if (stateCode && catalog.length === 0) {
    throw new PortalInputError("Choose a valid state");
  }

  const rows: ComplianceRow[] = catalog.map((state) => {
    const counts = bucketToCounts(byState.get(state.code) ?? emptyBucket());
    const { stage, pendingWith } = classifyCompliance(counts);
    const officers = officersByState.get(state.code) ?? [];
    const recipients =
      pendingWith === "none"
        ? []
        : officers.filter((officer) =>
            pendingWith === "editors" ? officer.role === "state_editor" : officer.role === "state_reviewer",
          );
    return {
      stateCode: state.code,
      stateName: state.name,
      stateType: state.type,
      stage,
      stageLabel: STAGE_LABEL[stage],
      pendingWith,
      pendingWithLabel: PENDING_LABEL[pendingWith],
      counts,
      recipients,
      lastReminderAt: lastReminder.get(state.code) ?? null,
      canRemind: pendingWith !== "none",
    };
  });

  const summary = {
    notStarted: rows.filter((row) => row.stage === "not_started").length,
    withEditors: rows.filter((row) => row.pendingWith === "editors" && row.stage !== "not_started").length,
    withReviewers: rows.filter((row) => row.pendingWith === "reviewers").length,
    approved: rows.filter((row) => row.stage === "approved").length,
    total: rows.length,
  };

  return { year, month, monthLabel: `${monthLong(month)} ${year}`, summary, rows };
}

async function complianceRowForReminder(
  auth: PortalAuthContext,
  stateCode: string,
  year: number,
  month: number,
) {
  const board = await listReportingCompliance(auth, year, month, stateCode);
  const row = board.rows[0];
  if (!row) throw new PortalInputError("Choose a valid state");
  return { board, row };
}

export async function previewComplianceReminderMail(
  auth: PortalAuthContext,
  stateCode: string,
  year: number,
  month: number,
) {
  assertCentral(auth);
  const { board, row } = await complianceRowForReminder(auth, stateCode, year, month);
  if (!row.canRemind || row.pendingWith === "none") {
    throw new PortalInputError("This month is fully approved. No reminder applies.");
  }
  if (row.recipients.length === 0) {
    const who = row.pendingWith === "editors" ? "editors" : "reviewers";
    throw new PortalInputError(`No active ${who} are assigned for ${row.stateName}.`);
  }

  const sample = row.recipients[0];
  const mail = await deliverComplianceReminderEmail({
    to: sample.email,
    fullName: sample.fullName,
    relatedUserId: sample.userId,
    stage: row.stage,
    audience: row.pendingWith,
    stateName: row.stateName,
    monthLabel: board.monthLabel,
  });

  return {
    previewPath: mail.previewPath,
    messageId: mail.messageId,
    sampleRecipient: sample,
    recipientCount: row.recipients.length,
  };
}

export async function recordComplianceReminder(
  auth: PortalAuthContext,
  stateCode: string,
  year: number,
  month: number,
) {
  assertCentral(auth);
  const { board, row } = await complianceRowForReminder(auth, stateCode, year, month);
  if (!row.canRemind || row.pendingWith === "none") {
    throw new PortalInputError("This month is fully approved. No reminder is needed.");
  }
  if (row.recipients.length === 0) {
    const who = row.pendingWith === "editors" ? "editors" : "reviewers";
    throw new PortalInputError(`No active ${who} are assigned for ${row.stateName}.`);
  }

  let previewPath: string | null = null;
  let messageId: string | null = null;
  for (const officer of row.recipients) {
    const mail = await deliverComplianceReminderEmail({
      to: officer.email,
      fullName: officer.fullName,
      relatedUserId: officer.userId,
      stage: row.stage,
      audience: row.pendingWith,
      stateName: row.stateName,
      monthLabel: board.monthLabel,
    });
    if (!previewPath) {
      previewPath = mail.previewPath;
      messageId = mail.messageId;
    }
  }

  const id = randomUUID();
  const db = getMysqlPool();
  await db.query(
    `INSERT INTO portal_reminders
      (id, state_code, year, month, audience, stage, sent_by, recipient_user_ids)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      row.stateCode,
      year,
      month,
      row.pendingWith,
      row.stage,
      auth.userId,
      JSON.stringify(row.recipients.map((officer) => officer.userId)),
    ],
  );

  return {
    id,
    stateCode: row.stateCode,
    stateName: row.stateName,
    stage: row.stage,
    audience: row.pendingWith,
    recipients: row.recipients,
    messageId,
    previewPath,
  };
}
