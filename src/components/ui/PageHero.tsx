export default function PageHero({
  label,
  title,
  subtitle,
  serif = false,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  serif?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-primary pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.14),transparent_38%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="hero-line mb-5 text-accent text-xs font-medium uppercase tracking-[0.32em] md:text-sm">
            <span
              className="inline-flex items-center gap-3"
              style={{ "--line-delay": "0.1s" } as React.CSSProperties}
            >
              <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
              {label}
            </span>
          </p>
        )}

        <h1
          className={`hero-line text-white text-display-lg ${
            serif ? "font-serif-display font-normal" : "font-heading font-bold"
          }`}
        >
          <span style={{ "--line-delay": "0.22s" } as React.CSSProperties}>
            {title}
          </span>
        </h1>

        {subtitle && (
          <p className="hero-line mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-xl">
            <span style={{ "--line-delay": "0.4s" } as React.CSSProperties}>
              {subtitle}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
