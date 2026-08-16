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
  };
  sections?: Array<{ type?: string; body?: string }>;
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
