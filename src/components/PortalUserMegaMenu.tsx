import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, LayoutDashboard, LogOut, UserCircle } from "lucide-react";
import { MegaMenuDropdown, MegaMenuMobileShell } from "@/components/MegaMenuPrimitives";
import { useAuth } from "@/lib/auth";
import { getRoleLabel } from "@/lib/roles";

export function PortalUserMegaMenuPanel({
  open,
  portalPath,
  onNavigate,
  anchor = "end",
}: {
  open: boolean;
  portalPath: string;
  onNavigate?: () => void;
  anchor?: "start" | "end";
}) {
  const { user, profile, role, stateName, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    onNavigate?.();
    await signOut();
    void navigate({ to: "/" });
  }

  return (
    <MegaMenuDropdown
      open={open}
      ariaLabel="My Portal menu"
      maxWidthClass="max-w-[440px]"
      anchor={anchor}
    >
      <div className="mega-menu-panel flex overflow-hidden rounded-lg border border-primary/12 shadow-[0_12px_40px_-8px_oklch(0.28_0.09_150/0.35)]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron via-gold/60 to-primary z-20" />

        <div className="relative z-10 flex w-[148px] shrink-0 flex-col border-r border-primary/10 bg-primary/5 py-3">
          <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-widest text-primary/50">
            Account
          </p>
          <ul className="flex-1 space-y-0.5 px-1.5">
            <li>
              <Link
                to={portalPath}
                onClick={onNavigate}
                className="flex w-full items-center gap-2 rounded-md bg-primary px-2.5 py-2 text-left text-xs font-semibold text-primary-foreground transition-colors"
                aria-current="page"
              >
                <LayoutDashboard className="h-3.5 w-3.5 shrink-0 text-saffron" aria-hidden />
                <span className="leading-tight">My Portal</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative z-10 min-w-[220px] flex-1 bg-[oklch(0.99_0.01_95)] p-3.5">
          <div className="mb-3 flex items-center gap-2 border-b border-primary/8 pb-2.5">
            <UserCircle className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
            <h3 className="font-display text-sm font-bold text-primary">Signed in</h3>
          </div>

          <div className="mb-4 space-y-0.5 text-[13px] leading-relaxed text-foreground/80">
            <p className="font-semibold text-foreground">{profile?.full_name}</p>
            <p className="text-foreground/70">{getRoleLabel(role)}</p>
            {stateName && <p className="text-foreground/70">{stateName}</p>}
            {user?.email && <p className="truncate text-foreground/60">{user.email}</p>}
          </div>

          <Link
            to={portalPath}
            onClick={onNavigate}
            className="mb-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Open My Portal
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          </Link>

          <button
            type="button"
            onClick={() => void handleLogout()}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            Logout
          </button>
        </div>
      </div>
    </MegaMenuDropdown>
  );
}

export function PortalUserMobileMenu({
  portalPath,
  onNavigate,
}: {
  portalPath: string;
  onNavigate?: () => void;
}) {
  const { user, profile, role, stateName, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    onNavigate?.();
    await signOut();
    void navigate({ to: "/" });
  }

  return (
    <MegaMenuMobileShell>
      <div className="mb-3 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm">
        <p className="font-semibold text-foreground">{profile?.full_name}</p>
        <p className="text-xs text-muted-foreground">{getRoleLabel(role)}</p>
        {stateName && <p className="text-xs text-muted-foreground">{stateName}</p>}
        {user?.email && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
      </div>
      <ul className="space-y-1">
        <li>
          <Link
            to={portalPath}
            onClick={onNavigate}
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden />
            My Portal
          </Link>
        </li>
      </ul>
      <button
        type="button"
        onClick={() => void handleLogout()}
        className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
      >
        <LogOut className="h-3.5 w-3.5" aria-hidden />
        Logout
      </button>
    </MegaMenuMobileShell>
  );
}
