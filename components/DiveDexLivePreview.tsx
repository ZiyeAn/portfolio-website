"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DiveDexMotion.module.css";

const width = 390;
const height = 828;

export default function DiveDexLivePreview({ title }: { title: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <div className={styles.liveStage}><div ref={container} className={styles.liveViewport}>
    <iframe title={title} src="https://www.divedex.xyz/" loading="lazy"
      style={{width,height,transform:`scale(${scale})`}} />
  </div></div>;
}
