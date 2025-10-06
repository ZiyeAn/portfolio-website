"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";
import styles from "./ProjectDetail.module.css";
import rawProjects from "@/data/works.json";
import { BlurFade } from "@/components/ui/blur-fade";

type ProjectData = (typeof rawProjects.projects)[number];

type ProcessData = {
  inspiration?: string[];
  development?: string[];
  images?: string[];
};

type ProjectDetails = {
  description?: string;
  techStack?: string[];
  timeline?: string;
  demoLink?: string;
  video?: string[];
  images?: string[];
  process?: ProcessData;
};

const normalizeAsset = (src?: string) => {
  if (!src) return "";
  if (/^https?:/i.test(src)) return src;
  return `/${src.replace(/^(\.\.\/)+/, "").replace(/^\//, "")}`;
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
  const videos = (details.video ?? []).map(normalizeAsset).filter(Boolean);
  const imageSources = (details.images ?? [])
    .map(normalizeAsset)
    .filter(Boolean);

  const handleToggleProcess = () => setShowProcess((prev) => !prev);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to Home
        </Link>
        <nav className={styles.nav}>
          <Link href="/works">Works</Link>

        </nav>
      </header>

      <main className={styles.content}>
        <section className={styles.mediaColumn}>
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
                <img src={imageSrc} alt={`${project.title} image ${index + 1}`} />
              </div>
            </BlurFade>
          ))}
          {!videos.length && !imageSources.length ? (
            <div className={styles.emptyMedia}>Media coming soon.</div>
          ) : null}
        </section>

        <aside className={styles.infoColumn}>
          <div className={styles.infoHeader}>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            {timeline ? (
              <p className={styles.timeline}>Timeline · {timeline}</p>
            ) : null}
          </div>

          {descriptionHtml ? (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : null}

          {techStack.length ? (
            <div className={styles.techStack}>
              {techStack.map((tech) => (
                <span key={tech} className={styles.techItem}>
                  {tech}
                </span>
              ))}
            </div>
          ) : null}

          {project.tags?.length ? (
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}

          {details.demoLink && details.demoLink !== "#" ? (
            <a
              href={details.demoLink}
              className={styles.demoLink}
              target="_blank"
              rel="noreferrer"
            >
              Visit Site ↗
            </a>
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
        </aside>
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
    </div>
  );
}
