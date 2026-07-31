import Image from "next/image";
import Link from "next/link";
import type { UnitView } from "@/types/sales";
import { formatArea } from "@/lib/sales/data";
import { FavoriteButton } from "./FavoriteButton";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const { messages } = getTranslations(defaultLocale);
export const statusLabel = (status: UnitView["availabilityStatus"]) => ({coming_soon:messages.status.comingSoon,available:messages.status.available,temporarily_reserved:messages.status.temporarilyReserved,reserved:messages.status.reserved,sold:messages.status.sold,not_for_sale:messages.status.notForSale}[status]);
export function UnitCard({ unit }: { unit: UnitView }) { return <article className="unit-card"><div className="unit-card-image"><Image src={unit.presentation.floorPlanSrc} alt={`${unit.unitNumber} alaprajza`} fill sizes="(max-width: 760px) 100vw, 33vw"/><FavoriteButton unitId={unit.id} compact/></div><div className="unit-card-body"><div><span className={`unit-status ${unit.availabilityStatus}`}>{statusLabel(unit.availabilityStatus)}</span><small>{unit.building.name} · {unit.floor.name}</small></div><h2>{unit.unitNumber}</h2><dl><div><dt>{messages.sales.rooms}</dt><dd>{unit.roomCount}</dd></div><div><dt>{messages.sales.area}</dt><dd>{formatArea(unit.interiorArea)}</dd></div><div><dt>{messages.sales.outdoor}</dt><dd>{formatArea(unit.terraceArea ?? unit.gardenArea)}</dd></div></dl><div className="unit-card-footer"><span>{unit.orientations.join(" · ")}</span><Link href={`/lakasok/${unit.id}`}>{messages.sales.openUnit} →</Link></div></div></article>; }
