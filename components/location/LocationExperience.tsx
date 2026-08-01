"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Messages } from "@/lib/i18n";
import { locationPoints } from "@/lib/experience/data";
import type { LocationCategory } from "@/types/experience";
import { MapCategoryFilter } from "./MapCategoryFilter";
import { LocationCard } from "./LocationCard";

export function LocationExperience({ messages }: { messages: Messages }) {
  const copy = messages.experience.location;
  const [category, setCategory] = useState<LocationCategory | null>(null);
  const visible = useMemo(() => category ? locationPoints.filter((point) => point.category === category) : locationPoints, [category]);
  const [selectedId, setSelectedId] = useState(locationPoints[0]?.id ?? "");
  const selected = visible.find((point) => point.id === selectedId) ?? visible[0] ?? null;
  const pointCopy = selected ? copy.points[selected.id as keyof typeof copy.points] : null;

  return <section className="location-experience" id="komarom" aria-labelledby="location-experience-title">
    <header><div><p className="kicker light-text">{copy.kicker}</p><h2 id="location-experience-title">{copy.title}<br/><em>{copy.titleEmphasis}</em></h2></div><p>{copy.description}</p></header>
    <MapCategoryFilter active={category} labels={copy.categories} allLabel={copy.allCategories} ariaLabel={copy.filterLabel} onSelect={(value) => { setCategory(value); const first = value ? locationPoints.find((point) => point.category === value) : locationPoints[0]; setSelectedId(first?.id ?? ""); }}/>
    <div className="location-experience__stage">
      <div className="location-experience__map" role="img" aria-label={copy.imageAlt}>
        <Image src="/assets/renders/exterior/KMJ5_Exterior_IntegratedDevelopment_v01.webp" alt="" fill sizes="(max-width: 900px) 100vw, 68vw"/>
        <span className="location-experience__origin"><b aria-hidden="true"/><span>{copy.origin}</span></span>
        {visible.map((point) => <button key={point.id} type="button" className={selected?.id === point.id ? "active" : ""} style={{ left: `${point.x}%`, top: `${point.y}%` }} aria-label={copy.points[point.id as keyof typeof copy.points].name} aria-pressed={selected?.id === point.id} onClick={() => setSelectedId(point.id)}><span aria-hidden="true"/></button>)}
        {selected && pointCopy ? <aside className="location-experience__popover" aria-live="polite"><small>{copy.categories[selected.category]}</small><strong>{pointCopy.name}</strong><p>{pointCopy.description}</p><em>{copy.verificationPending}</em></aside> : <aside className="location-experience__popover"><strong>{copy.emptyTitle}</strong><p>{copy.emptyDescription}</p></aside>}
      </div>
      <div className="location-experience__cards">
        {visible.length ? visible.map((point) => { const text = copy.points[point.id as keyof typeof copy.points]; return <LocationCard key={point.id} name={text.name} description={text.description} verification={copy.verificationPending} active={selected?.id === point.id} onSelect={() => setSelectedId(point.id)}/>; }) : <div className="location-experience__empty"><strong>{copy.emptyTitle}</strong><p>{copy.emptyDescription}</p></div>}
      </div>
    </div>
  </section>;
}
