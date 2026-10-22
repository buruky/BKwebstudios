import { useEffect, useState } from "react";
// Blue orchid: the user-supplied transparent PNG (gaman-alice-…-removebg-preview.png), cropped to the flower.
// shortcut: source is 920px wide, so it is slightly soft on hi-dpi screens; swap in a larger original when found.
import flower from "../../../assets/page2/cutouts/orchid.webp";
import PillButton from "../../components/PillButton.jsx";
import s from "./Minimal.module.css";

// Where the top bloom sits inside the cutout (fractions of its width / height), measured from the blue pixels.
const HEAD = { x: 0.624, y: 0.224 };

// Lays the giant word out letter by letter (so each can rise on its own) and crops the viewBox to the ink,
// so the word runs exactly edge to edge. Also returns the centre of the "D", which the flower is pinned to.
function useWordLayout(word) {
  const [layout, setLayout] = useState(null);
  useEffect(() => {
    let alive = true;
    const font = '600 100px "Clash Display"';
    document.fonts.load(font).finally(() => {
      if (!alive) return;
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.font = font;
      const xs = [...word, ""].map((_, i) => ctx.measureText(word.slice(0, i)).width);
      const m = ctx.measureText(word);
      const left = m.actualBoundingBoxLeft, width = left + m.actualBoundingBoxRight;
      const d = word.indexOf("D");
      setLayout({
        viewBox: `${-left} ${-m.actualBoundingBoxAscent} ${width} ${m.actualBoundingBoxAscent + m.actualBoundingBoxDescent}`,
        xs,
        anchor: ((xs[d] + xs[d + 1]) / 2 + left) / width,
      });
    });
    return () => { alive = false; };
  }, [word]);
  return layout;
}

export default function Minimal({ content, heroes, active, onSelect }) {
  const words = content.name.toUpperCase().split(" ");
  const giant = words.pop();
  const layout = useWordLayout(giant);

  const index = heroes.findIndex((h) => h.key === active);
  const built = heroes.filter((h) => h.component);
  const step = (dir) => {
    const i = built.findIndex((h) => h.key === active);
    onSelect(built[(i + dir + built.length) % built.length].key);
  };

  return (
    <section className={s.hero} aria-labelledby="minimal-title">
      <header className={`${s.top} ${s.reveal}`} style={{ "--d": "900ms" }}>
        <a className={s.mark} href="#top" aria-label={`${content.name}, home`}><span aria-hidden="true">bk</span></a>
        <span className={s.price}>{content.price}</span>
      </header>

      <div className={s.stage} style={layout && { "--anchor": layout.anchor }}>
        <p className={`${s.small} ${s.reveal}`} style={{ "--d": "300ms" }}>
          {words.join(" ")}<span className="sr-only"> {giant}</span>
        </p>
        <div className={s.wordBox}>
          <div className={s.panel} aria-hidden="true" />
          <svg className={s.word} viewBox={layout?.viewBox ?? "0 -72 466 74"} aria-hidden="true">
            {layout && [...giant].map((ch, i) => (
              <text key={i} x={layout.xs[i]} style={{ "--i": i }}>{ch}</text>
            ))}
          </svg>
          {layout && (
            <div className={s.flower} style={{ "--hx": HEAD.x, "--hy": HEAD.y }} aria-hidden="true">
              <img src={flower} alt="" width="803" height="588" />
            </div>
          )}
        </div>
      </div>

      <div className={s.body}>
        <div className={s.copy}>
          <h1 id="minimal-title" className={`${s.title} ${s.reveal}`} style={{ "--d": "900ms" }}>
            {content.titleLead}<br />{content.titleKey} {content.titleTail}
          </h1>
          <p className={`${s.desc} ${s.reveal}`} style={{ "--d": "960ms" }}>{content.description}</p>
          <div className={`${s.actions} ${s.reveal}`} style={{ "--d": "1020ms" }}>
            <PillButton className={s.cta} href={content.primary.href}>{content.primary.label}</PillButton>
            <a className={s.more} href={content.secondary.href}>{content.secondary.label}<span className={s.arrow} aria-hidden="true" /></a>
          </div>
        </div>

        <div className={`${s.switcher} ${s.reveal}`} style={{ "--d": "1080ms" }} role="group" aria-label="Site style">
          <p className={s.count}>
            <span className={s.num}>{String(index + 1).padStart(2, "0")}</span>
            <span className={s.total}>/ {String(heroes.length).padStart(2, "0")}</span>
          </p>
          <span className={s.styleName}>{heroes[index].name}</span>
          <div className={s.steps}>
            <button type="button" aria-label="Previous style" onClick={() => step(-1)}><Arrow flip /></button>
            <button type="button" aria-label="Next style" onClick={() => step(1)}><Arrow /></button>
          </div>
        </div>
      </div>

      <footer className={`${s.bottom} ${s.reveal}`} style={{ "--d": "1140ms" }}>
        <nav className={s.nav} aria-label="Main">
          {content.nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
      </footer>
    </section>
  );
}

function Arrow({ flip }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      style={flip && { transform: "scaleX(-1)" }}>
      <path d="M2 8h12M9 3l5 5-5 5" />
    </svg>
  );
}
