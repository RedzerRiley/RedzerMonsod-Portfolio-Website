import { useState } from "react";

export default function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card anim-fade-up cursor-default p-4 flex flex-col gap-3"
      style={{
        animationDelay: `${index * 50}ms`,
        borderColor: hovered ? "var(--border-hover)" : "var(--border)",
        background: hovered ? "var(--bg-hover)" : "var(--bg-card)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold" style={{ color: "var(--text)" }}>
          {skill.name}
        </span>
        <span className="text-base">{skill.icon}</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: hovered ? `${skill.level}%` : "0%" }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>{skill.category}</span>
        <span className="font-mono text-xs" style={{ color: hovered ? "var(--text)" : "var(--text-faint)" }}>
          {skill.level}%
        </span>
      </div>
    </div>
  );
}