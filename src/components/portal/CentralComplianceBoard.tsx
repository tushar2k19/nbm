import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, CheckCircle2, ClipboardList, ExternalLink, PenLine, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PortalTablePagination } from "@/components/portal/PortalTablePagination";
import { useClientPagination } from "@/hooks/useClientPagination";
import { formatPortalDateTime } from "@/lib/portal-datetime";
import {
  fetchReportingCompliance,
  fetchReportingReminderPreview,
  recordReportingReminder,
  type ComplianceBoard,
  type ComplianceRow,
} from "@/lib/portal-client";
import { cn } from "@/lib/utils";

type ChipId = "all" | "not_started" | "editors" | "reviewers" | "approved";

const STAGE_CLASS: Record<string, string> = {
  not_started: "bg-stone-100 text-stone-700",
  drafts_pending: "bg-amber-50 text-amber-800",
  awaiting_review: "bg-sky-50 text-sky-800",
  corrections_pending: "bg-orange-50 text-orange-800",
  review_in_progress: "bg-indigo-50 text-indigo-800",
  approved: "bg-emerald-50 text-emerald-800",
};

type CentralComplianceBoardProps = {
  year: number;
  month: number | null;
  stateCode: string | null;
};

export function CentralComplianceBoard({ year, month, stateCode }: CentralComplianceBoardProps) {
  const [board, setBoard] = useState<ComplianceBoard | null>(null);
  const [loading, setLoading] = useState(false);
  const [chip, setChip] = useState<ChipId>("all");
  const [target, setTarget] = useState<ComplianceRow | null>(null);
  const [sending, setSending] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [lastPreviewPath, setLastPreviewPath] = useState<string | null>(null);

  const load = async () => {
    if (month == null) {
      setBoard(null);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchReportingCompliance(year, month, stateCode);
      setBoard(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load compliance status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setChip("all");
    void load();
  }, [year, month, stateCode]);

  const filtered = useMemo(() => {
    const rows = board?.rows ?? [];
    if (chip === "not_started") return rows.filter((row) => row.stage === "not_started");
    if (chip === "editors") return rows.filter((row) => row.pendingWith === "editors" && row.stage !== "not_started");
    if (chip === "reviewers") return rows.filter((row) => row.pendingWith === "reviewers");
    if (chip === "approved") return rows.filter((row) => row.stage === "approved");
    return rows;
  }, [board, chip]);

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedItems,
    total,
  } = useClientPagination(filtered, [year, month, stateCode, chip]);

  const previewSampleMail = async () => {
    if (!target || month == null) return;
    setPreviewing(true);
    try {
      const result = await fetchReportingReminderPreview(target.stateCode, year, month);
      if (result.previewPath) {
        setLastPreviewPath(result.previewPath);
        window.open(result.previewPath, "_blank", "noopener");
      } else {
        toast.info("Email was sent via SMTP (no local preview).");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not generate preview");
    } finally {
      setPreviewing(false);
    }
  };

  const sendReminder = async () => {
    if (!target || month == null) return;
    setSending(true);
    try {
      const result = await recordReportingReminder(target.stateCode, year, month);
      toast.success(
        result.previewPath
          ? `Reminder recorded for ${result.recipients.length} officer(s). Sample email is ready to view.`
          : `Reminder recorded for ${result.recipients.length} officer(s) in ${result.stateName}.`,
      );
      if (result.previewPath) {
        setLastPreviewPath(result.previewPath);
        window.open(result.previewPath, "_blank", "noopener");
      }
      setTarget(null);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not record reminder");
    } finally {
      setSending(false);
    }
  };

  if (month == null) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-sm p-10 text-center">
        <ClipboardList className="h-8 w-8 text-muted-foreground mx-auto mb-3" aria-hidden />
        <h2 className="text-lg font-semibold">Choose a reporting month</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          Compliance status is tracked for one month at a time. Select a month in the header to see where each state stands.
        </p>
      </div>
    );
  }

  const summary = board?.summary;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryChip
          label="Not started"
          hint="No data entered"
          count={summary?.notStarted ?? 0}
          active={chip === "not_started"}
          icon={<PenLine className="h-4 w-4" aria-hidden />}
          tone="stone"
          onClick={() => setChip(chip === "not_started" ? "all" : "not_started")}
        />
        <SummaryChip
          label="With editors"
          hint="Drafts or corrections"
          count={summary?.withEditors ?? 0}
          active={chip === "editors"}
          icon={<PenLine className="h-4 w-4" aria-hidden />}
          tone="amber"
          onClick={() => setChip(chip === "editors" ? "all" : "editors")}
        />
        <SummaryChip
          label="With reviewers"
          hint="Waiting for a decision"
          count={summary?.withReviewers ?? 0}
          active={chip === "reviewers"}
          icon={<ClipboardList className="h-4 w-4" aria-hidden />}
          tone="sky"
          onClick={() => setChip(chip === "reviewers" ? "all" : "reviewers")}
        />
        <SummaryChip
          label="Approved"
          hint="Month closed"
          count={summary?.approved ?? 0}
          active={chip === "approved"}
          icon={<CheckCircle2 className="h-4 w-4" aria-hidden />}
          tone="emerald"
          onClick={() => setChip(chip === "approved" ? "all" : "approved")}
        />
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between p-4 border-b border-border bg-muted/20">
          <div>
            <h2 className="font-semibold">Monthly compliance — {board?.monthLabel ?? ""}</h2>
            <p className="text-xs text-muted-foreground">
              {stateCode
                ? "One state. The stage shows who must act before this month can close."
                : "All states and union territories. Select a chip to focus on one kind of delay."}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium">State / UT</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Pending with</th>
                <th className="px-4 py-3 font-medium">Entries</th>
                <th className="px-4 py-3 font-medium">Last reminder</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading compliance…</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No states in this view.</td>
                </tr>
              ) : (
                paginatedItems.map((row) => (
                  <tr key={row.stateCode} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="font-medium">{row.stateName}</div>
                      <div className="text-xs text-muted-foreground">{row.stateType === "ut" ? "Union territory" : "State"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", STAGE_CLASS[row.stage])}>
                        {row.stageLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.pendingWithLabel}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.counts.total === 0 ? (
                        "—"
                      ) : (
                        <span title="Drafts · in review · declined · approved">
                          {row.counts.total}
                          <span className="text-xs">
                            {" "}
                            ({row.counts.draft} draft · {row.counts.submitted} review · {row.counts.declined} declined · {row.counts.approved} approved)
                          </span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatPortalDateTime(row.lastReminderAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={!row.canRemind}
                        title={row.canRemind ? `Remind ${row.pendingWithLabel.toLowerCase()}` : "Month is fully approved"}
                        onClick={() => setTarget(row)}
                      >
                        <Bell className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                        Remind
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
          total={total}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          disabled={loading}
        />
      </div>

      <Dialog open={target != null} onOpenChange={(open) => !open && setTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send reminder</DialogTitle>
            <DialogDescription>
              {target
                ? `${target.stateName} · ${board?.monthLabel}. Pending with ${target.pendingWithLabel.toLowerCase()} (${target.stageLabel.toLowerCase()}).`
                : ""}
            </DialogDescription>
          </DialogHeader>
          {target ? (
            <div className="space-y-3 text-sm">
              <p className="rounded-md border border-border bg-muted/40 px-3 py-2 text-muted-foreground">
                When SMTP is not configured, a sample message is stored locally (same as the Users tab). Recording a reminder
                will queue one email per officer; the preview shows the first recipient&apos;s copy.
              </p>
              {target.recipients.length > 0 ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  disabled={previewing}
                  onClick={() => void previewSampleMail()}
                >
                  <ExternalLink className="mr-2 h-3.5 w-3.5" aria-hidden />
                  {previewing ? "Opening preview…" : "Preview sample email"}
                </Button>
              ) : null}
              {lastPreviewPath ? (
                <Link
                  to="/mailbox/$id"
                  params={{ id: lastPreviewPath.replace(/^\/mailbox\//, "") }}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Open last preview in mailbox
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </Link>
              ) : null}
              {target.recipients.length === 0 ? (
                <p className="text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                  No active {target.pendingWith === "editors" ? "editors" : "reviewers"} are assigned for {target.stateName}. Nothing will be recorded.
                </p>
              ) : (
                <ul className="max-h-40 overflow-y-auto divide-y divide-border rounded-md border border-border">
                  {target.recipients.map((officer) => (
                    <li key={officer.userId} className="px-3 py-2">
                      <div className="font-medium">{officer.fullName}</div>
                      <div className="text-xs text-muted-foreground">{officer.email}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setTarget(null)} disabled={sending}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => void sendReminder()}
              disabled={sending || !target || target.recipients.length === 0}
            >
              <Send className="mr-2 h-4 w-4" aria-hidden />
              {sending ? "Recording…" : "Record reminder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SummaryChip({
  label,
  hint,
  count,
  active,
  icon,
  tone,
  onClick,
}: {
  label: string;
  hint: string;
  count: number;
  active: boolean;
  icon: ReactNode;
  tone: "stone" | "amber" | "sky" | "emerald";
  onClick: () => void;
}) {
  const toneClass = {
    stone: "border-stone-200",
    amber: "border-amber-200",
    sky: "border-sky-200",
    emerald: "border-emerald-200",
  }[tone];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left rounded-xl border bg-card p-4 shadow-sm transition-colors hover:bg-muted/30",
        toneClass,
        active && "ring-2 ring-primary",
      )}
    >
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
        {icon}
      </div>
      <div className="mt-1 text-2xl font-bold text-foreground">{count}</div>
      <div className="text-xs text-muted-foreground">{hint}</div>
    </button>
  );
}
