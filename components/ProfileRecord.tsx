import Image from "next/image";
import divingPhoto from "@/public/assets/about/diving.png";
import PhotographyPortfolio from "./PhotographyPortfolio";
import styles from "./ProfileRecord.module.css";

type Entry = { date: string; name: string; role: string; text?: string };
export default function ProfileRecord({ chinese: zh, identity }: { chinese: boolean; identity: number }) {
  const education: Entry[] = [
    { date: "2026.08 — 2027.05", name: zh ? "新加坡国立大学" : "National University of Singapore", role: "MSc Engineering Design & Innovation" },
    { date: "2022.08 — 2026.05", name: zh ? "帕森斯设计学院-新学院" : "Parsons School of Design", role: "BFA Design and Technology", text: zh ? "荣誉毕业 · 优秀奖学金" : "Graduated with Honors · Merit-based Scholarship" },
  ];
  const experience: Entry[] = [
    { date: `2026.08 — ${zh ? "至今" : "Present"}`, name: "ZQ Sports", role: zh ? "自由职业 · 视觉设计与前端开发" : "Freelance Visual Design & Front-end Development", text: zh ? "规划网站与响应式界面，连接学习、球拍推荐、比较与购买流程。制作 Figma 组件并协调周边材料与供应商。网站处于上线前阶段，周边仍在设计中。" : "Planned responsive flows connecting learning, paddle recommendations, comparison, and purchase. Created Figma components and coordinated merchandise materials and suppliers. Website pre-launch; merchandise in design." },
    { date: "2025.08 — 2026.05", name: zh ? "帕森斯设计学院-新学院" : "Parsons School of Design", role: zh ? "学生导师" : "Student Tutor", text: zh ? "辅导交互设计、创意编程和快速原型制作；协助学生解决设计与代码问题，并支持展览安装和网站设计。" : "Tutored interaction design, creative coding, and rapid prototyping. Helped students work through design and coding challenges, and supported exhibition installation and website design." },
    { date: "2024.06 — 2024.08", name: "Katalyst AI", role: zh ? "UX 设计实习生" : "UX Designer Intern", text: zh ? "为基于 Dify 的 AI 知识助手设计流程、线框图与交互原型，制作 Figma 组件及开发交付标注。评估回答准确性、覆盖缺口和多轮上下文，记录错误及缺乏依据的回答。" : "Designed flows, wireframes, and a clickable prototype for a Dify-based AI knowledge assistant. Built Figma components and handoff annotations; evaluated accuracy, coverage, and multi-turn context, documenting incorrect and unsupported responses." },
  ];
  const table = (title: string, entries: Entry[]) => <section className={styles.section}><h3>{title}</h3><div className={styles.table}>{entries.map(entry => <div className={styles.row} key={entry.name}><div className={styles.date}>{entry.date}</div><div className={styles.entry}><h4>{entry.name}</h4><p className={styles.role}>{entry.role}</p>{entry.text && <p>{entry.text}</p>}</div></div>)}</div></section>;
  if (identity === 1) return <PhotographyPortfolio chinese={zh} />;
  if (identity === 2) return <div className={styles.record}><Image src={divingPhoto} alt={zh ? "鱼群与潜水员的水下景象" : "Divers beside a large school of fish"} sizes="(max-width: 800px) 92vw, 750px" style={{ display: "block", width: "100%", height: "auto" }} /></div>;
  if (identity !== 0) {
    const titles = zh ? ["", "摄影记录", "自由潜水日志", "画画与手稿"] : ["", "Photography notes", "Freediving log", "Sketchbook"];
    const columns = zh ? [[], ["时间", "地点 / 拍摄系列"], ["年份", "潜点 / 旅程"], ["时间", "主题 / 作品"]] : [[], ["Date", "Place / series"], ["Year", "Dive site / trip"], ["Date", "Subject / work"]];
    return <div className={`${styles.record} ${styles.casual}`}><header><p className={styles.label}>0{identity + 1} / PERSONAL RECORD</p><h2>{titles[identity]}</h2><p>{zh ? "慢慢收集，陆续放进来。" : "A collection to grow over time."}</p></header><div className={styles.placeholderTable}><span>{columns[identity][0]}</span><span>{columns[identity][1]}</span><span>—</span><p>{zh ? "记录待补充" : "Entries to come"}</p></div><div className={styles.photos}>{[1,2].map(n => <div key={n}><span>{zh ? "照片 / 作品占位" : "Photo / work placeholder"}</span><small>0{n}</small></div>)}</div></div>;
  }
  const skills = zh ? [
    ["产品与体验", "用户流程、线框图、交互原型、响应式网页、Figma"],
    ["研究与测试", "问卷、访谈、可用性测试、AI 回答评估、反馈归纳"],
    ["设计系统与交付", "Figma 组件、Auto Layout、Variants、开发交付、WCAG 检查"],
    ["视觉工具", "Adobe Illustrator、Adobe Photoshop"],
    ["技术原型", "Next.js、JavaScript、HTML/CSS、Arduino、AI 辅助开发"],
    ["3D 与实体制作", "Rhino、Maya、激光切割、3D 打印"],
    ["语言", "中文、英语"],
  ] : [
    ["Product & UX", "User flows, wireframes, clickable prototypes, responsive web, Figma"],
    ["Research & testing", "Surveys, interviews, usability tests, AI response QA, feedback synthesis"],
    ["Systems & delivery", "Figma components, Auto Layout, Variants, developer handoff, WCAG checks"],
    ["Visual tools", "Adobe Illustrator, Adobe Photoshop"],
    ["Technical prototyping", "Next.js, JavaScript, HTML/CSS, Arduino, AI-assisted coding"],
    ["3D & fabrication", "Rhino, Maya, laser cutting, 3D printing"],
    ["Languages", "Mandarin Chinese, English"],
  ];
  return <div className={styles.record}>{table(zh ? "教育" : "Education", education)}{table(zh ? "工作经历" : "Experience", experience)}
    <section className={styles.section}><h3>{zh ? "技能" : "Skills"}</h3><div className={styles.table}>{skills.map(([category, detail]) => <div className={styles.row} key={category}><div className={styles.date}>{category}</div><div className={styles.entry}><p>{detail}</p></div></div>)}</div></section>
  </div>;
}
