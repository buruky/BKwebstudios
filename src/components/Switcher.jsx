// "01 ●○○○○ NAME". Each hero passes its own className to place and restyle it.
export default function Switcher({ heroes, active, onSelect, className = "" }) {
  const index = heroes.findIndex((h) => h.key === active);
  return (
    <div className={`switcher ${className}`} role="group" aria-label="Site style">
      <span className="switcher-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className="switcher-dots">
        {heroes.map((h, i) => (
          <button
            key={h.key}
            type="button"
            className="switcher-dot"
            aria-pressed={h.key === active}
            aria-label={`Style ${i + 1}: ${h.name}`}
            title={h.name}
            disabled={!h.component}
            onClick={() => onSelect(h.key)}
          />
        ))}
      </div>
      <span className="switcher-name">{heroes[index].name}</span>
    </div>
  );
}
