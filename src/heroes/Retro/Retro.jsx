import { useEffect, useRef, useState } from "react";
import PillButton from "../../components/PillButton.jsx";
import s from "./Retro.module.css";

// RETRO (hero 4): a classic Mac OS player window on a pale page, after the user's Poolsuite reference.
// The screen plays TV static behind the title; switching style is "changing the channel" (a burst of static first).

const BURST_MS = 260;

// Live 1-bit static on a tiny canvas, scaled up pixelated. ~12 fps, paused off screen; one still frame for reduced motion.
function useStatic(ref) {
  useEffect(() => {
    const c = ref.current;
    const g = c.getContext("2d");
    const img = g.createImageData(c.width, c.height);
    const px = new Uint32Array(img.data.buffer);
    const draw = () => {
      for (let i = 0; i < px.length; i++) px[i] = Math.random() < 0.5 ? 0xff211e1b : 0xffe8eff4; // ABGR: dune-ish / bone-ish
      g.putImageData(img, 0, 0);
    };
    draw();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    timer = setInterval(() => visible && !document.hidden && draw(), 83);
    return () => { clearInterval(timer); io.disconnect(); };
  }, [ref]);
}

export default function Retro({ content, heroes, active, onSelect }) {
  const canvas = useRef(null);
  useStatic(canvas);
  const [burst, setBurst] = useState(false);

  const index = heroes.findIndex((h) => h.key === active);
  const built = heroes.filter((h) => h.component);
  const tune = (key) => {
    if (key === active) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return onSelect(key);
    setBurst(true);
    setTimeout(() => onSelect(key), BURST_MS);
  };
  const step = (dir) => {
    const i = built.findIndex((h) => h.key === active);
    tune(built[(i + dir + built.length) % built.length].key);
  };
  const [city, offer] = content.price.split(" · ");
  const num = (i) => String(i + 1).padStart(2, "0");

  return (
    <section className={s.hero} aria-labelledby="retro-title">
      <header className={s.chips}>
        <a className={s.brand} href="#top" aria-label={`${content.name}, home`}>
          <span className={s.mark} aria-hidden="true">bk</span>
          <span>{content.name}</span>
        </a>
        <p className={s.price}><span className={s.city}>{city}</span><span>{offer}</span></p>
      </header>

      <div className={s.window}>
        <div className={s.titlebar} aria-hidden="true">
          <span className={s.box} /><span className={`${s.box} ${s.boxFull}`} />
          <span className={s.wordmark}>{content.name}</span>
        </div>

        <div className={s.tv}>
          <div className={`${s.screen} ${burst ? s.burst : ""}`}>
            {/* the picture: switches off like an old CRT as you scroll away */}
            <div className={s.picture}>
              <canvas ref={canvas} className={s.static} width="240" height="124" aria-hidden="true" />
              <h1 id="retro-title" className={s.card}>
                {content.titleLead} <em>{content.titleKey}</em> {content.titleTail}
              </h1>
            </div>
          </div>
          <div className={s.strip}>
            <span className={s.tiny} aria-hidden="true" /><span className={s.tiny} aria-hidden="true" />
            <span className={s.built}>{content.builtBy}</span>
            <span className={s.count}>{num(index)} / {String(heroes.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* the control panel beside the screen */}
        <div className={s.side}>
          <div className={s.now}>
            <span className={s.lcd} aria-hidden="true">{num(index)}</span>
            <p className={s.desc}>{content.description}</p>
          </div>
          <div className={s.keys}>
            <PillButton className={`${s.key} ${s.book}`} href={content.primary.href}>{content.primary.label}</PillButton>
            <a className={`${s.key} ${s.work}`} href={content.secondary.href}>
              <Folder />{content.secondary.label}
            </a>
          </div>
          <div className={s.channel} role="group" aria-label="Site style">
            <button type="button" className={s.step} aria-label="Previous style" onClick={() => step(-1)}><Tri flip /></button>
            <label className={s.select}>
              <span className="sr-only">Site style</span>
              <select value={active} onChange={(e) => tune(e.target.value)}>
                {built.map((h) => <option key={h.key} value={h.key}>{num(heroes.indexOf(h))} {h.name}</option>)}
              </select>
              <Caret />
            </label>
            <button type="button" className={`${s.step} ${s.stepNext}`} aria-label="Next style" onClick={() => step(1)}><Tri /></button>
          </div>
          <p className={s.status}>
            <span>{content.switcherHint}</span>
            <span className={s.meter} aria-hidden="true"><i /><i /><i /><i /><i /></span>
          </p>
        </div>
      </div>

      <nav className={s.dock} aria-label="Main">
        {content.nav.map((n) => (
          <a key={n.href} href={n.href}><Icon name={n.href.slice(1)} />{n.label}</a>
        ))}
      </nav>
    </section>
  );
}

// 1-bit icons on a 16px grid, drawn with crisp edges so they stay pixel-sharp.
const ICONS = {
  work: "M1 4h5l1 2h8v8H1zM1 7h14",                                      // folder
  pricing: "M2 2h6l7 7-6 6-7-7zM5 5h1v1H5z",                              // tag
  process: "M2 3h12M2 8h12M2 13h12M4 1v4M10 6v4M6 11v4",                  // sliders
  book: "M1 3h14v12H1zM1 6h14M4 1v3M12 1v3M4 9h2M8 9h2M4 12h2",           // calendar
  contact: "M1 3h14v10H1zM1 3l7 6 7-6",                                    // envelope
};
function Icon({ name }) {
  return (
    <svg className={s.icon} viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
      <path d={ICONS[name]} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Folder() {
  return (
    <svg className={s.folder} viewBox="0 0 16 14" aria-hidden="true" shapeRendering="crispEdges">
      <path d="M1 3h5l1 2h8v8H1z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path className={s.lid} d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Tri({ flip }) {
  return <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" style={flip && { transform: "scaleX(-1)" }}><path d="M2 1l6 4-6 4z" fill="currentColor" /></svg>;
}
function Caret() {
  return <svg className={s.caret} viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M0 0h10L5 6z" fill="currentColor" /></svg>;
}
