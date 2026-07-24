"use client";

import { FormEvent, useState } from "react";
import {
  defaultLocale,
  getTranslations,
  interpolate,
} from "@/lib/i18n";

const { content, messages } = getTranslations(defaultLocale);
const nav = [
  [messages.navigation.developmentArea, "#development-area"],
  [messages.navigation.pillars, "#pillars"],
  [messages.navigation.residential, "#residential"],
  [messages.navigation.educationCampus, "#education-campus"],
  [messages.navigation.seniorLiving, "#senior-living"],
  [messages.navigation.gallery, "#gallery"],
  [messages.navigation.contact, "#contact"],
];
const pillarAnchors = ["residential", "education-campus", "senior-living"] as const;

function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? "light" : ""}`} href="#top" aria-label={messages.accessibility.home}>
    <span className="brand-mark"><b>K</b><b>F</b></span>
    <span><strong>{content.brand.name}</strong><small>{content.brand.tagline}</small></span>
  </a>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true); e.currentTarget.reset(); }

  return <main className="site" id="top">
    <header className="header">
      <Brand light />
      <nav className="desktop-nav" aria-label={messages.accessibility.mainNavigation}>{nav.map(([text, href]) => <a key={href} href={href}>{text}</a>)}</nav>
      <a className="button gold header-cta" href="#contact">{messages.cta.contactProject}</a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={messages.accessibility.menu}>{menu ? "×" : "☰"}</button>
      {menu && <nav className="mobile-nav">{nav.map(([text, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{text}<span>→</span></a>)}<a href="#contact" onClick={() => setMenu(false)}>{messages.cta.contactProject}<span>→</span></a></nav>}
    </header>

    <section className="hero">
      <img src="/assets/hero/KMJ5_Hero_Night_v01.webp" alt={content.hero.imageAlt} className="cover" />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="kicker light-text">{content.hero.kicker}</p>
        <h1>{content.hero.title}<br/><em>{content.hero.titleEmphasis}</em></h1>
        <p>{content.hero.description}</p>
        <div className="hero-actions"><a className="button gold" href="#development-area">{messages.cta.exploreDevelopmentConcept} <span>→</span></a><a className="text-link light-link" href="#pillars">{messages.cta.details} <span>↓</span></a></div>
      </div>
      <div className="hero-meta">{content.hero.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
    </section>

    <section className="intro" id="development-area">
      <div><p className="kicker">{content.project.kicker}</p><h2>{content.project.title}<br/><em>{content.project.titleEmphasis}</em></h2></div>
      <div className="intro-copy">
        <p>{content.project.description}</p>
        <ul>{content.project.highlights.map((highlight) => <li key={highlight}>✓ {highlight}</li>)}</ul>
        <a className="text-link" href="#pillars">{messages.cta.details} <span>→</span></a>
      </div>
      <div className="intro-image"><img src="/assets/renders/exterior/KMJ5_Exterior_Sunset_v01.webp" alt={content.project.imageAlt} className="cover" /></div>
    </section>

    <section className="location" id="komarom">
      <div className="location-copy"><p className="kicker light-text">{content.location.kicker}</p><h2>{content.location.title}<br/><em>{content.location.titleEmphasis}</em></h2><p>{content.location.description}</p></div>
      <div className="location-grid">
        {content.location.places.map((place) => <article key={place.name}><b>{place.icon}</b><div><strong>{place.name}</strong><span>{place.time}</span></div></article>)}
      </div>
      <div className="map"><div className="map-grid"/><div className="river"/><span className="map-pin"><b>⌖</b>{content.location.mapAddress}<small>{content.location.mapCity}</small></span></div>
    </section>

    <section className="benefits" id="pillars">
      <div className="section-heading"><p className="kicker">{content.benefits.kicker}</p><h2>{content.benefits.title}<br/><em>{content.benefits.titleEmphasis}</em></h2></div>
      <div className="benefit-grid">
        {content.benefits.items.map((item, index) => <article id={pillarAnchors[index]} key={item.title}><span className="number">0{index + 1}</span><b className="benefit-icon">{item.icon}</b><h3>{item.title}</h3><p>{item.description}</p></article>)}
      </div>
    </section>

    <section className="gallery" id="gallery">
      <div className="gallery-heading"><div><p className="kicker light-text">{content.gallery.kicker}</p><h2>{content.gallery.title}<br/><em>{content.gallery.titleEmphasis}</em></h2></div><p>{content.gallery.description}</p></div>
      <div className="gallery-grid">
        <figure className="wide"><img src="/assets/renders/interior/KMJ5_Interior_Collection_v01.webp" alt={content.gallery.items[0].alt} className="cover"/><figcaption>{content.gallery.items[0].caption}</figcaption></figure>
        <figure><img src="/assets/smart-home/KMJ5_SmartHome_Livingroom_ParkView_v01.webp" alt={content.gallery.items[1].alt} className="cover"/><figcaption>{content.gallery.items[1].caption}</figcaption></figure>
        <figure className="full"><img src="/assets/smart-park/KMJ5_SmartPark_CentralLake_v01.webp" alt={content.gallery.items[2].alt} className="cover"/><figcaption>{content.gallery.items[2].caption}</figcaption></figure>
      </div>
    </section>

    {content.visibility.showResidentialSalesDetails && <section className="apartments" id="residential-sales">
      <div className="apartments-top"><div><p className="kicker">{content.apartments.kicker}</p><h2>{content.apartments.title}<br/><em>{content.apartments.titleEmphasis}</em></h2></div><p>{content.apartments.description}</p></div>
      <div className="apartment-list">{content.apartments.items.map((apartment, index) => <article key={apartment.rooms}><span className="ap-index">0{index + 1}</span><div><h3>{apartment.rooms}</h3><p>{apartment.note}</p></div><strong>{apartment.area}</strong><span>{apartment.level}</span><a href="#erdeklodes" aria-label={interpolate(messages.accessibility.inquiryFor, { unit: apartment.rooms })}>›</a></article>)}</div>
    </section>}

    <section className="interest" id="project-contact">
      <div className="interest-copy"><p className="kicker light-text">{content.interest.kicker}</p><h2>{content.interest.title}<br/><em>{content.interest.titleEmphasis}</em></h2><p>{content.interest.description}</p><div className="privacy"><b>◇</b><span>{content.interest.privacy}</span></div></div>
      {sent ? <div className="success" role="status"><b>✓</b><h3>{messages.forms.successTitle}</h3><p>{messages.forms.successMessage}</p><button onClick={() => setSent(false)}>{messages.cta.newInquiry}</button></div> :
      <form className="form" onSubmit={submit}>
        <label><span>{messages.forms.name}</span><input name="name" autoComplete="name" required placeholder={messages.forms.namePlaceholder}/></label>
        <label><span>{messages.forms.email}</span><input name="email" type="email" autoComplete="email" required placeholder={messages.forms.emailPlaceholder}/></label>
        <label><span>{messages.forms.phone}</span><input name="phone" type="tel" autoComplete="tel" placeholder={messages.forms.phonePlaceholder}/></label>
        <label><span>{messages.forms.subject}</span><select name="interest" defaultValue=""><option value="" disabled>{messages.forms.select}</option><option value="investment">{messages.forms.investment}</option><option value="development-partnership">{messages.forms.developmentPartnership}</option><option value="education-partnership">{messages.forms.educationPartnership}</option><option value="senior-living-partnership">{messages.forms.seniorLivingPartnership}</option><option value="residential-interest">{messages.forms.residentialInterest}</option><option value="other">{messages.forms.other}</option></select></label>
        <label className="consent"><input type="checkbox" required/><span>{messages.forms.consent}</span></label>
        <button className="button gold" type="submit">{messages.cta.contactProject} <span>→</span></button>
      </form>}
    </section>

    <section className="contact" id="contact">
      <Brand/><div><p className="kicker">{messages.common.contact}</p><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a><a href={`tel:${content.contact.phoneHref}`}>{content.contact.phoneDisplay}</a></div><div><p className="kicker">{messages.common.projectContact}</p><address>{content.contact.postalCode} {content.contact.city}<br/>{content.contact.street}</address></div><a className="button dark" href="#project-contact">{messages.cta.partnerConsultation} <span>→</span></a>
    </section>
    <footer><span>{content.contact.copyright}</span><div><a href="#">{messages.common.privacy}</a><a href="#">{messages.common.imprint}</a></div><a href="#top">{messages.common.backToTop} ↑</a></footer>
  </main>;
}
