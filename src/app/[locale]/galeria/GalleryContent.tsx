"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X, Instagram, ExternalLink } from "lucide-react";
import { getLocalizedField } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

export default function GalleryContent({
  allMedia,
  locale,
}: {
  allMedia: GalleryMedia[];
  locale: string;
}) {
  const t = useTranslations("Gallery");
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredMedia =
    activeFilter === "all"
      ? allMedia
      : allMedia.filter((m) => m.category === activeFilter);

  const getCaption = (media: GalleryMedia) =>
    getLocalizedField(media, "caption", locale) || "";

  const closeLightbox = useCallback(() => setSelectedMedia(null), []);

  useEffect(() => {
    if (!selectedMedia) return;
    document.body.style.overflow = "hidden";
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMedia, closeLightbox]);

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-12">
            {categoryFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                aria-pressed={activeFilter === f.value}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground border border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {t(f.key)}
              </button>
            ))}
          </ScrollReveal>

          {filteredMedia.length === 0 ? (
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
                    <div className="relative overflow-hidden rounded-lg bg-black">
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

                      {getCaption(media) && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-sm line-clamp-2">
                            {getCaption(media)}
                          </p>
                        </div>
                      )}

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
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={getCaption(selectedMedia) || "Galería"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
              onClick={closeLightbox}
              aria-label="Cerrar"
              autoFocus
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
                  alt={
                    getCaption(selectedMedia) ||
                    `BitanBat ${selectedMedia.id}`
                  }
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto mx-auto object-contain rounded-lg"
                />
              )}
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
    </>
  );
}
