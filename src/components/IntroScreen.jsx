import { useState, useEffect, useMemo } from "react";

const PARTICLE_N = 80;

function makeRng(seed) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export default function IntroScreen({ onFadeStart, onComplete }) {
  const [phase, setPhase]     = useState("idle");   // idle → in → hold → exit
  const [exiting, setExiting] = useState(false);

  const particles = useMemo(() => {
    const rng = makeRng(42);
    return Array.from({ length: PARTICLE_N }, () => ({
      x:     rng() * 100,
      y:     rng() * 100,
      size:  1 + rng() * 2,
      alpha: 0.08 + rng() * 0.22,
      dur:   4 + rng() * 5,
      delay: rng() * 4,
      dx:    (rng() - 0.5) * 12,
      dy:    (rng() - 0.5) * 12,
    }));
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("in"),   100);
    const t2 = setTimeout(() => setPhase("hold"), 900);
    const t3 = setTimeout(() => {
      setPhase("exit");
      setExiting(true);
      if (onFadeStart) onFadeStart();
    }, 2000);
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2700);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  const visible = phase === "in" || phase === "hold" || phase === "exit";

  return (
    <div style={{
      position:       "fixed",
      inset:          0,
      zIndex:         9999,
      overflow:       "hidden",
      background:     "var(--bg, #0a0a0a)",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      pointerEvents:  exiting ? "none" : "auto",
      opacity:        exiting ? 0 : 1,
      transition:     exiting
        ? "opacity 0.65s cubic-bezier(.4,0,1,1)"
        : "none",
    }}>

      {/* GRAIN */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.045, pointerEvents:"none" }}>
        <filter id="gi">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#gi)"/>
      </svg>

      {/* VIGNETTE */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
      }}/>

      {/* PARTICLES */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        {particles.map((p, i) => (
          <div key={i} style={{
            position:     "absolute",
            left:         `${p.x}%`,
            top:          `${p.y}%`,
            width:        p.size,
            height:       p.size,
            borderRadius: "50%",
            background:   `rgba(240,240,240,${p.alpha})`,
            opacity:      visible ? 1 : 0,
            transition:   `opacity 1.2s ${i * 6}ms ease`,
            animation:    visible ? `pd_${i} ${p.dur}s ${p.delay}s ease-in-out infinite alternate` : "none",
          }}/>
        ))}
      </div>

      {/* ICON */}
      <div style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            20,
        opacity:        phase === "idle" ? 0 : 1,
        transform:      phase === "idle" ? "scale(0.92)" : "scale(1)",
        transition:     "opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1)",
      }}>

        {/* The </> bracket */}
        <div style={{
          fontFamily:    "var(--font-display, 'JetBrains Mono', monospace)",
          fontSize:      "clamp(2.8rem, 8vw, 5rem)",
          fontWeight:    400,
          letterSpacing: "-0.02em",
          color:         "var(--text, #f0f0f0)",
          userSelect:    "none",
          display:       "flex",
          alignItems:    "center",
          gap:           "0.15em",
        }}>
          <span style={{
            color:      "var(--text-muted, rgba(240,240,240,0.48))",
            opacity:    phase === "hold" || phase === "exit" ? 1 : 0,
            transform:  phase === "hold" || phase === "exit" ? "translateX(0)" : "translateX(-10px)",
            transition: "opacity 0.4s 0.05s ease, transform 0.4s 0.05s cubic-bezier(.22,1,.36,1)",
          }}>&lt;</span>

          <span style={{
            color:      "var(--text, #f0f0f0)",
            opacity:    phase === "in" || phase === "hold" || phase === "exit" ? 1 : 0,
            transform:  phase === "in" || phase === "hold" || phase === "exit" ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.45s ease, transform 0.5s cubic-bezier(.22,1,.36,1)",
          }}>/</span>

          <span style={{
            color:      "var(--text-muted, rgba(240,240,240,0.48))",
            opacity:    phase === "hold" || phase === "exit" ? 1 : 0,
            transform:  phase === "hold" || phase === "exit" ? "translateX(0)" : "translateX(10px)",
            transition: "opacity 0.4s 0.05s ease, transform 0.4s 0.05s cubic-bezier(.22,1,.36,1)",
          }}>&gt;</span>
        </div>

        {/* Loading bar */}
        <div style={{
          width:        120,
          height:       1,
          background:   "var(--border, rgba(255,255,255,0.07))",
          borderRadius: 1,
          overflow:     "hidden",
          opacity:      phase === "hold" || phase === "exit" ? 1 : 0,
          transition:   "opacity 0.3s 0.2s ease",
        }}>
          <div style={{
            height:     "100%",
            background: "var(--text, #f0f0f0)",
            borderRadius: 1,
            width:      phase === "hold" || phase === "exit" ? "100%" : "0%",
            transition: "width 0.85s 0.25s cubic-bezier(.22,1,.36,1)",
          }}/>
        </div>

      </div>

      {/* CORNER BRACKETS */}
      {[
        { top:24,    left:24,   borderTop:"1px solid", borderLeft:"1px solid"   },
        { top:24,    right:24,  borderTop:"1px solid", borderRight:"1px solid"  },
        { bottom:24, left:24,   borderBottom:"1px solid", borderLeft:"1px solid"  },
        { bottom:24, right:24,  borderBottom:"1px solid", borderRight:"1px solid" },
      ].map((pos, i) => (
        <div key={i} style={{
          position:    "absolute",
          ...pos,
          width:       14,
          height:      14,
          borderColor: "var(--border-mid, rgba(255,255,255,0.09))",
          opacity:     phase === "hold" || phase === "exit" ? 1 : 0,
          transition:  `opacity 0.4s ${i * 60 + 150}ms ease`,
        }}/>
      ))}

      {/* KEYFRAMES */}
      <style>{`
        ${particles.map((p, i) => `
          @keyframes pd_${i} {
            from { transform: translate(0px, 0px); }
            to   { transform: translate(${p.dx}px, ${p.dy}px); }
          }
        `).join("")}
      `}</style>
    </div>
  );
}