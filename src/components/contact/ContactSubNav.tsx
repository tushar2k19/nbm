import { Link } from "@tanstack/react-router";

export type ContactTab = "head-quarter" | "state" | "structure" | "whos-who";

const tabs: { id: ContactTab; label: string; to: string }[] = [
  { id: "head-quarter", label: "HQ", to: "/contact/head-quarter" },
  { id: "state", label: "State", to: "/contact/state" },
  { id: "structure", label: "NBM Structure", to: "/contact/structure" },
  /* Who's Who hidden — officials shown on Head Quarter table instead
  { id: "whos-who", label: "Who's Who", to: "/contact/whos-who" },
  */
];

export function ContactSubNav({ active }: { active: ContactTab }) {
  return (
    <div className="contact-subnav mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Contact sections">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Link
            key={tab.id}
            to={tab.to}
            role="tab"
            aria-selected={isActive}
            className={`contact-subnav__tab rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              isActive
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
