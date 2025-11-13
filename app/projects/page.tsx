"use client";

import Image from "next/image";

import TopNav from "@/components/TopNav";
import ProjectsGallery from "@/components/ProjectsGallery";
import projects from "@/data/projects.json";
import styles from "./ProjectsPage.module.css";

export default function ProjectsPage() {
  const numericYears = projects
    .map((project) => {
      if (typeof project.year === "number") return project.year;
      const parsed = Number.parseInt(String(project.year ?? ""), 10);
      return Number.isFinite(parsed) ? parsed : undefined;
    })
    .filter((value): value is number => value !== undefined);

  const minYear = numericYears.length ? Math.min(...numericYears) : undefined;
  const maxYear = numericYears.length ? Math.max(...numericYears) : undefined;

  const heroHeading =
    minYear && maxYear
      ? minYear === maxYear
        ? `WORK ${minYear}`
        : `WORK ${minYear}-${maxYear}`
      : "WORK";

  return (
    <main className={styles.page}>
      <TopNav />
      <header className={styles.heroImageWrapper}>
        <h1 className={styles.srOnly}>{heroHeading}</h1>
        <Image
          src="/assets/projects/projects_header.png"
          alt="Projects hero"
          width={3415}
          height={820}
          priority
          className={styles.heroImage}
        />
      </header>
      <div className={styles.pageInner}>
        <ProjectsGallery projects={projects} />
      </div>
    </main>
  );
}
