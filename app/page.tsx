import TopNav from "@/components/TopNav";
import HandsMenu from "@/components/HandsMenu";
import LogoIntro from '@/components/LogoIntro';
import { MorphingText } from "@/components/ui/morphing-text";
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