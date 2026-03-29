import { useState, useEffect, useRef } from "react";
import { projects } from "../data/index.js";

/* ─────────────────────────────────────────────────────────────
   ProjectsPage
   Full-page grid of project cards matching the portfolio theme.
   Each card: screenshot · title · description · stack · live + repo links
   Alternating slide-in on scroll.
───────────────────────────────────────────────────────────── */

// ── Icons ─────────────────────────────────────────────────────
const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const IconGithub = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

// ── Single project card ───────────────────────────────────────
function ProjectCard({ project, index }) {
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

  const image       = project.image || project.screenshot || null;
  const stack       = project.stack || project.tech || [];
  const description = project.description || project.summary || "";
  const liveUrl     = project.link || project.live || project.url || null;
  const repoUrl     = project.repo || project.github || null;
  const year        = project.year || (project.period || "").match(/\d{4}/)?.[0] || "";
  const featured    = index === 0;

  return (
    <div
      ref={cardRef}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateX(0)" : fromLeft ? "translateX(-64px)" : "translateX(64px)",
        transition: `opacity 0.8s ease ${index * 70}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: "16px",
          overflow:     "hidden",
          border:       `1px solid ${hovered ? "rgba(255,255,255,0.16)" : featured ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)"}`,
          background:   hovered ? "rgba(20,20,20,0.98)" : "rgba(14,14,14,0.96)",
          boxShadow:    hovered
            ? "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06) inset"
            : featured
              ? "0 12px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05) inset"
              : "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset",
          transform:    hovered ? "translateY(-4px)" : "translateY(0)",
          transition:   "border-color 0.3s, background 0.3s, box-shadow 0.35s, transform 0.35s cubic-bezier(0.34,1.2,0.64,1)",
          position:     "relative",
        }}
      >
        {/* FEATURED badge */}
        {featured && (
          <div style={{
            position:      "absolute",
            top:           0,
            left:          "20px",
            zIndex:        20,
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      "0.56rem",
            fontWeight:    700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding:       "3px 10px",
            background:    "rgba(240,240,240,0.92)",
            color:         "#000",
            borderRadius:  "0 0 6px 6px",
          }}>
            Featured
          </div>
        )}

        {/* ── Cover image ── */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden", background: "linear-gradient(135deg, #111 0%, #181818 100%)" }}>

          {/* Ambient glow */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

          {image ? (
            <img
              src={`./images/myscreenshots/${image}`}
              alt={project.title || project.name}
              style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center",
                display: "block", position: "relative", zIndex: 0,
                transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                transform:  hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
          ) : (
            /* Diagonal pattern fallback */
            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 28px, rgba(255,255,255,0.012) 28px, rgba(255,255,255,0.012) 29px)",
            }}>
              {/* Project name watermark */}
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "rgba(255,255,255,0.04)",
                letterSpacing: "-0.02em", textAlign: "center", padding: "0 24px",
                userSelect: "none",
              }}>
                {project.title || project.name}
              </div>
            </div>
          )}

          {/* Bottom gradient */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to top, rgba(14,14,14,0.9) 0%, transparent 60%)" }} />

          {/* Year — top left */}
          {year && (
            <div style={{
              position: "absolute", top: "14px", left: "16px", zIndex: 3,
              fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", letterSpacing: "-0.03em", lineHeight: 1,
              color:      hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
              textShadow: hovered ? "0 0 32px rgba(255,255,255,0.28)" : "none",
              transition: "color 0.3s, text-shadow 0.3s",
              userSelect: "none",
            }}>
              {year}
            </div>
          )}

          {/* Stack preview — bottom of image */}
          <div style={{ position: "absolute", bottom: "12px", left: "14px", right: "14px", zIndex: 3, display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {stack.slice(0, 4).map(t => (
              <span key={t} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500,
                padding: "2px 8px", borderRadius: "9999px",
                background: "rgba(10,10,10,0.7)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)",
                letterSpacing: "0.03em",
              }}>
                {t}
              </span>
            ))}
            {stack.length > 4 && (
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem",
                padding: "2px 8px", borderRadius: "9999px",
                background: "rgba(10,10,10,0.7)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.35)", backdropFilter: "blur(8px)",
              }}>
                +{stack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* ── Card body ── */}
        <div style={{ padding: "20px 22px 22px" }}>

          {/* Title */}
          <h3 style={{
            fontFamily:    "'Playfair Display', Georgia, serif",
            fontWeight:    700,
            fontSize:      "clamp(1.05rem, 2vw, 1.25rem)",
            letterSpacing: "-0.01em",
            color:         hovered ? "#fff" : "rgba(240,240,240,0.9)",
            margin:        "0 0 8px",
            lineHeight:    1.2,
            transition:    "color 0.25s",
          }}>
            {project.title || project.name}
          </h3>

          {/* Description */}
          {description && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize:   "0.78rem",
              color:      "rgba(200,200,200,0.5)",
              lineHeight: 1.65,
              margin:     "0 0 18px",
            }}>
              {description}
            </p>
          )}

          {/* Full stack */}
          {stack.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "18px" }}>
              {stack.map(t => (
                <span key={t} style={{
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "0.61rem",
                  fontWeight:    500,
                  padding:       "3px 9px",
                  borderRadius:  "9999px",
                  border:        "1px solid rgba(255,255,255,0.1)",
                  color:         "rgba(255,255,255,0.42)",
                  background:    "rgba(255,255,255,0.04)",
                  letterSpacing: "0.03em",
                }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* ── Action buttons — Live Demo + Repo ── */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           "6px",
                  padding:       "7px 14px",
                  borderRadius:  "9999px",
                  background:    hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)",
                  color:         "#000",
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "0.72rem",
                  fontWeight:    600,
                  textDecoration:"none",
                  border:        "1px solid rgba(255,255,255,0.2)",
                  boxShadow:     "0 1px 0 rgba(255,255,255,0.5) inset, 0 2px 8px rgba(0,0,0,0.25)",
                  transition:    "background 0.2s, transform 0.2s, box-shadow 0.2s",
                  whiteSpace:    "nowrap",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = "#ffffff";
                  e.currentTarget.style.transform   = "translateY(-1px)";
                  e.currentTarget.style.boxShadow   = "0 1px 0 rgba(255,255,255,0.5) inset, 0 6px 16px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)";
                  e.currentTarget.style.transform   = "translateY(0)";
                  e.currentTarget.style.boxShadow   = "0 1px 0 rgba(255,255,255,0.5) inset, 0 2px 8px rgba(0,0,0,0.25)";
                }}
              >
                <IconExternal /> Live Demo
              </a>
            )}

            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           "6px",
                  padding:       "7px 14px",
                  borderRadius:  "9999px",
                  background:    "rgba(255,255,255,0.05)",
                  color:         "rgba(240,240,240,0.65)",
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "0.72rem",
                  fontWeight:    500,
                  textDecoration:"none",
                  border:        "1px solid rgba(255,255,255,0.1)",
                  boxShadow:     "0 1px 0 rgba(255,255,255,0.04) inset",
                  transition:    "border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s",
                  whiteSpace:    "nowrap",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.24)";
                  e.currentTarget.style.color       = "rgba(240,240,240,1)";
                  e.currentTarget.style.background  = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.transform   = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color       = "rgba(240,240,240,0.65)";
                  e.currentTarget.style.background  = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform   = "translateY(0)";
                }}
              >
                <IconGithub /> Repo
              </a>
            )}

            {/* Neither link available */}
            {!liveUrl && !repoUrl && (
              <span style={{
                fontFamily:    "'DM Sans', sans-serif",
                fontSize:      "0.68rem",
                color:         "rgba(200,200,200,0.25)",
                fontStyle:     "italic",
                letterSpacing: "0.02em",
              }}>
                links coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function ProjectsPage() {
  const headRef = useRef(null);
  const [headVis, setHeadVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeadVis(true); },
      { threshold: 0.1 }
    );
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px 100px", position: "relative", overflow: "hidden" }}>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:wght@300;400;500;600&display=swap" />

      <style>{`
        @keyframes orbDrift {
          0%,100% { transform: translateX(-50%) scale(1);    opacity: 0.9; }
          50%     { transform: translateX(-50%) scale(0.93); opacity: 0.6; }
        }
      `}</style>

      {/* Page ambient glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "420px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        animation: "orbDrift 7s ease-in-out infinite",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Page headline ── */}
        <div
          ref={headRef}
          style={{
            marginBottom: "60px",
            opacity:      headVis ? 1 : 0,
            transform:    headVis ? "translateY(0)" : "translateY(-20px)",
            transition:   "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.67rem",
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(240,240,240,0.22)", margin: "0 0 12px",
          }}>
            selected work
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <h1 style={{
              fontFamily:    "'Playfair Display', Georgia, serif",
              fontWeight:    800,
              fontSize:      "clamp(3rem, 7vw, 6rem)",
              letterSpacing: "-0.02em",
              lineHeight:    1,
              color:         "rgba(240,240,240,0.92)",
              margin:        0,
            }}>
              Projects
            </h1>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize:   "clamp(1.4rem, 3vw, 2.4rem)",
              color:      "rgba(255,255,255,0.22)",
              lineHeight: 1, marginTop: "6px",
            }}>
              ↘
            </span>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
            color: "rgba(200,200,200,0.38)", margin: "14px 0 0",
            maxWidth: "400px", lineHeight: 1.65,
          }}>
            A collection of things I've built from school work to personal experiments.
          </p>
        </div>

        {/* ── Project grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "22px",
          alignItems: "start",
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id || i} project={project} index={i} />
          ))}
        </div>

        {/* ── WIP card ── */}
        <div style={{
          marginTop:     "28px",
          borderRadius:  "16px",
          border:        "1px dashed rgba(255,255,255,0.08)",
          background:    "rgba(14,14,14,0.6)",
          padding:       "48px 24px",
          textAlign:     "center",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "8px",
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>
            more coming soon
          </span>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.1rem", color: "rgba(240,240,240,0.35)", margin: 0 }}>
            Currently building new things.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(200,200,200,0.22)", margin: 0 }}>
            Stay tuned — updates dropping soon.
          </p>
        </div>

      </div>
    </div>
  );
}