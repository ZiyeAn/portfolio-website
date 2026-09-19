"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

interface MorphingTextProps {
  className?: string;
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
}

export function MorphingText({ texts, className, morphTime = 1.5, cooldownTime = 0.5 }: MorphingTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);
  const filterId = `morph-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const root = rootRef.current;
    const first = firstRef.current;
    const second = secondRef.current;
    if (!root || !first || !second || !texts.length) return;

    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let index = 0;
    let frame = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let transitions: Animation[] = [];

    const stop = () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
      transitions.forEach(animation => animation.cancel());
      transitions = [];
    };
    const resetText = () => {
      first.textContent = texts[index];
      second.textContent = texts[(index + 1) % texts.length];
      first.style.opacity = "1";
      second.style.opacity = "0";
      first.style.filter = second.style.filter = "none";
    };
    const sync = () => {
      stop();
      resetText();
      const lightweight = mobile.matches || reduced.matches;
      root.style.filter = lightweight ? "none" : `url(#${filterId}) blur(0.6px)`;
      if (!visible || document.hidden || reduced.matches || texts.length < 2) return;

      if (mobile.matches) {
        // A short crossfade replaces continuous blur work on touch screens.
        timer = setInterval(() => {
          transitions.forEach(animation => animation.cancel());
          first.textContent = texts[index];
          index = (index + 1) % texts.length;
          second.textContent = texts[index];
          transitions = [
            first.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: "forwards" }),
            second.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, fill: "forwards" }),
          ];
        }, 2800);
        return;
      }

      let start = performance.now();
      const cooldownMs = Math.max(0, cooldownTime) * 1000;
      const morphMs = Math.max(0.1, morphTime) * 1000;
      const animate = (now: number) => {
        const fraction = Math.min(1, Math.max(0, (now - start - cooldownMs) / morphMs));
        if (fraction > 0) {
          first.style.filter = `blur(${Math.min(8 / Math.max(1 - fraction, 0.001) - 8, 100)}px)`;
          second.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
          first.style.opacity = String(Math.pow(1 - fraction, 0.4));
          second.style.opacity = String(Math.pow(fraction, 0.4));
        }
        if (fraction === 1) {
          index = (index + 1) % texts.length;
          resetText();
          start = now;
        }
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    mobile.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      stop();
      observer.disconnect();
      mobile.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [texts, morphTime, cooldownTime, filterId]);

  return (
    <div ref={rootRef} className={cn(
      "relative mx-auto w-full max-w-screen-md text-center font-sans font-bold leading-none min-h-[clamp(3rem,8vw,7rem)] text-[clamp(1.8rem,6vw,5rem)]", className,
    )}>
      <span className="sr-only">{texts.join(", ")}</span>
      <span aria-hidden="true" ref={firstRef} className="absolute inset-x-0 top-0 m-auto inline-block w-full">{texts[0]}</span>
      <span aria-hidden="true" ref={secondRef} className="absolute inset-x-0 top-0 m-auto inline-block w-full" style={{ opacity: 0 }}>{texts[1] ?? texts[0]}</span>
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs><filter id={filterId}><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" /></filter></defs>
      </svg>
    </div>
  );
}
