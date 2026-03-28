import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ContactModal from "./ContactModal";

const links = [
  { to: "/",           label: "home"     },
  { to: "/about",      label: "about"    },
  { to: "/projects",   label: "projects" },
  { to: "/contact",    label: "contact"  },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRef   = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const update = () => {
      const activeIdx = links.findIndex(l =>
        l.to === "/" ? pathname === "/" : pathname.startsWith(l.to)
      );
      const el  = itemRefs.current[activeIdx];
      const nav = navRef.current;
      if (!el || !nav) return;
      const navRect = nav.getBoundingClientRect();
      const elRect  = el.getBoundingClientRect();
      setPillStyle({ left: elRect.left - navRect.left, width: elRect.width });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pathname]);

  return (
    <>
      <header
        style={{
          position:             "fixed",
          top:                  scrolled ? "12px" : "18px",
          left:                 "50%",
          transform:            "translateX(-50%)",
          zIndex:               100,
          transition:           "top 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
          width:                "min(900px, calc(100% - 24px))",
          display:              "flex",
          alignItems:           "center",
          justifyContent:       "space-between",
          gap:                  "10px",
          padding:              "7px 10px 7px 16px",
          background:           scrolled ? "rgba(10,10,10,0.78)" : "rgba(16,16,16,0.55)",
          backdropFilter:       "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          borderRadius:         "9999px",
          border:               "1px solid rgba(255,255,255,0.08)",
          boxShadow:            scrolled
            ? "0 8px 48px rgba(0,0,0,0.75), 0 1px 0 rgba(255,255,255,0.07) inset"
            : "0 4px 20px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.05) inset",
        }}
      >
        {/* ── Brand — plain mono, no external font dependency ── */}
        <NavLink
          to="/"
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.82rem",
            fontWeight:    700,
            letterSpacing: "0.04em",
            color:         "var(--text)",
            textDecoration:"none",
            whiteSpace:    "nowrap",
            flexShrink:    0,
          }}
        >
          Redzer
        </NavLink>

        {/* ── Pill nav ── */}
        <div
          ref={navRef}
          data-pill-nav
          style={{
            position:       "relative",
            display:        "flex",
            alignItems:     "center",
            gap:            "1px",
            background:     "rgba(255,255,255,0.04)",
            border:         "1px solid rgba(255,255,255,0.07)",
            borderRadius:   "9999px",
            padding:        "3px",
            overflowX:      "auto",
            overflowY:      "hidden",
            scrollbarWidth: "none",
            flexShrink:     1,
            minWidth:       0,
          }}
        >
          <span
            style={{
              position:      "absolute",
              top:           "3px",
              height:        "calc(100% - 6px)",
              left:          pillStyle.left + "px",
              width:         pillStyle.width + "px",
              borderRadius:  "9999px",
              background:    "rgba(255,255,255,0.12)",
              border:        "1px solid rgba(255,255,255,0.15)",
              boxShadow:     "0 1px 0 rgba(255,255,255,0.09) inset, 0 2px 8px rgba(0,0,0,0.3)",
              transition:    "left 0.35s cubic-bezier(0.34,1.22,0.64,1), width 0.35s cubic-bezier(0.34,1.22,0.64,1)",
              pointerEvents: "none",
              zIndex:        0,
            }}
          />

          {links.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              ref={el => { itemRefs.current[i] = el; }}
              style={({ isActive }) => ({
                fontFamily:     "var(--font-mono)",
                fontSize:       "0.68rem",
                letterSpacing:  "0.05em",
                padding:        "5px 10px",
                borderRadius:   "9999px",
                color:          isActive ? "var(--text)" : "var(--text-faint)",
                textDecoration: "none",
                position:       "relative",
                zIndex:         1,
                transition:     "color 0.2s ease",
                whiteSpace:     "nowrap",
                flexShrink:     0,
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* ── Contact button ── */}
        <button
          onClick={() => setModalOpen(true)}
          className="hidden sm:inline-flex"
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.66rem",
            fontWeight:    600,
            letterSpacing: "0.03em",
            padding:       "6px 13px",
            borderRadius:  "9999px",
            background:    "rgba(255,255,255,0.9)",
            color:         "#000",
            border:        "1px solid rgba(255,255,255,0.18)",
            cursor:        "pointer",
            transition:    "background 0.2s, transform 0.2s, box-shadow 0.2s",
            boxShadow:     "0 1px 0 rgba(255,255,255,0.55) inset, 0 2px 8px rgba(0,0,0,0.22)",
            whiteSpace:    "nowrap",
            flexShrink:    0,
          }}
          onMouseEnter={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "#ffffff";
            b.style.transform  = "translateY(-1px)";
            b.style.boxShadow  = "0 1px 0 rgba(255,255,255,0.55) inset, 0 6px 18px rgba(0,0,0,0.32)";
          }}
          onMouseLeave={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background = "rgba(255,255,255,0.9)";
            b.style.transform  = "translateY(0)";
            b.style.boxShadow  = "0 1px 0 rgba(255,255,255,0.55) inset, 0 2px 8px rgba(0,0,0,0.22)";
          }}
        >
          Contact Me
        </button>
      </header>

      <style>{`
        [data-pill-nav]::-webkit-scrollbar { display: none; }
      `}</style>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}