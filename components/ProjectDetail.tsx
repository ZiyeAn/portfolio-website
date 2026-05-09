"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import styles from "./ProjectDetail.module.css";
import rawProjects from "@/data/playground.json";
import { BlurFade } from "@/components/ui/blur-fade";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";

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
  process?: ProcessData;
};

const normalizeAsset = (src?: string) => {
  if (!src) return "";
  if (/^https?:/i.test(src)) return src;
  return `/${src.replace(/^(\.\.\/)+/, "").replace(/^\//, "")}`;
};

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

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [showProcess, setShowProcess] = React.useState(false);

  const details: ProjectDetails = project.details ?? {};
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
        ? link.label.trim()
        : "Open Link",
  }));
  const tagLine = project.tags?.join(" · ");
  const hasMeta =
    techStack.length ||
    (project.tags?.length ?? 0) > 0 ||
    normalizedRelatedLinks.length;

  const handleToggleProcess = () => setShowProcess((prev) => !prev);

  return (
    <div className={styles.page}>
      <TopNav />
      <main className={styles.content}>
        <aside className={styles.infoColumn}>
          <div className={styles.infoBlock}>
            <Link href="/playground" className={styles.projectCategory}>
              ← Back to Playground
            </Link>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            {timeline ? <p className={styles.timeline}>{timeline}</p> : null}

            {descriptionHtml ? (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            ) : null}

            {hasMeta ? (
              <dl className={styles.metaList}>
                {techStack.length ? (
                  <div className={styles.metaRow}>
                    <dt>Tools</dt>
                    <dd>{techStack.join(", ")}</dd>
                  </div>
                ) : null}
                {project.tags?.length ? (
                  <div className={styles.metaRow}>
                    <dt>Tags</dt>
                    <dd>{project.tags.join(", ")}</dd>
                  </div>
                ) : null}
                {normalizedRelatedLinks.length ? (
                  <div className={styles.metaRow}>
                    <dt>Related</dt>
                    <dd className={styles.metaLinks}>
                      {normalizedRelatedLinks.map((link, index) => (
                        <a
                          key={`related-${index}`}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            {process ? (
              <button
                type="button"
                className={`${styles.processToggle} ${
                  showProcess ? styles.processToggleActive : ""
                }`}
                onClick={handleToggleProcess}
              >
                {showProcess ? "Back to Images" : "View Process"}
              </button>
            ) : null}
          </div>
        </aside>

        <section className={styles.mediaColumn}>
          {frameSrc ? (
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
                <img
                  src={imageSrc}
                  alt={`${project.title} image ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            </BlurFade>
          ))}
          {!frameSrc &&
          !driveVideos.length &&
          !videos.length &&
          !imageSources.length ? (
            <div className={styles.emptyMedia}>Media coming soon.</div>
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
            <h2>Process &amp; Development</h2>
            <div className={styles.processSections}>
              {process.inspiration?.length ? (
                <section>
                  <h3>Inspirations</h3>
                  <ul>
                    {process.inspiration.map((item, index) => (
                      <li key={`insp-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {process.development?.length ? (
                <section>
                  <h3>Development</h3>
                  <ul>
                    {process.development.map((item, index) => (
                      <li key={`dev-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {process.images?.length ? (
                <section>
                  <h3>Testing &amp; Refinement</h3>
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
