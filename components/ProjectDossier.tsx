"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import TopNav from "./TopNav";
import SiteFooter from "./SiteFooter";
import styles from "./ProjectDossier.module.css";

type Chapter = { id: string; title: string; content: ReactNode };
type Props = { title: string; subtitle?: string; timeline?: string; role?: string; tools: string[]; tags: string[]; links: { label: string; url: string }[]; hero: ReactNode; chapters: Chapter[]; chinese: boolean };

export default function ProjectDossier({ title, subtitle, timeline, role, tools, tags, links, hero, chapters, chinese }: Props) {
  const [active, setActive] = useState("overview");
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-dossier-chapter]"));
    let scheduled = false;
    const update = () => {
      scheduled = false;
      const reached = nodes.filter(node => node.getBoundingClientRect().top <= 170);
      setActive(reached.at(-1)?.id ?? "overview");
    };
    const onScroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
    update(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const info = <dl className={styles.info}>
    {role && <div><dt>{chinese ? "角色" : "Role"}</dt><dd>{role}</dd></div>}
    {tools.length > 0 && <div><dt>{chinese ? "工具" : "Tools"}</dt><dd>{tools.join(" / ")}</dd></div>}
    {tags.length > 0 && <div><dt>{chinese ? "标签" : "Tags"}</dt><dd>{tags.join(" / ")}</dd></div>}
    {links.length > 0 && <div><dt>{chinese ? "相关链接" : "Links"}</dt><dd>{links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</dd></div>}
  </dl>;
  const contents = <nav aria-label={chinese ? "项目章节" : "Project chapters"} className={styles.contents}>
    {chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? "location" : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}><span>{String(index + 1).padStart(2, "0")}</span>{chapter.title}</a>)}
  </nav>;
  return <div className={styles.page}><TopNav /><main className={styles.layout}>
    <aside className={styles.sidebar}>
      <Link href="/projects" className={styles.back}>← {chinese ? "项目列表" : "Projects"}</Link>
      <div className={styles.infoFrame}><p className={styles.record}>{chinese ? "项目档案" : "Project file"}</p>
      {info}</div><div className={styles.desktopContents}><p className={styles.record}>{chinese ? "目录" : "Contents"}</p>{contents}</div>
    </aside>
    <div className={styles.mobileToolbar}>
      <Link href="/projects" className={styles.back}>← {chinese ? "项目列表" : "Projects"}</Link>
    <details className={styles.mobileMenu} ref={menu}>
      <summary><span className={styles.currentChapter}>{chapters.find(c => c.id === active)?.title}</span><span>{chinese ? "目录 ＋" : "Index +"}</span></summary>
      <div className={styles.menuBody}>{contents}<p className={styles.record}>{chinese ? "项目信息" : "Project information"}</p>{info}</div>
    </details>
    </div>
    <div className={styles.document}>
      <header className={styles.header}><p className={styles.record}>{timeline}</p><h1>{title}</h1><p className={styles.subtitle}>{subtitle}</p></header>
      <div className={styles.hero}>{hero}</div>
      {chapters.map((chapter, index) => <section key={chapter.id} id={chapter.id} data-dossier-chapter className={styles.chapter}>
        <header className={styles.chapterHeading}><span>{String(index + 1).padStart(2, "0")}</span><h2>{chapter.title}</h2></header>
        <div className={styles.chapterContent}>{chapter.content}</div>
      </section>)}
    </div>
  </main><SiteFooter /></div>;
}
