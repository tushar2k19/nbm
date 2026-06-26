import type { NewsTag } from "@/data/news";

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
    default:
      return "bg-secondary text-secondary-foreground";
  }
}
