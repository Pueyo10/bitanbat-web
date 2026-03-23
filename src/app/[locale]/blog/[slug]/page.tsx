import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import sanitizeHtml from "sanitize-html";

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
  const title = locale === "eu" ? post.title_eu || post.title_es : post.title_es;
  const content =
    locale === "eu" ? post.content_eu || post.content_es : post.content_es;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          {t("back")}
        </Link>

        {post.image_url && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image_url}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {title}
        </h1>

        <time className="text-sm text-muted-foreground block mb-8">
          {new Date(post.created_at).toLocaleDateString(
            locale === "eu" ? "eu-ES" : "es-ES",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </time>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      </div>
    </div>
  );
}
