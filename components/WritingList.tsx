"use client";

import styles from "./WritingList.module.css";
import { useLanguage } from "@/components/LanguageProvider";
import LinkArrow from "./LinkArrow";

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

const articleTitleZh: Record<string, string> = {
  "The Princess, the Pea, and the Silent Girl in the Bed": "公主、豌豆与床上沉默的女孩",
  "Evaluating the Potential of AI-enhanced Gesture in Recreational Diving": "评估 AI 增强手势在休闲潜水中的潜力",
  "Thoughts on Reading The Clash of Civilizations and the Remaking of World Order": "读《文明的冲突与世界秩序的重建》随想",
  "LifeMart™ Design Brief": "LifeMart™ 设计简报",
  "My 23 kilograms Home": "我 23 公斤重的家",
  "Why We Keep Building Ourselves: The Obsession with Humanoid Robots": "为什么我们不断复制自己：对人形机器人的执迷"
};

const categories = [
  { key: "Essay", en: "Essays", zh: "学术写作" },
  { key: "Design Writing", en: "Design Writing", zh: "设计文稿" },
  { key: "Reading Reflection", en: "Reading Reflections", zh: "阅读随想" },
  { key: "Free Writing", en: "Free Writing", zh: "自由写作" },
];

export default function WritingList({ articles }: WritingListProps) {
  const { language } = useLanguage();
  const zh = language === "zh";
  const groups = categories.map(category => ({
    ...category,
    entries: articles.filter(article => (article.category ?? article.tags?.[0]) === category.key),
  })).filter(group => group.entries.length);
  const uncategorized = articles.filter(article => !categories.some(category => category.key === (article.category ?? article.tags?.[0])));
  if (uncategorized.length) groups.push({ key: "Other", en: "Other Writing", zh: "其他写作", entries: uncategorized });

  return (
    <section className={styles.index} aria-labelledby="writing-index-title">
      <header className={styles.intro}>
        <h1 id="writing-index-title">{zh ? "写作目录" : "Writing index"}</h1>
        <p>{zh ? "学术写作、设计文稿，以及阅读与生活中的思考。" : "Essays, design writing, and reflections on reading and everyday life."}</p>
      </header>
      <div className={styles.columnHead} aria-hidden="true">
        <span>{zh ? "分类" : "Category"}</span><span>{zh ? "篇目" : "Title"}</span><span>{zh ? "年份" : "Year"}</span>
      </div>
      {groups.map((group, index) => (
        <section className={styles.group} key={group.key} aria-labelledby={`writing-group-${index}`}>
          <header className={styles.category}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <h2 id={`writing-group-${index}`}>{zh ? group.zh : group.en}</h2>
          </header>
          <ul className={styles.entries}>
            {group.entries.map(article => (
              <li key={article.href}>
                <a className={styles.entry} href={article.href} target="_blank" rel="noreferrer">
                  <span className={styles.title}>{zh ? articleTitleZh[article.title] ?? article.title : article.title}</span>
                  <span className={styles.leader} aria-hidden="true" />
                  <time className={styles.year}>{article.time ?? "—"}</time>
                  <span className={styles.arrow}><LinkArrow /></span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div className={styles.endnote}><span>{zh ? `共 ${articles.length} 篇` : `${articles.length} texts`}</span><span>{zh ? "点击标题阅读全文 ↗︎" : "Select a title to read ↗︎"}</span></div>
    </section>
  );
}
