import { useState } from "react";
import { content } from "./content.js";
import { heroes } from "./heroes/index.js";
import Sections from "./sections/Sections.jsx";

const STORE = "bk-style";

function initialKey() {
  const fromUrl = new URLSearchParams(location.search).get("style");
  let saved = null;
  try { saved = localStorage.getItem(STORE); } catch {}
  const ok = (k) => heroes.some((h) => h.key === k && h.component);
  return [fromUrl, saved].find(ok) ?? heroes[0].key;
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

  const Hero = heroes.find((h) => h.key === active).component;
  return (
    <main id="top" data-hero={active}>
      <Hero content={content} heroes={heroes} active={active} onSelect={select} />
      <Sections content={content} />
    </main>
  );
}
