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
      <TopNav dark />
      <div className={worksLayout.pageContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Writing</h1>
          <p className={styles.intro}>
            Thoughts, essays, and fragments currently living on Notion. Tap a
            title to jump over and read the full piece.
          </p>
        </header>
        <WritingList articles={articles} />
      </div>
    </main>
  );
}
