"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./TopNav.module.css";

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`${styles.topNav} ${menuOpen ? styles.topNavOpen : ""}`}>
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
