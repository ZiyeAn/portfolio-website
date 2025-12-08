import TopNav from "@/components/TopNav";
import HandsMenu from "@/components/HandsMenu";
import LogoIntro from '@/components/LogoIntro';
import SelectedWorksSection from "@/components/SelectedWorksSection"; 
import { MorphingText } from "@/components/ui/morphing-text";
import AboutCard from "@/components/AboutCard";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
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
      <div className="hero-spacer" />
      {/* About Section */}
      <section id="about" className={`content-section ${styles.aboutSection}`}>
        <AboutCard />
      </section>
      {/* Works Section */}
      <section id="works" className="content-section works-section">
        <div className={styles.sectionHeader}>
          <h2>Seasonal Specials</h2>
          <Link href="/projects" className={styles.sectionLink}>
            See more works →
          </Link>
        </div>
        <SelectedWorksSection />
      </section>
      {/* Contact Section */}
      <section
        id="contact"
        className={`content-section contact-section ${styles.contactImageSection}`}
      >
        <div className={styles.contactInfo}>
          <h2>Contact</h2>
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
        <img
          src="/assets/index/contact.webp"
          alt="Contact"
          className={styles.contactImage}
        />
      </section>
    </div>
  );
}
