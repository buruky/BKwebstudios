import { useEffect, useRef } from "react";
import PillButton from "../components/PillButton.jsx";
import s from "./Sections.module.css";

// Work, Pricing, Process, Contact + footer. One look under every hero (see sections-brief.md).
export default function Sections({ content }) {
  const { work, pricing, process, contact } = content;
  const [workNav, pricingNav, processNav, contactNav] = content.nav;

  // Reveal each section once as it scrolls in. Hidden state is only applied after this runs, so no JS = all visible.
  const sheetRef = useRef(null);
  useEffect(() => {
    const sheet = sheetRef.current;
    sheet.dataset.animate = "";
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.dataset.visible = "";
        io.unobserve(e.target);
      }
    }, { rootMargin: "0px 0px -15% 0px" });
    sheet.querySelectorAll("section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={sheetRef} className={s.sheet}>
      <Section id="work" index={1} title={workNav.label}>
        <ul className={s.work}>
          {work.map((p, i) => (
            <li key={p.name} className={s.r} style={{ "--i": i }}>
              <a className={s.project} href={p.href}>
                <span className={s.shot} aria-hidden="true" />
                <span className={s.projectName}>{p.name}<Arrow /></span>
                <span className={s.line}>{p.line}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="pricing" index={2} title={pricingNav.label}>
        <ul className={s.tiers}>
          {pricing.tiers.map((t, i) => (
            <li key={t.name} className={`${s.tier} ${s.r} ${t.featured ? s.featured : ""}`} style={{ "--i": i }}>
              <h3 className={s.tierName}>{t.name}</h3>
              <p className={s.price}>{t.price}</p>
              <ul className={s.items}>
                {t.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </li>
          ))}
        </ul>
        <p className={`${s.care} ${s.r}`} style={{ "--i": 3 }}>{pricing.carePlan}</p>
      </Section>

      <Section id="process" index={3} title={processNav.label} aside={process.timeline}>
        <ol className={s.steps}>
          {process.steps.map((step, i) => (
            <li key={step.name} className={`${s.step} ${s.r}`} style={{ "--i": i }}>
              <span className={s.stepNum} aria-hidden="true">{i + 1}</span>
              <h3 className={s.stepName}>{step.name}</h3>
              <p className={s.line}>{step.line}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contact" index={4} title={contactNav.label}>
        <div className={s.contact}>
          <p className={`${s.closing} ${s.r}`}>{contact.closing}</p>
          <div className={`${s.reach} ${s.r}`} style={{ "--i": 2 }}>
            <PillButton className={s.cta} href={content.primary.href}>{content.primary.label}</PillButton>
            <a className={s.email} href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </Section>

      <footer className={s.footer}>
        <a className={s.mark} href="#top" aria-label={`${content.name}, home`}><span aria-hidden="true">bk</span></a>
        <nav className={s.footNav} aria-label="Footer">
          {content.nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <small className={s.copy}>© {new Date().getFullYear()} {content.name}</small>
      </footer>
    </div>
  );
}

function Section({ id, index, title, aside, children }) {
  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <header className={s.head}>
        <span className={s.index} aria-hidden="true">{String(index).padStart(2, "0")}</span>
        <h2 id={`${id}-title`} className={s.title}>{title}</h2>
        {aside && <span className={s.aside}>{aside}</span>}
      </header>
      {children}
    </section>
  );
}

function Arrow() {
  return (
    <svg className={s.arrow} viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}
