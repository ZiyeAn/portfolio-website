"use client";

import { useLanguage } from "@/components/LanguageProvider";
import ResearchGallery from "@/components/ResearchGallery";
import styles from "./DiveDexResearch.module.css";
import storyStyles from "./ProjectStory.module.css";

const copy = {
  en: {
    title: "User Research",
    question: "What happens to a discovery after the dive?",
    intro: "I explored how recreational divers capture and revisit underwater media, identify marine life, and preserve what they discover. The research shifted the focus toward the moments after a dive: reviewing footage, making sense of an encounter, and keeping a memory of it.",
    methods: ["Survey responses", "Interviews", "Secondary sources"],
    findings: [
      { title: "A possible match is not enough", body: "Interviewees described finding similar-looking species without feeling confident about the identification. The survey analysis also highlighted uncertain results and the time spent searching.", quote: "Even when I find a similar species online, I’m not sure enough to say that is what I saw.", implication: "Help divers compare candidates and learn the visible traits behind an identification." },
      { title: "Saved footage can still become a forgotten discovery", body: "The survey showed a gap between saving media and turning it into a record. Interviews added another layer: even an identified species could soon be forgotten.", implication: "Connect each discovery to its original media and a personal collection that is easy to revisit." },
      { title: "Collecting should fit into the review", body: "Interviewees expressed interest in a collection without wanting extra work. Shared footage and selective reviewing also suggest that the experience needs to fit different habits.", quote: "I like the idea of building a collection, but I will not pay extra effort in doing so",
        implication: "Keep importing, comparing, learning, and saving within one connected flow." },
    ],
    implication: "Design implication",
    attribution: "Interview excerpt",
    galleryTitle: "Inside the research",
    galleryIntro: "Selected slides from the research deck, including the survey, interview findings, and proposed diver journey.",
    slides: [
      { file: "insights", title: "Survey synthesis · Four core insights", alt: "Original survey synthesis grouping findings into capture, identification uncertainty, memory, and contribution." },
      { file: "survey", title: "Survey data · From capture to contribution", alt: "Survey slide tracing diving, media capture, review, identification, recording, remembering, and contribution." },
      { file: "interviews", title: "Interviews · Confidence, memory, and effort", alt: "Interview findings on low confidence, forgotten discoveries, passive collection, shared footage, local preparation, selective effort, and interests beyond fish." },
      { file: "journey", title: "Proposed journey · Prepare, capture, review, remember", alt: "Illustrated journey of a recreational diver: prepare, capture, return, review footage, identify marine life, understand distinguishing traits, and remember discoveries in My Ocean." },
    ],
    directionTitle: "From recognition to discovery",
    direction: "The revised direction is a post-dive companion: import photos and videos, explore candidate species, learn distinguishing features, and save discoveries to My Ocean. Identification becomes part of learning and remembering, with the diver making the final choice. Contributing observations to trusted research projects is a further opportunity described in the research.",
    steps: ["Import media", "Compare candidates", "Learn visible traits", "Save to My Ocean"],
  },
  zh: {
    title: "用户研究",
    question: "潜水结束后，一次发现会留下什么？",
    intro: "我研究了休闲潜水员如何拍摄和回看水下影像、辨认海洋生物，以及保存自己的发现。研究将关注点转向潜水之后：回看素材、理解一次相遇，并将它留在记忆中。",
    methods: ["问卷回复", "访谈", "二手研究来源"],
    findings: [
      { title: "找到相似物种，还不足以确认", body: "受访者提到，即使找到外形相似的物种，也未必有把握确认。问卷分析同样指出了识别结果的不确定性，以及搜索所花费的时间。", quote: "即使我在网上找到相似的物种，也没有足够的把握说，那就是我看到的。", implication: "帮助潜水员比较候选物种，了解支持识别判断的可见特征。" },
      { title: "保存了影像，仍然可能忘记发现", body: "问卷显示，保存影像与将其整理为记录之间存在落差。访谈进一步指出：即使已经辨认出物种，它的名字也可能很快被遗忘。", implication: "将每次发现与原始影像关联，并保存到便于回顾的个人收藏中。" },
      { title: "收藏应该自然融入回看过程", body: "受访者对建立收藏有兴趣，却不愿为此投入额外精力。共享影像和选择性回看的习惯，也提示体验需要适应不同的使用方式。", quote: "我喜欢建立收藏的想法，但不愿意为此付出额外的精力。", implication: "将导入、比较、学习和保存串联在同一个流程中。" },
    ],
    implication: "对设计的影响",
    attribution: "访谈节选 · 中文译文",
    galleryTitle: "研究材料",
    galleryIntro: "精选原始研究幻灯片，展示问卷、访谈发现与拟定的潜水员旅程。",
    slides: [
      { file: "insights", title: "问卷分析 · 四个核心洞察", alt: "原始问卷分析：影像拍摄、识别的不确定性、记忆和参与贡献四类发现。" },
      { file: "survey", title: "问卷数据 · 从拍摄到贡献", alt: "沿潜水、拍摄、回看、识别、记录、记忆和贡献展开的问卷数据。" },
      { file: "interviews", title: "访谈 · 信心、记忆与投入", alt: "访谈发现包括识别信心不足、遗忘、被动收藏、共享素材、行前准备、选择性投入和鱼类之外的兴趣。" },
      { file: "journey", title: "拟定用户旅程 · 准备、拍摄、回看与记录", alt: "休闲潜水员的插画旅程：准备、拍摄、返回、回看素材、辨认海洋生物、理解特征，并将发现保存到 My Ocean。" },
    ],
    directionTitle: "从识别物种，到理解与记录发现",
    direction: "新版方向是一款潜水后的探索伙伴：导入照片和视频、比较候选物种、学习辨识特征，并将发现保存到 My Ocean。识别成为学习和记忆的一部分，由潜水员作出最终判断。向可信研究项目贡献观察记录，是研究中提出的进一步机会。",
    steps: ["导入影像", "比较候选物种", "学习辨识特征", "保存至 My Ocean"],
  },
};

export default function DiveDexResearch() {
  const { language } = useLanguage();
  const content = copy[language];
  return (
    <section id="user-research" className={styles.research} aria-labelledby="research-title">
      <header className={styles.header}>
        <h2 id="research-title" className={storyStyles.sectionHeader}>{content.title}</h2>
        <p className={styles.question}>{content.question}</p>
        <p>{content.intro}</p>
      </header>
      <dl className={styles.methods}>
        {content.methods.map((label, index) => <div key={label}><dt>{label}</dt><dd>{[63, 4, 4][index]}</dd></div>)}
      </dl>
      <div className={styles.findings}>
        {content.findings.map((finding, index) => (
          <article key={finding.title} className={styles.finding}>
            <span className={styles.number} aria-hidden="true">0{index + 1}</span>
            <div className={styles.findingBody}>
              <h3>{finding.title}</h3>
              <p>{finding.body}</p>
              {finding.quote ? <figure className={styles.quote}><blockquote><p>“{finding.quote}”</p></blockquote><figcaption>{content.attribution}</figcaption></figure> : null}
            </div>
            <div className={styles.implication}><h4>{content.implication}</h4><p>{finding.implication}</p></div>
          </article>
        ))}
      </div>
      <div className={styles.materials}>
        <h3>{content.galleryTitle}</h3>
        <p>{content.galleryIntro}</p>
        <ResearchGallery title={content.galleryTitle} slides={content.slides.map((slide) => ({ ...slide, src: `/assets/projects/divedev/research/${slide.file}.webp` }))} />
      </div>
      <div className={styles.direction}>
        <h3>{content.directionTitle}</h3>
        <p>{content.direction}</p>
        <ol>{content.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </div>
    </section>
  );
}
