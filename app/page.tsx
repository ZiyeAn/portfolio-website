import TopNav from "@/components/TopNav";
import HandsMenu from "@/components/HandsMenu";
import { MorphingText } from "@/components/ui/morphing-text";


export default function Home() {
  return (
    <>
      {/* Hero 固定层 */}
      <section id="hero" className="hero-layer">
        <div className="hero-content">
          <img src="/assets/index/title.png" alt="Title" className="hero-title-img" />
          <TopNav />
          <MorphingText texts={["A Table for One?", "Ziye An"]} className="subtitle" />
          <HandsMenu />
        </div>
      </section>
      {/* Spacer 占位，确保滚动时内容能推上来 */}
      <div className="hero-spacer" />
      {/* Works Section */}
      <section id="works" className="content-section works-section">
        <h2>Works</h2>
        <p><a href="/works">Go to works page →</a></p>
      </section>
      {/* Contact Section */}
      <section id="contact" className="content-section contact-section">
        <h2>Contact</h2>
        <p>Coming soon...</p>
      </section>
    </>
  );
}