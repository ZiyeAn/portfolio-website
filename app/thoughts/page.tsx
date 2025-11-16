"use client";

import { useEffect, useRef } from "react";

import TopNav from "@/components/TopNav";
import WritingList, { type WritingArticle } from "@/components/WritingList";
import writingData from "@/data/writing.json";
import worksLayout from "../works/WorksPage.module.css";
import styles from "./page.module.css";

export default function WritingPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const articles = [
    ...((writingData.articles ?? []) as WritingArticle[]),
  ].sort((a, b) => {
    const timeA = Number.parseInt(a.time ?? "", 10);
    const timeB = Number.parseInt(b.time ?? "", 10);
    if (Number.isNaN(timeA) && Number.isNaN(timeB)) return 0;
    if (Number.isNaN(timeA)) return 1;
    if (Number.isNaN(timeB)) return -1;
    return timeB - timeA;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 2;
  }, []);

  return (
    <main className={worksLayout.worksPageBg}>
      <TopNav />
      <header className={styles.header}>
        <video
          className={styles.headerVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-label="Ziye An thoughts header animation"
          poster="/assets/thoughts/thoughts_header.png"
          ref={videoRef}
        >
          <source
            src="/assets/thoughts/thoughts_header.webm"
            type="video/webm"
          />
          Ziye An thoughts header animation
        </video>
      </header>
      <div className={worksLayout.pageContainer}>
        <WritingList articles={articles} />
      </div>
    </main>
  );
}
