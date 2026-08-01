import type { LocationCategory } from "@/types/experience";

const categories: LocationCategory[] = ["transport", "education", "healthcare", "shopping", "sport", "nature", "regional"];

export function MapCategoryFilter({ active, labels, allLabel, ariaLabel, onSelect }: { active: LocationCategory | null; labels: Record<LocationCategory, string>; allLabel: string; ariaLabel: string; onSelect: (category: LocationCategory | null) => void }) {
  return <div className="location-category-filter" role="group" aria-label={ariaLabel}>
    <button type="button" className={active === null ? "active" : ""} aria-pressed={active === null} onClick={() => onSelect(null)}>{allLabel}</button>
    {categories.map((category) => <button key={category} type="button" className={active === category ? "active" : ""} aria-pressed={active === category} onClick={() => onSelect(category)}>{labels[category]}</button>)}
  </div>;
}
