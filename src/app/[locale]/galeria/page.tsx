import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import type { GalleryImage } from "@/types/database";
import { SITE_CONFIG } from "@/lib/constants";
import instagramMedia from "@/data/instagram-media.json";
import PageHero from "@/components/ui/PageHero";
import GalleryContent from "./GalleryContent";

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
      <PageHero
        label={SITE_CONFIG.instagramHandle}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <GalleryContent allMedia={allMedia} locale={locale} />
    </>
  );
}
