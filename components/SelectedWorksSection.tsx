"use client";

import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import projectsData from "@/data/works.json";

type Project = {
  title: string;
  selected_work?: boolean;
  thumbnail?: string;
  tags?: string[];
  id?: string;
  details?: {
    description?: string;
    timeline?: string;
    images?: string[];
  };
  intro?: string;
};

type WorksData = {
  projects?: Project[];
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
  const slug = id.replace(/^\/works\//, "").replace(/\.html$/i, "");
  return `/works/${slug}`;
};

export default function SelectedWorksSection() {
  const works = projectsData as WorksData;
  const projects: Project[] = works.projects ?? [];

  // 1) 过滤 selected_work
  const selected = projects.filter((p) => p.selected_work);

  // 2) 映射成 AnimatedTestimonials 需要的数据
  const testimonials = selected.map((p) => {
    const firstImg =
      normalizeSrc(p.details?.images?.[0]) ||
      normalizeSrc(p.thumbnail) ||
      "/placeholder.png";

    const quote =
      stripHtml(p.details?.description) ||
      stripHtml(p.intro) ||
      "—";

    const designation =
      p.details?.timeline || (p.tags?.length ? p.tags.join(" · ") : "");

    return {
      name: p.title || "Untitled",
      designation,
      quote,
      src: firstImg,
      href: toProjectHref(p.id),
    };
  });

  // 开发期日志：确认每条 src 是否是以 /assets/ 或 http 开头
  if (process.env.NODE_ENV === "development") {
    console.table(
      testimonials.map((t) => ({
        name: t.name,
        src: t.src,
      }))
    );
  }

  return (
    <section className="w-full mt-12">
      <AnimatedTestimonials testimonials={testimonials} autoplay />
    </section>
  );
}
