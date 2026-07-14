import type { NewsAttachment, NewsItem, NewsTag } from "@/data/news";

export function tagClass(tag: NewsTag | string): string {
  switch (tag) {
    case "Press Release":
      return "news-tag-press";
    case "News":
      return "news-tag-news";
    case "Notification":
      return "news-tag-notif";
    case "Event":
      return "news-tag-event";
    case "Meeting":
      return "news-tag-meeting";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

/** Primary + supplementary attachments in display order. */
export function getAllAttachments(item: NewsItem): NewsAttachment[] {
  const list: NewsAttachment[] = [];
  if (item.attachment) list.push(item.attachment);
  if (item.attachments?.length) {
    for (const att of item.attachments) {
      if (!list.some((x) => x.url === att.url)) list.push(att);
    }
  }
  return list;
}

export function attachmentCount(item: NewsItem): number {
  return getAllAttachments(item).length;
}

export function attachmentTypeLabel(type: NewsAttachment["type"]): string {
  switch (type) {
    case "PDF":
      return "PDF";
    case "PPTX":
      return "PowerPoint";
    case "PPT":
      return "Presentation";
    case "Image":
      return "Image";
    case "External":
      return "External link";
    default:
      return type;
  }
}

/** Group session-titled attachments (National Consultation) for detail layout. */
export type AttachmentGroups = {
  ungrouped: NewsAttachment[];
  sessions: { session: string; items: NewsAttachment[] }[];
};

export function partitionAttachmentsBySession(
  attachments: NewsAttachment[],
): AttachmentGroups {
  const sessionRe = /^Session\s+(\d+)\s+—/i;
  const ungrouped: NewsAttachment[] = [];
  const groups = new Map<string, NewsAttachment[]>();

  for (const att of attachments) {
    const m = att.title.match(sessionRe);
    if (m) {
      const key = m[1];
      const bucket = groups.get(key) ?? [];
      bucket.push(att);
      groups.set(key, bucket);
    } else {
      ungrouped.push(att);
    }
  }

  const sessions = [...groups.entries()]
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([num, items]) => ({
      session: `Session ${num}`,
      items,
    }));

  return { ungrouped, sessions };
}

/** @deprecated use partitionAttachmentsBySession */
export function groupAttachmentsBySession(
  attachments: NewsAttachment[],
): { session: string; items: NewsAttachment[] }[] | null {
  const { ungrouped, sessions } = partitionAttachmentsBySession(attachments);
  if (sessions.length < 2 && ungrouped.length === 0) return null;
  if (sessions.length === 0) return null;
  return sessions;
}

/** Boilerplate lines added during data import — not user-facing narrative. */
const BOILERPLATE_PREFIXES = [
  "Official minutes published on the National Bamboo Mission portal",
  "Official notification published on the National Bamboo Mission portal",
];

function isBoilerplateParagraph(text: string, item: NewsItem): boolean {
  const t = text.trim();
  if (!t) return true;
  if (BOILERPLATE_PREFIXES.some((p) => t.startsWith(p))) return true;
  if (t === item.title.trim() || t === item.excerpt.trim()) return true;
  return false;
}

/** True when the item has narrative users should read on a detail page. */
export function hasSubstantiveContent(item: NewsItem): boolean {
  const attachments = getAllAttachments(item);

  // External links (Webex, GeM Drive, etc.) always need a detail page for context.
  if (item.externalUrl) return true;

  // Posters / images are opened from the detail page, not inline.
  if (attachments.some((a) => a.type === "Image")) return true;

  const substantiveBody = item.body.filter((p) => !isBoilerplateParagraph(p, item));
  if (substantiveBody.length > 0) return true;

  // Meaningful excerpt beyond repeating the title.
  const excerpt = item.excerpt.trim();
  if (excerpt && excerpt !== item.title.trim() && excerpt.length > 40) return true;

  return false;
}

/**
 * Direct-open only when: exactly one file, no external URL, and no readable body text.
 * Matches official portal rows that are PDF-only (e.g. single-session attachments).
 */
export function shouldOpenDirectDocument(item: NewsItem): boolean {
  const attachments = getAllAttachments(item);
  if (attachments.length !== 1) return false;
  if (item.externalUrl) return false;
  if (hasSubstantiveContent(item)) return false;
  return true;
}

export function resourceCount(item: NewsItem): number {
  return getAllAttachments(item).length + (item.externalUrl ? 1 : 0);
}

export type NewsItemAction =
  | { kind: "detail"; cta: string }
  | { kind: "document"; url: string; cta: string; type: NewsAttachment["type"] };

/** Decide list-card primary action: direct doc or detail page. */
export function getNewsItemAction(item: NewsItem): NewsItemAction {
  const attachments = getAllAttachments(item);
  const total = resourceCount(item);

  if (shouldOpenDirectDocument(item)) {
    const att = attachments[0];
    const cta =
      att.type === "PDF"
        ? "Open PDF"
        : att.type === "PPTX" || att.type === "PPT"
          ? "Open presentation"
          : "Open document";
    return { kind: "document", url: att.url, cta, type: att.type };
  }

  if (total > 1) {
    return { kind: "detail", cta: `View ${total} documents` };
  }

  return { kind: "detail", cta: "Read full release" };
}
