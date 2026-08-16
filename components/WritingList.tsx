"use client";

import styles from "./WritingList.module.css";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

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

const articleTitleZh: Record<string, string> = {
  "The Princess, the Pea, and the Silent Girl in the Bed": "公主、豌豆与床上沉默的女孩",
  "Evaluating the Potential of AI-enhanced Gesture in Recreational Diving": "评估 AI 增强手势在休闲潜水中的潜力",
  "Thoughts on Reading The Clash of Civilizations and the Remaking of World Order": "读《文明的冲突与世界秩序的重建》随想",
  "LifeMart™ Design Brief": "LifeMart™ 设计简报",
  "My 23 kilograms Home": "我 23 公斤重的家",
  "Why We Keep Building Ourselves: The Obsession with Humanoid Robots": "为什么我们不断复制自己：对人形机器人的执迷",
  "Recent Thought on Funeral": "近期关于葬礼的思考",
};

const writingTagZh: Record<string, string> = {
  Essay: "文章",
  "Reading Reflection": "阅读随想",
  "Free Writing": "自由写作",
};

export default function WritingList({ articles }: WritingListProps) {
  const { language } = useLanguage();
  return (
    <div className={styles.list}>
      <div className={styles.headerRow}>
        <span>{t("tags", language)}</span>
        <span>{t("project", language)}</span>
        <span>{t("date", language)}</span>
      </div>
      {articles.map((article) => {
        const tagLine = formatTags(
          language === "zh" ? article.tags?.map((tag) => writingTagZh[tag] ?? tag) : article.tags
        ) || "—";
        return (
          <article key={article.title} className={styles.row}>
            <span className={styles.tagsCell}>{tagLine}</span>
            <a
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className={styles.titleLink}
            >
              {language === "zh" ? (articleTitleZh[article.title] ?? article.title) : article.title}
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
