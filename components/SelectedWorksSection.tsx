"use client";

import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import projectsData from "@/data/projects.json";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeProject } from "@/lib/i18n";

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  tags?: string[];
  intro?: string;
  meta?: {
    timeline?: string;
    role?: string;
  };
  sections?: Array<{ type?: string; body?: string }>;
};

const summaries: Record<string, { en: string; zh: string }> = {
  "zq-sports": {
    en: "From a mark on the court to a first impression on screen. A visual identity and website connecting Zhongqi’s competitions, knowledge, and gear.",
    zh: "从球场上的一枚标志，到屏幕上的第一印象。为众祺体育设计视觉识别，并把它延伸成一个连接赛事、知识与装备的网站。",
  },
  lifemart: {
    en: "How much is a life worth? Scan, price, and print a receipt in a supermarket where living beings become commodities.",
    zh: "一条生命值多少钱？在这间超市里，扫描、定价、打印小票，看看生命如何变成货架上的商品。",
  },
  "i-want-home-i-could-carry-with": {
    en: "What if home could come with you? A wearable little house holds the belongings, habits, and memories that make somewhere feel like yours.",
    zh: "如果家能跟着我走呢？把物品、习惯和记忆装进一座可穿戴的小房子，带着熟悉的生活去往下一站。",
  },
  divedex: {
    en: "Back on land, still wondering what that fish was? Revisit your dive footage, compare species, and give your underwater discoveries a home.",
    zh: "上岸了，还惦记着刚才那条不认识的鱼？回看潜水影像、比较物种，把水下的偶遇收进自己的海洋收藏。",
  },
  labyrinth: {
    en: "One player hides in the dark. The other hunts by sound. In this two-player maze, every noise could give you away.",
    zh: "一个人在黑暗中躲藏，另一个循着声音追猎。双人迷宫捉迷藏里，你发出的每一点声响，都可能暴露位置。",
  },
  "chester-choiceworth": {
    en: "Meet a salesman who has read your spending history. Feed him your transactions and watch him print the lifestyle he thinks you should want.",
    zh: "认识一下这位读过你账单的推销员。交出消费记录，看他打印出一套他认为你应该向往的生活。",
  },
  spinphony: {
    en: "A little note called Do has lost its way. Spin a real turntable and tap arcade buttons to guide it through a world of rhythm puzzles.",
    zh: "小音符 Do 迷路了。转动真正的唱盘、按下街机按钮，带它跳过障碍，穿过一圈又一圈的节奏谜题。",
  },
  marbility: {
    en: "Two players, a handful of marbles, and a little quantum uncertainty. Explore qubits, gates, and probability through an arcade-inspired game.",
    zh: "两位玩家、几颗弹珠，再加上一点量子的不确定性。在街机式的游戏里，一起玩转量子比特、量子门与概率。",
  },
};

// 更强健的路径归一化
const normalizeSrc = (s?: string): string => {
  if (!s) return "";
  // 去掉前导的 ../
  if (s.startsWith("../assets/")) s = s.replace("../assets/", "/assets/");
  // 去掉前导的 ./assets/
  if (s.startsWith("./assets/")) s = s.replace("./assets/", "/assets/");
  // 补全 /assets/
  if (s.startsWith("assets/")) s = `/${s}`;
  return s;
};

// 去 HTML
const stripHtml = (html?: string): string =>
  html ? html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";

const toProjectHref = (id?: string): string | undefined => {
  if (!id) return undefined;
  return `/projects/${id}`;
};

export default function SelectedWorksSection() {
  const { language } = useLanguage();
  const projects = (projectsData as Project[]).map((project) =>
    localizeProject(project, language)
  );

  const testimonials = projects.map((project) => {
    const firstTextSection = project.sections?.find(
      (section) => section.type === "text" && section.body
    );
    const quote =
      summaries[project.id]?.[language] ||
      stripHtml(project.subtitle) ||
      stripHtml(project.intro) ||
      stripHtml(firstTextSection?.body) ||
      "—";
    const designation =
      project.meta?.timeline ||
      (project.tags?.length ? project.tags.join(" · ") : "");

    return {
      name: project.title || "Untitled",
      designation,
      quote,
      src: normalizeSrc(project.thumbnail) || "/placeholder.png",
      href: toProjectHref(project.id),
    };
  });

  return (
    <section className="w-full mt-12">
      <AnimatedTestimonials testimonials={testimonials} autoplay />
    </section>
  );
}
