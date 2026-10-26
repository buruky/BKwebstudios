import { useEffect, useState } from "react";
import PillButton from "./PillButton.jsx";

// Clean header for the rest of the site: slides down once the sections have covered the hero, the same under every
// hero. Underlines the section you are in. Other pages (/work) pass `always` and a `home` link for the logo.
export default function SiteHeader({ content, always = false, home = "#top" }) {
  const [show, setShow] = useState(always);
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const ids = content.nav.map((n) => n.href.slice(1));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const first = document.getElementById(ids[0]);
        setShow(always || (!!first && first.getBoundingClientRect().top < 72));
        // the last section whose top has passed under the header
        const here = ids.filter((id) => document.getElementById(id)?.getBoundingClientRect().top < 140).at(-1);
        // Contact is the last section and too short to scroll its top under the header, so at the very bottom of
        // the page it counts as the current one.
        const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
        setCurrent(atBottom ? ids.at(-1) : here ?? null);
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [content.nav, always]);

  return (
    <header className={`site-header ${show ? "site-header-on" : ""}`} aria-hidden={!show} inert={!show}>
      <a className="site-brand" href={home} aria-label={`${content.name}, ${home === "#top" ? "back to top" : "home"}`}>
        <span className="site-mark" aria-hidden="true">bk</span>
        <span className="site-name">{content.name}</span>
      </a>
      <nav className="site-nav" aria-label="Sections">
        {content.nav.map((n) => (
          <a key={n.href} href={n.href} aria-current={current === n.href.slice(1) ? "location" : undefined}>{n.label}</a>
        ))}
      </nav>
      <PillButton className="site-book" href={content.primary.href}>{content.primary.label}</PillButton>
    </header>
  );
}
