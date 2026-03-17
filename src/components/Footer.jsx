import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-6" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <NavLink to="/" className="font-mono text-sm font-bold" style={{ color: "var(--text-faint)" }}>
          ~/redzer
        </NavLink>
        <p className="font-mono text-xs" style={{ color: "var(--text-ghost)" }}>
          © 2026 Redzer Riley M. Monsod · created using React + Tailwind + CloudFlare
        </p>
        <div className="flex items-center gap-4">
          {[
            
          ].map(({ href, label }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : "_self"}
              rel="noreferrer" className="font-mono text-xs transition-colors"
              style={{ color: "var(--text-faint)" }}
              onMouseEnter={e => e.target.style.color="var(--text)"}
              onMouseLeave={e => e.target.style.color="var(--text-faint)"}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}