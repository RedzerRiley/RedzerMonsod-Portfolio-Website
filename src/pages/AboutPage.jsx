import { useState } from "react";
import { education, skills } from "../data/index.js";

// ── Simple icon via CDN ───────────────────────────────────────
function SimpleIcon({ slug, color, size = 18 }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: size, height: size, fontSize: size * 0.42,
        fontFamily: "var(--font-mono)", fontWeight: 700,
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
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}

// ── Skill Card ────────────────────────────────────────────────
function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay:  `${index * 35}ms`,
        borderColor:     hovered ? skill.color + "55" : "var(--border)",
        background:      hovered ? "var(--bg-hover)" : "var(--bg-card)",
        transition:      "border-color .22s, background .22s, box-shadow .22s",
        boxShadow:       hovered ? `0 0 0 1px ${skill.color}22, 0 8px 32px rgba(0,0,0,0.5)` : "none",
        padding:         "12px 14px",
        display:         "flex",
        alignItems:      "center",
        gap:             10,
        border:          "1px solid var(--border)",
        borderRadius:    "var(--radius)",
        cursor:          "default",
      }}
    >
      <div style={{
        flexShrink: 0, width: 32, height: 32, borderRadius: "var(--radius-sm)",
        background: hovered ? `${skill.color}18` : "var(--bg-surface)",
        border: `1px solid ${hovered ? skill.color + "44" : "var(--border)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background .22s, border-color .22s",
      }}>
        <SimpleIcon slug={skill.icon} color={hovered ? skill.color : "808080"} size={16} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 600,
          color: hovered ? "var(--text)" : "var(--text-muted)", transition: "color .22s",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {skill.name}
        </p>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-faint)",
          marginTop: 2, letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          {skill.category}
        </p>
      </div>
    </div>
  );
}

// ── Info card ─────────────────────────────────────────────────
function InfoCard({ label, val, icon }) {
  return (
    <div style={{
      padding: "14px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius)",
      background: "var(--bg-card)", display: "flex", flexDirection: "column", gap: 6,
    }}>
      <span style={{ color: "var(--text-muted)", display: "flex" }}>{icon}</span>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </p>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 600, color: "var(--text)", wordBreak: "break-all" }}>
        {val}
      </p>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────
const infoCards = [
  {
    label: "university", val: "Mapúa University",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
  {
    label: "degree", val: "BS Computer Science",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    label: "location", val: "San Pedro, Laguna, PH",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
  {
    label: "email", val: "redzerriley@gmail.com",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  },
  {
    label: "status", val: "Open for work",
    icon: (
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px rgba(16,185,129,0.8)" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#10b981", animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite", opacity: 0.6 }} />
        </div>
      </div>
    ),
  },
];

const skillCategories = ["All", "Frontend", "Backend", "Database", "Cloud", "DevOps"];

// ── Page ──────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeSkillCat, setActiveSkillCat] = useState("All");
  const filteredSkills = activeSkillCat === "All"
    ? skills
    : skills.filter(s => s.category === activeSkillCat);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "120px" }}>
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes aboutFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .about-section {
          animation: aboutFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        .about-section:nth-child(1) { animation-delay: 0.05s; }
        .about-section:nth-child(2) { animation-delay: 0.15s; }
        .about-section:nth-child(3) { animation-delay: 0.25s; }
        .about-section:nth-child(4) { animation-delay: 0.35s; }
        .about-section:nth-child(5) { animation-delay: 0.42s; }
      `}</style>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "120px 24px 0" }}>

        {/* ── 1. Photo + Identity hero ── */}
        <div className="about-section" style={{ marginBottom: "72px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "32px" }}>

            {/* Photo */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: "120px", height: "120px", borderRadius: "16px", overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 0 0 4px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.6)",
                background: "var(--bg-card)",
              }}>
                <img
                  src="./images/profile.jpg"
                  alt="Redzer Monsod"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={e => {
                    // Graceful fallback if photo not found
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.style.display = "flex";
                    e.currentTarget.parentElement.style.alignItems = "center";
                    e.currentTarget.parentElement.style.justifyContent = "center";
                    e.currentTarget.parentElement.innerHTML =
                      `<span style="font-family:var(--font-mono);font-size:2rem;font-weight:700;color:rgba(255,255,255,0.15)">RM</span>`;
                  }}
                />
              </div>
              {/* Online indicator */}
              <div style={{
                position: "absolute", bottom: "8px", right: "8px",
                width: "12px", height: "12px", borderRadius: "50%",
                background: "#10b981", boxShadow: "0 0 8px rgba(16,185,129,0.9)",
                border: "2px solid var(--bg)",
              }} />
            </div>

            {/* Name + role */}
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                letterSpacing: "-0.02em", lineHeight: 1.1,
                color: "rgba(240,240,240,0.95)", margin: "0 0 10px",
              }}>
                Redzer Riley<br />
                <em style={{ fontStyle: "italic", color: "rgba(200,200,200,0.4)", fontWeight: 700 }}>
                  Monsod
                </em>
              </h1>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 500,
                color: "rgba(200,200,200,0.45)", letterSpacing: "0.08em",
                textTransform: "uppercase", margin: 0,
              }}>
                Fullstack Developer · CS Student · Mapúan
              </p>
            </div>
          </div>
        </div>

        {/* ── 2. Bio ── */}
        <div className="about-section" style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
            }}>
              01 &mdash;
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.25rem", fontWeight: 700, color: "rgba(240,240,240,0.85)", margin: 0,
            }}>
              Background
            </h2>
          </div>

          <div style={{ display: "grid", gap: "14px", maxWidth: "640px" }}>
            {[
              `I'm currently enrolled in <strong>BS Computer Science at Mapúa University</strong> after transferring from BS Physics — that background sharpened the way I approach systems and problem decomposition.`,
              `My internship at <strong>Cloudswyft</strong> put me in a real production environment: debugging Open edX deployments, designing ERDs, and frontend development.`,
              `I care deeply about clean architecture, code quality, and structure. Currently exploring DevOps and cloud-native patterns.`,
            ].map((html, i) => (
              <p key={i}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", lineHeight: 1.75, color: "var(--text-muted)", margin: 0 }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </div>
        </div>

        {/* ── 3. Info cards ── */}
        <div className="about-section" style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
            }}>
              02 &mdash;
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.25rem", fontWeight: 700, color: "rgba(240,240,240,0.85)", margin: 0,
            }}>
              Details
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "10px",
          }}>
            {infoCards.map(({ label, val, icon }) => (
              <InfoCard key={label} label={label} val={val} icon={icon} />
            ))}
          </div>
        </div>

        {/* ── 4. Education ── */}
        <div className="about-section" style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
            }}>
              03 &mdash;
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.25rem", fontWeight: 700, color: "rgba(240,240,240,0.85)", margin: 0,
            }}>
              Education
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
            {education.map((edu) => (
              <div key={edu.course} style={{
                padding: "18px 20px",
                border: `1px solid ${edu.active ? "rgba(255,255,255,0.15)" : "var(--border)"}`,
                borderRadius: "var(--radius)",
                background: edu.active ? "rgba(255,255,255,0.04)" : "var(--bg-card)",
                display: "flex", alignItems: "flex-start", gap: "14px",
              }}>
                <span style={{ fontSize: "1.4rem", marginTop: "2px", flexShrink: 0 }}>{edu.icon}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.82rem", color: "var(--text)", margin: 0 }}>
                    {edu.course}
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-faint)", margin: 0 }}>
                    {edu.school} · {edu.location}
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: edu.active ? "#10b981" : "var(--text-faint)", margin: 0 }}>
                    {edu.period}{edu.active ? " · active" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Skills ── */}
        <div className="about-section">
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
            }}>
              04 &mdash;
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.25rem", fontWeight: 700, color: "rgba(240,240,240,0.85)", margin: 0,
            }}>
              Skills
            </h2>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            {skillCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveSkillCat(cat)}
                style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.65rem",
                  letterSpacing: "0.06em",
                  padding:       "5px 14px",
                  borderRadius:  "9999px",
                  border:        `1px solid ${activeSkillCat === cat ? "rgba(255,255,255,0.5)" : "var(--border-mid)"}`,
                  background:    activeSkillCat === cat ? "rgba(255,255,255,0.1)" : "var(--bg-card)",
                  color:         activeSkillCat === cat ? "var(--text)" : "var(--text-muted)",
                  cursor:        "pointer",
                  transition:    "all 0.2s ease",
                  textTransform: "uppercase",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "8px",
          }}>
            {filteredSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}