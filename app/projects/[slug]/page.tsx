import { notFound } from "next/navigation";
import projects from "@/data/projects.json";
import ProjectStory from "@/components/ProjectStory";

const normalizeId = (id: string) =>
  id
    .trim()
    .toLowerCase()
    .replace(/^\/projects\//, "")
    .replace(/^\/works\//, "")
    .replace(/\.html$/i, "");

type Project = (typeof projects)[number];
type Section = Project["sections"] extends Array<infer T> ? T : never;

const isTextSection = (
  section: Section,
): section is Section & { body?: string } => section.type === "text";

const allProjects = projects.map((project) => ({
  ...project,
  slug: normalizeId(project.id),
}));

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

type ProjectsPageParams = Promise<{ slug?: string | string[] }>;

const resolveSlug = async (params?: ProjectsPageParams) => {
  const resolved = params ? await params : undefined;
  const slugValue = resolved?.slug;
  return Array.isArray(slugValue) ? slugValue[0] : slugValue;
};

export async function generateMetadata({
  params,
}: {
  params?: ProjectsPageParams;
}) {
  const slug = await resolveSlug(params);
  const project = allProjects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  const description =
    project.intro ??
    project.sections
      ?.filter(isTextSection)
      .map((section) => section.body ?? "")
      .join(" ")
      .slice(0, 160);

  return {
    title: `${project.title} · Projects`,
    description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params?: ProjectsPageParams;
}) {
  const slug = await resolveSlug(params);
  const project = allProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectStory project={project} />;
}
