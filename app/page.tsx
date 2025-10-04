import TopNav from "@/components/TopNav";
import HandsMenu from "@/components/HandsMenu";
import LogoIntro from '@/components/LogoIntro';
import { MorphingText } from "@/components/ui/morphing-text";
import { CometCard } from "@/components/ui/comet-card";
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
            <header className={styles.aboutHeader}>
              <span className={styles.aboutTag}>About</span>
              <h2>Ziye An does</h2>
              <p className={styles.aboutLead}>
                Story-driven interfaces that feel tactile, intentional, and just a touch unexpected. I blend typography,
                motion, and creative coding to build playful narratives that invite you to stay.
              </p>
            </header>
            <div className={styles.aboutHighlights}>
              <div className={styles.aboutHighlight}>
                <h3>Experiential Design</h3>
                <p>Layered narratives and ambient cues guide visitors through playful, memorable journeys.</p>
              </div>
              <div className={styles.aboutHighlight}>
                <h3>Creative Technology</h3>
                <p>Mixing React, motion, and generative visuals to keep interactions expressive yet performant.</p>
              </div>
              <div className={styles.aboutHighlight}>
                <h3>Collaborative Practice</h3>
                <p>Partnering with artists and teams to translate evocative ideas into living, working products.</p>
              </div>
            </div>
            <footer className={styles.aboutFooter}>
              <span>Based in Toronto, CA</span>
              <span>Open to collaborations worldwide</span>
              <span>2024 · @ziye.an</span>
            </footer>
          </div>
        </CometCard>
      </section>
      {/* Works Section */}
      <section id="works" className="content-section works-section">
        <h2>Works</h2>
        <p><a href="/works">Go to works page →</a></p>
      </section>
      {/* Contact Section */}
      <section id="contact" className="content-section contact-section">
        <h2>Contact</h2>
        <p>Coming soon...</p>
      </section>
    </div>
  );
}
