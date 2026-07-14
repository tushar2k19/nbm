import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { NewsCategoryMetrics } from "@/components/news/NewsCategoryMetrics";
import { NewsItemCard } from "@/components/news/NewsItemCard";
import { newsItems, newsTags, type NewsTag } from "@/data/news";
import { attachmentCount } from "@/lib/news";
import { Search, FileText, Newspaper } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Press Releases — National Bamboo Mission" },
      {
        name: "description",
        content:
          "Latest news, press releases, notifications and events from the National Bamboo Mission, Government of India.",
      },
    ],
  }),
  component: NewsListPage,
});

function NewsListPage() {
  const [activeTag, setActiveTag] = useState<NewsTag | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return newsItems.filter((item) => {
      const matchesTag = activeTag === "All" || item.tag === activeTag;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.refNo.toLowerCase().includes(q) ||
        item.issuedBy.toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: newsItems.length };
    for (const tag of newsTags) {
      map[tag] = newsItems.filter((n) => n.tag === tag).length;
    }
    return map;
  }, []);

  return (
    <>
      <PageHero
        title="News & Press Releases"
        subtitle="Official updates, press releases, notifications and events from the National Bamboo Mission."
        aside={
          <NewsCategoryMetrics
            counts={counts}
            activeTag={activeTag}
            onSelect={setActiveTag}
            tags={newsTags}
          />
        }
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, reference no. or keyword…"
                  className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTag("All")}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeTag === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  All ({counts.All})
                </button>
                {newsTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      activeTag === tag
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Showing <strong className="text-foreground">{filtered.length}</strong> of{" "}
              {newsItems.length} items
              {activeTag !== "All" && (
                <>
                  {" "}
                  in <span className="text-primary font-medium">{activeTag}</span>
                </>
              )}
            </p>

            {filtered.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-10 text-center">
                <Newspaper className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground">No items found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveTag("All");
                  }}
                  className="mt-4 text-sm text-primary font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {filtered.map((item) => (
                  <li key={item.id}>
                    <NewsItemCard item={item} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="space-y-5">
            <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-1 rounded-full bg-saffron" />
                <h3 className="font-semibold text-primary text-sm">Browse by Category</h3>
              </div>
              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTag("All")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTag === "All"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    All Updates
                    <span className="text-xs opacity-80">{counts.All}</span>
                  </button>
                </li>
                {newsTags.map((tag) => (
                  <li key={tag}>
                    <button
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTag === tag
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {tag}
                      <span className="text-xs opacity-80">{counts[tag]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary border border-border rounded-xl p-5">
              <h3 className="font-semibold text-primary text-sm mb-2">Media Inquiries</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                For press and media queries related to National Bamboo Mission announcements,
                contact the Bamboo Mission Cell.
              </p>
              <a
                href="mailto:nbm-agri@gov.in"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                nbm-agri@gov.in
              </a>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
              <h3 className="font-semibold text-primary text-sm mb-3">Latest Attachments</h3>
              <ul className="space-y-2">
                {newsItems
                  .filter((n) => attachmentCount(n) > 0)
                  .slice(0, 5)
                  .map((n) => (
                    <li key={n.id}>
                        <Link
                          to="/news/$newsId"
                          params={{ newsId: n.id }}
                          className="flex items-start gap-2 text-xs hover:text-primary transition-colors group"
                        >
                          <FileText className="h-4 w-4 text-saffron shrink-0 mt-0.5" />
                          <span className="group-hover:underline leading-snug line-clamp-2">
                            {n.title}
                          </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
