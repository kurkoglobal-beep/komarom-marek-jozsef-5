import Image from "next/image";
import Link from "next/link";
import type { Messages } from "@/lib/i18n";
import { formatArea, getTotalArea } from "@/lib/sales/data";
import type { UnitView } from "@/types/sales";
import { FavoriteButton } from "@/components/sales/FavoriteButton";
import { statusLabel } from "@/components/sales/UnitCard";

export function FeaturedUnits({ units, messages }: { units: UnitView[]; messages: Messages }) {
  const copy = messages.homeExperience;
  return <section className="featured-units" aria-labelledby="featured-units-title">
    <header><div><p className="kicker">{copy.featuredEyebrow}</p><h2 id="featured-units-title">{copy.featuredTitle}<br/><em>{copy.featuredEmphasis}</em></h2></div><Link className="text-link" href="/lakasok">{messages.cta.viewApartments}<span aria-hidden="true">→</span></Link></header>
    <div className="featured-units__track">{units.map((unit) => <article className="featured-unit" key={unit.id}>
      <div className="featured-unit__image"><Image src={unit.presentation.floorPlanSrc} alt={`${unit.unitNumber} – ${messages.sales.floorPlan}`} fill sizes="(max-width:760px) 86vw, 33vw"/><FavoriteButton unitId={unit.id} compact/></div>
      <div className="featured-unit__body"><div><span className={`unit-status ${unit.availabilityStatus}`}>{statusLabel(unit.availabilityStatus)}</span><small>{unit.building.name} · {unit.floor.name}</small></div><h3>{unit.unitNumber}</h3>
        <dl><div><dt>{messages.sales.rooms}</dt><dd>{unit.roomCount}</dd></div><div><dt>{messages.sales.totalArea}</dt><dd>{formatArea(String(getTotalArea(unit)))}</dd></div></dl>
        <div className="featured-unit__footer"><strong>{messages.sales.pricePending}</strong><Link href={`/lakasok/${unit.id}`}>{messages.sales.openUnit}<span aria-hidden="true">→</span></Link></div>
      </div>
    </article>)}</div>
  </section>;
}
