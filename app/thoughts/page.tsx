import TopNav from "@/components/TopNav";
import WritingList, { type WritingArticle } from "@/components/WritingList";
import writingData from "@/data/writing.json";
import worksLayout from "../works/WorksPage.module.css";
import styles from "./page.module.css";

export default function WritingPage() {
  const articles = (writingData.articles ?? []) as WritingArticle[];

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
