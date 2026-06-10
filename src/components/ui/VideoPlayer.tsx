"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function VideoPlayer({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={playing ? "Pausar vídeo" : "Reproducir vídeo"}
      className="group relative cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/70 shadow-[0_24px_60px_rgba(0,0,0,0.25)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        playsInline
        preload="none"
        className="w-full"
        onEnded={() => setPlaying(false)}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/45 via-black/10 to-transparent transition-opacity duration-300 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/92 shadow-lg">
          {playing ? <Pause size={24} className="text-primary" /> : <Play size={24} className="text-primary ml-1" />}
        </div>
      </div>
    </div>
  );
}
