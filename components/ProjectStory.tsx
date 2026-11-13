"use client";

import Image from "next/image";
import styles from "./ProjectStory.module.css";
import projectsData from "@/data/projects.json";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeProject, t } from "@/lib/i18n";
import DiveDexCase, { CaseResearch, CaseJourney } from "./DiveDexCase";
import DiveDexLivePreview from "./DiveDexLivePreview";
import DiveDexMotion, { type DiveDexClip } from "./DiveDexMotion";
import DiveDexResearch from "@/components/DiveDexResearch";
import ResearchGallery from "@/components/ResearchGallery";
import PrototypeVideo from "@/components/PrototypeVideo";
import ProjectDossier from "@/components/ProjectDossier";

type ProjectData = (typeof projectsData)[number];

type BaseSection = {
  type: string;
  title?: string;
};

type TextSection = BaseSection & {
  type: "text";
  body?: string;
};

type ImageSection = BaseSection & {
  type: "image";
  image: string;
  alt?: string;
  caption?: string;
};

type GallerySection = BaseSection & {
  type: "gallery" | "slideshow";
  images: {
    image: string;
    caption?: string;
  }[];
};

type ProcessStepsSection = BaseSection & {
  type: "process-steps";
  steps: {
    step_title?: string;
    description?: string;
  }[];
};

type VideoSection = BaseSection & {
  type: "video";
  src: string;
  fallbackUrl?: string;
  caption?: string;
};

type PrototypeVideoSection = BaseSection & {
  type: "prototype-video";
  src: string;
  poster?: string;
  caption?: string;
  portrait?: boolean;
};

type SplitSection = BaseSection & {
  type: "split";
  body?: string;
  image: string;
  alt?: string;
  caption?: string;
  imagePosition?: "left" | "right";
};

type Section =
  | TextSection
  | ImageSection
  | GallerySection
  | ProcessStepsSection
  | VideoSection
  | PrototypeVideoSection
  | SplitSection
  | { type: "divedex-research"; title?: string };

type RelatedLink = {
  label?: string;
  url?: string;
};

const normalizeAsset = (src?: string) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return `/${src.replace(/^(\.\.\/)+/, "").replace(/^\//, "")}`;
};

const extractDriveId = (value: string) => {
  if (!value) return "";
  const directMatch = value.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (directMatch?.[1]) {
    return directMatch[1];
  }

  try {
    const url = new URL(value);
    const idParam = url.searchParams.get("id");
    if (idParam) return idParam;
  } catch {
    // not a URL, fall through
  }

  return "";
};

const buildDrivePreviewUrl = (value: string) => {
  const id = extractDriveId(value);
  if (!id) return value;
  return `https://drive.google.com/file/d/${id}/preview`;
};

const renderParagraphs = (body?: string) => {
  if (!body) return null;
  return body.split(/\n\s*\n/).map((chunk, index) => (
    <p
      key={`para-${index}`}
      // Allow inline HTML (e.g., links) in project copy controlled by authors
      dangerouslySetInnerHTML={{ __html: chunk.trim() }}
    />
  ));
};

const renderSection = (section: Section, index: number) => {
  switch (section.type) {
    case "prototype-video":
      return (
        <section key={`prototype-video-${index}`} className={styles.section}>
          {section.title ? <h2 className={styles.sectionHeader}>{section.title}</h2> : null}
          <PrototypeVideo
            src={normalizeAsset(section.src)}
            poster={section.poster ? normalizeAsset(section.poster) : undefined}
            title={section.title ?? "Design prototype"}
            portrait={section.portrait}
          />
          {section.caption ? <p className={styles.caption}>{section.caption}</p> : null}
        </section>
      );
    case "slideshow": {
      return (
        <section key={`slideshow-${index}`} className={styles.section}>
          {section.title ? <h2 className={styles.sectionHeader}>{section.title}</h2> : null}
          <ResearchGallery title={section.title ?? "Project slides"} slides={section.images.map((item) => ({
            src: normalizeAsset(item.image),
            title: item.caption ?? section.title ?? "Project slide",
            alt: item.caption ?? section.title ?? "Project slide",
          }))} />
        </section>
      );
    }
    case "divedex-research":
      return <DiveDexResearch key={`research-${index}`} />;
    case "text": {
      return (
        <section key={`text-${index}`} className={styles.section}>
          {section.title ? (
            <h2 className={styles.sectionHeader}>{section.title}</h2>
          ) : null}
          <div className={styles.sectionBody}>
            {renderParagraphs((section as TextSection).body)}
          </div>
        </section>
      );
    }
    case "image": {
      const imageSection = section as ImageSection;
      const src = normalizeAsset(imageSection.image);
      return (
        <figure key={`image-${index}`} className={`${styles.section} ${styles.figure}`}>
          <Image
            src={src}
            alt={imageSection.alt ?? imageSection.title ?? ""}
            width={1800}
            height={1200}
            sizes="(max-width: 900px) 100vw, 82vw"
          />
          {imageSection.caption ? (
            <figcaption className={styles.caption}>{imageSection.caption}</figcaption>
          ) : null}
        </figure>
      );
    }
    case "gallery": {
      const gallery = section as GallerySection;
      return (
        <section key={`gallery-${index}`} className={styles.section}>
          {gallery.title ? (
            <h2 className={styles.sectionHeader}>{gallery.title}</h2>
          ) : null}
          <div className={styles.galleryGrid}>
            {gallery.images.map((item, imageIndex) => {
              const src = normalizeAsset(item.image);
              return (
                <figure key={`gallery-item-${imageIndex}`} className={styles.galleryItem}>
                  <Image
                    src={src}
                    alt={item.caption ?? gallery.title ?? ""}
                    width={1200}
                    height={900}
                    sizes="(max-width: 700px) 100vw, 42vw"
                  />
                  {item.caption ? (
                    <figcaption className={styles.galleryCaption}>
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        </section>
      );
    }
    case "split": {
      const splitSection = section as SplitSection;
      const src = normalizeAsset(splitSection.image);
      const imageFirst = splitSection.imagePosition === "left";
      return (
        <section
          key={`split-${index}`}
          className={`${styles.section} ${styles.splitSection}`}
        >
          {splitSection.title ? (
            <h2 className={styles.sectionHeader}>{splitSection.title}</h2>
          ) : null}
          <div
            className={`${styles.splitContent} ${
              imageFirst ? styles.splitContentImageFirst : ""
            }`}
          >
            <div className={styles.splitText}>
              {renderParagraphs(splitSection.body)}
            </div>
            <figure className={styles.splitFigure}>
              <Image
                src={src}
                alt={splitSection.alt ?? splitSection.title ?? ""}
                width={1200}
                height={900}
                sizes="(max-width: 800px) 100vw, 45vw"
              />
              {splitSection.caption ? (
                <figcaption className={styles.splitCaption}>
                  {splitSection.caption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </section>
      );
    }
    case "process-steps": {
      const stepsSection = section as ProcessStepsSection;
      return (
        <section key={`steps-${index}`} className={styles.section}>
          {stepsSection.title ? (
            <h2 className={styles.sectionHeader}>{stepsSection.title}</h2>
          ) : null}
          <div className={styles.stepsList}>
            {stepsSection.steps.map((step, stepIndex) => (
              <div key={`step-${stepIndex}`} className={styles.stepItem}>
                {step.step_title ? (
                  <h3 className={styles.stepTitle}>{step.step_title}</h3>
                ) : null}
                {step.description ? <p>{step.description}</p> : null}
              </div>
            ))}
          </div>
        </section>
      );
    }
    case "video": {
      const videoSection = section as VideoSection;
      const isDrive = videoSection.src.includes("drive.google.com");
      const isBilibili = /^https:\/\/player\.bilibili\.com\/player\.html(?:\?|$)/.test(videoSection.src);
      const fallbackUrl = videoSection.fallbackUrl ?? (isBilibili
        ? `https://www.bilibili.com/video/${new URL(videoSection.src).searchParams.get("bvid")}/`
        : undefined);
      const src = isDrive
        ? buildDrivePreviewUrl(videoSection.src)
        : normalizeAsset(videoSection.src);
      return (
        <section key={`video-${index}`} className={styles.section}>
          {videoSection.title ? (
            <h2 className={styles.sectionHeader}>{videoSection.title}</h2>
          ) : null}
          <div className={styles.videoWrapper}>
            {isDrive || isBilibili ? (
              <iframe
                src={src}
                title={videoSection.title ?? "Project video"}
                allow="autoplay; fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <video src={src} controls playsInline preload="metadata" />
            )}
          </div>
          {fallbackUrl ? (
            <p className={styles.caption}>
              <a href={fallbackUrl} target="_blank" rel="noreferrer">
                在 B 站观看 / Watch on Bilibili
              </a>
            </p>
          ) : null}
          {videoSection.caption ? (
            <p className={styles.caption}>{videoSection.caption}</p>
          ) : null}
        </section>
      );
    }
    default:
      return null;
  }
};

interface ProjectStoryProps {
  project: ProjectData;
}

export default function ProjectStory({ project: rawProject }: ProjectStoryProps) {
  const { language } = useLanguage();
  const project = localizeProject(rawProject, language);
  const heroImage = normalizeAsset(project.thumbnail);
  const heroImages = project.heroImages;
  const rawHeroVideo = project.meta?.video?.trim();
  const heroVideoIsDrive = !!rawHeroVideo && rawHeroVideo.includes("drive.google.com");
  const heroVideo = rawHeroVideo
    ? heroVideoIsDrive
      ? buildDrivePreviewUrl(rawHeroVideo)
      : normalizeAsset(rawHeroVideo)
    : "";
  const timeline = project.meta?.timeline;
  const techStack = project.meta?.techStack ?? [];
  const role = project.meta?.role;
  const relatedLinks =
    ((project.meta as { relatedLinks?: RelatedLink[] } | undefined)?.relatedLinks ??
      []) as RelatedLink[];
  const normalizedRelatedLinks = relatedLinks
    .filter(
      (link): link is { label?: string; url: string } =>
        !!link?.url && typeof link.url === "string" && link.url.trim() !== "#"
    )
    .map((link) => ({
      url: link.url.trim(),
      label:
        typeof link.label === "string" && link.label.trim()
          ? link.label.trim()
          : t("openLink", language),
    }));
  const sections = project.sections ?? [];

  if (project.id === "divedex-mobile-app") {
    const zh = language === "zh";
    const show = (indices: number[]) => indices.map(index => renderSection(sections[index] as Section, index));
    const copy = (en: string, cn: string) => zh ? cn : en;
    const motion = (clips: DiveDexClip[], wide = false) => <DiveDexMotion zh={zh} clips={clips} wide={wide} />;
    return <DiveDexCase title={project.title} subtitle={project.subtitle} timeline={timeline} role={role} tools={techStack} tags={project.tags ?? []} links={normalizedRelatedLinks} chinese={zh}
      hero={<div className={styles.divedexHeroStack}>
        <Image src={heroImage} alt={zh ? "DiveDex 应用首图：手持手机与海洋探索功能" : "DiveDex app: handheld phone and ocean discovery features"} width={1920} height={1080} sizes="100vw" priority style={{ width: "100%", height: "auto", display: "block" }} />
        <PrototypeVideo src={heroVideo} poster="/assets/projects/divedex/motion-2026/ui-carousel-black-poster.webp" title={zh ? "DiveDex 界面动态展示" : "DiveDex interface showcase"} autoPlay />
      </div>}
      chapters={[
        { id: "overview", title: copy("Final outcome", "最终设计"), content: <>
          <p>{copy("DiveDex helps recreational divers plan what to look for, identify what they photographed and keep a personal collection of encounters.", "DiveDex 帮助休闲潜水者在出发前找到观察目标，潜后辨认照片里的生物，并把每次相遇整理成自己的收藏。")}</p>
          <DiveDexLivePreview title={copy("Interactive DiveDex app","DiveDex 交互应用")} />
          <h3>{copy("Identify a sighting", "辨认一次相遇")}</h3><p>{copy("Choose photos after a dive. Clear matches can be saved together. For an uncertain suggestion, compare visible features before confirming, correcting or leaving it open.", "潜水归来后选取照片。清楚的匹配可以批量保存；不确定的结果可以展开查看特征，再决定确认、更正，或暂时留空。")}</p>
          {motion(["identify-full","identify-review"])}
          <h3>{copy("Return to a discovery", "回看一次发现")}</h3><p>{copy("Open a sighting from the map, timeline or species category, then revisit the photo and its identifying marks.", "从地图、时间线或物种分类找到一次相遇，重新查看自己的照片和辨认线索。")}</p>
          {motion(["collection-walkthrough","blue-tang-walkthrough"])}
          <a href="https://www.divedex.xyz">{copy("Try the web prototype", "体验网页原型")}</a>
        </> },
        { id: "research", title: copy("User Research", "用户研究"), content: <CaseResearch t={copy} /> },
        { id: "ideation", title: copy("Ideation", "设计构思"), content: <>
          <h3>{copy("Organizing the dive journey", "围绕一次潜水组织功能")}</h3>
          <p>{copy("The early wireframes mapped import, identification and collection as separate destinations. Testing helped me decide which action to surface before a dive, at the site and after returning.", "早期线框把照片导入、识别和收藏设为独立入口。通过测试，我逐步确定行前、现场和潜后各阶段最需要呈现的操作。")}</p>
          <CaseJourney t={copy} />
          {motion(["home-stages-trimmed"])}
          <h3>{copy("Four versions of DiveDex", "四版 DiveDex 的演进")}</h3>
          <p>{copy("About six divers participated in testing. I watched them use the flows without guidance and asked them to compare alternatives. Across three Figma versions and a web prototype, Home moved from shortcuts to stage-specific actions and identification moved from individual reviews to grouped saves.", "约六位潜水者参与了测试。我观察他们在没有引导时如何使用原型，并请他们比较不同方案。从三版 Figma 到网页原型，首页从功能入口逐步变成阶段引导，识别也从逐条复核变成了分组保存。")}</p>
          {motion(["prototype-versions-carousel","prototype-v2-v3-source-screens","prototype-overview-upper-screens-hd"], true)}
          <h3>{copy("Rethinking the first visit", "重新设计首次体验")}</h3>
          <p>{copy("The early guided tour introduced pages one by one. The final opening introduces the activities first and lets a visitor explore as a guest.", "早期引导逐页介绍界面。最终版先演示可以做什么，并为想直接探索的人保留访客入口。")}</p>
          {motion(["early-guided-tour","meet-divedex-full"])}
          <details><summary>{copy("Earlier planning documents", "早期规划文档")}</summary>{show([13,14,15,16,17])}</details>
        </> },
        { id: "prototype", title: copy("Prototype", "交互原型"), content: <>
          <h3>{copy("Set up a first dive", "准备第一次探索")}</h3>
          {motion(["welcome-entry","meet-divedex","more-interests","equipment-selection"])}
          <h3>{copy("Before the dive", "出发前")}</h3><p>{copy("Explore a destination and save wildlife you hope to see. Suggestions depend on the area, month and interests you choose.", "浏览想去的目的地，收藏希望遇见的生物。推荐会参考所选地区、月份和兴趣。")}</p>
          {motion(["just-exploring","just-exploring-full","explore-full","explore-wishlist"])}
          <h3>{copy("At the dive site", "抵达潜点")}</h3><p>{copy("Choose the site, open a reef challenge and use its hints to decide what to look for.", "选择所在潜点，打开礁区观察挑战，根据线索确定这次想寻找的生物。")}</p>
          {motion(["at-the-spot","at-the-spot-full","reef-challenge-card","reef-challenge-walkthrough"])}
          <h3>{copy("After surfacing", "回到水面后")}</h3>{motion(["after-a-dive","after-a-dive-full","collection-views"])}
          <h3>{copy("Learning from a blue tang sighting", "从蓝刺尾鱼记录继续学习")}</h3>{motion(["blue-tang-record-nov9","recognise-a-blue-tang","ocean-quiz-answer"])}
          <h3>{copy("Choosing what to share", "选择分享哪些记录")}</h3><p>{copy("45 of 63 respondents were willing to share observations for research, while seven had done so. In this prototype, divers select a study and photos, review the recipient and location precision, and decide whether to submit. Identification and submissions are simulated.", "63 位受访者中，45 位愿意为研究分享观察，实际分享过的有 7 位。在原型中，潜水者选择研究项目与照片，了解接收方及位置精度后决定是否提交。识别结果和提交流程均为模拟。")}</p>
        </> },
      ]}
    />;
  }

  // Group existing content into chapters without changing its order or media.
  const chapterStarts: Record<string, number[]> = {
    "zq-sports": [0, 1, 3, 7, 10],
    "lifemart": [0, 2, 6, 10, 13, 16, 19],
    "i-want-home-i-could-carry-with": [0, 2, 3],
    "divedex": [0, 2, 7, 10],
    "labyrinth": [0, 1, 4, 5],
    "chester-choiceworth": [0, 2, 3, 4, 5],
    "spinphony": [0, 1, 2],
    "marbility": [0, 1, 2, 3],
  };
  const starts = chapterStarts[project.id] ?? [0];
  const chapters = starts.map((start, chapterIndex) => ({
    id: chapterIndex === 0 ? "overview" : `chapter-${chapterIndex + 1}`,
    title: sections[start]?.title || (language === "zh" ? "项目概览" : "Overview"),
    content: sections.slice(start, starts[chapterIndex + 1] ?? sections.length).map((section, offset) =>
      renderSection({ ...section, ...(offset === 0 ? { title: undefined } : {}) } as Section, start + offset)
    ),
  }));
  return <ProjectDossier
    key={project.id}
    title={project.title} subtitle={project.subtitle} timeline={timeline}
    role={role} tools={techStack} tags={project.tags ?? []}
    links={normalizedRelatedLinks} chinese={language === "zh"}
    chapters={chapters}
    hero={heroImages?.length ? (
            <div className={styles.heroPhotos}>
              {heroImages.map((item, index) => (
                <figure key={item.image} className={styles.heroPhoto}>
                  <Image
                    src={normalizeAsset(item.image)}
                    alt={item.caption ?? project.title}
                    width={2400}
                    height={1350}
                    sizes="(max-width: 1095px) 46vw, 506px"
                    priority={index === 0}
                  />
                  {item.caption ? (
                    <figcaption className={styles.caption}>{item.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : (
          <div className={`${styles.heroMedia} ${heroVideo ? styles.heroMediaVideo : ""}`}>
            {heroVideo && project.id === "divedex-mobile-app" && !heroVideoIsDrive ? (
              <PrototypeVideo src={heroVideo} poster={heroImage} title={language === "zh" ? "DiveDex 设计原型动效" : "DiveDex design prototype motion"} autoPlay />
            ) : heroVideo ? (
              heroVideoIsDrive ? (
                <iframe
                  src={heroVideo}
                  title={`${project.title} hero video`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className={styles.heroVideoFrame}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <video
                  src={heroVideo}
                  className={styles.heroVideo}
                  playsInline
                  autoPlay
                  muted
                  loop
                  controls
                />
              )
            ) : (
              <Image
                src={heroImage}
                alt={project.title}
                width={1800}
                height={1200}
                sizes="100vw"
                priority
              />
            )}
          </div>
          )}
  />;
}
