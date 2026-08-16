"use client";

import React from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import styles from "./PlaygroundGallery.module.css";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeProject, t, tagZh } from "@/lib/i18n";

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  intro?: string;
  tags?: string[];
}

interface WorksGalleryProps {
  projects: Project[];
}

const normalizeImage = (src?: string) => {
  if (!src) return "/placeholder.png";
  if (src.startsWith("http")) return src;
  return `/${src.replace(/^(\.\.\/)+/, "").replace(/^\//, "")}`;
};

const toWebVideo = (src: string) => src.replace(/\.gif$/i, ".webm");

const buildProjectHref = (id: string) => {
  const cleaned = id.replace(/^\/works\//, "").replace(/\.html$/i, "");
  return `/works/${cleaned}`;
};

const buildTagList = (projects: Project[]) => {
  const tagSet = new Set<string>();
  projects.forEach((project) => {
    project.tags?.forEach((tag) => {
      if (tag?.trim()) {
        tagSet.add(tag.trim());
      }
    });
  });
  return ["All", ...Array.from(tagSet).sort((a, b) => a.localeCompare(b))];
};

export default function WorksGallery({ projects }: WorksGalleryProps) {
  const { language } = useLanguage();
  const tags = React.useMemo(() => buildTagList(projects), [projects]);
  const [activeTag, setActiveTag] = React.useState<string>(tags[0] ?? "All");

  React.useEffect(() => {
    if (!tags.includes(activeTag)) {
      setActiveTag(tags[0] ?? "All");
    }
  }, [tags, activeTag]);

  const filteredProjects = React.useMemo(() => {
    const filtered = activeTag === "All"
      ? projects
      : projects.filter((project) => project.tags?.includes(activeTag));
    return filtered.map((project) => localizeProject(project, language));
  }, [projects, activeTag, language]);

  return (
    <div className={styles.galleryLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>{t("filters", language)}</h3>
        </div>
        <div className={styles.mobileSelect}>
          <select
            aria-label={t("selectFilter", language)}
            value={activeTag}
            onChange={(event) => setActiveTag(event.target.value)}
            className={styles.select}
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag === "All" ? t("all", language) : language === "zh" ? (tagZh[tag] ?? tag) : tag}
              </option>
            ))}
          </select>
        </div>
        <nav className={styles.tagList} aria-label={t("projectFilters", language)}>
          {tags.map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`${styles.tagButton} ${isActive ? styles.tagButtonActive : ""}`}
              >
                {tag === "All" ? t("all", language) : language === "zh" ? (tagZh[tag] ?? tag) : tag}
              </button>
            );
          })}
        </nav>
        <div className={styles.sidebarFooter}>
          <span>{filteredProjects.length} {t("works", language)}</span>
        </div>
      </aside>

      <div className={styles.grid}>
        {filteredProjects.map((project, index) => {
          const imageSrc = normalizeImage(project.thumbnail);
          return (
            <BlurFade
              key={project.id}
              delay={0.2 + index * 0.05}
              inView
            >
              <a
                href={buildProjectHref(project.id)}
                className={styles.projectCard}
                aria-label={`View details for ${project.title}`}
              >
                <div className={styles.projectImageWrapper}>
                  {/\.gif$/i.test(imageSrc) ? (
                    <video
                      src={toWebVideo(imageSrc)}
                      aria-label={project.title}
                      className={styles.projectImage}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload={index < 8 ? "auto" : "metadata"}
                    />
                  ) : (
                    <Image
                      src={imageSrc}
                      alt={project.title}
                      fill
                      className={styles.projectImage}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 8}
                    />
                  )}
                  <div className={styles.projectOverlay}>
                    <span>{project.title}</span>
                  </div>
                </div>
              </a>
            </BlurFade>
          );
        })}
        {!filteredProjects.length ? (
          <div className={styles.emptyState}>
            <p>{t("noMatchingWorks", language)}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
