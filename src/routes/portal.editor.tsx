import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  insertMonthlyEntryRow,
  listMonthlyEntriesForState,
  submitDraftEntries,
  updateMonthlyEntryRow,
} from "@/lib/portal-data";
import { editorFormToPayload, monthlyEntryToFormValues } from "@/lib/portal-entry-form";
import { AuthGuard } from "@/components/AuthGuard";
import { CutoffBanner } from "@/components/portal/CutoffBanner";
import { PeriodFilter } from "@/components/portal/PeriodFilter";
import { EditorEntryForm } from "@/components/portal/EditorEntryForm";
import { CommentsDrawer } from "@/components/portal/CommentsDrawer";
import {
  EntryCommentsButton,
  entryCommentCount,
  entryNeedsCommentHighlight,
  entryRowCommentHighlightClass,
} from "@/components/portal/EntryCommentsButton";
import { PortalTablePagination } from "@/components/portal/PortalTablePagination";
import { useClientPagination } from "@/hooks/useClientPagination";
import { getStatusLabel, getStatusColor, ENTRY_STATUS } from "@/data/dropdowns";
import {
  formatMonthYear,
  indiaYearMonth,
  mergeReportingPeriods,
  monthAfterYearChange,
  periodDate,
  type ReportingPeriods,
} from "@/lib/reporting-period";
import { Plus, Download, Edit, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/portal/editor")({
  component: EditorPortal,
});

function isEntrySubmittable(status: string) {
  return status === ENTRY_STATUS.DRAFT || status === ENTRY_STATUS.REVISION_REQUESTED;
}

function isEntryEditable(status: string) {
  return (
    status === ENTRY_STATUS.DRAFT ||
    status === ENTRY_STATUS.SUBMITTED ||
    status === ENTRY_STATUS.UNDER_REVIEW ||
    status === ENTRY_STATUS.REVISION_REQUESTED ||
    status === ENTRY_STATUS.DECLINED
  );
}

function isEntryDeclined(status: string) {
  return status === ENTRY_STATUS.DECLINED;
}

function EditorPortal() {
  return (
    <AuthGuard allowedRoles={["state_editor"]}>
      <EditorDashboard />
    </AuthGuard>
  );
}

function EditorDashboard() {
  const { user, profile, stateName } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Record<string, unknown> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const opened = indiaYearMonth();
  const [year, setYear] = useState(opened.year);
  const [month, setMonth] = useState<number | null>(opened.month);
  const [periods, setPeriods] = useState<ReportingPeriods>(() => mergeReportingPeriods([]));
  
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  const fetchEntries = async () => {
    if (!profile?.state_code) return;
    setLoading(true);
    try {
      const data = await listMonthlyEntriesForState(profile.state_code, { year, month });
      setEntries(data.entries || []);
      setPeriods(data.periods);
    } catch (error) {
      toast.error("Failed to fetch entries");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchEntries();
  }, [profile?.state_code, year, month]);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [year, month]);

  const handleFormSubmit = async (formData: Parameters<typeof editorFormToPayload>[0]) => {
    const payload = editorFormToPayload(formData);

    try {
      if (editingEntry) {
        const wasDeclined = String(editingEntry.status) === ENTRY_STATUS.DECLINED;
        await updateMonthlyEntryRow(String(editingEntry.id), payload);
        toast.success(
          wasDeclined
            ? "Entry saved as draft. Submit when you are ready to send it again."
            : "Entry updated successfully",
        );
      } else {
        if (!profile?.state_code || !user?.id || month == null) return;
        const formattedDate = periodDate(year, month);
        await insertMonthlyEntryRow({
          ...payload,
          state_code: profile.state_code,
          month_year: formattedDate,
          created_by: user.id,
          updated_by: user.id,
          status: ENTRY_STATUS.DRAFT,
        });
        toast.success("Entry added successfully");
      }
      setEditingEntry(null);
      await fetchEntries();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save entry");
      throw error;
    }
  };

  function openAddEntry() {
    setEditingEntry(null);
    setIsFormOpen(true);
  }

  function openEditEntry(entry: Record<string, unknown>) {
    setEditingEntry(entry);
    setIsFormOpen(true);
  }

  const submitEntriesForReview = async (ids: string[]) => {
    if (month == null) return;
    if (ids.length === 0) {
      toast.info("No entries selected to submit");
      return;
    }
    setSubmitting(true);
    try {
      await submitDraftEntries(ids, periodDate(year, month));
      toast.success(`Submitted ${ids.length} ${ids.length === 1 ? "entry" : "entries"} for review.`);
      setSelectedIds(new Set());
      await fetchEntries();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAll = async () => {
    const draftIds = entries.filter((e) => isEntrySubmittable(e.status)).map((e) => e.id);
    if (draftIds.length === 0) {
      toast.info("No drafts or revisions to submit");
      return;
    }
    await submitEntriesForReview(draftIds);
  };

  const handleSubmitSelected = async () => {
    const ids = entries
      .filter((e) => selectedIds.has(e.id) && isEntrySubmittable(e.status))
      .map((e) => e.id);
    await submitEntriesForReview(ids);
  };

  const exportToExcel = () => {
    if (entries.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(entries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entries");
    const period = month == null ? `${year}_all` : periodDate(year, month).slice(0, 7);
    XLSX.writeFile(workbook, `NBM_Entries_${stateName}_${period}.xlsx`);
  };

  const onYearChange = (nextYear: number) => {
    setMonth((currentMonth) => monthAfterYearChange(nextYear, currentMonth, periods));
    setYear(nextYear);
  };

  const draftCount = entries.filter(
    (e) => e.status === ENTRY_STATUS.DRAFT || e.status === ENTRY_STATUS.REVISION_REQUESTED,
  ).length;
  const submittedCount = entries.filter(
    (e) => e.status === ENTRY_STATUS.SUBMITTED || e.status === ENTRY_STATUS.UNDER_REVIEW,
  ).length;
  const approvedCount = entries.filter((e) => e.status === ENTRY_STATUS.APPROVED).length;

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems,
    rowOffset,
    total: entryTotal,
  } = useClientPagination(entries, [year, month]);

  const submittableOnPage = useMemo(
    () => paginatedItems.filter((e) => isEntrySubmittable(e.status)),
    [paginatedItems],
  );
  const allSubmittableOnPageSelected =
    submittableOnPage.length > 0 && submittableOnPage.every((e) => selectedIds.has(e.id));
  const selectedSubmittableCount = useMemo(
    () => entries.filter((e) => selectedIds.has(e.id) && isEntrySubmittable(e.status)).length,
    [entries, selectedIds],
  );

  const tableColSpan = (month == null ? 8 : 7) + 1;

  function toggleEntrySelection(id: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function toggleSelectAllOnPage(checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const entry of submittableOnPage) {
        if (checked) next.add(entry.id);
        else next.delete(entry.id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Editor Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {profile?.full_name} ({stateName})</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <PeriodFilter
            year={year}
            month={month}
            periods={periods}
            onYearChange={onYearChange}
            onMonthChange={setMonth}
          />
          <Button variant="outline" onClick={exportToExcel}>
            <Download className="mr-2 h-4 w-4" /> Export Excel
          </Button>
          <Button onClick={openAddEntry} disabled={month == null} title={month == null ? "Choose a month to add an entry" : undefined}>
            <Plus className="mr-2 h-4 w-4" /> Add Entry
          </Button>
        </div>
      </div>

      <CutoffBanner year={year} month={month} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Entries</div>
          <div className="text-2xl font-bold mt-1">{entries.length}</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Drafts</div>
          <div className="text-2xl font-bold mt-1 text-muted-foreground">{draftCount}</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Submitted</div>
          <div className="text-2xl font-bold mt-1 text-amber-600">{submittedCount}</div>
        </div>
        <div className="bg-card border border-emerald-200 p-4 rounded-xl shadow-sm bg-emerald-50/50">
          <div className="text-sm font-medium text-emerald-700">Approved</div>
          <div className="text-2xl font-bold mt-1 text-emerald-800">{approvedCount}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex flex-col gap-2 p-4 border-b border-border bg-muted/20 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold">Data Entries</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => void handleSubmitSelected()}
              disabled={
                month == null || submitting || selectedSubmittableCount === 0
              }
            >
              {submitting ? "Submitting..." : `Submit Selected (${selectedSubmittableCount})`}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void handleSubmitAll()}
              disabled={month == null || submitting || draftCount === 0}
            >
              Submit All Drafts
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
              <tr>
                <th className="w-10 px-3 py-3 font-medium">
                  <Checkbox
                    checked={allSubmittableOnPageSelected}
                    onCheckedChange={(value) => toggleSelectAllOnPage(value === true)}
                    disabled={month == null || submittableOnPage.length === 0}
                    aria-label="Select all submittable entries on this page"
                  />
                </th>
                <th className="px-4 py-3 font-medium">S.No</th>
                {month == null ? <th className="px-4 py-3 font-medium">Month</th> : null}
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Activity</th>
                <th className="px-4 py-3 font-medium">Beneficiary</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">District</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={tableColSpan} className="px-4 py-8 text-center text-muted-foreground">Loading entries...</td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={tableColSpan} className="px-4 py-8 text-center text-muted-foreground">
                    {month == null ? "No entries for this year." : "No entries found. Click \"Add Entry\" to begin."}
                  </td>
                </tr>
              ) : (
                paginatedItems.map((entry, idx) => (
                  <tr
                    key={entry.id}
                    className={`transition-colors ${entryRowCommentHighlightClass(entryNeedsCommentHighlight(entry))}`}
                  >
                    <td className="px-3 py-3">
                      <Checkbox
                        checked={selectedIds.has(entry.id)}
                        onCheckedChange={(value) => toggleEntrySelection(entry.id, value === true)}
                        disabled={month == null || !isEntrySubmittable(entry.status)}
                        aria-label={`Select entry ${rowOffset + idx + 1} for submission`}
                      />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{rowOffset + idx + 1}</td>
                    {month == null ? <td className="px-4 py-3 text-muted-foreground">{formatMonthYear(entry.month_year)}</td> : null}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted ${getStatusColor(entry.status)} bg-opacity-20`}>
                        {getStatusLabel(entry.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium truncate max-w-[200px]" title={entry.activity}>{entry.activity}</td>
                    <td className="px-4 py-3">{entry.beneficiary_name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{entry.beneficiary_type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{entry.district}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <EntryCommentsButton
                        count={entryCommentCount(entry)}
                        highlightUnresolved={entryNeedsCommentHighlight(entry)}
                        onClick={() => {
                          setSelectedEntryId(entry.id);
                          setIsCommentsOpen(true);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className={
                          isEntryDeclined(entry.status)
                            ? "h-8 w-8 text-amber-700 hover:text-amber-800 hover:bg-amber-50"
                            : "h-8 w-8"
                        }
                        disabled={!isEntryEditable(entry.status)}
                        title={
                          isEntryDeclined(entry.status)
                            ? "Revise declined entry and resubmit"
                            : isEntryEditable(entry.status)
                              ? "Edit entry"
                              : "Approved entries cannot be edited"
                        }
                        onClick={() => openEditEntry(entry)}
                      >
                        {isEntryDeclined(entry.status) ? (
                          <RotateCcw className="h-4 w-4" aria-hidden />
                        ) : (
                          <Edit className="h-4 w-4 text-muted-foreground" aria-hidden />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <PortalTablePagination
          page={page}
          totalPages={totalPages}
          total={entryTotal}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          disabled={loading}
        />
      </div>

      <EditorEntryForm
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingEntry(null);
        }}
        onSubmit={handleFormSubmit}
        defaultStateCode={stateName}
        mode={editingEntry ? "edit" : "add"}
        entryId={editingEntry ? String(editingEntry.id) : null}
        initialValues={
          editingEntry ? monthlyEntryToFormValues(editingEntry, stateName ?? "") : null
        }
      />
      
      <CommentsDrawer
        entryId={selectedEntryId}
        isOpen={isCommentsOpen}
        onClose={() => {
          setIsCommentsOpen(false);
          setSelectedEntryId(null);
        }}
        onCommentsChange={() => void fetchEntries()}
      />
    </div>
  );
}
