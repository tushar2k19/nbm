import { useEffect, useMemo, useState } from "react";

export const PORTAL_PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
export type PortalPageSize = (typeof PORTAL_PAGE_SIZE_OPTIONS)[number];
export const DEFAULT_PORTAL_PAGE_SIZE: PortalPageSize = 10;

export function useClientPagination<T>(items: T[], resetDeps: readonly unknown[] = []) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<PortalPageSize>(DEFAULT_PORTAL_PAGE_SIZE);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);

  const resetKey = JSON.stringify(resetDeps);

  useEffect(() => {
    setPage(0);
  }, [resetKey, pageSize, total]);

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(Math.max(0, totalPages - 1));
    }
  }, [page, totalPages]);

  const safePage = Math.min(page, totalPages - 1);

  const paginatedItems = useMemo(
    () => items.slice(safePage * pageSize, safePage * pageSize + pageSize),
    [items, safePage, pageSize],
  );

  return {
    page: safePage,
    setPage,
    pageSize,
    setPageSize,
    total,
    totalPages,
    paginatedItems,
    rowOffset: safePage * pageSize,
  };
}
