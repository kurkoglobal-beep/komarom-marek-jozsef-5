"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
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
const heroIntervalMs = 8_000;

function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? "light" : ""}`} href="#top" aria-label={messages.accessibility.home}>
    <span className="brand-mark"><b>K</b><b>F</b></span>
    <span><strong>{content.brand.name}</strong><small>{content.brand.tagline}</small></span>
  </a>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % content.hero.slides.length);
    }, heroIntervalMs);

    return () => window.clearInterval(interval);
  }, []);

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
      <div className="hero-media" role="img" aria-label={content.hero.slides[heroIndex].alt}>
        {content.hero.slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            sizes="100vw"
            preload={index === 0}
            loading={index === 0 || index === heroIndex ? undefined : "lazy"}
            className={`hero-slide ${index === heroIndex ? "active" : ""}`}
          />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="kicker light-text">{content.hero.kicker}</p>
        <h1>{content.hero.title}</h1>
        <p className="hero-description">{content.hero.description.map((line) => <span key={line}>{line}</span>)}</p>
        <div className="hero-actions"><a className="button gold" href="#project-contact">{messages.cta.partnerConsultation} <span>→</span></a><a className="text-link light-link" href="#development-area">{messages.cta.exploreDevelopmentConcept} <span>↓</span></a></div>
        <div className="hero-indicators" role="group" aria-label={messages.accessibility.heroCarousel}>
          {content.hero.slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={index === heroIndex ? "active" : ""}
              aria-current={index === heroIndex ? "true" : undefined}
              aria-label={interpolate(messages.accessibility.selectHeroSlide, { slide: `${index + 1}`, title: slide.label })}
              onClick={() => setHeroIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>

    <section className="development-area" id="development-area">
      <div className="development-copy">
        <p className="kicker">{content.project.kicker}</p>
        <h2>{content.project.title}<br/><em>{content.project.titleEmphasis}</em></h2>
        <p className="development-lead">{content.project.description}</p>
        <div className="development-features">
          {content.project.features.map((feature) => <article key={feature.title}>
            <span className="development-icon" aria-hidden="true">{feature.icon}</span>
            <div><h3>{feature.title}</h3><p>{feature.description}</p></div>
          </article>)}
        </div>
      </div>
      <figure className="development-visual">
        <Image src={content.project.imageSrc} alt={content.project.imageAlt} fill sizes="(max-width: 1050px) 100vw, 48vw" className="cover" />
      </figure>
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
        {content.benefits.items.map((item, index) => <article id={pillarAnchors[index]} key={item.title} onMouseEnter={index < 3 ? () => setHeroIndex(index + 1) : undefined} onFocus={index < 3 ? () => setHeroIndex(index + 1) : undefined}><span className="number">0{index + 1}</span><b className="benefit-icon">{item.icon}</b><h3>{item.title}</h3><p>{item.description}</p></article>)}
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
