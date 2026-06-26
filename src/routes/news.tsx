import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteLayout";
import { newsItems, newsTags, type NewsTag } from "@/data/news";
import { tagClass } from "@/lib/news";
import {
  Calendar,
  Search,
  ArrowRight,
  Building2,
  Hash,
  MapPin,
  Newspaper,
  FileText,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/news")({
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
  component: NewsPage,
});

function NewsPage() {
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
      />

      {/* Summary strip */}
      <section className="bg-primary bamboo-texture-bg border-b border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {newsTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-xl border px-4 py-3 text-left transition-all ${
                  activeTag === tag
                    ? "bg-primary-foreground/15 border-primary-foreground/30 text-primary-foreground"
                    : "bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/10"
                }`}
              >
                <div className="text-2xl font-bold font-display">{counts[tag]}</div>
                <div className="text-xs mt-0.5 opacity-80">{tag}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main listing */}
          <div>
            {/* Filters */}
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

            {/* Results count */}
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

            {/* News list */}
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
                    <Link
                      to="/news/$newsId"
                      params={{ newsId: item.id }}
                      className="group block bg-card border border-border rounded-xl p-5 shadow-soft card-lift hover:border-primary/30 transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${tagClass(item.tag)}`}
                        >
                          {item.tag}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Hash className="h-3 w-3" />
                          {item.refNo}
                        </span>
                        {item.location && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <h2 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h2>

                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {item.excerpt}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {item.issuedBy}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                          Read full release <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sidebar */}
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
                  .filter((n) => n.attachment)
                  .slice(0, 3)
                  .map((n) => (
                    <li key={n.id}>
                      <Link
                        to="/news/$newsId"
                        params={{ newsId: n.id }}
                        className="flex items-start gap-2 text-xs hover:text-primary transition-colors group"
                      >
                        <FileText className="h-4 w-4 text-saffron shrink-0 mt-0.5" />
                        <span className="group-hover:underline leading-snug">
                          {n.attachment!.title}
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
