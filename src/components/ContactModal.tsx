import { useState, useEffect } from "react";

const API_URL = "https://portfolio-api-sigma-eight.vercel.app/api/contact";

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // Lock body scroll and clear form when closing
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setSent(false);
        setError(null);
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  // Reusable Field styled to match the main Contact Page
  const Field = ({ label, name, type = "text", placeholder, value, textarea, rows }) => {
    const [focused, setFocused] = useState(false);
    const sharedStyle = {
      width:        "100%",
      background:   focused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
      border:       `1px solid ${focused ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"}`,
      borderRadius: "10px",
      color:        "#ffffff",
      fontFamily:   "var(--font-mono)",
      fontSize:     "0.85rem",
      padding:      "12px 14px",
      outline:      "none",
      transition:   "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
      boxShadow:    focused ? "0 0 0 4px rgba(255,255,255,0.05), inset 0 1px 2px rgba(0,0,0,0.2)" : "inset 0 1px 2px rgba(0,0,0,0.2)",
      resize:       "none",
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{
          fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em",
          textTransform: "uppercase", fontWeight: 600,
          color: focused ? "rgba(240,240,240,0.9)" : "rgba(160,160,160,0.5)",
          transition: "color 0.3s ease",
        }}>
          {label}
        </label>
        {textarea ? (
          <textarea
            name={name} value={value} onChange={onChange} placeholder={placeholder}
            rows={rows} required style={sharedStyle}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          />
        ) : (
          <input
            type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
            required style={sharedStyle}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      />

      {/* Modal Container */}
      <div 
        style={{
          position: "fixed", inset: 0, zIndex: 101,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
          pointerEvents: "none",
        }}
      >
        {/* The macOS Pop Box */}
        <div 
          style={{
            width: "100%", maxWidth: "480px",
            background: "rgba(20,20,20,0.75)",
            backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "24px",
            boxShadow: "0 24px 48px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)",
            overflow: "hidden",
            pointerEvents: isOpen ? "auto" : "none",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
            transition: "all 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          {/* Header */}
          <div style={{ 
            padding: "24px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", 
            display: "flex", justifyContent: "space-between", alignItems: "flex-start" 
          }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", margin: "0 0 4px" }}>
                INQUIRY
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.5rem", color: "#ffffff", margin: 0 }}>
                Leave a message
              </h2>
            </div>
            <button 
              onClick={onClose} 
              style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                width: "32px", height: "32px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.6)", cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            >
               ✕
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "24px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{
                  width: "56px", height: "56px", margin: "0 auto 20px", borderRadius: "50%",
                  background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#10b981", fontSize: "1.6rem", boxShadow: "0 0 24px rgba(16,185,129,0.2)",
                }}>
                  ✓
                </div>
                <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9rem", color: "#ffffff", marginBottom: "8px" }}>message_sent()</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(200,200,200,0.6)", marginBottom: "24px" }}>I'll get back to you soon.</p>
                <button 
                  onClick={onClose} 
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600,
                    padding: "10px 24px", borderRadius: "9999px", background: "#ffffff", color: "#000",
                    border: "none", cursor: "pointer", transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  close()
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Field label="Your name" name="name" placeholder="John Doe" value={form.name} />
                <Field label="Your email" name="email" type="email" placeholder="john@example.com" value={form.email} />
                <Field label="Message" name="message" placeholder="How can I help?" value={form.message} textarea rows={4} />
                
                {error && <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#f87171", margin: 0 }}>// error: {error}</p>}
                
                <button 
                  type="submit" 
                  disabled={loading} 
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 600,
                    padding: "14px", borderRadius: "12px", marginTop: "8px",
                    background: loading ? "rgba(255,255,255,0.5)" : "#ffffff", color: "#000",
                    border: "none", cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                    boxShadow: "0 4px 14px rgba(255,255,255,0.25)",
                    width: "100%",
                  }}
                  onMouseEnter={e => {
                    if(!loading) {
                      e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,255,255,0.3)";
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,255,255,0.25)";
                  }}
                >
                  {loading ? "sending..." : "Submit message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}