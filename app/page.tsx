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
const pillarAnchors = ["residential-pillar", "education-campus-pillar", "senior-living-pillar", "common-space"] as const;
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
  const [activeResidentialBuilding, setActiveResidentialBuilding] = useState(0);
  const [residentialPhase, setResidentialPhase] = useState<"all" | "1" | "2">("all");
  const [masterplanZoom, setMasterplanZoom] = useState(1);
  const [activeCampusMode, setActiveCampusMode] = useState(0);
  const [activeCampusHotspot, setActiveCampusHotspot] = useState(0);
  const [activeSeniorMode, setActiveSeniorMode] = useState(0);
  const [activeSeniorHotspot, setActiveSeniorHotspot] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(5);
  const [investmentCategory, setInvestmentCategory] = useState(0);
  const [investmentYears, setInvestmentYears] = useState(7);
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
  const selectedResidentialBuilding = content.residentialMasterplan.buildings[activeResidentialBuilding];
  const selectedCampusHotspot = content.educationCampus.hotspots[activeCampusHotspot];
  const selectedSeniorHotspot = content.seniorLiving.hotspots[activeSeniorHotspot];
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

    <section className="residential-masterplan-section" id="residential">
      <div className="residential-masterplan-heading">
        <div><p className="kicker">{content.residentialMasterplan.kicker}</p><h2>{content.residentialMasterplan.title}<br/><em>{content.residentialMasterplan.titleEmphasis}</em></h2></div>
        <p>{content.residentialMasterplan.description}</p>
      </div>
      <div className="residential-explorer">
        <div className="residential-map-panel">
          <div className="res-map-viewport" role="group" aria-label={content.residentialMasterplan.mapAriaLabel}>
            <div className="res-map-image-layer" style={{ transform: `scale(${masterplanZoom})` }}>
              <Image src="/assets/masterplan/KMJ5_Residential_InteractiveMasterplan_v01.webp" alt="" fill sizes="(max-width: 980px) 100vw, 58vw"/>
              {content.residentialMasterplan.buildings.map((building, index) => {
                const filtered = residentialPhase !== "all" && residentialPhase !== building.phase;
                return <button
                  key={building.id}
                  className={`res-building-marker ${index === activeResidentialBuilding ? "active" : ""} ${filtered ? "filtered" : ""}`}
                  style={{ left: `${building.x}%`, top: `${building.y}%` }}
                  aria-label={`${building.id} ${content.residentialMasterplan.buildingLabel}`}
                  aria-pressed={index === activeResidentialBuilding}
                  disabled={filtered}
                  onMouseEnter={() => !filtered && setActiveResidentialBuilding(index)}
                  onFocus={() => !filtered && setActiveResidentialBuilding(index)}
                  onClick={() => setActiveResidentialBuilding(index)}
                ><span>{building.id}</span></button>;
              })}
            </div>
            <div className="res-building-card" aria-live="polite">
              <span>{selectedResidentialBuilding.id} {content.residentialMasterplan.buildingLabel}</span>
              <strong>{selectedResidentialBuilding.units} · {content.residentialMasterplan.floorLabel}</strong>
              <div>{content.residentialMasterplan.features.map((feature, index) => <small key={feature}><b aria-hidden="true">{["⌂", "⌁", "☀", "≈"][index]}</b>{feature}</small>)}</div>
            </div>
            <div className="res-map-controls">
              <button type="button" aria-label={content.residentialMasterplan.zoomIn} onClick={() => setMasterplanZoom((zoom) => Math.min(1.18, zoom + .06))}>+</button>
              <button type="button" aria-label={content.residentialMasterplan.zoomOut} onClick={() => setMasterplanZoom((zoom) => Math.max(1, zoom - .06))}>−</button>
              <button type="button" aria-label={content.residentialMasterplan.resetView} onClick={() => setMasterplanZoom(1)}>⌾</button>
            </div>
            <div className="res-phase-filter" aria-label={content.residentialMasterplan.phaseFilter}>
              <span>{content.residentialMasterplan.phaseFilter}</span>
              {([
                ["all", content.residentialMasterplan.allPhases],
                ["1", content.residentialMasterplan.phaseOne],
                ["2", content.residentialMasterplan.phaseTwo],
              ] as const).map(([value, label]) => <button key={value} type="button" className={residentialPhase === value ? "active" : ""} aria-pressed={residentialPhase === value} onClick={() => setResidentialPhase(value)}>{label}</button>)}
            </div>
          </div>
        </div>

        <article className="apartment-detail-panel">
          <header>
            <div><p>{selectedResidentialBuilding.id}-2.01 <span>|</span> {content.residentialMasterplan.apartment.title}</p><small>{content.residentialMasterplan.apartment.floor}</small></div>
            <span>{content.residentialMasterplan.apartment.counter}</span>
          </header>
          <div className="apartment-floorplan">
            <Image src="/assets/floorplans/KMJ5_A201_Floorplan_v01.webp" alt={content.residentialMasterplan.apartment.floorplanAlt} width={455} height={530} sizes="(max-width: 980px) 90vw, 36vw"/>
          </div>
          <p className="apartment-area-formula">{content.residentialMasterplan.apartment.areaFormula}</p>
          <div className="apartment-secondary">
            <div className="apartment-axon">
              <Image src="/assets/apartments/type-a/KMJ5_A201_Axonometric_v01.webp" alt={content.residentialMasterplan.apartment.axonometricAlt} width={410} height={370} sizes="(max-width: 620px) 86vw, 24vw"/>
            </div>
            <dl>{content.residentialMasterplan.apartment.specs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
          </div>
          <div className="apartment-gallery">{content.residentialMasterplan.apartment.gallery.map((item) => <figure key={item.src}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 620px) 28vw, 12vw"/></figure>)}</div>
          <div className="apartment-actions">
            <a className="button dark" href="#project-contact">{content.residentialMasterplan.apartment.cta} <span>→</span></a>
            <a className="floorplan-download" href="/assets/documents/KMJ5_Residential_GroundFloorPlan_v01.pdf" download>{content.residentialMasterplan.apartment.download} <span>↓</span></a>
          </div>
        </article>
      </div>
    </section>

    <section className="education-campus-section" id="education-campus">
      <div className="campus-heading">
        <div>
          <p className="kicker">{content.educationCampus.kicker}</p>
          <h2>{content.educationCampus.title}<br/><em>{content.educationCampus.titleEmphasis}</em></h2>
        </div>
        <p>{content.educationCampus.description}</p>
      </div>

      <div className="campus-simulator">
        <div className="campus-timeline" role="tablist" aria-label={content.educationCampus.timelineLabel}>
          {content.educationCampus.modes.map((mode, index) => <button
            key={mode.time}
            type="button"
            role="tab"
            aria-selected={activeCampusMode === index}
            className={activeCampusMode === index ? "active" : ""}
            onClick={() => {
              setActiveCampusMode(index);
              setActiveCampusHotspot(index);
            }}
          >
            <span aria-hidden="true">{mode.icon}</span>
            <strong>{mode.time}</strong>
            <small>{mode.label}</small>
          </button>)}
        </div>

        <figure className="campus-visual">
          <Image
            src="/assets/education-campus/KMJ5_EducationCampus_Cutaway_v01.webp"
            alt={content.educationCampus.imageAlt}
            fill
            sizes="(max-width: 760px) 1160px, 94vw"
          />
          <span className="campus-image-shade" aria-hidden="true"/>
          <div className="campus-hotspots" role="group" aria-label={content.educationCampus.hotspotLabel}>
            {content.educationCampus.hotspots.map((hotspot, index) => <button
              key={hotspot.title}
              type="button"
              className={activeCampusHotspot === index ? "active" : ""}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-label={hotspot.title}
              aria-pressed={activeCampusHotspot === index}
              onMouseEnter={() => setActiveCampusHotspot(index)}
              onFocus={() => setActiveCampusHotspot(index)}
              onClick={() => setActiveCampusHotspot(index)}
            ><span aria-hidden="true">{hotspot.icon}</span></button>)}
          </div>
          <figcaption className="campus-info-card" aria-live="polite">
            <span className="campus-info-icon" aria-hidden="true">{selectedCampusHotspot.icon}</span>
            <div>
              <small>{content.educationCampus.modes[activeCampusMode].time} · {content.educationCampus.modes[activeCampusMode].label}</small>
              <h3>{selectedCampusHotspot.title}</h3>
              <p>{selectedCampusHotspot.description}</p>
            </div>
          </figcaption>
        </figure>

        <div className="campus-mobile-spaces" aria-label={content.educationCampus.hotspotLabel}>
          {content.educationCampus.hotspots.map((hotspot, index) => <button
            key={hotspot.title}
            type="button"
            className={activeCampusHotspot === index ? "active" : ""}
            aria-pressed={activeCampusHotspot === index}
            onClick={() => setActiveCampusHotspot(index)}
          ><span aria-hidden="true">{hotspot.icon}</span><strong>{hotspot.title}</strong><small>{hotspot.description}</small></button>)}
        </div>

        <div className="campus-feature-grid">
          {content.educationCampus.features.map((feature) => <article key={feature.title}>
            <span aria-hidden="true">{feature.icon}</span>
            <div><h3>{feature.title}</h3><p>{feature.description}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="senior-living-section" id="senior-living">
      <div className="senior-heading">
        <div>
          <p className="kicker">{content.seniorLiving.kicker}</p>
          <h2>{content.seniorLiving.title}<br/><em>{content.seniorLiving.titleEmphasis}</em></h2>
        </div>
        <p>{content.seniorLiving.description}</p>
      </div>

      <div className="senior-experience">
        <div className="senior-mode-switcher" role="tablist" aria-label={content.seniorLiving.modeLabel}>
          {content.seniorLiving.modes.map((mode, index) => <button
            key={mode.label}
            type="button"
            role="tab"
            aria-selected={activeSeniorMode === index}
            className={activeSeniorMode === index ? "active" : ""}
            onClick={() => {
              setActiveSeniorMode(index);
              setActiveSeniorHotspot(mode.hotspotIndex);
            }}
          ><span aria-hidden="true">{mode.icon}</span>{mode.label}</button>)}
        </div>

        <figure className="senior-visual">
          <Image
            src="/assets/senior-living/KMJ5_SeniorLiving_Courtyard_v01.webp"
            alt={content.seniorLiving.imageAlt}
            fill
            sizes="(max-width: 760px) 100vw, 94vw"
          />
          <span className="senior-image-shade" aria-hidden="true"/>
          <div className="senior-hotspots" role="group" aria-label={content.seniorLiving.hotspotLabel}>
            {content.seniorLiving.hotspots.map((hotspot, index) => <button
              key={hotspot.title}
              type="button"
              className={activeSeniorHotspot === index ? "active" : ""}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-label={hotspot.title}
              aria-pressed={activeSeniorHotspot === index}
              onMouseEnter={() => setActiveSeniorHotspot(index)}
              onFocus={() => setActiveSeniorHotspot(index)}
              onClick={() => setActiveSeniorHotspot(index)}
            ><span aria-hidden="true">{hotspot.icon}</span></button>)}
          </div>
          <figcaption className="senior-info-card" aria-live="polite">
            <span className="senior-info-icon" aria-hidden="true">{selectedSeniorHotspot.icon}</span>
            <div>
              <small>{content.seniorLiving.modes[activeSeniorMode].label}</small>
              <h3>{selectedSeniorHotspot.title}</h3>
              <p>{selectedSeniorHotspot.description}</p>
            </div>
          </figcaption>
        </figure>

        <div className="senior-mobile-spaces" aria-label={content.seniorLiving.hotspotLabel}>
          {content.seniorLiving.hotspots.map((hotspot, index) => <button
            key={hotspot.title}
            type="button"
            className={activeSeniorHotspot === index ? "active" : ""}
            aria-pressed={activeSeniorHotspot === index}
            onClick={() => setActiveSeniorHotspot(index)}
          ><span aria-hidden="true">{hotspot.icon}</span><strong>{hotspot.title}</strong><small>{hotspot.description}</small></button>)}
        </div>

        <div className="senior-feature-grid">
          {content.seniorLiving.features.map((feature) => <article key={feature.title}>
            <span aria-hidden="true">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="investment-section" id="investment">
      <div className="investment-heading">
        <div>
          <p className="kicker">{content.investment.kicker}</p>
          <h2>{content.investment.title}<br/><em>{content.investment.titleEmphasis}</em></h2>
        </div>
        <p>{content.investment.description}</p>
      </div>

      <div className="investment-kpis">
        {content.investment.kpis.map((kpi) => <article key={kpi.label}>
          <span aria-hidden="true">{kpi.icon}</span>
          <strong>{kpi.value}</strong>
          <p>{kpi.label}</p>
        </article>)}
      </div>

      <div className="investment-dashboard">
        <div className="investment-calculator">
          <header><div><small>{content.investment.calculator.eyebrow}</small><h3>{content.investment.calculator.title}</h3></div><span>{content.investment.calculator.status}</span></header>
          <div className="investment-controls">
            <label>
              <span>{content.investment.calculator.amountLabel}</span>
              <strong>{investmentAmount} {content.investment.calculator.amountUnit}</strong>
              <input type="range" min="1" max="20" step="1" value={investmentAmount} onChange={(event) => setInvestmentAmount(Number(event.target.value))}/>
              <small><span>1 {content.investment.calculator.amountUnit}</span><span>20 {content.investment.calculator.amountUnit}</span></small>
            </label>
            <div className="investment-selector">
              <span>{content.investment.calculator.categoryLabel}</span>
              <div>{content.investment.calculator.categories.map((category, index) => <button key={category} type="button" className={investmentCategory === index ? "active" : ""} aria-pressed={investmentCategory === index} onClick={() => setInvestmentCategory(index)}>{category}</button>)}</div>
            </div>
            <div className="investment-selector">
              <span>{content.investment.calculator.horizonLabel}</span>
              <div>{[5, 7, 10].map((year) => <button key={year} type="button" className={investmentYears === year ? "active" : ""} aria-pressed={investmentYears === year} onClick={() => setInvestmentYears(year)}>{year} {content.investment.calculator.yearUnit}</button>)}</div>
            </div>
          </div>
          <div className="investment-chart" role="img" aria-label={content.investment.calculator.chartAriaLabel}>
            <div className="chart-legend"><span><i className="appreciation"/> {content.investment.calculator.appreciationLabel}</span><span><i className="rental"/> {content.investment.calculator.rentalLabel}</span></div>
            <div className="chart-grid">
              {Array.from({ length: investmentYears }, (_, index) => {
                const base = 24 + index * (56 / Math.max(investmentYears - 1, 1));
                const categoryLift = investmentCategory * 3;
                const amountLift = Math.min(investmentAmount, 20) * .35;
                return <div className="chart-year" key={index}>
                  <div className="chart-bars"><span className="appreciation-bar" style={{ height: `${Math.min(94, base + categoryLift + amountLift)}%` }}/><span className="rental-bar" style={{ height: `${Math.min(75, 16 + index * (45 / Math.max(investmentYears - 1, 1)) + categoryLift)}%` }}/></div>
                  <small>{index + 1}. {content.investment.calculator.yearShort}</small>
                </div>;
              })}
            </div>
            <p>{content.investment.calculator.disclaimer}</p>
          </div>
        </div>

        <aside className="investment-teaser">
          <span className="pdf-icon" aria-hidden="true">PDF</span>
          <small>{content.investment.teaser.eyebrow}</small>
          <h3>{content.investment.teaser.title}</h3>
          <p>{content.investment.teaser.description}</p>
          <a className="button gold" href="#project-contact">{content.investment.teaser.cta} <span>→</span></a>
          <button type="button" disabled>{content.investment.teaser.download} <span>↓</span></button>
        </aside>
      </div>

      <div className="investment-roadmap">
        <header><small>{content.investment.roadmap.eyebrow}</small><h3>{content.investment.roadmap.title}</h3></header>
        <ol>{content.investment.roadmap.phases.map((phase, index) => <li key={phase.title}><span>{index + 1}</span><div><strong>{phase.title}</strong><p>{phase.description}</p></div></li>)}</ol>
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
