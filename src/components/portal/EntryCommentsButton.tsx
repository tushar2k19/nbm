import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ENTRY_STATUS } from "@/data/dropdowns";
import { cn } from "@/lib/utils";

type EntryCommentsButtonProps = {
  count?: number;
  /** When false but count > 0, badge stays visible without blue emphasis */
  highlightUnresolved?: boolean;
  onClick: () => void;
  className?: string;
};

export function entryCommentCount(entry: { comment_count?: number }): number {
  const value = entry.comment_count;
  return typeof value === "number" && !Number.isNaN(value) ? value : 0;
}

export function entryCommentsResolved(entry: { comments_resolved?: boolean }): boolean {
  return Boolean(entry.comments_resolved);
}

/** Row highlight: comments exist and the thread is not marked resolved. */
export function entryRowHasUnresolvedComments(entry: {
  comment_count?: number;
  comments_resolved?: boolean;
}): boolean {
  return entryCommentCount(entry) > 0 && !entryCommentsResolved(entry);
}

const FINAL_ENTRY_STATUSES = new Set<string>([ENTRY_STATUS.APPROVED, ENTRY_STATUS.DECLINED]);

/** Blue row / icon emphasis: unresolved thread on an entry that still needs follow-up. */
export function entryNeedsCommentHighlight(entry: {
  comment_count?: number;
  comments_resolved?: boolean;
  status?: string;
}): boolean {
  if (!entryRowHasUnresolvedComments(entry)) return false;
  const status = entry.status != null ? String(entry.status) : "";
  if (FINAL_ENTRY_STATUSES.has(status)) return false;
  return true;
}

/** @deprecated Use entryRowHasUnresolvedComments for row styling */
export function entryRowHasComments(entry: { comment_count?: number; comments_resolved?: boolean }): boolean {
  return entryRowHasUnresolvedComments(entry);
}

export function entryRowCommentHighlightClass(hasComments: boolean): string {
  return hasComments
    ? "bg-blue-50/90 hover:bg-blue-100/90 border-l-2 border-l-blue-500"
    : "hover:bg-muted/30";
}

export function EntryCommentsButton({
  count = 0,
  highlightUnresolved = true,
  onClick,
  className,
}: EntryCommentsButtonProps) {
  const hasComments = count > 0;
  const emphasize = hasComments && highlightUnresolved;
  const label = hasComments
    ? `${count} comment${count === 1 ? "" : "s"}${emphasize ? "" : " (resolved)"}`
    : "Comments";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "relative h-8 w-8",
        emphasize && "text-blue-700 hover:text-blue-800 hover:bg-blue-100/80",
        className,
      )}
      title={label}
      aria-label={label}
      onClick={onClick}
    >
      <MessageSquare className="h-4 w-4" aria-hidden />
      <span
        className={cn(
          "absolute -right-1 -top-1 flex min-h-[1rem] min-w-[1rem] items-center justify-center rounded-full px-0.5 text-[10px] font-bold leading-none",
          emphasize ? "bg-blue-600 text-white" : hasComments ? "bg-muted text-foreground" : "bg-muted text-muted-foreground",
        )}
      >
        {count > 99 ? "99+" : count}
      </span>
    </Button>
  );
}
