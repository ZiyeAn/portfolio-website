"use client";


import Image from "next/image";
import careerPhoto from "@/public/assets/about/product-ux.png";
import photographerPhoto from "@/public/assets/about/photographer.jpg";
import diverPhoto from "@/public/assets/about/diver.png";
import styles from "./IdentityCard.module.css";

const identities = [
  { id: "ux", en: "Product & UX", zh: "产品与体验", mode: "01 / WORK MODE", color: "#e8e3d8", note: "Questions → prototypes → experiences", noteZh: "问题 → 原型 → 体验", medium: "Flows, interfaces & physical experiences", mediumZh: "流程、界面与实体体验", icon: "↗︎" },
  { id: "photo", en: "Photographer", zh: "摄影师", mode: "02 / THROUGH MY LENS", color: "#e2dac8", note: "Another way of looking", noteZh: "换个角度看世界", medium: "Light / frames / moments", mediumZh: "光线 / 画面 / 瞬间", icon: "◎" },
  { id: "dive", en: "Free Diver", zh: "自由潜水员", mode: "03 / UNDER THE SURFACE", color: "#d5e2df", note: "See you below the surface", noteZh: "水面之下见", medium: "Water / movement / observation", mediumZh: "水 / 流动 / 观察", icon: "≈" },
  { id: "draw", en: "Sketchbook me", zh: "画画的我", mode: "04 / OFF THE GRID", color: "#e8d9d1", note: "A little room to wander", noteZh: "留一点空间，随手画画", medium: "Lines / paper / unfinished ideas", mediumZh: "线条 / 纸 / 未完成的想法", icon: "✳" },
];

export default function IdentityCard({ chinese, selected, onSelect }: { chinese: boolean; selected: number; onSelect: (index: number) => void }) {
  const identity = identities[selected];
  const photo = [careerPhoto, photographerPhoto, diverPhoto][selected];
  return <div className={styles.wrapper}>
    <div className={styles.folderStack}>
    <div className={styles.tabs} role="group" aria-label={chinese ? "选择身份" : "Choose an identity"}>
      {identities.map((_, index) => { const item = identities[index]; return <button key={item.id} type="button" aria-pressed={selected === index} aria-controls="identity-file" onClick={() => onSelect(index)}><span className={styles.tabNumber}>{String(index + 1).padStart(2, "0")}</span><span>{chinese ? item.zh : item.en}</span><span className={styles.tabMark} aria-hidden="true">{selected === index ? "−" : "+"}</span></button>; })}
    </div>
    <article key={identity.id} id="identity-file" className={`${styles.card} ${selected ? styles.casual : ""}`} aria-live="polite" aria-atomic="true">
      <div className={styles.cardTop}><span>ZIYE AN</span><span>{String(selected + 1).padStart(2, "0")} / 04</span></div>
      <div className={styles.photo} key={identity.id}>
        <span className={styles.clip} aria-hidden="true" />
        {photo ? <Image className={styles.identityPhoto} src={photo} alt={chinese ? `Ziye An · ${identity.zh}` : `Ziye An · ${identity.en}`} sizes="(max-width: 800px) 85vw, 480px" priority={selected === 0} /> : <div className={styles.photoPlaceholder} style={{ backgroundColor: identity.color }}>
          <span className={styles.doodle} aria-hidden="true">{identity.icon}</span>
          <span>{chinese ? "这里放这一个我的照片" : "A photo of this side of me"}</span>
          <small>PHOTO TO COME</small>
        </div>}
        <p>{chinese ? identity.noteZh : identity.note}</p>
      </div>
      <span className={styles.mode}>{identity.mode}</span>
      <dl className={styles.fields}>
        <div><dt>NAME / {chinese ? "姓名" : "WHO"}</dt><dd>Ziye An</dd></div>
        <div><dt>IDENTITY / {chinese ? "此刻的我" : "THIS SIDE OF ME"}</dt><dd>{chinese ? identity.zh : identity.en}</dd></div>
        <div><dt>MEDIUM / {chinese ? "与什么打交道" : "WORKING WITH"}</dt><dd>{chinese ? identity.mediumZh : identity.medium}</dd></div>
      </dl>
      <div className={styles.cardBottom}><span>{chinese ? "不止一种身份。" : "Not just one thing."}</span><span className={styles.signature}>Ziye</span></div>
    </article>
    </div>
    <div className={styles.controls}><button type="button" onClick={() => onSelect((selected + 3) % 4)} aria-label={chinese ? "上一个身份" : "Previous identity"}>←</button><span>{chinese ? "换一张工牌" : "Try another badge"}</span><button type="button" onClick={() => onSelect((selected + 1) % 4)} aria-label={chinese ? "下一个身份" : "Next identity"}>→</button></div>
  </div>;
}
