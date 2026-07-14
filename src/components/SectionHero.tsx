import { type CSSProperties, type ReactNode } from "react";
import { Leaf } from "lucide-react";
import bambooForestBg from "@/assets/front_page.png";

type SectionHeroProps = {
  eyebrow: ReactNode;
  title: string;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
  panel?: boolean;
};

export function SectionHero({
  eyebrow,
  title,
  children,
  aside,
  className,
  panel = false,
}: SectionHeroProps) {
  const hero = (
    <div
      className={`section-hero ${className ?? ""}`.trim()}
      style={{ "--section-hero-bg": `url(${bambooForestBg})` } as CSSProperties}
    >
      <div className="section-hero__stripe" aria-hidden />
      <div className="section-hero__photo" aria-hidden />
      <div className="section-hero__overlay" aria-hidden />
      <div className="section-hero__glow section-hero__glow--gold" aria-hidden />
      <div className="section-hero__glow section-hero__glow--green" aria-hidden />
      <Leaf className="section-hero__leaf" aria-hidden />

      <div className="section-hero__inner">
        <div className="section-hero__copy">
          <p className="section-hero__eyebrow">{eyebrow}</p>
          <h2 className="section-hero__title font-display">{title}</h2>
          {children && <div className="section-hero__body">{children}</div>}
        </div>
        {aside && <div className="section-hero__aside">{aside}</div>}
      </div>
    </div>
  );

  if (panel) {
    return <div className="section-hero-panel">{hero}</div>;
  }

  return hero;
}
