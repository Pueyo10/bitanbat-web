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
    <div className="rounded-lg overflow-hidden relative group cursor-pointer" onClick={toggle}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        playsInline
        preload="none"
        className="w-full"
        onEnded={() => setPlaying(false)}
      />
      <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          {playing ? <Pause size={24} className="text-primary" /> : <Play size={24} className="text-primary ml-1" />}
        </div>
      </div>
    </div>
  );
}
