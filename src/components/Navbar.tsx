import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ContactModal from "./ContactModal";

const links = [
  { to: "/",       label: "home"     },
  { to: "/about",  label: "about"    },
  { to: "/projects", label: "projects" },
  { to: "/contact",  label: "contact"  },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  
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
      
      if (!el || !nav) {
        setPillStyle(prev => ({ ...prev, opacity: 0 }));
        return;
      }
      
      const navRect = nav.getBoundingClientRect();
      const elRect  = el.getBoundingClientRect();
      
      setPillStyle({ 
        left: elRect.left - navRect.left, 
        width: elRect.width,
        opacity: 1
      });
    };
    
    // Slight delay to ensure DOM layout is painted before calculating widths
    setTimeout(update, 10);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pathname]);

  return (
    <>
      <header
        className="nav-entry-anim"
        style={{
          position:             "fixed",
          top:                  scrolled ? "12px" : "20px",
          left:                 "50%",
          transform:            "translateX(-50%)",
          zIndex:               100,
          transition:           "top 0.5s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.5s ease, background 0.5s ease",
          width:                "min(900px, calc(100% - 32px))",
          display:              "flex",
          alignItems:           "center",
          justifyContent:       "space-between",
          gap:                  "12px",
          padding:              "8px 10px 8px 20px",
          // iOS 26 Glassmorphism formula: high transparency + high blur + bright inner border
          background:           scrolled ? "rgba(20, 20, 20, 0.65)" : "rgba(30, 30, 30, 0.45)",
          backdropFilter:       "blur(48px) saturate(200%)",
          WebkitBackdropFilter: "blur(48px) saturate(200%)",
          borderRadius:         "9999px",
          border:               "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:            scrolled
            ? "0 12px 40px -10px rgba(0,0,0,0.6), 0 1px 1px rgba(255,255,255,0.15) inset"
            : "0 4px 30px -10px rgba(0,0,0,0.3), 0 1px 1px rgba(255,255,255,0.08) inset",
        }}
      >
        {/* ── Brand ── */}
        <NavLink
          to="/"
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.85rem",
            fontWeight:    700,
            letterSpacing: "0.04em",
            color:         "#fff",
            textDecoration:"none",
            whiteSpace:    "nowrap",
            flexShrink:    0,
            transition:    "opacity 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
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
            background:     "rgba(0,0,0,0.25)",
            border:         "1px solid rgba(255,255,255,0.06)",
            boxShadow:      "inset 0 1px 4px rgba(0,0,0,0.4)",
            borderRadius:   "9999px",
            padding:        "4px",
            overflowX:      "auto",
            overflowY:      "hidden",
            scrollbarWidth: "none",
            flexShrink:     1,
            minWidth:       0,
          }}
        >
          {/* Active indicator pill */}
          <span
            style={{
              position:      "absolute",
              top:           "4px",
              height:        "calc(100% - 8px)",
              left:          pillStyle.left + "px",
              width:         pillStyle.width + "px",
              opacity:       pillStyle.opacity,
              borderRadius:  "9999px",
              // Glossy inner active pill
              background:    "rgba(255,255,255,0.18)",
              border:        "1px solid rgba(255,255,255,0.1)",
              boxShadow:     "0 2px 10px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.25)",
              // Spring animation curve similar to iOS
              transition:    "left 0.5s cubic-bezier(0.32, 0.72, 0, 1), width 0.5s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease",
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
              className="nav-link-item"
              style={({ isActive }) => ({
                fontFamily:     "var(--font-mono)",
                fontSize:       "0.7rem",
                fontWeight:     isActive ? 600 : 500,
                letterSpacing:  "0.05em",
                padding:        "6px 14px",
                borderRadius:   "9999px",
                color:          isActive ? "#fff" : "rgba(255,255,255,0.6)",
                textDecoration: "none",
                position:       "relative",
                zIndex:         1,
                transition:     "color 0.3s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
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
          className="hidden sm:inline-flex contact-btn"
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.7rem",
            fontWeight:    600,
            letterSpacing: "0.03em",
            padding:       "8px 16px",
            borderRadius:  "9999px",
            background:    "rgba(255,255,255,0.95)",
            color:         "#000",
            border:        "none",
            cursor:        "pointer",
            transition:    "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
            boxShadow:     "0 2px 12px rgba(255,255,255,0.15), inset 0 1px 1px rgba(255,255,255,1)",
            whiteSpace:    "nowrap",
            flexShrink:    0,
          }}
        >
          Contact Me
        </button>
      </header>

      <style>{`
        /* Hide scrollbars for pill nav */
        [data-pill-nav]::-webkit-scrollbar { 
          display: none; 
        }

        /* Entry Animation for the whole Navbar */
        @keyframes navSlideDown {
          0% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
        
        .nav-entry-anim {
          animation: navSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Link Hover Animations */
        .nav-link-item:hover {
          color: #fff !important;
          transform: scale(1.05);
        }
        .nav-link-item:active {
          transform: scale(0.95);
        }

        /* Contact Button Hover Animations */
        .contact-btn:hover {
          background: #ffffff !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 20px rgba(255,255,255,0.25), inset 0 1px 1px rgba(255,255,255,1) !important;
        }
        .contact-btn:active {
          transform: translateY(0) scale(0.96);
          box-shadow: 0 2px 8px rgba(255,255,255,0.15), inset 0 1px 1px rgba(255,255,255,1) !important;
        }
      `}</style>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}