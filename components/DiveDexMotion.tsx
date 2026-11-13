import feedback from "@/data/divedex-feedback.json";

import Image from "next/image";
import styles from "./DiveDexMotion.module.css";

const captions = {
  "identify-full": ["From photos to saved sightings", "从照片到保存发现"],
  "identify-review": ["Review an uncertain match", "复核不确定的匹配"],
  "home-stages-trimmed": ["Choose a dive stage", "选择潜水阶段"],
  "just-exploring-full": ["Plan a destination", "探索目的地"],
  "just-exploring": ["Planning preview", "行前预览"],
  "at-the-spot-full": ["Arrive at a dive site", "抵达潜点"],
  "at-the-spot": ["At the site preview", "潜点现场预览"],
  "after-a-dive-full": ["Return from a dive", "潜水归来"],
  "after-a-dive": ["Post-dive preview", "潜后回顾预览"],
  "explore-full": ["Browse local wildlife and sites", "浏览当地生物与潜点"],
  "explore-wishlist": ["Save a wishlist item", "加入愿望清单"],
  "reef-challenge-walkthrough": ["Switch targets and inspect hints", "切换观察目标与提示"],
  "reef-challenge-card": ["Open a reef challenge", "打开礁区观察挑战"],
  "collection-walkthrough": ["Revisit a collection", "回看个人收藏"],
  "collection-views": ["Map, timeline and categories", "地图、时间线与分类"],
  "blue-tang-record-nov9": ["Open the blue tang record", "打开蓝刺尾鱼记录"],
  "blue-tang-walkthrough": ["Inspect identifying features", "查看物种辨认特征"],
  "recognise-a-blue-tang": ["Expand the recognition guide", "展开辨认指南"],
  "ocean-quiz-answer": ["Reveal a quiz explanation", "查看测验答案解析"],
  "meet-divedex-full": ["First visit walkthrough", "首次使用全流程"],
  "welcome-entry": ["Welcome and guest entry", "欢迎页与访客入口"],
  "meet-divedex": ["Feature introduction", "功能介绍"],
  "more-interests": ["Choose wildlife interests", "选择感兴趣的生物"],
  "equipment-selection": ["Set equipment preferences", "选择潜水装备"],
  "early-guided-tour": ["Early guided tour", "早期引导流程"],
  "prototype-v2-v3-source-screens": ["Compare full screens across versions", "对照各版完整界面"],
  "prototype-overview-upper-screens-hd": ["Compare screen details", "对照各版界面细节"],
  "prototype-versions-carousel": ["Four prototype versions", "四版原型演进"],
} as const;

export type DiveDexClip = keyof typeof captions;

export default function DiveDexMotion({ zh, clips, wide = false }: { zh: boolean; clips: DiveDexClip[]; wide?: boolean }) {
  return <div className={wide ? styles.wide : styles.strip}>
    {clips.map(id => {
      const phone = !wide && !id.startsWith("reef-challenge-");
      const comments = id in feedback ? feedback[id as keyof typeof feedback] : [];
      return <figure key={id}>
        <div className={styles.media}>
          <div className={phone ? styles.device : styles.componentClip}><Image unoptimized loading="lazy" src={`/assets/projects/divedex/presentation/${id}.gif`} alt={captions[id][zh ? 1 : 0]} width={900} height={780} />
          {comments.length > 0 && <div className={styles.notes}>{comments.map(c=>{
            const badge = c.author.includes("diver") ? "D" : c.author.includes("Classmate") ? "C" : /instructor/i.test(c.author) ? "I" : "AI";
            return <details key={c.body} style={{left:c.x+"%",bottom:`calc(${100 - c.y}% - 44px)`}}
              onToggle={e => {
                const card = e.currentTarget;
                if (card.open) card.style.setProperty("--card-width", Math.min(285, document.documentElement.clientWidth - card.getBoundingClientRect().left - 12)+"px");
              }}
              onPointerEnter={e => { if (e.pointerType === "mouse") e.currentTarget.open = true; }}
              onPointerLeave={e => { if (e.pointerType === "mouse") e.currentTarget.open = false; }}
              onClick={e => {
                if (!(e.target as Element).closest("summary")) e.currentTarget.open = !e.currentTarget.open;
              }}
            >
              <summary title={c.author} aria-label={`${zh ? "评论" : "Comment"} · ${c.author} · ${c.theme}`}><span className={styles.avatar} data-role={badge}>{badge}</span></summary>
              <div className={styles.bubble}><span className={styles.tag} data-theme={c.theme}>{c.theme}</span><p lang="en">{c.body}</p></div>
            </details>;
          })}</div>}</div>
        </div>
        <figcaption>{captions[id][zh ? 1 : 0]}</figcaption>
      </figure>;
    })}
  </div>;
}
