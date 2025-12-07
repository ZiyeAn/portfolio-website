/* import TopNav from "@/components/TopNav";
import Link from "next/link";
import styles from "./page.module.css";

const highlights = [
  {
    title: "Blending UX with playful storytelling",
    description:
      "I design digital experiences with a playful edge, weaving delightful interactions into product flows without losing sight of usability.",
  },
  {
    title: "Hands-on 3D prototyping",
    description:
      "From motion studies to 3D mockups, I build tangible artifacts that help teams feel an idea before we commit to code.",
  },
  {
    title: "Visual systems & branding",
    description:
      "I enjoy crafting design languages that scale across moments—brand, web, product—so every touchpoint feels intentional.",
  },
];

const experiences = [
  {
    role: "Product Designer",
    company: "Independent / Freelance",
    period: "2022 — Present",
    points: [
      "Leading end-to-end product design for clients in creative tooling, lifestyle, and education.",
      "Rapidly iterating prototypes that blend motion, 3D, and storytelling to pitch new product directions.",
    ],
  },
  {
    role: "Design Technologist",
    company: "Interactive Lab Collective",
    period: "2020 — 2022",
    points: [
      "Built playful installations and microsites for cultural partners with cross-functional creative teams.",
      "Owned the bridge between concept and implementation—motion studies, component specs, and dev handoff.",
    ],
  },
];

const toolset = [
  "Figma",
  "Blender",
  "Cinema 4D",
  "After Effects",
  "TouchDesigner",
  "Photoshop",
  "Illustrator",
  "Framer",
  "HTML",
  "CSS",
  "React / THREE",
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <TopNav />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Detailed About</p>
          <h1 className={styles.title}>
            Designing tactile digital experiences with curiosity and care.
          </h1>
          <p className={styles.intro}>
            I am Ziye—an experience designer crafting playful, immersive
            stories across digital products, installations, and visual systems.
            My work bridges UX craft, 3D exploration, and photography to create
            moments that feel both grounded and imaginative.
          </p>
          <div className={styles.actions}>
            <Link href="/#contact" className={styles.primaryAction}>
              Start a project
            </Link>
            <Link href="/works" className={styles.secondaryAction}>
              View selected works →
            </Link>
          </div>
        </section>

        <section className={styles.highlightsSection}>
          <h2 className={styles.sectionTitle}>What drives my practice</h2>
          <div className={styles.highlightsGrid}>
            {highlights.map((item) => (
              <article key={item.title} className={styles.highlightCard}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.experienceSection}>
          <h2 className={styles.sectionTitle}>Selected experience</h2>
          <div className={styles.timeline}>
            {experiences.map((item) => (
              <article key={item.role} className={styles.timelineItem}>
                <div className={styles.timelineHeader}>
                  <h3>{item.role}</h3>
                  <span>{item.period}</span>
                </div>
                <p className={styles.timelineCompany}>{item.company}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.toolsetSection}>
          <h2 className={styles.sectionTitle}>Toolbox</h2>
          <p className={styles.sectionIntro}>
            A mix of design, motion, and prototyping tools that help ideas move
            quickly from sketch to haptic-feeling experiences.
          </p>
          <ul className={styles.toolGrid}>
            {toolset.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </section>

        <section className={styles.beyondSection}>
          <h2 className={styles.sectionTitle}>Beyond the screen</h2>
          <p className={styles.sectionIntro}>
            When I am not prototyping, you will find me capturing street
            stories through photography, experimenting with ceramic glazes, or
            sketching spatial narratives for games. These explorations keep my
            design practice grounded in texture, light, and human moments.
          </p>
        </section>
      </main>
    </div>
  );
}
*/

import TopNav from "@/components/TopNav";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <TopNav />
      <p className={styles.message}>
        This About Page is currently marinating.
        {"\n"}
        The chef (that’s me) is still deciding how much humor, sincerity,
        {"\n"}
        and shameless self-bragging to season it with.
        {"\n"}
        Please come back later to taste the final dish.
      </p>
    </div>
  );
}
