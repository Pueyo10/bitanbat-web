export default function PageHero({
  label,
  title,
  subtitle,
}: {
  label?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary pt-32 pb-14 md:pt-44 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.14),transparent_38%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="hero-line mb-6 text-accent text-xs font-medium uppercase tracking-[0.32em] md:text-sm">
            <span style={{ "--line-delay": "0.1s" } as React.CSSProperties}>
              {label}
            </span>
          </p>
        )}

        <h1 className="hero-line font-heading font-bold text-white text-display-lg">
          <span style={{ "--line-delay": "0.22s" } as React.CSSProperties}>
            {title}
          </span>
        </h1>

        {subtitle && (
          <p className="hero-line mt-8 max-w-xl text-base leading-relaxed text-white/65 md:ml-[8vw] md:text-xl">
            <span style={{ "--line-delay": "0.4s" } as React.CSSProperties}>
              {subtitle}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
