// AboutCard.tsx
import { MorphingText } from "@/components/ui/morphing-text";
import { CometCard } from "@/components/ui/comet-card";
import PlatePile from "@/components/PlatePile";
import styles from "./AboutCard.module.css";

const ABOUT_TEXTS = ["UX_Design","3D_Modeling","Photography","Art","Photography","Game"];

export default function AboutCard() {
  return (
    <CometCard className={styles.aboutCard}>
      <div className={styles.aboutInner}>
        <div className={styles.aboutGrid}>

          <PlatePile
            src="/assets/index/dish.png"   
            width={960}
            height={600}
          >
            <MorphingText texts={ABOUT_TEXTS} className={styles.aboutText} />
          </PlatePile>
        </div>
      </div>
    </CometCard>
  );
}
