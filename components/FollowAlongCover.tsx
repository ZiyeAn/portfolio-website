import Image from "next/image";
import styles from "./FollowAlongCover.module.css";

/** Layered cover with the original Figma UI inside an iPhone-style bezel. */
export default function FollowAlongCover() {
  return (
    <div className={styles.cover} aria-hidden="true">
      <div className={styles.topline}><span>小红书 · 跟着做</span></div>
      <div className={styles.type}><span>Follow</span><span>Along.</span></div>
      <div className={styles.phone}>
        <span className={styles.volume} />
        <span className={styles.power} />
        <div className={styles.screen}>
          <Image src="/assets/playground/xiaohongshu/follow-screen-photo.png" alt="" fill sizes="(max-width: 600px) 30vw, 18vw" />
          <span className={styles.island} />
        </div>
      </div>
      <p className={styles.caption}>从收藏，到动手。</p>
    </div>
  );
}
