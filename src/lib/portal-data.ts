import { isMysqlBackend } from "@/lib/backend-config";
import { ENTRY_STATUS } from "@/data/dropdowns";
import { supabase } from "@/integrations/supabase/client";
import {
  createEntryComment,
  createMonthlyEntry,
  fetchEntryComments,
  resolveEntryComments,
  type EntryCommentThread,
  fetchMonthlyEntries,
  fetchStateUsersDirectory,
  patchMonthlyEntryStatus,
  submitMonthlyEntryDrafts,
  updateMonthlyEntry as apiUpdateMonthlyEntry,
  type MonthlyEntryQuery,
} from "@/lib/portal-client";
import { mergeReportingPeriods, type ReportingPeriods } from "@/lib/reporting-period";

export type MonthlyEntryList = {
  entries: Record<string, unknown>[];
  periods: ReportingPeriods;
};

export async function listMonthlyEntries(opts: MonthlyEntryQuery): Promise<MonthlyEntryList> {
  if (isMysqlBackend()) return fetchMonthlyEntries(opts);
  return listFromSupabase(null, opts);
}

export async function listMonthlyEntriesForState(
  stateCode: string,
  opts: MonthlyEntryQuery,
): Promise<MonthlyEntryList> {
  if (isMysqlBackend()) return fetchMonthlyEntries(opts);
  return listFromSupabase(stateCode, opts);
}

async function listFromSupabase(stateCode: string | null, opts: MonthlyEntryQuery): Promise<MonthlyEntryList> {
  const filterState = stateCode ?? opts.stateCode ?? null;
  let query = supabase.from("monthly_entries").select("*");
  if (filterState) query = query.eq("state_code", filterState);
  if (opts.approvedOnly) query = query.eq("status", ENTRY_STATUS.APPROVED);
  if (opts.excludeDraft) query = query.neq("status", ENTRY_STATUS.DRAFT);
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  const rows = (data ?? []) as Record<string, unknown>[];
  const stored = rows
    .map((row) => {
      const value = String(row.month_year ?? "");
      return { year: Number(value.slice(0, 4)), month: Number(value.slice(5, 7)) };
    })
    .filter((period) => period.year && period.month);
  const entries = rows.filter((row) => {
    const value = String(row.month_year ?? "");
    if (Number(value.slice(0, 4)) !== opts.year) return false;
    if (opts.month == null) return true;
    return Number(value.slice(5, 7)) === opts.month;
  });
  return { entries, periods: mergeReportingPeriods(stored) };
}

export async function insertMonthlyEntryRow(body: Record<string, unknown>) {
  if (isMysqlBackend()) return createMonthlyEntry(body);
  const { error } = await supabase.from("monthly_entries").insert(body as never);
  if (error) throw error;
}

export async function updateMonthlyEntryRow(id: string, body: Record<string, unknown>) {
  if (isMysqlBackend()) return apiUpdateMonthlyEntry({ id, ...body });
  const { data: existing, error: loadError } = await supabase
    .from("monthly_entries")
    .select("status")
    .eq("id", id)
    .maybeSingle();
  if (loadError) throw loadError;
  if (!existing) throw new Error("Entry not found");

  const status = String(existing.status);
  const editable = [
    ENTRY_STATUS.DRAFT,
    ENTRY_STATUS.SUBMITTED,
    ENTRY_STATUS.UNDER_REVIEW,
    ENTRY_STATUS.REVISION_REQUESTED,
    ENTRY_STATUS.DECLINED,
  ];
  if (!editable.includes(status)) {
    throw new Error("Approved entries cannot be edited");
  }

  const patch = {
    ...body,
    ...(status === ENTRY_STATUS.DECLINED ? { status: ENTRY_STATUS.DRAFT } : {}),
  };

  const { error } = await supabase
    .from("monthly_entries")
    .update(patch as never)
    .eq("id", id)
    .in("status", editable);
  if (error) throw error;
}

export async function updateEntryStatus(id: string, status: string) {
  if (isMysqlBackend()) return patchMonthlyEntryStatus(id, status);
  const { error } = await supabase.from("monthly_entries").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function submitDraftEntries(ids: string[], monthYear: string) {
  if (isMysqlBackend()) return submitMonthlyEntryDrafts(ids, monthYear);
  const { error } = await supabase
    .from("monthly_entries")
    .update({ status: ENTRY_STATUS.SUBMITTED, submitted_at: new Date().toISOString() })
    .in("id", ids)
    .eq("month_year", monthYear);
  if (error) throw error;
}

export async function listComments(entryId: string): Promise<EntryCommentThread> {
  if (isMysqlBackend()) return fetchEntryComments(entryId);
  const { data, error } = await supabase
    .from("entry_comments")
    .select("*")
    .eq("entry_id", entryId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return {
    comments: data ?? [],
    commentsResolved: false,
    commentsResolvedAt: null,
    commentsResolvedBy: null,
  };
}

export async function markCommentsResolved(entryId: string) {
  if (isMysqlBackend()) return resolveEntryComments(entryId);
  const { error } = await supabase
    .from("monthly_entries")
    .update({ comments_resolved_at: new Date().toISOString() } as never)
    .eq("id", entryId);
  if (error) throw error;
}

export async function insertComment(payload: {
  entry_id: string;
  author_id: string;
  author_role: string;
  message: string;
}) {
  if (isMysqlBackend()) return createEntryComment(payload.entry_id, payload.message);
  const { error } = await supabase.from("entry_comments").insert(payload);
  if (error) throw error;
}

export async function listStateUsers() {
  if (isMysqlBackend()) return fetchStateUsersDirectory();
  const { data, error } = await supabase.from("state_users").select("*").order("state_code");
  if (error) throw error;
  return data ?? [];
}
