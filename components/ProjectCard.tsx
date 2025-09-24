import React from "react";
import styles from "./ProjectCard.module.css";

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  intro: string;
  tags: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.card}>
      <img
        className={styles.thumbnail}
        src={project.thumbnail.replace(/^assets/, "/assets")}
        alt={project.title}
      />
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.intro}>{project.intro}</p>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}