import { useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import SkillCard from "../components/SkillCard.jsx";
import { skills } from "../data/index.js";

const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "DevOps"];

export default function SkillsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter(s => s.category === active);

  return (
    <section className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-4xl mx-auto space-y-10">

        <div className="anim-fade-up">
          <SectionHeader
            label="./skills"
            title="Tech Skills"
            subtitle="Technologies and tools I work with."
          />
        </div>

        {/* Category filter */}
        <div className="anim-fade-up delay-100 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="badge transition-all duration-200 cursor-pointer"
              style={{
                padding:     "5px 14px",
                color:       active === cat ? "#000"            : "var(--text-muted)",
                borderColor: active === cat ? "var(--text)"     : "var(--border-mid)",
                background:  active === cat ? "var(--text)"     : "var(--bg-card)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="anim-fade-up delay-200"
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap:                 10,
          }}
        >
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Footer note
        <div className="anim-fade-up delay-300 card p-4">
          <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
            // stack built through coursework, internship at Cloudswyft, and personal projects
          </p>
        </div> */}

      </div>
    </section>
  );
}