import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/index.js";

// ── Terminal typing words ────────────────────────────────────
const ROLES = [
  "Software Developer",
  "Full Stack Developer",
  "DevOps Practitioner",
  "Project Management",
  "System Architect Design",
];

const BOOT_LINES = [
  { delay: 0,    text: "Initializing portfolio v2.0.0...",    type: "dim" },
  { delay: 300,  text: "Loading modules...", type: "success" },
  { delay: 700,  text: "Connecting to production environment...", type: "dim" },
  { delay: 1100, text: "✓ Systems online. Welcome.", type: "bright" },
];

// ── Terminal Typer ───────────────────────────────────────────

function TerminalTyper() {
  const [bootDone, setBootDone]       = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [roleIndex, setRoleIndex]     = useState(0);
  const [displayed, setDisplayed]     = useState("");
  const [isDeleting, setIsDeleting]   = useState(false);
  const [phase, setPhase]             = useState("boot"); // boot | typing

  // Boot sequence
  useEffect(() => {
    const timeouts = [];

    BOOT_LINES.forEach(({ delay, text, type }) => {
      const timeoutId = setTimeout(() => {
        setVisibleLines((v) => [...v, { text, type }]);
      }, delay);
      timeouts.push(timeoutId);
    });

    const finalTimeoutId = setTimeout(() => {
      setBootDone(true);
      setPhase("typing");
    }, 1600);
    timeouts.push(finalTimeoutId);

    // Cleanup function: clears timeouts if the component unmounts
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Typing loop
  useEffect(() => {
    if (phase !== "typing") return;
    const current = ROLES[roleIndex];
    let timeout;
    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 68);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 38);
      } else {
        setIsDeleting(false);
        setRoleIndex((r) => (r + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phase, roleIndex]);

  return (
    <div className="terminal-window w-full max-w-2xl">
      {/* Title bar */}
      <div className="terminal-titlebar">
        <span className="terminal-dot" style={{ background: "#ff5f56" }} />
        <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
        <span className="terminal-dot" style={{ background: "#27c93f" }} />
        <span className="terminal-title">redzer@portfolio ~ zsh</span>
      </div>

      {/* Body */}
      <div className="terminal-body">
        {/* Boot lines */}
        {visibleLines.map((line, i) => (
          <div key={i} className="anim-fade-in" style={{ animationDelay: `${i * 0}ms` }}>
            <span className={
              line.type === "dim"    ? "t-comment" :
              line.type === "bright" ? "t-string" :
              "t-success"
            }>
              {line.text}
            </span>
          </div>
        ))}

        {/* Typing line */}
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

        {/* Extra static lines */}
        {bootDone && (
          <div className="mt-3 space-y-0.5">
            <div><span className="t-comment"># available for: internship · freelance · full-time</span></div>
            <div>
              <span className="t-prompt-user">redzer</span>
              <span className="t-prompt-host">@macbook</span>
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



// ── Scroll-reveal Projects ───────────────────────────────────
function ScrollProjects() {
  const refs = useRef([]);
  const sectionRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    refs.current.forEach((el) => el && obs.observe(el));

    const headerObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) headerObs.observe(sectionRef.current);

    return () => { obs.disconnect(); headerObs.disconnect(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-24"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section header */}
        <div
          className={`transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="section-label">projects</span>
            <div className="h-px flex-1 max-w-16" style={{ background: "var(--border-mid)" }} />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2
              className="font-display text-2xl font-bold"
              style={{ color: "var(--text)" }}
            >
              ./recent_work
            </h2>
            <NavLink to="/projects" className="btn-ghost text-xs py-2 px-4 w-fit">
              view all →
            </NavLink>
          </div>
        </div>

        {/* Project cards with staggered scroll reveal */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (refs.current[i] = el)}
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

// ── Main page ────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto w-full space-y-12">

          {/* Top name block */}
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
              CS student @ Mapúa University Makati | Former Software Developer Intern @ CloudSwyft | Full-stack developer with real-world experience. 
              Based from San Pedro, Laguna, Philippines.
            </p>

            <div className="anim-fade-up delay-300 flex flex-wrap gap-3 pt-1">
              {/* GitHub Link */}
              <a href="https://github.com/RedzerRiley" target="_blank" rel="noreferrer" className="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                github
              </a>

              {/* LinkedIn Link */}
              <a href="https://www.linkedin.com/in/redzer-monsod-bb4309296/" target="_blank" rel="noreferrer" className="btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                linkedin
              </a>

              {/* Facebook Link */}
              <a href="https://www.facebook.com/redzer.monsod.5" target="_blank" rel="noreferrer" className="btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                facebook
              </a>
            </div>
          </div>

          {/* Terminal */}
          <div className="anim-fade-up delay-400">
            <TerminalTyper />
          </div>

        </div>
      </section>

      {/* ── Scroll-reveal projects preview ── */}
      <ScrollProjects />
    </div>
  );
}