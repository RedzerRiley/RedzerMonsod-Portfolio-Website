import { useState } from "react";

// Resolves the correct simple-icons CDN URL for a given slug and brand color
function SimpleIcon({ slug, color, size = 22 }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    // Fallback: first two letters of the slug
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          fontSize: size * 0.42,
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          color: color,
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          opacity: 0.85,
        }}
      >
        {slug.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
      alt={slug}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}

export default function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card anim-fade-up cursor-default"
      style={{
        animationDelay: `${index * 40}ms`,
        borderColor: hovered ? skill.color + "55" : "var(--border)",
        background:   hovered ? "var(--bg-hover)" : "var(--bg-card)",
        transition:   "border-color .22s, background .22s, box-shadow .22s",
        boxShadow:    hovered ? `0 0 0 1px ${skill.color}22, 0 8px 32px rgba(0,0,0,0.5)` : "none",
        padding:      "14px 16px",
        display:      "flex",
        alignItems:   "center",
        gap:          12,
      }}
    >
      {/* Icon */}
      <div style={{
        flexShrink: 0,
        width:      36,
        height:     36,
        borderRadius: "var(--radius-sm)",
        background: hovered ? `${skill.color}18` : "var(--bg-surface)",
        border:     `1px solid ${hovered ? skill.color + "44" : "var(--border)"}`,
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background .22s, border-color .22s",
      }}>
        <SimpleIcon slug={skill.icon} color={hovered ? skill.color : "808080"} size={18} />
      </div>

      {/* Name + category */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily:   "var(--font-mono)",
          fontSize:     "0.75rem",
          fontWeight:   600,
          color:        hovered ? "var(--text)" : "var(--text-muted)",
          transition:   "color .22s",
          whiteSpace:   "nowrap",
          overflow:     "hidden",
          textOverflow: "ellipsis",
          letterSpacing: "0.01em",
        }}>
          {skill.name}
        </p>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize:   "0.63rem",
          color:      "var(--text-faint)",
          marginTop:  2,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          {skill.category}
        </p>
      </div>
    </div>
  );
}