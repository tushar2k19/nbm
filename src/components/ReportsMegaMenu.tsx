import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, Sprout, Leaf, Factory, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { allReportSections, type ReportSection } from "@/data/reportsDocuments";
import { annualActionPlanMenuPreviewCount } from "@/data/annualActionPlan";
import {
  MegaMenuDropdown,
  MegaMenuItemLink,
  MegaMenuMobileShell,
} from "@/components/MegaMenuPrimitives";

const sectionIcons: Record<string, LucideIcon> = {
  "annual-action-plan": BarChart3,
  "bamboo-plantation": Sprout,
  "agarbatti-stick": Leaf,
  "accredited-nurseries": Factory,
};

type SectionId = ReportSection["id"];

function sectionRoute(sectionId: SectionId): { to: string; hash: string } {
  return { to: "/reports", hash: sectionId };
}

function MenuPaneContent({
  sectionId,
  onNavigate,
}: {
  sectionId: SectionId;
  onNavigate?: () => void;
}) {
  const section = allReportSections.find((s) => s.id === sectionId);
  if (!section) return null;

  const Icon = sectionIcons[sectionId] ?? BarChart3;
  const menuItems =
    sectionId === "annual-action-plan"
      ? section.items.slice(0, annualActionPlanMenuPreviewCount)
      : section.items;
  const hasMoreAap =
    sectionId === "annual-action-plan" &&
    section.items.length > annualActionPlanMenuPreviewCount;

  return (
    <div className="animate-in fade-in slide-in-from-left-1 duration-200 ease-out fill-mode-forwards">
      <div className="mb-3 flex items-center gap-2 border-b border-primary/8 pb-2.5">
        <Icon className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
        <h3 className="font-display text-sm font-bold text-primary">{section.title}</h3>
      </div>

      <ul>
        {menuItems.map((item) => (
          <MegaMenuItemLink
            key={item.id}
            to="/reports"
            hash={`${section.id}-${item.id}`}
            onNavigate={onNavigate}
          >
            {item.title}
          </MegaMenuItemLink>
        ))}
      </ul>

      {hasMoreAap && (
        <Link
          to="/reports"
          hash="annual-action-plan"
          onClick={onNavigate}
          className="mt-2 inline-flex items-center gap-0.5 text-xs font-semibold text-primary hover:text-saffron transition-colors"
        >
          View all action plans
          <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

export function ReportsMegaMenuPanel({ open, onNavigate }: { open: boolean; onNavigate?: () => void }) {
  const [activeSection, setActiveSection] = useState<SectionId>("annual-action-plan");

  return (
    <MegaMenuDropdown
      open={open}
      ariaLabel="Reports menu"
      maxWidthClass="max-w-[480px]"
      anchor="end"
    >
      <div className="mega-menu-panel flex overflow-hidden rounded-lg border border-primary/12 shadow-[0_12px_40px_-8px_oklch(0.28_0.09_150/0.35)]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron via-gold/60 to-primary z-20" />

        {/* Sidebar */}
        <div className="relative z-10 flex w-[158px] shrink-0 flex-col border-r border-primary/10 bg-primary/5 py-3">
          <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-widest text-primary/50">Browse</p>
          <ul className="flex-1 space-y-0.5 px-1.5">
            {allReportSections.map((section) => {
              const Icon = sectionIcons[section.id] ?? BarChart3;
              const isActive = activeSection === section.id;
              const route = sectionRoute(section.id);
              return (
                <li key={section.id}>
                  <Link
                    to={route.to}
                    hash={route.hash}
                    onClick={onNavigate}
                    onMouseEnter={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/75 hover:bg-primary/10 hover:text-primary"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-saffron" : "text-primary/45"}`} />
                    <span className="leading-tight">{section.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 border-t border-primary/8 px-3 pt-2.5">
            <Link
              to="/reports"
              onClick={onNavigate}
              className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary hover:text-saffron transition-colors"
            >
              All reports
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

export function ReportsMobileMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <MegaMenuMobileShell>
      {allReportSections.map((section) => {
        const route = sectionRoute(section.id);
        const menuItems =
          section.id === "annual-action-plan"
            ? section.items.slice(0, annualActionPlanMenuPreviewCount)
            : section.items;
        const hasMoreAap =
          section.id === "annual-action-plan" &&
          section.items.length > annualActionPlanMenuPreviewCount;
        return (
        <div key={section.id}>
          <Link
            to={route.to}
            hash={route.hash}
            onClick={onNavigate}
            className="mb-2 flex items-center gap-2 border-b border-primary/8 pb-2 hover:text-saffron transition-colors"
          >
            <h3 className="font-display text-sm font-bold text-primary">{section.title}</h3>
          </Link>
          <ul>
            {menuItems.map((item) => (
              <MegaMenuItemLink
                key={item.id}
                to="/reports"
                hash={`${section.id}-${item.id}`}
                onNavigate={onNavigate}
              >
                {item.title}
              </MegaMenuItemLink>
            ))}
          </ul>
          {hasMoreAap && (
            <Link
              to="/reports"
              hash="annual-action-plan"
              onClick={onNavigate}
              className="mb-4 inline-flex items-center gap-0.5 text-xs font-medium text-primary/70 hover:text-saffron"
            >
              View all action plans
              <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>
        );
      })}
      <Link
        to="/reports"
        onClick={onNavigate}
        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-saffron"
      >
        View all reports
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </MegaMenuMobileShell>
  );
}
