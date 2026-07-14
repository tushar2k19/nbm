import { ExternalLink, Scale } from "lucide-react";
import { rtiActLinks } from "@/data/rti";

export function RtiActLinks() {
  return (
    <div className="rti-act-links">
      {rtiActLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="rti-act-card group"
        >
          <span className="rti-act-card__header">
            <span className="rti-act-card__icon" aria-hidden>
              <Scale className="h-4 w-4" />
            </span>
            <span className="rti-act-card__title">{link.label}</span>
            <ExternalLink className="rti-act-card__external h-3.5 w-3.5 shrink-0" aria-hidden />
          </span>
          <p className="rti-act-card__description">{link.description}</p>
          <p className="rti-act-card__source">{link.source}</p>
        </a>
      ))}
    </div>
  );
}
