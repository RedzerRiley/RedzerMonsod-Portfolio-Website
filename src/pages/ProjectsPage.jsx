import { useEffect, useRef } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/index.js";

export default function ProjectsPage() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="anim-fade-up">
          <SectionHeader label="./projects" title="ls -la ./work"
            subtitle="Click the image placeholder on any card to upload a screenshot." />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div key={project.id}
              ref={el => refs.current[i] = el}
              className="project-reveal"
              style={{ animationDelay: `${i * 120}ms` }}>
              <ProjectCard project={project} featured={i === 0} />
            </div>
          ))}
        </div>

        <div className="anim-fade-up delay-300 card p-8 flex flex-col items-center justify-center text-center gap-3"
          style={{ borderStyle: "dashed" }}>
          <span className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>// more_projects_coming_soon</span>
          <p className="font-display font-bold text-sm" style={{ color: "var(--text)" }}>[ WIP ]</p>
          <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>Currently building new things — stay tuned.</p>
        </div>
      </div>
    </section>
  );
}