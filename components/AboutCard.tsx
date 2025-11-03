// AboutCard.tsx
"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { MorphingText } from "@/components/ui/morphing-text";
import { CometCard } from "@/components/ui/comet-card";
import styles from "./AboutCard.module.css";

const ABOUT_TEXTS = [
  "UX_Design",
  "3D_Modeling",
  "Photography",
  "Art",
  "Coding",
  "Game",
];

export default function AboutCard() {
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
            <span
              className={styles.hoverLabel}
              style={{
                left: `${labelPosition.x}px`,
                top: `${labelPosition.y}px`,
              }}
            >
              view more
            </span>
          )}
          <div className={styles.aboutGrid}>
            <div className={styles.aboutMedia}>
              <img
                src="/assets/index/dish.png"
                alt="Decorative plate"
                className={styles.aboutImage}
              />
              <div className={styles.aboutTextWrap}>
                <MorphingText
                  texts={ABOUT_TEXTS}
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
