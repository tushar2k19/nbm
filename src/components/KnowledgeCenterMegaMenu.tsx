import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Package, Mail, Building2, ChevronRight, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { knowledgeCenterSections, type KnowledgeSection } from "@/data/knowledgeCenter";
import {
  MegaMenuDropdown,
  MegaMenuItemLink,
  MegaMenuMobileShell,
} from "@/components/MegaMenuPrimitives";

const sectionIcons: Record<string, LucideIcon> = {
  "training-modules": GraduationCap,
  institutes: Building2,
  "value-added-products": Package,
  letters: Mail,
  "research-papers": BookOpen,
};

type SectionId = KnowledgeSection["id"];

function sectionLinkTo(sectionId: SectionId) {
  if (sectionId === "value-added-products") return "/products";
  if (sectionId === "research-papers") return "/knowledge-center/research-papers";
  return "/knowledge-center";
}

function itemHash(sectionId: SectionId, itemId: string) {
  if (sectionId === "value-added-products") return undefined;
  if (sectionId === "research-papers") return itemId;
  return `${sectionId}-${itemId}`;
}

function MenuPaneContent({
  sectionId,
  onNavigate,
}: {
  sectionId: SectionId;
  onNavigate?: () => void;
}) {
  const section = knowledgeCenterSections.find((s) => s.id === sectionId);
  if (!section) return null;

  const Icon = sectionIcons[sectionId] ?? GraduationCap;
  const linkTo = sectionLinkTo(sectionId);

  return (
    <div className="animate-in fade-in slide-in-from-left-1 duration-200 ease-out fill-mode-forwards">
      <div className="mb-3 flex items-center gap-2 border-b border-primary/8 pb-2.5">
        <Icon className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
        <h3 className="font-display text-sm font-bold text-primary">{section.title}</h3>
      </div>

      <ul>
        {section.items.map((item) => (
          <MegaMenuItemLink
            key={item.id}
            to={linkTo}
            hash={itemHash(sectionId, item.id)}
            onNavigate={onNavigate}
          >
            {item.title}
          </MegaMenuItemLink>
        ))}
      </ul>

      {sectionId === "research-papers" && (
        <Link
          to="/knowledge-center/research-papers"
          onClick={onNavigate}
          className="mt-2 inline-flex items-center gap-0.5 text-xs font-medium text-primary/70 hover:text-saffron transition-colors"
        >
          View all papers
          <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

export function KnowledgeCenterMegaMenuPanel({ open, onNavigate }: { open: boolean; onNavigate?: () => void }) {
  const [activeSection, setActiveSection] = useState<SectionId>("training-modules");

  return (
    <MegaMenuDropdown
      open={open}
      ariaLabel="Knowledge center menu"
      maxWidthClass="max-w-[480px]"
    >
      <div className="mega-menu-panel flex overflow-hidden rounded-lg border border-primary/12 shadow-[0_12px_40px_-8px_oklch(0.28_0.09_150/0.35)]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron via-gold/60 to-primary z-20" />

        {/* Sidebar */}
        <div className="relative z-10 flex w-[158px] shrink-0 flex-col border-r border-primary/10 bg-primary/5 py-3">
          <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-widest text-primary/50">Browse</p>
          <ul className="flex-1 space-y-0.5 px-1.5">
            {knowledgeCenterSections.map((section) => {
              const Icon = sectionIcons[section.id] ?? GraduationCap;
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveSection(section.id)}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/75 hover:bg-primary/10 hover:text-primary"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-saffron" : "text-primary/45"}`} />
                    <span className="leading-tight">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 border-t border-primary/8 px-3 pt-2.5">
            <Link
              to="/knowledge-center"
              onClick={onNavigate}
              className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary hover:text-saffron transition-colors"
            >
              Explore all
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Content pane */}
        <div className="relative z-10 min-w-0 flex-1 bg-[oklch(0.99_0.01_95)] p-3.5">
          <MenuPaneContent sectionId={activeSection} onNavigate={onNavigate} />
        </div>
      </div>
    </MegaMenuDropdown>
  );
}

export function KnowledgeCenterMobileMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <MegaMenuMobileShell>
      {knowledgeCenterSections.map((section) => {
        const linkTo = sectionLinkTo(section.id);
        return (
          <div key={section.id}>
            <div className="mb-2 flex items-center gap-2 border-b border-primary/8 pb-2">
              <h3 className="font-display text-sm font-bold text-primary">{section.title}</h3>
            </div>
            <ul>
              {section.items.map((item) => (
                <MegaMenuItemLink
                  key={item.id}
                  to={linkTo}
                  hash={itemHash(section.id, item.id)}
                  onNavigate={onNavigate}
                >
                  {item.title}
                </MegaMenuItemLink>
              ))}
            </ul>
          </div>
        );
      })}
      <Link
        to="/knowledge-center"
        onClick={onNavigate}
        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-saffron"
      >
        Explore knowledge center
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </MegaMenuMobileShell>
  );
}
