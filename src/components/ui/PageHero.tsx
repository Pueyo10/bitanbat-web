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
    <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        {label && (
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
            {label}
          </p>
        )}
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/60 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
