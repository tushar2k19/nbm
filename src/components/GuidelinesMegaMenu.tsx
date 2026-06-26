import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Shield, Banknote, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  megaMenuGroups,
  sectionsForMenuGroup,
  type GuidelineSection,
} from "@/data/guidelinesDocuments";
import {
  MegaMenuDropdown,
  MegaMenuItemLink,
  MegaMenuMobileShell,
  MegaMenuSubsection,
} from "@/components/MegaMenuPrimitives";

const groupIcons: Record<GuidelineSection["menuGroup"], LucideIcon> = {
  guidelines: FileText,
  policies: Shield,
  financials: Banknote,
};

function MenuPaneContent({
  group,
  onNavigate,
}: {
  group: GuidelineSection["menuGroup"];
  onNavigate?: () => void;
}) {
  const Icon = groupIcons[group];
  const title = megaMenuGroups.find((g) => g.id === group)?.title ?? group;
  const sections = sectionsForMenuGroup(group);

  return (
    <div className="animate-in fade-in slide-in-from-left-1 duration-200 ease-out fill-mode-forwards">
      <div className="mb-3 flex items-center gap-2 border-b border-primary/8 pb-2.5">
        <Icon className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
        <h3 className="font-display text-sm font-bold text-primary">{title}</h3>
      </div>

      {sections.map((section) => (
        <MegaMenuSubsection
          key={section.id}
          title={section.title}
          to="/guidelines"
          hash={section.id}
          onNavigate={onNavigate}
        >
          {section.items.map((doc) => (
            <MegaMenuItemLink
              key={doc.id}
              to="/guidelines"
              hash={`${section.id}-${doc.id}`}
              onNavigate={onNavigate}
            >
              {doc.title}
            </MegaMenuItemLink>
          ))}
        </MegaMenuSubsection>
      ))}
    </div>
  );
}

export function GuidelinesMegaMenuPanel({ open, onNavigate }: { open: boolean; onNavigate?: () => void }) {
  const [activeGroup, setActiveGroup] = useState<GuidelineSection["menuGroup"]>("guidelines");

  return (
    <MegaMenuDropdown
      open={open}
      ariaLabel="Guidelines and documents menu"
      maxWidthClass="max-w-[480px]"
    >
      <div className="mega-menu-panel flex overflow-hidden rounded-lg border border-primary/12 shadow-[0_12px_40px_-8px_oklch(0.28_0.09_150/0.35)]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron via-gold/60 to-primary z-20" />

        {/* Sidebar */}
        <div className="relative z-10 flex w-[148px] shrink-0 flex-col border-r border-primary/10 bg-primary/5 py-3">
          <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-widest text-primary/50">Browse</p>
          <ul className="flex-1 space-y-0.5 px-1.5">
            {megaMenuGroups.map((group) => {
              const Icon = groupIcons[group.id as GuidelineSection["menuGroup"]];
              const isActive = activeGroup === group.id;
              return (
                <li key={group.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveGroup(group.id as GuidelineSection["menuGroup"])}
                    onClick={() => setActiveGroup(group.id as GuidelineSection["menuGroup"])}
                    className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/75 hover:bg-primary/10 hover:text-primary"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-saffron" : "text-primary/45"}`} />
                    <span className="leading-tight">{group.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 border-t border-primary/8 px-3 pt-2.5">
            <Link
              to="/guidelines"
              onClick={onNavigate}
              className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary hover:text-saffron transition-colors"
            >
              All documents
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Content pane */}
        <div className="relative z-10 min-w-0 flex-1 bg-[oklch(0.99_0.01_95)] p-3.5">
          <MenuPaneContent group={activeGroup} onNavigate={onNavigate} />
        </div>
      </div>
    </MegaMenuDropdown>
  );
}

export function GuidelinesMobileMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <MegaMenuMobileShell>
      {megaMenuGroups.map((group) => (
        <div key={group.id}>
          <div className="mb-2 flex items-center gap-2 border-b border-primary/8 pb-2">
            <h3 className="font-display text-sm font-bold text-primary">{group.title}</h3>
          </div>
          <div className="space-y-3">
            {sectionsForMenuGroup(group.id as GuidelineSection["menuGroup"]).map((section) => (
              <MegaMenuSubsection
                key={section.id}
                title={section.title}
                to="/guidelines"
                hash={section.id}
                onNavigate={onNavigate}
              >
                {section.items.map((doc) => (
                  <MegaMenuItemLink
                    key={doc.id}
                    to="/guidelines"
                    hash={`${section.id}-${doc.id}`}
                    onNavigate={onNavigate}
                  >
                    {doc.title}
                  </MegaMenuItemLink>
                ))}
              </MegaMenuSubsection>
            ))}
          </div>
        </div>
      ))}
      <Link
        to="/guidelines"
        onClick={onNavigate}
        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-saffron"
      >
        View all documents
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </MegaMenuMobileShell>
  );
}
