"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import styles from "./ProjectsGallery.module.css";

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
  const cleaned = id.replace(/^\/works\//, "").replace(/\.html$/i, "");
  return `/works/${cleaned}`;
};

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const projectOptions = React.useMemo(
    () => projects.map((project) => project.id),
    [projects],
  );

  const [activeProjectId, setActiveProjectId] = React.useState<string>(
    projectOptions[0] ?? "",
  );

  React.useEffect(() => {
    if (!projectOptions.length) {
      setActiveProjectId("");
      return;
    }

    if (!projectOptions.includes(activeProjectId)) {
      setActiveProjectId(projectOptions[0]);
    }
  }, [activeProjectId, projectOptions]);

  const filteredProjects = React.useMemo(() => {
    if (!activeProjectId) return projects;
    return [projects.find((project) => project.id === activeProjectId)].filter(
      (project): project is Project => Boolean(project),
    );
  }, [activeProjectId, projects]);

  return (
    <div className={styles.galleryLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h3>Projects</h3>
        </div>
        <div className={styles.mobileSelect}>
          <select
            aria-label="Select a project"
            value={activeProjectId}
            onChange={(event) => setActiveProjectId(event.target.value)}
            className={styles.select}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        <nav className={styles.projectNav} aria-label="Project navigation">
          {projects.map((project) => {
            const isActive = activeProjectId === project.id;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                className={`${styles.projectButton} ${isActive ? styles.projectButtonActive : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                {project.title}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className={styles.cardsColumn}>
        {filteredProjects.map((project, index) => {
          const imageSrc = normalizeImage(project.thumbnail);
          const href = buildProjectHref(project.id);
          return (
            <BlurFade key={project.id} delay={0.2 + index * 0.08} inView>
              <a
                href={href}
                className={styles.projectCard}
                aria-label={`View details for ${project.title}`}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={imageSrc}
                    alt={project.title}
                    className={styles.projectImage}
                  />
                  <div className={styles.cardOverlay}>
                    <h4 className={styles.cardTitle}>{project.title}</h4>
                    <div className={styles.cardMeta}>
                      {project.subtitle ? <span>{project.subtitle}</span> : null}
                      {project.year ? <span>{project.year}</span> : null}
                      {project.tags?.length ? <span>{project.tags.join(" • ")}</span> : null}
                    </div>
                    {project.intro ? <p className={styles.cardIntro}>{project.intro}</p> : null}
                  </div>
                </div>
              </a>
            </BlurFade>
          );
        })}
        {!filteredProjects.length ? (
          <div className={styles.emptyState}>
            <p>No projects to show yet. Please check back soon.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
