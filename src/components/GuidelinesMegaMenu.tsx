import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Shield, Banknote, CircleHelp, ChevronRight, Scale, Mail } from "lucide-react";
import { nbmLetters } from "@/data/nbmLetters";
import type { LucideIcon } from "lucide-react";
import {
  megaMenuGroups,
  sectionsForMenuGroup,
  type GuidelinesMenuGroup,
} from "@/data/guidelinesDocuments";
import { faqByCategory, faqCategories } from "@/data/guidelinesFaq";
import { enablingProvisions } from "@/data/enablingProvisions";
import {
  MegaMenuDropdown,
  MegaMenuItemLink,
  MegaMenuMobileShell,
  MegaMenuSubsection,
} from "@/components/MegaMenuPrimitives";

const groupIcons: Record<GuidelinesMenuGroup, LucideIcon> = {
  guidelines: FileText,
  policies: Shield,
  financials: Banknote,
  letters: Mail,
  provisions: Scale,
  faq: CircleHelp,
};

function groupRoute(groupId: GuidelinesMenuGroup): { to: string; hash?: string } {
  if (groupId === "faq") return { to: "/guidelines", hash: "faq" };
  if (groupId === "provisions") return { to: "/guidelines", hash: "enabling-provisions" };
  if (groupId === "letters") return { to: "/guidelines", hash: "letters" };
  const firstSection = sectionsForMenuGroup(groupId)[0];
  return { to: "/guidelines", hash: firstSection?.id };
}

function LettersMenuPane({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-left-1 duration-200 ease-out fill-mode-forwards">
      <div className="mb-3 flex items-center gap-2 border-b border-primary/8 pb-2.5">
        <Mail className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
        <h3 className="font-display text-sm font-bold text-primary">Letters</h3>
      </div>

      <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
        Official DO letters, circulars and policy communications from the National Bamboo Mission.
      </p>

      <ul>
        {nbmLetters.map((letter) => (
          <MegaMenuItemLink
            key={letter.id}
            to="/guidelines"
            hash={`letters-${letter.id}`}
            onNavigate={onNavigate}
          >
            {letter.title.length > 72 ? `${letter.title.slice(0, 72)}…` : letter.title}
          </MegaMenuItemLink>
        ))}
      </ul>

      <Link
        to="/guidelines"
        hash="letters"
        onClick={onNavigate}
        className="mt-2 inline-flex items-center gap-0.5 text-xs font-semibold text-primary hover:text-saffron transition-colors"
      >
        View all letters
        <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

function DocumentsMenuPane({
  group,
  onNavigate,
}: {
  group: Exclude<GuidelinesMenuGroup, "faq" | "provisions" | "letters">;
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

function ProvisionsMenuPane({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-left-1 duration-200 ease-out fill-mode-forwards">
      <div className="mb-3 flex items-center gap-2 border-b border-primary/8 pb-2.5">
        <Scale className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
        <h3 className="font-display text-sm font-bold text-primary">Enabling Provisions</h3>
      </div>

      <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
        Regulatory measures supporting bamboo production, transit, processing and marketing.
      </p>

      <ul>
        {enablingProvisions.slice(0, 6).map((item) => (
          <MegaMenuItemLink
            key={item.id}
            to="/guidelines/enabling-provisions"
            hash={item.id}
            onNavigate={onNavigate}
          >
            {item.description.length > 72
              ? `${item.description.slice(0, 72)}…`
              : item.description}
          </MegaMenuItemLink>
        ))}
      </ul>

      <Link
        to="/guidelines/enabling-provisions"
        onClick={onNavigate}
        className="mt-2 inline-flex items-center gap-0.5 text-xs font-semibold text-primary hover:text-saffron transition-colors"
      >
        View all provisions
        <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

function FaqMenuPane({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-left-1 duration-200 ease-out fill-mode-forwards">
      <div className="mb-3 flex items-center gap-2 border-b border-primary/8 pb-2.5">
        <CircleHelp className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
        <h3 className="font-display text-sm font-bold text-primary">Frequently Asked Questions</h3>
      </div>

      <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
        Quick answers about NBM, this portal, schemes and support.
      </p>

      <div className="max-h-[220px] space-y-3 overflow-y-auto pr-1">
        {faqCategories.map((cat) => (
          <div key={cat.id}>
            <Link
              to="/guidelines"
              hash="faq"
              onClick={onNavigate}
              className="mb-1.5 block text-[11px] font-semibold text-bark/60 hover:text-primary transition-colors"
            >
              {cat.label}
            </Link>
            <ul className="space-y-0">
              {faqByCategory(cat.id).map((item) => (
                <MegaMenuItemLink
                  key={item.id}
                  to="/guidelines"
                  hash={`faq-${item.id}`}
                  onNavigate={onNavigate}
                >
                  {item.question}
                </MegaMenuItemLink>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link
        to="/guidelines"
        hash="faq"
        onClick={onNavigate}
        className="mt-3 inline-flex items-center gap-0.5 text-xs font-semibold text-primary hover:text-saffron transition-colors"
      >
        View full FAQ section
        <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}

function MenuPaneContent({
  group,
  onNavigate,
}: {
  group: GuidelinesMenuGroup;
  onNavigate?: () => void;
}) {
  if (group === "faq") {
    return <FaqMenuPane onNavigate={onNavigate} />;
  }
  if (group === "provisions") {
    return <ProvisionsMenuPane onNavigate={onNavigate} />;
  }
  if (group === "letters") {
    return <LettersMenuPane onNavigate={onNavigate} />;
  }
  return <DocumentsMenuPane group={group} onNavigate={onNavigate} />;
}

export function GuidelinesMegaMenuPanel({ open, onNavigate }: { open: boolean; onNavigate?: () => void }) {
  const [activeGroup, setActiveGroup] = useState<GuidelinesMenuGroup>("guidelines");

  return (
    <MegaMenuDropdown
      open={open}
      ariaLabel="Guidelines and documents menu"
      maxWidthClass="max-w-[500px]"
    >
      <div className="mega-menu-panel flex overflow-hidden rounded-lg border border-primary/12 shadow-[0_12px_40px_-8px_oklch(0.28_0.09_150/0.35)]">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron via-gold/60 to-primary z-20" />

        {/* Sidebar */}
        <div className="relative z-10 flex w-[148px] shrink-0 flex-col border-r border-primary/10 bg-primary/5 py-3">
          <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-widest text-primary/50">Browse</p>
          <ul className="flex-1 space-y-0.5 px-1.5">
            {megaMenuGroups.map((group) => {
              const Icon = groupIcons[group.id];
              const isActive = activeGroup === group.id;
              const route = groupRoute(group.id);
              return (
                <li key={group.id}>
                  <Link
                    to={route.to}
                    hash={route.hash}
                    onClick={onNavigate}
                    onMouseEnter={() => setActiveGroup(group.id)}
                    className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/75 hover:bg-primary/10 hover:text-primary"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-saffron" : "text-primary/45"}`} />
                    <span className="leading-tight">{group.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 border-t border-primary/8 px-3 pt-2.5 space-y-1.5">
            <Link
              to="/guidelines/enabling-provisions"
              onClick={onNavigate}
              className="flex items-center gap-0.5 text-[10px] font-semibold text-primary hover:text-saffron transition-colors"
            >
              Enabling Provisions
              <ChevronRight className="h-3 w-3" />
            </Link>
            <Link
              to="/guidelines"
              onClick={onNavigate}
              className="flex items-center gap-0.5 text-[10px] font-semibold text-primary hover:text-saffron transition-colors"
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
      {megaMenuGroups.map((group) => {
        const route = groupRoute(group.id);

        if (group.id === "faq") {
          return (
            <div key={group.id}>
              <Link
                to={route.to}
                hash={route.hash}
                onClick={onNavigate}
                className="mb-2 flex items-center gap-2 border-b border-primary/8 pb-2 hover:text-saffron transition-colors"
              >
                <CircleHelp className="h-4 w-4 text-saffron" aria-hidden />
                <h3 className="font-display text-sm font-bold text-primary">{group.title}</h3>
              </Link>
              <div className="space-y-3">
                {faqCategories.map((cat) => (
                  <div key={cat.id}>
                    <Link
                      to="/guidelines"
                      hash="faq"
                      onClick={onNavigate}
                      className="mb-1.5 block text-[11px] font-semibold text-bark/60 hover:text-primary"
                    >
                      {cat.label}
                    </Link>
                    <ul className="space-y-0">
                      {faqByCategory(cat.id).map((item) => (
                        <MegaMenuItemLink
                          key={item.id}
                          to="/guidelines"
                          hash={`faq-${item.id}`}
                          onNavigate={onNavigate}
                        >
                          {item.question}
                        </MegaMenuItemLink>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (group.id === "provisions") {
          return (
            <div key={group.id}>
              <Link
                to="/guidelines/enabling-provisions"
                onClick={onNavigate}
                className="mb-2 flex items-center gap-2 border-b border-primary/8 pb-2 hover:text-saffron transition-colors"
              >
                <Scale className="h-4 w-4 text-saffron" aria-hidden />
                <h3 className="font-display text-sm font-bold text-primary">{group.title}</h3>
              </Link>
              <ul>
                {enablingProvisions.slice(0, 5).map((item) => (
                  <MegaMenuItemLink
                    key={item.id}
                    to="/guidelines/enabling-provisions"
                    hash={item.id}
                    onNavigate={onNavigate}
                  >
                    {item.description.length > 64
                      ? `${item.description.slice(0, 64)}…`
                      : item.description}
                  </MegaMenuItemLink>
                ))}
              </ul>
              <Link
                to="/guidelines/enabling-provisions"
                onClick={onNavigate}
                className="mb-4 inline-flex items-center gap-0.5 text-xs font-medium text-primary/70 hover:text-saffron"
              >
                View all provisions
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          );
        }

        if (group.id === "letters") {
          return (
            <div key={group.id}>
              <Link
                to="/guidelines"
                hash="letters"
                onClick={onNavigate}
                className="mb-2 flex items-center gap-2 border-b border-primary/8 pb-2 hover:text-saffron transition-colors"
              >
                <Mail className="h-4 w-4 text-saffron" aria-hidden />
                <h3 className="font-display text-sm font-bold text-primary">{group.title}</h3>
              </Link>
              <ul>
                {nbmLetters.map((letter) => (
                  <MegaMenuItemLink
                    key={letter.id}
                    to="/guidelines"
                    hash={`letters-${letter.id}`}
                    onNavigate={onNavigate}
                  >
                    {letter.title.length > 64
                      ? `${letter.title.slice(0, 64)}…`
                      : letter.title}
                  </MegaMenuItemLink>
                ))}
              </ul>
              <Link
                to="/guidelines"
                hash="letters"
                onClick={onNavigate}
                className="mb-4 inline-flex items-center gap-0.5 text-xs font-medium text-primary/70 hover:text-saffron"
              >
                View all letters
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          );
        }

        return (
          <div key={group.id}>
            <Link
              to={route.to}
              hash={route.hash}
              onClick={onNavigate}
              className="mb-2 flex items-center gap-2 border-b border-primary/8 pb-2 hover:text-saffron transition-colors"
            >
              <h3 className="font-display text-sm font-bold text-primary">{group.title}</h3>
            </Link>
            <div className="space-y-3">
              {sectionsForMenuGroup(group.id).map((section) => (
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
        );
      })}
      <Link
        to="/guidelines/enabling-provisions"
        onClick={onNavigate}
        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-saffron"
      >
        Enabling Provisions
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
      <Link
        to="/guidelines"
        hash="faq"
        onClick={onNavigate}
        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-saffron"
      >
        View full FAQ section
        <ChevronRight className="h-3.5 w-3.5" />
      </Link>
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
