"use client";

import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import styles from "./ProjectsGallery.module.css";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeProject, t } from "@/lib/i18n";

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail: string;
  intro?: string;
  year?: number | string;
  tags?: string[];
}

interface ProjectsGalleryProps {
  projects: Project[];
}

const normalizeImage = (src?: string) => {
  if (!src) return "/placeholder.png";
  if (src.startsWith("http")) return src;
  return `/${src.replace(/^(\.\.\/)+/, "").replace(/^\//, "")}`;
};

const buildProjectHref = (id: string) => {
  const cleaned = id.replace(/^\/projects\//, "").replace(/^\/works\//, "").replace(/\.html$/i, "");
  return `/projects/${cleaned}`;
};

const formatYearLabel = (year?: number | string) => {
  if (year === undefined || year === null) return "";
  const yearString = String(year).trim();
  return yearString;
};

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const { language } = useLanguage();
  return (
    <div className={styles.gallery}>
      {projects.map((rawProject, index) => {
        const project = localizeProject(rawProject, language);
        const imageSrc = normalizeImage(project.thumbnail);
        const href = buildProjectHref(project.id);
        const yearLabel = formatYearLabel(project.year);
        const indexLabel = String(index + 1).padStart(2, "0");

        return (
          <BlurFade key={project.id} delay={0.18 + index * 0.08} inView>
            <article className={styles.projectRow}>
              <div className={styles.yearColumn}>
                {yearLabel ? (
                  <span className={styles.yearLabel}>{t("year", language)} {yearLabel}</span>
                ) : (
                  <span className={`${styles.yearLabel} ${styles.yearFallback}`}>
                    {t("upcoming", language)}
                  </span>
                )}
                <span className={styles.projectIndex}>{indexLabel}</span>
              </div>
              <div className={styles.infoColumn}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <Link href={href} className={styles.projectLink}>
                  {t("viewProject", language)}
                </Link>
              </div>
              <Link
                href={href}
                className={styles.mediaColumn}
                aria-label={`View details for ${project.title}`}
              >
                <Image
                  src={imageSrc}
                  alt={project.title}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1080px) 90vw, 38vw"
                  priority={index < 2}
                />
              </Link>
            </article>
          </BlurFade>
        );
      })}
    </div>
  );
}
