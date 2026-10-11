import Image from "next/image";

type LocationCardProps = {
  poiId: string;
  name: string;
  category: string;
  description: string;
  verification: string;
  thumbnailSrc: string;
  thumbnailPosition: string;
  active: boolean;
  dimmed: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onPreviewEnd: () => void;
};

export function LocationCard({ poiId, name, category, description, verification, thumbnailSrc, thumbnailPosition, active, dimmed, onSelect, onPreview, onPreviewEnd }: LocationCardProps) {
  return <button
    type="button"
    data-poi={poiId}
    className={`location-discovery-card ${active ? "active" : ""} ${dimmed ? "dimmed" : ""}`}
    aria-pressed={active}
    onMouseEnter={onPreview}
    onMouseLeave={onPreviewEnd}
    onFocus={onPreview}
    onBlur={onPreviewEnd}
    onClick={onSelect}
  >
    <span className="location-discovery-card__thumbnail" aria-hidden="true">
      <Image src={thumbnailSrc} alt="" fill sizes="80px" style={{ objectPosition: thumbnailPosition }} unoptimized/>
    </span>
    <span className="location-discovery-card__content">
      <span className="location-discovery-card__meta">{category}</span>
      <strong>{name}</strong>
      <small>{description}</small>
      <em>{verification}</em>
    </span>
    <i aria-hidden="true">↗</i>
  </button>;
}
