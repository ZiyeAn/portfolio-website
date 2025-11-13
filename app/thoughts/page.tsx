import Image from "next/image";

import TopNav from "@/components/TopNav";
import WritingList, { type WritingArticle } from "@/components/WritingList";
import writingData from "@/data/writing.json";
import worksLayout from "../works/WorksPage.module.css";
import styles from "./page.module.css";

export default function WritingPage() {
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

  return (
    <main className={worksLayout.worksPageBg}>
      <TopNav />
      <header className={styles.header}>
        <Image
          src="/assets/thoughts/thoughts_header.png"
          alt="Ziye An thoughts header artwork"
          width={2732}
          height={588}
          priority
          className={styles.headerImage}
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </header>
      <div className={worksLayout.pageContainer}>
        <WritingList articles={articles} />
      </div>
    </main>
  );
}
