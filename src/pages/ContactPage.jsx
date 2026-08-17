import { useState } from "react";
import "./ContactPage.css";

const contactLinks = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "San Pedro, Laguna, PH",
    href: null,
  },
];

const API_URL = "https://portfolio-api-sigma-eight.vercel.app/api/contact";

// ── Field ─────────────────────────────────────────────────────
function Field({ label, name, type = "text", placeholder, value, onChange, textarea, rows = 5 }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="contact-field">
      <label htmlFor={name}>{label}</label>
      <Tag
        id={name}
        type={textarea ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={textarea ? rows : undefined}
        required
      />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="contact">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      <header className="contact-head">
        <h1 className="contact-head__title">
          Let's build something <em>together.</em>
        </h1>
        <p className="contact-head__meta">
          Open to internship, part-time, and full-time opportunities. Reach out directly or use the
          form — I'll get back to you.
        </p>
      </header>

      <div className="contact-grid">
        {/* ── Contact list ── */}
        <div className="contact-list">
          {contactLinks.map(({ icon, label, value, href }) => {
            const content = (
              <>
                <span className="contact-row__icon">{icon}</span>
                <span className="contact-row__text">
                  <p className="contact-row__label">{label}</p>
                  <p className="contact-row__value">{value}</p>
                </span>
                {href && <span className="contact-row__arrow">→</span>}
              </>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="contact-row is-link"
              >
                {content}
              </a>
            ) : (
              <div key={label} className="contact-row">
                {content}
              </div>
            );
          })}
        </div>

        {/* ── Form ── */}
        <div>
          {sent ? (
            <div className="contact-success">
              <p className="contact-success__status">
                <span className="contact-success__dot" />
                Sent
              </p>
              <p className="contact-success__title">Message sent.</p>
              <p className="contact-success__desc">
                Thanks for reaching out — I'll get back to you as soon as possible.
              </p>
              <button className="contact-success__again" onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit}>
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

              {error && <p className="contact-error">// error: {error}</p>}

              <button type="submit" className="contact-submit" disabled={loading}>
                {loading ? "Sending..." : "Send message →"}
              </button>

              <p className="contact-note">Your info is strictly used to respond to your inquiry.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}