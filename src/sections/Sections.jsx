import { useEffect, useRef } from "react";
import PillButton from "../components/PillButton.jsx";
import { Cal, calConfig, calPath } from "../cal.js";
import s from "./Sections.module.css";

// Project screenshots, keyed by file name (content.work[].img).
const shots = Object.fromEntries(
  Object.entries(import.meta.glob("../../assets/work/*.webp", { eager: true, import: "default" }))
    .map(([path, url]) => [path.split("/").pop().replace(".webp", ""), url]),
);

// Work, About, Pricing, Process, Book, FAQ, Contact + footer. One look under every hero (see sections-brief.md).
export default function Sections({ content }) {
  const notes = content.sectionNotes;
  const { work, about, pricing, process, faq, contact } = content;
  const navLabel = (href) => content.nav.find((n) => n.href === href).label;

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

  // The booking calendar, inline. Calls queue until embed.js loads, so the flag stops StrictMode adding it twice.
  const calRef = useRef(null);
  useEffect(() => {
    const el = calRef.current;
    if (el.dataset.cal) return;
    el.dataset.cal = "on";
    Cal("inline", { elementOrSelector: el, calLink: calPath(content.primary.href), config: calConfig });
  }, [content.primary.href]);

  return (
    <div ref={sheetRef} className={s.sheet}>
      <Section id="work" note={notes.work} index={1} title={navLabel("#work")}>
        <ul className={s.work}>
          {work.map((p, i) => (
            <li key={p.name} className={s.r} style={{ "--i": i }}>
              <a className={s.project} href={p.href} target="_blank" rel="noopener">
                <span className={s.shot}><img src={shots[p.img]} alt={`${p.name} website`} width="960" height="600" loading="lazy" /></span>
                <span className={s.type}>{p.type}</span>
                <span className={s.projectName}>{p.name}<Arrow /></span>
                <span className={s.line}>{p.line}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="about" tone="teal" note={notes.about} index={2} title={about.title}>
        <div className={s.about}>
          <div className={`${s.aboutText} ${s.r}`}>
            {about.lines.map((l) => <p key={l}>{l}</p>)}
          </div>
          <ul className={`${s.facts} ${s.r}`} style={{ "--i": 1 }}>
            {about.facts.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </Section>

      <Section id="pricing" note={notes.pricing} index={3} title={navLabel("#pricing")}>
        <div className={s.pricing}>
          <div className={`${s.tier} ${s.featured} ${s.r}`}>
            <h3 className={s.tierName}>{pricing.tier.name}</h3>
            <p className={s.price}>{pricing.tier.price}</p>
            <ul className={s.items}>
              {pricing.tier.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <PillButton className={`${s.cta} ${s.small}`} href={content.primary.href} note={`Interested in: ${pricing.tier.name} (${pricing.tier.price})`}>
              {pricing.tier.cta}
            </PillButton>
          </div>
          <div className={s.extras}>
            {[pricing.custom, pricing.care].map((x, i) => (
              <div key={x.name} className={`${s.extra} ${s.r}`} style={{ "--i": i + 1 }}>
                <h3 className={s.tierName}>{x.name}</h3>
                <p className={s.extraPrice}>{x.price}</p>
                <p className={s.line}>{x.line}</p>
                {x.cta && (
                  <PillButton className={`${s.cta} ${s.small}`} href={content.primary.href} note={`Interested in: ${x.name} (${x.price})`}>{x.cta}</PillButton>
                )}
              </div>
            ))}
            <ul className={`${s.terms} ${s.r}`} style={{ "--i": 3 }}>
              {pricing.terms.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="process" tone="sand" note={notes.process} index={4} title={navLabel("#process")} aside={process.timeline}>
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

      <Section id="book" tone="stripes" note={notes.book} index={5} title={content.primary.label} aside={content.bookTag} asideClass={s.calTag}>
        <div ref={calRef} className={`${s.cal} ${s.r}`} />
      </Section>

      <Section id="faq" tone="night" note={notes.faq} index={6} title={faq.title}>
        <div className={s.faq}>
          {faq.items.map((f, i) => (
            <details key={f.q} className={`${s.qa} ${s.r}`} style={{ "--i": Math.min(i, 4) }}>
              <summary>{f.q}</summary>
              <p className={s.line}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="contact" tone="dots" note={notes.contact} index={7} title={navLabel("#contact")}>
        <div className={s.contact}>
          <p className={`${s.closing} ${s.r}`}>{contact.closing}</p>
          <div className={`${s.reach} ${s.r}`} style={{ "--i": 2 }}>
            <PillButton className={s.cta} href={content.primary.href}>{content.primary.label}</PillButton>
            <a className={s.email} href={`mailto:${contact.email}`}>{contact.email}</a>
            <a className={s.email} href={`tel:+1${contact.phone.replace(/\D/g, "")}`}>{contact.phone}</a>
            <a className={s.email} href={contact.messenger.href} target="_blank" rel="noopener">{contact.messenger.label}</a>
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

function Section({ id, index, title, note, aside, asideClass = "", tone, children }) {
  return (
    <section id={id} className={`${s.section} ${tone ? `${s.tone} ${s[tone]}` : ""}`} aria-labelledby={`${id}-title`}>
      <header className={s.head}>
        <span className={s.index} aria-hidden="true">{String(index).padStart(2, "0")}</span>
        <h2 id={`${id}-title`} className={s.title}>{title}</h2>
        {note && <p className={s.note}>{note}</p>}
        {aside && <span className={`${s.aside} ${asideClass}`}>{aside}</span>}
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
