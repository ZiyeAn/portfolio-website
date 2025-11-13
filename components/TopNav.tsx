"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./TopNav.module.css";

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasLightText, setHasLightText] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const evaluateTextTone = useCallback(() => {
    if (typeof window === "undefined" || !navRef.current) return;
    const computed = window.getComputedStyle(navRef.current);
    const color = computed.color;
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);

    if (!rgbMatch) {
      setHasLightText(false);
      return;
    }

    const r = Number(rgbMatch[1]);
    const g = Number(rgbMatch[2]);
    const b = Number(rgbMatch[3]);
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    setHasLightText(brightness > 0.75);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
      evaluateTextTone();
    };

    window.addEventListener("resize", handleResize);
    evaluateTextTone();

    const colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handleSchemeChange = () => evaluateTextTone();
    if (colorScheme) {
      if (colorScheme.addEventListener) {
        colorScheme.addEventListener("change", handleSchemeChange);
      } else if (colorScheme.addListener) {
        colorScheme.addListener(handleSchemeChange);
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (colorScheme) {
        if (colorScheme.removeEventListener) {
          colorScheme.removeEventListener("change", handleSchemeChange);
        } else if (colorScheme.removeListener) {
          colorScheme.removeListener(handleSchemeChange);
        }
      }
    };
  }, [evaluateTextTone]);

  useEffect(() => {
    evaluateTextTone();
  }, [evaluateTextTone, menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const navClassName = [
    styles.topNav,
    menuOpen ? styles.topNavOpen : "",
    hasLightText ? styles.topNavLightText : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav ref={navRef} className={navClassName}>
      <div className={styles.navInner}>
        <Link
          href="/"
          className={`${styles.brand} ${styles.brandMobile}`}
          onClick={closeMenu}
        >
          Ziye An
        </Link>
        <button
          type="button"
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-controls="top-nav-links"
          aria-expanded={menuOpen}
        >
          <span className={styles.srOnly}>Toggle navigation</span>
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>
        <div
          id="top-nav-links"
          className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}
        >
          <div className={styles.navLeft}>
            <Link
              href="/"
              className={`${styles.brand} ${styles.brandDesktop}`}
              onClick={closeMenu}
            >
              Ziye An
            </Link>
          </div>
          <div className={styles.navCenter}>
            <Link href="/projects" onClick={closeMenu}>
              Projects
            </Link>
            <Link href="/playground" onClick={closeMenu}>
              Playground
            </Link>
            <Link href="/thoughts" onClick={closeMenu}>
              Thoughts
            </Link>
          </div>
          <div className={styles.navRight}>
            <Link href="/about" onClick={closeMenu}>
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
