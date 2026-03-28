import { useState } from "react";

const contactLinks = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: "Email",
    value: "redzerriley@gmail.com",
    href: "mailto:redzerriley@gmail.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    label: "GitHub",
    value: "RedzerRiley",
    href: "https://github.com/RedzerRiley",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "redzer-monsod",
    href: "https://www.linkedin.com/in/redzer-monsod-bb4309296/",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "San Pedro, Laguna, PH",
    href: null,
  },
];

const API_URL = "https://portfolio-api-sigma-eight.vercel.app/api/contact";

// ── Floating label input ──────────────────────────────────────
function Field({ label, name, type = "text", placeholder, value, onChange, textarea, rows = 5 }) {
  const [focused, setFocused] = useState(false);

  const sharedStyle = {
    width:        "100%",
    background:   "rgba(255,255,255,0.03)",
    border:       `1px solid ${focused ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "10px",
    color:        "rgba(240,240,240,0.9)",
    fontFamily:   "var(--font-mono)",
    fontSize:     "0.8rem",
    padding:      "12px 16px",
    outline:      "none",
    transition:   "border-color 0.2s, box-shadow 0.2s",
    boxShadow:    focused ? "0 0 0 3px rgba(255,255,255,0.04)" : "none",
    resize:       "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <label style={{
        fontFamily:    "var(--font-mono)",
        fontSize:      "0.62rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color:         focused ? "rgba(200,200,200,0.6)" : "rgba(160,160,160,0.35)",
        transition:    "color 0.2s",
      }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required
          style={sharedStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          style={sharedStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function ContactPage() {
  const [form,    setForm]    = useState({ name: "", email: "", message: "" });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(API_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "120px" }}>
      <style>{`
        @keyframes contactFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .contact-col {
          animation: contactFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        .contact-col:nth-child(1) { animation-delay: 0.05s; }
        .contact-col:nth-child(2) { animation-delay: 0.18s; }

        .contact-link-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          text-decoration: none;
          transition: padding-left 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .contact-link-row:last-child { border-bottom: none; }
        .contact-link-row:hover { padding-left: 6px; }
        .contact-link-row:hover .contact-link-label { color: rgba(240,240,240,0.9); }
        .contact-link-arrow { 
          margin-left: auto; 
          color: rgba(255,255,255,0.15);
          transition: color 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          font-size: 1rem;
        }
        .contact-link-row:hover .contact-link-arrow {
          color: rgba(255,255,255,0.5);
          transform: translateX(3px) rotate(-45deg);
        }
        input::placeholder, textarea::placeholder {
          color: rgba(160,160,160,0.25);
        }
      `}</style>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "120px 24px 0" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "64px", animation: "contactFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" }}>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: "0.62rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)", margin: "0 0 14px",
          }}>
          </p>
          <h1 style={{
            fontFamily:    "'Playfair Display', Georgia, serif",
            fontWeight:    800,
            fontSize:      "clamp(2rem, 5vw, 3.2rem)",
            letterSpacing: "-0.02em",
            lineHeight:    1.1,
            color:         "rgba(240,240,240,0.95)",
            margin:        "0 0 16px",
          }}>
            Let's build something<br />
            <em style={{ fontStyle: "italic", color: "rgba(200,200,200,0.38)", fontWeight: 700 }}>
              together.
            </em>
          </h1>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.7,
            color: "var(--text-muted)", maxWidth: "480px", margin: 0,
          }}>
            Open to internship, part-time, and full-time opportunities. Drop me a message and I'll get back to you.
          </p>
        </div>

        {/* ── Two columns ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "start",
        }}
          className="contact-grid"
        >
          <style>{`
            @media (max-width: 640px) {
              .contact-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left — contact links */}
          <div className="contact-col">
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)", margin: "0 0 4px",
            }}>
              Reach out
            </p>

            <div>
              {contactLinks.map(({ icon, label, value, href }) => {
                const inner = (
                  <>
                    {/* Icon box */}
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(200,200,200,0.5)",
                    }}>
                      {icon}
                    </div>
                    {/* Text */}
                    <div style={{ minWidth: 0 }}>
                      <p style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.08em",
                        textTransform: "uppercase", color: "rgba(160,160,160,0.35)",
                        margin: "0 0 2px",
                      }}>
                        {label}
                      </p>
                      <p className="contact-link-label" style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600,
                        color: "rgba(200,200,200,0.65)", margin: 0,
                        transition: "color 0.2s",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {value}
                      </p>
                    </div>
                    {href && <span className="contact-link-arrow">→</span>}
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="contact-link-row"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="contact-link-row" style={{ cursor: "default" }}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-col">
            {sent ? (
              <div style={{
                padding: "48px 32px", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px", background: "rgba(255,255,255,0.02)",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "16px", textAlign: "center",
              }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem",
                }}>
                  ✓
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.1rem", color: "rgba(240,240,240,0.9)", margin: "0 0 6px" }}>
                    Message sent.
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-faint)", margin: 0 }}>
                    I'll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: "8px", fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                    padding: "8px 20px", borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "transparent", color: "rgba(200,200,200,0.5)",
                    cursor: "pointer", transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "rgba(240,240,240,0.9)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(200,200,200,0.5)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                >
                  send another →
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                style={{
                  display: "flex", flexDirection: "column", gap: "20px",
                  padding: "32px", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px", background: "rgba(255,255,255,0.02)",
                }}
              >
                <Field
                  label="Your name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={onChange}
                />
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={onChange}
                />
                <Field
                  label="Message"
                  name="message"
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={onChange}
                  textarea
                  rows={5}
                />

                {error && (
                  <p style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                    color: "#f87171", margin: 0,
                  }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.75rem",
                    fontWeight:    600,
                    letterSpacing: "0.04em",
                    padding:       "12px 24px",
                    borderRadius:  "9999px",
                    background:    loading ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.92)",
                    color:         "#000",
                    border:        "1px solid rgba(255,255,255,0.2)",
                    cursor:        loading ? "not-allowed" : "pointer",
                    transition:    "background 0.2s, transform 0.2s, box-shadow 0.2s",
                    boxShadow:     "0 1px 0 rgba(255,255,255,0.5) inset, 0 2px 10px rgba(0,0,0,0.3)",
                    width:         "100%",
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.currentTarget.style.background  = "#ffffff";
                      e.currentTarget.style.transform   = "translateY(-1px)";
                      e.currentTarget.style.boxShadow   = "0 1px 0 rgba(255,255,255,0.5) inset, 0 6px 18px rgba(0,0,0,0.35)";
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = "rgba(255,255,255,0.92)";
                    e.currentTarget.style.transform   = "translateY(0)";
                    e.currentTarget.style.boxShadow   = "0 1px 0 rgba(255,255,255,0.5) inset, 0 2px 10px rgba(0,0,0,0.3)";
                  }}
                >
                  {loading ? "Sending..." : "Send message →"}
                </button>

                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.6rem", textAlign: "center",
                  color: "rgba(160,160,160,0.3)", margin: 0, letterSpacing: "0.04em",
                }}>
                  Your info is only used to respond to your message.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}