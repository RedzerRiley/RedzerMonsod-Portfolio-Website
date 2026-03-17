import { useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import SkillCard from "../components/SkillCard.jsx";
import { skills } from "../data/index.js";

const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "DevOps", "Platform"];

export default function SkillsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter(s => s.category === active);

  return (
    <section className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="anim-fade-up">
          <SectionHeader label="./skills" title="npm list --depth=0"
            subtitle="Hover a card to reveal proficiency. Click a category to filter." />
        </div>

        <div className="anim-fade-up delay-100 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className="badge transition-all duration-200 cursor-pointer"
              style={{
                padding: "5px 12px",
                color:        active===cat ? "#000"               : "var(--text-muted)",
                borderColor:  active===cat ? "var(--text)"        : "var(--border-mid)",
                background:   active===cat ? "var(--text)"        : "var(--bg-card)",
              }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {filtered.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} />)}
        </div>

        <div className="anim-fade-up delay-200 card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
            // proficiency is self-assessed based on project &amp; internship experience
          </p>
          <div className="flex items-center gap-5 shrink-0">
            {[["90–100%","expert"],["70–89%","proficient"],["50–69%","familiar"]].map(([range,label]) => (
              <div key={label} className="text-center">
                <p className="font-mono text-xs font-semibold" style={{ color: "var(--text)" }}>{range}</p>
                <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}