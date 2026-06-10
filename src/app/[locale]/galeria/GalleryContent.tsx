"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Instagram, Play, X } from "lucide-react";
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

const ITEMS_PER_PAGE = 12;

const imageHoverClass =
  "h-auto w-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]";

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
  const gridRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    if (gridRef.current && gridRef.current.getBoundingClientRect().top < 0) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  const stats = [
    {
      value: allMedia.length,
      label: locale === "eu" ? "pieza ikusgai" : "piezas visibles",
    },
    {
      value: videoCount,
      label: locale === "eu" ? "bideo" : "vídeos",
    },
    {
      value: categoryCount,
      label: locale === "eu" ? "kategoria" : "categorías",
    },
  ];

  return (
    <>
      {/* Chapter — light: editorial intro + display stats */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <ScrollReveal>
                <p className="text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-sm">
                  {locale === "eu" ? "Komunitatea" : "Comunidad"}
                </p>
                <h2 className="mt-4 font-heading font-bold uppercase text-foreground text-display-md">
                  {locale === "eu" ? "BitanBat" : "Instantes"}{" "}
                  <span className="font-serif-display lowercase italic font-normal text-accent">
                    {locale === "eu" ? "uneak" : "de bitanbat"}
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:ml-[8vw] md:text-lg">
                  {locale === "eu"
                    ? "Klaseak, ongizatea eta eguneroko giroa bilduta: mugimendua, energia eta komunitatea leku berean."
                    : "Una mezcla de clases, bienestar y vida diaria del centro para que la galeria se sienta como una extension de la marca, no solo como un volcado de contenido."}
                </p>
              </ScrollReveal>
            </div>

            <div className="md:col-span-5">
              <ScrollReveal delay={0.15}>
                <div className="grid grid-cols-3 gap-5 md:gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="border-t border-accent/40 pt-5">
                      <p className="font-heading text-4xl font-bold text-foreground md:text-6xl">
                        {String(stat.value).padStart(2, "0")}
                      </p>
                      <p className="mt-2 font-serif-display text-base lowercase italic text-accent md:text-lg">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter — dark: filters + editorial masonry */}
      <section className="lux-section-dark py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-2 border-b border-white/10">
              <div className="flex flex-wrap gap-x-6 md:gap-x-9">
                {categoryFilters.map((filter) => {
                  const isActive = activeFilter === filter.value;
                  return (
                    <button
                      key={filter.value}
                      onClick={() => handleFilterChange(filter.value)}
                      aria-pressed={isActive}
                      className={`group relative inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.22em] transition-colors duration-300 md:text-sm ${
                        isActive ? "text-white" : "text-white/45 hover:text-white"
                      }`}
                    >
                      {t(filter.key)}
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-40 group-hover:scale-x-100"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="hidden min-h-11 items-center font-heading text-xs font-semibold uppercase tracking-[0.24em] text-white/40 sm:flex">
                <span className="mr-2 text-accent">
                  {String(filteredMedia.length).padStart(2, "0")}
                </span>
                {locale === "eu" ? "pieza" : "piezas"}
              </p>
            </div>
          </ScrollReveal>

          {filteredMedia.length === 0 ? (
            <div className="py-24 md:ml-[8vw] md:py-32">
              <p className="font-serif-display text-3xl lowercase italic text-accent md:text-4xl">
                {locale === "eu" ? "laster gehiago" : "próximamente más"}
              </p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/58 md:text-base">
                {locale === "eu"
                  ? "Une honetan ez dago elementurik iragazki honetan, baina material gehiago prestatzen ari gara."
                  : "Ahora mismo no hay piezas para este filtro, pero el espacio queda listo para crecer sin sentirse vacio."}
              </p>
            </div>
          ) : (
            <div ref={gridRef} className="scroll-mt-28 pt-10 md:pt-14">
              <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
                {visibleItems.map(({ media, caption }, index) => (
                  <div
                    key={media.id}
                    className="group mb-5 cursor-pointer break-inside-avoid"
                    onClick={() => setSelectedMedia(media)}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-black/40">
                      {media.type === "video" ? (
                        <>
                          <Image
                            src={media.poster || media.url}
                            alt={caption || `BitanBat ${media.id}`}
                            width={600}
                            height={800}
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={imageHoverClass}
                          />
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm">
                              <Play size={18} fill="currentColor" />
                            </span>
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
                          className={imageHoverClass}
                        />
                      )}

                      {/* Editorial numbering + video badge */}
                      <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                        <span className="font-heading text-xs font-semibold tracking-[0.24em] text-white/55">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {media.type === "video" && (
                          <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                            {locale === "eu" ? "Bideoa" : "Vídeo"}
                          </span>
                        )}
                      </div>

                      {/* Caption rises on hover */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 pt-14 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="flex translate-y-3 items-end justify-between gap-3 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                          <p className="line-clamp-2 text-sm text-white/90">
                            {caption ||
                              (locale === "eu" ? "Pieza ireki" : "Abrir pieza")}
                          </p>
                          <ArrowUpRight size={18} className="shrink-0 text-accent" />
                        </div>
                      </div>

                      {media.instagramUrl && (
                        <a
                          href={media.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/45 p-1.5 text-white/70 transition-colors duration-300 hover:text-accent"
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
                <div ref={loadMoreRef} className="flex justify-center py-10">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-accent hover:text-accent"
            onClick={closeLightbox}
            aria-label={locale === "eu" ? "Itxi" : "Cerrar"}
            autoFocus
          >
            <X size={22} />
          </button>
          <div
            className="w-full max-w-5xl"
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
                className="mx-auto max-h-[78vh] max-w-full rounded-2xl"
              />
            ) : (
              <Image
                src={selectedMedia.url}
                alt={selectedCaption || `BitanBat ${selectedMedia.id}`}
                width={1200}
                height={800}
                className="mx-auto max-h-[78vh] w-auto rounded-2xl object-contain"
              />
            )}
            {selectedCaption && (
              <div className="mx-auto mt-6 flex max-w-3xl flex-col items-start gap-3 border-t border-accent/40 pt-4 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-sm leading-relaxed text-white/85 md:text-base">
                  {selectedCaption}
                </p>
                {selectedMedia.instagramUrl && (
                  <a
                    href={selectedMedia.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 font-heading text-xs font-medium uppercase tracking-[0.2em] text-accent/80 transition-colors duration-300 hover:text-accent"
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
