import { notFound } from "next/navigation";
import projectsData from "@/data/playground.json";
import ProjectDetail from "@/components/ProjectDetail";

const normalizeId = (id: string) =>
  id.replace(/^\/works\//, "").replace(/\.html$/i, "");

const allProjects = projectsData.projects;

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: normalizeId(project.id),
  }));
}

type WorksPageParams = Promise<{ slug?: string | string[] }>;

const resolveSlug = async (params?: WorksPageParams) => {
  const resolved = params ? await params : undefined;
  const slugValue = resolved?.slug;

  return Array.isArray(slugValue) ? slugValue[0] : slugValue;
};

export async function generateMetadata({
  params,
}: {
  params?: WorksPageParams;
}) {
  const slug = await resolveSlug(params);
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

export default async function ProjectDetailPage({
  params,
}: {
  params?: WorksPageParams;
}) {
  const slug = await resolveSlug(params);
  const project = allProjects.find((item) => normalizeId(item.id) === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
