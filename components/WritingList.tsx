import styles from "./WritingList.module.css";

export type WritingArticle = {
  title: string;
  href: string;
  excerpt?: string;
  time?: string;
  category?: string;
  tags?: string[];
};

interface WritingListProps {
  articles: WritingArticle[];
}

const formatTags = (tags?: string[]) => {
  if (!tags?.length) return "";
  return tags.join(", ");
};

export default function WritingList({ articles }: WritingListProps) {
  return (
    <div className={styles.list}>
      <div className={styles.headerRow}>
        <span>Tags</span>
        <span>Project</span>
        <span>Date</span>
      </div>
      {articles.map((article) => {
        const tagLine = formatTags(article.tags) || "—";
        return (
          <article key={article.title} className={styles.row}>
            <span className={styles.tagsCell}>{tagLine}</span>
            <a
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className={styles.titleLink}
            >
              {article.title}
            </a>
            <time className={styles.timeCell}>
              {article.time ? article.time : "—"}
            </time>
          </article>
        );
      })}
    </div>
  );
}
