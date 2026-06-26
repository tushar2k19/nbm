import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  navMegaMenus,
  type NavMegaMenuId,
  type NavMegaMenuItem,
} from "@/data/navMegaMenus";
import {
  MegaMenuDropdown,
  MegaMenuItemLink,
  MegaMenuMobileShell,
} from "@/components/MegaMenuPrimitives";

function MenuPaneContent({
  item,
  onNavigate,
}: {
  item: NavMegaMenuItem;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  return (
    <div className="animate-in fade-in slide-in-from-left-1 duration-200 ease-out fill-mode-forwards">
      <div className="mb-3 flex items-center gap-2 border-b border-primary/8 pb-2.5">
        <Icon className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
        <h3 className="font-display text-sm font-bold text-primary">{item.label}</h3>
      </div>

      <p className="text-[13px] leading-relaxed text-foreground/80 mb-4">{item.description}</p>

      <Link
        to={item.to}
        hash={item.hash}
        onClick={onNavigate}
        className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Open {item.label}
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export function NavDropdownMegaMenuPanel({
  menuId,
  open,
  onNavigate,
  anchor = "start",
}: {
  menuId: NavMegaMenuId;
  open: boolean;
  onNavigate?: () => void;
  anchor?: "start" | "end";
}) {
  const config = navMegaMenus[menuId];
  const [activeId, setActiveId] = useState(config.items[0]?.id ?? "");

  const activeItem = config.items.find((i) => i.id === activeId) ?? config.items[0];

  return (
    <MegaMenuDropdown
      open={open}
      ariaLabel={`${menuId} menu`}
      maxWidthClass="max-w-[440px]"
      anchor={anchor}
    >
      <div className="mega-menu-panel flex overflow-hidden rounded-lg border border-primary/12 shadow-[0_12px_40px_-8px_oklch(0.28_0.09_150/0.35)]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron via-gold/60 to-primary z-20" />

        {/* Sidebar */}
        <div className="relative z-10 flex w-[148px] shrink-0 flex-col border-r border-primary/10 bg-primary/5 py-3">
          <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-widest text-primary/50">
            Browse
          </p>
          <ul className="flex-1 space-y-0.5 px-1.5">
            {config.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(item.id)}
                    onFocus={() => setActiveId(item.id)}
                    onClick={() => setActiveId(item.id)}
                    className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/75 hover:bg-primary/10 hover:text-primary"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-saffron" : "text-primary/45"}`}
                    />
                    <span className="leading-tight">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 border-t border-primary/8 px-3 pt-2.5">
            <Link
              to={config.exploreAll.to}
              onClick={onNavigate}
              className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary hover:text-saffron transition-colors"
            >
              {config.exploreAll.label}
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Content pane */}
        <div className="relative z-10 min-w-[220px] flex-1 bg-[oklch(0.99_0.01_95)] p-3.5">
          {activeItem && <MenuPaneContent item={activeItem} onNavigate={onNavigate} />}
        </div>
      </div>
    </MegaMenuDropdown>
  );
}

export function NavDropdownMobileMenu({
  menuId,
  onNavigate,
}: {
  menuId: NavMegaMenuId;
  onNavigate?: () => void;
}) {
  const config = navMegaMenus[menuId];

  return (
    <MegaMenuMobileShell>
      <ul className="space-y-1">
        {config.items.map((item) => (
          <MegaMenuItemLink
            key={item.id}
            to={item.to}
            hash={item.hash}
            onNavigate={onNavigate}
          >
            {item.label}
          </MegaMenuItemLink>
        ))}
      </ul>
      <Link
        to={config.exploreAll.to}
        onClick={onNavigate}
        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-saffron"
      >
        {config.exploreAll.label}
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </MegaMenuMobileShell>
  );
}
