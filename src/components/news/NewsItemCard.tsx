import { Link } from "@tanstack/react-router";
import type { NewsItem } from "@/data/news";
import {
  attachmentCount,
  getAllAttachments,
  getNewsItemAction,
  resourceCount,
  shouldOpenDirectDocument,
  tagClass,
} from "@/lib/news";
import {
  ArrowRight,
  Building2,
  Calendar,
  ExternalLink,
  FileImage,
  FileText,
  Hash,
  MapPin,
  Presentation,
} from "lucide-react";

type NewsItemCardProps = {
  item: NewsItem;
  compact?: boolean;
};

function TypeIcon({ type }: { type: string }) {
  const cls = "h-3.5 w-3.5";
  switch (type) {
    case "Image":
      return <FileImage className={`${cls} text-sky-600`} aria-hidden />;
    case "PPTX":
    case "PPT":
      return <Presentation className={`${cls} text-orange-600`} aria-hidden />;
    default:
      return <FileText className={`${cls} text-red-700`} aria-hidden />;
  }
}

function AttachmentTypeIcons({ item }: { item: NewsItem }) {
  const types = [...new Set(getAllAttachments(item).map((a) => a.type))];
  if (types.length === 0 && item.externalUrl) {
    return (
      <span className="news-file-icon-pill" title="External link">
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </span>
    );
  }
  if (types.length === 0) return null;

  return (
    <span className="flex items-center gap-1">
      {types.map((type) => (
        <span key={type} className="news-file-icon-pill" title={type}>
          <TypeIcon type={type} />
        </span>
      ))}
    </span>
  );
}

function TitleLink({ item, compact }: { item: NewsItem; compact?: boolean }) {
  const cls = `text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug ${compact ? "line-clamp-2" : ""}`;

  if (shouldOpenDirectDocument(item)) {
    const att = getAllAttachments(item)[0];
    return (
      <a
        href={att.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${cls}`}
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link to="/news/$newsId" params={{ newsId: item.id }} className={`block ${cls}`}>
      {item.title}
    </Link>
  );
}

function ActionButton({ item }: { item: NewsItem }) {
  const action = getNewsItemAction(item);

  if (action.kind === "document") {
    return (
      <a
        href={action.url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-item-cta"
      >
        {action.cta} <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  return (
    <Link
      to="/news/$newsId"
      params={{ newsId: item.id }}
      className="news-item-cta"
    >
      {action.cta} <ArrowRight className="h-3 w-3" />
    </Link>
  );
}

export function NewsItemCard({ item, compact = false }: NewsItemCardProps) {
  const files = attachmentCount(item);
  const resources = resourceCount(item);

  return (
    <article
      className={`group bg-card border border-border rounded-xl shadow-soft card-lift hover:border-primary/30 transition-colors news-item-card ${compact ? "p-3" : "p-5"}`}
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
        {!compact && (
          <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground opacity-60">
            <Hash className="h-3 w-3" />
            {item.refNo}
          </span>
        )}
        {item.location && !compact && (
          <span className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {item.location}
          </span>
        )}
        <span className="ml-auto flex items-center gap-2">
          <AttachmentTypeIcons item={item} />
          {resources > 1 && (
            <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {resources} files
            </span>
          )}
          {files === 0 && item.externalUrl && (
            <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Web link
            </span>
          )}
        </span>
      </div>

      <TitleLink item={item} compact={compact} />

      {!compact && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {item.excerpt}
        </p>
      )}

      <div className={`flex flex-wrap items-center justify-between gap-2 ${compact ? "mt-2" : "mt-3"}`}>
        {!compact && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {item.issuedBy}
          </span>
        )}
        <ActionButton item={item} />
      </div>
    </article>
  );
}
