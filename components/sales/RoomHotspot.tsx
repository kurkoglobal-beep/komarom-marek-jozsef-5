export interface RoomHotspotItem { id: string; label: string; x: number; y: number }

export function RoomHotspot({ item, active, onSelect }: { item: RoomHotspotItem; active: boolean; onSelect: () => void }) {
  return <button type="button" className={`room-hotspot ${active ? "active" : ""}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-label={item.label} aria-pressed={active} onClick={onSelect}><span aria-hidden="true"/><b>{item.label}</b></button>;
}
