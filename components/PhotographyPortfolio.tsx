"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import photos from "@/data/photography.json";
import styles from "./PhotographyPortfolio.module.css";

export default function PhotographyPortfolio({ chinese }: { chinese: boolean }) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const move = (step: number) => setActive(index => (index + step + photos.length) % photos.length);
  return <section aria-label={chinese ? "摄影作品" : "Photography portfolio"}>
    <div className={styles.grid}>{photos.map((photo, index) => <button key={photo.src} className={styles.print} type="button" onClick={() => { setActive(index); dialog.current?.showModal(); }} aria-label={`${chinese ? "放大照片" : "Enlarge photograph"} ${index + 1}`}>
      <Image {...photo} alt={`${chinese ? "Ziye An 摄影作品" : "Photograph by Ziye An"} ${index + 1}`} sizes="(max-width: 600px) 90vw, (max-width: 800px) 44vw, 300px" />
    </button>)}</div>
    <dialog ref={dialog} className={styles.dialog} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }} aria-label={chinese ? "摄影作品大图" : "Enlarged photograph"}>
      <div className={styles.viewer}>
        <div className={styles.toolbar}><span>{String(active + 1).padStart(2, "0")} / {photos.length}</span><button type="button" autoFocus onClick={() => dialog.current?.close()}>{chinese ? "关闭" : "Close"} ×</button></div>
        <Image {...photos[active]} alt={`${chinese ? "Ziye An 摄影作品" : "Photograph by Ziye An"} ${active + 1}`} sizes="95vw" />
        <div className={styles.controls}><button type="button" onClick={() => move(-1)} aria-label={chinese ? "上一张" : "Previous photograph"}>←</button><button type="button" onClick={() => move(1)} aria-label={chinese ? "下一张" : "Next photograph"}>→</button></div>
      </div>
    </dialog>
  </section>;
}
