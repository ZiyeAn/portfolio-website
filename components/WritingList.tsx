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
      {articles.map((article) => {
        const tagLine = formatTags(article.tags);
        return (
          <article key={article.title} className={styles.row}>
            <div className={styles.titleColumn}>
              <a
                href={article.href}
                target="_blank"
                rel="noreferrer"
                className={styles.titleLink}
              >
                {article.title}
              </a>
              {article.time ? (
                <time className={styles.meta}>{article.time}</time>
              ) : null}
            </div>
            <div className={styles.excerptColumn}>
              {article.excerpt ? (
                <p className={styles.excerpt}>{article.excerpt}</p>
              ) : null}
            </div>
            <div className={styles.metaColumn}>
              {article.category ? (
                <div className={styles.category}>
                  <span className={styles.metaLabel}>Category</span>
                  <span>{article.category}</span>
                </div>
              ) : null}
              {tagLine ? (
                <div className={styles.tags}>
                  <span className={styles.metaLabel}>
                    {article.category ? "Tags" : "Category"}
                  </span>
                  <span>{tagLine}</span>
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
