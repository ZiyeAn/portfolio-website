import TopNav from "@/components/TopNav";
import HandsMenu from "@/components/HandsMenu";
import LogoIntro from '@/components/LogoIntro';
import SelectedWorksSection from "@/components/SelectedWorksSection"; 
import { MorphingText } from "@/components/ui/morphing-text";
import { CometCard } from "@/components/ui/comet-card";
import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.staggerContainer}>
       <TopNav />
      <section id="hero" className="hero-layer">
        <div className="hero-content">
          <LogoIntro />
          <MorphingText texts={["'A Table for One?'", "Ziye An's Portfolio"]} className={styles.subtitle} />
          <HandsMenu />
        </div>
      </section>
      {/* Spacer 占位，确保滚动时内容能推上来 */}
      <div className="hero-spacer" />
      {/* About Section */}
      <section id="about" className={`content-section ${styles.aboutSection}`}>
        <CometCard className={styles.aboutCard}>
          <div className={styles.aboutInner}>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutLabel}>
                <span className={styles.aboutTag}>About</span>
              </div>
              <div className={styles.aboutTitle}>
                <h2>ZIYE AN</h2>
                <h3>does</h3>
              </div>
              <div className={styles.aboutSubtitle}>
                <h3>
                  <MorphingText
                    texts={["UX_Design", "3D_Modeling","Photography","Art","Photography","Game"]}
                    className={styles.aboutText}
                  />
                </h3>
              </div>
              <div className={styles.aboutDescription}>
                <p>
                  Currently studying Design & Technology at Parsons School of Design, I focus on interactive systems that connect physical computation with digital design. My projects range from Arduino-powered installations and Unity games to React-based web tools that visualize data and behavior.
                </p>
              </div>
              <div className={styles.aboutMeta}>
                <span>Based in New York & Shanghai</span>
              </div>
            </div>
          </div>
        </CometCard>
      </section>
      {/* Works Section */}
      <section id="works" className="content-section works-section">
        <div className={styles.sectionHeader}>
          <h2>CHEF's RECOMMENDATION</h2>
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
