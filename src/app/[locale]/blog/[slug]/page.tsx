import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createClient as createBuildClient } from "@/lib/supabase/client";
import { routing } from "@/i18n/routing";
import sanitizeHtml from "sanitize-html";

export const revalidate = 86400;

export async function generateStaticParams() {
  const supabase = createBuildClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  return (posts || []).flatMap((post) =>
    routing.locales.map((locale) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title_es, title_eu, excerpt_es, excerpt_eu")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return {};

  const title =
    locale === "eu" ? post.title_eu || post.title_es : post.title_es;
  const description =
    locale === "eu" ? post.excerpt_eu || post.excerpt_es : post.excerpt_es;

  return {
    title: `${title} | BitanBat`,
    description: description || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  const t = await getTranslations("Common");
  const isBasque = locale === "eu";
  const title = locale === "eu" ? post.title_eu || post.title_es : post.title_es;
  const content =
    locale === "eu" ? post.content_eu || post.content_es : post.content_es;
  const formattedDate = new Date(post.created_at).toLocaleDateString(
    locale === "eu" ? "eu-ES" : "es-ES",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article className="relative overflow-hidden bg-background pt-28 pb-24 md:pt-36 md:pb-32">
      {/* ============ Editorial article header ============ */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="group inline-flex min-h-11 items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          {t("back")}
        </Link>

        <p className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm font-medium uppercase tracking-[0.32em] text-accent">
          <span>{t("article")}</span>
          <span aria-hidden="true" className="text-accent/50">
            —
          </span>
          <time dateTime={post.created_at} className="text-muted-foreground">
            {formattedDate}
          </time>
        </p>

        <h1 className="mt-6 max-w-5xl font-heading font-bold uppercase text-display-lg text-foreground">
          {title}
        </h1>

        <div className="mt-10 border-t border-accent/40 md:ml-[8vw]" />
      </header>

      {/* ============ Full-bleed image ============ */}
      {post.image_url && (
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 md:mt-14 lg:px-8">
          <figure className="md:-mr-[6vw]">
            <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
              <Image
                src={post.image_url}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 90vw"
                className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
            </div>
          </figure>
        </div>
      )}

      {/* ============ Reading body ============ */}
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 md:mt-20 lg:px-8">
        <div className="mx-auto max-w-prose lg:-translate-x-[6%]">
          <div
            className="text-lg leading-relaxed text-foreground/80 [&_p]:my-6 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-foreground [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-foreground [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_em]:font-serif-display [&_em]:italic [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-2 [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:font-serif-display [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-foreground [&_img]:rounded-2xl [&_hr]:my-10 [&_hr]:border-accent/40"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />

          {/* ============ Editorial footer / back link ============ */}
          <footer className="mt-16 border-t border-accent/40 pt-8">
            <Link
              href="/blog"
              className="group inline-flex min-h-11 items-center gap-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              {isBasque ? "Itzuli blogera" : "Volver al blog"}
            </Link>
            <span className="mx-6 text-accent/40" aria-hidden="true">
              /
            </span>
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
          </footer>
        </div>
      </div>
    </article>
  );
}
