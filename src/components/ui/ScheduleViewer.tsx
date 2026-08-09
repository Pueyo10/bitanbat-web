"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

interface Lenis {
  stop: () => void;
  start: () => void;
}

export default function ScheduleViewer({
  src,
  alt,
  width,
  height,
  hint,
  closeLabel,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  hint: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [open, close]);

  // El overlay se monta en <body>: dentro de la tarjeta quedaría atrapado por
  // el transform de la animación de entrada y no cubriría la pantalla.
  const overlay = (
    <div
      onClick={close}
      className="animate-fade-in fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-md"
    >
      <div className="flex shrink-0 justify-end px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            close();
          }}
          aria-label={closeLabel}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        onClick={(event) => event.stopPropagation()}
        className="flex min-h-0 flex-1 items-center justify-center overflow-auto px-2 pb-4 sm:px-6 sm:pb-6"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="100vw"
          priority
          className="max-h-full w-full rounded-lg bg-white object-contain shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={hint}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_50px_rgba(10,10,10,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(10,10,10,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="h-auto w-full"
        />
        <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-full bg-primary/85 px-3.5 py-2 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 size={14} />
          {hint}
        </span>
      </button>

      {mounted && open && createPortal(overlay, document.body)}
    </>
  );
}
