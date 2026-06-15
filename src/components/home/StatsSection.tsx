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
    <section className="py-24 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.labelKey}
              delay={i * 0.1}
              className="flex flex-col items-center text-center"
            >
              <p className="font-heading font-bold leading-none text-foreground text-display-md">
                <AnimatedNumber value={stat.number} suffix={stat.suffix} />
              </p>
              <span
                aria-hidden="true"
                className="stat-underline my-4 h-px w-12 origin-center bg-accent/70"
              />
              <p className="text-muted-foreground text-xs md:text-sm tracking-[0.22em] uppercase">
                {t(stat.labelKey)}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
