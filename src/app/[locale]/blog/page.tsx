"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";

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
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Proximamente...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow group"
                >
                  {post.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt={getLocalizedField(post, "title", locale)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {getLocalizedField(post, "title", locale)}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {getLocalizedField(post, "excerpt", locale)}
                    </p>
                    <p className="text-accent text-sm font-medium mt-3">
                      {t("readMore")} &rarr;
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
