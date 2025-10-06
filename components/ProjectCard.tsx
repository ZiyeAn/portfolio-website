import React from "react";
import Image from "next/image";
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
      <div className={styles.thumbnailWrapper}>
        <Image
          fill
          src={project.thumbnail.replace(/^assets/, "/assets")}
          alt={project.title}
          className={styles.thumbnailImage}
          sizes="(max-width: 600px) 80vw, 280px"
          priority={false}
        />
      </div>
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
