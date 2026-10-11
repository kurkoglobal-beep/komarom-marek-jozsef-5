import Image from "next/image";
import Link from "next/link";
import type { Messages } from "@/lib/i18n";

export function HomeAppEntry({ messages }: { messages: Messages }) {
  const copy = messages.homeExperience;
  return <section className="home-app-entry" aria-labelledby="home-app-entry-title">
    <form className="home-quick-search" action="/lakasok" method="get">
      <div className="home-quick-search__intro"><span>{copy.searchEyebrow}</span><strong>{copy.searchTitle}</strong></div>
      <label><span>{messages.sales.rooms}</span><select name="rooms" defaultValue=""><option value="">{messages.sales.all}</option><option value="2">2</option><option value="3">3</option></select></label>
      <label><span>{copy.minimumArea}</span><select name="minArea" defaultValue=""><option value="">{messages.sales.all}</option><option value="50">50 m²</option><option value="60">60 m²</option><option value="75">75 m²</option></select></label>
      <button className="button gold" type="submit">{messages.cta.viewApartments}<span aria-hidden="true">→</span></button>
    </form>
    <div className="home-entry-heading"><p className="kicker">{copy.entryEyebrow}</p><h2 id="home-app-entry-title">{copy.entryTitle}<br/><em>{copy.entryEmphasis}</em></h2></div>
    <div className="home-entry-grid">
      <Link className="home-entry-card home-entry-card--primary" href="/masterplan"><Image src="/assets/masterplan/KMJ5_HomeEntry_MasterplanDiscovery_v04.webp" alt={copy.masterplanAlt} fill sizes="(max-width:760px) 100vw, 50vw"/><span className="home-entry-card__overlay"><small>{copy.primary}</small><strong>{copy.masterplan}</strong><b aria-hidden="true">→</b></span></Link>
      <Link className="home-entry-card home-entry-card--primary" href="/lakasok"><Image src="/assets/apartments/type-a/KMJ5_A201_Livingroom_v01.webp" alt={copy.apartmentsAlt} fill sizes="(max-width:760px) 100vw, 50vw"/><span className="home-entry-card__overlay"><small>{copy.primary}</small><strong>{copy.apartments}</strong><b aria-hidden="true">→</b></span></Link>
      <Link className="home-entry-card home-entry-card--secondary" href="/kedvencek"><span aria-hidden="true">♡</span><strong>{copy.favorites}</strong><b aria-hidden="true">→</b></Link>
      <Link className="home-entry-card home-entry-card--secondary" href="/projekt"><span aria-hidden="true">◇</span><strong>{copy.project}</strong><b aria-hidden="true">→</b></Link>
    </div>
  </section>;
}
