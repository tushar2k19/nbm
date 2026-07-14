import { useState, type CSSProperties } from "react";
import { Leaf } from "lucide-react";
import bambooForestBg from "@/assets/front_page.png";
import { whosWhoLeadership, whosWhoPhotoCredit, type WhosWhoOfficial } from "@/data/whosWho";
import { WhosWhoProfileModal } from "./WhosWhoProfileModal";

function PyramidConnector() {
  return (
    <div className="whos-who-pyramid__connector" aria-hidden>
      <svg
        className="whos-who-pyramid__connector-svg"
        viewBox="0 0 400 100"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="whosWhoLineGrad" x1="0" y1="0" x2="400" y2="0">
            <stop offset="0%" stopColor="oklch(0.82 0.14 78 / 0.35)" />
            <stop offset="50%" stopColor="oklch(1 0 0 / 0.65)" />
            <stop offset="100%" stopColor="oklch(0.82 0.14 78 / 0.35)" />
          </linearGradient>
        </defs>
        {/* centre trunk */}
        <path
          d="M200 0 V30"
          stroke="oklch(1 0 0 / 0.5)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        {/* horizontal bar */}
        <path
          d="M100 30 H300"
          stroke="url(#whosWhoLineGrad)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        {/* left branch — 25% */}
        <path
          d="M100 30 V100"
          stroke="oklch(1 0 0 / 0.5)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        {/* right branch — 75% */}
        <path
          d="M300 30 V100"
          stroke="oklch(1 0 0 / 0.5)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        {/* junction dots */}
        <circle cx="200" cy="30" r="4" fill="oklch(0.82 0.14 78)" />
        <circle cx="100" cy="100" r="3" fill="oklch(0.82 0.14 78)" />
        <circle cx="300" cy="100" r="3" fill="oklch(0.82 0.14 78)" />
      </svg>
    </div>
  );
}

function portraitStyle(official: WhosWhoOfficial): CSSProperties | undefined {
  const style: CSSProperties = {};
  if (official.photoFit) style.objectFit = official.photoFit;
  if (official.photoPosition) style.objectPosition = official.photoPosition;
  return Object.keys(style).length ? style : undefined;
}

function LeadershipCard({
  official,
  size = "mos",
  onSelect,
}: {
  official: WhosWhoOfficial;
  size?: "minister" | "mos";
  onSelect: (o: WhosWhoOfficial) => void;
}) {
  const isMinister = size === "minister";
  const initials = official.name
    .replace(/^(Shri|Smt|Dr\.?|Sh)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <button
      type="button"
      onClick={() => onSelect(official)}
      className={`whos-who-leader-card whos-who-leader-card--${size} group`}
    >
      <div className="whos-who-leader-card__portrait-slot">
        <div className="whos-who-leader-card__frame">
          {official.photo ? (
            <img
              src={official.photo}
              alt=""
              className="whos-who-leader-card__photo"
              style={portraitStyle(official)}
              loading="lazy"
            />
          ) : (
            <div className="whos-who-leader-card__avatar" aria-hidden>
              {initials}
            </div>
          )}
        </div>
      </div>
      <div className="whos-who-leader-card__body">
        {official.roleLabel && (
          <p className="whos-who-leader-card__role">{official.roleLabel.toUpperCase()}</p>
        )}
        <h3
          className={`whos-who-leader-card__name font-display ${isMinister ? "text-lg" : "text-base"}`}
        >
          {official.name}
        </h3>
        {!isMinister && (
          <p className="whos-who-leader-card__hint">Tap for contact details</p>
        )}
      </div>
    </button>
  );
}

export function WhosWhoLeadership() {
  const [active, setActive] = useState<WhosWhoOfficial | null>(null);
  const minister = whosWhoLeadership.find((t) => t.id === "minister")?.officials[0];
  const mosList = whosWhoLeadership.find((t) => t.id === "mos")?.officials ?? [];

  /* Hidden while whosWhoLeadership is empty — restore data in whosWho.ts to re-enable */
  if (!minister) return null;

  return (
    <section className="whos-who-leadership" aria-label="Ministry leadership">
      <div className="h-1 bg-tri-banner relative z-[2]" aria-hidden />
      <div
        className="whos-who-leadership__photo"
        style={{ backgroundImage: `url(${bambooForestBg})` }}
        aria-hidden
      />
      <div className="whos-who-leadership__overlay" aria-hidden />
      <div className="whos-who-leadership__glow whos-who-leadership__glow--left" aria-hidden />
      <div className="whos-who-leadership__glow whos-who-leadership__glow--right" aria-hidden />
      <div className="whos-who-leadership__leaf whos-who-leadership__leaf--tl" aria-hidden>
        <Leaf className="h-8 w-8" />
      </div>
      <div className="whos-who-leadership__leaf whos-who-leadership__leaf--br" aria-hidden>
        <Leaf className="h-10 w-10" />
      </div>

      <div className="relative z-[1]">
        <div className="whos-who-leadership__header">
          <p className="whos-who-leadership__eyebrow">
            <Leaf className="h-3.5 w-3.5" aria-hidden />
            Ministry Leadership
          </p>
          <h2 className="whos-who-leadership__title font-display text-2xl font-bold sm:text-3xl">
            Our Team
          </h2>
          <p className="whos-who-leadership__subtitle">
            Hon&apos;ble Minister and Ministers of State overseeing the Department of Agriculture
            and Farmers Welfare — parent ministry of the National Bamboo Mission.
          </p>
        </div>

        <div className="whos-who-pyramid">
          <div className="whos-who-pyramid__tier whos-who-pyramid__tier--minister">
            <LeadershipCard official={minister} size="minister" onSelect={setActive} />
          </div>

          <PyramidConnector />

          <div className="whos-who-pyramid__tier whos-who-pyramid__tier--mos">
            {mosList.map((official) => (
              <LeadershipCard
                key={official.id}
                official={official}
                size="mos"
                onSelect={setActive}
              />
            ))}
          </div>
        </div>

        <p className="whos-who-leadership__credit">{whosWhoPhotoCredit}</p>
      </div>

      {active && <WhosWhoProfileModal official={active} onClose={() => setActive(null)} />}
    </section>
  );
}
