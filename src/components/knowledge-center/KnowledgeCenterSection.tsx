import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type KnowledgeCenterSectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "elevated" | "muted";
  children: ReactNode;
};

export function KnowledgeCenterSection({
  id,
  title,
  subtitle,
  icon: Icon,
  variant = "default",
  children,
}: KnowledgeCenterSectionProps) {
  return (
    <section
      id={id}
      className={`kc-section scroll-mt-28 kc-section--${variant}`}
      aria-labelledby={`${id}-heading`}
    >
      <header className="kc-section-header">
        <div className="kc-section-header-badge" aria-hidden>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id={`${id}-heading`} className="kc-section-title">
            {title}
          </h2>
          {subtitle && <p className="kc-section-subtitle">{subtitle}</p>}
        </div>
      </header>
      <div className="kc-section-rule" aria-hidden />
      <div className="kc-section-body">{children}</div>
    </section>
  );
}
