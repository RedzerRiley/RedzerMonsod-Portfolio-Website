import { useState, useEffect } from "react";

const contactLinks = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: "Email",
    value: "redzerriley@gmail.com",
    href: "mailto:redzerriley@gmail.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    label: "GitHub",
    value: "RedzerRiley",
    href: "https://github.com/RedzerRiley",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "redzer-monsod",
    href: "https://www.linkedin.com/in/redzer-monsod-bb4309296/",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    background:   focused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
    border:       `1px solid ${focused ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "12px",
    color:        "#ffffff",
    fontFamily:   "var(--font-mono)",
    fontSize:     "0.85rem",
    padding:      "14px 16px",
    outline:      "none",
    transition:   "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
    boxShadow:    focused ? "0 0 0 4px rgba(255,255,255,0.05), inset 0 1px 2px rgba(0,0,0,0.2)" : "inset 0 1px 2px rgba(0,0,0,0.2)",
    resize:       "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{
        fontFamily:    "var(--font-mono)",
        fontSize:      "0.65rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontWeight:    600,
        color:         focused ? "rgba(240,240,240,0.9)" : "rgba(160,160,160,0.5)",
        transition:    "color 0.3s ease",
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
    <div style={{ minHeight: "100vh", paddingBottom: "120px", position: "relative", overflow: "hidden" }}>
      
      {/* Ambient background blur/glow */}
      <div style={{ position: "absolute", top: "20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      <style>{`
        @keyframes blurFadeUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        .contact-col {
          opacity: 0;
          animation: blurFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          position: relative;
          z-index: 1;
        }
        .contact-col:nth-child(1) { animation-delay: 0.1s; }
        .contact-col:nth-child(2) { animation-delay: 0.25s; }

        .contact-link-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 16px;
          text-decoration: none;
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.4s cubic-bezier(0.32, 0.72, 0, 1);
        }
        .contact-link-row.interactive:hover { 
          background: rgba(30, 30, 30, 0.6);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        .contact-link-row.interactive:hover .icon-box {
          background: rgba(255,255,255,0.1);
          color: #ffffff;
          border-color: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }
        .contact-link-row.interactive:hover .contact-link-label { 
          color: #ffffff; 
        }
        .contact-link-arrow { 
          margin-left: auto; 
          color: rgba(255,255,255,0.15);
          transition: all 0.4s cubic-bezier(0.32, 0.72, 0, 1);
          font-size: 1.2rem;
        }
        .contact-link-row.interactive:hover .contact-link-arrow {
          color: rgba(255,255,255,0.8);
          transform: translateX(4px) rotate(-45deg);
        }
        input::placeholder, textarea::placeholder {
          color: rgba(160,160,160,0.3);
        }
      `}</style>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "140px 24px 0" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "72px", opacity: 0, animation: "blurFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <span style={{
              fontFamily: "'DM Sans', monospace", fontSize: "0.65rem", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.2)",
            }}>
              CONTACT
            </span>
            <div style={{ height: "1px", width: "40px", background: "rgba(255,255,255,0.1)" }} />
          </div>
          <h1 style={{
            fontFamily:    "'Playfair Display', Georgia, serif",
            fontWeight:    800,
            fontSize:      "clamp(2.5rem, 5vw, 4rem)",
            letterSpacing: "-0.02em",
            lineHeight:    1.05,
            color:         "#ffffff",
            margin:        "0 0 20px",
            textShadow:    "0 4px 24px rgba(255,255,255,0.15)",
          }}>
            Let's build something<br />
            <em style={{ fontStyle: "italic", color: "rgba(200,200,200,0.5)", fontWeight: 700 }}>
              together.
            </em>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.7,
            color: "rgba(200,200,200,0.7)", maxWidth: "480px", margin: 0,
          }}>
            Open to internship, part-time, and full-time opportunities. Drop me a message and I'll get back to you.
          </p>
        </div>

        {/* ── Two columns ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "64px",
          alignItems: "start",
        }}
          className="contact-grid"
        >
          <style>{`
            @media (max-width: 768px) {
              .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            }
          `}</style>

          {/* Left — contact links */}
          <div className="contact-col" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {contactLinks.map(({ icon, label, value, href }) => {
              const inner = (
                <>
                  {/* Icon box */}
                  <div className="icon-box" style={{
                    width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                    background: "rgba(20,20,20,0.6)", border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(200,200,200,0.5)",
                    transition: "all 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
                  }}>
                    {icon}
                  </div>
                  {/* Text */}
                  <div style={{ minWidth: 0 }}>
                    <p style={{
                      fontFamily: "'DM Sans', monospace", fontSize: "0.65rem", letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "rgba(160,160,160,0.4)",
                      margin: "0 0 4px",
                    }}>
                      {label}
                    </p>
                    <p className="contact-link-label" style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600,
                      color: "rgba(220,220,220,0.8)", margin: 0,
                      transition: "color 0.3s",
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
                  className="contact-link-row interactive"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="contact-link-row" style={{ cursor: "default", paddingLeft: "16px" }}>
                  {inner}
                </div>
              );
            })}
          </div>

          {/* Right — form */}
          <div className="contact-col">
            {sent ? (
              <div style={{
                padding: "64px 32px", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "24px", background: "rgba(20,20,20,0.6)",
                backdropFilter: "blur(20px)",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "20px", textAlign: "center",
                boxShadow: "0 24px 48px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)",
              }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#10b981", fontSize: "1.8rem",
                  boxShadow: "0 0 32px rgba(16,185,129,0.2)",
                }}>
                  ✓
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.4rem", color: "#ffffff", margin: "0 0 8px" }}>
                    Message sent.
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(200,200,200,0.6)", margin: 0 }}>
                    I'll get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: "16px", fontFamily: "'DM Sans', monospace", fontSize: "0.75rem",
                    padding: "10px 24px", borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)", color: "rgba(240,240,240,0.8)",
                    cursor: "pointer", transition: "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#ffffff";
                    e.currentTarget.style.color = "#000000";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "rgba(240,240,240,0.8)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                style={{
                  display: "flex", flexDirection: "column", gap: "24px",
                  padding: "40px", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "24px", background: "rgba(20, 20, 20, 0.6)",
                  backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05)",
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
                    fontFamily: "'DM Sans', monospace", fontSize: "0.75rem",
                    color: "#f87171", margin: 0, padding: "8px 12px", 
                    background: "rgba(248, 113, 113, 0.1)", borderRadius: "8px", border: "1px solid rgba(248, 113, 113, 0.2)"
                  }}>
                    // error: {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.8rem",
                    fontWeight:    600,
                    letterSpacing: "0.04em",
                    padding:       "16px 32px",
                    borderRadius:  "9999px",
                    background:    loading ? "rgba(255,255,255,0.5)" : "#ffffff",
                    color:         "#000",
                    border:        "none",
                    cursor:        loading ? "not-allowed" : "pointer",
                    transition:    "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                    boxShadow:     "0 4px 14px rgba(255,255,255,0.25)",
                    width:         "100%",
                    marginTop:     "8px",
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.currentTarget.style.transform   = "translateY(-2px) scale(1.01)";
                      e.currentTarget.style.boxShadow   = "0 12px 24px rgba(255,255,255,0.3)";
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform   = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow   = "0 4px 14px rgba(255,255,255,0.25)";
                  }}
                >
                  {loading ? "Sending..." : "Send message →"}
                </button>

                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", textAlign: "center",
                  color: "rgba(160,160,160,0.5)", margin: 0, letterSpacing: "0.02em",
                }}>
                  Your info is strictly used to respond to your inquiry.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}