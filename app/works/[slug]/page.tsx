import { notFound } from "next/navigation";
import projectsData from "@/data/works.json";
import ProjectDetail from "@/components/ProjectDetail";

const normalizeId = (id: string) =>
  id.replace(/^\/works\//, "").replace(/\.html$/i, "");

const allProjects = projectsData.projects;

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: normalizeId(project.id),
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const project = allProjects.find((item) => normalizeId(item.id) === slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} · Works`,
    description: project.intro ?? project.details?.description?.slice(0, 140),
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const project = allProjects.find((item) => normalizeId(item.id) === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
