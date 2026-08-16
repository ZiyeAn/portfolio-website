// AboutCard.tsx
"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { MorphingText } from "@/components/ui/morphing-text";
import { CometCard } from "@/components/ui/comet-card";
import styles from "./AboutCard.module.css";
import { useLanguage } from "@/components/LanguageProvider";

const ABOUT_TEXTS = [
  "UX_Design",
  "3D_Modeling",
  "Photography",
  "Art",
  "Coding",
  "Game",
];

const ABOUT_TEXTS_ZH = ["UX_设计", "3D_建模", "摄影", "艺术", "编程", "游戏"];

export default function AboutCard() {
  const { language } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);
  const [labelPosition, setLabelPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setLabelPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };
  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    handleMouseMove(event);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Link
      href="/about"
      className={styles.aboutLink}
      aria-label="View the detailed about page"
    >
      <CometCard className={styles.aboutCard}>
        <div
          className={styles.aboutInner}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {isHovering && (
            <Image
              src="/assets/index/viewMore.png"
              alt="View more"
              width={400}
              height={180}
              className={styles.hoverLabel}
              style={{
                left: `${labelPosition.x}px`,
                top: `${labelPosition.y}px`,
              }}
              draggable={false}
            />
          )}
          <div className={styles.aboutGrid}>
            <div className={styles.aboutMedia}>
              <Image
                src="/assets/index/dish.webp"
                alt="Decorative plate"
                width={1200}
                height={900}
                className={styles.aboutImage}
                sizes="(max-width: 768px) 92vw, 700px"
              />
              <div className={styles.aboutTextWrap}>
                <MorphingText
                  texts={language === "zh" ? ABOUT_TEXTS_ZH : ABOUT_TEXTS}
                  className={styles.aboutText}
                />
              </div>
            </div>
          </div>
        </div>
      </CometCard>
    </Link>
  );
}
