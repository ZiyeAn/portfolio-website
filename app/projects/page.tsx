"use client";

import TopNav from "@/components/TopNav";
import ProjectsGallery from "@/components/ProjectsGallery";
import projects from "@/data/projects.json";
import styles from "../works/WorksPage.module.css";

export default function ProjectsPage() {
  return (
    <main className={styles.worksPageBg}>
      <TopNav dark />
      <div className={styles.pageContainer}>
        <ProjectsGallery projects={projects} />
      </div>
    </main>
  );
}
