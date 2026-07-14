const BAMBOO_LEAF_SVG = (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 90C50 90 20 60 20 30C20 10 50 10 50 10C50 10 80 10 80 30C80 60 50 90 50 90Z"
      fill="currentColor"
    />
  </svg>
);

const BAMBOO_CORNER_ADVANCED_SVG = (
  <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    {/* Main Stalks */}
    <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M40 280V60M40 60c12-6 22-3 26 8s-6 24-26 18M40 110c10-5 18-2 20 8s-5 18-20 14M40 165c12-5 20-1 22 8s-6 20-22 15M40 220c10-4 18-1 20 7s-5 16-20 12" />
      <path d="M80 290V90M80 90c10-5 18-2 20 8s-5 18-20 14M80 145c12-5 20-1 22 8s-6 20-22 15" opacity="0.7" />
      <path d="M120 270V120M120 120c8-4 14-1 16 6s-4 14-16 10" opacity="0.5" />
    </g>
    {/* Leaves */}
    <g fill="currentColor">
      <path d="M40 70c25-10 45 5 55 25-15 0-35-15-55-25z" opacity="0.25" />
      <path d="M40 120c30-5 50 15 60 35-20 0-40-25-60-35z" opacity="0.2" />
      <path d="M80 100c25-15 45 0 55 20-15 5-35-10-55-20z" opacity="0.15" />
      <path d="M120 130c20-10 35 5 45 20-12 5-28-10-45-20z" opacity="0.1" />
      {/* Flowery accents */}
      <circle cx="180" cy="60" r="4" opacity="0.15" />
      <circle cx="210" cy="90" r="3" opacity="0.12" />
      <circle cx="195" cy="120" r="2" opacity="0.1" />
      <path d="M240 50c15 5 25 20 20 40-10 15-30 10-40-5 5-15 15-25 20-35z" opacity="0.08" />
    </g>
    {/* Decorative curves */}
    <path d="M10 100c40-40 100-40 140 0" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />
    <path d="M50 50c60-60 150-30 180 40" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" opacity="0.1" />
  </svg>
);

const SIDE_EDGE_TILE_COUNT = 5;

/** Full-height left/right bamboo stalk ornaments spanning a tall section band */
export function BambooVerticalSideEdges() {
  return (
    <>
      <div className="qs-side-edge qs-side-edge--left" aria-hidden>
        {Array.from({ length: SIDE_EDGE_TILE_COUNT }, (_, i) => (
          <div key={`left-${i}`} className="qs-side-edge__tile">
            {BAMBOO_CORNER_ADVANCED_SVG}
          </div>
        ))}
      </div>
      <div className="qs-side-edge qs-side-edge--right" aria-hidden>
        {Array.from({ length: SIDE_EDGE_TILE_COUNT }, (_, i) => (
          <div key={`right-${i}`} className="qs-side-edge__tile">
            {BAMBOO_CORNER_ADVANCED_SVG}
          </div>
        ))}
      </div>
    </>
  );
}

const PARTICLES = [
  { type: "stalk" as const, left: "5%", size: 24, dur: 25, delay: 0, drift: "20px", rot: "15deg", opacity: 0.35 },
  { type: "leaf" as const, left: "15%", size: 16, dur: 20, delay: 4, drift: "-15px", rot: "-35deg", opacity: 0.3 },
  { type: "stalk" as const, left: "25%", size: 18, dur: 28, delay: 8, drift: "25px", rot: "10deg", opacity: 0.28 },
  { type: "leaf" as const, left: "35%", size: 20, dur: 22, delay: 2, drift: "10px", rot: "45deg", opacity: 0.32 },
  { type: "stalk" as const, left: "45%", size: 26, dur: 30, delay: 11, drift: "-20px", rot: "-8deg", opacity: 0.3 },
  { type: "leaf" as const, left: "55%", size: 14, dur: 18, delay: 6, drift: "18px", rot: "-50deg", opacity: 0.25 },
  { type: "stalk" as const, left: "65%", size: 20, dur: 24, delay: 14, drift: "-25px", rot: "18deg", opacity: 0.33 },
  { type: "leaf" as const, left: "75%", size: 18, dur: 26, delay: 9, drift: "-10px", rot: "30deg", opacity: 0.22 },
  { type: "stalk" as const, left: "85%", size: 16, dur: 21, delay: 16, drift: "12px", rot: "-15deg", opacity: 0.26 },
  { type: "leaf" as const, left: "95%", size: 22, dur: 28, delay: 3, drift: "20px", rot: "40deg", opacity: 0.28 },
  { type: "leaf" as const, left: "10%", size: 12, dur: 19, delay: 12, drift: "5px", rot: "20deg", opacity: 0.2 },
  { type: "leaf" as const, left: "90%", size: 15, dur: 23, delay: 7, drift: "-5px", rot: "-25deg", opacity: 0.24 },
];

export function QuickServicesBackdrop({ hideCorners = false }: { hideCorners?: boolean }) {
  return (
    <>
      {!hideCorners && (
        <>
          <div className="qs-corner qs-corner--tl" aria-hidden>
            {BAMBOO_CORNER_ADVANCED_SVG}
          </div>
          <div className="qs-corner qs-corner--tr" aria-hidden>
            {BAMBOO_CORNER_ADVANCED_SVG}
          </div>
          <div className="qs-corner qs-corner--bl" aria-hidden>
            {BAMBOO_CORNER_ADVANCED_SVG}
          </div>
          <div className="qs-corner qs-corner--br" aria-hidden>
            {BAMBOO_CORNER_ADVANCED_SVG}
          </div>
        </>
      )}

      {/* Subtle background pattern */}
      <div className="qs-pattern" aria-hidden />

      <div className="qs-particles" aria-hidden>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`qs-particle qs-particle--${p.type}`}
            style={{
              left: p.left,
              ["--qs-size" as string]: `${p.size}px`,
              ["--qs-dur" as string]: `${p.dur}s`,
              ["--qs-delay" as string]: `${p.delay}s`,
              ["--qs-drift" as string]: p.drift,
              ["--qs-rot" as string]: p.rot,
              ["--qs-opacity" as string]: String(p.opacity),
            }}
          />
        ))}
      </div>
    </>
  );
}
