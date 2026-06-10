import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock3, PenLine, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const revalidate = 3600;

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

  const editorialTracks = [
    {
      icon: BookOpen,
      title: isBasque ? "Estudioko istorioak" : "Historias del estudio",
      text: isBasque
        ? "Klaseen atzean dagoena, komunitatearen egunerokoa eta mugimenduak uzten dituen une txikiak."
        : "Lo que pasa detrás de las clases, el día a día de la comunidad y esos momentos pequeños que deja el movimiento.",
    },
    {
      icon: PenLine,
      title: isBasque ? "Jarraibide arinak" : "Piezas útiles",
      text: isBasque
        ? "Mugimendu osasuntsuari, errutinari eta entrenamenduaren sentsazio onari buruzko testu laburrak."
        : "Textos breves sobre movimiento saludable, rutina y la sensación de entrenar con constancia.",
    },
    {
      icon: Clock3,
      title: isBasque ? "Laster hemen" : "Pronto aquí",
      text: isBasque
        ? "Eduki editorial berriak aktibatzen direnean, atal hau izango da lehenengo lekuetako bat."
        : "Cuando activemos contenido nuevo, esta será una de las primeras paradas para descubrirlo.",
    },
  ] as const;

  const previewNotes = [
    {
      eyebrow: isBasque ? "Formatoa" : "Formato",
      title: isBasque ? "Artikulu laburrak eta irudi zainduak" : "Artículos breves e imágenes cuidadas",
      text: isBasque
        ? "Pieza bakoitzak irakurtzeko erraza izan beharko du, eta markaren tonu beroa mantenduko du."
        : "Cada pieza debería leerse fácil y seguir el tono cálido de la marca.",
    },
    {
      eyebrow: isBasque ? "Erritmoa" : "Ritmo",
      title: isBasque ? "Ez etengabe, baizik eta aukeratutakoa" : "No constante, sino curado",
      text: isBasque
        ? "Bloga ez da albiste-hodi bat izango, baizik eta arreta handiz aukeratutako edukien leihoa."
        : "El blog no será un feed de noticias, sino una ventana a contenidos elegidos con criterio.",
    },
    {
      eyebrow: isBasque ? "Tonua" : "Tono",
      title: isBasque ? "Editoriala, lasaia eta gertukoa" : "Editorial, sereno y cercano",
      text: isBasque
        ? "Idazkera garbia, marka sentipena eta gehiegizko zaratarik gabea."
        : "Redacción limpia, sensación de marca y sin ruido innecesario.",
    },
  ] as const;

  return (
    <>
      <PageHero
        label={isBasque ? "Berriak" : "Novedades"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.10),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(10,10,10,0.06),_transparent_28%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            <Sparkles size={14} />
            {isBasque ? "Artxibo editoriala" : "Archivo editorial"}
          </div>

          {posts.length === 0 ? (
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="relative">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                  <BookOpen size={14} />
                  {isBasque ? "Laster" : "Próximamente"}
                </div>

                <h2 className="mt-6 max-w-2xl font-heading text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  {isBasque
                    ? "Bloga oraindik ez dago aktibo, baina bere izaera jada definituta dago."
                    : "El blog todavía no está activo, pero su intención ya está definida."}
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {isBasque
                    ? "Atal hau ez dugu hutsik uzten: marka, erritmo eta giro batekin erakusten dugu zer iritsiko den. Hemen agertuko dira estudioko istorioak, mugimenduari buruzko pieza laburrak eta komunitateari lotutako edukiak."
                    : "No queremos dejar esta sección vacía: la presentamos con marca, ritmo y una atmósfera que ya anticipa lo que vendrá. Aquí aparecerán historias del estudio, piezas breves sobre movimiento y contenido ligado a la comunidad."}
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {editorialTracks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="border-t border-accent/20 pt-4">
                        <Icon size={18} className="text-accent" />
                        <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/clases"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-heading font-semibold text-primary transition-all duration-300 hover:bg-white hover:scale-[1.02]"
                  >
                    {isBasque ? "Ikusi klaseak" : "Ver clases"}
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/15 px-6 py-3 font-heading font-semibold text-foreground transition-all duration-300 hover:border-accent/40 hover:bg-white/40"
                  >
                    {isBasque ? "Hitz egin gurekin" : "Hablemos"}
                  </Link>
                </div>
              </article>

              <aside className="lg:border-l lg:border-border/70 lg:pl-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  {isBasque ? "Zer etorriko da?" : "Lo que vendrá"}
                </p>
                <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">
                  {isBasque ? "Atal hau ez da abandonatuta sentitu behar" : "Esta sección no debe sentirse abandonada"}
                </h3>

                <div className="mt-8 space-y-8">
                  {previewNotes.map((note) => (
                    <div key={note.title} className="border-t border-border/70 pt-4">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-accent">
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
              </aside>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 md:gap-8">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08}>
                  <Link
                    href={{
                      pathname: "/blog/[slug]",
                      params: { slug: post.slug },
                    }}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(0,0,0,0.12)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt={getLocalizedField(post, "title", locale)}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-end bg-[linear-gradient(145deg,rgba(201,169,110,0.26),rgba(10,10,10,0.04))] p-6">
                          <div className="rounded-full border border-white/20 bg-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/80">
                            {tCommon("article")}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-accent/80">
                        <span>
                          {new Date(post.created_at).toLocaleDateString(
                            locale === "eu" ? "eu-ES" : "es-ES",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-accent">
                        {getLocalizedField(post, "title", locale)}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
                        {getLocalizedField(post, "excerpt", locale)}
                      </p>

                      <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground">
                        {t("readMore")}
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
