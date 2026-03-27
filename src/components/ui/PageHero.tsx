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
    <section className="relative overflow-hidden bg-primary pt-28 pb-12 md:pt-40 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_36%)]" />
      <div className="absolute left-1/2 top-8 h-48 w-[32rem] -translate-x-1/2 rounded-full bg-accent/12 blur-3xl" />
      <div className="absolute left-6 top-16 hidden h-28 w-28 rounded-full border border-white/6 md:block" />
      <div className="absolute bottom-12 right-10 hidden h-36 w-36 rounded-full border border-accent/10 md:block" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          {label && (
            <div className="mb-6 inline-flex items-center gap-3 text-left">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <p className="text-accent text-xs font-medium uppercase tracking-[0.24em]">
                {label}
              </p>
            </div>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white md:text-6xl">
            {title}
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/68 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
