import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export const revalidate = 3600;

/* ── Data ─────────────────────────────────────────────── */

const dantzaDisciplines = [
  {
    name: "Predantza",
    options: [{ hours: "1H", price: 30 }],
  },
  {
    name: "Urbano",
    options: [
      { hours: "1H", price: 35 },
      { hours: "1H 15min", price: 38 },
    ],
  },
  {
    name: "Sevillanas / FitGipsy",
    options: [
      { hours: "1H", price: 38 },
      { hours: "1.5H", price: 45 },
      { hours: "2H", price: 70 },
      { hours: "2.5H", price: 75 },
    ],
  },
  {
    name: "Salsa",
    options: [{ hours: "1H", price: 38 }],
  },
  {
    name: "Bachata",
    options: [
      { hours: "1H", price: 38 },
      { hours: "2H", price: 70 },
    ],
  },
];

const fitnessPrices = [
  { sessions: 4, price: 38 },
  { sessions: 8, price: 55 },
  { sessions: 12, price: 93 },
  { sessions: 16, price: 105, popular: true },
  { sessions: 20, price: 137 },
  { sessions: 24, price: 156 },
];

const boxeoPrices = [
  { sessions: 4, price: 38 },
  { sessions: 8, price: 58 },
];

const yogaPrices = [
  { sessions: 4, price: 45, studentPrice: 35 },
  { sessions: 8, price: 70, studentPrice: 55 },
  { sessions: 12, price: 85, studentPrice: 65 },
];

const masajeTreatments = [
  "Ventosas",
  "Drenaje linfático",
  "Reflexología podal",
  "Descontracturante",
  "Relajante",
  "Maderoterapia",
  "Cráneo facial",
];

/* Staggered editorial offsets for the fitness grid */
const FITNESS_OFFSETS = ["", "md:mt-14", "md:mt-28"] as const;

/* ── Local pieces ─────────────────────────────────────── */

function ChapterHeader({
  number,
  eyebrow,
  title,
  dark,
}: {
  number: string;
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-5">
        <span className="font-heading text-sm font-semibold tracking-[0.2em] text-accent">
          {number}
        </span>
        <p className="text-sm uppercase tracking-[0.32em] text-accent font-medium">
          {eyebrow}
        </p>
      </div>
      <h2
        className={`mt-5 font-heading font-bold uppercase text-display-md ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────── */

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Prices");
  const tCommon = await getTranslations("Common");
  const tMassage = await getTranslations("Massage");

  const chapterIndex = [
    t("dantza"),
    t("fitness"),
    t("boxeo"),
    t("yoga"),
    t("masajes"),
    t("discounts"),
  ];

  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.14),transparent_38%)]" />
        <p
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-6 right-[-2vw] whitespace-nowrap font-heading font-bold uppercase text-display-xl text-outline opacity-50"
        >
          {locale === "eu" ? "Prezioak" : "Precios"}
        </p>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="hero-line mb-6 text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
            <span style={{ "--line-delay": "0.1s" } as React.CSSProperties}>
              {locale === "eu" ? "Planak" : "Planes"}
            </span>
          </p>

          <h1 className="font-heading font-bold text-white">
            <span className="hero-line">
              <span
                className="block uppercase text-display-lg"
                style={{ "--line-delay": "0.25s" } as React.CSSProperties}
              >
                {t("title")}
              </span>
            </span>
            <span className="hero-line md:ml-[8vw]">
              <span
                className="block font-serif-display italic font-normal lowercase text-accent text-display-md"
                style={{ "--line-delay": "0.4s" } as React.CSSProperties}
              >
                {t("subtitle")}
              </span>
            </span>
          </h1>

          {/* Editorial chapter index */}
          <div className="hero-line mt-14 md:mt-20">
            <span
              className="flex flex-wrap gap-x-10 gap-y-3 border-t border-accent/40 pt-6"
              style={{ "--line-delay": "0.6s" } as React.CSSProperties}
            >
              {chapterIndex.map((label, i) => (
                <span
                  key={label}
                  className="flex items-baseline gap-2.5 font-heading text-xs uppercase tracking-[0.2em] text-white/50 md:text-sm"
                >
                  <span className="text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </span>
              ))}
            </span>
          </div>
        </div>
      </section>

      {/* ── 01 DANTZA ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        <p
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-4 right-[-3vw] whitespace-nowrap font-heading font-bold uppercase text-display-xl text-outline-dark opacity-40"
        >
          {t("dantza")}
        </p>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-14 md:mb-20">
              <ChapterHeader
                number="01"
                eyebrow={t("dantzaDesc")}
                title={t("dantza")}
              />
            </div>
          </ScrollReveal>

          <div className="md:ml-[8vw]">
            {dantzaDisciplines.map((discipline, i) => (
              <ScrollReveal key={discipline.name} delay={i * 0.05}>
                <div className="group border-t border-primary/10 py-7 transition-colors duration-500 hover:border-accent/70 md:grid md:grid-cols-12 md:gap-x-8 md:py-9">
                  <h3 className="font-heading text-2xl font-bold uppercase text-foreground transition-colors duration-500 group-hover:text-accent md:col-span-5 md:text-3xl">
                    {discipline.name}
                  </h3>
                  <div className="mt-4 space-y-3 md:col-span-7 md:mt-0">
                    {discipline.options.map((opt) => (
                      <div key={opt.hours} className="flex items-baseline gap-4">
                        <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-muted-foreground md:text-sm">
                          {opt.hours} / {locale === "eu" ? "astean" : "sem"}
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex-1 border-b border-dotted border-primary/20 transition-colors duration-500 group-hover:border-accent/50"
                        />
                        <span className="shrink-0 whitespace-nowrap leading-none">
                          <span className="font-heading text-3xl font-bold text-foreground transition-colors duration-500 group-hover:text-accent md:text-4xl">
                            {opt.price}
                          </span>
                          <span className="ml-1 font-serif-display italic text-xl text-accent md:text-2xl">
                            €{t("perMonth")}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-primary/10" />
          </div>
        </div>
      </section>

      {/* ── 02 FITNESS ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-32">
        <p
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-4 left-[-3vw] whitespace-nowrap font-heading font-bold uppercase text-display-xl text-outline opacity-40"
        >
          {t("fitness")}
        </p>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-12 gap-y-10 md:mb-24">
            <div className="col-span-12 md:col-span-7">
              <ScrollReveal>
                <ChapterHeader
                  dark
                  number="02"
                  eyebrow={t("fitnessDesc")}
                  title={t("fitness")}
                />
              </ScrollReveal>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 md:self-end">
              <ScrollReveal delay={0.15}>
                <p className="border-l-2 border-accent pl-6 text-base leading-relaxed text-white/60 md:text-lg">
                  {t("fitnessClasses")}
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-10 md:gap-y-16">
            {fitnessPrices.map((item, i) => (
              <ScrollReveal
                key={item.sessions}
                delay={(i % 3) * 0.08}
                className={FITNESS_OFFSETS[i % 3]}
              >
                {item.popular ? (
                  <div className="rounded-2xl bg-accent p-6 shadow-[0_24px_70px_rgba(201,169,110,0.22)] md:p-8">
                    <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary/70">
                      {t("featured")}
                    </p>
                    <p className="mt-4 flex items-baseline gap-3">
                      <span className="font-heading font-bold leading-none text-primary text-display-md">
                        {item.sessions}
                      </span>
                      <span className="text-xs uppercase tracking-[0.24em] text-primary/60">
                        {t("sessions")}
                      </span>
                    </p>
                    <p className="mt-6 font-serif-display italic text-4xl leading-none text-primary md:text-5xl">
                      {item.price}€
                    </p>
                    <p className="mt-3 text-xs text-primary/60">
                      {(item.price / item.sessions).toFixed(1)}€ {t("perClass")}
                    </p>
                  </div>
                ) : (
                  <div className="group border-t border-white/15 pt-6 transition-colors duration-500 hover:border-accent/70">
                    <p className="flex items-baseline gap-3">
                      <span className="font-heading font-bold leading-none text-white transition-colors duration-500 group-hover:text-accent text-display-md">
                        {item.sessions}
                      </span>
                      <span className="text-xs uppercase tracking-[0.24em] text-white/45">
                        {t("sessions")}
                      </span>
                    </p>
                    <p className="mt-6 font-serif-display italic text-4xl leading-none text-accent md:text-5xl">
                      {item.price}€
                    </p>
                    <p className="mt-3 text-xs text-white/45">
                      {(item.price / item.sessions).toFixed(1)}€ {t("perClass")}
                    </p>
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 BOXEO · 04 YOGA ─────────────────────────── */}
      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 md:grid-cols-2 md:gap-12">
            {/* Boxeo */}
            <div>
              <ScrollReveal>
                <div className="mb-10 md:mb-14">
                  <ChapterHeader
                    number="03"
                    eyebrow={locale === "eu" ? "Bonoak" : "Bonos"}
                    title={t("boxeo")}
                  />
                </div>
              </ScrollReveal>
              {boxeoPrices.map((item, i) => (
                <ScrollReveal key={item.sessions} delay={i * 0.06}>
                  <div className="group border-t border-primary/10 py-6 transition-colors duration-500 hover:border-accent/70 md:py-7">
                    <div className="flex items-baseline gap-4">
                      <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-muted-foreground md:text-sm">
                        {item.sessions} {t("sessions")}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex-1 border-b border-dotted border-primary/20 transition-colors duration-500 group-hover:border-accent/50"
                      />
                      <span className="shrink-0 whitespace-nowrap leading-none">
                        <span className="font-heading text-3xl font-bold text-foreground transition-colors duration-500 group-hover:text-accent md:text-4xl">
                          {item.price}
                        </span>
                        <span className="ml-1 font-serif-display italic text-xl text-accent md:text-2xl">
                          €
                        </span>
                      </span>
                    </div>
                    <p className="mt-2 text-right text-xs text-muted-foreground">
                      {(item.price / item.sessions).toFixed(1)}€ {t("perClass")}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
              <div className="border-t border-primary/10" />
            </div>

            {/* Yoga — offset for editorial asymmetry */}
            <div className="md:mt-20">
              <ScrollReveal delay={0.1}>
                <div className="mb-10 md:mb-14">
                  <ChapterHeader
                    number="04"
                    eyebrow={locale === "eu" ? "Bonoak" : "Bonos"}
                    title={t("yoga")}
                  />
                </div>
              </ScrollReveal>
              {yogaPrices.map((item, i) => (
                <ScrollReveal key={item.sessions} delay={0.1 + i * 0.06}>
                  <div className="group border-t border-primary/10 py-6 transition-colors duration-500 hover:border-accent/70 md:py-7">
                    <div className="flex items-baseline gap-4">
                      <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-muted-foreground md:text-sm">
                        {item.sessions} {t("sessions")}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex-1 border-b border-dotted border-primary/20 transition-colors duration-500 group-hover:border-accent/50"
                      />
                      <span className="shrink-0 whitespace-nowrap leading-none">
                        <span className="font-heading text-3xl font-bold text-foreground transition-colors duration-500 group-hover:text-accent md:text-4xl">
                          {item.price}
                        </span>
                        <span className="ml-1 font-serif-display italic text-xl text-accent md:text-2xl">
                          €
                        </span>
                      </span>
                    </div>
                    <p className="mt-2 text-right text-xs text-muted-foreground">
                      {t("yogaStudents")}:{" "}
                      <span className="font-semibold text-accent">
                        {item.studentPrice}€
                      </span>
                    </p>
                  </div>
                </ScrollReveal>
              ))}
              <div className="border-t border-primary/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 MASAJES ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
            <ScrollReveal>
              <ChapterHeader
                dark
                number="05"
                eyebrow={t("masajesDesc")}
                title={t("masajes")}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <Link
                href="/masajes"
                className="group inline-flex items-center gap-2 border-b border-accent/50 pb-1 font-heading text-sm uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-accent"
              >
                {locale === "eu"
                  ? "Tratamendu guztiak ikusi"
                  : "Ver todos los tratamientos"}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </ScrollReveal>
          </div>

          <div className="md:ml-[8vw]">
            {masajeTreatments.map((name, i) => (
              <ScrollReveal key={name} delay={i * 0.04}>
                <div className="group flex items-baseline gap-4 border-t border-white/10 py-5 transition-colors duration-500 hover:border-accent/60 md:py-6">
                  <span className="font-heading text-lg font-bold uppercase text-white transition-colors duration-500 group-hover:text-accent md:text-2xl">
                    {name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex-1 border-b border-dotted border-white/15 transition-colors duration-500 group-hover:border-accent/40"
                  />
                  <span className="shrink-0 whitespace-nowrap text-right leading-none">
                    <span className="font-heading text-3xl font-bold text-white transition-colors duration-500 group-hover:text-accent md:text-4xl">
                      40
                    </span>
                    <span className="ml-1 font-serif-display italic text-xl text-accent md:text-2xl">
                      €
                    </span>
                    <span className="mt-2 block text-xs text-white/50">
                      {locale === "eu" ? "Erabiltzaileak" : "Usuarios"}:{" "}
                      <span className="font-semibold text-accent">35€</span>
                    </span>
                  </span>
                </div>
              </ScrollReveal>
            ))}

            {/* Premium BitanBat — gold-framed feature */}
            <ScrollReveal delay={masajeTreatments.length * 0.04}>
              <div className="mt-10 rounded-2xl border border-accent/60 bg-accent/[0.07] p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center rounded-full border border-accent/50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
                    {tCommon("premium")}
                  </span>
                  <span className="font-serif-display italic text-xl lowercase text-accent">
                    90 min
                  </span>
                </div>
                <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <h3 className="font-heading text-3xl font-bold uppercase text-white md:text-5xl">
                    {tMassage("bitanbatName")}
                  </h3>
                  <div className="shrink-0 md:text-right">
                    <p className="leading-none">
                      <span className="font-heading text-5xl font-bold text-white md:text-6xl">
                        65
                      </span>
                      <span className="ml-1 font-serif-display italic text-3xl text-accent">
                        €
                      </span>
                    </p>
                    <p className="mt-3 text-xs text-white/50">
                      {locale === "eu" ? "Erabiltzaileak" : "Usuarios"}:{" "}
                      <span className="font-semibold text-accent">60€</span>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 06 DESCUENTOS — final band ─────────────────── */}
      <section className="relative overflow-hidden border-t border-accent/30 bg-[#14100A] py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.16),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 flex items-baseline gap-5 md:mb-16">
              <span className="font-heading text-sm font-semibold tracking-[0.2em] text-accent">
                06
              </span>
              <p className="text-sm uppercase tracking-[0.32em] text-accent font-medium">
                {t("discounts")}
              </p>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <div className="group items-baseline border-t border-accent/25 py-8 transition-colors duration-500 hover:border-accent/70 md:grid md:grid-cols-12 md:gap-x-8 md:py-10">
                <p className="font-serif-display italic text-3xl lowercase leading-tight text-white md:col-span-8 md:text-5xl">
                  {t("familyDiscount")}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/45 md:col-span-4 md:mt-0 md:text-right md:text-sm">
                  {locale === "eu" ? "Familia guztientzat" : "Para toda la familia"}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="group items-baseline border-t border-accent/25 py-8 transition-colors duration-500 hover:border-accent/70 md:grid md:grid-cols-12 md:gap-x-8 md:py-10">
                <p className="font-serif-display italic text-3xl lowercase leading-tight text-white md:col-span-8 md:text-5xl">
                  {t("singleClass")}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/45 md:col-span-4 md:mt-0 md:text-right md:text-sm">
                  {locale === "eu" ? "Konpromisorik gabe" : "Sin compromiso"}
                </p>
              </div>
            </ScrollReveal>
            <div className="border-t border-accent/25" />
          </div>

          <ScrollReveal delay={0.15}>
            <div className="mt-14 flex flex-col gap-4 sm:flex-row md:ml-[8vw] md:mt-20">
              <Button
                href={SITE_CONFIG.whatsapp}
                external
                size="md"
                className="w-full sm:w-auto"
              >
                <Phone size={18} />
                {SITE_CONFIG.phoneFormatted}
              </Button>
              <Button
                href="/contacto"
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
              >
                {locale === "eu" ? "Kontaktatu" : "Contactar"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
