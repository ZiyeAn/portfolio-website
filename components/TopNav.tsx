"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./TopNav.module.css";

export default function TopNav({ dark = false }: { dark?: boolean }) {
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
    <nav
      className={`${styles.topNav} ${dark ? styles.topNavDark : ""} ${
        menuOpen ? styles.topNavOpen : ""
      }`}
    >
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
          <Link
            href="/"
            className={`${styles.brand} ${styles.brandDesktop}`}
            onClick={closeMenu}
          >
            Ziye An
          </Link>
          <Link href="/#about" onClick={closeMenu}>
            About
          </Link>
          <Link href="/works" onClick={closeMenu}>
            Works
          </Link>
          <Link href="/#contact" onClick={closeMenu}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
