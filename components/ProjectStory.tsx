/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import TopNav from "@/components/TopNav";
import styles from "./ProjectStory.module.css";
import projectsData from "@/data/projects.json";

type ProjectData = (typeof projectsData)[number];

type BaseSection = {
  type: string;
  title?: string;
};

type TextSection = BaseSection & {
  type: "text";
  body?: string;
};

type ImageSection = BaseSection & {
  type: "image";
  image: string;
  alt?: string;
  caption?: string;
};

type GallerySection = BaseSection & {
  type: "gallery";
  images: {
    image: string;
    caption?: string;
  }[];
};

type ProcessStepsSection = BaseSection & {
  type: "process-steps";
  steps: {
    step_title?: string;
    description?: string;
  }[];
};

type VideoSection = BaseSection & {
  type: "video";
  src: string;
  caption?: string;
};

type SplitSection = BaseSection & {
  type: "split";
  body?: string;
  image: string;
  alt?: string;
  caption?: string;
  imagePosition?: "left" | "right";
};

type Section =
  | TextSection
  | ImageSection
  | GallerySection
  | ProcessStepsSection
  | VideoSection
  | SplitSection;

const normalizeAsset = (src?: string) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return `/${src.replace(/^(\.\.\/)+/, "").replace(/^\//, "")}`;
};

const extractDriveId = (value: string) => {
  if (!value) return "";
  const directMatch = value.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (directMatch?.[1]) {
    return directMatch[1];
  }

  try {
    const url = new URL(value);
    const idParam = url.searchParams.get("id");
    if (idParam) return idParam;
  } catch {
    // not a URL, fall through
  }

  return "";
};

const buildDrivePreviewUrl = (value: string) => {
  const id = extractDriveId(value);
  if (!id) return value;
  return `https://drive.google.com/file/d/${id}/preview`;
};

const renderParagraphs = (body?: string) => {
  if (!body) return null;
  return body.split(/\n\s*\n/).map((chunk, index) => (
    <p
      key={`para-${index}`}
      // Allow inline HTML (e.g., links) in project copy controlled by authors
      dangerouslySetInnerHTML={{ __html: chunk.trim() }}
    />
  ));
};

const renderSection = (section: Section, index: number) => {
  switch (section.type) {
    case "text": {
      return (
        <section key={`text-${index}`} className={styles.section}>
          {section.title ? (
            <h2 className={styles.sectionHeader}>{section.title}</h2>
          ) : null}
          <div className={styles.sectionBody}>
            {renderParagraphs((section as TextSection).body)}
          </div>
        </section>
      );
    }
    case "image": {
      const imageSection = section as ImageSection;
      const src = normalizeAsset(imageSection.image);
      return (
        <figure key={`image-${index}`} className={`${styles.section} ${styles.figure}`}>
          <img src={src} alt={imageSection.alt ?? imageSection.title ?? ""} />
          {imageSection.caption ? (
            <figcaption className={styles.caption}>{imageSection.caption}</figcaption>
          ) : null}
        </figure>
      );
    }
    case "gallery": {
      const gallery = section as GallerySection;
      return (
        <section key={`gallery-${index}`} className={styles.section}>
          {gallery.title ? (
            <h2 className={styles.sectionHeader}>{gallery.title}</h2>
          ) : null}
          <div className={styles.galleryGrid}>
            {gallery.images.map((item, imageIndex) => {
              const src = normalizeAsset(item.image);
              return (
                <figure key={`gallery-item-${imageIndex}`} className={styles.galleryItem}>
                  <img src={src} alt={item.caption ?? gallery.title ?? ""} />
                  {item.caption ? (
                    <figcaption className={styles.galleryCaption}>
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        </section>
      );
    }
    case "split": {
      const splitSection = section as SplitSection;
      const src = normalizeAsset(splitSection.image);
      const imageFirst = splitSection.imagePosition === "left";
      return (
        <section
          key={`split-${index}`}
          className={`${styles.section} ${styles.splitSection}`}
        >
          {splitSection.title ? (
            <h2 className={styles.sectionHeader}>{splitSection.title}</h2>
          ) : null}
          <div
            className={`${styles.splitContent} ${
              imageFirst ? styles.splitContentImageFirst : ""
            }`}
          >
            <div className={styles.splitText}>
              {renderParagraphs(splitSection.body)}
            </div>
            <figure className={styles.splitFigure}>
              <img src={src} alt={splitSection.alt ?? splitSection.title ?? ""} />
              {splitSection.caption ? (
                <figcaption className={styles.splitCaption}>
                  {splitSection.caption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </section>
      );
    }
    case "process-steps": {
      const stepsSection = section as ProcessStepsSection;
      return (
        <section key={`steps-${index}`} className={styles.section}>
          {stepsSection.title ? (
            <h2 className={styles.sectionHeader}>{stepsSection.title}</h2>
          ) : null}
          <div className={styles.stepsList}>
            {stepsSection.steps.map((step, stepIndex) => (
              <div key={`step-${stepIndex}`} className={styles.stepItem}>
                {step.step_title ? (
                  <h3 className={styles.stepTitle}>{step.step_title}</h3>
                ) : null}
                {step.description ? <p>{step.description}</p> : null}
              </div>
            ))}
          </div>
        </section>
      );
    }
    case "video": {
      const videoSection = section as VideoSection;
      const isDrive = videoSection.src.includes("drive.google.com");
      const src = isDrive
        ? buildDrivePreviewUrl(videoSection.src)
        : normalizeAsset(videoSection.src);
      return (
        <section key={`video-${index}`} className={styles.section}>
          {videoSection.title ? (
            <h2 className={styles.sectionHeader}>{videoSection.title}</h2>
          ) : null}
          <div className={styles.videoWrapper}>
            {isDrive ? (
              <iframe
                src={src}
                title={videoSection.title ?? "Project video"}
                allow="autoplay; fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <video src={src} controls playsInline preload="metadata" />
            )}
          </div>
          {videoSection.caption ? (
            <p className={styles.caption}>{videoSection.caption}</p>
          ) : null}
        </section>
      );
    }
    default:
      return null;
  }
};

interface ProjectStoryProps {
  project: ProjectData;
}

export default function ProjectStory({ project }: ProjectStoryProps) {
  const heroImage = normalizeAsset(project.thumbnail);
  const rawHeroVideo = project.meta?.video?.trim();
  const heroVideoIsDrive = !!rawHeroVideo && rawHeroVideo.includes("drive.google.com");
  const heroVideo = rawHeroVideo
    ? heroVideoIsDrive
      ? buildDrivePreviewUrl(rawHeroVideo)
      : normalizeAsset(rawHeroVideo)
    : "";
  const timeline = project.meta?.timeline;
  const techStack = project.meta?.techStack ?? [];
  const role = project.meta?.role;
  const demoLink = project.meta?.demoLink;
  const sections = project.sections ?? [];

  return (
    <div className={styles.page}>
      <TopNav />
      <div className={styles.topBarSpacer} aria-hidden />
      <main className={styles.main}>
        <div className={styles.heroTopRow}>
          <Link href="/projects" className={styles.backLink}>
            <span aria-hidden>←</span> Back to Projects
          </Link>
          {timeline ? (
            <span className={styles.timelineValue}>{timeline}</span>
          ) : null}
        </div>
        <article className={styles.hero}>
          <header className={styles.heroHeader}>
            <span className={styles.srOnly}>Project</span>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            {project.subtitle ? (
              <p className={styles.projectSubtitle}>{project.subtitle}</p>
            ) : null}
          </header>

          <div className={styles.metaPanel}>
            {role ? (
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>{role}</span>
              </div>
            ) : null}
            {techStack.length ? (
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Tech Stack</span>
                <span className={styles.metaValue}>{techStack.join(", ")}</span>
              </div>
            ) : null}
            {project.tags?.length ? (
              <div className={`${styles.metaBlock} ${styles.tagsBlock}`}>
                <span className={styles.metaLabel}>Tags</span>
                <div className={styles.metaTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {demoLink && demoLink !== "#" ? (
              <div className={styles.metaBlock}>
                <span className={styles.metaLabel}>Demo</span>
                <a
                  href={demoLink}
                  className={styles.metaValue}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit ↗
                </a>
              </div>
            ) : null}
          </div>

          <div className={`${styles.heroMedia} ${heroVideo ? styles.heroMediaVideo : ""}`}>
            {heroVideo ? (
              heroVideoIsDrive ? (
                <iframe
                  src={heroVideo}
                  title={`${project.title} hero video`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className={styles.heroVideoFrame}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <video
                  src={heroVideo}
                  className={styles.heroVideo}
                  playsInline
                  autoPlay
                  muted
                  loop
                  controls
                />
              )
            ) : (
              <img src={heroImage} alt={project.title} />
            )}
          </div>
        </article>

        <article className={styles.article}>
          {sections.map((section, index) => renderSection(section as Section, index))}
        </article>
      </main>
    </div>
  );
}
