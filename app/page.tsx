import TopNav from "@/components/TopNav";
import HandsMenu from "@/components/HandsMenu";
import LogoIntro from '@/components/LogoIntro';
import SelectedWorksSection from "@/components/SelectedWorksSection"; 
import { MorphingText } from "@/components/ui/morphing-text";
import AboutCard from "@/components/AboutCard";
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
          <h2>Featured Works</h2>
          <Link href="/works" className={styles.sectionLink}>
            See all works →
          </Link>
        </div>
        <SelectedWorksSection />
      </section>
      {/* Contact Section */}
      <section id="contact" className="content-section contact-section">
        <h2>Contact</h2>
        <p>Coming soon...</p>
      </section>
    </div>
  );
}
