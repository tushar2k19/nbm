import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_PORTAL_PAGE_SIZE,
  PORTAL_PAGE_SIZE_OPTIONS,
  type PortalPageSize,
} from "@/hooks/useClientPagination";

type Props = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: PortalPageSize;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PortalPageSize) => void;
  disabled?: boolean;
};

export function PortalTablePagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
  disabled = false,
}: Props) {
  const start = total === 0 ? 0 : page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, total);

  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) pages.push(i);
  } else {
    pages.push(0);
    if (page > 2) pages.push("ellipsis");
    for (let i = Math.max(1, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 3) pages.push("ellipsis");
    pages.push(totalPages - 1);
  }

  return (
    <div
      className="flex flex-col gap-3 border-t border-border bg-muted/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Table pagination"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span>
          {total === 0 ? "No entries to show" : `Showing ${start}–${end} of ${total}`}
        </span>
        <label className="inline-flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value) as PortalPageSize)}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[4.5rem]" aria-label="Rows per page">
              <SelectValue placeholder={String(DEFAULT_PORTAL_PAGE_SIZE)} />
            </SelectTrigger>
            <SelectContent>
              {PORTAL_PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      {totalPages > 1 && !disabled && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pages.map((p, i) =>
            p === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground text-sm">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm font-medium transition-colors ${
                  p === page
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-muted"
                }`}
                onClick={() => onPageChange(p)}
                aria-current={p === page ? "page" : undefined}
                aria-label={`Page ${p + 1}`}
              >
                {p + 1}
              </button>
            ),
          )}

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages - 1}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
