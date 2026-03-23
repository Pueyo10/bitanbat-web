"use client";

import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

const stats = [
  { valueEs: "200+", valueEu: "200+", number: 200, suffix: "+", labelEs: "alumnos", labelEu: "ikasle" },
  { valueEs: "15+", valueEu: "15+", number: 15, suffix: "+", labelEs: "disciplinas", labelEu: "diziplina" },
  { valueEs: "2", valueEu: "2", number: 2, suffix: "", labelEs: "locales", labelEu: "lokal" },
  { valueEs: "5", valueEu: "5", number: 5, suffix: "", labelEs: "días a la semana", labelEu: "egun astean" },
];

export default function StatsSection() {
  const locale = useLocale();

  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelEs}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-3">
                <AnimatedNumber value={stat.number} suffix={stat.suffix} />
              </p>
              <p className="text-white/60 text-sm md:text-base tracking-wide uppercase">
                {locale === "eu" ? stat.labelEu : stat.labelEs}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
