"use client";
import projects from "@/data/playground.json";
import WorksGallery from "@/components/PlaygroundGallery";
import TopNav from "@/components/TopNav";
import styles from "../works/WorksPage.module.css";

export default function PlaygroundPage() {
  return (
    <main className={styles.worksPageBg}>
      <TopNav dark />
      <div className={styles.pageContainer}>
        <WorksGallery projects={projects.projects} />
      </div>
    </main>
  );
}
