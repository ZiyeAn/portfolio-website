"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { usePointerEffects } from "@/lib/usePointerEffects";
import styles from "./AnimatedTestimonials.module.css";
import { useLanguage } from "@/components/LanguageProvider";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  href?: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const { language } = useLanguage();
  const pointerEffects = usePointerEffects();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autoplayCycle, setAutoplayCycle] = useState(0);
  const total = testimonials.length;
  const gesture = useRef<{ x: number; y: number; horizontal: boolean } | null>(null);
  const suppressClick = useRef(false);
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    if (window.innerWidth >= 768 || !event.isPrimary || event.button !== 0) return;
    gesture.current = { x: event.clientX, y: event.clientY, horizontal: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    // Keep ordinary vertical page scrolling, while allowing a relaxed diagonal swipe.
    if (!start.horizontal && Math.abs(dy) > 18 && Math.abs(dy) > Math.abs(dx) * 1.8) {
      gesture.current = null;
      return;
    }
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 0.55) {
      start.horizontal = true;
      suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    gesture.current = null;
    if (!start?.horizontal) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(event.clientY - start.y) * 0.45) {
      setActive(previous => (previous + (dx < 0 ? 1 : -1) + total) % total);
      setAutoplayCycle(cycle => cycle + 1);
    }
  };

  const rotationAngles = useMemo(() => {
    return testimonials.map((item, index) => {
      const seed = (item.src?.length ?? 0) + index * 17;
      const angle = ((seed % 21) + 21) % 21; // 0 - 20
      return angle - 10; // -10 to 10
    });
  }, [testimonials]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setActive((prev) => (prev + 1) % total);
    setAutoplayCycle(cycle => cycle + 1);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setActive((prev) => (prev - 1 + total) % total);
    setAutoplayCycle(cycle => cycle + 1);
  }, [total]);

  useEffect(() => {
    if (total === 0) {
      setActive(0);
      return;
    }
    if (active < total) return;
    setActive(active % total);
  }, [total, active]);

  const isActive = (index: number) => index === active;

  useEffect(() => {
    const container = containerRef.current;
    if (!autoplay || total <= 1 || !container) return;
    let visible = false;
    let interval: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(interval);
      if (visible && !document.hidden) interval = setInterval(handleNext, 5000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(container);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearInterval(interval);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [autoplay, total, handleNext, autoplayCycle]);

  if (total === 0) {
    return null;
  }
  return (
    <div ref={containerRef} className={styles.container}
      role="region" aria-roledescription="carousel" aria-label={language === "zh" ? "精选作品" : "Selected works"}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
      onPointerCancel={() => { gesture.current = null; }}
      onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft") { event.preventDefault(); handlePrev(); }
        if (event.key === "ArrowRight") { event.preventDefault(); handleNext(); }
      }}>

      <div className={styles.textColumn} aria-live="polite" aria-atomic="true">
        <motion.div
          key={active}
          initial={{
            y: reducedMotion ? 0 : 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: reducedMotion ? 0 : -20,
            opacity: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.2,
            ease: "easeInOut",
          }}
          className={styles.contentBlock}
        >
          <div className={styles.titleBlock}>
            <h3 className={styles.title}>
              {testimonials[active].href ? (
                <Link
                  href={testimonials[active].href}
                  className={styles.titleLink}
                >
                  {testimonials[active].name}
                </Link>
              ) : (
                testimonials[active].name
              )}
            </h3>
            {testimonials[active].designation ? (
              <p className={styles.meta}>{testimonials[active].designation}</p>
            ) : null}
          </div>
          <motion.p className={styles.quote}>
            {!pointerEffects ? testimonials[active].quote : testimonials[active].quote.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{
                  filter: "blur(10px)",
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.2,
                  ease: "easeInOut",
                  delay: 0.02 * index,
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
        <div className={styles.controls}>
          <button
            onClick={handlePrev}
            className={`${styles.controlButton} ${styles.controlButtonPrev}`}
            aria-label={language === "zh" ? "上一个项目" : "Previous project"}
          >
            <IconArrowLeft className={styles.controlIcon} />
          </button>
          <button
            onClick={handleNext}
            className={`${styles.controlButton} ${styles.controlButtonNext}`}
            aria-label={language === "zh" ? "下一个项目" : "Next project"}
          >
            <IconArrowRight className={styles.controlIcon} />
          </button>
        </div>
      </div>
      <div className={styles.imageColumn}>
        <div className={styles.imageStage}>
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: reducedMotion ? 0 : (rotationAngles[index] ?? 0) * (pointerEffects ? 1 : 0.3),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index)
                    ? 0
                    : reducedMotion ? 0 : (rotationAngles[index] ?? 0) * (pointerEffects ? 1 : 0.3),
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                  y: pointerEffects && isActive(index) ? [0, -30, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: reducedMotion ? 0 : (rotationAngles[index] ?? 0) * (pointerEffects ? 1 : 0.3),
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.4,
                  ease: "easeInOut",
                }}
                className={styles.imageSlide}
                aria-hidden={!isActive(index)}
                style={{ pointerEvents: isActive(index) ? "auto" : "none" }}
              >
                <div className={styles.imageWrapper}>
                  {testimonial.href ? (
                    <Link
                      href={testimonial.href}
                      draggable={false}
                      className={styles.imageLink}
                      aria-label={`View ${testimonial.name}`}
                      tabIndex={isActive(index) ? 0 : -1}
                    >
                      <Image
                        src={testimonial.src}
                        alt={testimonial.name}
                        width={1200}
                        height={1600}
                        draggable={false}
                        className={`${styles.imageInner} ${styles.imageShadow}`}
                        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 60vw, 700px"
                        priority={isActive(index)}
                      />
                    </Link>
                  ) : (
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={1200}
                      height={1600}
                      draggable={false}
                      className={`${styles.imageInner} ${styles.imageShadow}`}
                      sizes="(max-width: 768px) 90vw, (max-width: 1280px) 60vw, 700px"
                      priority={isActive(index)}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {testimonials[active].href ? (
          <p className={styles.imageHint}>
            {language === "zh" ? (
              "点击图片，查看项目详情 ↗"
            ) : (
              <><span className={styles.desktopHint}>Click</span><span className={styles.mobileHint}>Tap</span> image to view project details ↗</>
            )}
          </p>
        ) : null}
      </div>
      <div className={styles.mobilePagination}>
        <span>{language === "zh" ? "左右滑动" : "Swipe to explore"}</span>
        <div className={styles.dots}>
          {testimonials.map((item, index) => <button key={item.src} type="button"
            aria-label={`${language === "zh" ? "查看" : "Show"} ${item.name}`}
            aria-current={isActive(index) ? "true" : undefined}
            onClick={() => {
              setActive(index);
              setAutoplayCycle(cycle => cycle + 1);
            }}><span /></button>)}
        </div>
        <span>{active + 1} / {total}</span>
      </div>
    </div>
  );
};
