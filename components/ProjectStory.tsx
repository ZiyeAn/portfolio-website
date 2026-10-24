"use client";

import Image from "next/image";
import styles from "./ProjectStory.module.css";
import projectsData from "@/data/projects.json";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeProject, t } from "@/lib/i18n";
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
      const src = isDrive
        ? buildDrivePreviewUrl(videoSection.src)
        : normalizeAsset(videoSection.src);
      return (
        <section key={`video-${index}`} className={styles.section}>
          {videoSection.title ? (
            <h2 className={styles.sectionHeader}>{videoSection.title}</h2>
          ) : null}
          <div className={styles.videoWrapper}>
            {isDrive ? (
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
    const plate = (names: string[], labels: string[]) => <div className={styles.designPlate}>{names.map((name, i) => <figure key={name}><a href={`/assets/projects/divedex/showcase-2026/source/${name}.png`} target="_blank" rel="noreferrer" aria-label={`${labels[i]} — ${zh ? "查看原图" : "View full image"}`}><Image src={`/assets/projects/divedex/showcase-2026/source/${name}.png`} alt={labels[i]} width={390} height={844} sizes="(max-width: 800px) 42vw, 360px" /></a><figcaption>{labels[i]}</figcaption></figure>)}</div>;

    const annotatedPlate = (names: string[], notes: { top: number; text: string }[][]) => <div className={styles.annotatedPlate}>{names.map((name, i) => <figure key={name} className={styles.annotatedPanel}><figcaption>V{i + 2}</figcaption><div className={styles.annotationCanvas}><a href={`/assets/projects/divedex/showcase-2026/source/${name}.png`} target="_blank" rel="noreferrer" aria-label={`V${i + 2} — ${zh ? "查看原图" : "View full image"}`}><Image src={`/assets/projects/divedex/showcase-2026/source/${name}.png`} alt={`V${i + 2}`} width={390} height={844} sizes="(max-width: 800px) 45vw, 240px" /></a>{notes[i].map((note,j) => <div key={j} className={styles.imageNote} style={{top:`${note.top}%`}}><span aria-hidden="true">←</span>{note.text}</div>)}</div></figure>)}</div>;

    return <ProjectDossier
      headingFont="editorial"
      title={project.title} subtitle={project.subtitle} timeline={timeline}
      role={role} tools={techStack} tags={project.tags ?? []} links={normalizedRelatedLinks} chinese={zh}
      hero={<div className={styles.divedexHeroStack}>
        <Image src={heroImage} alt={zh ? "DiveDex 应用首图：手持手机与海洋探索功能" : "DiveDex app: handheld phone and ocean discovery features"} width={1920} height={1080} sizes="100vw" priority style={{ width: "100%", height: "auto", display: "block" }} />
        <PrototypeVideo src={heroVideo} poster="/assets/projects/divedex/motion-2026/ui-carousel-black-poster.webp" title={zh ? "DiveDex 界面动态展示" : "DiveDex interface showcase"} autoPlay />
      </div>}
      chapters={[
        { id: "overview", title: zh ? "项目概览" : "Overview", content: <div className={styles.sectionBody}><p>{zh ? "DiveDex 帮助潜水者回看水下照片、判断可能的物种匹配，并把海洋相遇保存为个人收藏。" : "DiveDex helps divers revisit underwater photos, review possible species matches, and build a personal collection of ocean encounters."}</p><p>{zh ? "当前阶段：Figma 设计原型。识别结果、置信度与地点均为示例数据；下一步是验证用户能否理解不确定性并完成复核。" : "Current stage: Figma design prototype. Matches, confidence values, and locations are illustrative. The next step is testing whether people understand uncertainty and can review a suggestion."}</p></div> },
        { id: "research", title: zh ? "研究" : "Research", content: show([12]) },
        { id: "decisions", title: zh ? "设计决策" : "Design decisions", content: <>
        <details open><summary>{zh ? "查看早期功能规划与线框图" : "View earlier feature planning and wireframes"}</summary><div>{show([13,14,15,16,17])}</div></details>
        <h3>{zh ? "首页：从功能入口到个人经历" : "Home: from shortcuts to personal memories"}</h3>
        {annotatedPlate(["before-home","home"],[
          [{top:22,text:zh ? "更像功能面板，缺少 playful 的探索感。" : "A functional dashboard with little sense of play."},{top:61,text:zh ? "My Collection / Identify 两个大入口占据注意力，个人经历展示不够。" : "Large My Collection / Identify shortcuts dominate; personal memories get less space."}],
          [{top:24,text:zh ? "照片叠放展示过去的相遇，让自己的经历成为首页主角。" : "A photo stack brings past encounters to the foreground."},{top:61,text:zh ? "Identify 收成一个清晰入口，把更多空间留给回忆与探索。" : "One clear Identify action leaves more room for memories and exploration."}]
        ])}
        <h3>{zh ? "识别结果：少一点操作，多一点直观判断" : "Results: less work, more visual review"}</h3>
        {annotatedPlate(["before-results","results"],[
          [{top:26,text:zh ? "逐条卡片和展开操作，让每条结果都显得需要处理。" : "Repeated rows and expand controls make every match feel like a task."},{top:53,text:zh ? "已经确信的结果，不必再增加文字和反复确认的负担。" : "Confident matches need less reading and repeated checking."}],
          [{top:20,text:zh ? "Ready to save 以图片网格快速浏览，减少重复文字。" : "Ready-to-save matches use a visual grid with less repeated text."},{top:61,text:zh ? "需要判断时再展开线索，把注意力留给不确定的结果。" : "Reveal evidence when needed; focus attention on uncertain matches."}]
        ])}
        <p>{zh ? "V2 已有置信度分组；本轮调整的是呈现方式与复核负担，效果仍需用户测试。" : "V2 already grouped matches by confidence. This iteration changes presentation and review effort; usability still needs testing."}</p>
        <h3>{zh ? "收藏：先看到照片，再探索分类" : "Collection: see the photos before exploring categories"}</h3>
        {annotatedPlate(["before-collection","collection"],[
          [{top:36,text:zh ? "只有分类名称，需要逐个进入才能看到收藏。" : "Category names require opening each group to see the collection."},{top:65,text:zh ? "用户更想直接回看照片，而不是反复跳转。" : "People want to revisit photos directly, with less back-and-forth."}],
          [{top:38,text:zh ? "在当前页面展开分类，直接看到物种照片。" : "Expand a category in place to reveal species photos."},{top:68,text:zh ? "目标是让收藏尽可能在一页浏览；当前原型展示 Fish 分类展开。" : "Aim for one-page browsing; the current prototype shows Fish expanded."}]
        ])}</> },
        { id: "experience", title: zh ? "使用体验" : "Experience", content: <><p>{zh ? "选择照片 → 查看匹配 → 展开复核 → 确认保存。" : "Choose photos → review matches → inspect evidence → confirm and save."}</p>{show([4])}{plate(["home","photos","results","review"],zh ? ["首页","选择照片","结果","复核"] : ["Home","Photos","Results","Review"])}{plate(["collection","detail","map","timeline"],zh ? ["收藏","物种详情","地图","时间线"] : ["Collection","Species","Map","Timeline"])}</> },
        { id: "system", title: zh ? "系统与迭代" : "System & iteration", content: <><p>{zh ? "推荐卡、收藏分类与结果卡复用同一套视觉和交互规则。个性化推荐仍是设计概念。" : "Recommendation cards, collection categories, and results share visual and interaction rules. Personalized recommendations remain a concept."}</p>{plate(["recommendations"],zh ? ["推荐卡变体"] : ["Recommendation variants"])}{plate(["accordion","result-card"],zh ? ["分类展开","结果复核"] : ["Category expansion","Result review"])}<details><summary>{zh ? "查看原型细节动效" : "View the prototype motion study"}</summary><div>{show([1])}</div></details></> },
        { id: "reflection", title: zh ? "反思与下一步" : "Reflection", content: show([18]) },
      ]}
    />;
  }

  // Group existing content into chapters without changing its order or media.
  const chapterStarts: Record<string, number[]> = {
    "zq-sports": [0, 1, 3, 7, 10],
    "lifemart": [0, 1, 5, 9, 12, 15, 18],
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
