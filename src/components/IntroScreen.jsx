import { useState, useEffect } from "react";

const greetings = [
  "Hello",      // English
  "Hola",       // Spanish
  "Bonjour",    // French
  "Hallo",      // German
  "Ciao",       // Italian
  "こんにちは",  // Japanese
  "Kumusta"     // Tagalog
];

export default function IntroScreen({ onFadeStart, onComplete }) {
  const [index, setIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Cycle through the words
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 220);
      return () => clearTimeout(timer);
    } 
    // After the last word, start the fade out animation
    else {
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
        // Tell App.jsx to start fading in the main content
        if (onFadeStart) onFadeStart();
      }, 500); 
      
      // Notify App.jsx to unmount this component after the CSS transition finishes
      const removeTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1300); 

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [index, onFadeStart, onComplete]);

  return (
    <div
      // Bumped z-index to 9999 to guarantee it covers any fixed headers
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-all duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
      }`}
    >
      <h1 
        className="text-4xl md:text-5xl font-display font-medium tracking-tight"
        style={{ color: "var(--text)" }}
      >
        {greetings[index]}
      </h1>
    </div>
  );
}