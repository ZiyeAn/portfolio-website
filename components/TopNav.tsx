"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./TopNav.module.css";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

export default function TopNav() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasLightText, setHasLightText] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const evaluateTextTone = useCallback(() => {
    if (typeof window === "undefined" || !navRef.current) return;

    const alwaysLightRoutes = new Set([
      "/projects",
      "/playground",
      "/thoughts",
      "/works",
      "/writing",
    ]);
    if (alwaysLightRoutes.has(pathname)) {
      setHasLightText(true);
      return;
    }
    if (pathname === "/about") {
      setHasLightText(false);
      return;
    }

    const navBottom = navRef.current.getBoundingClientRect().bottom;
    const elements = document.elementsFromPoint(
      Math.round(window.innerWidth / 2),
      Math.min(window.innerHeight - 1, Math.ceil(navBottom + 2))
    );
    const isOverHomeDarkSection = elements.some((element) =>
      element.closest(".works-section, .contact-section")
    );
    if (pathname === "/") {
      setHasLightText(isOverHomeDarkSection);
      return;
    }

    const parseBackground = (value: string) => {
      const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/i);
      if (!match) return null;
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      if (alpha < 0.1) return null;
      return [Number(match[1]), Number(match[2]), Number(match[3])] as const;
    };

    let background: readonly [number, number, number] | null = null;
    for (const hit of elements) {
      if (navRef.current.contains(hit)) continue;
      let current: Element | null = hit;
      while (current && current !== document.documentElement) {
        background = parseBackground(window.getComputedStyle(current).backgroundColor);
        if (background) break;
        current = current.parentElement;
      }
      if (background) break;
    }

    if (!background) {
      setHasLightText(false);
      return;
    }
    const [r, g, b] = background;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    setHasLightText(luminance < 0.55);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
      evaluateTextTone();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", evaluateTextTone, { passive: true });
    evaluateTextTone();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", evaluateTextTone);
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
          <span className={styles.srOnly}>{t("toggleNavigation", language)}</span>
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
            <div className={`${styles.languageSwitch} ${styles.languageSwitchDesktop}`} aria-label="Language / 语言">
              <button type="button" className={language === "en" ? styles.languageActive : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
              <span aria-hidden="true">/</span>
              <button type="button" className={language === "zh" ? styles.languageActive : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中文</button>
            </div>
          </div>
          <div className={styles.navCenter}>
            <Link href="/projects" onClick={closeMenu}>
              {t("projects", language)}
            </Link>
            <Link href="/playground" onClick={closeMenu}>
              {t("playground", language)}
            </Link>
            <Link href="/thoughts" onClick={closeMenu}>
              {t("thoughts", language)}
            </Link>
          </div>
          <div className={styles.navRight}>
            <Link href="/about" onClick={closeMenu}>
              {t("about", language)}
            </Link>
            <div className={`${styles.languageSwitch} ${styles.languageSwitchMobile}`} aria-label="Language / 语言">
              <button type="button" className={language === "en" ? styles.languageActive : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
              <span aria-hidden="true">/</span>
              <button type="button" className={language === "zh" ? styles.languageActive : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中文</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
