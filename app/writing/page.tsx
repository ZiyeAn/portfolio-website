"use client";

import TopNav from "@/components/TopNav";
import WritingList, { type WritingArticle } from "@/components/WritingList";
import writingData from "@/data/writing.json";
import SiteFooter from "@/components/SiteFooter";
import worksLayout from "../works/WorksPage.module.css";
import styles from "./page.module.css";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";

export default function WritingPage() {
  const { language } = useLanguage();
  const articles = (writingData.articles ?? []) as WritingArticle[];

  return (
    <main className={worksLayout.worksPageBg}>
      <TopNav />
      <div className={worksLayout.pageContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t("writing", language)}</h1>
          <p className={styles.intro}>
            {language === "zh"
              ? "目前存放在 Notion 中的随想、文章与片段。点击标题即可前往阅读完整内容。"
              : "Thoughts, essays, and fragments currently living on Notion. Tap a title to jump over and read the full piece."}
          </p>
        </header>
        <WritingList articles={articles} />
      </div>
    </main>
  );
}
