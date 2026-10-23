import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PillButton from "../../components/PillButton.jsx";
import photo from "../../../assets/page1/page1Assets/web/page-color.webp";
import s from "./Flash.module.css";

// Client screenshots by file name (content.work[].img), the same files the Work section uses.
const shots = Object.fromEntries(
  Object.entries(import.meta.glob("../../../assets/work/*.webp", { eager: true, import: "default" }))
    .map(([path, url]) => [path.split("/").pop().replace(".webp", ""), url]),
);

// HERO 1 "FLASH": the conversion-first hero (see the Hero 1 Playbook), sample C from the inspo round (after the
// Filmmaker Taiwan reference). Light editorial split: the offer on paper at left, the night flash photo as a tall
// panel at right with Buruk's name set on it.
export default function Flash({ content, heroes, active, onSelect }) {
  // Phones: a booking bar slides up once the hero's own button has scrolled off the top.
  const ctaRef = useRef(null);
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(ctaRef.current);
    return () => io.disconnect();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Switcher: a stack of style prints; clicking deals the next built style to the top.
  const index = heroes.findIndex((h) => h.key === active);
  const built = heroes.filter((h) => h.component);
  const next = () => onSelect(built[(built.findIndex((h) => h.key === active) + 1) % built.length].key);
  const num = (i) => String(i + 1).padStart(2, "0");
  const total = num(heroes.length - 1);

  // "Custom websites" in the serif, then "FOR small BUSINESSES" in the poster caps.
  const lead = content.titleLead.split(" ");
  const name = content.credits[0].value.split(" ");

  return (
    <section className={s.hero} aria-labelledby="flash-title">
      <div className={s.left}>
        <header className={s.header}>
          <a className={s.brand} href="#top" aria-label={`${content.name}, home`}>
            <span className={s.mark} aria-hidden="true">bk</span>
            <span className={s.wordmark} aria-hidden="true">{content.name}</span>
          </a>
          <nav className={s.nav} aria-label="Main">
            {content.nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <button className={s.menuBtn} type="button" aria-expanded={menuOpen} aria-controls="flash-menu" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
            <i /><i />
          </button>
          {menuOpen && (
            <nav id="flash-menu" className={s.menu} aria-label="Main">
              {content.nav.map((n) => <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>)}
            </nav>
          )}
        </header>

        <div className={s.copy}>
          <p className={s.label}>{content.price}</p>
          <h1 id="flash-title" className={s.title}>
            <span className={s.l1}>{lead.slice(0, -1).join(" ")}</span>{" "}
            <span className={s.l2}>{lead.at(-1)} <em>{content.titleKey}</em> {content.titleTail}</span>
          </h1>
          <div className={s.body}>
            {/* Set like film credits: a small italic role over the name in caps. */}
            <dl className={s.credits}>
              {content.credits.map((c) => <div key={c.label}><dt>{c.label}</dt><dd>{c.value}</dd></div>)}
            </dl>
            <div className={s.offer}>
              <p className={s.desc}>{content.description}</p>
              <div className={s.actions}>
                <div ref={ctaRef}><PillButton className={s.cta} href={content.primary.href}>{content.primary.label}</PillButton></div>
                <a className={s.work} href={content.secondary.href}>
                  <span className={s.peek} aria-hidden="true">
                    {content.work.slice(0, 3).map((w, i) => (
                      <span key={w.name} className={s.card} style={{ "--i": i - 1 }}>
                        <img src={shots[w.img]} alt="" loading="lazy" />
                      </span>
                    ))}
                  </span>
                  {content.secondary.label}
                  <span className={s.grid} aria-hidden="true"><i /><i /><i /><i /></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The photo panel. */}
      <div className={s.photo}>
        <div className={s.flip}>
          <img src={photo} alt={`${content.credits[0].value} smiling and giving a thumbs up at night`} width="760" height="1754" fetchPriority="high" />
        </div>
        <p className={s.name} aria-hidden="true">{name.map((w) => <span key={w}>{w}</span>)}</p>
        <div className={s.switcher} role="group" aria-label="Site style">
          <p className={s.hint}><span className={s.count}>{num(index)} / {total} <span className={s.styleName}>{heroes[index].name}</span></span>{content.switcherHint}</p>
          <button className={s.stack} type="button" onClick={next} aria-label={`Next style (now ${num(index)} of ${total})`}>
            <span className={s.print} /><span className={s.print} />
            <span className={`${s.print} ${s.top}`}>{num(index)}</span>
          </button>
        </div>
      </div>

      {/* On <body>, so it sits above the sections, which stack over the hero. */}
      {createPortal(
        <div className={`${s.bar} ${showBar ? s.barOn : ""}`} aria-hidden={!showBar} inert={!showBar}>
          <PillButton className={s.cta} href={content.primary.href}>{content.primary.label}</PillButton>
          <span className={s.barPrice}>{content.credits[2].value}</span>
        </div>,
        document.body,
      )}
    </section>
  );
}
