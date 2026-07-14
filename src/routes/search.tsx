import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { searchSite, SEARCH_CATEGORIES, type SearchResult } from "@/lib/searchIndex";
import { useState, useMemo, useId } from "react";
import {
  Search,
  Newspaper,
  FileText,
  BarChart2,
  ClipboardList,
  Phone,
  BookOpen,
  GraduationCap,
  ChevronRight,
  SearchX,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: ({ search }) => ({
    meta: [
      {
        title: search.q
          ? `Search: "${search.q}" — National Bamboo Mission`
          : "Search — National Bamboo Mission",
      },
      { name: "description", content: "Search across all pages of the National Bamboo Mission portal." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

const CATEGORY_ICONS: Record<(typeof SEARCH_CATEGORIES)[number], typeof Search> = {
  "News & Press": Newspaper,
  Guidelines: FileText,
  Reports: BarChart2,
  "Tenders / Vacancies": ClipboardList,
  Contacts: Phone,
  Research: BookOpen,
  Training: GraduationCap,
};

const CATEGORY_COLORS: Record<(typeof SEARCH_CATEGORIES)[number], string> = {
  "News & Press": "bg-blue-50 text-blue-700 border-blue-200",
  Guidelines: "bg-amber-50 text-amber-700 border-amber-200",
  Reports: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Tenders / Vacancies": "bg-red-50 text-red-700 border-red-200",
  Contacts: "bg-purple-50 text-purple-700 border-purple-200",
  Research: "bg-teal-50 text-teal-700 border-teal-200",
  Training: "bg-green-50 text-green-800 border-green-200",
};

function ResultCard({ result }: { result: SearchResult }) {
  const Icon = CATEGORY_ICONS[result.category];
  const colorCls = CATEGORY_COLORS[result.category];
  return (
    <Link
      to={result.url as Parameters<typeof Link>[0]["to"]}
      className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
    >
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${colorCls}`}
        aria-hidden
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground group-hover:text-primary leading-snug">
          {result.title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {result.description}
        </p>
        <span
          className={`mt-1.5 inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${colorCls}`}
        >
          {result.category}
        </span>
      </div>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-foreground/30 group-hover:text-primary transition-colors" aria-hidden />
    </Link>
  );
}

function SearchPage() {
  const { q: initialQ } = Route.useSearch();
  const navigate = useNavigate();
  const formId = useId();

  const [inputValue, setInputValue] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const results = useMemo(() => searchSite(initialQ, 60), [initialQ]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchResult[]>();
    for (const r of results) {
      const arr = map.get(r.category) ?? [];
      arr.push(r);
      map.set(r.category, arr);
    }
    return map;
  }, [results]);

  const categoriesWithResults = ["All", ...Array.from(grouped.keys())];

  const displayed =
    activeCategory === "All"
      ? results
      : (grouped.get(activeCategory) ?? []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = inputValue.trim();
    if (q) {
      void navigate({ to: "/search", search: { q } });
      setActiveCategory("All");
    }
  }

  return (
    <div className="search-page">
      <PageHero
        eyebrow={
          <>
            <Search className="h-3.5 w-3.5" aria-hidden />
            GIGW 3.0 · Full-text Search
          </>
        }
        title="Site Search"
        subtitle="Search across all pages of the National Bamboo Mission portal — news, guidelines, reports, tenders, contacts and research."
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        {/* Search form */}
        <form
          onSubmit={handleSubmit}
          role="search"
          aria-label="Search the site"
          className="mb-8"
        >
          <label htmlFor={`${formId}-q`} className="mb-2 block text-sm font-semibold text-foreground">
            Enter your search query
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id={`${formId}-q`}
                type="search"
                name="q"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. bamboo plantation, annual action plan, agarbatti…"
                autoComplete="off"
                autoFocus
                className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="btn-gold inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
            >
              <Search className="h-4 w-4" aria-hidden />
              Search
            </button>
          </div>
        </form>

        {initialQ ? (
          <>
            {/* Results summary */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-foreground/80" aria-live="polite" role="status">
                {results.length === 0 ? (
                  <>No results for <strong>"{initialQ}"</strong></>
                ) : (
                  <>
                    <strong>{results.length}</strong> result{results.length !== 1 ? "s" : ""} for{" "}
                    <strong>"{initialQ}"</strong>
                  </>
                )}
              </p>
            </div>

            {/* Category filter pills */}
            {results.length > 0 && (
              <div
                className="mb-6 flex flex-wrap gap-2"
                role="group"
                aria-label="Filter results by category"
              >
                {categoriesWithResults.map((cat) => {
                  const count = cat === "All" ? results.length : (grouped.get(cat)?.length ?? 0);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      aria-pressed={activeCategory === cat}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {cat}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                          activeCategory === cat
                            ? "bg-white/20"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Results */}
            {results.length === 0 ? (
              <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card py-16 text-center">
                <SearchX className="h-12 w-12 text-muted-foreground/40" aria-hidden />
                <div>
                  <p className="text-base font-semibold text-foreground">No results found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try different keywords, or browse sections directly.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <Link to="/guidelines" className="text-primary underline hover:opacity-80">Guidelines</Link>
                  <Link to="/reports" className="text-primary underline hover:opacity-80">Reports</Link>
                  <Link to="/news" className="text-primary underline hover:opacity-80">News</Link>
                  <Link to="/tenders-vacancies" className="text-primary underline hover:opacity-80">Tenders</Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3" role="list" aria-label={`Search results for ${initialQ}`}>
                {displayed.map((r) => (
                  <div key={r.id} role="listitem">
                    <ResultCard result={r} />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Empty state — no query yet */
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex items-start gap-3 text-sm text-foreground/70">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-semibold text-foreground">What can you search for?</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {SEARCH_CATEGORIES.map((cat) => {
                    const Icon = CATEGORY_ICONS[cat];
                    const colorCls = CATEGORY_COLORS[cat];
                    return (
                      <li key={cat} className="flex items-center gap-2">
                        <span className={`flex h-6 w-6 items-center justify-center rounded border ${colorCls}`} aria-hidden>
                          <Icon className="h-3 w-3" />
                        </span>
                        <span className="text-xs">{cat}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tip */}
        <p className="mt-6 text-xs text-muted-foreground">
          This is a client-side search across all published content. For RTI-related queries, visit the{" "}
          <Link to="/rti" className="text-primary underline hover:opacity-80">RTI page</Link>.
        </p>
      </div>
    </div>
  );
}
