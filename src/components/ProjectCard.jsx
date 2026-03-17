export default function ProjectCard({ project }) {
  const imagePath = project.image ? `/images/myscreenshots/${project.image}` : null;

  return (
    <div
      className="card overflow-hidden flex flex-col"
      style={{ position: "relative", boxShadow: "var(--shadow-card)" }}
    >
      {/* ── Image / Placeholder ── */}
      <div
        className="relative h-48 overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #161616 0%, #111 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {imagePath ? (
          <img src={imagePath} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center opacity-40">
            <span className="text-2xl mb-2 grayscale">🖼️</span>
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--text-faint)" }}>
              No image available
            </p>
          </div>
        )}

        {/* context badge */}
        <span
          className="badge badge-default absolute top-3 left-3"
        >
          {project.context}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          {/* Clickable Title Logic */}
          {project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              className="font-display text-base font-bold hover:underline transition-all inline-flex items-center gap-1.5" 
              style={{ color: "var(--text)", textDecorationColor: "var(--border-hover)" }}
            >
              {project.title}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}>
                <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
              </svg>
            </a>
          ) : (
            <h3 className="font-display text-base font-bold" style={{ color: "var(--text)" }}>
              {project.title}
            </h3>
          )}
          
          <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-faint)" }}>
            // {project.subtitle}
          </p>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
          {project.description}
        </p>

        <ul className="space-y-1">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs font-mono" style={{ color: "var(--text-faint)" }}>
              <span style={{ color: "var(--text-muted)" }} className="mt-0.5 shrink-0">+</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.stack.map((tech) => (
            <span key={tech} className="badge badge-default">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}