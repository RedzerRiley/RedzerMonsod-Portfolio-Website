import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import AmbientBg    from "./components/AmbientBg";
import IntroScreen  from "./components/IntroScreen";

import HomePage     from "./pages/HomePage";
import AboutPage    from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage  from "./pages/ContactPage";

// ── Cursor glow ───────────────────────────────────────────────
function CursorGlow() {
  const auraRef   = useRef(null);
  const posRef    = useRef({ x: -300, y: -300 });
  const animRef   = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const aura  = auraRef.current;
    if (!aura) return;

    const tick = () => {
      const { x, y } = posRef.current;

      aura.style.transform  = `translate(${x}px,  ${y}px)  translate(-50%, -50%)`;

      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);

    const show = () => {
      aura.style.opacity  = "1";
    };
    const hide = () => {
      aura.style.opacity  = "0";
    };

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      show();
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(hide, 2200);
    };

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseleave", hide,    { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(timeoutRef.current);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <>
      {/* Large soft aura */}
      <div
        ref={auraRef}
        style={{
          position:     "fixed",
          top:          0,
          left:         0,
          width:        "520px",
          height:       "520px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 40%, transparent 70%)",
          filter:       "blur(12px)",
          pointerEvents:"none",
          zIndex:       9998,
          opacity:      0,
          transition:   "opacity 0.5s ease",
          willChange:   "transform",
        }}
      />
    </>
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const { pathname } = useLocation();

  const [showIntro,      setShowIntro]      = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>

      {/* Cursor glow — always on top, pointer-events none */}
      <CursorGlow />

      {showIntro && (
        <IntroScreen
          onFadeStart={() => setContentVisible(true)}
          onComplete={()  => setShowIntro(false)}
        />
      )}

      <AmbientBg />

      <div
        style={{
          opacity:       contentVisible ? 1 : 0,
          transition:    "opacity 700ms ease-in-out",
          pointerEvents: contentVisible ? "auto" : "none",
          userSelect:    contentVisible ? "auto" : "none",
        }}
      >
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/"         element={<HomePage isIntroScreenRunning={showIntro} />}      />
            <Route path="/about"    element={<AboutPage />}     />
            <Route path="/projects" element={<ProjectsPage />}  />
            <Route path="/contact"  element={<ContactPage />}   />
          </Routes>
        </main>
        <Footer />
      </div>

    </div>
  );
}