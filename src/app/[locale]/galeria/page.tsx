"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X, Instagram, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryImage } from "@/types/database";
import { getLocalizedField } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
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
  category?: string;
  tags?: string[];
};

const categoryFilters = [
  { key: "filterAll", value: "all" },
  { key: "filterFitness", value: "fitness" },
  { key: "filterDantza", value: "dantza" },
  { key: "filterWellness", value: "wellness" },
  { key: "filterComunidad", value: "comunidad" },
  { key: "filterGeneral", value: "general" },
];

export default function GaleriaPage() {
  const t = useTranslations("Gallery");
  const locale = useLocale();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
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
    category: img.category ?? undefined,
  }));

  const allMedia = [...(instagramMedia as GalleryMedia[]), ...remoteMedia].sort(
    (a, b) => a.order - b.order
  );

  const filteredMedia =
    activeFilter === "all"
      ? allMedia
      : allMedia.filter((m) => m.category === activeFilter);

  const getCaption = (media: GalleryMedia) =>
    getLocalizedField(media, "caption", locale) || "";

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
          <a
            href={SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-accent hover:text-accent/80 transition-colors font-medium"
          >
            <Instagram size={20} />
            {SITE_CONFIG.instagramHandle}
          </a>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {t(f.key)}
            </button>
          ))}
        </div>

        {loading && allMedia.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">...</div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Proximamente...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredMedia.map((media) => (
                <motion.div
                  key={media.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
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
                        alt={getCaption(media) || `BitanBat ${media.id}`}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    {/* Caption overlay */}
                    {getCaption(media) && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm line-clamp-2">
                          {getCaption(media)}
                        </p>
                      </div>
                    )}

                    {/* Instagram link */}
                    {media.instagramUrl && (
                      <a
                        href={media.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
              onClick={() => setSelectedMedia(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === "video" ? (
                <video
                  src={selectedMedia.url}
                  poster={selectedMedia.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[80vh] max-w-full mx-auto rounded-lg"
                />
              ) : (
                <Image
                  src={selectedMedia.url}
                  alt={getCaption(selectedMedia) || `BitanBat ${selectedMedia.id}`}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto mx-auto object-contain rounded-lg"
                />
              )}
              {/* Caption below media */}
              {getCaption(selectedMedia) && (
                <div className="text-center mt-4">
                  <p className="text-white/90 text-sm md:text-base">
                    {getCaption(selectedMedia)}
                  </p>
                  {selectedMedia.instagramUrl && (
                    <a
                      href={selectedMedia.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-accent/80 hover:text-accent text-sm transition-colors"
                    >
                      <Instagram size={14} />
                      Ver en Instagram
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
