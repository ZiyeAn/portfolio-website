"use client";

import TopNav from "@/components/TopNav";
import HandsMenu from "@/components/HandsMenu";
import LogoIntro from '@/components/LogoIntro';
import SelectedWorksSection from "@/components/SelectedWorksSection"; 
import { MorphingText } from "@/components/ui/morphing-text";
import AboutCard from "@/components/AboutCard";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";


export default function Home() {
  const { language } = useLanguage();
  return (
    <div className={styles.staggerContainer}>
       <TopNav />
      <section id="hero" className="hero-layer">
        <div className="hero-content">
          <LogoIntro />
          <HandsMenu />
        </div>
      </section>
      {/* Spacer 占位，确保滚动时内容能推上来 */}
      <div className="hero-spacer home-snap-target" />
      {/* About Section */}
      <section
        id="about"
        className={`content-section home-snap-target ${styles.aboutSection}`}
      >
        <AboutCard />
      </section>
      {/* Works Section */}
      <section
        id="works"
        className="content-section works-section home-snap-target"
      >
        <div className={styles.sectionHeader}>
          <h2>{t("seasonalSpecials", language)}</h2>
          <Link href="/projects" className={styles.sectionLink}>
            {t("seeMoreWorks", language)}
          </Link>
        </div>
        <SelectedWorksSection />
      </section>
      {/* Contact Section */}
      <section
        id="contact"
        className={`content-section contact-section home-snap-target ${styles.contactImageSection}`}
      >
        <div className={styles.contactInfo}>
          <h2>{t("contact", language)}</h2>
          <div className={styles.contactLinksRow}>
            <a
              href="mailto:ziyean076@gmail.com"
              className={styles.contactLink}
            >
              Gmail · ziyean076@gmail.com
            </a>
            <a
              href="https://www.instagram.com/ziye_an_works_archive"
              className={styles.contactLink}
              target="_blank"
              rel="noreferrer"
            >
              Instagram · @ziye_an_works_archive
            </a>
            <a
              href="https://www.linkedin.com/in/ziye-an-356649269/"
              className={styles.contactLink}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn · Ziye An
            </a>
          </div>
        </div>
        <Image
          src="/assets/index/contact.webp"
          alt="Contact"
          width={1920}
          height={1080}
          className={styles.contactImage}
          sizes="100vw"
        />
      </section>
    </div>
  );
}
