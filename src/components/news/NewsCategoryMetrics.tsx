import type { NewsTag } from "@/data/news";
import {
  Bell,
  CalendarDays,
  Megaphone,
  Newspaper,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TAG_META: Record<
  NewsTag,
  { short: string; icon: LucideIcon; accent: string }
> = {
  "Press Release": { short: "Press", icon: Megaphone, accent: "news-metric-press" },
  News: { short: "News", icon: Newspaper, accent: "news-metric-news" },
  Notification: { short: "Notice", icon: Bell, accent: "news-metric-notif" },
  Event: { short: "Events", icon: CalendarDays, accent: "news-metric-event" },
  Meeting: { short: "Meetings", icon: Users, accent: "news-metric-meeting" },
};

type NewsCategoryMetricsProps = {
  counts: Record<string, number>;
  activeTag: NewsTag | "All";
  onSelect: (tag: NewsTag) => void;
  tags: NewsTag[];
};

export function NewsCategoryMetrics({
  counts,
  activeTag,
  onSelect,
  tags,
}: NewsCategoryMetricsProps) {
  return (
    <div className="page-hero__metrics-grid page-hero__metrics-grid--news" role="group" aria-label="Browse by category">
      {tags.map((tag) => {
        const { short, icon: Icon, accent } = TAG_META[tag];
        const isActive = activeTag === tag;

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onSelect(tag)}
            aria-pressed={isActive}
            title={`${tag} (${counts[tag]} items)`}
            className={`page-hero__metric page-hero__metric--action page-hero__metric--compact ${accent} ${
              isActive ? "page-hero__metric--active" : ""
            }`}
          >
            <Icon className="page-hero__metric-icon page-hero__metric-icon--compact h-3.5 w-3.5" aria-hidden />
            <div className="page-hero__metric-body">
              <span className="page-hero__metric-value page-hero__metric-value--compact">
                {counts[tag]}
              </span>
              <span className="page-hero__metric-label page-hero__metric-label--compact">{short}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
