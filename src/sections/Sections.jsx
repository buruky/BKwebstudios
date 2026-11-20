import { useEffect, useRef } from "react";
import PillButton from "../components/PillButton.jsx";
import { Cal, calConfig, calPath } from "../cal.js";
import s from "./Sections.module.css";

// Project screenshots, keyed by file name (content.work[].img). Hero 5 (Collage) uses them too.
export const shots =Object.fromEntries(
  Object.entries(import.meta.glob("../../assets/work/*.webp", { eager: true, import: "default" }))
    .map(([path, url]) => [path.split("/").pop().replace(".webp", ""), url]),
);

// Work, About | Process, Pricing | Book, FAQ, closing line + contact, then the footer. One look under every hero (see sections-brief.md).
export default function Sections({ content }) {
  const { sectionNotes: notes, bridges } = content;
  const { work, about, pricing, process, faq, contact } = content;
  const navLabel = (href) => content.nav.find((n) => n.href === href).label;

  const sheetRef = useReveal();

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
      {/* Three chapters, one background each: Proof (cream), The offer (sand), Let's talk (night). Sections inside a
          chapter sit closer and share a hairline; the big gaps and the colour changes only come between chapters. */}
      <div className={s.chapter}>
        <Section id="work" note={notes.work} title={navLabel("#work")} bridge={bridges.work}>
          <WorkList work={work.slice(0, 3)} />
          <PillButton className={`${s.cta} ${s.centerCta} ${s.ghost}`} href="./work/">{content.allWork}</PillButton>
        </Section>

        <Section id="about" note={notes.about} title={about.title} bridge={bridges.about}>
          <div className={s.about}>
            <div className={`${s.aboutText} ${s.r}`}>
              {about.lines.map((l) => <p key={l}>{l}</p>)}
            </div>
            <ul className={`${s.facts} ${s.r}`} style={{ "--i": 1 }}>
              {about.facts.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </Section>
      </div>

      {/* The seam into The offer: the sand rises in a soft arch, and a round stamp sits on the curve, turning a little
          as you scroll past. Decorative (the same facts are in About and the footer), so screen readers skip it. */}
      <div className={s.seam} aria-hidden="true">
        <svg className={s.arch} viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 120V84C240 28 480 6 720 6s480 22 720 78v36z" />
        </svg>
        <div className={s.stamp}>
          <svg viewBox="0 0 160 160">
            <defs><path id="stamp-ring" d="M80 80m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" /></defs>
            <text><textPath href="#stamp-ring" textLength="356" lengthAdjust="spacing">{content.stamp}</textPath></text>
          </svg>
          <span className={s.stampMark}>bk</span>
        </div>
      </div>

      <div className={`${s.chapter} ${s.sand}`}>
        <Section id="process" note={notes.process} title={navLabel("#process")} aside={process.timeline} bridge={bridges.process}>
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

        <Section id="pricing" note={notes.pricing} title={navLabel("#pricing")} bridge={bridges.pricing}>
          <div className={s.pricing}>
            {[...pricing.tiers, pricing.custom].map((t, i) => (
              <div key={t.name} className={`${s.tier} ${i === 1 ? s.featured : ""} ${s.r}`} style={{ "--i": i }}>
                <h3 className={s.tierName}>{t.name}</h3>
                <p className={s.price}>{t.price}</p>
                <ul className={s.items}>
                  {t.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <PillButton className={`${s.cta} ${s.small}`} href={content.primary.href} note={`Interested in: ${t.name} (${t.price})`}>
                  {t.cta}
                </PillButton>
              </div>
            ))}
            <div className={`${s.extra} ${s.wide} ${s.r}`} style={{ "--i": 3 }}>
              <h3 className={s.tierName}>{pricing.care.name}</h3>
              <p className={s.extraPrice}>{pricing.care.price}</p>
              <p className={s.line}>{pricing.care.line}</p>
            </div>
            <ul className={`${s.terms} ${s.r}`} style={{ "--i": 4 }}>
              {pricing.terms.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </Section>
      </div>

      <div className={`${s.chapter} ${s.night}`}>
        <Section id="book" note={notes.book} title={content.primary.label} aside={content.bookTag} asideClass={s.calTag} bridge={bridges.book}>
          <div ref={calRef} className={`${s.cal} ${s.r}`} />
        </Section>

        <Section id="faq" note={notes.faq} title={faq.title}>
          <div className={s.faq}>
            {faq.items.map((f, i) => (
              <details key={f.q} className={`${s.qa} ${s.r}`} style={{ "--i": Math.min(i, 4) }}>
                <summary>{f.q}</summary>
                <p className={s.line}>{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* The page's last big words, with email, phone and Messenger beside them. */}
        <section id="contact" className={s.section} aria-labelledby="contact-title">
          <div className={s.finale}>
            <h2 id="contact-title" className={`${s.closing} ${s.r}`}>{contact.closing}</h2>
            <div className={`${s.reach} ${s.r}`} style={{ "--i": 1 }}>
              <p className={s.reachLine}>{notes.contact}</p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:+1${contact.phone.replace(/\D/g, "")}`}>{contact.phone}</a>
              <a href={contact.messenger.href} target="_blank" rel="noopener">{contact.messenger.label}</a>
            </div>
          </div>
        </section>
      </div>

      <Footer content={content} />
    </div>
  );
}

// Reveal each section once as it scrolls in (put the returned ref on the .sheet). Hidden state is only applied after
// this runs, so no JS = all visible.
export function useReveal() {
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
  return sheetRef;
}

// `details`: also show what Buruk did on each site (the /work page).
export function WorkList({ work, details = false }) {
  return (
    <ul className={s.work}>
      {work.map((p, i) => (
        <li key={p.name} className={s.r} style={{ "--i": i }}>
          <a className={s.project} href={p.href} target="_blank" rel="noopener">
            <span className={s.shot}><img src={shots[p.img]} alt={`${p.name} website`} width="960" height="600" loading="lazy" /></span>
            <span className={s.type}>{p.type}</span>
            <span className={s.projectName}>{p.name}<Arrow /></span>
            <span className={s.line}>{p.line}</span>
            {details && p.details && <span className={s.details}>{p.details}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer({ content, home = "#top" }) {
  const { reviews } = content;
  return (
    <footer className={s.footer}>
      <div className={s.footBrand}>
        <a className={s.mark} href={home} aria-label={`${content.name}, home`}><span aria-hidden="true">bk</span></a>
        <PillButton className={`${s.cta} ${s.review}`} href={reviews.href}>{reviews.cta}</PillButton>
      </div>
      <nav className={s.footNav} aria-label="Footer">
        {content.nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <small className={s.copy}>© {new Date().getFullYear()} {content.name}</small>
      <p className={s.madeBy}>
        <span className={s.madeMark} aria-hidden="true" />
        {content.madeBy}{" "}
        <a href={content.primary.href}>{content.primary.label}</a>
      </p>
    </footer>
  );
}

// `bridge`: { text, to } — a one-line link at the end of the section that leads into the next one.
export function Section({ id, title, note, aside, asideClass = "", bridge, children }) {
  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <header className={s.head}>
        <h2 id={`${id}-title`} className={s.title}>{title}</h2>
        {note && <p className={s.note}>{note}</p>}
        {aside && <span className={`${s.aside} ${asideClass}`}>{aside}</span>}
      </header>
      {children}
      {bridge && (
        <a className={`${s.bridge} ${s.r}`} href={bridge.to}>
          {bridge.text}
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" />
          </svg>
        </a>
      )}
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
