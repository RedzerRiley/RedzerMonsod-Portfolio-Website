import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/",           label: "~/home"       },
  { to: "/about",      label: "about"        },
  { to: "/experience", label: "experience"   },
//   { to: "/skills",     label: "skills"       },
  { to: "/projects",   label: "projects"     },
  { to: "/contact",    label: "contact"      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? "rgba(10,10,10,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="font-mono text-sm font-bold tracking-tight select-none"
          style={{ color: "var(--text)" }}>
          <span style={{ color: "var(--text-faint)" }}>~/</span>redzer
        </NavLink>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-5">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <NavLink to="/contact" className="hidden sm:inline-flex btn-primary text-xs py-2 px-4">
            contact_me()
          </NavLink>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(v => !v)}
          >
            {[0,1,2].map(i => (
              <span key={i} className="block h-px bg-white/60 rounded transition-all duration-300"
                style={{
                  width: i===1 ? (menuOpen ? "100%" : "65%") : "100%",
                  transform: menuOpen
                    ? i===0 ? "rotate(45deg) translateY(7px)"
                    : i===2 ? "rotate(-45deg) translateY(-7px)"
                    : "scaleX(0)" : "none"
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "360px" : "0",
          background: "rgba(10,10,10,0.98)",
          borderBottom: menuOpen ? "1px solid var(--border)" : "none",
        }}>
        <nav className="flex flex-col px-6 py-4 gap-1">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to==="/"} className={({ isActive }) =>
              `py-2.5 px-3 rounded font-mono text-xs transition-colors ${
                isActive ? "text-white bg-white/5" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="mt-3 btn-primary justify-center text-xs">
            hire_me()
          </NavLink>
        </nav>
      </div>
    </header>
  );
}