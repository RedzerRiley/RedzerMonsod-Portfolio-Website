import { useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";

const contactLinks = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: "email",
    value: "redzerriley@gmail.com",
    href: "mailto:redzerriley@gmail.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
      </svg>
    ),
    label: "github",
    value: "https://github.com/RedzerRiley",
    href: "https://github.com/RedzerRiley",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "location",
    value: "San Pedro, Laguna, PH",
    href: null,
  },
];

// ── Change this to your actual Vercel deployment URL ──────────────────────────
const API_URL = "https://portfolio-api-sigma-eight.vercel.app/api/contact";

export default function ContactPage() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
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

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid var(--border-mid)",
    color: "var(--text)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.8rem",
    borderRadius: "var(--radius-sm)",
    width: "100%",
    padding: "10px 14px",
    outline: "none",
    transition: "border-color .2s",
  };

  return (
    <section className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-4xl mx-auto space-y-12">

        <div className="anim-fade-up text-center">
          <SectionHeader
            label="./contact"
            title="send_message()"
            centered
            subtitle="Open to internship, part-time, and full-time opportunities."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ── Contact info ─────────────────────────────────────────────── */}
          <div className="anim-fade-up delay-100 space-y-3">
            <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
              // contact_details
            </p>
            {contactLinks.map(({ icon, label, value, href }) => (
              <div key={label} className="card p-4 flex items-center gap-3.5">
                <span className="block" style={{ color: "var(--text-muted)" }}>{icon}</span>
                <div>
                  <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
                    // {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="font-mono text-xs font-semibold transition-colors"
                      style={{ color: "var(--text)" }}
                      onMouseEnter={e => (e.target.style.color = "var(--text-muted)")}
                      onMouseLeave={e => (e.target.style.color = "var(--text)")}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-mono text-xs font-semibold" style={{ color: "var(--text)" }}>
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Form ─────────────────────────────────────────────────────── */}
          <div className="anim-fade-up delay-200">
            {sent ? (
              <div className="card p-8 flex flex-col items-center gap-4 text-center h-full justify-center">
                <p className="font-mono text-2xl">✓</p>
                <p className="font-display font-bold text-sm" style={{ color: "var(--text)" }}>
                  message_sent()
                </p>
                <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
                  I'll get back to you soon!
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-ghost text-xs py-2 px-4 mt-1"
                >
                  send_another()
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="card p-5 space-y-4">
                <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
                  // compose_message
                </p>

                {[
                  { name: "name",  label: "your_name",  type: "text",  ph: "John Doe"         },
                  { name: "email", label: "your_email", type: "email", ph: "john@example.com" },
                ].map(({ name, label, type, ph }) => (
                  <div key={name} className="space-y-1.5">
                    <label className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
                      const {label} =
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={onChange}
                      placeholder={ph}
                      required
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "var(--border-hover)")}
                      onBlur={e  => (e.target.style.borderColor = "var(--border-mid)")}
                    />
                  </div>
                ))}

                <div className="space-y-1.5">
                  <label className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
                    const message =
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => (e.target.style.borderColor = "var(--border-hover)")}
                    onBlur={e  => (e.target.style.borderColor = "var(--border-mid)")}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <p className="font-mono text-xs" style={{ color: "var(--color-error, #f87171)" }}>
                    // error: {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full justify-center text-xs"
                  disabled={loading}
                  style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? "sending..." : "submit()"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}