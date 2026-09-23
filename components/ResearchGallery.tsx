"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./ResearchGallery.module.css";

export type ResearchSlide = { src: string; title: string; alt: string };

function GalleryIcon({ name, size = 20 }: { name: "previous" | "next" | "expand" | "minus" | "plus" | "close"; size?: number }) {
  const paths = {
    previous: "M19 12H5m7-7-7 7 7 7",
    next: "M5 12h14m-7-7 7 7-7 7",
    expand: "M15 3h6v6m0-6-7 7M9 21H3v-6m0 6 7-7",
    minus: "M5 12h14",
    plus: "M5 12h14M12 5v14",
    close: "m6 6 12 12M6 18 18 6",
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function ResearchGallery({ slides, title, priority = false }: { slides: ResearchSlide[]; title: string; priority?: boolean }) {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const lastSwipe = useRef(0);
  const slide = slides[index];

  if (!slide) return null;

  const move = (direction: number) => {
    setIndex((current) => (current + direction + slides.length) % slides.length);
    setZoomed(false);
  };
  const handleKeys = (event: KeyboardEvent<HTMLElement>) => {
    if (zoomed) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  };
  const startTouch = (event: TouchEvent) => {
    touch.current = event.touches.length === 1
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
      : null;
  };
  const endTouch = (event: TouchEvent) => {
    if (!touch.current || zoomed) return;
    const dx = event.changedTouches[0].clientX - touch.current.x;
    const dy = event.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      lastSwipe.current = Date.now();
      move(dx < 0 ? 1 : -1);
    }
  };
  const controls = (expanded = false) => (
    <div className={styles.controls}>
      <button type="button" onClick={() => move(-1)} disabled={slides.length < 2} aria-label={zh ? "上一张研究图片" : "Previous research image"}>
        <GalleryIcon name="previous" />
      </button>
      <span className={styles.counter} aria-live="polite" aria-atomic="true">
        {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        <span className={styles.srOnly}> — {slide.title}</span>
      </span>
      <button type="button" onClick={() => move(1)} disabled={slides.length < 2} aria-label={zh ? "下一张研究图片" : "Next research image"}>
        <GalleryIcon name="next" />
      </button>
      {expanded ? (
        <button type="button" onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed} aria-label={zh ? (zoomed ? "适应窗口" : "放大细节") : (zoomed ? "Fit image to window" : "Zoom into image")}>
          <GalleryIcon name={zoomed ? "minus" : "plus"} />
        </button>
      ) : null}
    </div>
  );

  return (
    <div className={styles.gallery} role="region" aria-roledescription={zh ? "轮播图" : "carousel"} aria-label={title} onKeyDown={handleKeys}>
      <figure className={styles.figure}>
        <button
          ref={opener}
          type="button"
          className={styles.imageButton}
          aria-label={`${zh ? "放大查看" : "Enlarge"}: ${slide.title}`}
          aria-haspopup="dialog"
          onClick={() => {
            if (Date.now() - lastSwipe.current < 400) return;
            setZoomed(false);
            dialog.current?.showModal();
          }}
          onTouchStart={startTouch}
          onTouchEnd={endTouch}
          onTouchCancel={() => { touch.current = null; }}
        >
          <Image src={slide.src} alt={slide.alt} width={2400} height={1350} sizes="(max-width: 1095px) 95vw, 1040px" priority={priority && index === 0} />
          <span className={styles.expand}><GalleryIcon name="expand" size={16} />{zh ? "放大查看" : "Expand image"}</span>
        </button>
        <figcaption className={styles.footer}>
          <span>{slide.title}</span>
          {controls()}
        </figcaption>
      </figure>
      <dialog ref={dialog} className={styles.dialog} aria-label={`${title} — ${zh ? "图片查看器" : "image viewer"}`} onClose={() => { setZoomed(false); opener.current?.focus({ preventScroll: true }); }}>
        <div className={styles.dialogHeader}>
          <span>{slide.title}</span>
          <button type="button" onClick={() => dialog.current?.close()} aria-label={zh ? "关闭图片查看器" : "Close image viewer"} autoFocus><GalleryIcon name="close" size={24} /></button>
        </div>
        <div className={`${styles.imageViewport} ${zoomed ? styles.zoomed : ""}`} onTouchStart={startTouch} onTouchEnd={endTouch} onTouchCancel={() => { touch.current = null; }} tabIndex={0} aria-label={zh ? "研究图片，可滚动查看放大细节" : "Research image; scroll to explore when zoomed"}>
          <Image src={slide.src} alt={slide.alt} width={2400} height={1350} sizes="2400px" />
        </div>
        <div className={styles.dialogFooter}>
          <span>{zoomed ? (zh ? "滑动查看细节 · − 缩小" : "Scroll to explore · − to fit") : (zh ? "使用 + 查看细节" : "Use + to read the details")}</span>
          {controls(true)}
        </div>
      </dialog>
    </div>
  );
}
