import { calConfig, calPath, calReady } from "../cal.js";

// Pill with the arrow in its own circle. Heroes style it via className.
// A cal.com link opens the booking popup in place; it only falls back to a new tab if the embed hasn't loaded.
// `note` pre-fills the booking's notes, so Buruk sees which option the visitor clicked.
export default function PillButton({ href, children, className = "", note }) {
  const external = href.startsWith("http");
  const cal = calPath(href);
  const config = note ? { ...calConfig, notes: note } : calConfig;
  return (
    <a className={`pill ${className}`} href={href} {...(external && { target: "_blank", rel: "noopener" })}
      {...(cal && { "data-cal-link": cal, "data-cal-config": JSON.stringify(config), onClick: (e) => calReady() && e.preventDefault() })}>
      <span className="pill-label">{children}</span>
      <span className="pill-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 12 12 4M5.5 4H12v6.5" />
        </svg>
      </span>
    </a>
  );
}
