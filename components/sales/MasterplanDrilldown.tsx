"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Building, Floor } from "@/types/platform-core";
import type { UnitView } from "@/types/sales";
import { statusLabel } from "./UnitCard";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const { messages } = getTranslations(defaultLocale);
export function MasterplanDrilldown({ buildings, floors, units }: { buildings:Building[]; floors:Floor[]; units:UnitView[] }) {
  const [buildingId,setBuildingId]=useState(buildings[0].id); const buildingFloors=floors.filter(f=>f.buildingId===buildingId); const [level,setLevel]=useState(0);
  const floor=buildingFloors.find(f=>f.level===level) ?? buildingFloors[0]; const floorUnits=units.filter(u=>u.floorId===floor?.id);
  return <div className="masterplan-app"><figure className="masterplan-preview"><Image src="/assets/masterplan/KMJ5_Residential_InteractiveMasterplan_v01.webp" alt={messages.sales.masterplanPreviewAlt} fill sizes="(max-width: 900px) 100vw, 58vw"/><figcaption>{messages.sales.staticPreview}</figcaption>{buildings.map((b,i)=><button key={b.id} className={buildingId===b.id?"active":""} style={{left:`${38+i*30}%`,top:`${42+i*8}%`}} onClick={()=>{setBuildingId(b.id);setLevel(0)}}>{b.code}</button>)}</figure><div className="drilldown-panel"><section><small>{messages.sales.selectBuilding}</small><div>{buildings.map(b=><button key={b.id} className={buildingId===b.id?"active":""} onClick={()=>{setBuildingId(b.id);setLevel(0)}}>{b.name}</button>)}</div></section><section><small>{messages.sales.selectFloor}</small><div>{buildingFloors.map(f=><button key={f.id} className={level===f.level?"active":""} onClick={()=>setLevel(f.level)}>{f.name}</button>)}</div></section><section><small>{messages.sales.selectUnit}</small><div className="drilldown-units">{floorUnits.map(u=><Link href={`/lakasok/${u.id}`} key={u.id}><b>{u.unitNumber}</b><span>{messages.sales.dataPending}</span><i className="unit-status coming_soon">{statusLabel()}</i></Link>)}</div></section></div></div>;
}
