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
const pillarAnchors = ["residential", "education-campus", "senior-living", "common-space"] as const;
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
  const [activeHotspot, setActiveHotspot] = useState(0);
  const [activePlace, setActivePlace] = useState(0);
  const [locationVisible, setLocationVisible] = useState(false);
  const [locationTimes, setLocationTimes] = useState(() => content.location.places.map(() => 0));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % content.hero.slides.length);
    }, heroIntervalMs);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = document.getElementById("komarom");
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLocationVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.22 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!locationVisible) return;

    const targets = content.location.places.map((place) => place.minutes);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 1_250;
    const startedAt = window.performance.now();
    let animationFrame = 0;
    const animate = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setLocationTimes(targets.map((target) => Math.round(target * eased)));
      if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
    };
    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [locationVisible]);

  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true); e.currentTarget.reset(); }

  const selectedPlace = content.location.places[activePlace];
  const routeControlX = (50 + selectedPlace.mapX) / 2;
  const routeControlY = Math.max(12, Math.min(55, selectedPlace.mapY) - 18);
  const routePath = `M 50 55 Q ${routeControlX} ${routeControlY} ${selectedPlace.mapX} ${selectedPlace.mapY}`;

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
      <div className="development-map">
        <figure className="development-visual">
          <Image src={content.project.imageSrc} alt={content.project.imageAlt} fill sizes="(max-width: 1050px) 100vw, 48vw" className="cover" />
          <div className="hotspot-layer" role="group" aria-label={content.project.mapLabel}>
            {content.project.hotspots.map((hotspot, index) => <button
              key={hotspot.title}
              type="button"
              className={`hotspot ${index === activeHotspot ? "active" : ""}`}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-label={hotspot.title}
              aria-pressed={index === activeHotspot}
              aria-controls="development-hotspot-card"
              onMouseEnter={() => setActiveHotspot(index)}
              onFocus={() => setActiveHotspot(index)}
              onClick={() => setActiveHotspot(index)}
            ><span>{hotspot.icon}</span></button>)}
          </div>
          <figcaption className="hotspot-info-card" id="development-hotspot-card" aria-live="polite">
            <span className="hotspot-card-icon" aria-hidden="true">{content.project.hotspots[activeHotspot].icon}</span>
            <div><small>{content.project.mapCardLabel}</small><h3>{content.project.hotspots[activeHotspot].title}</h3><p>{content.project.hotspots[activeHotspot].description}</p></div>
          </figcaption>
        </figure>
        <div className="hotspot-mobile-list" aria-label={content.project.mapLabel}>
          {content.project.hotspots.map((hotspot, index) => <button
            key={hotspot.title}
            type="button"
            className={index === activeHotspot ? "active" : ""}
            aria-pressed={index === activeHotspot}
            onClick={() => setActiveHotspot(index)}
          ><span aria-hidden="true">{hotspot.icon}</span><strong>{hotspot.title}</strong><small>{hotspot.description}</small></button>)}
        </div>
      </div>
    </section>

    <section className="location" id="komarom">
      <div className="location-copy"><p className="kicker light-text">{content.location.kicker}</p><h2>{content.location.title}<br/><em>{content.location.titleEmphasis}</em></h2><p>{content.location.description}</p></div>
      <div className="location-grid" role="group" aria-label={content.location.placesLabel}>
        {content.location.places.map((place, index) => <button
          type="button"
          key={place.name}
          className={index === activePlace ? "active" : ""}
          aria-pressed={index === activePlace}
          onMouseEnter={() => setActivePlace(index)}
          onFocus={() => setActivePlace(index)}
          onClick={() => setActivePlace(index)}
        ><b aria-hidden="true">{place.icon}</b><div><strong>{place.name}</strong><span><span className="location-count">{locationTimes[index]}</span> {content.location.timeUnit}</span></div><i>→</i></button>)}
      </div>
      <div className="map" role="img" aria-label={content.location.mapAriaLabel}>
        <div className="map-grid"/>
        <div className="river"/>
        <div className="isochrones" aria-hidden="true">
          {content.location.isochrones.map((zone, index) => <span key={zone} className={`isochrone zone-${index}`}><small>{zone}</small></span>)}
        </div>
        <svg className="route-map" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path key={`glow-${selectedPlace.name}`} className="route-glow" d={routePath}/>
          <path key={selectedPlace.name} className="route-line" d={routePath}/>
        </svg>
        <span className={`destination-marker ${selectedPlace.mapX > 70 ? "align-right" : ""}`} style={{ left: `${selectedPlace.mapX}%`, top: `${selectedPlace.mapY}%` }}>
          <b aria-hidden="true">{selectedPlace.icon}</b><span>{selectedPlace.name}<small>{selectedPlace.minutes} {content.location.timeUnit}</small></span>
        </span>
        <span className="map-pin"><b aria-hidden="true">⌖</b>{content.location.mapAddress}<small>{content.location.mapCity}</small></span>
        <span className="map-legend">{content.location.routeLegend}: <strong>{selectedPlace.name}</strong></span>
      </div>
    </section>

    <section className="pillars-showcase" id="pillars">
      <div className="pillars-heading">
        <p className="kicker light-text">{content.benefits.kicker}</p>
        <h2>{content.benefits.title}<br/><em>{content.benefits.titleEmphasis}</em></h2>
      </div>
      <dl className="pillar-facts">
        {content.benefits.facts.map((fact) => <div key={fact.label}><dt>{fact.value}</dt><dd>{fact.label}</dd></div>)}
      </dl>
      <p className="pillar-mobile-hint">{content.benefits.mobileHint} <span aria-hidden="true">↔</span></p>
      <div className="pillar-masterplan-scroll">
        <figure className="pillar-masterplan">
          <Image src="/assets/masterplan/KMJ5_Masterplan_DevelopmentPillars_v01.webp" alt={content.benefits.imageAlt} width={1672} height={941} sizes="(max-width: 760px) 880px, 86vw"/>
          <span className="masterplan-scrim" aria-hidden="true"/>
          <figcaption>{content.benefits.footerLine}</figcaption>
        </figure>
      </div>
      <div className="pillar-cards">
        {content.benefits.items.map((item, index) => <article id={pillarAnchors[index]} key={item.title} tabIndex={0} onMouseEnter={index < 3 ? () => setHeroIndex(index + 1) : undefined} onFocus={index < 3 ? () => setHeroIndex(index + 1) : undefined}>
          <span className="pillar-number">0{index + 1}</span>
          <b className="pillar-icon" aria-hidden="true">{item.icon}</b>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>)}
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
