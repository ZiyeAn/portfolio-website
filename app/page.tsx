import TopNav from "@/components/TopNav";
import HandsMenu from "@/components/HandsMenu";
import { MorphingText } from "@/components/ui/morphing-text";

export default function Home() {
  return (
    <main>
      <div className="title">
        <img src="/assets/index/title.png" alt="Title" />
        <TopNav />
        <MorphingText texts={["A Table for One?","Ziye An"]} className="subtitle" />
      </div>
      <HandsMenu />
      <section id="works">
        <h2>Works</h2>
        <p><a href="/works">Go to works page →</a></p>
      </section>

      <section id="contact" style={{ minHeight: "40vh" }}>
        <h2>Contact</h2>
        <p>Coming soon...</p>
      </section>
    </main>
  );
}