"use client";
import { useEffect, useMemo, useState } from "react";
import type { UnitView } from "@/types/sales";
import { UnitCard } from "./UnitCard";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const { messages } = getTranslations(defaultLocale);
type Filters = { building:string; floor:string };
const empty: Filters = { building:"",floor:"" };
export function ApartmentFinder({ units }: { units: UnitView[] }) {
  const [filters, setFilters] = useState<Filters>(empty);
  const [queryLabel, setQueryLabel] = useState("");
  useEffect(() => { const p = new URLSearchParams(location.search); setFilters(Object.fromEntries(Object.keys(empty).map((key) => [key,p.get(key) ?? ""])) as unknown as Filters); setQueryLabel(location.search); }, []);
  useEffect(() => { const p = new URLSearchParams(); Object.entries(filters).forEach(([k,v]) => v && p.set(k,v)); const next = p.size ? `?${p}` : ""; history.replaceState(null,"",`${location.pathname}${next}`); setQueryLabel(next); }, [filters]);
  const update = (key:keyof Filters,value:string) => setFilters((current) => ({...current,[key]:value}));
  const result = useMemo(() => units.filter((unit) => (!filters.building || unit.building.id===filters.building) && (!filters.floor || unit.floor.level===Number(filters.floor))), [filters,units]);
  const select = (label:string,key:keyof Filters,values:[string,string][]) => <label><span>{label}</span><select value={filters[key]} onChange={(e)=>update(key,e.target.value)}>{values.map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>;
  return <div className="finder-layout"><aside className="finder-filters"><header><h2>{messages.sales.filters}</h2><button onClick={()=>setFilters(empty)}>{messages.sales.clearFilters}</button></header>{select(messages.sales.building,"building",[["",messages.sales.all],...Array.from(new Map(units.map(u=>[u.building.id,u.building.name])).entries())])}{select(messages.sales.floor,"floor",[["",messages.sales.all],["0","Földszint"],["1","1. emelet"],["2","2. emelet"]])}<p className="sales-empty">{messages.sales.dataPending}</p></aside><section className="finder-results"><header><strong>{result.length} {messages.sales.results}</strong><span>{queryLabel}</span></header>{result.length ? <div className="unit-grid">{result.map((unit)=><UnitCard key={unit.id} unit={unit}/>)}</div> : <p className="sales-empty">{messages.sales.emptyResults}</p>}</section></div>;
}
