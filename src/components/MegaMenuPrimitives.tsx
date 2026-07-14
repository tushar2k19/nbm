import { Link } from "@tanstack/react-router";
import { createContext, useContext, type CSSProperties, type ReactNode, type RefObject } from "react";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** When false, dropdown is positioned by MegaMenuFloatingLayer (fixed) instead of absolute on the trigger. */
export const MegaMenuAttachContext = createContext(true);

type MegaMenuDropdownProps = {
  open: boolean;
  ariaLabel: string;
  maxWidthClass?: string;
  /** Align popup relative to the nav item trigger */
  anchor?: "start" | "end";
  children: ReactNode;
};

export function MegaMenuDropdown({
  open,
  ariaLabel,
  maxWidthClass = "max-w-5xl",
  anchor = "start",
  children,
}: MegaMenuDropdownProps) {
  const attachToTrigger = useContext(MegaMenuAttachContext);
  const anchorClass = anchor === "end" ? "right-0 left-auto" : "left-0";
  const visibilityClass = open
    ? "opacity-100 visible translate-y-0 pointer-events-auto"
    : "opacity-0 invisible -translate-y-1 pointer-events-none";

  if (!attachToTrigger) {
    return (
      <div
        className={`w-max transition-all duration-200 ease-out ${visibilityClass}`}
        role="region"
        aria-label={ariaLabel}
        aria-hidden={!open}
      >
        <div className={maxWidthClass}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`hidden lg:block absolute ${anchorClass} top-full w-max z-50 transition-all duration-200 ease-out ${visibilityClass}`}
      role="region"
      aria-label={ariaLabel}
      aria-hidden={!open}
    >
      {/* Invisible bridge so moving from nav item to panel doesn't close the menu */}
      <div className="h-2" aria-hidden />
      <div className={maxWidthClass}>{children}</div>
    </div>
  );
}

type MegaMenuFloatingLayerProps = {
  open: boolean;
  anchorRect: DOMRect | null;
  anchor: "start" | "end";
  panelRef: RefObject<HTMLDivElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: ReactNode;
};

export function MegaMenuFloatingLayer({
  open,
  anchorRect,
  anchor,
  panelRef,
  onMouseEnter,
  onMouseLeave,
  children,
}: MegaMenuFloatingLayerProps) {
  if (!anchorRect) return null;

  const style: CSSProperties =
    anchor === "end"
      ? {
          top: anchorRect.bottom,
          right: Math.max(8, window.innerWidth - anchorRect.right),
        }
      : {
          top: anchorRect.bottom,
          left: Math.max(8, anchorRect.left),
        };

  return (
    <div
      ref={panelRef}
      className={`mega-menu-floating-layer hidden lg:block fixed z-[120] w-max transition-all duration-200 ease-out ${
        open
          ? "opacity-100 visible translate-y-0 pointer-events-auto"
          : "opacity-0 invisible -translate-y-1 pointer-events-none"
      }`}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Bridge gap between nav trigger and panel */}
      <div className="h-2.5" aria-hidden />
      <MegaMenuAttachContext.Provider value={false}>{children}</MegaMenuAttachContext.Provider>
    </div>
  );
}

export function MegaMenuContainer({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="mega-menu-panel overflow-hidden rounded-xl border border-primary/12 shadow-[0_16px_48px_-12px_oklch(0.28_0.09_150/0.35)]">
      <div className="mega-menu-accent shrink-0" />
      <div className="p-4 lg:p-5">{children}</div>
      {footer}
    </div>
  );
}

export function MegaMenuColumnGrid({
  columns,
  children,
}: {
  columns: 2 | 3 | 4;
  children: ReactNode;
}) {
  const colClass =
    columns === 4 ? "lg:grid-cols-4" : columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <div className={`grid gap-6 ${colClass} lg:gap-0 lg:divide-x lg:divide-primary/8`}>{children}</div>
  );
}

const accentStyles = {
  saffron: "text-saffron",
  leaf: "text-leaf",
  gold: "text-gold",
};

export function MegaMenuColumn({
  icon: Icon,
  title,
  accent = "leaf",
  children,
  viewAll,
  onNavigate,
}: {
  icon: LucideIcon;
  title: string;
  accent?: "saffron" | "leaf" | "gold";
  children: ReactNode;
  viewAll?: { to: string; hash?: string; label: string };
  onNavigate?: () => void;
}) {
  return (
    <div className="min-w-0 lg:px-4 first:lg:pl-0 last:lg:pr-0">
      <div className="mb-3 flex items-center gap-2 border-b border-primary/8 pb-2">
        <Icon className={`h-4 w-4 shrink-0 ${accentStyles[accent]}`} aria-hidden />
        <h3 className="font-display text-sm font-bold text-primary">{title}</h3>
      </div>
      <div>{children}</div>
      {viewAll && (
        <Link
          to={viewAll.to}
          hash={viewAll.hash}
          onClick={onNavigate}
          className="mt-2 inline-flex items-center gap-0.5 text-xs font-medium text-primary/70 hover:text-saffron transition-colors"
        >
          {viewAll.label}
          <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

export function MegaMenuSubsection({
  title,
  to,
  hash,
  onNavigate,
  children,
}: {
  title: string;
  to: string;
  hash?: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <Link
        to={to}
        hash={hash}
        onClick={onNavigate}
        className="mb-1.5 block text-[11px] font-semibold text-bark/60 hover:text-primary transition-colors"
      >
        {title}
      </Link>
      <ul className="space-y-0">{children}</ul>
    </div>
  );
}

export function MegaMenuItemLink({
  to,
  hash,
  params,
  onNavigate,
  children,
}: {
  to: string;
  hash?: string;
  params?: Record<string, string>;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        to={to}
        hash={hash}
        params={params}
        onClick={onNavigate}
        className="mega-menu-item block rounded-md py-1.5 pr-2 text-[13px] leading-snug text-foreground/85 hover:text-primary transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

export function MegaMenuFooter({
  to,
  label,
  onNavigate,
}: {
  to: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="mega-menu-footer flex justify-end border-t border-primary/8 px-4 py-2.5 lg:px-5">
      <Link
        to={to}
        onClick={onNavigate}
        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-saffron transition-colors"
      >
        {label}
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export function MegaMenuMobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="mega-menu-panel lg:hidden border-t border-primary/10 px-4 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
      {children}
    </div>
  );
}
