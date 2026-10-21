"use client";
import { useEffect, useMemo, useState } from "react";
import type { UnitView } from "@/types/sales";
import { UnitCard } from "./UnitCard";
import { defaultLocale, getTranslations } from "@/lib/i18n";

const { messages } = getTranslations(defaultLocale);
type Filters = { building: string; floor: string; type: string; rooms: string };
const empty: Filters = { building: "", floor: "", type: "", rooms: "" };
const filterKeys = Object.keys(empty) as (keyof Filters)[];

function readFilters(search: string): Filters {
  const params = new URLSearchParams(search);
  return {
    building: params.get("building") ?? "",
    floor: params.get("floor") ?? "",
    type: params.get("type") ?? "",
    rooms: params.get("rooms") ?? "",
  };
}

export function ApartmentFinder({ units }: { units: UnitView[] }) {
  const [filters, setFilters] = useState<Filters>(empty);
  const [ready, setReady] = useState(false);
  const [queryLabel, setQueryLabel] = useState("");

  useEffect(() => {
    setFilters(readFilters(window.location.search));
    setQueryLabel(window.location.search);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams(window.location.search);
    for (const key of filterKeys) {
      if (filters[key]) params.set(key, filters[key]);
      else params.delete(key);
    }
    const next = params.toString();
    const search = next ? `?${next}` : "";
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${search}${window.location.hash}`);
    setQueryLabel(search);
  }, [filters, ready]);

  const update = (key: keyof Filters, value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const results = useMemo(() => units.filter((unit) =>
    (!filters.building || unit.building.id === filters.building) &&
    (!filters.floor || unit.floor.level === Number(filters.floor)) &&
    (!filters.type || unit.unitType.id === filters.type) &&
    (!filters.rooms || unit.roomCount === Number(filters.rooms))
  ), [filters, units]);

  const buildingOptions: [string, string][] = [
    ["", messages.sales.all],
    ...Array.from(new Map(units.map((unit) => [unit.building.id, unit.building.name])).entries()),
  ];
  const floorOptions: [string, string][] = [
    ["", messages.sales.all],
    ...Array.from(new Set(units
      .filter((unit) => !filters.building || unit.building.id === filters.building)
      .map((unit) => unit.floor.level)))
      .sort((a, b) => a - b)
      .map((level): [string, string] => [String(level), level === 0 ? "Földszint" : `${level}. emelet`]),
  ];
  const typeOptions: [string, string][] = [
    ["", messages.sales.all],
    ...Array.from(new Map(units.map((unit) => [unit.unitType.id, unit.unitType.name])).entries()),
  ];
  const roomOptions: [string, string][] = [
    ["", messages.sales.all],
    ...Array.from(new Set(units.map((unit) => unit.roomCount)))
      .sort((a, b) => a - b)
      .map((count): [string, string] => [String(count), String(count)]),
  ];

  const select = (label: string, key: keyof Filters, values: [string, string][]) =>
    <label key={key}><span>{label}</span><select value={filters[key]} onChange={(event) => update(key, event.target.value)}>
      {values.map(([value, text]) => <option value={value} key={value}>{text}</option>)}
    </select></label>;

  return <div className="finder-layout">
    <aside className="finder-filters">
      <header><h2>{messages.sales.filters}</h2><button type="button" onClick={() => setFilters(empty)}>{messages.sales.clearFilters}</button></header>
      {select(messages.sales.building, "building", buildingOptions)}
      {select(messages.sales.floor, "floor", floorOptions)}
      {select(messages.sales.unitType, "type", typeOptions)}
      {select(messages.sales.rooms, "rooms", roomOptions)}
      <p className="sales-empty">{messages.sales.dataPending}</p>
    </aside>
    <section className="finder-results">
      <header><strong>{results.length} {messages.sales.results}</strong><span>{queryLabel}</span></header>
      {results.length ? <div className="unit-grid">{results.map((unit) => <UnitCard key={unit.id} unit={unit}/>)}</div> : <p className="sales-empty">{messages.sales.emptyResults}</p>}
    </section>
  </div>;
}
