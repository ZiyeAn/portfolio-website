"use client";
import { ArrowLeft } from "lucide-react";
import LinkArrow from "@/components/LinkArrow";
import React from "react";
import Image from "next/image";
import styles from "./ProjectDetail.module.css";
import rawProjects from "@/data/playground.json";
import { BlurFade } from "@/components/ui/blur-fade";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeProject, t } from "@/lib/i18n";

type ProjectData = (typeof rawProjects.projects)[number];

type ProcessData = {
  inspiration?: string[];
  development?: string[];
  images?: string[];
};

type RelatedLink = {
  label?: string;
  url?: string;
};

type ProjectDetails = {
  description?: string;
  techStack?: string[];
  timeline?: string;
  relatedLinks?: RelatedLink[];
  video?: string[];
  video_ID?: string[];
  images?: string[];
  frame?: string;
  frameAfterImages?: boolean;
  process?: ProcessData;
  studySections?: { title: string; titleZh: string; body: string; bodyZh: string; image?: string }[];
};

const normalizeAsset = (src?: string) => {
  if (!src) return "";
  if (/^https?:/i.test(src)) return src;
  return `/${src.replace(/^(\.\.\/)+/, "").replace(/^\//, "")}`;
};

const toWebVideo = (src: string) => src.replace(/\.gif$/i, ".webm");

const extractDriveId = (value: string) => {
  const trimmed = value.trim();
  const directMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (directMatch?.[1]) {
    return directMatch[1];
  }

  try {
    const url = new URL(trimmed);
    const id = url.searchParams.get("id");
    if (id) return id;
  } catch {
    // not a URL
  }

  return "";
};

interface ProjectDetailProps {
  project: ProjectData;
}

export default function ProjectDetail({ project: rawProject }: ProjectDetailProps) {
  const { language } = useLanguage();
  const project = localizeProject(rawProject, language);
  const [showProcess, setShowProcess] = React.useState(false);

  const details: ProjectDetails = project.details ?? {};
  const imagesOnly = rawProject.id === "/works/xiaohongshu-follow-along.html";
  const descriptionHtml = details.description ?? project.intro ?? "";
  const timeline = details.timeline ?? "";
  const techStack = details.techStack ?? [];
  const process = details.process;
  const rawVideoSources = (details.video ?? []).map((src) => src?.trim()).filter(Boolean);
  const driveVideosFromIds = (details.video_ID ?? [])
    .map((id) => id.trim())
    .filter(Boolean)
    .map((id) => `https://drive.google.com/file/d/${id}/preview`);
  const driveVideosFromLinks = rawVideoSources
    .map(extractDriveId)
    .filter(Boolean)
    .map((id) => `https://drive.google.com/file/d/${id}/preview`);
  const driveVideos = [
    ...driveVideosFromLinks,
    ...driveVideosFromIds.filter(
      (driveSrc) => !driveVideosFromLinks.includes(driveSrc)
    ),
  ];
  const videos = rawVideoSources
    .filter((src) => !src.includes("drive.google.com"))
    .map(normalizeAsset)
    .filter(Boolean);
  const frameSrc = normalizeAsset(details.frame);
  const imageSources = (details.images ?? [])
    .map(normalizeAsset)
    .filter(Boolean);
  const relatedLinks =
    (details.relatedLinks ?? []).filter(
      (link): link is { label?: string; url: string } =>
        !!link?.url && typeof link.url === "string" && link.url.trim() !== "#"
    );
  const normalizedRelatedLinks = relatedLinks.map((link) => ({
    url: link.url.trim(),
    label:
      typeof link.label === "string" && link.label.trim()
        ? (language === "zh" && link.label.trim() === "Try clickable prototype" ? "体验交互原型" : language === "zh" && link.label.trim() === "Open interactive map" ? "打开交互地图" : link.label.trim())
        : t("openLink", language),
  }));
  const hasMeta =
    techStack.length ||
    (project.tags?.length ?? 0) > 0 ||
    normalizedRelatedLinks.length;

  const handleToggleProcess = () => setShowProcess((prev) => !prev);

  return (
    <div className={styles.page}>
      <TopNav />
      <div className={styles.mobileToolbar}><Link href="/playground" className={styles.projectCategory}><ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" /> {language === "zh" ? "探索列表" : "Explorations"}</Link></div>
      <main className={styles.content}>
        <aside className={styles.infoColumn}>
          <div className={styles.infoBlock}>
            <Link href="/playground" className={styles.projectCategory}>
              <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" /> {language === "zh" ? "探索列表" : "Explorations"}
            </Link>
            <div className={styles.infoFrame}>
            <p className={styles.fileLabel}>{language === "zh" ? "探索档案" : "Exploration file"}</p>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            {timeline ? <p className={styles.timeline}>{timeline}</p> : null}



            {hasMeta ? (
              <dl className={styles.metaList}>
                {techStack.length ? (
                  <div className={styles.metaRow}>
                    <dt>{t("tools", language)}</dt>
                    <dd>{techStack.join(", ")}</dd>
                  </div>
                ) : null}
                {project.tags?.length ? (
                  <div className={styles.metaRow}>
                    <dt>{t("tags", language)}</dt>
                    <dd>{project.tags.join(", ")}</dd>
                  </div>
                ) : null}
                {normalizedRelatedLinks.length ? (
                  <div className={styles.metaRow}>
                    <dt>{t("related", language)}</dt>
                    <dd className={styles.metaLinks}>
                      {normalizedRelatedLinks.map((link, index) => (
                        <a
                          key={`related-${index}`}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label} <LinkArrow />
                        </a>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            {descriptionHtml ? (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            ) : null}

            </div>

            {process ? (
              <button
                type="button"
                className={`${styles.processToggle} ${
                  showProcess ? styles.processToggleActive : ""
                }`}
                onClick={handleToggleProcess}
              >
                {showProcess ? t("backToImages", language) : t("viewProcess", language)}
              </button>
            ) : null}
          </div>
        </aside>

        <section className={styles.mediaColumn}>
          {frameSrc && !details.frameAfterImages ? (
            <div className={styles.videoFrame}>
              <iframe
                className={styles.driveEmbed}
                src={frameSrc}
                title={`${project.title} interactive frame`}
                allow="autoplay; fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
              />
            </div>
          ) : null}
          {driveVideos.map((driveSrc, index) => (
            <div key={`drive-video-${index}`} className={styles.videoFrame}>
              <iframe
                className={styles.driveEmbed}
                src={driveSrc}
                title={`${project.title} video ${index + 1}`}
                allow="autoplay; fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
              />
            </div>
          ))}
          {videos.map((videoSrc, index) => (
            <div key={`video-${index}`} className={styles.videoFrame}>
              <video
                src={videoSrc}
                controls
                playsInline
                preload="metadata"
                muted
              />
            </div>
          ))}
          {imageSources.map((imageSrc, index) => (
            <BlurFade
              key={`image-${index}`}
              delay={0.2 + index * 0.08}
              inView
            >
              <div className={styles.imageFrame}>
                {/\.gif$/i.test(imageSrc) ? (
                  <video
                    src={toWebVideo(imageSrc)}
                    aria-label={`${project.title} animation ${index + 1}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload={index < 2 ? "auto" : "metadata"}
                  />
                ) : (
                  <Image
                    src={imageSrc}
                    alt={`${project.title} image ${index + 1}`}
                    width={1600}
                    height={1200}
                    sizes="(max-width: 900px) 100vw, 72vw"
                    priority={index < 2}
                  />
                )}
              </div>
            </BlurFade>
          ))}
          {frameSrc && details.frameAfterImages ? (
            <div className={`${styles.videoFrame} ${styles.mapFrame}`}>
              <iframe
                className={styles.driveEmbed}
                src={frameSrc}
                title={`${project.title} interactive map`}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
              />
            </div>
          ) : null}
          {details.studySections?.filter(section => !imagesOnly || section.image).map((section, index) => (
            <section key={section.title} className={imagesOnly ? undefined : styles.studySection}>
              {!imagesOnly && <>
              <p className={styles.studyNumber}>{String(index + 1).padStart(2, "0")}</p>
              <h2>{language === "zh" ? section.titleZh : section.title}</h2>
              <p>{language === "zh" ? section.bodyZh : section.body}</p>
              </>}
              {section.image ? (
                <a href={normalizeAsset(section.image)} target="_blank" rel="noreferrer" className={styles.studyImageLink}>
                  <Image
                    src={normalizeAsset(section.image)}
                    alt={language === "zh" ? section.titleZh : section.title}
                    width={2300}
                    height={1295}
                    sizes="(max-width: 900px) 100vw, 72vw"
                  />
                  {!imagesOnly && <span>{language === "zh" ? "打开完整设计图" : "Open full design board"} <LinkArrow /></span>}
                </a>
              ) : null}
            </section>
          ))}
          {!frameSrc &&
          !driveVideos.length &&
          !videos.length &&
          !imageSources.length ? (
            <div className={styles.emptyMedia}>{t("mediaComingSoon", language)}</div>
          ) : null}
        </section>
      </main>

      {process ? (
        <div
          className={`${styles.processDrawer} ${
            showProcess ? styles.processDrawerActive : ""
          }`}
        >
          <div className={styles.processInner}>
            <h2>{t("processDevelopment", language)}</h2>
            <div className={styles.processSections}>
              {process.inspiration?.length ? (
                <section>
                  <h3>{t("inspirations", language)}</h3>
                  <ul>
                    {process.inspiration.map((item, index) => (
                      <li key={`insp-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {process.development?.length ? (
                <section>
                  <h3>{t("development", language)}</h3>
                  <ul>
                    {process.development.map((item, index) => (
                      <li key={`dev-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {process.images?.length ? (
                <section>
                  <h3>{t("testingRefinement", language)}</h3>
                  <ul>
                    {process.images.map((item, index) => (
                      <li key={`testing-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <SiteFooter />
    </div>
  );
}
