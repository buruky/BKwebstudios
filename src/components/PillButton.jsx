// Pill with the arrow in its own circle. Heroes style it via className.
export default function PillButton({ href, children, className = "" }) {
  const external = href.startsWith("http");
  return (
    <a className={`pill ${className}`} href={href} {...(external && { target: "_blank", rel: "noopener" })}>
      <span className="pill-label">{children}</span>
      <span className="pill-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 12 12 4M5.5 4H12v6.5" />
        </svg>
      </span>
    </a>
  );
}
