import SectionHeader from "../components/SectionHeader.jsx";
import { education } from "../data/index.js";

const infoCards = [
  { 
    label: "university", 
    val: "Mapúa University",         
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ) 
  },
  { 
    label: "degree",     
    val: "BS Computer Science",      
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ) 
  },
  { 
    label: "location",   
    val: "San Pedro, Laguna, Philippines",        
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ) 
  },
  { 
    label: "email",      
    val: "redzerriley@gmail.com",    
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ) 
  },
  { 
    label: "phone",      
    val: "(+63) 920 434 1124",       
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ) 
  },
  { 
    label: "status",     
    val: "Open for work",            
    icon: (
      <div className="flex h-[20px] items-center">
        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] relative">
          <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
        </div>
      </div>
    ) 
  },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="anim-fade-up">
          <SectionHeader label="./about"
            title="cat README.md"
            subtitle="CS student turned developer. I build things that work in production, not just in demos." />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="anim-fade-up delay-100 space-y-4">
            {[
              `I'm currently enrolled in <strong>BS Computer Science at Mapúa University</strong> after transferring from BS Physics — that background sharpened the way I approach systems and problem decomposition.`,
              `My internship at <strong>Cloudswyft</strong> put me in a real production environment: debugging Open edX's deployment, designing ERDs, and Frontend development.`,
              `I care deeply about clean architecture, code quality, and structure. Currently exploring and learning more DevOps and cloud-native patterns.`,
            ].map((html, i) => (
              <p key={i} className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
                dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>

          <div className="anim-fade-up delay-200 grid grid-cols-2 gap-2.5">
            {infoCards.map(({ label, val, icon }) => (
              <div key={label} className="card p-3.5 space-y-1.5">
                <span className="block mb-1" style={{ color: "var(--text-muted)" }}>{icon}</span>
                <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>// {label}</p>
                <p className="font-mono text-xs font-semibold break-all" style={{ color: "var(--text)" }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="anim-fade-up delay-300 space-y-4">
          <h2 className="font-display text-lg font-bold" style={{ color: "var(--text)" }}>education[]</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {education.map((edu) => (
              <div key={edu.course} className="card p-4 flex items-start gap-3.5"
                style={{
                  background: edu.active ? "rgba(255,255,255,0.04)" : "var(--bg-card)",
                  borderColor: edu.active ? "rgba(255,255,255,0.15)" : "var(--border)",
                }}>
                <span className="text-xl mt-0.5">{edu.icon}</span>
                <div className="space-y-1">
                  <p className="font-display font-bold text-sm" style={{ color: "var(--text)" }}>{edu.course}</p>
                  <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>{edu.school} · {edu.location}</p>
                  <p className="font-mono text-xs" style={{ color: edu.active ? "var(--text-muted)" : "var(--text-faint)" }}>
                    {edu.period}{edu.active ? " · active" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}