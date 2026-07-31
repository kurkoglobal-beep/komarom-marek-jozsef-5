import Image from "next/image";
import Link from "next/link";
import { defaultLocale, getTranslations } from "@/lib/i18n";

const { content, messages } = getTranslations(defaultLocale);

export default function ProjectPage() {
  return <main className="marketing-subpage">
    <section className="marketing-page-hero"><p>{content.project.kicker}</p><h1>{content.project.title}<br/><em>{content.project.titleEmphasis}</em></h1><span>{content.project.description}</span></section>
    <section className="project-overview">
      <div><p className="kicker">{content.location.kicker}</p><h2>{content.location.title}<br/><em>{content.location.titleEmphasis}</em></h2><p>{content.location.description}</p></div>
      <figure><Image src={content.project.imageSrc} alt={content.project.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw"/></figure>
    </section>
    <section className="project-pillars"><header><p className="kicker">{content.benefits.kicker}</p><h2>{content.benefits.title}<br/><em>{content.benefits.titleEmphasis}</em></h2></header><div>{content.benefits.items.slice(0,3).map((item) => <article key={item.title}><span aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
    <section className="project-next"><div><p className="kicker light-text">{content.residentialMasterplan.kicker}</p><h2>{content.residentialMasterplan.title} <em>{content.residentialMasterplan.titleEmphasis}</em></h2><p>{content.residentialMasterplan.description}</p></div><div><Link className="button gold" href="/masterplan">{messages.sales.masterplan} →</Link><Link className="button outline" href="/lakasok">{messages.sales.apartments} →</Link></div></section>
  </main>;
}
