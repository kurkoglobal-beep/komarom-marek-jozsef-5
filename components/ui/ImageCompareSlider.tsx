"use client";
import Image from "next/image";
import { useState } from "react";
export function ImageCompareSlider({ before, after, beforeAlt, afterAlt, label }: { before: string; after: string; beforeAlt: string; afterAlt: string; label: string }) {
  const [position, setPosition] = useState(50);
  return <div className="ui-image-compare"><Image src={before} alt={beforeAlt} fill sizes="100vw"/><div className="ui-image-compare__after" style={{ clipPath:`inset(0 0 0 ${position}%)` }}><Image src={after} alt={afterAlt} fill sizes="100vw"/></div><label><span className="ui-sr-only">{label}</span><input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))}/></label></div>;
}
