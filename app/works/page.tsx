"use client";
import projects from "@/data/playground.json";
import WorksGallery from "@/components/PlaygroundGallery";
import TopNav from "@/components/TopNav";
import styles from "./WorksPage.module.css";

export default function WorksPage() {
  return (
    <main className={styles.worksPageBg}>
      <TopNav />
      <div className={styles.pageContainer}>
        <WorksGallery projects={projects.projects} />
      </div>
    </main>
  );
}
