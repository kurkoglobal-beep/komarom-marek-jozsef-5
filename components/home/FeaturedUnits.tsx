import Link from "next/link";
import type { Messages } from "@/lib/i18n";
import type { UnitView } from "@/types/sales";
import { FeaturedUnitCarousel } from "./FeaturedUnitCarousel";

export function FeaturedUnits({ units, messages }: { units: UnitView[]; messages: Messages }) {
  const copy = messages.homeExperience;
  return <section className="featured-units" aria-labelledby="featured-units-title">
    <header><div><p className="kicker">{copy.featuredEyebrow}</p><h2 id="featured-units-title">{copy.featuredTitle}<br/><em>{copy.featuredEmphasis}</em></h2></div><Link className="text-link" href="/lakasok">{messages.cta.viewApartments}<span aria-hidden="true">→</span></Link></header>
    <FeaturedUnitCarousel units={units} previousLabel={messages.experience.media.previousView} nextLabel={messages.experience.media.nextView}/>
  </section>;
}
