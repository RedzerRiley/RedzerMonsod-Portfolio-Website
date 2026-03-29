import { useState, useEffect } from "react";
import { education, skills } from "../data/index.js";

// ── Simple icon via CDN ───────────────────────────────────────
function SimpleIcon({ slug, color, size = 18 }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: size, height: size, fontSize: size * 0.42,
        fontFamily: "'DM Sans', monospace", fontWeight: 700,
        color, textTransform: "uppercase", letterSpacing: "-0.04em", opacity: 0.85,
      }}>
        {slug.slice(0, 2)}
      </span>
    );
  }
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
      alt={slug} width={size} height={size}
      onError={() => setErrored(true)}
      style={{ display: "block", flexShrink: 0, transition: "transform 0.3s ease" }}
    />
  );
}

// ── Skill Card ────────────────────────────────────────────────
function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="stagger-enter"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay:  `${(index * 25) + 300}ms`,
        position:        "relative",
        display:         "flex",
        alignItems:      "center",
        gap:             12,
        padding:         "12px 16px",
        borderRadius:    "14px",
        cursor:          "default",
        background:      hovered ? "rgba(30, 30, 30, 0.8)" : "rgba(20, 20, 20, 0.4)",
        border:          `1px solid ${hovered ? skill.color + "55" : "rgba(255,255,255,0.06)"}`,
        boxShadow:       hovered ? `0 8px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)` : "none",
        transform:       hovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        transition:      "all 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        overflow:        "hidden",
      }}
    >
      {/* Background ambient glow on hover */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, opacity: 0.15,
          background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)`,
          pointerEvents: "none", zIndex: 0
        }} />
      )}

      <div style={{
        flexShrink: 0, width: 34, height: 34, borderRadius: "10px",
        background: hovered ? `${skill.color}15` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? skill.color + "40" : "rgba(255,255,255,0.05)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        zIndex: 1,
      }}>
        <SimpleIcon slug={skill.icon} color={hovered ? skill.color : "rgba(255,255,255,0.4)"} size={16} />
      </div>

      <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600,
          color: hovered ? "#ffffff" : "rgba(220,220,220,0.8)", 
          transition: "color 0.3s ease",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: 0,
        }}>
          {skill.name}
        </p>
        <p style={{
          fontFamily: "'DM Sans', monospace", fontSize: "0.58rem", 
          color: "rgba(160,160,160,0.5)",
          marginTop: 3, letterSpacing: "0.08em", textTransform: "uppercase", margin: "2px 0 0 0"
        }}>
          {skill.category}
        </p>
      </div>
    </div>
  );
}

// ── Info card ─────────────────────────────────────────────────
function InfoCard({ label, val, icon, index }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="stagger-enter"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 80}ms`,
        padding: "18px 20px", 
        border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`, 
        borderRadius: "16px",
        background: hovered ? "rgba(30, 30, 30, 0.6)" : "rgba(20, 20, 20, 0.4)", 
        backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column", gap: 10,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <span style={{ 
        color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)", 
        display: "flex",
        transition: "color 0.3s ease",
      }}>
        {icon}
      </span>
      <div>
        <p style={{ 
          fontFamily: "'DM Sans', monospace", fontSize: "0.62rem", 
          color: "rgba(180,180,180,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", 
          margin: "0 0 4px 0" 
        }}>
          {label}
        </p>
        <p style={{ 
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, 
          color: hovered ? "#ffffff" : "rgba(240,240,240,0.9)", 
          wordBreak: "break-all", margin: 0,
          transition: "color 0.3s ease",
        }}>
          {val}
        </p>
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────
const infoCards = [
  {
    label: "university", val: "Mapúa University",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
  {
    label: "degree", val: "BS Computer Science",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    label: "location", val: "San Pedro, Laguna, PH",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
  {
    label: "email", val: "redzerriley@gmail.com",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  },
  {
    label: "status", val: "Open for work",
    icon: (
      <div style={{ display: "flex", alignItems: "center", height: "18px" }}>
        <div style={{ position: "relative", width: 12, height: 12, flexShrink: 0 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 12px rgba(16,185,129,0.8)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#10b981", animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite", opacity: 0.6 }} />
        </div>
      </div>
    ),
  },
];

const skillCategories = ["All", "Frontend", "Backend", "Database", "Cloud", "DevOps"];

// ── Page ──────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeSkillCat, setActiveSkillCat] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredSkills = activeSkillCat === "All"
    ? skills
    : skills.filter(s => s.category === activeSkillCat);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "120px", position: "relative", overflow: "hidden" }}>
      
      {/* Ambient background blur/glow */}
      <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes blurFadeUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        .about-section {
          opacity: 0;
          animation: blurFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          position: relative;
          z-index: 1;
        }
        .about-section:nth-child(1) { animation-delay: 0.1s; }
        .about-section:nth-child(2) { animation-delay: 0.2s; }
        .about-section:nth-child(3) { animation-delay: 0.3s; }
        .about-section:nth-child(4) { animation-delay: 0.4s; }
        .about-section:nth-child(5) { animation-delay: 0.5s; }
        
        .stagger-enter {
          opacity: 0;
          animation: blurFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div style={{ maxWidth: "880px", margin: "0 auto", padding: "140px 24px 0" }}>

        {/* ── 1. Photo + Identity hero ── */}
        <div className="about-section" style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "36px" }}>

            {/* Photo Squirkle */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: "130px", height: "130px", borderRadius: "32px", overflow: "hidden", // iOS style rounding
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)",
                background: "rgba(20,20,20,0.8)",
                backdropFilter: "blur(20px)",
              }}>
                <img
                  src="./images/profile.jpg"
                  alt="Redzer Monsod"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  onError={e => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.style.display = "flex";
                    e.currentTarget.parentElement.style.alignItems = "center";
                    e.currentTarget.parentElement.style.justifyContent = "center";
                    e.currentTarget.parentElement.innerHTML =
                      `<span style="font-family:'Playfair Display', serif;font-size:2.5rem;font-weight:700;color:rgba(255,255,255,0.15)">RM</span>`;
                  }}
                />
              </div>
              {/* Online indicator */}
              <div style={{
                position: "absolute", bottom: "4px", right: "4px",
                width: "18px", height: "18px", borderRadius: "50%",
                background: "#10b981", boxShadow: "0 0 12px rgba(16,185,129,0.6)",
                border: "3px solid #0a0a0a", // Match page background
              }} />
            </div>

            {/* Name + role */}
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4rem)",
                letterSpacing: "-0.02em", lineHeight: 1.05,
                color: "#ffffff", margin: "0 0 12px",
                textShadow: "0 4px 24px rgba(255,255,255,0.15)"
              }}>
                Redzer Riley<br />
                <em style={{ fontStyle: "italic", color: "rgba(200,200,200,0.5)", fontWeight: 700 }}>
                  Monsod
                </em>
              </h1>
              <p style={{
                fontFamily: "'DM Sans', monospace", fontSize: "0.8rem", fontWeight: 500,
                color: "rgba(200,200,200,0.6)", letterSpacing: "0.1em",
                textTransform: "uppercase", margin: 0,
              }}>
                Fullstack Developer · CS Student · Mapúan
              </p>
            </div>
          </div>
        </div>

        {/* ── 2. Bio ── */}
        <div className="about-section" style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <span style={{
              fontFamily: "'DM Sans', monospace", fontSize: "0.65rem", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.2)",
            }}>
              01
            </span>
            <div style={{ height: "1px", width: "40px", background: "rgba(255,255,255,0.1)" }} />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.4rem", fontWeight: 700, color: "rgba(240,240,240,0.9)", margin: 0, letterSpacing: "-0.01em"
            }}>
              Background
            </h2>
          </div>

          <div style={{ display: "grid", gap: "20px", maxWidth: "680px" }}>
            {[
              `I'm currently enrolled in <strong>BS Computer Science at Mapúa University</strong> after transferring from BS Physics — that background sharpened the way I approach systems and problem decomposition.`,
              `My internship at <strong>Cloudswyft</strong> put me in a real production environment: debugging Open edX deployments, designing ERDs, and frontend development.`,
              `I care deeply about clean architecture, code quality, and structure. Currently exploring DevOps and cloud-native patterns.`,
            ].map((html, i) => (
              <p key={i}
                style={{ 
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, 
                  color: "rgba(200,200,200,0.7)", margin: 0 
                }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </div>
        </div>

        {/* ── 3. Info cards ── */}
        <div className="about-section" style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <span style={{
              fontFamily: "'DM Sans', monospace", fontSize: "0.65rem", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.2)",
            }}>
              02
            </span>
            <div style={{ height: "1px", width: "40px", background: "rgba(255,255,255,0.1)" }} />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.4rem", fontWeight: 700, color: "rgba(240,240,240,0.9)", margin: 0, letterSpacing: "-0.01em"
            }}>
              Details
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "16px",
          }}>
            {mounted && infoCards.map(({ label, val, icon }, i) => (
              <InfoCard key={label} label={label} val={val} icon={icon} index={i} />
            ))}
          </div>
        </div>

        {/* ── 4. Education ── */}
        <div className="about-section" style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <span style={{
              fontFamily: "'DM Sans', monospace", fontSize: "0.65rem", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.2)",
            }}>
              03
            </span>
            <div style={{ height: "1px", width: "40px", background: "rgba(255,255,255,0.1)" }} />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.4rem", fontWeight: 700, color: "rgba(240,240,240,0.9)", margin: 0, letterSpacing: "-0.01em"
            }}>
              Education
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {education.map((edu) => (
              <div key={edu.course} style={{
                padding: "24px",
                border: `1px solid ${edu.active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "16px",
                background: edu.active ? "rgba(30, 30, 30, 0.6)" : "rgba(20, 20, 20, 0.4)",
                backdropFilter: "blur(20px)",
                display: "flex", alignItems: "flex-start", gap: "18px",
                boxShadow: edu.active ? "inset 0 1px 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.2)" : "none",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ 
                  fontSize: "1.6rem", flexShrink: 0, width: "44px", height: "44px", 
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {edu.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#ffffff", margin: 0 }}>
                    {edu.course}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(200,200,200,0.6)", margin: 0 }}>
                    {edu.school} · {edu.location}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                    <p style={{ fontFamily: "'DM Sans', monospace", fontSize: "0.65rem", color: edu.active ? "#10b981" : "rgba(160,160,160,0.5)", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {edu.period}
                    </p>
                    {edu.active && (
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "2px 8px", borderRadius: "9999px", fontWeight: 600 }}>
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Skills ── */}
        <div className="about-section">
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <span style={{
              fontFamily: "'DM Sans', monospace", fontSize: "0.65rem", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.2)",
            }}>
              04
            </span>
            <div style={{ height: "1px", width: "40px", background: "rgba(255,255,255,0.1)" }} />
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.4rem", fontWeight: 700, color: "rgba(240,240,240,0.9)", margin: 0, letterSpacing: "-0.01em"
            }}>
              Skills
            </h2>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "28px" }}>
            {skillCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveSkillCat(cat)}
                style={{
                  fontFamily:    "'DM Sans', sans-serif",
                  fontSize:      "0.7rem",
                  fontWeight:    activeSkillCat === cat ? 600 : 500,
                  letterSpacing: "0.04em",
                  padding:       "8px 18px",
                  borderRadius:  "9999px",
                  border:        `1px solid ${activeSkillCat === cat ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.1)"}`,
                  background:    activeSkillCat === cat ? "#ffffff" : "rgba(20,20,20,0.5)",
                  color:         activeSkillCat === cat ? "#000000" : "rgba(200,200,200,0.6)",
                  cursor:        "pointer",
                  transition:    "all 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                  boxShadow:     activeSkillCat === cat ? "0 4px 14px rgba(255,255,255,0.25)" : "none",
                }}
                onMouseEnter={e => {
                  if (activeSkillCat !== cat) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={e => {
                  if (activeSkillCat !== cat) {
                    e.currentTarget.style.background = "rgba(20,20,20,0.5)";
                    e.currentTarget.style.color = "rgba(200,200,200,0.6)";
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
          }}>
            {/* Added a key tied to activeSkillCat to re-trigger stagger animations on filter switch */}
            {mounted && filteredSkills.map((skill, i) => (
              <SkillCard key={`${activeSkillCat}-${skill.name}`} skill={skill} index={i} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}