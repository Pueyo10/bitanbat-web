"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }

    let frameId = 0;
    const duration = 1500;
    let startTime = 0;
    let lastPaint = 0;

    function animate(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (now - lastPaint > 50 || progress === 1) {
        lastPaint = now;
        setDisplay(Math.round(eased * value));
      }
      if (progress < 1) frameId = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        frameId = requestAnimationFrame(animate);
        observer.unobserve(el);
      },
      { rootMargin: "-80px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display}{suffix && <span className="animate-fade-in">{suffix}</span>}
    </span>
  );
}

const stats = [
  { number: 200, suffix: "+", labelKey: "statsStudents" },
  { number: 15, suffix: "+", labelKey: "statsClasses" },
  { number: 2, suffix: "", labelKey: "statsLocations" },
  { number: 5, suffix: "", labelKey: "statsDays" },
] as const;

export default function StatsSection() {
  const t = useTranslations("Home");

  return (
    <section className="py-24 md:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.labelKey}
              delay={i * 0.08}
              className="text-center"
            >
              <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-3">
                <AnimatedNumber value={stat.number} suffix={stat.suffix} />
              </p>
              <p className="text-white/60 text-sm md:text-base tracking-wide uppercase">
                {t(stat.labelKey)}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
