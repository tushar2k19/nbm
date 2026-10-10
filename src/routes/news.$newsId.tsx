import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getNewsById, getRelatedNews } from "@/data/news";
import { tagClass } from "@/lib/news";
import { NewsDocumentsPanel } from "@/components/news/NewsDocumentsPanel";
import {
  ArrowLeft,
  Calendar,
  Building2,
  Hash,
  MapPin,
} from "lucide-react";

export const Route = createFileRoute("/news/$newsId")({
  head: ({ params }) => {
    const item = getNewsById(params.newsId);
    return {
      meta: item
        ? [
            { title: `${item.title} — NBM News` },
            { name: "description", content: item.excerpt },
          ]
        : [{ title: "News not found — NBM" }],
    };
  },
  loader: ({ params }) => {
    const item = getNewsById(params.newsId);
    if (!item) throw notFound();
    return { item, related: getRelatedNews(params.newsId) };
  },
  component: NewsDetailPage,
});

function NewsDetailPage() {
  const data = Route.useLoaderData() as any;
  if (!data) return null;
  const { item, related } = data;

  return (
    <>
      {/* Breadcrumb banner */}
      <section className="page-hero bg-gradient-hero text-primary-foreground">
        <div className="page-hero-inner mx-auto max-w-7xl px-4 sm:px-6">
          <span
            className={`inline-block text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full mb-2 ${tagClass(item.tag)}`}
          >
            {item.tag}
          </span>

          <h1 className="text-xl sm:text-2xl font-bold font-display leading-tight max-w-4xl">
            {item.title}
          </h1>

          <div className="mt-2 flex flex-wrap gap-4 text-xs opacity-90">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {item.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Hash className="h-3.5 w-3.5" />
              {item.refNo}
            </span>
            {item.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {item.location}
              </span>
            )}
          </div>
        </div>
        <div className="h-0.5 bg-tri-banner" aria-hidden />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <article>
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all news
            </Link>

            {/* Lead excerpt */}
            <p className="text-base text-foreground/90 leading-relaxed font-medium border-l-4 border-saffron pl-4 mb-8">
              {item.excerpt}
            </p>

            {/* Body */}
            <div className="space-y-4 text-sm sm:text-base text-foreground/90 leading-relaxed">
              {item.body.map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Attachment */}
            <NewsDocumentsPanel item={item} variant="detail" />

            {/* Issued by footer */}
            <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
              <p>
                <strong className="text-foreground">Issued by:</strong> {item.issuedBy}
              </p>
              <p className="mt-1">
                <strong className="text-foreground">Ministry:</strong> {item.ministry}
              </p>
              <p className="mt-1">
                <strong className="text-foreground">Reference:</strong> {item.refNo} · Published{" "}
                {item.date}
              </p>
            </div>
          </article>

          {/* Sidebar metadata */}
          <aside className="space-y-5">
            <div className="bg-card border border-border rounded-xl p-5 shadow-soft sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-1 rounded-full bg-saffron" />
                <h3 className="font-semibold text-primary text-sm">Release Details</h3>
              </div>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider">Category</dt>
                  <dd className="mt-0.5">
                    <span
                      className={`inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${tagClass(item.tag)}`}
                    >
                      {item.tag}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                    Published
                  </dt>
                  <dd className="mt-0.5 font-medium flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-saffron" />
                    {item.date}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                    Reference No.
                  </dt>
                  <dd className="mt-0.5 font-medium flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5 text-saffron" />
                    {item.refNo}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                    Issued By
                  </dt>
                  <dd className="mt-0.5 flex items-start gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-saffron shrink-0 mt-0.5" />
                    {item.issuedBy}
                  </dd>
                </div>
                {item.location && (
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase tracking-wider">
                      Location
                    </dt>
                    <dd className="mt-0.5 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-saffron" />
                      {item.location}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {related.length > 0 && (
              <div className="bg-secondary border border-border rounded-xl p-5">
                <h3 className="font-semibold text-primary text-sm mb-3">Related Updates</h3>
                <ul className="space-y-3">
                  {related.map((r: any) => (
                    <li key={r.id}>
                      <Link
                        to="/news/$newsId"
                        params={{ newsId: r.id }}
                        className="block group"
                      >
                        <span
                          className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full ${tagClass(r.tag)}`}
                        >
                          {r.tag}
                        </span>
                        <p className="text-xs font-medium mt-1 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {r.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{r.date}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
