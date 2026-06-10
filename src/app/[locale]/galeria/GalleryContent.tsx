"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play, X, Instagram, ExternalLink } from "lucide-react";
import { getLocalizedField } from "@/lib/utils";

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

const ITEMS_PER_PAGE = 12;

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
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredMedia = useMemo(
    () =>
      activeFilter === "all"
        ? allMedia
        : allMedia.filter((media) => media.category === activeFilter),
    [activeFilter, allMedia]
  );
  const categoryCount = useMemo(
    () => new Set(allMedia.map((media) => media.category).filter(Boolean)).size,
    [allMedia]
  );
  const videoCount = useMemo(
    () => allMedia.filter((media) => media.type === "video").length,
    [allMedia]
  );

  const visibleMedia = useMemo(
    () => filteredMedia.slice(0, visibleCount),
    [filteredMedia, visibleCount]
  );
  const visibleItems = useMemo(
    () =>
      visibleMedia.map((media) => ({
        media,
        caption: getLocalizedField(media, "caption", locale) || "",
      })),
    [locale, visibleMedia]
  );
  const hasMore = visibleCount < filteredMedia.length;

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeFilter]);

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_PAGE, filteredMedia.length)
          );
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [filteredMedia.length, hasMore]);

  const getCaption = useCallback(
    (media: GalleryMedia) => getLocalizedField(media, "caption", locale) || "",
    [locale]
  );

  const closeLightbox = useCallback(() => setSelectedMedia(null), []);

  useEffect(() => {
    if (!selectedMedia) return;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMedia, closeLightbox]);

  const selectedCaption = selectedMedia ? getCaption(selectedMedia) : "";

  return (
    <>
      <section className="lux-section-dark py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="grid gap-8 xl:grid-cols-[1.35fr_0.9fr] xl:items-end">
              <div>
                <p className="text-accent text-sm font-medium uppercase tracking-[0.2em]">
                  {locale === "eu" ? "Komunitatea" : "Comunidad"}
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-white md:text-5xl">
                  {locale === "eu" ? "BitanBat uneak" : "Instantes de BitanBat"}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/64 md:text-lg">
                  {locale === "eu"
                    ? "Klaseak, ongizatea eta eguneroko giroa bilduta: mugimendua, energia eta komunitatea leku berean."
                    : "Una mezcla de clases, bienestar y vida diaria del centro para que la galeria se sienta como una extension de la marca, no solo como un volcado de contenido."}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="border-t border-accent/25 pt-4">
                  <p className="font-heading text-2xl font-bold text-gradient-gold">
                    {allMedia.length}
                  </p>
                  <p className="mt-1 text-sm text-white/58">
                    {locale === "eu" ? "Pieza ikusgai" : "Piezas visibles"}
                  </p>
                </div>
                <div className="border-t border-accent/25 pt-4">
                  <p className="font-heading text-2xl font-bold text-gradient-gold">
                    {videoCount}
                  </p>
                  <p className="mt-1 text-sm text-white/58">
                    {locale === "eu" ? "Bideo" : "Videos"}
                  </p>
                </div>
                <div className="border-t border-accent/25 pt-4">
                  <p className="font-heading text-2xl font-bold text-gradient-gold">
                    {categoryCount}
                  </p>
                  <p className="mt-1 text-sm text-white/58">
                    {locale === "eu" ? "Kategoriak" : "Categorias"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2 border-t border-white/10 pt-6 xl:justify-start">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  aria-pressed={activeFilter === filter.value}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    activeFilter === filter.value
                      ? "bg-accent text-primary shadow-[0_14px_30px_rgba(201,169,110,0.22)]"
                      : "border border-white/10 bg-white/[0.02] text-white/72 hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {t(filter.key)}
                </button>
              ))}
            </div>
          </div>

          {filteredMedia.length === 0 ? (
            <div className="border-t border-white/10 px-6 py-20 text-center text-white/64">
              <p className="font-heading text-2xl text-white">
                {locale === "eu" ? "Laster gehiago" : "Proximamente mas"}
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/58 md:text-base">
                {locale === "eu"
                  ? "Une honetan ez dago elementurik iragazki honetan, baina material gehiago prestatzen ari gara."
                  : "Ahora mismo no hay piezas para este filtro, pero el espacio queda listo para crecer sin sentirse vacio."}
              </p>
            </div>
          ) : (
            <div className="border-t border-white/10 pt-6">
              <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
                {visibleItems.map(({ media, caption }) => (
                  <div
                    key={media.id}
                    className="group mb-4 cursor-pointer break-inside-avoid"
                    onClick={() => setSelectedMedia(media)}
                  >
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/50 shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
                      {media.type === "video" ? (
                        <>
                          <Image
                            src={media.poster || media.url}
                            alt={caption || `BitanBat ${media.id}`}
                            width={600}
                            height={800}
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/88 text-primary shadow-lg">
                              <Play size={20} fill="currentColor" />
                            </span>
                          </div>
                          <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/76">
                            Video
                          </div>
                        </>
                      ) : (
                        <Image
                          src={media.url}
                          alt={caption || `BitanBat ${media.id}`}
                          width={600}
                          height={400}
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12">
                        <p className="line-clamp-2 text-sm text-white/88">
                          {caption ||
                            (locale === "eu" ? "Pieza ireki" : "Abrir pieza")}
                        </p>
                      </div>

                      {media.instagramUrl && (
                        <a
                          href={media.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/45 p-1.5 text-white/70 opacity-100 transition-all hover:bg-black/60 hover:text-white"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div ref={loadMoreRef} className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {selectedMedia && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedCaption || (locale === "eu" ? "Galeria" : "Galería")}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
            onClick={closeLightbox}
            aria-label={locale === "eu" ? "Itxi" : "Cerrar"}
            autoFocus
          >
            <X size={32} />
          </button>
          <div
            className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-black/40 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.3)] md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            {selectedMedia.type === "video" ? (
              <video
                src={selectedMedia.url}
                poster={selectedMedia.poster}
                controls
                autoPlay
                muted
                playsInline
                className="mx-auto max-h-[80vh] max-w-full rounded-[1.5rem]"
              />
            ) : (
              <Image
                src={selectedMedia.url}
                alt={selectedCaption || `BitanBat ${selectedMedia.id}`}
                width={1200}
                height={800}
                className="mx-auto max-h-[80vh] w-auto rounded-[1.5rem] object-contain"
              />
            )}
            {selectedCaption && (
              <div className="mt-4 text-center">
                <p className="text-sm text-white/90 md:text-base">
                  {selectedCaption}
                </p>
                {selectedMedia.instagramUrl && (
                  <a
                    href={selectedMedia.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent/80 transition-colors hover:text-accent"
                  >
                    <Instagram size={14} />
                    {locale === "eu" ? "Instagramen ikusi" : "Ver en Instagram"}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
