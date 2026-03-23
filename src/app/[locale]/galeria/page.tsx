"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryImage } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import instagramMedia from "@/data/instagram-media.json";

type GalleryMedia = {
  id: string;
  type: "image" | "video";
  url: string;
  poster?: string;
  caption_es?: string | null;
  caption_eu?: string | null;
  order: number;
  instagramUrl?: string;
};

export default function GaleriaPage() {
  const t = useTranslations("Gallery");
  const locale = useLocale();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      const supabase = createClient();
      const { data } = await supabase
        .from("gallery_images")
        .select("*")
        .order("order");
      if (data) setImages(data as GalleryImage[]);
      setLoading(false);
    }
    fetchImages();
  }, []);

  const remoteMedia: GalleryMedia[] = images.map((img) => ({
    ...img,
    type: "image",
  }));

  const allMedia = [...(instagramMedia as GalleryMedia[]), ...remoteMedia].sort(
    (a, b) => a.order - b.order
  );

  const getAlt = (media: GalleryMedia) =>
    getLocalizedField(media, "caption", locale) ||
    `Instagram media ${media.id}`;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {loading && allMedia.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">...</div>
        ) : allMedia.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Proximamente...</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {allMedia.map((media, i) => (
              <motion.div
                key={media.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedMedia(media)}
              >
                <div className="relative overflow-hidden rounded-xl bg-black">
                  {media.type === "video" ? (
                    <>
                      <video
                        src={media.url}
                        poster={media.poster}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/85 text-primary shadow-lg">
                          <Play size={20} fill="currentColor" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={media.url}
                      alt={getAlt(media)}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white"
              onClick={() => setSelectedMedia(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === "video" ? (
                <video
                  src={selectedMedia.url}
                  poster={selectedMedia.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[85vh] max-w-full rounded-lg"
                />
              ) : (
                <Image
                  src={selectedMedia.url}
                  alt={getAlt(selectedMedia)}
                  width={1200}
                  height={800}
                  className="max-h-[85vh] w-auto object-contain rounded-lg"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
