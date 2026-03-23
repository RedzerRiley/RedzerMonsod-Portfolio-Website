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
    <>
      {/* Backdrop (Fades in) */}
      <div 
        onClick={onClose} 
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Modal Container */}
      <div 
        className={`fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* The macOS Pop Box (Scales up with a spring effect) */}
        <div 
          className={`w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-mid)] rounded-[var(--radius-lg)] shadow-2xl overflow-hidden transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "scale-100 pointer-events-auto" : "scale-95 pointer-events-none"
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--border)] flex justify-between items-start">
            <div>
              <p className="font-mono text-xs text-[var(--text-faint)] mb-1">// say_hello()</p>
              <h2 className="font-bold text-lg text-[var(--text)]">leave_a_message()</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
               ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {sent ? (
              <div className="text-center py-8">
                <p className="text-2xl mb-2">✓</p>
                <p className="font-bold mb-4">message_sent()</p>
                <button onClick={onClose} className="btn-primary text-xs py-2 px-6">close()</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-[var(--text-faint)]">const your_name =</label>
                  <input type="text" name="name" value={form.name} onChange={onChange} required style={inputStyle} placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-[var(--text-faint)]">const your_email =</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required style={inputStyle} placeholder="john@example.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs text-[var(--text-faint)]">const message =</label>
                  <textarea name="message" value={form.message} onChange={onChange} required rows={4} style={{...inputStyle, resize: 'none'}} placeholder="How can I help?" />
                </div>
                {error && <p className="text-red-400 font-mono text-xs">// error: {error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-xs">
                  {loading ? "sending..." : "submit()"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}