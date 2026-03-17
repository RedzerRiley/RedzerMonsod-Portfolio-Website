import SectionHeader from "../components/SectionHeader.jsx";
import { experience } from "../data/index.js";

export default function ExperiencePage() {
  return (
    <section className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="anim-fade-up">
          <SectionHeader 
            label="./experience" 
            title="git log --all"
            subtitle="Real-world work experience." 
          />
        </div>

        <div className="relative anim-fade-up delay-100">
          <div className="timeline-line" />
          <div className="pl-11 space-y-6">
            {experience.map((job) => {
              const imagePath = job.image ? `/images/myscreenshots/${job.image}` : null;

              return (
                <div key={job.id} className="relative">
                  <div className="timeline-dot" />
                  
                  <div className="card overflow-hidden flex flex-col md:flex-row">
                    
                    {/* ── Image / Placeholder ── */}
                    <div 
                      className="md:w-2/5 lg:w-1/3 shrink-0 flex items-start justify-center p-6 relative border-b md:border-b-0 md:border-r"
                      style={{
                        background: "linear-gradient(135deg, #161616 0%, #111 100%)",
                        borderColor: "var(--border)"
                      }}
                    >
                      {imagePath ? (
                        <img 
                          src={imagePath} 
                          alt={job.company} 
                          // Using object-contain and h-auto fixes the cropping!
                          // Added a subtle border and shadow to make it pop like a real screenshot window
                          className="w-full h-auto object-contain rounded border border-[var(--border-mid)] shadow-[0_8px_30px_rgba(0,0,0,0.8)] mt-2" 
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center opacity-40 py-8">
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