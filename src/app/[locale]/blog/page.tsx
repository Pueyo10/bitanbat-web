import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const revalidate = 3600;

function formatPostDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(
    locale === "eu" ? "eu-ES" : "es-ES",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const tCommon = await getTranslations("Common");
  const isBasque = locale === "eu";

  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  const posts = (data || []) as BlogPost[];

  const [featured, ...rest] = posts;

  const editorialTracks = [
    {
      number: "01",
      title: isBasque ? "Estudioko istorioak" : "Historias del estudio",
      text: isBasque
        ? "Klaseen atzean dagoena, komunitatearen egunerokoa eta mugimenduak uzten dituen une txikiak."
        : "Lo que pasa detrás de las clases, el día a día de la comunidad y esos momentos pequeños que deja el movimiento.",
    },
    {
      number: "02",
      title: isBasque ? "Jarraibide arinak" : "Piezas útiles",
      text: isBasque
        ? "Mugimendu osasuntsuari, errutinari eta entrenamenduaren sentsazio onari buruzko testu laburrak."
        : "Textos breves sobre movimiento saludable, rutina y la sensación de entrenar con constancia.",
    },
    {
      number: "03",
      title: isBasque ? "Laster hemen" : "Pronto aquí",
      text: isBasque
        ? "Eduki editorial berriak aktibatzen direnean, atal hau izango da lehenengo lekuetako bat."
        : "Cuando activemos contenido nuevo, esta será una de las primeras paradas para descubrirlo.",
    },
  ] as const;

  const previewNotes = [
    {
      eyebrow: isBasque ? "Formatoa" : "Formato",
      title: isBasque
        ? "Artikulu laburrak eta irudi zainduak"
        : "Artículos breves e imágenes cuidadas",
      text: isBasque
        ? "Pieza bakoitzak irakurtzeko erraza izan beharko du, eta markaren tonu beroa mantenduko du."
        : "Cada pieza debería leerse fácil y seguir el tono cálido de la marca.",
    },
    {
      eyebrow: isBasque ? "Erritmoa" : "Ritmo",
      title: isBasque
        ? "Ez etengabe, baizik eta aukeratutakoa"
        : "No constante, sino curado",
      text: isBasque
        ? "Bloga ez da albiste-hodi bat izango, baizik eta arreta handiz aukeratutako edukien leihoa."
        : "El blog no será un feed de noticias, sino una ventana a contenidos elegidos con criterio.",
    },
    {
      eyebrow: isBasque ? "Tonua" : "Tono",
      title: isBasque
        ? "Editoriala, lasaia eta gertukoa"
        : "Editorial, sereno y cercano",
      text: isBasque
        ? "Idazkera garbia, marka sentipena eta gehiegizko zaratarik gabea."
        : "Redacción limpia, sensación de marca y sin ruido innecesario.",
    },
  ] as const;

  return (
    <>
      {/* ============ HERO — editorial masthead ============ */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,169,110,0.14),transparent_40%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 right-0 select-none font-heading font-bold uppercase text-display-xl text-outline opacity-40"
        >
          Blog
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="hero-line mb-6 text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
            <span style={{ "--line-delay": "0.1s" } as React.CSSProperties}>
              {isBasque ? "Berriak" : "Novedades"} — BitanBat
            </span>
          </p>

          <h1 className="font-heading font-bold text-white text-display-xl">
            <span className="hero-line">
              <span
                className="uppercase"
                style={{ "--line-delay": "0.25s" } as React.CSSProperties}
              >
                {t("title")}
              </span>
            </span>
            <span className="hero-line md:ml-[8vw]">
              <span
                className="font-serif-display italic font-normal lowercase text-accent"
                style={{ "--line-delay": "0.4s" } as React.CSSProperties}
              >
                {isBasque ? "istorioak & notak" : "historias & notas"}
              </span>
            </span>
          </h1>

          <p className="hero-line mt-10 max-w-md text-base leading-relaxed text-white/60 md:ml-[8vw] md:text-xl">
            <span style={{ "--line-delay": "0.6s" } as React.CSSProperties}>
              {t("subtitle")}
            </span>
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            /* ============ EMPTY STATE — editorial manifesto ============ */
            <div className="grid grid-cols-12 gap-y-16 md:gap-x-10">
              <div className="col-span-12 md:col-span-7">
                <ScrollReveal>
                  <p className="text-sm font-medium uppercase tracking-[0.32em] text-accent">
                    {isBasque ? "Laster" : "Próximamente"}
                  </p>
                  <h2 className="mt-8 font-heading text-3xl font-bold uppercase leading-[1.1] text-foreground md:text-5xl">
                    {isBasque
                      ? "Bloga oraindik ez dago aktibo, baina bere izaera jada definituta dago."
                      : "El blog todavía no está activo, pero su intención ya está definida."}
                  </h2>
                  <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:ml-[4vw] md:text-lg">
                    {isBasque
                      ? "Atal hau ez dugu hutsik uzten: marka, erritmo eta giro batekin erakusten dugu zer iritsiko den. Hemen agertuko dira estudioko istorioak, mugimenduari buruzko pieza laburrak eta komunitateari lotutako edukiak."
                      : "No queremos dejar esta sección vacía: la presentamos con marca, ritmo y una atmósfera que ya anticipa lo que vendrá. Aquí aparecerán historias del estudio, piezas breves sobre movimiento y contenido ligado a la comunidad."}
                  </p>
                </ScrollReveal>

                <div className="mt-14">
                  {editorialTracks.map((item, i) => (
                    <ScrollReveal key={item.number} delay={i * 0.1}>
                      <div className="grid grid-cols-12 gap-y-2 border-t border-accent/40 py-6 md:gap-x-6">
                        <span className="col-span-2 text-sm font-medium tracking-[0.2em] text-accent md:col-span-1">
                          {item.number}
                        </span>
                        <h3 className="col-span-10 font-heading text-xl font-bold uppercase text-foreground md:col-span-4">
                          {item.title}
                        </h3>
                        <p className="col-span-12 text-sm leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
                          {item.text}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                  <div className="border-t border-accent/40" />
                </div>

                <ScrollReveal delay={0.2}>
                  <div className="mt-10 flex flex-wrap items-center gap-8">
                    <Link
                      href="/clases"
                      className="group inline-flex min-h-11 items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
                    >
                      {isBasque ? "Ikusi klaseak" : "Ver clases"}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                    <Link
                      href="/contacto"
                      className="group inline-flex min-h-11 items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
                    >
                      {isBasque ? "Hitz egin gurekin" : "Hablemos"}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              <aside className="col-span-12 md:col-span-4 md:col-start-9">
                <ScrollReveal variant="slide-right" delay={0.15}>
                  <p className="text-sm font-medium uppercase tracking-[0.32em] text-accent">
                    {isBasque ? "Zer etorriko da?" : "Lo que vendrá"}
                  </p>
                  <h3 className="mt-4 font-serif-display text-2xl italic lowercase text-foreground md:text-3xl">
                    {isBasque
                      ? "atal hau ez da abandonatuta sentitu behar"
                      : "esta sección no debe sentirse abandonada"}
                  </h3>

                  <div className="mt-10 space-y-8">
                    {previewNotes.map((note) => (
                      <div key={note.title} className="border-t border-accent/40 pt-4">
                        <p className="text-xs font-medium uppercase tracking-[0.32em] text-accent">
                          {note.eyebrow}
                        </p>
                        <h4 className="mt-3 font-heading text-lg font-semibold text-foreground">
                          {note.title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {note.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </aside>
            </div>
          ) : (
            /* ============ POSTS — newspaper editorial list ============ */
            <div>
              {/* Featured — first entry, oversized with image */}
              <ScrollReveal>
                <Link
                  href={{
                    pathname: "/blog/[slug]",
                    params: { slug: featured.slug },
                  }}
                  className="group block"
                >
                  <div className="grid grid-cols-12 gap-y-8 md:gap-x-10">
                    <div className="col-span-12 md:col-span-7 md:-mr-[6vw]">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                        {featured.image_url ? (
                          <Image
                            src={featured.image_url}
                            alt={getLocalizedField(featured, "title", locale)}
                            fill
                            sizes="(max-width: 768px) 100vw, 60vw"
                            className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-end bg-[linear-gradient(145deg,rgba(201,169,110,0.26),rgba(10,10,10,0.06))] p-8">
                            <span className="font-serif-display text-3xl italic lowercase text-foreground/60">
                              {tCommon("article")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-span-12 flex flex-col justify-end md:order-first md:col-span-5">
                      <p className="flex items-baseline gap-4 text-xs font-medium uppercase tracking-[0.32em] text-accent">
                        <span>01</span>
                        <span>{formatPostDate(featured.created_at, locale)}</span>
                      </p>
                      <h2 className="mt-6 font-heading font-bold uppercase text-display-md text-foreground transition-colors duration-500 group-hover:text-accent">
                        {getLocalizedField(featured, "title", locale)}
                      </h2>
                      <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground line-clamp-4 md:text-lg">
                        {getLocalizedField(featured, "excerpt", locale)}
                      </p>
                      <p className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors group-hover:text-accent">
                        {t("readMore")}
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>

              {/* The rest — thin editorial rows */}
              {rest.length > 0 && (
                <div className="mt-20 md:mt-28">
                  {rest.map((post, i) => (
                    <ScrollReveal key={post.id} delay={Math.min(i * 0.08, 0.32)}>
                      <Link
                        href={{
                          pathname: "/blog/[slug]",
                          params: { slug: post.slug },
                        }}
                        className="group grid grid-cols-12 items-baseline gap-y-3 border-t border-accent/40 py-8 md:gap-x-8 md:py-10"
                      >
                        <p className="col-span-12 flex items-baseline gap-4 text-xs font-medium uppercase tracking-[0.32em] text-accent md:col-span-3 md:block md:space-y-2">
                          <span className="block">
                            {String(i + 2).padStart(2, "0")} — {tCommon("article")}
                          </span>
                          <span className="block text-muted-foreground">
                            {formatPostDate(post.created_at, locale)}
                          </span>
                        </p>

                        <div className="col-span-11 md:col-span-8">
                          <h3 className="font-heading text-2xl font-bold uppercase leading-tight text-foreground transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-accent md:text-4xl">
                            {getLocalizedField(post, "title", locale)}
                          </h3>
                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground line-clamp-2 md:text-base">
                            {getLocalizedField(post, "excerpt", locale)}
                          </p>
                        </div>

                        <span className="col-span-1 flex justify-end self-center md:col-span-1">
                          <ArrowUpRight
                            size={22}
                            className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                          />
                        </span>
                      </Link>
                    </ScrollReveal>
                  ))}
                  <div className="border-t border-accent/40" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
