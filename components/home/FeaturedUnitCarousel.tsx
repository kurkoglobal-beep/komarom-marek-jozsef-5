"use client";

import { useRef } from "react";
import type { UnitView } from "@/types/sales";
import { UnitCard } from "@/components/sales/UnitCard";

export function FeaturedUnitCarousel({ units, previousLabel, nextLabel }: { units: UnitView[]; previousLabel: string; nextLabel: string }) {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => track.current?.scrollBy({ left: direction * Math.max(320, track.current.clientWidth * .78), behavior: "smooth" });
  return <div className="featured-units__carousel">
    <div className="featured-units__controls"><button type="button" onClick={() => move(-1)} aria-label={previousLabel}>←</button><button type="button" onClick={() => move(1)} aria-label={nextLabel}>→</button></div>
    <div className="featured-units__track" ref={track} tabIndex={0}>{units.map((unit, index) => <UnitCard key={unit.id} unit={unit} featured={index === 0}/>)}</div>
  </div>;
}
