import { useState, useEffect, useRef } from "react";
import { projects } from "../data/index.js";

/* ─────────────────────────────────────────────────────────────
   ProjectsPage
   Full-page grid of project cards matching the portfolio theme.
   Each card: screenshot · title · description · stack · live + repo links
   Alternating slide-in with blur un-reveal on scroll.
───────────────────────────────────────────────────────────── */

// ── Icons ─────────────────────────────────────────────────────
const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const IconGithub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
      { threshold: 0.15 }
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
        filter:     visible ? "blur(0px)" : "blur(12px)",
        transform:  visible 
                      ? "translate(0, 0) scale(1)" 
                      : fromLeft 
                        ? "translate(-40px, 40px) scale(0.95)" 
                        : "translate(40px, 40px) scale(0.95)",
        transition: `all 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${index * 80}ms`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: "24px",
          overflow:     "hidden",
          border:       `1px solid ${hovered ? "rgba(255,255,255,0.16)" : featured ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)"}`,
          background:   hovered ? "rgba(30, 30, 30, 0.7)" : "rgba(20, 20, 20, 0.5)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:    hovered
            ? "0 24px 48px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)"
            : featured
              ? "0 16px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.08)"
              : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05)",
          transform:    hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
          transition:   "all 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
          position:     "relative",
          display:      "flex",
          flexDirection:"column",
          height:       "100%",
        }}
      >
        {/* FEATURED badge */}
        {featured && (
          <div style={{
            position:      "absolute",
            top:           0,
            left:          "24px",
            zIndex:        20,
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      "0.6rem",
            fontWeight:    700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding:       "6px 14px",
            background:    "rgba(255,255,255,0.95)",
            color:         "#000000",
            borderRadius:  "0 0 10px 10px",
            boxShadow:     "0 4px 12px rgba(0,0,0,0.3)",
          }}>
            Featured
          </div>
        )}

        {/* ── Cover image ── */}
        <div style={{ position: "relative", height: "240px", overflow: "hidden", background: "linear-gradient(135deg, #111 0%, #1a1a1a 100%)", flexShrink: 0 }}>
          
          {/* Ambient glow */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />

          {image ? (
            <img
              src={`./images/myscreenshots/${image}`}
              alt={project.title || project.name}
              style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center",
                display: "block", position: "relative", zIndex: 0,
                transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                transform:  hovered ? "scale(1.06)" : "scale(1)",
              }}
            />
          ) : (
            /* Diagonal pattern fallback */
            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 28px, rgba(255,255,255,0.02) 28px, rgba(255,255,255,0.02) 29px)",
            }}>
              {/* Project name watermark */}
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "rgba(255,255,255,0.05)",
                letterSpacing: "-0.02em", textAlign: "center", padding: "0 24px",
                userSelect: "none",
              }}>
                {project.title || project.name}
              </div>
            </div>
          )}

          {/* Bottom gradient */}
          <div style={{ position: "absolute", inset: 0, top: "40%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(to top, rgba(20,20,20,1) 0%, transparent 100%)" }} />

          {/* Year — top right (Moved from left so it doesn't clash with featured badge) */}
          {year && (
            <div style={{
              position: "absolute", top: "16px", right: "20px", zIndex: 3,
              fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.03em", lineHeight: 1,
              color:      hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
              textShadow: hovered ? "0 4px 24px rgba(0,0,0,0.5)" : "none",
              transition: "color 0.4s, text-shadow 0.4s",
              userSelect: "none",
            }}>
              {year}
            </div>
          )}

          {/* Stack preview — bottom of image */}
          <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px", zIndex: 3, display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {stack.slice(0, 4).map(t => (
              <span key={t} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600,
                padding: "4px 10px", borderRadius: "8px",
                background: "rgba(20,20,20,0.6)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)",
                letterSpacing: "0.03em",
              }}>
                {t}
              </span>
            ))}
            {stack.length > 4 && (
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600,
                padding: "4px 10px", borderRadius: "8px",
                background: "rgba(20,20,20,0.6)", border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)", backdropFilter: "blur(12px)",
              }}>
                +{stack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* ── Card body ── */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>

          {/* Title */}
          <h3 style={{
            fontFamily:    "'Playfair Display', Georgia, serif",
            fontWeight:    800,
            fontSize:      "clamp(1.2rem, 2vw, 1.5rem)",
            letterSpacing: "-0.01em",
            color:         hovered ? "#ffffff" : "rgba(240,240,240,0.9)",
            margin:        "0 0 12px",
            lineHeight:    1.2,
            transition:    "color 0.3s ease",
          }}>
            {project.title || project.name}
          </h3>

          {/* Description */}
          {description && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize:   "0.85rem",
              color:      "rgba(200,200,200,0.6)",
              lineHeight: 1.7,
              margin:     "0 0 24px",
              flex:       1,
            }}>
              {description}
            </p>
          )}

          {/* ── Action buttons — Live Demo + Repo ── */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "auto" }}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           "8px",
                  padding:       "10px 18px",
                  borderRadius:  "9999px",
                  background:    hovered ? "#ffffff" : "rgba(255,255,255,0.9)",
                  color:         "#000000",
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "0.75rem",
                  fontWeight:    700,
                  textDecoration:"none",
                  border:        "1px solid transparent",
                  boxShadow:     "0 2px 12px rgba(255,255,255,0.15), inset 0 1px 1px rgba(255,255,255,1)",
                  transition:    "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                  whiteSpace:    "nowrap",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform   = "translateY(-2px)";
                  e.currentTarget.style.boxShadow   = "0 6px 20px rgba(255,255,255,0.25), inset 0 1px 1px rgba(255,255,255,1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform   = "translateY(0)";
                  e.currentTarget.style.boxShadow   = "0 2px 12px rgba(255,255,255,0.15), inset 0 1px 1px rgba(255,255,255,1)";
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
                  gap:           "8px",
                  padding:       "10px 18px",
                  borderRadius:  "9999px",
                  background:    "rgba(255,255,255,0.06)",
                  color:         "rgba(240,240,240,0.8)",
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "0.75rem",
                  fontWeight:    600,
                  textDecoration:"none",
                  border:        "1px solid rgba(255,255,255,0.12)",
                  boxShadow:     "inset 0 1px 1px rgba(255,255,255,0.05)",
                  transition:    "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                  whiteSpace:    "nowrap",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.color       = "#ffffff";
                  e.currentTarget.style.background  = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform   = "translateY(-2px)";
                  e.currentTarget.style.boxShadow   = "0 6px 16px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color       = "rgba(240,240,240,0.8)";
                  e.currentTarget.style.background  = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.transform   = "translateY(0)";
                  e.currentTarget.style.boxShadow   = "inset 0 1px 1px rgba(255,255,255,0.05)";
                }}
              >
                <IconGithub /> Repo
              </a>
            )}

            {/* Neither link available */}
            {!liveUrl && !repoUrl && (
              <span style={{
                fontFamily:    "'DM Sans', monospace",
                fontSize:      "0.7rem",
                color:         "rgba(200,200,200,0.3)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding:       "10px 0",
              }}>
                Links coming soon
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
    <div style={{ minHeight: "100vh", padding: "140px 24px 120px", position: "relative", overflow: "hidden" }}>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap" />

      <style>{`
        @keyframes orbDrift {
          0%,100% { transform: translateX(-50%) scale(1);    opacity: 0.7; }
          50%     { transform: translateX(-50%) scale(0.95); opacity: 0.4; }
        }
        @keyframes blurFadeUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        .header-item {
          opacity: 0;
          animation: blurFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .header-item:nth-child(1) { animation-delay: 0.1s; }
        .header-item:nth-child(2) { animation-delay: 0.2s; }
        .header-item:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      {/* Page ambient glow */}
      <div style={{
        position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 60%)",
        filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        animation: "orbDrift 8s ease-in-out infinite",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Page headline ── */}
        <div ref={headRef} style={{ marginBottom: "80px" }}>
          {headVis && (
            <>
              <div className="header-item" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <span style={{
                  fontFamily: "'DM Sans', monospace", fontSize: "0.65rem", letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.2)", textTransform: "uppercase"
                }}>
                  Selected Work
                </span>
                <div style={{ height: "1px", width: "40px", background: "rgba(255,255,255,0.1)" }} />
              </div>
              
              <div className="header-item" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <h1 style={{
                  fontFamily:    "'Playfair Display', Georgia, serif",
                  fontWeight:    800,
                  fontSize:      "clamp(3.5rem, 8vw, 6rem)",
                  letterSpacing: "-0.02em",
                  lineHeight:    1,
                  color:         "#ffffff",
                  margin:        0,
                  textShadow:    "0 4px 24px rgba(255,255,255,0.15)"
                }}>
                  Projects
                </h1>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize:   "clamp(2rem, 4vw, 3rem)",
                  color:      "rgba(255,255,255,0.2)",
                  lineHeight: 1, marginTop: "8px",
                }}>
                  ↘
                </span>
              </div>
              
              <p className="header-item" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
                color: "rgba(200,200,200,0.6)", margin: "24px 0 0",
                maxWidth: "480px", lineHeight: 1.7,
              }}>
                A collection of things I've built, ranging from academic coursework to personal experiments and full-stack applications.
              </p>
            </>
          )}
        </div>

        {/* ── Project grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: "32px",
          alignItems: "stretch", // Ensures cards stretch to equal height in their row
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id || i} project={project} index={i} />
          ))}
        </div>

        {/* ── WIP card ── */}
        <div style={{
          marginTop:      "48px",
          borderRadius:   "24px",
          border:         "1px dashed rgba(255,255,255,0.15)",
          background:     "rgba(20,20,20,0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding:        "64px 24px",
          textAlign:      "center",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            "12px",
          boxShadow:      "inset 0 1px 1px rgba(255,255,255,0.05)",
          transition:     "background 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(30,30,30,0.6)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(20,20,20,0.4)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
        }}
        >
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.4)", fontSize: "1.2rem", marginBottom: "8px"
          }}>
            ✦
          </div>
          <span style={{ fontFamily: "'DM Sans', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
            More coming soon
          </span>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "1.4rem", color: "rgba(240,240,240,0.8)", margin: 0 }}>
            Currently building new things.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(200,200,200,0.5)", margin: 0 }}>
            Stay tuned — updates dropping soon.
          </p>
        </div>

      </div>
    </div>
  );
}