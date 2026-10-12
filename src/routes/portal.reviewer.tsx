import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { listMonthlyEntriesForState, updateEntryStatus } from "@/lib/portal-data";
import { AuthGuard } from "@/components/AuthGuard";
import { getStatusLabel, getStatusColor, ENTRY_STATUS } from "@/data/dropdowns";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CommentsDrawer } from "@/components/portal/CommentsDrawer";
import {
  EntryCommentsButton,
  entryCommentCount,
  entryNeedsCommentHighlight,
  entryRowCommentHighlightClass,
} from "@/components/portal/EntryCommentsButton";
import { PeriodFilter } from "@/components/portal/PeriodFilter";
import { PortalTablePagination } from "@/components/portal/PortalTablePagination";
import { useClientPagination } from "@/hooks/useClientPagination";
import {
  formatMonthYear,
  indiaYearMonth,
  mergeReportingPeriods,
  monthAfterYearChange,
  type ReportingPeriods,
} from "@/lib/reporting-period";
import { formatPortalDateTime } from "@/lib/portal-datetime";

export const Route = createFileRoute("/portal/reviewer")({
  component: ReviewerPortal,
});

function ReviewerPortal() {
  return (
    <AuthGuard allowedRoles={["state_reviewer"]}>
      <ReviewerDashboard />
    </AuthGuard>
  );
}

function ReviewerDashboard() {
  const { profile, stateName } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const opened = indiaYearMonth();
  const [year, setYear] = useState(opened.year);
  const [month, setMonth] = useState<number | null>(opened.month);
  const [periods, setPeriods] = useState<ReportingPeriods>(() => mergeReportingPeriods([]));
  
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const fetchEntries = async () => {
    if (!profile?.state_code) return;
    setLoading(true);
    try {
      const data = await listMonthlyEntriesForState(profile.state_code, { excludeDraft: true, year, month });
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

  const onYearChange = (nextYear: number) => {
    setMonth((currentMonth) => monthAfterYearChange(nextYear, currentMonth, periods));
    setYear(nextYear);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateEntryStatus(id, status);
      toast.success(`Entry marked as ${getStatusLabel(status)}`);
      await fetchEntries();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update status");
    }
  };

  const pendingCount = entries.filter(e => e.status === ENTRY_STATUS.SUBMITTED || e.status === ENTRY_STATUS.UNDER_REVIEW).length;
  const approvedCount = entries.filter(e => e.status === ENTRY_STATUS.APPROVED).length;

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Reviewer Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {profile?.full_name} ({stateName})</p>
        </div>
        <PeriodFilter
          year={year}
          month={month}
          periods={periods}
          onYearChange={onYearChange}
          onMonthChange={setMonth}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Submitted</div>
          <div className="text-2xl font-bold mt-1">{entries.length}</div>
        </div>
        <div className="bg-card border border-amber-200 p-4 rounded-xl shadow-sm bg-amber-50/50">
          <div className="text-sm font-medium text-amber-700">Pending Review</div>
          <div className="text-2xl font-bold mt-1 text-amber-800">{pendingCount}</div>
        </div>
        <div className="bg-card border border-emerald-200 p-4 rounded-xl shadow-sm bg-emerald-50/50">
          <div className="text-sm font-medium text-emerald-700">Approved</div>
          <div className="text-2xl font-bold mt-1 text-emerald-800">{approvedCount}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
          <h2 className="font-semibold">Review Queue</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium">S.No</th>
                {month == null ? <th className="px-4 py-3 font-medium">Month</th> : null}
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Activity</th>
                <th className="px-4 py-3 font-medium">Beneficiary</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Submitted by</th>
                <th className="px-4 py-3 font-medium">Investment</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={month == null ? 9 : 8} className="px-4 py-8 text-center text-muted-foreground">Loading queue...</td>
                </tr>
              ) : entries.length === 0 ? (
                <tr>
                  <td colSpan={month == null ? 9 : 8} className="px-4 py-8 text-center text-muted-foreground">No submissions to review.</td>
                </tr>
              ) : (
                paginatedItems.map((entry, idx) => (
                  <tr
                    key={entry.id}
                    className={`transition-colors ${entryRowCommentHighlightClass(entryNeedsCommentHighlight(entry))}`}
                  >
                    <td className="px-4 py-3 text-muted-foreground">{rowOffset + idx + 1}</td>
                    {month == null ? <td className="px-4 py-3 text-muted-foreground">{formatMonthYear(entry.month_year)}</td> : null}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted ${getStatusColor(entry.status)} bg-opacity-20`}>
                        {getStatusLabel(entry.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium truncate max-w-[200px]" title={entry.activity}>{entry.activity}</td>
                    <td className="px-4 py-3">{entry.beneficiary_name}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-normal">
                      {formatPortalDateTime(entry.submitted_at)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {entry.submitted_by_name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {entry.total_project_investment_lakhs ? `₹${entry.total_project_investment_lakhs} L` : '-'}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <EntryCommentsButton
                        count={entryCommentCount(entry)}
                        highlightUnresolved={entryNeedsCommentHighlight(entry)}
                        onClick={() => {
                          setSelectedEntryId(entry.id);
                          setIsCommentsOpen(true);
                        }}
                      />
                      
                      {entry.status === ENTRY_STATUS.SUBMITTED || entry.status === ENTRY_STATUS.UNDER_REVIEW ? (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            title="Approve"
                            onClick={() => updateStatus(entry.id, ENTRY_STATUS.APPROVED)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Decline"
                            onClick={() => updateStatus(entry.id, ENTRY_STATUS.DECLINED)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      ) : null}
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
