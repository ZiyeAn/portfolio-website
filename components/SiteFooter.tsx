"use client";

import { useLanguage } from "./LanguageProvider";
import styles from "./SiteFooter.module.css";

export default function SiteFooter({ className = "", theme = "light" }: { className?: string; theme?: "light" | "dark" }) {
  const { language } = useLanguage();
  const zh = language === "zh";
  return (
    <footer className={`${styles.footer} ${theme === "dark" ? styles.dark : ""} ${className}`}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.invitation}>
            <h2>{zh ? "一起聊聊。" : "Let’s talk."}</h2>
            <p>{zh ? "关于设计、研究，或下一个合作。" : "About design, research, or our next collaboration."}</p>
          </div>
          <div className={styles.contact}>
            <h3>Contact</h3>
            <a className={styles.email} href="mailto:ziyean076@gmail.com">ziyean076@gmail.com</a>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/in/ziye-an-356649269/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://www.instagram.com/ziye_an_works_archive" target="_blank" rel="noreferrer">Instagram ↗</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Ziye An</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}>{zh ? "回到顶部 ↑" : "Back to top ↑"}</button>
        </div>
      </div>
    </footer>
  );
}
