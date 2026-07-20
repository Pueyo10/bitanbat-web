import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Phone, Gift, Users, Star, Crown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export const revalidate = 3600;

/* ── Data ─────────────────────────────────────────────── */

const PLAN_COLORS = {
  boxeo: { glow: "from-accent/15", bar: "bg-accent" },
  yoga: { glow: "from-accent/15", bar: "bg-accent" },
} as const;

const dantzaDisciplines = [
  {
    name: "Predantza",
    color: "from-accent/20 to-accent/5",
    accent: "bg-accent",
    options: [{ es: "Mensual", eu: "Hilekoa", price: 35 }],
  },
  {
    name: "Urbano",
    color: "from-accent/20 to-accent/5",
    accent: "bg-accent",
    options: [
      { es: "Txiki", eu: "Txiki", price: 38 },
      { es: "Urbano", eu: "Urbano", price: 38 },
      { es: "Adultos", eu: "Helduak", price: 40 },
    ],
  },
  {
    name: "Sevillanas / FitGipsy",
    color: "from-accent/20 to-accent/5",
    accent: "bg-accent",
    options: [
      { es: "Sevillanas / FitGipsy", eu: "Sevillanak / FitGipsy", price: 40 },
      { es: "Sevillanas noche", eu: "Sevillanak gauez", price: 50 },
    ],
  },
  {
    name: "Salsa",
    color: "from-accent/20 to-accent/5",
    accent: "bg-accent",
    options: [{ es: "Mensual", eu: "Hilekoa", price: 40 }],
  },
  {
    name: "Bachata",
    color: "from-accent/20 to-accent/5",
    accent: "bg-accent",
    options: [{ es: "Mensual", eu: "Hilekoa", price: 40 }],
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

const boxeoPrices = [{ sessions: 4, price: 38 }];

const yogaPrices = [{ sessions: 4, price: 45 }];

const masajeTreatments = [
  "Ventosas",
  "Drenaje linfático",
  "Reflexología podal",
  "Descontracturante",
  "Relajante",
  "Maderoterapia",
  "Cráneo facial",
];

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

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Planak" : "Planes"}
        title={t("title")}
        subtitle={t("subtitle")}
        serif
      />

      {/* ── DANTZA ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,170,110,0.03)_0%,transparent_70%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-3">
                {t("dantzaDesc")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                {t("dantza")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dantzaDisciplines.map((discipline, i) => (
              <ScrollReveal key={discipline.name} delay={i * 0.06}>
                <div className="group relative h-full">
                  <div className={`absolute -inset-0.5 bg-gradient-to-b ${discipline.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`} />

                  <div className="relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 h-full hover:border-white/20 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                    <div className={`absolute top-0 left-6 right-6 h-[2px] ${discipline.accent} rounded-full opacity-60`} />

                    <h3 className="font-heading text-xl font-bold text-white mb-4 mt-1 text-center">
                      {discipline.name}
                    </h3>

                    <div className="space-y-2.5">
                      {discipline.options.map((opt) => (
                        <div
                          key={opt.es}
                          className="flex items-center justify-between gap-3 py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:bg-white/[0.06] transition-colors"
                        >
                          <span className="text-sm text-white/50">
                            {locale === "eu" ? opt.eu : opt.es}
                          </span>
                          <div className="text-right">
                            <span className="font-heading text-2xl font-bold bg-gradient-to-b from-accent to-accent/50 bg-clip-text text-transparent">
                              {opt.price}
                            </span>
                            <span className="text-accent/50 text-sm font-heading">€</span>
                            <span className="text-white/60 text-xs ml-1">{t("perMonth")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── FITNESS ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#070707] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,170,110,0.04)_0%,transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center mb-4">
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-3">
                {t("fitnessDesc")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                {t("fitness")}
              </h2>
            </div>
            <p className="text-center text-xs text-white/60 mb-12 max-w-lg mx-auto">
              {t("fitnessClasses")}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {fitnessPrices.map((item, i) => (
              <ScrollReveal key={item.sessions} delay={i * 0.06}>
                {item.popular ? (
                  /* ── Popular card: animated gradient border + glow ── */
                  <div className="relative z-10 h-full">
                    {/* Outer glow pulse */}
                    <div className="absolute -inset-3 bg-accent/15 rounded-3xl blur-xl motion-safe:animate-glow-pulse" />

                    {/* Badge above border container */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-accent text-primary text-[11px] font-bold px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap shadow-lg">
                        <Star size={10} fill="currentColor" />
                        {t("featured")}
                      </span>
                    </div>

                    {/* Animated border container */}
                    <div className="relative rounded-2xl p-[1.5px] overflow-hidden h-full">
                      <div className="absolute inset-[-200%] motion-safe:animate-spin-slow bg-[conic-gradient(from_0deg,#C9A96E_0%,transparent_25%,transparent_75%,#C9A96E_100%)]" />
                      <div className="relative bg-[#0a0a0a] rounded-[14px] p-5 pt-6 text-center h-full flex flex-col justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                        <p className="text-xs mb-1 text-white/50">
                          {item.sessions} {t("sessions")}
                        </p>
                        <div>
                          <span className="font-heading text-3xl sm:text-4xl font-bold bg-gradient-to-b from-accent to-accent/50 bg-clip-text text-transparent">
                            {item.price}
                          </span>
                          <span className="text-accent/50 text-lg font-heading font-bold">€</span>
                        </div>
                        <p className="text-[11px] mt-2 text-white/60">
                          {(item.price / item.sessions).toFixed(1)}€ {t("perClass")}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── Regular fitness card ── */
                  <div className="group relative h-full">
                    <div className="relative text-center p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                      <p className="text-xs mb-1 text-white/60">
                        {item.sessions} {t("sessions")}
                      </p>
                      <div>
                        <span className="font-heading text-3xl sm:text-4xl font-bold bg-gradient-to-b from-accent to-accent/50 bg-clip-text text-transparent">
                          {item.price}
                        </span>
                        <span className="text-accent/50 text-lg font-heading font-bold">€</span>
                      </div>
                      <p className="text-[11px] mt-2 text-white/60">
                        {(item.price / item.sessions).toFixed(1)}€ {t("perClass")}
                      </p>
                    </div>
                  </div>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── BOXEO + YOGA ──────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(244,67,54,0.04)_0%,transparent_50%),radial-gradient(circle_at_70%_30%,rgba(156,39,176,0.04)_0%,transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Boxeo */}
            <ScrollReveal>
              <div className="group relative h-full">
                <div className={`absolute -inset-0.5 bg-gradient-to-b ${PLAN_COLORS.boxeo.glow} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`} />
                <div className="relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 h-full hover:border-white/20 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className={`absolute top-0 left-8 right-8 h-[2px] ${PLAN_COLORS.boxeo.bar} rounded-full opacity-60`} />
                  <h2 className="font-heading text-2xl font-bold text-white mb-8 mt-1 text-center">
                    {t("boxeo")}
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {boxeoPrices.map((item) => (
                      <div
                        key={item.sessions}
                        className="text-center p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors"
                      >
                        <p className="text-xs text-white/60 mb-2">
                          {item.sessions} {t("sessions")}
                        </p>
                        <div>
                          <span className="font-heading text-3xl font-bold bg-gradient-to-b from-accent to-accent/50 bg-clip-text text-transparent">
                            {item.price}
                          </span>
                          <span className="text-accent/50 text-lg font-heading font-bold">€</span>
                        </div>
                        <p className="text-[11px] text-white/60 mt-2">
                          {(item.price / item.sessions).toFixed(1)}€ {t("perClass")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Yoga */}
            <ScrollReveal delay={0.1}>
              <div className="group relative h-full">
                <div className={`absolute -inset-0.5 bg-gradient-to-b ${PLAN_COLORS.yoga.glow} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500`} />
                <div className="relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 h-full hover:border-white/20 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className={`absolute top-0 left-8 right-8 h-[2px] ${PLAN_COLORS.yoga.bar} rounded-full opacity-60`} />
                  <h2 className="font-heading text-2xl font-bold text-white mb-8 mt-1 text-center">
                    {t("yoga")}
                  </h2>
                  <div className="space-y-3">
                    {yogaPrices.map((item) => (
                      <div
                        key={item.sessions}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors"
                      >
                        <span className="text-sm text-white/60">
                          {item.sessions} {t("sessions")}
                        </span>
                        <div className="text-right">
                          <span className="font-heading text-2xl font-bold bg-gradient-to-b from-accent to-accent/50 bg-clip-text text-transparent">
                            {item.price}
                          </span>
                          <span className="text-accent/50 text-sm font-heading">€</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── MASAJES ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#070707] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,170,110,0.04)_0%,transparent_60%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-3">
                {t("masajesDesc")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                {t("masajes")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {masajeTreatments.map((name, i) => (
              <ScrollReveal key={name} delay={i * 0.04}>
                <div className="group text-center p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <p className="font-medium text-white text-sm mb-3">{name}</p>
                  <div>
                    <span className="font-heading text-3xl font-bold bg-gradient-to-b from-accent to-accent/50 bg-clip-text text-transparent">
                      40
                    </span>
                    <span className="text-accent/50 text-lg font-heading font-bold">€</span>
                  </div>
                  <div className="w-8 h-[1px] bg-white/[0.08] mx-auto my-2.5" />
                  <p className="text-xs text-white/60">
                    <Users size={10} className="inline mr-1" />
                    {locale === "eu" ? "Erabiltzaileak" : "Usuarios"}:{" "}
                    <span className="font-bold text-accent/80">35€</span>
                  </p>
                </div>
              </ScrollReveal>
            ))}

            {/* Premium BitanBat - animated gradient border */}
            <ScrollReveal delay={masajeTreatments.length * 0.04}>
              <div className="relative">
                {/* Outer glow pulse */}
                <div className="absolute -inset-2 bg-accent/10 rounded-3xl blur-xl motion-safe:animate-glow-pulse" />

                {/* Animated border container */}
                <div className="relative rounded-2xl p-[1.5px] overflow-hidden">
                  <div className="absolute inset-[-200%] motion-safe:animate-spin-slow bg-[conic-gradient(from_0deg,#C9A96E_0%,transparent_25%,transparent_75%,#C9A96E_100%)]" />
                  <div className="relative bg-[#0a0a0a] rounded-[14px] p-5 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                    <div className="inline-flex items-center gap-1 bg-accent/10 text-accent text-[11px] font-bold uppercase px-3 py-1 rounded-full mb-3 border border-accent/20">
                      <Crown size={10} />
                      {tCommon("premium")}
                    </div>
                    <p className="font-medium text-white text-sm mb-3">
                      {tMassage("bitanbatName")}
                    </p>
                    <div>
                      <span className="font-heading text-3xl font-bold bg-gradient-to-b from-accent to-accent/50 bg-clip-text text-transparent">
                        65
                      </span>
                      <span className="text-accent/50 text-lg font-heading font-bold">€</span>
                    </div>
                    <div className="w-8 h-[1px] bg-white/[0.08] mx-auto my-2.5" />
                    <p className="text-xs text-white/60">
                      <Users size={10} className="inline mr-1" />
                      {locale === "eu" ? "Erabiltzaileak" : "Usuarios"}:{" "}
                      <span className="font-bold text-accent/80">60€</span>
                    </p>
                    <p className="text-[11px] text-white/60 mt-1">90 min</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="text-center mt-8">
              <Link
                href="/masajes"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-accent border border-accent/30 rounded-full hover:bg-accent/5 hover:border-accent/50 transition-all duration-300"
              >
                {locale === "eu" ? "Tratamendu guztiak ikusi" : "Ver todos los tratamientos"} →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── DESCUENTOS ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,170,110,0.06)_0%,transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-5">
                <Gift size={24} className="text-accent" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                {t("discounts")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                <div className="relative flex items-center gap-5 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-accent/20 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/10 flex items-center justify-center shrink-0">
                    <Users size={22} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t("familyDiscount")}</p>
                    <p className="text-white/60 text-xs mt-1">
                      {locale === "eu" ? "Familia guztientzat" : "Para toda la familia"}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                <div className="relative flex items-center gap-5 p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-accent/20 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-accent font-heading font-bold text-xl">10€</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t("singleClass")}</p>
                    <p className="text-white/60 text-xs mt-1">
                      {locale === "eu" ? "Konpromisorik gabe" : "Sin compromiso"}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 font-heading font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
              >
                <div className="absolute inset-0 bg-accent" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-yellow-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Phone size={18} className="relative text-primary" />
                <span className="relative text-primary">{SITE_CONFIG.phoneFormatted}</span>
              </a>
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
