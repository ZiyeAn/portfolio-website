import { MorphingText } from "@/components/ui/morphing-text";
import { CometCard } from "@/components/ui/comet-card";
import styles from "./AboutCard.module.css";

const ABOUT_TEXTS = [
  "UX_Design",
  "3D_Modeling",
  "Photography",
  "Art",
  "Photography",
  "Game",
];

export default function AboutCard() {
  return (
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
              <MorphingText texts={ABOUT_TEXTS} className={styles.aboutText} />
            </h3>
          </div>
          <div className={styles.aboutDescription}>
            <p>
              Currently studying Design & Technology at Parsons School of Design,
              I focus on interactive systems that connect physical computation
              with digital design. My projects range from Arduino-powered
              installations and Unity games to React-based web tools that
              visualize data and behavior.
            </p>
          </div>
          <div className={styles.aboutMeta}>
            <span>Based in New York & Shanghai</span>
          </div>
        </div>
      </div>
    </CometCard>
  );
}
