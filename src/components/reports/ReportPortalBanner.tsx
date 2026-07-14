import { Link } from "@tanstack/react-router";
import { ArrowRight, LayoutGrid } from "lucide-react";
import type { ReportPortalConfig } from "@/data/reportPortals";

type Props = {
  config: ReportPortalConfig;
};

export function ReportPortalBanner({ config }: Props) {
  return (
    <div className={`reports-portal reports-portal--${config.accent}`}>
      <div className="reports-portal__stripe" aria-hidden />
      <div className="reports-portal__inner">
        <div className="reports-portal__copy">
          <div className="reports-portal__icon" aria-hidden>
            <LayoutGrid className="h-4 w-4" />
          </div>
          <div className="reports-portal__text">
            <p className="reports-portal__eyebrow">{config.eyebrow}</p>
            <p className="reports-portal__title">{config.title}</p>
            <p className="reports-portal__desc">{config.description}</p>
            <p className="reports-portal__stat">{config.stat}</p>
          </div>
        </div>
        <Link to={config.to} className="reports-portal__cta">
          {config.ctaLabel}
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
