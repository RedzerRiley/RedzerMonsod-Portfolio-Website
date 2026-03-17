import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AmbientBg from "./components/AmbientBg.jsx";
import IntroScreen from "./components/IntroScreen.jsx";

import HomePage     from "./pages/HomePage.jsx";
import AboutPage    from "./pages/AboutPage.jsx";
import ExperiencePage from "./pages/ExperiencePage.jsx";
import SkillsPage   from "./pages/SkillsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ContactPage  from "./pages/ContactPage.jsx";

export default function App() {
  const { pathname } = useLocation();
  
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Intro Screen */}
      {showIntro && (
        <IntroScreen 
          onFadeStart={() => setContentVisible(true)}
          onComplete={() => setShowIntro(false)} 
        />
      )}
      
      {/* Background is always visible, but the content and navbar wait for the intro */}
      <AmbientBg />
      
      {/* Wrapper to hide/fade-in Navbar and Main Content */}
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          contentVisible ? "opacity-100" : "opacity-0 h-screen overflow-hidden"
        }`}
      >
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/about"      element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/skills"     element={<SkillsPage />} />
            <Route path="/projects"   element={<ProjectsPage />} />
            <Route path="/contact"    element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}