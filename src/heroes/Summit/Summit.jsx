import { useEffect, useLayoutEffect, useRef, useState } from "react";
import photo from "../../../assets/page1/page1Assets/background.jpg";
// Mountains + dunes in white, sky in black. Made from background-mnts.jpg (sky deleted in Photopea, saved white).
import ridgeMask from "../../../assets/page1/page1Assets/ridge-mask.png";
import Switcher from "../../components/Switcher.jsx";
import PillButton from "../../components/PillButton.jsx";
import s from "./Summit.module.css";

const NARROW = "(max-width: 720px)"; // keep in sync with Summit.module.css
// Fog edge sits exactly on the screen centre (cutting the person in half) / bottom 42% on phones (lifted on short ones, see `lift`).
const FOG = { wide: 0.5, narrow: 0.58 };

// Scene coordinates are the photo's own pixels (2048x1536), so the brand stays locked to the ridge at any screen size.
// cx is the person's centre line (head and raised hands, from the trace). Both viewBoxes are centred on it, so cx is the
// middle of the screen: everything left of it is drawn as outline, right of it solid.
// Wide spans x 0..2020, the widest view that keeps the person centred without going past the photo's left edge.
// mono: giant "B" / "K", their visible edges `gap` from cx. rest: "WEB" / "STUDIOS", edges `gap` from cx. y = baselines in photo px.
const CX = 1010;
const LAYOUTS = {
  wide: { viewBox: "0 137 2020 1263", mono: { y: 760, size: 600, gap: 56 }, rest: { y: 885, size: 62, spacing: 0.34, gap: 40 } },
  narrow: { viewBox: "660 8 700 1520", mono: { y: 745, size: 300, gap: 26 }, rest: { y: 838, size: 34, spacing: 0.3, gap: 20 } },
};

// Visible (ink) extents of a string, so letters are balanced by what you see rather than by the font's side spacing.
let measureCtx;
function ink(text, size, weight, spacing = 0) {
  measureCtx ??= document.createElement("canvas").getContext("2d");
  measureCtx.font = `${weight} ${size}px "Clash Display"`;
  measureCtx.letterSpacing = `${spacing * size}px`;
  const m = measureCtx.measureText(text);
  return { left: m.actualBoundingBoxLeft, right: m.actualBoundingBoxRight };
}

function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    Promise.all([document.fonts.load('600 100px "Clash Display"'), document.fonts.load('500 100px "Clash Display"')])
      .finally(() => alive && setReady(true));
    return () => { alive = false; };
  }, []);
  return ready;
}

// Frame geometry in CSS px. Exposed to CSS as variables so the HTML lines up with the SVG line.
function frameGeo(w, narrow) {
  return narrow
    ? { ix: 12, it: 64, ib: 72, r: 24, nw: 214, nh: 66, labelRight: 28, labelW: 112 }
    : { ix: Math.min(56, Math.max(16, w * 0.039)), it: 88, ib: 96, r: 32, nw: 300, nh: 84, labelRight: 60, labelW: 132 };
}

// The part of the frame's inside that is fogged: left of the seam on desktop, below it on phones.
function fogPath(w, h, g, narrow, seam) {
  const L = g.ix, R = w - g.ix, T = g.it, B = h - g.ib, r = g.r;
  if (!narrow) return `M${seam},${T} H${L + r} A${r},${r} 0 0 0 ${L},${T + r} V${B - r} A${r},${r} 0 0 0 ${L + r},${B} H${seam} Z`;
  const nx = R - g.nw, ny = B - g.nh;
  return `M${L},${seam} H${R} V${ny - r} A${r},${r} 0 0 1 ${R - r},${ny} H${nx + r} A${r},${r} 0 0 0 ${nx},${ny + r}
    V${B - r} A${r},${r} 0 0 1 ${nx - r},${B} H${L + r} A${r},${r} 0 0 1 ${L},${B - r} Z`;
}

function framePath(w, h, g) {
  const L = g.ix, R = w - g.ix, T = g.it, B = h - g.ib, r = g.r;
  const nx = R - g.nw, ny = B - g.nh;
  return `M${L + r},${T} H${R - r} A${r},${r} 0 0 1 ${R},${T + r} V${ny - r} A${r},${r} 0 0 1 ${R - r},${ny}
    H${nx + r} A${r},${r} 0 0 0 ${nx},${ny + r} V${B - r} A${r},${r} 0 0 1 ${nx - r},${B}
    H${L + r} A${r},${r} 0 0 1 ${L},${B - r} V${T + r} A${r},${r} 0 0 1 ${L + r},${T} Z`;
}

function useMedia(query) {
  const [match, setMatch] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const update = () => setMatch(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}


export default function Summit({ content, heroes, active, onSelect }) {
  const narrow = useMedia(NARROW);
  const fontsReady = useFontsReady();
  const L = narrow ? LAYOUTS.narrow : LAYOUTS.wide;
  const [monogram, ...restWords] = content.name.split(" ");
  const [first, second] = monogram;
  const [web, ...studios] = restWords.map((w) => w.toUpperCase());

  // Start-anchored x positions: the left piece's right edge and the right piece's left edge sit the same distance from
  // the centre line, for both B / K and WEB / STUDIOS. Measured once the font is in, so nothing jumps.
  let pos = null;
  if (fontsReady) {
    const left = (text, size, weight, gap, spacing) => CX - gap - ink(text, size, weight, spacing).right;
    const right = (text, size, weight, gap, spacing) => CX + gap + ink(text, size, weight, spacing).left;
    const m = L.mono, r = L.rest;
    pos = {
      b: left(first, m.size, 600, m.gap), k: right(second, m.size, 600, m.gap),
      web: left(web, r.size, 500, r.gap, r.spacing), studios: right(studios.join(" "), r.size, 500, r.gap, r.spacing),
    };
  }

  const heroRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(heroRef.current);
    return () => ro.disconnect();
  }, []);
  const contentRef = useRef(null);
  const [contentH, setContentH] = useState(0);
  useLayoutEffect(() => {
    const ro = new ResizeObserver(([e]) => setContentH(e.contentRect.height));
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const g = frameGeo(size.w, narrow);
  // Phones: the fog column (18px under the seam) must clear the notch. Real phones lose height to the browser bars, so on
  // short screens the seam lifts to make room, and the scene lifts with it so WEB STUDIOS stays just above the fog.
  const lift = narrow ? Math.max(0, size.h * FOG.narrow - (size.h - g.ib - g.nh - 16 - contentH - 18)) : 0;
  const seam = narrow ? size.h * FOG.narrow - lift : size.w * FOG.wide;
  const labelX = size.w - g.ix - g.labelRight - g.labelW;
  const vars = { "--ix": `${g.ix}px`, "--it": `${g.it}px`, "--ib": `${g.ib}px`, "--nw": `${g.nw}px`, "--nh": `${g.nh}px`,
    "--label-x": `${labelX}px`, "--label-w": `${g.labelW}px`, "--seam": `${seam}px` };


  // Scene units -> hero px, the same mapping the browser applies for viewBox + "xMidYMid slice".
  // Lets the HTML fog and the frame line follow the B and K exactly.
  const [vx, vy0, vw, vh] = L.viewBox.split(" ").map(Number);
  const k = Math.max(size.w / vw, size.h / vh);
  const vy = vy0 + (k ? lift / k : 0);
  const viewBox = `${vx} ${vy} ${vw} ${vh}`;
  const toPx = `matrix(${k} 0 0 ${k} ${(size.w - vw * k) / 2 - vx * k} ${(size.h - vh * k) / 2 - vy * k})`;
  // Chrome doesn't always repaint an HTML element when its referenced <clipPath> changes, so the id changes with it.
  const fogClipId = `summit-fog-${Math.round(size.w)}x${Math.round(size.h)}-${narrow ? "n" : "w"}-${pos ? 1 : 0}`;
  const letter = (ch, x, fill) => (
    <text className={s.mono} x={x} y={L.mono.y} fontSize={L.mono.size} transform={toPx} fill={fill}>{ch}</text>
  );
  const headline = [
    ...content.titleLead.split(" ").map((w) => ({ w })),
    { w: content.titleKey, key: true },
    ...content.titleTail.split(" ").map((w) => ({ w })),
  ];

  return (
    <section ref={heroRef} className={s.hero} style={vars} aria-labelledby="summit-title">
      {/* Back: photo, then the monogram, then the ridge cutout over it. */}
      <svg className={s.scene} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <mask id="summit-ridge" maskUnits="userSpaceOnUse" x="0" y="0" width="2048" height="1536">
            <image href={ridgeMask} width="2048" height="1536" />
          </mask>
          <linearGradient id="summit-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a2f33" stopOpacity=".55" />
            <stop offset=".35" stopColor="#2a2f33" stopOpacity="0" />
          </linearGradient>
          <filter id="summit-extend" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="40" /></filter>
          <linearGradient id="summit-feather" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".06" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id="summit-feather-mask" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#summit-feather)" /></mask>
        </defs>
        {/* blurred, enlarged copy fills the canvas beyond the photo's edges */}
        <image href={photo} x="-820" y="-310" width="2870" height="2150" filter="url(#summit-extend)" />
        <image href={photo} width="2048" height="1536" mask="url(#summit-feather-mask)" />
        {/* sky shade sits under the K so the K stays the same flat bone as the outline B */}
        <rect x="0" y="0" width="2048" height="1536" fill="url(#summit-shade)" />
        <image href={photo} width="2048" height="1536" mask="url(#summit-ridge)" />
      </svg>

      {/* Fog fills only the inside of the frame: its left half (desktop) or its bottom part (phone), following the corners and notch. */}
      {size.w > 0 && (
        <>
          {/* Fog shape: the fogged part of the frame, plus (desktop) the B itself, so fog spills into the B where it
              rises above the frame. */}
          <svg className={s.defs} aria-hidden="true">
            <clipPath id={fogClipId} clipPathUnits="userSpaceOnUse">
              <path d={fogPath(size.w, size.h, g, narrow, seam)} />
              {!narrow && pos && letter(first, pos.b)}
            </clipPath>
          </svg>
          <div className={s.fog} style={{ clipPath: `url(#${fogClipId})` }} aria-hidden="true" />
          <div className={s.fogRoll} aria-hidden="true" />
        </>
      )}

      {/* The solid K sits above both fog layers so it stays crisp while the fog rolls over the photo.
          Still tucked behind the mountains via the same ridge mask as the B (defined in the front svg below). */}
      <svg className={s.scene} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {pos && <text className={`${s.mono} ${s.solid}`} x={pos.k} y={L.mono.y} fontSize={L.mono.size} mask="url(#summit-above-ridge)">{second}</text>}
      </svg>

      {/* Front, crisp above the fog. Left of the centre line is outline, right is solid.
          The outline "B" is still tucked behind the ridge via a mask. */}
      <svg className={`${s.scene} ${s.reveal}`} style={{ "--d": "1150ms" }} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <filter id="summit-invert" x="0" y="0" width="100%" height="100%">
            <feColorMatrix values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0" />
          </filter>
          <mask id="summit-above-ridge" maskUnits="userSpaceOnUse" x="-1000" y="0" width="4048" height="1536">
            <rect x="-1000" width="4048" height="1536" fill="#fff" />
            {/* the same mask inverted: mountains black, so the B is hidden behind them */}
            <image href={ridgeMask} width="2048" height="1536" filter="url(#summit-invert)" />
          </mask>
        </defs>
        {pos && (
          <>
            <text className={`${s.mono} ${s.line}`} x={pos.b} y={L.mono.y} fontSize={L.mono.size} mask="url(#summit-above-ridge)">{first}</text>
            <text className={`${s.rest} ${s.line}`} x={pos.web} y={L.rest.y} fontSize={L.rest.size}
              style={{ letterSpacing: `${L.rest.spacing}em` }}>{web}</text>
            <text className={`${s.rest} ${s.solid}`} x={pos.studios} y={L.rest.y} fontSize={L.rest.size}
              style={{ letterSpacing: `${L.rest.spacing}em` }}>{studios.join(" ")}</text>
          </>
        )}
      </svg>

      {size.w > 0 && (
        <svg className={s.frame} width={size.w} height={size.h} aria-hidden="true">
          <defs>
            <linearGradient id="summit-line" gradientUnits="userSpaceOnUse"
              {...(narrow ? { x1: 0, y1: seam - 30, x2: 0, y2: seam + 30 } : { x1: seam - 30, y1: 0, x2: seam + 30, y2: 0 })}>
              {/* sky/clear side first on narrow (top), fog side first on wide (left) */}
              <stop offset="0" stopColor={narrow ? "#f4efe8" : "#fde98a"} stopOpacity={narrow ? 0.75 : 0.55} />
              <stop offset="1" stopColor={narrow ? "#fde98a" : "#f4efe8"} stopOpacity={narrow ? 0.55 : 0.75} />
            </linearGradient>
            <mask id="summit-label-gap">
              <rect width={size.w} height={size.h} fill="#fff" />
              <rect x={labelX} y={g.it - 6} width={g.labelW} height="12" fill="#000" />
              {/* no frame line running through the B or K where they cross it */}
              {pos && letter(first, pos.b, "#000")}
              {pos && letter(second, pos.k, "#000")}
            </mask>
          </defs>
          <path d={framePath(size.w, size.h, g)} pathLength="1" fill="none" stroke="url(#summit-line)" strokeWidth="1.25" mask="url(#summit-label-gap)" />
        </svg>
      )}

      <span className={`${s.label} ${s.reveal}`} style={{ "--d": "1500ms" }}>{content.price}</span>

      <header className={`${s.header} ${s.reveal}`} style={{ "--d": "900ms" }}>
        <a className={s.logo} href="#top" aria-label={`${content.name}, home`}><span className={s.mark} aria-hidden="true">bk</span></a>
        <nav className={s.nav} aria-label="Main">
          {content.nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <button className={s.menuBtn} type="button" aria-expanded={menuOpen} aria-controls="summit-menu" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
          <i /><i />
        </button>
        {menuOpen && (
          <nav id="summit-menu" className={s.menu} aria-label="Main">
            {content.nav.map((n) => <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>)}
          </nav>
        )}
      </header>

      <div ref={contentRef} className={s.fogContent}>
        {/* Each word clears from the fog in turn; "local" is a glow-yellow outline like the fog-side frame line. */}
        <h1 id="summit-title" className={s.headline}>
          {headline.map(({ w, key }, i) => (
            <span key={i} className={`${s.word} ${key ? s.hl : ""}`} style={{ "--i": i }}>{w}</span>
          ))}
        </h1>
        <p className={`${s.desc} ${s.reveal}`} style={{ "--d": "1500ms" }}>{content.description}</p>
        <div className={s.reveal} style={{ "--d": "1560ms" }}>
          <Switcher className={s.switcher} heroes={heroes} active={active} onSelect={onSelect} />
        </div>
      </div>

      <div className={`${s.notch} ${s.reveal}`} style={{ "--d": "1700ms" }}>
        <PillButton className={s.cta} href={content.primary.href}>{content.primary.label}</PillButton>
      </div>

      <footer className={`${s.bottom} ${s.reveal}`} style={{ "--d": "1600ms" }}>
        <a className={s.more} href={content.secondary.href}>{content.secondary.label}<span className={s.arrow} aria-hidden="true" /></a>
        <div className={s.meta}>
          <small className={s.credit}>Photo: Katie Lowe</small>
          <span className={s.scroll} aria-hidden="true" />
        </div>
      </footer>
    </section>
  );
}
