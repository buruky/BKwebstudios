import { useEffect, useState } from "react";
import { content } from "./content.js";
import { heroes } from "./heroes/index.js";
import Sections from "./sections/Sections.jsx";
import BackToTop from "./components/BackToTop.jsx";
import SiteHeader from "./components/SiteHeader.jsx";

const STORE = "bk-style";

function initialKey() {
  const fromUrl = new URLSearchParams(location.search).get("style");
  let saved = null;
  try { saved = localStorage.getItem(STORE); } catch {}
  const ok = (k) => heroes.some((h) => h.key === k && h.component);
  return [fromUrl, saved].find(ok) ?? heroes.find((h) => h.component).key;
}

export default function App() {
  const [active, setActive] = useState(initialKey);

  function select(key) {
    setActive(key);
    try { localStorage.setItem(STORE, key); } catch {}
    const url = new URL(location.href);
    url.searchParams.set("style", key);
    history.replaceState(null, "", url);
  }

  // In-page links (#work, #pricing...): scroll in JS so every browser lands exactly on the section's top edge. The fixed
  // header then sits over the section's own top padding (64px+), never over its title.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const id = a.getAttribute("href").slice(1);
      const el = id === "top" ? document.body : document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
      const y = id === "top" ? 0 : el.getBoundingClientRect().top + scrollY;
      scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
      history.replaceState(null, "", `${location.search}#${id}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const Hero = heroes.find((h) => h.key === active).component;
  return (
    <main id="top" data-hero={active}>
      <a className="skip-link" href="#work">Skip to content</a>
      <Hero content={content} heroes={heroes} active={active} onSelect={select} />
      <Sections content={content} />
      <SiteHeader content={content} />
      <BackToTop />
    </main>
  );
}
