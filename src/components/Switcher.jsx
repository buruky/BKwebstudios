// "←— 01 NAME —→". The arrows step through the built heroes. Each hero passes its own className to place and restyle it.
export default function Switcher({ heroes, active, onSelect, className = "" }) {
  const index = heroes.findIndex((h) => h.key === active);
  const built = heroes.filter((h) => h.component);
  const step = (dir) => {
    const i = built.findIndex((h) => h.key === active);
    onSelect(built[(i + dir + built.length) % built.length].key);
  };
  return (
    <div className={`switcher ${className}`} role="group" aria-label="Site style">
      <button type="button" className="switcher-step switcher-prev" aria-label="Previous style" onClick={() => step(-1)}>
        <span aria-hidden="true" />
      </button>
      <span className="switcher-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <span className="switcher-name" aria-live="polite">{heroes[index].name}</span>
      <button type="button" className="switcher-step switcher-next" aria-label="Next style" onClick={() => step(1)}>
        <span aria-hidden="true" />
      </button>
    </div>
  );
}
