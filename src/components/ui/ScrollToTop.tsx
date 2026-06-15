"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    let frameId = 0;
    function onScroll() {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        const next = window.scrollY > 500;
        if (next !== visibleRef.current) {
          visibleRef.current = next;
          setVisible(next);
        }
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function scrollTop() {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Volver arriba"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-accent/45 bg-primary/85 text-accent shadow-lg shadow-black/25 backdrop-blur-sm transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:right-5 sm:bottom-[calc(env(safe-area-inset-bottom)+5.25rem)] sm:h-14 sm:w-14 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={22} className="sm:h-6 sm:w-6" />
    </button>
  );
}
