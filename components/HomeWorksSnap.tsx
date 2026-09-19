"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Gently settles the opening scroll onto Selected Works, then releases it. */
export default function HomeWorksSnap() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const works = document.getElementById("works");
      if (!works) return;

      ScrollTrigger.create({
        trigger: works,
        // The opening scene remains free-scrolling; only settle once Works is near.
        start: "top 42%",
        end: "top top",
        snap: {
          snapTo: (progress, trigger) => ((trigger?.direction ?? 1) > 0 ? 1 : progress),
          delay: 0.08,
          duration: { min: 0.25, max: 0.65 },
          ease: "power2.out",
          inertia: false,
        },
      });
    });

    return () => media.revert();
  }, []);

  return null;
}
