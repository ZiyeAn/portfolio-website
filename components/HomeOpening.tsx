"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoIntro from "./LogoIntro";
import HandsMenu from "./HandsMenu";
import AboutCard from "./AboutCard";

export default function HomeOpening() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(plateRef.current, { y: () => window.innerHeight * 0.65 }, {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, sceneRef);
    return () => media.revert();
  }, []);

  return (
    <div ref={sceneRef} className="opening-scene">
      <div className="opening-stage">
        <section id="hero" className="hero-layer">
          <div className="hero-content"><LogoIntro /><HandsMenu /></div>
        </section>
        <section ref={plateRef} id="about" className="opening-plate">
          <AboutCard />
        </section>
      </div>
    </div>
  );
}
