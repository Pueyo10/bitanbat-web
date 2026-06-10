import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import type { GalleryImage } from "@/types/database";
import { SITE_CONFIG } from "@/lib/constants";
import instagramMedia from "@/data/instagram-media.json";
import GalleryContent from "./GalleryContent";

export const revalidate = 3600;

type GalleryMedia = {
  id: string;
  type: "image" | "video";
  url: string;
  poster?: string;
  caption_es?: string | null;
  caption_eu?: string | null;
  order: number;
  instagramUrl?: string;
  category?: string;
  tags?: string[];
};

export default async function GaleriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gallery");

  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .order("order");
  const images = (data || []) as GalleryImage[];

  const remoteMedia: GalleryMedia[] = images.map((img) => ({
    ...img,
    type: "image",
    category: img.category ?? undefined,
  }));

  const allMedia = [...(instagramMedia as GalleryMedia[]), ...remoteMedia].sort(
    (a, b) => a.order - b.order
  );

  return (
    <>
      {/* Hero — display type, sans strength + serif grace */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-16 md:pt-44 md:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[4vw] bottom-[8%] select-none font-heading text-[20vw] font-bold uppercase leading-none tracking-tight text-outline opacity-50"
        >
          {locale === "eu" ? "Uneak" : "Momentos"}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="hero-line mb-6 text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
            <span style={{ "--line-delay": "0.1s" } as React.CSSProperties}>
              {SITE_CONFIG.instagramHandle} — Instagram
            </span>
          </p>

          <h1 className="font-heading font-bold uppercase text-white text-display-lg">
            <span className="hero-line">
              <span style={{ "--line-delay": "0.25s" } as React.CSSProperties}>
                {t("title")}
              </span>
            </span>
            <span className="hero-line">
              <span
                className="font-serif-display lowercase italic font-normal text-accent"
                style={{ "--line-delay": "0.4s" } as React.CSSProperties}
              >
                {locale === "eu" ? "mugimenduan" : "en movimiento"}
              </span>
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="hero-line max-w-xl text-base leading-relaxed text-white/60 md:ml-[8vw] md:text-xl">
              <span style={{ "--line-delay": "0.6s" } as React.CSSProperties}>
                {t("subtitle")}
              </span>
            </p>
            <p className="hero-line font-heading text-xs uppercase tracking-[0.24em] text-white/40 md:text-sm">
              <span style={{ "--line-delay": "0.75s" } as React.CSSProperties}>
                {String(allMedia.length).padStart(2, "0")}{" "}
                {locale === "eu" ? "une" : "instantes"}
              </span>
            </p>
          </div>
        </div>
      </section>

      <GalleryContent allMedia={allMedia} locale={locale} />
    </>
  );
}
