"use client";
import React, { useRef, useState } from "react";
import ProjectCard, { Project } from "./ProjectCard";
import styles from "./WorksGallery.module.css";

interface WorksGalleryProps {
  projects: Project[];
}

const CARD_WIDTH = 300; // px, 包含 margin

export default function WorksGallery({ projects }: WorksGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // 更新进度条
  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setProgress(100);
    } else {
      setProgress(Math.min(100, (el.scrollLeft / max) * 100));
    }
  };

  // 鼠标滚轮横向滚动
  const onWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
      setTimeout(updateProgress, 0);
    }
  };

  // 箭头按钮滚动
  const scrollBy = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -CARD_WIDTH : CARD_WIDTH,
        behavior: "smooth",
      });
      setTimeout(updateProgress, 300); // 等待平滑滚动后更新
    }
  };

  // 滚动时更新进度
  const onScroll = () => updateProgress();

  // 初始挂载时同步一次
  React.useEffect(() => {
    updateProgress();
  }, []);

  return (
    <div className={styles.galleryWrapper}>
      <button
        className={styles.arrow + " " + styles.left}
        onClick={() => scrollBy("left")}
        aria-label="Scroll left"
      >
        ←
      </button>
      <div
        className={styles.gallery}
        ref={scrollRef}
        onWheel={onWheel}
        onScroll={onScroll}
        tabIndex={0}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <button
        className={styles.arrow + " " + styles.right}
        onClick={() => scrollBy("right")}
        aria-label="Scroll right"
      >
        →
      </button>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}