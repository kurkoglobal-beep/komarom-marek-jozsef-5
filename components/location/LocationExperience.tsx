"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Messages } from "@/lib/i18n";
import { locationPoints } from "@/lib/experience/data";
import type { LocationCategory } from "@/types/experience";
import { MapCategoryFilter } from "./MapCategoryFilter";
import { LocationCard } from "./LocationCard";
import { locationExperienceMedia } from "@/config/marketing-media";

export function LocationExperience({ messages }: { messages: Messages }) {
  const copy = messages.experience.location;
  const [category, setCategory] = useState<LocationCategory | null>(null);
  const [previewedId, setPreviewedId] = useState<string | null>(null);
  const visible = useMemo(() => category ? locationPoints.filter((point) => point.category === category) : locationPoints, [category]);
  const [selectedId, setSelectedId] = useState(locationPoints[0]?.id ?? "");
  const selected = visible.find((point) => point.id === selectedId) ?? visible[0] ?? null;
  const activeId = previewedId && visible.some((point) => point.id === previewedId) ? previewedId : selected?.id ?? "";
  const activePoint = visible.find((point) => point.id === activeId) ?? selected;
  const pointCopy = activePoint ? copy.points[activePoint.id as keyof typeof copy.points] : null;

  return <section className="location-experience" id="komarom" aria-labelledby="location-experience-title">
    <header><div><p className="kicker light-text">{copy.kicker}</p><h2 id="location-experience-title">{copy.title}<br/><em>{copy.titleEmphasis}</em></h2></div><p>{copy.description}</p></header>
    <MapCategoryFilter active={category} labels={copy.categories} allLabel={copy.allCategories} ariaLabel={copy.filterLabel} onSelect={(value) => { setCategory(value); const first = value ? locationPoints.find((point) => point.category === value) : locationPoints[0]; setSelectedId(first?.id ?? ""); }}/>
    <div className="location-experience__stage">
      <div className="location-experience__map">
        <picture className="location-experience__media">
          <source media="(max-width: 760px)" srcSet={locationExperienceMedia.mobile}/>
          <Image src={locationExperienceMedia.desktop} alt={`${messages.visualLabels.illustration}: ${copy.imageAlt}`} fill sizes="(max-width: 900px) 100vw, 72vw" unoptimized/>
        </picture>
        <span className="visual-status visual-status--overlay">{messages.visualLabels.illustration}</span>
        <span className="location-experience__origin"><b aria-hidden="true"/><span>{copy.origin}</span></span>
        {visible.map((point) => <button key={point.id} type="button" data-poi={point.id} className={`${activeId === point.id ? "active" : ""} ${previewedId && activeId !== point.id ? "dimmed" : ""}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} aria-label={copy.points[point.id as keyof typeof copy.points].name} aria-pressed={selected?.id === point.id} onMouseEnter={() => setPreviewedId(point.id)} onMouseLeave={() => setPreviewedId(null)} onFocus={() => setPreviewedId(point.id)} onBlur={() => setPreviewedId(null)} onClick={() => setSelectedId(point.id)}><span aria-hidden="true"/></button>)}
        {activePoint && pointCopy ? <aside className="location-experience__popover" aria-live="polite"><small>{copy.categories[activePoint.category]}</small><strong>{pointCopy.name}</strong><p>{pointCopy.description}</p><em>{copy.verificationPending}</em></aside> : <aside className="location-experience__popover"><strong>{copy.emptyTitle}</strong><p>{copy.emptyDescription}</p></aside>}
      </div>
      <div className="location-experience__cards">
        {visible.length ? visible.map((point) => { const text = copy.points[point.id as keyof typeof copy.points]; return <LocationCard key={point.id} poiId={point.id} name={text.name} category={copy.categories[point.category]} description={text.description} verification={copy.verificationPending} thumbnailSrc={locationExperienceMedia.desktop} thumbnailPosition={`${point.x}% ${point.y}%`} active={activeId === point.id} dimmed={Boolean(previewedId && activeId !== point.id)} onSelect={() => setSelectedId(point.id)} onPreview={() => setPreviewedId(point.id)} onPreviewEnd={() => setPreviewedId(null)}/>; }) : <div className="location-experience__empty"><strong>{copy.emptyTitle}</strong><p>{copy.emptyDescription}</p></div>}
      </div>
    </div>
  </section>;
}
