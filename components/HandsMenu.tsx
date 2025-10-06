"use client";
import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HandsMenu.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function HandsMenu() {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(`.${styles.leftHand}`, {
      opacity: 0,
      duration: 1,
      x: "-50%",
      ease: "circ.inOut",
      delay: 0.3,
    }, 0);
    tl.from(`.${styles.rightHand}`, {
      opacity: 0,
      duration: 1,
      x: "50%",
      ease: "circ.inOut",
      delay: 0.3,
    }, 0);

    gsap.to(`.${styles.leftHand}`, {
      scrollTrigger: {
        trigger: `.${styles.leftHand}`,
        start: "top 40%",
        end: "top 10%",
        scrub: true,
      },
      rotation: -50,
      duration: 2,
      ease: "power3.inOut",
    });

    gsap.to(`.${styles.rightHand}`, {
      scrollTrigger: {
        trigger: `.${styles.rightHand}`,
        start: "top 40%",
        end: "top 10%",
        scrub: true,
      },
      rotation: 50,
      duration: 2,
      ease: "power3.inOut",
    });


    return () => {
      gsap.killTweensOf([
        `.${styles.leftHand}`,
        `.${styles.rightHand}`
      ]);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section>
      <div className={styles.hands}>
        <div className={styles.leftHand}>
          <Image
            src="/assets/index/left_hand.png"
            alt="Left Hand"
            width={900}
            height={842}
            priority
            sizes="(max-width: 768px) 60vw, 30vw"
            className={styles.handImage}
          />
        </div>
        <div className={styles.rightHand}>
          <Image
            src="/assets/index/right_hand.png"
            alt="Right Hand"
            width={900}
            height={842}
            priority
            sizes="(max-width: 768px) 60vw, 30vw"
            className={styles.handImage}
          />
        </div>
      </div>
    </section>
  );
}
