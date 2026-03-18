import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/",         label: "~/home"       },
  { to: "/about",      label: "about"        },
  { to: "/experience", label: "experience"   },
  { to: "/skills",     label: "skills"       },
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
        background: scrolled || menuOpen ? "rgba(10,10,10,0.94)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid var(--border)" : "1px solid transparent",
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
            className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 w-10 h-10"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} className="block h-[2px] bg-white/80 rounded transition-all duration-300"
                style={{
                  width: i === 1 ? (menuOpen ? "24px" : "16px") : "24px",
                  // Fixed transform order: Translate FIRST, then rotate
                  transform: menuOpen
                    ? i === 0 ? "translateY(8px) rotate(45deg)"
                    : i === 2 ? "translateY(-8px) rotate(-45deg)"
                    : "scaleX(0)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          background: "rgba(10,10,10,0.98)",
          borderBottom: menuOpen ? "1px solid var(--border)" : "none",
        }}>
        <nav className="flex flex-col px-6 py-4 gap-2">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to==="/"} className={({ isActive }) =>
              /* Added 'block' and increased padding for a much larger tap target */
              `block py-3 px-4 rounded font-mono text-xs transition-colors ${
                isActive ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="mt-4 btn-primary flex justify-center text-xs py-3">
            hire_me()
          </NavLink>
        </nav>
      </div>
    </header>
  );
}