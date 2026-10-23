"use client";

import { useEffect, useRef } from "react";
import styles from "./PrototypeVideo.module.css";

type Props = {
  src: string;
  poster?: string;
  title: string;
  autoPlay?: boolean;
  portrait?: boolean;
};

export default function PrototypeVideo({ src, poster, title, autoPlay = false, portrait = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!autoPlay) return;
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      if (preference.matches) video.pause();
      else void video.play().catch(() => { /* Native controls remain available. */ });
    };
    updatePlayback();
    preference.addEventListener("change", updatePlayback);
    return () => {
      preference.removeEventListener("change", updatePlayback);
      video.pause();
    };
  }, [autoPlay, src]);

  return (
    <div className={`${styles.frame} ${portrait ? styles.portrait : ""}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={title}
        controls
        playsInline
        muted={autoPlay}
        loop={autoPlay}
        preload="none"
      />
    </div>
  );
}
