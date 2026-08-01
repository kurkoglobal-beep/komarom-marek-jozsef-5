export function LocationCard({ name, description, verification, active, onSelect }: { name: string; description: string; verification: string; active: boolean; onSelect: () => void }) {
  return <button type="button" className={`location-discovery-card ${active ? "active" : ""}`} aria-pressed={active} onMouseEnter={onSelect} onFocus={onSelect} onClick={onSelect}>
    <span className="location-discovery-card__index" aria-hidden="true">⌖</span>
    <span><strong>{name}</strong><small>{description}</small><em>{verification}</em></span>
    <i aria-hidden="true">→</i>
  </button>;
}
