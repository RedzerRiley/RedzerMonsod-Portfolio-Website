import { NavLink } from "react-router-dom";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/RedzerRiley",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/redzer-monsod-bb4309296/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/redzer.monsod.5",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

const navLinks = [
  { to: "/about",      label: "about"      },
  // { to: "/experience", label: "experience" },
  { to: "/projects",   label: "projects"   },
  { to: "/contact",    label: "contact"    },
];

export default function Footer() {
  return (
    <footer
      style={{
        position:   "relative",
        zIndex:     10,
        overflow:   "hidden",
        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
      }}
    >
      {/* Subtle ambient glow line at the top edge */}
      <div
        style={{
          position:   "absolute",
          top:        0,
          left:       "50%",
          transform:  "translateX(-50%)",
          width:      "60%",
          height:     "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)",
        }}
      />
      {/* Glow bloom behind the line */}
      <div
        style={{
          position:   "absolute",
          top:        "-20px",
          left:       "50%",
          transform:  "translateX(-50%)",
          width:      "40%",
          height:     "40px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin:   "0 auto",
          padding:  "40px 24px 32px",
        }}
      >
        {/* Top row — brand + nav links */}
        <div
          style={{
            display:        "flex",
            flexWrap:       "wrap",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            "20px",
            marginBottom:   "32px",
          }}
        >
          {/* Brand */}
          <NavLink
            to="/"
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.85rem",
              fontWeight:    700,
              letterSpacing: "0.04em",
              color:         "rgba(240,240,240,0.75)",
              textDecoration:"none",
              whiteSpace:    "nowrap",
              flexShrink:    0,
              transition:    "color 0.2s ease, opacity 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(240,240,240,1)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(240,240,240,0.75)"}
          >
            Redzer
          </NavLink>

          {/* Nav links */}
          <nav
            style={{
              display: "flex",
              gap:     "28px",
              flexWrap:"wrap",
            }}
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                style={({ isActive }) => ({
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "0.75rem",
                  fontWeight:    500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration:"none",
                  color:         isActive ? "rgba(240,240,240,0.9)" : "rgba(180,180,180,0.45)",
                  transition:    "color 0.2s",
                })}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(240,240,240,0.9)"}
                onMouseLeave={e => {
                  // only reset if not active — NavLink doesn't expose isActive here, just let it fall to its value
                  e.currentTarget.style.color = "";
                }}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          style={{
            width:      "100%",
            height:     "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)",
            marginBottom:"28px",
          }}
        />

        {/* Bottom row — copyright + socials */}
        <div
          style={{
            display:        "flex",
            flexWrap:       "wrap",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            "16px",
          }}
        >
          <p
            style={{
              fontFamily:    "'DM Sans', monospace",
              fontSize:      "0.72rem",
              color:         "rgba(160,160,160,0.35)",
              margin:        0,
              letterSpacing: "0.02em",
            }}
          >
            © 2026 Redzer Riley M. Monsod
            <span style={{ margin: "0 8px", opacity: 0.4 }}>·</span>
            <span style={{ opacity: 0.6 }}>v2.0</span>
          </p>

          {/* Social icon buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {socials.map(({ label, href, icon }) => (
              <SocialIcon key={label} href={href} label={label}>
                {icon}
              </SocialIcon>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        width:          "34px",
        height:         "34px",
        borderRadius:   "8px",
        color:          "rgba(180,180,180,0.4)",
        border:         "1px solid rgba(255,255,255,0.07)",
        background:     "rgba(255,255,255,0.03)",
        textDecoration: "none",
        transition:     "color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.color        = "rgba(240,240,240,0.9)";
        el.style.borderColor  = "rgba(255,255,255,0.2)";
        el.style.background   = "rgba(255,255,255,0.08)";
        el.style.transform    = "translateY(-2px)";
        el.style.boxShadow    = "0 4px 16px rgba(255,255,255,0.06)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.color        = "rgba(180,180,180,0.4)";
        el.style.borderColor  = "rgba(255,255,255,0.07)";
        el.style.background   = "rgba(255,255,255,0.03)";
        el.style.transform    = "translateY(0)";
        el.style.boxShadow    = "none";
      }}
    >
      {children}
    </a>
  );
}