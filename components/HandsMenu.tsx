"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HandsMenu.module.css";

export default function HandsMenu() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = container.current;
    if (!root) return;
    const hero = root.closest("#hero");
    const scene = root.closest(".opening-scene");
    const media = gsap.matchMedia();

    media.add({
      mobile: "(max-width: 767px)",
      desktop: "(min-width: 768px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { mobile, reduced } = context.conditions!;
      if (reduced || !hero || !scene) return;
      const left = root.querySelector(`.${styles.leftHand}`);
      const right = root.querySelector(`.${styles.rightHand}`);
      // The trigger stays in document flow; only its decorative children move.
      const timeline = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .to(left, { rotation: mobile ? -8 : -20 }, 0)
        .to(right, { rotation: mobile ? 8 : 20 }, 0);
    }, root);

    return () => media.revert();
  }, []);

  return (
    <div ref={container} className={styles.hands} aria-hidden="true">
      <div className={styles.leftHand}>
        <Image src="/assets/index/left_hand.webp" alt="" width={900} height={842}
          priority sizes="(max-width: 767px) 64vw, 30vw" className={styles.handImage} />
      </div>
      <div className={styles.rightHand}>
        <Image src="/assets/index/right_hand.webp" alt="" width={900} height={842}
          priority sizes="(max-width: 767px) 64vw, 30vw" className={styles.handImage} />
      </div>
    </div>
  );
}
