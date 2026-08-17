import { useState } from "react";
import { education, skills } from "../data/index.js";
import "./AboutPage.css";

// ── Simple icon via CDN, with a text-initials fallback ─────────
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

// ── Skill row — icons only shown when explicitly requested
//    (the flat, single-category view). The grouped index view
//    stays text-only to keep 20+ items legible at a glance. ──
function SkillRow({ skill, showIcon = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={showIcon ? "about-skill" : "about-skill about-skill--plain"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {showIcon && (
        <span className="about-skill__icon">
          <SimpleIcon slug={skill.icon} color={hovered ? skill.color : "#7d7d7d"} size={14} />
        </span>
      )}
      <span className="about-skill__name">{skill.name}</span>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────
const details = [
  { label: "University", value: "Mapúa University" },
  { label: "Degree", value: "BS Computer Science" },
  { label: "Location", value: "San Pedro, Laguna, PH" },
  { label: "Email", value: "redzerriley@gmail.com" },
];

const skillCategories = ["All", "Frontend", "Backend", "Database", "Cloud", "DevOps"];

// ── Page ──────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeSkillCat, setActiveSkillCat] = useState("All");

  const flatSkills = activeSkillCat === "All"
    ? []
    : skills.filter(s => s.category === activeSkillCat);

  const groupedSkills = skillCategories
    .filter(c => c !== "All")
    .map(cat => ({ category: cat, items: skills.filter(s => s.category === cat) }))
    .filter(g => g.items.length > 0);

  return (
    <div className="about">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />

      {/* ── Masthead ──
          The name is the only dominant object on this page. The
          photo is a small supporting mark inside the byline, not
          a competing column — no even split, no info-card feel. */}
      <header className="about-masthead">
        <p className="about-role">Fullstack Developer · CS Student · Mapúan</p>
        <h1 className="about-name">
          Redzer Riley <em>Monsod</em>
        </h1>

        <div className="about-byline">
          <span className="about-byline__photo">
            <img
              src="./images/profile.jpg"
              alt="Redzer Monsod"
              onError={e => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                parent.style.display = "flex";
                parent.style.alignItems = "center";
                parent.style.justifyContent = "center";
                parent.innerHTML =
                  `<span style="font-family:'Playfair Display', serif;font-style:italic;font-size:1rem;color:var(--text-faint)">RM</span>`;
              }}
            />
          </span>
          <span>San Pedro, Laguna, PH</span>
          <span className="about-byline__sep">·</span>
          <span className="about-status">
            <span className="about-status__dot" />
            Open for work
          </span>
        </div>
      </header>

      {/* ── Background + Details ── */}
      <section className="about-intro">
        <div className="about-intro__grid">
          <div className="about-prose">
            <div className="about-prose__body">
             <p>
  I'm currently pursuing a <strong>BS in Computer Science at Mapúa University</strong>, after transferring
  from BS Physics. That background strengthened my analytical thinking and taught me to approach complex
  problems through systems thinking and structured problem decomposition.
</p>
<p>
  Most recently, I interned as an <strong>Full-stack Developer Head Intern at Pru Life UK</strong>, where I took on
  leadership responsibilities, coordinated with teams, and contributed to projects within a structured
  corporate environment. Previously, my internship at <strong>CloudSwyft</strong> as a <strong>Software Engineer Intern</strong> gave me hands-on
  experience with Open edX deployments, ERD design, debugging, and frontend development.
</p>
<p>
  I value clean architecture, maintainable code, and thoughtful problem-solving. I'm currently expanding
  my skills in <strong>DevOps, cloud-native technologies, and scalable software systems</strong>, with
  a focus on building reliable and well-structured solutions.
</p>
            </div>
          </div>

          <dl className="about-specs">
            <p className="about-specs__label">Details</p>
            {details.map(({ label, value }) => (
              <div className="about-specs__row" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="about-education">
        <h2 className="about-title">Education</h2>
        <ol className="about-timeline">
          {education.map(edu => (
            <li className={`about-timeline__item${edu.active ? " is-active" : ""}`} key={edu.course}>
              <span className="about-timeline__marker" />
              <div className="about-timeline__row">
                <h3>{edu.course}</h3>
                <span className="about-timeline__period">{edu.period}</span>
              </div>
              <p className="about-timeline__meta">
                {edu.school} — {edu.location}
                {edu.active && <span className="about-timeline__tag"> · Current</span>}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Skills ── */}
      <section className="about-skills">
        <div className="about-skills__head">
          <p className="about-kicker">Skills</p>
          <div className="about-skills__tabs">
            {skillCategories.map(cat => (
              <button
                key={cat}
                className={`about-tab${activeSkillCat === cat ? " is-active" : ""}`}
                onClick={() => setActiveSkillCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {activeSkillCat === "All" ? (
          <div className="about-skill-groups">
            {groupedSkills.map(group => (
              <div className="about-skill-group" key={group.category}>
                <p className="about-skill-group__label">{group.category}</p>
                {group.items.map(skill => (
                  <SkillRow key={skill.name} skill={skill} showIcon={false} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="about-skills__list--flat">
            {flatSkills.map(skill => (
              <SkillRow key={skill.name} skill={skill} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}