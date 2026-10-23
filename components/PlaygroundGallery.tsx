"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FollowAlongCover from "./FollowAlongCover";
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
  category: string;
  featured?: boolean;
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

const categories = [
  "All",
  "UX Studies",
  "Creative Coding",
  "Physical Interaction",
  "Visual & Material Studies",
];

export default function WorksGallery({ projects }: WorksGalleryProps) {
  const { language } = useLanguage();
  const [activeTag, setActiveTag] = React.useState("All");

  const filteredProjects = React.useMemo(() => {
    const filtered = activeTag === "All"
      ? projects
      : projects.filter((project) => project.category === activeTag);
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
            {categories.map((tag) => (
              <option key={tag} value={tag}>
                {tag === "All" ? t("all", language) : language === "zh" ? (tagZh[tag] ?? tag) : tag}
              </option>
            ))}
          </select>
        </div>
        <nav className={styles.tagList} aria-label={t("projectFilters", language)}>
          {categories.map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={isActive}
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
              <Link
                href={buildProjectHref(project.id)}
                className={styles.projectCard}
                aria-label={`${t("viewProject", language)} ${project.title}`}
              >
                <div className={styles.projectImageWrapper}>
                  {project.id === "/works/xiaohongshu-follow-along.html" ? (
                    <FollowAlongCover />
                  ) : /\.gif$/i.test(imageSrc) ? (
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
              </Link>
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
