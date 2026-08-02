import Link from "next/link";
import type { UnitView } from "@/types/sales";
import { formatArea, getTotalArea } from "@/lib/sales/data";
import { getUnitMedia } from "@/lib/experience/data";
import { FavoriteButton } from "./FavoriteButton";
import { UnitInteractivePreview } from "./UnitInteractivePreview";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const { messages } = getTranslations(defaultLocale);
export const statusLabel = (status: UnitView["availabilityStatus"]) => ({coming_soon:messages.status.comingSoon,available:messages.status.available,temporarily_reserved:messages.status.temporarilyReserved,reserved:messages.status.reserved,sold:messages.status.sold,not_for_sale:messages.status.notForSale}[status]);
export function UnitCard({ unit, featured = false }: { unit: UnitView; featured?: boolean }) {
  const { items } = getUnitMedia(unit);
  return <article className={`unit-card unit-card--interactive ${featured ? "unit-card--featured" : ""}`}>
    <div className="unit-card-media"><FavoriteButton unitId={unit.id} compact/><UnitInteractivePreview items={items} unitNumber={unit.unitNumber} messages={messages} priority={featured}/></div>
    <div className="unit-card-body"><div><span className={`unit-status ${unit.availabilityStatus}`}>{statusLabel(unit.availabilityStatus)}</span><small>{unit.building.name} · {unit.floor.name}</small></div><h2>{unit.unitNumber}</h2><dl><div><dt>{messages.sales.rooms}</dt><dd>{unit.roomCount}</dd></div><div><dt>{messages.sales.totalArea}</dt><dd>{formatArea(String(getTotalArea(unit)))}</dd></div><div><dt>{messages.sales.outdoor}</dt><dd>{formatArea(unit.terraceArea ?? unit.gardenArea)}</dd></div></dl><div className="unit-card-footer"><strong>{messages.sales.pricePending}</strong><span>{unit.orientations.join(" · ")}</span></div><Link className="unit-card-cta" href={`/lakasok/${unit.id}`}>{messages.sales.openUnit}<span aria-hidden="true">→</span></Link></div>
  </article>;
}
