import { useEffect, useRef, useState } from "react";

// Keep in sync with the --route-exit-ms duration in global.css
const EXIT_MS = 260;

/**
 * Delays swapping <Routes location> until the outgoing page has finished
 * its exit animation, so we get a real exit -> enter sequence instead of
 * React Router's default instant unmount/mount.
 *
 * phase is one of:
 *   "enter-instant" — first paint, no animation
 *   "exit"          — old page animating out (displayLocation still old)
 *   "enter"         — new page animating in (displayLocation now new)
 */
export function usePageTransition(location) {
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState("enter-instant");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    setPhase("exit");
    timeoutRef.current = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDisplayLocation(location);
      setPhase("enter");
    }, EXIT_MS);

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return { displayLocation, phase };
}