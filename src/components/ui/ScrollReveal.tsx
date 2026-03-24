"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Variant = "fade-up" | "fade-in" | "slide-left" | "slide-right";

const variantClass: Record<Variant, string> = {
  "fade-up": "",
  "fade-in": "",
  "slide-left": "slide-left",
  "slide-right": "slide-right",
};

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add("is-visible"), delay * 1000);
          } else {
            el.classList.add("is-visible");
          }
          observer.unobserve(el);
        }
      },
      { rootMargin: "-60px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${variantClass[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
