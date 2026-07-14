import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPage: (p: number) => void;
};

export function PlantationPagination({ page, totalPages, total, pageSize, onPage }: Props) {
  if (totalPages <= 1) return null;

  const start = page * pageSize + 1;
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
    <nav className="bp-pagination" aria-label="Plantation directory pagination">
      <p className="bp-pagination__info">
        Showing {start}–{end} of {total} entries
      </p>
      <div className="bp-pagination__pages">
        <button
          type="button"
          className="bp-page-btn"
          onClick={() => onPage(page - 1)}
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
              className={`bp-page-btn${p === page ? " bp-page-btn--active" : ""}`}
              onClick={() => onPage(p as number)}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Page ${(p as number) + 1}`}
            >
              {(p as number) + 1}
            </button>
          ),
        )}

        <button
          type="button"
          className="bp-page-btn"
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages - 1}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
