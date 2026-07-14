import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   BambooPageLoader
   ─ Shows a bamboo-themed overlay whenever TanStack Router is transitioning.
   ─ Triggers on any navigation (Link clicks, button-driven navigate(), etc.)
   ─────────────────────────────────────────────────────────────────────────── */

const BAMBOO_GREEN   = "oklch(0.38 0.13 148)";
const BAMBOO_LIGHT   = "oklch(0.60 0.16 148)";
const BAMBOO_PALE    = "oklch(0.82 0.12 148)";
const BAMBOO_YELLOW  = "oklch(0.88 0.14 110)";

/* SVG bamboo stalk + leaves — purely decorative */
function BambooSvg({ index }: { index: number }) {
  const heights  = [120, 160, 100, 140, 180];
  const h        = heights[index % heights.length];
  const segments = Math.ceil(h / 28);
  const leafSide = index % 2 === 0 ? 1 : -1;

  return (
    <svg
      width="22"
      height={h + 20}
      viewBox={`0 0 22 ${h + 20}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ overflow: "visible" }}
    >
      {/* stalk */}
      {Array.from({ length: segments }).map((_, i) => {
        const y1 = i * 28;
        const y2 = Math.min(y1 + 24, h);
        return (
          <g key={i}>
            <rect
              x={7}
              y={y1}
              width={8}
              height={y2 - y1}
              rx={2}
              fill={i % 2 === 0 ? BAMBOO_GREEN : BAMBOO_LIGHT}
            />
            {/* node ring */}
            {i > 0 && (
              <rect x={5} y={y1} width={12} height={3} rx={1.5} fill={BAMBOO_YELLOW} opacity={0.75} />
            )}
          </g>
        );
      })}
      {/* leaves at every other node */}
      {Array.from({ length: Math.floor(segments / 2) }).map((_, i) => {
        const ly = (i * 2 + 1) * 28 - 4;
        const lx = leafSide > 0 ? 14 : 2;
        const rotate = leafSide > 0 ? -30 : 210;
        return (
          <ellipse
            key={`leaf-${i}`}
            cx={lx}
            cy={ly}
            rx={10}
            ry={4}
            fill={BAMBOO_PALE}
            opacity={0.85}
            transform={`rotate(${rotate + (i % 3) * 10}, ${lx}, ${ly})`}
          />
        );
      })}
    </svg>
  );
}

/* Animated falling leaf */
function FallingLeaf({ delay, x }: { delay: number; x: number }) {
  return (
    <div
      aria-hidden
      className="bamboo-leaf-fall"
      style={{
        position: "absolute",
        top: 0,
        left: `${x}%`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="8" cy="5" rx="7" ry="4" fill={BAMBOO_PALE} opacity="0.9" />
        <line x1="8" y1="1" x2="8" y2="9" stroke={BAMBOO_GREEN} strokeWidth="0.8" opacity="0.7" />
      </svg>
    </div>
  );
}

const STALK_COUNT   = 7;
const LEAF_COUNT    = 8;

const LEAF_CONFIG = Array.from({ length: LEAF_COUNT }, (_, i) => ({
  delay: (i * 0.65) % 3.5,
  x: 5 + (i * 13) % 90,
}));

export default function BambooPageLoader() {
  const isLoading = useRouterState({ select: (s) => s.isLoading });

  /* keep the overlay visible for a minimum flash so it doesn't flicker */
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading) {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      setVisible(true);
    } else {
      hideTimer.current = setTimeout(() => setVisible(false), 350);
    }
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isLoading]);

  if (!visible) return null;

  return (
    <>
      {/* ── Keyframes + component-local styles injected once ── */}
      <style>{`
        @keyframes bamboo-sway {
          0%   { transform: rotate(-4deg) translateX(0); }
          50%  { transform: rotate(4deg)  translateX(1px); }
          100% { transform: rotate(-4deg) translateX(0); }
        }
        @keyframes bamboo-leaf-fall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(140px) rotate(360deg); opacity: 0; }
        }
        @keyframes bamboo-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes bamboo-fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes bamboo-progress {
          0%   { width: 0%;   opacity: 1; }
          60%  { width: 75%;  opacity: 1; }
          95%  { width: 92%;  opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes bamboo-bounce-dot {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1;   }
        }
        .bamboo-sway {
          transform-origin: bottom center;
          animation: bamboo-sway 2.4s ease-in-out infinite;
        }
        .bamboo-leaf-fall {
          animation: bamboo-leaf-fall 2.8s linear infinite;
          will-change: transform, opacity;
        }
        .bamboo-loader-overlay {
          animation: bamboo-fade-in 0.18s ease forwards;
        }
      `}</style>

      {/* ── Top progress bar ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          zIndex: 99999,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${BAMBOO_GREEN}, ${BAMBOO_LIGHT}, ${BAMBOO_YELLOW})`,
            animation: "bamboo-progress 2.5s ease-out forwards",
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>

      {/* ── Full-screen overlay ── */}
      <div
        role="status"
        aria-live="polite"
        aria-label="Page loading, please wait"
        className="bamboo-loader-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99998,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "oklch(0.15 0.06 148 / 0.82)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        }}
      >
        {/* Falling leaves */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {LEAF_CONFIG.map((cfg, i) => (
            <FallingLeaf key={i} delay={cfg.delay} x={cfg.x} />
          ))}
        </div>

        {/* Bamboo grove */}
        <div
          aria-hidden
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "6px",
            marginBottom: "28px",
            position: "relative",
          }}
        >
          {Array.from({ length: STALK_COUNT }).map((_, i) => (
            <div
              key={i}
              className="bamboo-sway"
              style={{
                animationDelay: `${i * 0.32}s`,
                animationDuration: `${2.0 + (i % 3) * 0.4}s`,
              }}
            >
              <BambooSvg index={i} />
            </div>
          ))}
        </div>

        {/* Loading label + dots */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <p
            style={{
              color: BAMBOO_PALE,
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "inherit",
              margin: 0,
            }}
          >
            Loading
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: BAMBOO_LIGHT,
                  animation: "bamboo-bounce-dot 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
