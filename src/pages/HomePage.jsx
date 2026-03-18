import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects, experience } from "../data/index.js";

// Import the PDF directly so Vite handles the file path!
import resumePdf from "../assets/resume.pdf";

// ── Terminal typing words ─────────────────────────────────────
const ROLES = [
  "Software Developer",
  "Open for internship",
  "Full Stack Developer",
  "Open for Part-time",
  "DevOps Practitioner",
  "Contact me",
  "Project Management",
  "System Architect Design",
];

const BOOT_LINES = [
  { delay: 0,    text: "Initializing portfolio v2.0.0...", type: "dim"     },
  { delay: 300,  text: "Loading modules...",               type: "success" },
  { delay: 700,  text: "Connecting to production environment...", type: "dim" },
  { delay: 1100, text: "✓ Systems online. Welcome.",       type: "bright"  },
];

// ── Terminal Typer ────────────────────────────────────────────
function TerminalTyper() {
  const [bootDone, setBootDone]         = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [roleIndex, setRoleIndex]       = useState(0);
  const [displayed, setDisplayed]       = useState("");
  const [isDeleting, setIsDeleting]     = useState(false);
  const [phase, setPhase]               = useState("boot");

  // Fixed Boot Sequence for React 18 Strict Mode
  useEffect(() => {
    setVisibleLines([]);
    setBootDone(false);
    setPhase("boot");
    
    const timers = [];
    
    BOOT_LINES.forEach(({ delay, text, type }) => {
      timers.push(setTimeout(() => setVisibleLines(v => [...v, { text, type }]), delay));
    });
    
    timers.push(setTimeout(() => { 
      setBootDone(true); 
      setPhase("typing"); 
    }, 1600));
    
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typing Effect
  useEffect(() => {
    if (phase !== "typing") return;
    const current = ROLES[roleIndex];
    let t;
    if (!isDeleting) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 68);
      } else {
        t = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 38);
      } else {
        setIsDeleting(false);
        setRoleIndex(r => (r + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, isDeleting, phase, roleIndex]);

  return (
    <div className="terminal-window w-full max-w-2xl">
      <div className="terminal-titlebar">
        <span className="terminal-dot" style={{ background: "#ff5f56" }} />
        <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
        <span className="terminal-dot" style={{ background: "#27c93f" }} />
        <span className="terminal-title">redzer@portfolio ~ zsh</span>
      </div>
      <div className="terminal-body">
        {visibleLines.map((line, i) => (
          <div key={i} className="anim-fade-in">
            <span className={line.type === "dim" ? "t-comment" : line.type === "bright" ? "t-string" : "t-success"}>
              {line.text}
            </span>
          </div>
        ))}
        {bootDone && (
          <div className="mt-1">
            <span className="t-prompt-user">redzer</span>
            <span className="t-prompt-host">@laptop</span>
            <span className="t-prompt-dir"> ~/portfolio </span>
            <span className="t-prompt-sym">❯ </span>
            <span className="t-cmd">echo </span>
            <span style={{ color: "#888" }}>"</span>
            <span className="t-string">{displayed}</span>
            <span style={{ color: "#888" }}>"</span>
            <span className="terminal-cursor" />
          </div>
        )}
        {bootDone && (
          <div className="mt-3 space-y-0.5">
            <div><span className="t-comment"># available for: internship · part-time</span></div>
            <div>
              <span className="t-prompt-user">redzer</span>
              <span className="t-prompt-host">@laptop</span>
              <span className="t-prompt-dir"> ~/portfolio </span>
              <span className="t-prompt-sym">❯ </span>
              <span className="t-cmd">cat </span>
              <span className="t-string">contact.txt</span>
            </div>
            <div className="t-output">redzerriley@gmail.com · (+63) 920 434 1124 · San Pedro, Laguna</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Scroll-reveal Experience ──────────────────────────────────
function ScrollExperience() {
  const sectionRef  = useRef(null);
  const cardRef     = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardVisible,   setCardVisible]   = useState(false);

  useEffect(() => {
    const hObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    const cObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCardVisible(true); cObs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) hObs.observe(sectionRef.current);
    if (cardRef.current)    cObs.observe(cardRef.current);
    return () => { hObs.disconnect(); cObs.disconnect(); };
  }, []);

  const job = experience[0];

  return (
    <section
      ref={sectionRef}
      className="px-6 py-20"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className={`transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="section-label">experience</span>
            <div className="h-px flex-1 max-w-16" style={{ background: "var(--border-mid)" }} />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>
              ./recent_work_history
            </h2>
            <NavLink to="/experience" className="btn-ghost text-xs py-2 px-4 w-fit">
              view full →
            </NavLink>
          </div>
        </div>

        {/* Experience card */}
        <div
          ref={cardRef}
          className={`project-reveal ${cardVisible ? "visible" : ""}`}
        >
          <div className="card overflow-hidden">
            {/* Top bar */}
            <div
              className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-hover)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-sm font-bold shrink-0"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-mid)", color: "var(--text)" }}
                >
                  CS
                </div>
                <div>
                  <p className="font-display font-bold text-sm" style={{ color: "var(--text)" }}>{job.role}</p>
                  <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{job.company} · {job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-white">{job.type}</span>
                <span className="badge badge-default">{job.period}</span>
              </div>
            </div>

            {/* Bullets */}
            <div className="px-6 py-5 grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {job.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                  <span className="mt-0.5 shrink-0" style={{ color: "var(--text-faint)" }}>+</span>
                  {b}
                </div>
              ))}
            </div>

            {/* Stack */}
            <div
              className="px-6 py-4 flex flex-wrap gap-1.5"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {job.stack.map(t => (
                <span key={t} className="badge badge-default">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Scroll-reveal Projects ────────────────────────────────────
function ScrollProjects() {
  const refs      = useRef([]);
  const sectionRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    refs.current.forEach(el => el && obs.observe(el));

    const hObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) hObs.observe(sectionRef.current);
    return () => { obs.disconnect(); hObs.disconnect(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-20"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className={`transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="section-label">projects</span>
            <div className="h-px flex-1 max-w-16" style={{ background: "var(--border-mid)" }} />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>
              ./recent_work
            </h2>
            <NavLink to="/projects" className="btn-ghost text-xs py-2 px-4 w-fit">
              view all →
            </NavLink>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={el => (refs.current[i] = el)}
              className="project-reveal"
              style={{ animationDelay: `${i * 130}ms` }}
            >
              <ProjectCard project={project} featured={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto w-full space-y-12">

          {/* Name block */}
          <div className="space-y-4">
            <div className="anim-fade-up flex items-center gap-3">
              <span className="section-label">./whoami</span>
              <div className="h-px w-10" style={{ background: "var(--border-mid)" }} />
            </div>

            <div className="anim-fade-up delay-100">
              <h1
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
                style={{ color: "var(--text)", lineHeight: 1.1 }}
              >
                Redzer Riley<br />
                <span style={{ color: "var(--text-faint)" }}>M. Monsod</span>
              </h1>
            </div>

            <p
              className="anim-fade-up delay-200 text-sm max-w-md leading-relaxed"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
            >
              CS student @ Mapúa University Makati | Former Software Developer Intern @ CloudSwyft | Full-stack developer with real-world experience |
              Based from San Pedro, Laguna, Philippines.
            </p>

            {/* Social links */}
            <div className="anim-fade-up delay-300 flex flex-wrap gap-3 pt-1">
              <a href="https://github.com/RedzerRiley" target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                github
              </a>
              <a href="https://www.linkedin.com/in/redzer-monsod-bb4309296/" target="_blank" rel="noreferrer" className="btn-ghost flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                linkedin
              </a>
              <a href="https://www.facebook.com/redzer.monsod.5" target="_blank" rel="noreferrer" className="btn-ghost flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                facebook
              </a>
              
              {/* FIXED Resume Download Button */}
              <a 
                href={resumePdf} 
                download="Redzer_Monsod_Resume.pdf" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-ghost flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                resume
              </a>
            </div>
          </div>

          {/* Terminal */}
          <div className="anim-fade-up delay-400">
            <TerminalTyper />
          </div>

        </div>
      </section>

      {/* Experience preview — scroll reveal */}
      <ScrollExperience />

      {/* Projects preview — scroll reveal */}
      <ScrollProjects />
    </div>
  );
}