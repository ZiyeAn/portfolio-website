"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./QuickLinks.module.css";

const links = [
  { label: "PLAYGROUND", href: "/playground", number: "01", className: "playground" },
  { label: "THOUGHTS", href: "/thoughts", number: "02", className: "thoughts" },
  { label: "ABOUT ZIYE", href: "/about", number: "03", className: "about" },
];

// Tune the timing of the single bottle-cap/link scene from one place.
const QUICK_LINK_MOTION = {
  // Bottle-cap movement range: higher start percentages begin earlier;
  // a wider range between start and end makes the cap travel more slowly.
  scrollStart: "top 50%",
  scrollEnd: "bottom 70%",
  capDuration: 3,
  // End rotation in degrees: lower values make the cap spin more slowly.
  capRotation: 720,
  // Text reveal speed: larger values reveal the three labels more slowly.
  revealDuration: 1,
  revealDelay: 0.3,
};

export default function QuickLinks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sectionRef.current;
    if (!root) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const cap = root.querySelector(`.${styles.cap}`);
        const reveals = gsap.utils.toArray<HTMLElement>(`.${styles.reveal}`, root);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: QUICK_LINK_MOTION.scrollStart,
            end: QUICK_LINK_MOTION.scrollEnd,
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(
          cap,
          { x: () => -window.innerWidth * 0.42, yPercent: -50, rotation: -180 },
          { x: () => window.innerWidth + 260, yPercent: -50, rotation: QUICK_LINK_MOTION.capRotation, duration: QUICK_LINK_MOTION.capDuration, ease: "none" },
          0
        );
        timeline.to(
          reveals,
          { clipPath: "inset(0 0% 0 0)", duration: QUICK_LINK_MOTION.revealDuration, ease: "none" },
          QUICK_LINK_MOTION.revealDelay
        );
      }, root);
      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Explore more">
      <p className={styles.kicker}>MORE TO EXPLORE</p>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={`${styles.link} ${styles[link.className]}`}>
            <span className={styles.reveal}>
              <span className={styles.number}>{link.number}</span>
              <span className={styles.label}>{link.label}</span>
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </div>
      <Image
        src="/assets/index/ziye-cap.png"
        alt=""
        width={1254}
        height={1254}
        sizes="(max-width: 767px) 46vw, 20vw"
        className={styles.cap}
      />
    </section>
  );
}
