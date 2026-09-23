"use client";

import { useLanguage } from "@/components/LanguageProvider";
import ResearchGallery from "@/components/ResearchGallery";
import styles from "./DiveDexResearch.module.css";
import storyStyles from "./ProjectStory.module.css";

const copy = {
  "en": {
    "title": "User Research",
    "question": "“What was that fish?”",
    "intro": "Underwater discoveries often end in the camera roll. Through 63 survey responses, four interviews, and four secondary sources, I explored the friction between capturing, reviewing, identifying, recording, and contributing. AI supported early exploration and interview hypotheses; the findings come from real surveys and interviews, not AI-generated personas.",
    "methods": [
      "Survey responses",
      "Interviews",
      "Secondary sources"
    ],
    "findings": [
      {
        "title": "The media already exists",
        "body": "Divers already capture underwater encounters in photos and videos. The opportunity begins with the footage they bring back.",
        "implication": "Start with existing photos and short videos, without adding tasks underwater."
      },
      {
        "title": "Curiosity happens quickly",
        "body": "The survey found that 82% reviewed their media on the same day. Questions about an unfamiliar animal often arise soon after surfacing.",
        "implication": "Make it easy to pick up a discovery while the encounter is still fresh."
      },
      {
        "title": "AI answers can still feel uncertain",
        "body": "Similar species and poor footage make identification difficult. A real interview revealed that users may not know enough to notice when AI is wrong.",
        "implication": "Flag uncertainty proactively, show short visual cues, and allow unresolved results."
      },
      {
        "title": "Keeping a memory is not the same as finding it again",
        "body": "Saved media often remains unorganized. Long, numerous videos make interesting moments difficult to locate.",
        "implication": "Help surface relevant moments and connect discoveries to their original media."
      },
      {
        "title": "Making a record takes too much work",
        "body": "The survey and interviews pointed to the effort of organizing discoveries. The interview emphasized a fun, visual collection over a formal logbook.",
        "implication": "Build My Ocean around personally meaningful discoveries, with minimal extra work."
      },
      {
        "title": "Willingness to contribute needs a clear path",
        "body": "Interest in citizen science was much higher than actual participation. Relevant projects, sharing channels, and data use were unclear.",
        "implication": "Keep contribution optional and explain the recipient, purpose, and data before sharing."
      }
    ],
    "implication": "Design implication",
    "interviewTitle": "How real interviews changed the AI concept",
    "interviewBody": "The interviews challenged the assumption that more evidence and more controls would help. Users needed the system to signal uncertainty and a simple way to question a result. Identification also involved guides, fish books, AI, and social media, with location and habitat helping resolve ambiguity. The desired outcome was a fun, visual “digital aquarium,” rather than a formal logbook.",
    "galleryTitle": "Inside the research",
    "galleryIntro": "Updated research slides: the six insights, participant profile, survey findings, interview comparison, and user journey.",
    "slides": [
      {
        "file": "insights",
        "title": "Research synthesis · Six key insights",
        "alt": "Research synthesis · Six key insights"
      },
      {
        "file": "participants",
        "title": "Participants · Experience and age",
        "alt": "Participants · Experience and age"
      },
      {
        "file": "survey",
        "title": "Survey · Capture, identify, record",
        "alt": "Survey · Capture, identify, record"
      },
      {
        "file": "interviews",
        "title": "Interviews · Testing AI-generated hypotheses",
        "alt": "Interviews · Testing AI-generated hypotheses"
      },
      {
        "file": "journey",
        "title": "Journey · From capture to contribution",
        "alt": "Journey · From capture to contribution"
      }
    ],
    "directionTitle": "From footage to My Ocean",
    "direction": "The current concept turns photos and short videos into discoveries through AI candidate suggestions, visible traits, and optional location context, then saves them to a personal collection. AI provides a starting point; the diver can confirm, correct, or defer a result. This flow remains in design and preparation for user testing.",
    "steps": [
      "Import media",
      "Compare candidates",
      "Confirm or defer",
      "Save to My Ocean"
    ]
  },
  "zh": {
    "title": "用户研究",
    "question": "“刚才那是什么鱼？”",
    "intro": "水下发现常常停留在相册里。我通过 63 份问卷、4 次访谈与 4 项二手研究，梳理从拍摄、回看、识别到保存与贡献的过程。AI 用于早期探索和生成访谈假设，研究结论依据实际问卷与访谈，而非 AI 人物画像。",
    "methods": [
      "问卷回复",
      "访谈",
      "二手研究来源"
    ],
    "findings": [
      {
        "title": "影像已经存在",
        "body": "潜水员已经在用照片和视频记录水下相遇。设计机会始于他们带回的素材。",
        "implication": "从已有照片和短视频开始，不增加水下操作。"
      },
      {
        "title": "好奇心很快出现",
        "body": "问卷中 82% 的受访者会在当天回看影像。对陌生生物的好奇，往往在出水后不久便出现。",
        "implication": "让用户趁记忆仍然鲜明时，轻松继续探索。"
      },
      {
        "title": "AI 给出答案，仍然可能让人没有把握",
        "body": "相似物种与不清晰的影像增加了辨认难度。真实访谈指出，用户可能缺乏足够知识，无法察觉 AI 出错。",
        "implication": "主动标明不确定性、提供简短的可见特征，并允许结果保持未解决。"
      },
      {
        "title": "保存记忆，不等于能再次找到它",
        "body": "保存下来的影像经常没有整理。视频数量多、时长长，让有趣的片段难以定位。",
        "implication": "帮助找到相关片段，并将发现与原始影像关联。"
      },
      {
        "title": "整理成记录，仍然太费力",
        "body": "问卷与访谈都指出整理发现的负担。访谈更强调有趣、直观的个人收藏，而非正式日志。",
        "implication": "围绕有个人意义的发现建立 My Ocean，减少额外整理工作。"
      },
      {
        "title": "愿意贡献，却缺少清晰的参与路径",
        "body": "参与公民科学的意愿远高于实际参与。相关项目、提交渠道与数据用途并不清楚。",
        "implication": "保留自主选择，并在分享前说明接收方、目的与数据内容。"
      }
    ],
    "implication": "对设计的影响",
    "interviewTitle": "真实访谈如何改变 AI 方案",
    "interviewBody": "访谈修正了对大量证据与控制选项的假设：用户需要系统主动标明不确定性，也能简单地质疑结果。识别会结合向导、图鉴、AI 与社交媒体；地点和栖息地可帮助判断。相比正式日志，受访者更想要一个有趣、直观且有个人意义的“数字水族馆”。",
    "galleryTitle": "研究材料",
    "galleryIntro": "新版研究中的洞察总结、参与者构成、问卷发现、访谈对比与用户旅程。",
    "slides": [
      {
        "file": "insights",
        "title": "研究总结 · 六个关键洞察",
        "alt": "研究总结 · 六个关键洞察"
      },
      {
        "file": "participants",
        "title": "参与者 · 潜水经验与年龄",
        "alt": "参与者 · 潜水经验与年龄"
      },
      {
        "file": "survey",
        "title": "问卷 · 拍摄、识别与记录",
        "alt": "问卷 · 拍摄、识别与记录"
      },
      {
        "file": "interviews",
        "title": "访谈 · 检验 AI 生成的假设",
        "alt": "访谈 · 检验 AI 生成的假设"
      },
      {
        "file": "journey",
        "title": "用户旅程 · 从拍摄到贡献",
        "alt": "用户旅程 · 从拍摄到贡献"
      }
    ],
    "directionTitle": "从影像到 My Ocean",
    "direction": "当前方向是潜水后的探索伙伴：从照片或短视频中发现生物，通过 AI 候选建议、可见特征与可选的地点信息辅助辨认，再将发现保存到个人收藏。AI 提供起点，用户可以确认、纠正或暂缓判断。这一流程仍在设计与测试准备阶段。",
    "steps": [
      "导入影像",
      "比较候选物种",
      "确认或暂缓",
      "保存至 My Ocean"
    ]
  }
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
            </div>
            <div className={styles.implication}><h4>{content.implication}</h4><p>{finding.implication}</p></div>
          </article>
        ))}
      </div>
      <div className={styles.materials}>
        <h3>{content.interviewTitle}</h3>
        <p>{content.interviewBody}</p>
      </div>
      <div className={styles.materials}>
        <h3>{content.galleryTitle}</h3>
        <p>{content.galleryIntro}</p>
        <ResearchGallery title={content.galleryTitle} slides={content.slides.map((slide) => ({ ...slide, src: `/assets/projects/divedev/mobile-2026/${slide.file}.webp` }))} />
      </div>
      <div className={styles.direction}>
        <h3>{content.directionTitle}</h3>
        <p>{content.direction}</p>
        <ol>{content.steps.map((step) => <li key={step}>{step}</li>)}</ol>
      </div>
    </section>
  );
}
