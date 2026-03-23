"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function BlogPage() {
  const t = useTranslations("Blog");
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setPosts(data as BlogPost[]);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <PageHero
        label={locale === "eu" ? "Berriak" : "Novedades"}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="font-heading text-2xl">
                {locale === "eu" ? "Laster..." : "Próximamente..."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08}>
                  <Link
                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                    className="block group overflow-hidden rounded-lg"
                  >
                    {post.image_url && (
                      <div className="relative h-56 overflow-hidden rounded-lg">
                        <Image
                          src={post.image_url}
                          alt={getLocalizedField(post, "title", locale)}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="pt-5">
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {getLocalizedField(post, "title", locale)}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {getLocalizedField(post, "excerpt", locale)}
                      </p>
                      <p className="text-accent text-sm font-medium mt-4">
                        {t("readMore")} &rarr;
                      </p>
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
