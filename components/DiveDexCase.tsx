"use client";

import { useEffect, useRef, type ComponentProps } from "react";
import ProjectDossier from "./ProjectDossier";
import { gsap } from "gsap";
import { FileText, Speech, BookOpen } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import s from "./DiveDexCase.module.css";

type Translate = (en: string, cn: string) => string;

export function CaseResearch({ t }: {t: Translate}) {
  const experience = [["<20",33,"#044c78"],["20–49",10,"#0079ab"],["50+",17,"#5aaecb"],[t("Unsure","不确定"),3,"#b6c5cb"]] as const;
  const rows = [
    ["Took dive photos/videos","拍摄潜水照片或视频",79],["Reviewed media that day","当天回看影像",82],["Wanted to ID unfamiliar wildlife","想辨认陌生生物",78],["Identified the exact species","辨认到具体物种",23],["Wanted to record species","想记录物种",64],["Ever recorded a sighting","曾记录一次发现",41],["Logged nearly every dive","几乎每潜都记录",16],
  ] as const;
  return <>
    <div className={s.panel}><div className={s.goal}><h2>{t("User Research","用户研究")}</h2>
      <div><h3>{t("Research Goal","研究目标")}</h3><p>{t("Understand how recreational divers use their photos after a dive, identify unfamiliar marine life and keep a record of what they saw.","了解休闲潜水者如何在潜后使用照片、辨认陌生海洋生物，并记录自己的发现。")}</p></div>
      <div><h3>{t("Survey participants (63 respondents)","问卷参与者（63 人）")}</h3>
      <div className={s.stack} data-bar>{experience.map(([label,n,color])=><span key={label} style={{flex:n,background:color}} />)}</div>
      <ul className={s.legend}>{experience.map(([label,n,color],i)=><li key={label}><i style={{background:color}}/>{label}{i<3?t(" dives"," 潜"):""} · {n}</li>)}</ul></div>
    </div><dl className={s.stats}>{[[FileText,63,t("Survey","问卷")],[Speech,4,t("Interview","访谈")],[BookOpen,4,t("Secondary Research","二手研究")]].map(([Icon,n,label])=>{const Symbol=Icon as typeof FileText;return <div key={String(label)}><Symbol aria-hidden="true" strokeWidth={1.5}/><dt>{String(label)}</dt><dd>{String(n)}</dd></div>})}</dl></div>
    <article className={s.sheet}><h3>{t("Survey | User Journey Funnel","问卷｜用户旅程漏斗")}</h3><div className={s.chart}>{rows.map(([en,cn,n],i)=><div key={en}><span>{t(en,cn)}</span><div><i data-bar style={{width:n+"%",background:i===3||i===6?"#ff6200":undefined}}/><b>{n}%</b></div></div>)}</div><p>{t("Survey bases: capture and recording, 63 divers. Same-day review and interest in identification, 50 photographers. Exact identification, 31 divers who tried; seven reported a species-level match.","调查基数：拍摄与记录为 63 位潜水者；当天回看与辨认意愿为 50 位拍摄者；具体物种辨认为 31 位实际尝试者，其中 7 位表示找到了具体物种。")}</p></article>
    <article className={s.sheet}><h3>{t("Interview & Secondary Research | Why These Gaps Occur","访谈与二手研究｜这些落差从何而来")}</h3><div className={s.columns}>{[
      ["Identification gap","辨认落差","Divers struggled to describe a fish to their guide. Searches in fish guides and on social media often ended before a match.","潜水者很难向潜导描述看到的鱼。翻查鱼类图鉴和社交媒体，也常在找到匹配前就放弃。"],
      ["Recording gap","记录落差","Labelling photos took extra effort. By the time divers returned to their log, species names had slipped away.","逐张标注照片耗费精力，等到整理潜水日志时，物种名称往往已经忘记。"],
      ["Contribution gap","贡献落差","45 of 63 were willing to share photos or videos for research. Only seven had contributed. Finding a suitable study and submitting media were obstacles.","63 人中有 45 人愿意为研究分享照片或视频，实际参与过的只有 7 人。寻找合适的研究项目与提交渠道都是障碍。"],
    ].map(([en,cn,a,b])=><div key={en}><h4>{t(en,cn)}</h4><p>{t(a,b)}</p></div>)}</div></article>
  </>;
}

export function CaseJourney({ t }: {t: Translate}) {
  return <><h3>{t("DiveDex on a Dive","一次潜水中的 DiveDex")}</h3><ol className={s.timeline}>{[
    ["Before the dive","潜水前","Know what to look for.","了解值得观察的生物。","Suggest local wildlife for the site. Explain uncertainty; a sighting is never guaranteed.","根据潜点推荐当地生物，说明不确定性，不承诺一定能遇见。"],
    ["Dive & capture","潜水中","Focus on the dive. Take a photo or clip for later review.","专注潜水，拍下照片或短片留待潜后回看。","",""],
    ["Review & identify","复核与辨认","Tell similar species apart.","区分外形相似的物种。","Flag weak matches and show visible clues. Leave uncertain sightings unidentified.","标出较弱的匹配并展示可见线索，允许保留未辨认的记录。"],
    ["Record","记录","Save without retyping.","保存发现，减少重复填写。","Organize confirmed sightings by species. Leave unknown details blank for the diver.","按物种整理已确认的发现。未知信息留空，由潜水者决定是否补充。"],
    ["Contribute (optional)","参与研究（可选）","Choose a relevant study.","选择相关的研究项目。","Suggest matching photos. Explain the recipient, purpose, location precision, commercial use and withdrawal before asking for consent. Never auto-submit.","建议符合条件的照片。征得同意前说明接收方、目的、位置精度、商业用途及撤回方式，由本人决定是否提交。"],
  ].map(([en,cn,a,b,ai,translation])=><li key={en}><div><strong>{t(en,cn)}</strong><p>{t(a,b)}</p>{ai&&<details className={s.responsibility}><summary>{t("AI responsibility","AI 职责")}</summary><p>{t(ai,translation)}</p></details>}</div></li>)}</ol>
  <h3>{t("App Structure","应用结构")}</h3><p>{t("First visit: Welcome → Sign up or continue as guest → Feature tour → Interests → Equipment → Home","首次访问：欢迎页 → 注册或以访客继续 → 功能导览 → 兴趣 → 装备 → 首页")}</p>
  <div className={s.tree}>{[
    ["Home","首页",[
      ["Just exploring | Explore destinations | Dive sites & map","行前探索 | 探索目的地 | 潜点与地图"],
      ["At the spot | Reef challenge & hints | Verify a find","抵达潜点 | 礁区挑战与提示 | 验证发现"],
      ["After a dive | Identify or revisit Collection","潜水归来 | 识别或回看收藏"]]],
    ["Explore","探索",[
      ["Dive sites & map | Area, month & interests | Destination & trip ideas","潜点与地图 | 地区、月份与兴趣 | 目的地与行程建议"],
      ["Marine life | Species guides & photo tips | Save to Want to see | Profile · saved species","海洋生物 | 物种指南与拍摄提示 | 加入想看清单 | 个人页 · 已存物种"],
      ["Local experiences | Ocean-related activities","当地体验 | 海洋活动"],
      ["Local experiences | Research study | Choose photos & permissions | My contributions","当地体验 | 研究项目 | 选择照片与权限 | 我的贡献"]]],
    ["Identify","识别",[
      ["Photos or video | Analyse & suggest matches | Clear matches | Batch-save to Collection","照片或视频 | 分析并建议匹配 | 明确匹配 | 批量保存到收藏"],
      ["Photos or video | Analyse & suggest matches | Uncertain matches | Inspect, confirm or edit","照片或视频 | 分析并建议匹配 | 不确定匹配 | 对照、确认或更正"],
      ["Photos or video | Analyse & suggest matches | Uncertain matches | Leave unidentified","照片或视频 | 分析并建议匹配 | 不确定匹配 | 保留未辨认状态"]]],
    ["Collection","收藏",[
      ["Map, timeline or category | Species & sighting record | Field marks, habitat & Q&A","地图、时间线或分类 | 物种与发现记录 | 辨认特征、栖息地与问答"],
      ["Pending IDs | Confirm, correct or defer","待辨认记录 | 确认、更正或暂缓"]]],
    ["Profile","个人",[
      ["Equipment & settings","装备与设置"],["Saved species | Want to see | Open species guide","已存物种 | 想看清单 | 打开物种指南"],["Learning & activity | Quiz, milestones & contributions","学习与活动 | 测验、里程碑与贡献"]]]
  ].map(entry=>{const [en,cn,paths]=entry as [string,string,string[][]];return <details key={en}><summary>{t(en,cn)}</summary><ul>{paths.map(([a,b])=><li key={a}>{t(a,b).split(" | ").map(node=><span key={node}>{node}</span>)}</li>)}</ul></details>})}</div></>;
}

export default function DiveDexCase(props: ComponentProps<typeof ProjectDossier>) {
  const ref=useRef<HTMLDivElement>(null);
  const {language}=useLanguage();
  useEffect(()=>{
    const root=ref.current;
    if(!root)return;
    const media=gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)",()=>{
      const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){
        const el=entry.target;
        gsap.from(el,el.hasAttribute("data-bar")?{scaleX:0,transformOrigin:"left",duration:.85,ease:"power2.out",clearProps:"transform"}:{y:16,duration:.55,ease:"power2.out",clearProps:"transform"});
        observer.unobserve(el);
      }});
      root.querySelectorAll("h2,h3,[data-bar]").forEach(el=>observer.observe(el));
      return ()=>observer.disconnect();
    });
    return ()=>media.revert();
  },[language]);
  return <div ref={ref}><ProjectDossier {...props} headingFont="divedex" chapters={props.chapters.map(c=>({...c, content:<div className={s.casePage}>{c.content}</div>}))}/></div>;
}
