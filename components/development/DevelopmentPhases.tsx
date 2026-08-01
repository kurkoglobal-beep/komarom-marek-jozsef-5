"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Messages } from "@/lib/i18n";
import { developmentPhases, moveIntents } from "@/lib/experience/data";
import { PhaseSelector } from "./PhaseSelector";
import { PhaseContextPanel } from "./PhaseContextPanel";
import { PhaseTimeline } from "./PhaseTimeline";
import { developmentPhasesMedia } from "@/config/marketing-media";

export function DevelopmentPhases({ messages }: { messages: Messages }) {
  const [activeId, setActiveId] = useState<string | null>(null); const copy = messages.experience.phases; const active = developmentPhases.find((phase) => phase.id === activeId) ?? null;
  return <section className="development-phases" id="development-area" aria-labelledby="development-phases-title">
    <div className="phase-explorer">
      <div className="phase-canvas">
        <Image src={developmentPhasesMedia.background} alt={copy.imageAlt} fill sizes="100vw"/>
        <div className="phase-canvas__shade" aria-hidden="true"/>
        <header className="phase-canvas__heading"><p className="kicker light-text">{copy.kicker}</p><h2 id="development-phases-title">{copy.title}<br/><em>{copy.titleEmphasis}</em></h2><p>{copy.description}</p></header>
        <span className="phase-canvas__disclaimer">{copy.illustration}</span>
        <div className="phase-overlays" aria-label={copy.selectorLabel}>{developmentPhases.map((phase) => <button key={phase.id} type="button" className={activeId === phase.id ? "active" : activeId ? "dimmed" : ""} style={{left:`${phase.hotspot.x}%`,top:`${phase.hotspot.y}%`,width:`${phase.hotspot.width}%`,height:`${phase.hotspot.height}%`}} aria-label={copy.phaseTitle.replace("{phase}",phase.code)} aria-pressed={activeId === phase.id} onMouseEnter={() => setActiveId(phase.id)} onFocus={() => setActiveId(phase.id)} onClick={() => setActiveId(phase.id)}><span>{phase.code}</span></button>)}</div>
        <PhaseSelector phases={developmentPhases} activeId={activeId} allLabel={copy.all} phaseLabel={copy.phase} onSelect={setActiveId}/>
      </div>
      <PhaseContextPanel phase={active} messages={messages}/>
    </div>
    <PhaseTimeline phases={developmentPhases} activeId={activeId} messages={messages} onSelect={setActiveId}/>
    <div className="move-intent"><div><small>{copy.smartSelection}</small><h3>{copy.moveQuestion}</h3></div><div>{moveIntents.map((intent) => { const params=new URLSearchParams(); if(intent.phaseId) params.set("phaseId",intent.phaseId); params.set("targetHandoverRange",intent.targetHandoverRange); if(intent.availabilityStatus) params.set("status",intent.availabilityStatus); return <Link key={intent.id} href={`/lakasok?${params}`}>{copy.moveOptions[intent.id]} <span>→</span></Link>;})}</div></div>
  </section>;
}
