import { useState, useEffect } from "react";

export default function IntroScreen({ onFadeStart, onComplete }) {
  const [phase, setPhase]     = useState("idle");   // idle → in → hold → exit
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("in"),   50);
    const t2 = setTimeout(() => setPhase("hold"), 300);
    const t3 = setTimeout(() => {
      setPhase("exit");
      setExiting(true);
      if (onFadeStart) onFadeStart();
    }, 700); 
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1100);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onFadeStart, onComplete]);

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

      {/* ICON */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        opacity:        phase === "idle" ? 0 : 1,
        transform:      phase === "idle" ? "scale(0.92)" : "scale(1)",
        transition:     "opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1)",
      }}>

        {/* The </> bracket */}
        <div style={{
          fontFamily:    "var(--font-display, 'JetBrains Mono', monospace)",
          fontSize:      "clamp(3.5rem, 10vw, 6rem)", // Made it slightly larger overall
          fontWeight:    700, // Increased thickness
          letterSpacing: "-0.02em",
          color:         "var(--text, #f0f0f0)",
          userSelect:    "none",
          display:       "flex",
          alignItems:    "center",
          gap:           "0.15em",
          textShadow:    "0 0 30px rgba(255,255,255,0.15)", // Added subtle premium glow
        }}>
          <span style={{
            color:      "var(--text-muted, rgba(240,240,240,0.6))",
            opacity:    phase === "hold" || phase === "exit" ? 1 : 0,
            transform:  phase === "hold" || phase === "exit" ? "translateX(0)" : "translateX(-15px)",
            transition: "opacity 0.4s 0.05s ease, transform 0.4s 0.05s cubic-bezier(.22,1,.36,1)",
          }}>&lt;</span>

          <span style={{
            color:      "var(--text, #f0f0f0)",
            opacity:    phase === "in" || phase === "hold" || phase === "exit" ? 1 : 0,
            transform:  phase === "in" || phase === "hold" || phase === "exit" ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.45s ease, transform 0.5s cubic-bezier(.22,1,.36,1)",
          }}>/</span>

          <span style={{
            color:      "var(--text-muted, rgba(240,240,240,0.6))",
            opacity:    phase === "hold" || phase === "exit" ? 1 : 0,
            transform:  phase === "hold" || phase === "exit" ? "translateX(0)" : "translateX(15px)",
            transition: "opacity 0.4s 0.05s ease, transform 0.4s 0.05s cubic-bezier(.22,1,.36,1)",
          }}>&gt;</span>
        </div>
      </div>

      {/* CORNER BRACKETS */}
      {[
        { top:24,    left:24,   borderTop:"2px solid", borderLeft:"2px solid"   }, // Thicker corners
        { top:24,    right:24,  borderTop:"2px solid", borderRight:"2px solid"  },
        { bottom:24, left:24,   borderBottom:"2px solid", borderLeft:"2px solid"  },
        { bottom:24, right:24,  borderBottom:"2px solid", borderRight:"2px solid" },
      ].map((pos, i) => (
        <div key={i} style={{
          position:    "absolute",
          ...pos,
          width:       16,
          height:      16,
          borderColor: "var(--border-mid, rgba(255,255,255,0.15))",
          opacity:     phase === "hold" || phase === "exit" ? 1 : 0,
          transition:  `opacity 0.4s ${i * 60 + 150}ms ease`,
        }}/>
      ))}

    </div>
  );
}