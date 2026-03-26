import SectionHeader from "../components/SectionHeader.jsx";
import { experience } from "../data/index.js";

export default function ExperiencePage() {
  return (
    <section className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="anim-fade-up">
          <SectionHeader 
            label="./experience" 
            title="Work Experience"
            subtitle="Real-world work experience." 
          />
        </div>

        <div className="relative anim-fade-up delay-100">
          <div className="timeline-line" />
          <div className="pl-11 space-y-6">
            {experience.map((job) => {
              const imagePath = job.image ? `images/myscreenshots/${job.image}` : null;

              return (
                <div key={job.id} className="relative">
                  <div className="timeline-dot" />
                  
                  <div className="card overflow-hidden flex flex-col md:flex-row">
                    
                   {/* ── Image / Placeholder ── */}
<div 
  className="md:w-2/5 lg:w-1/3 shrink-0 relative border-b md:border-b-0 md:border-r overflow-hidden group"
  style={{
    background: "linear-gradient(135deg, #161616 0%, #111 100%)",
    borderColor: "var(--border)",
    minHeight: "180px",
  }}
>
  {imagePath ? (
    <>
      {/* Blurred background fill */}
      <div 
        className="absolute inset-0 scale-110 transition-all duration-700 group-hover:scale-125 group-hover:brightness-50"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(12px) brightness(0.35)",
        }}
      />

      {/* Glow ring on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99,179,237,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Sharp centered image — levitates on hover */}
      <div className="relative z-10 flex items-center justify-center h-full p-4">
        <img 
          src={imagePath} 
          alt={job.company} 
          className="w-full h-auto max-h-48 object-contain rounded
            shadow-[0_8px_32px_rgba(0,0,0,0.7)]
            transition-all duration-500 ease-out
            group-hover:-translate-y-2
            group-hover:shadow-[0_20px_48px_rgba(0,0,0,0.9),0_0_24px_rgba(99,179,237,0.15)]
            group-hover:scale-[1.03]"
        />
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center opacity-40 py-8 h-full">
      <span className="text-2xl mb-2 grayscale">🖼️</span>
      <p className="font-mono text-xs tracking-widest uppercase text-center px-4" style={{ color: "var(--text-faint)" }}>
        No image available
      </p>
    </div>
  )}
</div>

                    {/* ── Content ── */}
                    <div className="p-6 space-y-5 flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                        <div>
                          <h3 className="font-display text-base font-bold" style={{ color: "var(--text)" }}>{job.role}</h3>
                          <p className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>{job.company} · {job.location}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="badge badge-white">{job.type}</span>
                          <span className="badge badge-default">{job.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {job.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs font-mono"
                            style={{ color: "var(--text-muted)" }}>
                            <span style={{ color: "var(--text-faint)" }} className="mt-0.5 shrink-0">+</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.stack.map(t => (
                          <span key={t} className="badge badge-default">{t}</span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}