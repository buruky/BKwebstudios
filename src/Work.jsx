import { content } from "./content.js";
import { WorkList, Footer, useReveal } from "./sections/Sections.jsx";
import PillButton from "./components/PillButton.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import BackToTop from "./components/BackToTop.jsx";
import photo from "../assets/workpage/banner.webp";
import s from "./sections/Sections.module.css";

// The /work page: a photo banner, then every project. Its nav and footer links go back to the home page's sections,
// except Work itself; the logo goes home.
const page = { ...content, nav: content.nav.map((n) => (n.href === "#work" ? n : { ...n, href: `../${n.href}` })) };

export default function Work() {
  const sheetRef = useReveal();
  return (
    <main id="top">
      <a className="skip-link" href="#work">Skip to content</a>
      <div ref={sheetRef} className={`${s.sheet} ${s.page}`}>
        <header className={s.banner}>
          <img src={photo} alt="" fetchPriority="high" />
          <div>
            <h1 className={s.bannerTitle}>{content.nav[0].label}</h1>
            <p className={s.bannerNote}>{content.sectionNotes.work}</p>
          </div>
        </header>
        <section id="work" className={`${s.section} ${s.workPage}`} aria-label={content.nav[0].label}>
          <WorkList work={content.work} details />
          <PillButton className={`${s.cta} ${s.centerCta} ${s.r}`} href={content.primary.href}>{content.primary.label}</PillButton>
        </section>
        <Footer content={page} home="../" />
      </div>
      <SiteHeader content={page} always home="../" />
      <BackToTop />
    </main>
  );
}
