"use client";
import projects from "@/data/works.json";
import WorksGallery from "@/components/WorksGallery";
import TopNav from "@/components/TopNav";
import styles from "./WorksPage.module.css";

export default function WorksPage() {
  return (
    <main className={styles.worksPageBg}>
      <TopNav dark />
      <div className={styles.pageContainer}>
        <WorksGallery projects={projects.projects} />
      </div>
    </main>
  );
}
