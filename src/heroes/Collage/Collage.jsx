import { useEffect, useRef } from "react";
import PillButton from "../../components/PillButton.jsx";
import { shots } from "../../sections/Sections.jsx";
import bust from "../../../assets/page5/page5Assets/web/bust.webp";
import stone from "../../../assets/page5/page5Assets/web/stone.webp";
import s from "./Collage.module.css";

// COLLAGE (hero 5): a dark portfolio-deck slide turned up to a layered collage, after the user's Plura reference.
// A huge marble head (The Met, Open Access) torn into strips; the strip across the eyes is printed in ember (like a
// risograph pass) and knocked out of line, and the key word sits across it. The headline splits across two corners; tiny tracked labels, vertical text, a contact grid of sites.

// The bust's strips, top to bottom: where each tear sits (% of the head's height) and how far it's nudged sideways.
// `print`: the eye strip (eyes at ~48%), inked in ember and pushed furthest out of line.
const STRIPS = [
  { y0: 0, y1: 30, x: "0vw", depth: 6 },
  { y0: 30, y1: 41, x: "1.6vw", depth: -10 },
  { y0: 41, y1: 56, x: "-3vw", depth: 16, print: true },
  { y0: 56, y1: 100, x: "0.8vw", depth: -5 },
];

// Torn edges that flow: smooth value noise, mostly one long wave with a softer ripple and a whisper of paper fibre on
// top. Each cut has one contour (its seed), shared by the strip above and the strip below, so the pieces fit together
// like a real tear. Units are % of the bust's height.
const hash = (n) => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
function noise(x, seed) {
  const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
  return (hash(i + seed * 157) * (1 - u) + hash(i + 1 + seed * 157) * u) * 2 - 1;
}
const contour = (x, seed, fibre) =>
  noise(x * 1.8, seed) * 1 + noise(x * 5, seed + 11) * 0.35 + noise(x * 55, seed + 23) * fibre;

// A band between cuts at y0 and y1 (%). `grow` pushes both edges outward (the pale paper rim), `fibre` roughens them.
// y0 = 0 / y1 = 100 stay straight (they run off the top and bottom anyway).
function tear(y0, y1, seed, { grow = 0, fibre = 0.05, amp = 1 } = {}) {
  const N = 90, top = [], bottom = [];
  for (let i = 0; i <= N; i++) {
    const x = i / N, px = `${(x * 104 - 2).toFixed(2)}%`;
    const t = y0 <= 0 ? -2 : y0 + contour(x, seed, fibre) * amp - grow;
    const b = y1 >= 100 ? 102 : y1 + contour(x, seed + 1, fibre) * amp + grow;
    top.push(`${px} ${t.toFixed(2)}%`);
    bottom.unshift(`${px} ${b.toFixed(2)}%`);
  }
  return `polygon(${[...top, ...bottom].join(",")})`;
}

// Mouse depth: writes --mx / --my (-1..1) on the hero; each strip moves by its own depth. Mouse only, motion allowed.
function useDepth(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
        el.style.setProperty("--my", ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
      });
    };
    el.addEventListener("pointermove", move);
    return () => { el.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [ref]);
}

export default function Collage({ content, heroes, active, onSelect }) {
  const hero = useRef(null);
  useDepth(hero);

  const index = heroes.findIndex((h) => h.key === active);
  const built = heroes.filter((h) => h.component);
  const step = (dir) => {
    const i = built.findIndex((h) => h.key === active);
    onSelect(built[(i + dir + built.length) % built.length].key);
  };
  const num = (i) => String(i + 1).padStart(2, "0");
  const words = content.titleLead.split(" ");
  const last = words.pop(); // "for" gets its own small line

  return (
    <section ref={hero} className={s.hero} aria-labelledby="collage-title">
      <header className={s.top}>
        <a className={s.brand} href="#top">{content.name}<span className={s.sep} aria-hidden="true">|</span>{num(index)}. {heroes[index].name}</a>
        <nav className={s.nav} aria-label="Main">
          {content.nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <span className={s.built}>{content.builtBy}</span>
      </header>

      {/* torn strip of stone behind the headline, with the same pale paper rim as the bust's tears */}
      <span className={s.stone} aria-hidden="true">
        <span className={s.stoneRim} style={{ clipPath: tear(14, 86, 40, { amp: 12, fibre: 0.25, grow: 3.5 }) }} />
        <span className={s.stonePaper} style={{ backgroundImage: `url(${stone})`, clipPath: tear(14, 86, 40, { amp: 12, fibre: 0.06 }) }} />
      </span>

      <h1 id="collage-title" className={s.title}>
        <span className={s.lead}>{words.join(" ")} <span className={s.for}>{last}</span></span>{" "}
        <span className={s.stage}>
          {STRIPS.map((st, i) => (
            <span key={i} className={s.layer} style={{ "--i": i, "--drift": `${i % 2 ? -1 : 1}`, "--x": st.x, "--depth": st.depth, "--bust": `url(${bust})` }} aria-hidden="true">
              {/* the paper's pale core showing along the tear, a touch wider and rougher than the print */}
              <span className={s.rim} style={{ clipPath: tear(st.y0, st.y1, i, { grow: 0.35, fibre: 0.12, amp: 2.4 }) }} />
              <span className={`${s.strip} ${st.print ? s.print : ""}`} style={{ clipPath: tear(st.y0, st.y1, i, { grow: -0.12, amp: 2.4 }) }}>
                <img src={bust} alt="" width="1286" height="2000" fetchPriority={i === 0 ? "high" : undefined} />
              </span>
            </span>
          ))}
          <em className={s.key}>{content.titleKey}</em>
        </span>{" "}
        <span className={s.tail}>{content.titleTail}</span>
      </h1>

      <div className={s.body}>
        <p className={s.desc}>{content.description}</p>
        <div className={s.actions}>
          <PillButton className={s.book} href={content.primary.href}>{content.primary.label}</PillButton>
          <a className={s.work} href={content.secondary.href}>{content.secondary.label}<Grid /></a>
        </div>
        {/* the contact grid: a mouse shortcut to Work (the button above is the real link). One row of 4, however many
            projects there are; the rest live on the /work page. */}
        <a className={s.sheet} href={content.secondary.href} tabIndex={-1} aria-hidden="true">
          {content.work.slice(0, 4).map((p) => <img key={p.img} src={shots[p.img]} alt="" width="960" height="600" />)}
        </a>
      </div>

      <div className={s.pager} role="group" aria-label="Site style">
        <button type="button" aria-label="Previous style" onClick={() => step(-1)}>‹</button>
        <span className={s.count}>{num(index)} / {String(heroes.length).padStart(2, "0")}</span>
        <span className={s.styleName} aria-live="polite">{heroes[index].name}</span>
        <button type="button" aria-label="Next style" onClick={() => step(1)}>›</button>
        <p className={s.hint}>{content.switcherHint}</p>
      </div>

      <p className={s.price}>{content.price}</p>
      <p className={s.credit}>Photo: The Met, Open Access</p>
    </section>
  );
}

function Grid() {
  return (
    <svg className={s.gridIcon} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" fill="currentColor" />
    </svg>
  );
}
