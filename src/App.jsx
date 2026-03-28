import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar      from "./components/Navbar";
import Footer      from "./components/Footer";
import AmbientBg   from "./components/AmbientBg";
import IntroScreen from "./components/IntroScreen";

import HomePage      from "./pages/HomePage";
import AboutPage     from "./pages/AboutPage";
import SkillsPage    from "./pages/SkillsPage";
import ProjectsPage  from "./pages/ProjectsPage";
import ContactPage   from "./pages/ContactPage";

export default function App() {
  const { pathname } = useLocation();

  const [showIntro,      setShowIntro]      = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>

      {/* Intro — unmounted after its own exit animation finishes (~1650ms total) */}
      {showIntro && (
        <IntroScreen
          onFadeStart={() => setContentVisible(true)}  // fires when intro starts fading (~950ms in)
          onComplete={()  => setShowIntro(false)}       // fires after fade finishes (~1650ms in)
        />
      )}

      <AmbientBg />

      <div
        style={{
          opacity:        contentVisible ? 1 : 0,
          transition:     "opacity 700ms ease-in-out",
          pointerEvents:  contentVisible ? "auto" : "none",
          userSelect:     contentVisible ? "auto" : "none",
        }}
      >
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/"           element={<HomePage />}      />
            <Route path="/about"      element={<AboutPage />}     />
            <Route path="/skills"     element={<SkillsPage />}    />
            <Route path="/projects"   element={<ProjectsPage />}  />
            <Route path="/contact"    element={<ContactPage />}   />
          </Routes>
        </main>
        <Footer />
      </div>

    </div>
  );
}