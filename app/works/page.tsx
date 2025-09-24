"use client";
import { useEffect } from "react";
import projects from "@/data/works.json";
import WorksGallery from "@/components/WorksGallery";
import TopNav from "@/components/TopNav";
import styles from "./WorksPage.module.css";

export default function WorksPage() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <main className={styles.worksPageBg}>
      <TopNav dark />
      <div style={{ width: "min(92%, 1200px)", margin: "2rem auto" }}>
        <h1>Works</h1>
        <WorksGallery projects={projects.projects} />
      </div>
    </main>
  );
}