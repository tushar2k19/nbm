import type { StateUserProfile } from "@/lib/auth";
import type { ReportingPeriods } from "@/lib/reporting-period";

function portalFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  return fetch(input, {
    ...init,
    headers,
    credentials: "same-origin",
  });
}

type ApiError = { error?: string };

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & ApiError;
  if (!res.ok) {
    throw new Error(data.error ?? res.statusText);
  }
  return data;
}

export async function mysqlLogin(email: string, password: string): Promise<{ ok: true }> {
  const res = await portalFetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseJson(res);
}

export async function mysqlLogout(): Promise<void> {
  await portalFetch("/api/auth/logout", { method: "POST" });
}

export async function mysqlFetchSession(): Promise<{
  user: { id: string; email: string } | null;
  profile: StateUserProfile | null;
}> {
  const res = await portalFetch("/api/auth/session");
  if (res.status === 401) return { user: null, profile: null };
  return parseJson(res);
}

export type MonthlyEntryQuery = {
  excludeDraft?: boolean;
  approvedOnly?: boolean;
  year: number;
  month?: number | null;
  stateCode?: string | null;
};

export async function fetchMonthlyEntries(params: MonthlyEntryQuery) {
  const qs = new URLSearchParams();
  if (params.excludeDraft) qs.set("excludeDraft", "1");
  if (params.approvedOnly) qs.set("approvedOnly", "1");
  qs.set("year", String(params.year));
  if (params.month != null) qs.set("month", String(params.month));
  if (params.stateCode) qs.set("state", params.stateCode);
  const res = await portalFetch(`/api/portal/monthly-entries?${qs}`);
  return parseJson<{ entries: Record<string, unknown>[]; periods: ReportingPeriods }>(res);
}

export async function createMonthlyEntry(body: Record<string, unknown>) {
  const res = await portalFetch("/api/portal/monthly-entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson(res);
}

export async function updateMonthlyEntry(body: Record<string, unknown> & { id: string }) {
  const res = await portalFetch("/api/portal/monthly-entries", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson(res);
}

export async function patchMonthlyEntryStatus(id: string, status: string) {
  const res = await portalFetch("/api/portal/monthly-entries", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
  return parseJson(res);
}

export async function submitMonthlyEntryDrafts(ids: string[], monthYear: string) {
  const res = await portalFetch("/api/portal/monthly-entries", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ submitIds: ids, monthYear }),
  });
  return parseJson<{ updated: number }>(res);
}

export type EntryCommentThread = {
  comments: unknown[];
  commentsResolved: boolean;
  commentsResolvedAt: string | null;
  commentsResolvedBy: string | null;
};

export async function fetchEntryComments(entryId: string): Promise<EntryCommentThread> {
  const res = await portalFetch(`/api/portal/entry-comments?entryId=${encodeURIComponent(entryId)}`);
  const data = await parseJson<EntryCommentThread & { comments?: unknown[] }>(res);
  return {
    comments: data.comments ?? [],
    commentsResolved: Boolean(data.commentsResolved),
    commentsResolvedAt: data.commentsResolvedAt ?? null,
    commentsResolvedBy: data.commentsResolvedBy ?? null,
  };
}

export async function resolveEntryComments(entryId: string) {
  const res = await portalFetch("/api/portal/entry-comments", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entryId, resolve: true }),
  });
  return parseJson(res);
}

export async function createEntryComment(entryId: string, message: string) {
  const res = await portalFetch("/api/portal/entry-comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entryId, message }),
  });
  return parseJson(res);
}

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
  stage: string;
  stageLabel: string;
  pendingWith: "editors" | "reviewers" | "none";
  pendingWithLabel: string;
  counts: { total: number; draft: number; submitted: number; declined: number; approved: number };
  recipients: ComplianceOfficer[];
  lastReminderAt: string | null;
  canRemind: boolean;
};

export type ComplianceBoard = {
  year: number;
  month: number;
  monthLabel: string;
  summary: {
    notStarted: number;
    withEditors: number;
    withReviewers: number;
    approved: number;
    total: number;
  };
  rows: ComplianceRow[];
};

export async function fetchReportingCompliance(year: number, month: number, stateCode?: string | null) {
  const qs = new URLSearchParams({ year: String(year), month: String(month) });
  if (stateCode) qs.set("state", stateCode);
  const res = await portalFetch(`/api/portal/reporting-compliance?${qs}`);
  return parseJson<ComplianceBoard>(res);
}

export async function recordReportingReminder(stateCode: string, year: number, month: number) {
  const res = await portalFetch("/api/portal/reporting-compliance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stateCode, year, month }),
  });
  return parseJson<{
    id: string;
    stateName: string;
    recipients: ComplianceOfficer[];
    previewPath: string | null;
    messageId: string | null;
  }>(res);
}

export async function fetchReportingReminderPreview(stateCode: string, year: number, month: number) {
  const qs = new URLSearchParams({
    year: String(year),
    month: String(month),
    state: stateCode,
  });
  const res = await portalFetch(`/api/portal/reporting-compliance-preview?${qs}`);
  return parseJson<{
    previewPath: string | null;
    messageId: string;
    recipientCount: number;
    sampleRecipient: ComplianceOfficer;
  }>(res);
}

export async function fetchStateUsersDirectory() {
  const res = await portalFetch("/api/portal/state-users");
  const data = await parseJson<{ users: unknown[] }>(res);
  return data.users;
}

export type OfficerPayload = {
  full_name: string;
  email: string;
  mobile: string | null;
  state_code: string;
  role: "state_editor" | "state_reviewer";
};

export async function createStateOfficer(body: OfficerPayload) {
  const res = await portalFetch("/api/portal/state-users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<{ id: string; messageId: string; previewPath: string | null }>(res);
}

export async function updateStateOfficer(body: Partial<OfficerPayload> & { id: string; is_active?: boolean }) {
  const res = await portalFetch("/api/portal/state-users", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseJson<{ ok: true; previewPath: string | null; messageId: string | null }>(res);
}

export async function requestForgotPassword(email: string) {
  const res = await portalFetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return parseJson<{ ok: true; message: string; previewPath: string | null }>(res);
}

export async function fetchPasswordReset(token: string) {
  const res = await portalFetch(`/api/auth/password-reset?token=${encodeURIComponent(token)}`);
  if (!res.ok) return { valid: false as const };
  return parseJson<{ valid: true; email: string; fullName: string; purpose: "invite" | "reset" }>(res);
}

export async function submitNewPassword(token: string, password: string) {
  const res = await portalFetch("/api/auth/password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  return parseJson<{ ok: true }>(res);
}

export async function fetchMailboxMessage(id: string) {
  const res = await portalFetch(`/api/mailbox/${id}`);
  return parseJson<{
    id: string;
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
    createdAt: string;
  }>(res);
}
