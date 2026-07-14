import type { NewsAttachment, NewsItem } from "@/data/news";
import {
  attachmentTypeLabel,
  getAllAttachments,
  partitionAttachmentsBySession,
} from "@/lib/news";
import {
  ExternalLink,
  FileImage,
  FileSpreadsheet,
  FileText,
  Globe,
  Presentation,
} from "lucide-react";

type NewsDocumentsPanelProps = {
  item: NewsItem;
  variant?: "detail" | "compact";
};

function DocIcon({ type }: { type: NewsAttachment["type"] }) {
  const cls = "h-5 w-5 shrink-0";
  switch (type) {
    case "Image":
      return <FileImage className={`${cls} text-sky-600`} aria-hidden />;
    case "PPTX":
    case "PPT":
      return <Presentation className={`${cls} text-orange-600`} aria-hidden />;
    case "External":
      return <Globe className={`${cls} text-violet-600`} aria-hidden />;
    default:
      return <FileText className={`${cls} text-red-700`} aria-hidden />;
  }
}

function DocCard({ att, compact }: { att: NewsAttachment; compact?: boolean }) {
  const typeCls =
    att.type === "PDF"
      ? "doc-badge-pdf"
      : att.type === "Image"
        ? "doc-badge-image"
        : att.type === "PPTX" || att.type === "PPT"
          ? "doc-badge-ppt"
          : "doc-badge-ext";

  return (
    <a
      href={att.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`news-doc-card group ${compact ? "news-doc-card-compact" : ""}`}
    >
      <DocIcon type={att.type} />
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm leading-snug group-hover:text-primary transition-colors">
          {att.title}
        </div>
        <span className={`news-doc-badge mt-1.5 ${typeCls}`}>
          {attachmentTypeLabel(att.type)}
        </span>
      </div>
      <ExternalLink
        className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
        aria-hidden
      />
    </a>
  );
}

function DocGrid({
  attachments,
  compact,
}: {
  attachments: NewsAttachment[];
  compact?: boolean;
}) {
  if (attachments.length === 0) return null;
  return (
    <div className={`grid gap-2 ${compact ? "" : "sm:grid-cols-2"}`}>
      {attachments.map((att) => (
        <DocCard key={att.url} att={att} compact={compact} />
      ))}
    </div>
  );
}

export function NewsDocumentsPanel({ item, variant = "detail" }: NewsDocumentsPanelProps) {
  const attachments = getAllAttachments(item);
  const { ungrouped, sessions } = partitionAttachmentsBySession(attachments);
  const compact = variant === "compact";
  const hasSessions = sessions.length > 0;

  if (attachments.length === 0 && !item.externalUrl) return null;

  return (
    <div className={compact ? "space-y-2" : "mt-8 news-documents-panel"}>
      {!compact && (
        <div className="flex items-center gap-2 mb-4">
          <FileSpreadsheet className="h-4 w-4 text-saffron" aria-hidden />
          <h2 className="text-sm font-semibold text-primary">
            Documents &amp; downloads
            {attachments.length > 0 && (
              <span className="ml-2 font-normal text-muted-foreground">
                ({attachments.length})
              </span>
            )}
          </h2>
        </div>
      )}

      {ungrouped.length > 0 && (
        <div className={hasSessions ? "mb-5" : ""}>
          {hasSessions && (
            <h3 className="news-doc-session-title">General documents</h3>
          )}
          <DocGrid attachments={ungrouped} compact={compact} />
        </div>
      )}

      {hasSessions && (
        <div className="space-y-5">
          {sessions.map(({ session, items }) => (
            <div key={session} className="news-doc-session">
              <h3 className="news-doc-session-title">{session}</h3>
              <DocGrid attachments={items} compact={compact} />
            </div>
          ))}
        </div>
      )}

      {!hasSessions && ungrouped.length === 0 && attachments.length > 0 && (
        <DocGrid attachments={attachments} compact={compact} />
      )}

      {item.externalUrl && (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`news-doc-external ${attachments.length ? "mt-4" : ""}`}
        >
          <Globe className="h-5 w-5 text-primary shrink-0" aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm">Open external resource</div>
            <div className="text-xs text-muted-foreground mt-0.5 truncate">
              {item.externalUrl.replace(/^https?:\/\//, "")}
            </div>
          </div>
          <ExternalLink className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        </a>
      )}
    </div>
  );
}
