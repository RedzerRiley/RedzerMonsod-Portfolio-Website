import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects, experience } from "../data/index.js";
import resumePdf from "../assets/resume.pdf";

// ── Typing Headline ───────────────────────────────────────────
const TYPING_PHRASES = [
  "Fullstack Developer.",
  "Software Engineer.",
  "DevOps Enthusiast.",
  "Mapúan.",
  "Problem Solver.",
  "CS Student.",
];

function TypingHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed,   setDisplayed]   = useState("");
  const [isDeleting,  setIsDeleting]  = useState(false);
  const [isPaused,    setIsPaused]    = useState(false);

  useEffect(() => {
    const current = TYPING_PHRASES[phraseIndex];
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayed.length === current.length) { setIsPaused(true); return; }
    if (isDeleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 38);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIndex(i => (i + 1) % TYPING_PHRASES.length);
    }
  }, [displayed, isDeleting, isPaused, phraseIndex]);

  return (
    <h1
      style={{
        fontFamily:    "'Playfair Display', Georgia, serif",
        fontWeight:    800,
        fontSize:      "clamp(2.8rem, 7.5vw, 6.2rem)",
        lineHeight:    1.08,
        letterSpacing: "-0.01em",
        color:         "#f0f0f0",
        margin:        0,
        maxWidth:      "900px",
        textShadow:    "0 -2px 40px rgba(255,255,255,0.18), 0 0 80px rgba(255,255,255,0.08)",
      }}
    >
      I&apos;m a
      <br />
      <em
        style={{
          fontStyle:  "italic",
          fontWeight: 700,
          color:      "rgba(230,230,230,0.85)",
          textShadow: "0 0 60px rgba(255,255,255,0.3), 0 0 120px rgba(255,255,255,0.15)",
          display:    "inline-block",
          minWidth:   "2px",
        }}
      >
        {displayed}
        <span
          style={{
            display:       "inline-block",
            width:         "3px",
            height:        "0.85em",
            background:    "rgba(230,230,230,0.7)",
            marginLeft:    "4px",
            verticalAlign: "middle",
            borderRadius:  "1px",
            animation:     "cursorBlink 1s step-end infinite",
          }}
        />
      </em>
    </h1>
  );
}

// ── Glow Button ───────────────────────────────────────────────
function GlowButton({ href, download, children, primary = false }) {
  const [hovered, setHovered] = useState(false);
  const [pos,     setPos]     = useState({ x: 50, y: 50 });
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const baseStyle = {
    position: "relative", display: "inline-flex", alignItems: "center", gap: "7px",
    padding: "9px 18px", borderRadius: "9999px", fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.78rem", fontWeight: primary ? 600 : 500, textDecoration: "none",
    whiteSpace: "nowrap", overflow: "hidden", cursor: "pointer",
    transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, background 0.2s, border-color 0.2s, color 0.2s",
    transform: hovered ? "translateY(-2px) scale(1.03)" : "translateY(0) scale(1)",
    ...(primary ? {
      background: hovered ? "#ffffff" : "rgba(255,255,255,0.92)", color: "#000",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: hovered
        ? "0 0 0 1px rgba(255,255,255,0.4), 0 8px 30px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.12)"
        : "0 1px 0 rgba(255,255,255,0.5) inset, 0 2px 10px rgba(0,0,0,0.3)",
    } : {
      background: hovered ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)",
      color: hovered ? "rgba(240,240,240,1)" : "rgba(240,240,240,0.7)",
      border: `1px solid ${hovered ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.1)"}`,
      boxShadow: hovered
        ? "0 0 0 1px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.06)"
        : "0 1px 0 rgba(255,255,255,0.04) inset",
    }),
  };

  return (
    <a ref={btnRef} href={href} download={download} target="_blank" rel="noreferrer"
      style={baseStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onMouseMove={handleMouseMove}>
      {hovered && (
        <span style={{
          position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", zIndex: 1,
          background: primary
            ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)`
            : `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)`,
        }} />
      )}
      {hovered && (
        <span style={{
          position: "absolute", inset: "-1px", borderRadius: "inherit", pointerEvents: "none", zIndex: 0,
          border: primary ? "1px solid rgba(255,255,255,0.65)" : "1px solid rgba(255,255,255,0.25)",
          animation: "glowPulse 1.1s ease-out infinite",
        }} />
      )}
      <span style={{ position: "relative", zIndex: 2, display: "inherit", alignItems: "inherit", gap: "inherit" }}>
        {children}
      </span>
    </a>
  );
}

// ── Experience history card ───────────────────────────────────
function HistoryCard({ job, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef  = useRef(null);
  const [visible, setVisible] = useState(false);
  const fromLeft = index % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const year  = (job.period || "").match(/\d{4}/)?.[0] || "";
  const image = job.image || job.screenshot || null;
  const logo  = job.logo  || null;

  return (
    <div
      ref={cardRef}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateX(0)" : fromLeft ? "translateX(-60px)" : "translateX(60px)",
        transition: `opacity 0.8s ease ${index * 90}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 90}ms`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: "16px",
          overflow:     "hidden",
          border:       `1px solid ${hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)"}`,
          background:   hovered ? "rgba(20,20,20,0.98)" : "rgba(14,14,14,0.96)",
          boxShadow:    hovered
            ? "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06) inset"
            : "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset",
          transform:    hovered ? "translateY(-4px)" : "translateY(0)",
          transition:   "border-color 0.3s, background 0.3s, box-shadow 0.35s, transform 0.35s cubic-bezier(0.34,1.2,0.64,1)",
        }}
      >
        {/* ── Cover image area ── */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden", background: "linear-gradient(135deg, #111 0%, #181818 100%)" }}>

          {/* Ambient inner glow */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

          {/* Screenshot */}
          {image ? (
            <img
              src={`./images/myscreenshots/${image}`}
              alt={job.company}
              style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center",
                display: "block", position: "relative", zIndex: 0,
                transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                transform:  hovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          ) : (
            /* Decorative diagonal pattern fallback */
            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 28px, rgba(255,255,255,0.012) 28px, rgba(255,255,255,0.012) 29px)",
            }} />
          )}

          {/* Bottom gradient so logo/year are readable */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to top, rgba(14,14,14,0.95) 0%, rgba(14,14,14,0.35) 55%, transparent 100%)" }} />

          {/* Year — top left, large */}
          <div style={{
            position: "absolute", top: "14px", left: "16px", zIndex: 3,
            fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.03em", lineHeight: 1,
            color:      hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
            textShadow: hovered ? "0 0 40px rgba(255,255,255,0.3)" : "none",
            transition: "color 0.3s, text-shadow 0.3s",
            userSelect: "none",
          }}>
            {year}
          </div>

          {/* Type badge — top right */}
          {job.type && (
            <div style={{
              position: "absolute", top: "14px", right: "14px", zIndex: 3,
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "4px 10px", borderRadius: "9999px",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)",
            }}>
              {job.type}
            </div>
          )}

          {/* Logo / company name — bottom left over gradient */}
          <div style={{ position: "absolute", bottom: "14px", left: "16px", zIndex: 3, display: "flex", alignItems: "center" }}>
            {logo ? (
              <img src={logo} alt={job.company} style={{ height: "26px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.85 }} />
            ) : (
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "rgba(255,255,255,0.85)" }}>
                {job.company}
              </span>
            )}
          </div>
        </div>

        {/* ── Card body ── */}
        <div style={{ padding: "20px 22px 22px" }}>

          {/* Role + period */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", marginBottom: "12px" }}>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700,
              fontSize: "clamp(1rem, 2vw, 1.2rem)", letterSpacing: "-0.01em",
              color: hovered ? "#fff" : "rgba(240,240,240,0.9)", margin: 0, lineHeight: 1.2,
              transition: "color 0.25s",
            }}>
              {job.role}
            </h3>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "rgba(200,200,200,0.38)", whiteSpace: "nowrap", flexShrink: 0, marginTop: "2px" }}>
              {job.period}
            </span>
          </div>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(200,200,200,0.45)", margin: "0 0 14px" }}>
            {job.company}{job.location && <span style={{ color: "rgba(200,200,200,0.28)" }}> · {job.location}</span>}
          </p>

          {/* Bullets */}
          {job.bullets && job.bullets.length > 0 && (
            <ul style={{ margin: "0 0 16px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
              {job.bullets.slice(0, 3).map((b, i) => (
                <li key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem", color: "rgba(200,200,200,0.5)", lineHeight: 1.55, display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0, marginTop: "1px" }}>—</span>
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Stack */}
          {job.stack && job.stack.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {job.stack.map(t => (
                <span key={t} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.61rem", fontWeight: 500,
                  padding: "3px 9px", borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)",
                  background: "rgba(255,255,255,0.04)", letterSpacing: "0.03em",
                }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Scroll-reveal Experience ──────────────────────────────────
function ScrollExperience() {
  const sectionRef  = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "80px 20px 80px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          marginBottom: "40px",
          opacity:      headerVisible ? 1 : 0,
          transform:    headerVisible ? "translateY(0)" : "translateY(16px)",
          transition:   "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.67rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(240,240,240,0.22)", margin: "0 0 10px" }}>
            
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1, color: "rgba(240,240,240,0.92)", margin: 0 }}>
              History
            </h2>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "rgba(255,255,255,0.22)", lineHeight: 1, marginTop: "4px" }}>↘</span>
          </div>
        </div>

        {/* Card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px", alignItems: "start" }}>
          {experience.map((job, i) => (
            <HistoryCard key={i} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Project Row — alternating slide-in ────────────────────────
function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const rowRef   = useRef(null);
  const [visible, setVisible] = useState(false);

  // Even → slide from LEFT, Odd → slide from RIGHT
  const fromLeft = index % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (rowRef.current) obs.observe(rowRef.current);
    return () => obs.disconnect();
  }, []);

  const description = project.description || project.summary || "A full-stack project built with modern technologies, focused on clean architecture and great user experience.";
  const stack       = project.stack || project.tech || [];
  const year        = project.year || project.period || "2026";
  const org         = project.company || project.org || "";
  const link        = project.link || project.url || "#";

  return (
    <div
      ref={rowRef}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateX(0)" : fromLeft ? "translateX(-80px)" : "translateX(80px)",
        transition: `opacity 0.8s ease ${index * 60}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms`,
        borderTop:  "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      >
        {/* Title row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", padding: "28px 0 10px" }}>
          <div>
            <h3
              style={{
                fontFamily:    "'Playfair Display', Georgia, serif",
                fontWeight:    700,
                fontSize:      "clamp(1.4rem, 2.8vw, 2rem)",
                letterSpacing: "-0.01em",
                color:         hovered ? "#ffffff" : "rgba(240,240,240,0.88)",
                margin:        0,
                lineHeight:    1.15,
                transition:    "color 0.25s ease",
              }}
            >
              {project.title || project.name}
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 400, color: "rgba(200,200,200,0.45)", margin: "5px 0 0", letterSpacing: "0.01em" }}>
              {org && <span style={{ color: "rgba(200,200,200,0.7)", fontWeight: 500 }}>{org}</span>}
              {org && year && <span style={{ margin: "0 6px" }}>·</span>}
              {year}
              {(org || year) && " — "}
              <span>{project.tagline || project.subtitle || ""}</span>
            </p>
          </div>

          {/* Arrow button */}
          <a
            href={link} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "44px", height: "44px", borderRadius: "50%",
              border: `1px solid ${hovered ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}`,
              color: "rgba(255,255,255,0.6)", fontSize: "1.2rem", flexShrink: 0,
              marginTop: "2px", textDecoration: "none",
              transition: "border-color 0.25s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
            }}
          >→</a>
        </div>

        {/* Browser frame / image area */}
        <div style={{ position: "relative", borderRadius: "10px 10px 0 0", overflow: "hidden", border: `1px solid ${hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.09)"}`, borderBottom: "none", background: "#111", transition: "border-color 0.3s" }}>

          {/* Chrome titlebar */}
          <div style={{ height: "36px", background: "linear-gradient(180deg, #252525 0%, #1a1a1a 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", padding: "0 14px", gap: "7px" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "block" }} />
            <div style={{ display: "flex", gap: "6px", marginLeft: "10px" }}>
              {["←","→","↻"].map((icon, i) => <span key={i} style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>{icon}</span>)}
            </div>
            <div style={{ flex: 1, height: "20px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", margin: "0 8px" }} />
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>⋮</span>
          </div>

          {/* Content area — real project screenshot */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            {/* Actual project image */}
            <img
              src={project.image || project.screenshot
                ? `./images/myscreenshots/${project.image || project.screenshot}`
                : undefined}
              alt={project.title || project.name}
              style={{
                width:          "100%",
                height:         "auto",
                maxHeight:      "480px",
                objectFit:      "cover",
                objectPosition: "top center",
                display:        "block",
                transition:     "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                transform:      hovered ? "scale(1.03)" : "scale(1)",
              }}
              onError={e => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback — only shown if image 404s */}
            <div style={{ display: "none", height: "320px", background: "linear-gradient(145deg, #0e0e0e 0%, #141414 100%)", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "rgba(255,255,255,0.04)", letterSpacing: "-0.02em", textAlign: "center", padding: "0 24px" }}>
                {project.title || project.name}
              </span>
            </div>

            {/* Hover description panel — slides up from bottom of image */}
            <div
              style={{
                position:            "absolute",
                bottom:              0,
                left:                0,
                right:               0,
                background:          "rgba(10,10,10,0.93)",
                backdropFilter:      "blur(24px)",
                WebkitBackdropFilter:"blur(24px)",
                borderTop:           "1px solid rgba(255,255,255,0.1)",
                padding:             "20px 24px",
                transform:           hovered ? "translateY(0)" : "translateY(100%)",
                transition:          "transform 0.45s cubic-bezier(0.34,1.2,0.64,1)",
                zIndex:              10,
              }}
            >
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(220,220,220,0.8)", lineHeight: 1.65, margin: "0 0 14px" }}>{description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {stack.map(t => (
                  <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.67rem", fontWeight: 500, padding: "3px 10px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.06)", letterSpacing: "0.03em" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scroll-reveal Projects ────────────────────────────────────
function ScrollProjects() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "80px 20px 100px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "8px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.67rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(240,240,240,0.22)", margin: "0 0 10px" }}></p>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1, color: "rgba(240,240,240,0.92)", margin: 0 }}>
                Projects &amp; Contests
              </h2>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "rgba(255,255,255,0.22)", lineHeight: 1, marginTop: "4px" }}>↘</span>
            </div>
          </div>
          <NavLink
            to="/projects"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(200,200,200,0.5)", textDecoration: "none", borderBottom: "1px solid rgba(200,200,200,0.2)", paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s", marginBottom: "4px" }}
            onMouseEnter={e => { e.currentTarget.style.color = "rgba(240,240,240,0.9)"; e.currentTarget.style.borderColor = "rgba(240,240,240,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(200,200,200,0.5)"; e.currentTarget.style.borderColor = "rgba(200,200,200,0.2)"; }}
          >view all →</NavLink>
        </div>

        {/* Project rows */}
        <div style={{ overflow: "hidden" }}>
          {projects.map((project, i) => (
            <ProjectRow key={project.id || i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Hero ──────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div>
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "148px 20px 60px", overflow: "hidden" }}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:wght@300;400;500;600&display=swap" />

        <style>{`
          @keyframes framePop {
            0%   { opacity: 0; transform: translateY(60px) scale(0.94); }
            60%  { opacity: 1; transform: translateY(-6px) scale(1.01); }
            80%  { transform: translateY(3px) scale(0.995); }
            100% { transform: translateY(0) scale(1); }
          }
          @keyframes orbPulse {
            0%,100% { opacity: 1;    transform: translateX(-50%) scale(1);    }
            50%     { opacity: 0.65; transform: translateX(-50%) scale(0.92); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes cursorBlink {
            0%, 100% { opacity: 1; }
            50%      { opacity: 0; }
          }
          @keyframes glowPulse {
            0%   { opacity: 0.9; transform: scale(1); }
            100% { opacity: 0;   transform: scale(1.14); }
          }
        `}</style>

        {/* Page-level orb glow */}
        <div style={{ position: "absolute", top: "100px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 45%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0, animation: "orbPulse 6s ease-in-out infinite" }} />

        {/* macOS frame */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1180px", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 0 0 1px rgba(255,255,255,0.05) inset, 0 40px 130px rgba(0,0,0,0.9), 0 0 100px rgba(255,255,255,0.05)", background: "rgba(13,13,13,0.97)", animation: "framePop 1.1s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "0.1s" }}>

          {/* Title bar */}
          <div style={{ height: "44px", background: "linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", padding: "0 16px", gap: "8px" }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block", flexShrink: 0 }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e", display: "block", flexShrink: 0 }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f", display: "block", flexShrink: 0 }} />
            <div style={{ marginLeft: "auto", width: "22px", height: "22px", borderRadius: "5px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontSize: "16px", lineHeight: 1, flexShrink: 0 }}>+</div>
          </div>

          {/* Frame body */}
          <div style={{ padding: "clamp(52px, 7vw, 88px) clamp(32px, 5.5vw, 72px) clamp(52px, 7vw, 88px)", minHeight: "500px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>

            {/* Inner orb glow */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "85%", height: "85%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.035) 40%, transparent 70%)", filter: "blur(48px)", pointerEvents: "none", zIndex: 0 }} />

            {/* Headline */}
            <div style={{ position: "relative", zIndex: 1, animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "0.35s" }}>
              <TypingHeadline />
            </div>

            {/* Bottom row */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px", position: "relative", zIndex: 1, marginTop: "clamp(36px, 6vw, 64px)", animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "0.55s" }}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ maxWidth: "380px", textAlign: "left" }}>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.85rem, 1.6vw, 1rem)", fontWeight: 500, color: "rgba(240,240,240,0.9)", margin: "0 0 4px 0", lineHeight: 1.5 }}>
                    Computer Science student at <span style={{ color: "rgba(240,240,240,0.9)" }}>Mapúa University.</span>
                  </p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(0.78rem, 1.4vw, 0.9rem)", fontWeight: 400, color: "rgba(200,200,200,0.5)", margin: 0, lineHeight: 1.5 }}>
                    Formerly at CloudSwyft. Based in San Pedro, Laguna.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                <GlowButton href="https://github.com/RedzerRiley" primary>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  github ↗
                </GlowButton>
                <GlowButton href="https://www.linkedin.com/in/redzer-monsod-bb4309296/">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  linkedin ↗
                </GlowButton>
                <GlowButton href="https://www.facebook.com/redzer.monsod.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  facebook ↗
                </GlowButton>
                <GlowButton href={resumePdf} download="Redzer_Monsod_Resume.pdf">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  resume ↗
                </GlowButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollExperience />
      <ScrollProjects />
    </div>
  );
}