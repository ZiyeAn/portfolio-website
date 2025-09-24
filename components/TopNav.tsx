import React from "react";
import styles from "./TopNav.module.css";

export default function TopNav({ dark = false }: { dark?: boolean }) {
  return (
    <nav className={`${styles.topNav} ${dark ? styles.topNavDark : ""}`}>
      <div className={styles.navInner}>
        <a href="/">Ziye An</a>
        <div className={styles.navLinks}>
          <a href="/#about">About</a>
          <a href="/works">Works</a>
          <a href="/#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}