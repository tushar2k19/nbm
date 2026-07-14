import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Smooth-scroll to `location.hash` target after route paint (SPA-safe). */
export function useHashScroll() {
  const hash = useRouterState({
    select: (state) => state.location.hash,
  });

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!id) return;

    const scrollToTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const raf = requestAnimationFrame(scrollToTarget);
    const retry = window.setTimeout(scrollToTarget, 200);

    const onHashChange = () => scrollToTarget();
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(retry);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [hash]);
}
