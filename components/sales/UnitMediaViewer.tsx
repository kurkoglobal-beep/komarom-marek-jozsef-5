"use client";
import { UnitConceptImage } from "./UnitConceptImage";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { UnitView } from "@/types/sales";
import type { Messages } from "@/lib/i18n";
import { getUnitMedia } from "@/lib/experience/data";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { RoomHotspot, type RoomHotspotItem } from "./RoomHotspot";
import { UnitInteractivePreview } from "./UnitInteractivePreview";

type ViewMode = "floorPlan" | "furnished" | "interiors";
const roomPositions: Record<string, { x: number; y: number }> = { "room-living": { x: 38, y: 57 }, "room-bedroom": { x: 69, y: 35 }, "room-bathroom": { x: 72, y: 70 } };

export function UnitMediaViewer({ unit, messages }: { unit: UnitView; messages: Messages }) {
  const copy = messages.experience.media;
  const [mode, setMode] = useState<ViewMode>("floorPlan");
  const { items } = useMemo(() => getUnitMedia(unit, { includeConcept: true }), [unit]);
  const floorPlan = items.find((item) => item.type === "floorPlan2D");
  const furnished = items.filter((item) => item.type === "furnishedAxonometry");
  const interiors = items.filter((item) => item.type === "interior");
  const [activeInteriorId, setActiveInteriorId] = useState(interiors[0]?.id ?? "");
  const activeInterior = interiors.find((item) => item.id === activeInteriorId) ?? interiors[0];
  const exact = floorPlan?.relationship === "exact";
  const roomHotspots: RoomHotspotItem[] = exact ? interiors.flatMap((item) => item.roomId && roomPositions[item.roomId] ? [{ id: item.id, label: copy.labels[item.labelKey as keyof typeof copy.labels], ...roomPositions[item.roomId] }] : []) : [];
  const tabs = [{ value: "floorPlan", label: copy.tabs.floorPlan }, { value: "furnished", label: copy.tabs.furnished }, { value: "interiors", label: copy.tabs.interiors }] as { value: ViewMode; label: string }[];

  if (!floorPlan) return <section className="unit-media" aria-labelledby="unit-media-title"><header><div><p>{copy.kicker}</p><h2 id="unit-media-title">{copy.title}</h2></div></header>{activeInterior ? <UnitConceptImage key={activeInterior.id} item={activeInterior} messages={messages} detail/> : <div className="sales-empty">{copy.mediaUnavailable}</div>}<aside className="unit-media__disclaimer concept"><strong>{copy.illustrationLabel}</strong><p>{copy.illustrationDisclaimer}</p></aside></section>;

  return <section className="unit-media" aria-labelledby="unit-media-title">
    <header><div><p>{copy.kicker}</p><h2 id="unit-media-title">{copy.title}</h2></div><SegmentedControl options={tabs} value={mode} label={copy.viewLabel} onChange={setMode}/></header>
    <div className={`unit-media__workspace mode-${mode}`}>
      <figure className="unit-media__panel unit-media__floor"><figcaption>{copy.tabs.floorPlan}</figcaption><Image src={floorPlan.src} alt={copy.floorPlanAlt.replace("{unit}", unit.unitNumber)} fill sizes="(max-width: 760px) 100vw, 50vw"/>{roomHotspots.map((item) => <RoomHotspot key={item.id} item={item} active={activeInteriorId === item.id} onSelect={() => { setActiveInteriorId(item.id); setMode("interiors"); }}/>)}</figure>
      <div className="unit-media__panel unit-media__furnished"><UnitInteractivePreview items={furnished} unitNumber={unit.unitNumber} messages={messages}/></div>
      <div className="unit-media__interiors"><figure>{activeInterior ? <Image src={activeInterior.src} alt={copy.illustrationAlt.replace("{room}", copy.labels[activeInterior.labelKey as keyof typeof copy.labels])} fill sizes="(max-width: 760px) 100vw, 68vw"/> : null}<figcaption>{copy.illustrationLabel}</figcaption></figure><div>{interiors.map((item) => <button key={item.id} type="button" className={activeInteriorId === item.id ? "active" : ""} aria-pressed={activeInteriorId === item.id} onClick={() => setActiveInteriorId(item.id)}><Image src={item.src} alt="" fill sizes="120px"/><span>{copy.labels[item.labelKey as keyof typeof copy.labels]}</span></button>)}</div></div>
    </div>
    <aside className={`unit-media__disclaimer ${exact ? "exact" : "concept"}`}><strong>{exact ? copy.exactTitle : copy.conceptTitle}</strong><p>{exact ? copy.exactDescription : copy.conceptDescription}</p><p>{copy.illustrationDisclaimer}</p></aside>
  </section>;
}
