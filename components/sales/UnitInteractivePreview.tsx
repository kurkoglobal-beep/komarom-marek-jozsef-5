"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { Messages } from "@/lib/i18n";
import type { UnitMedia } from "@/types/experience";
import { MediaZoomModal } from "./MediaZoomModal";

export function UnitInteractivePreview({ items, unitNumber, messages, priority = false }: { items: UnitMedia[]; unitNumber: string; messages: Messages; priority?: boolean }) {
  const copy = messages.experience.media;
  const views = useMemo(() => items.filter((item) => item.type === "furnishedAxonometry").sort((a,b) => a.sortOrder-b.sortOrder), [items]);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const pointerX = useRef<number | null>(null);
  const active = views[index] ?? null;
  const interactive = views.length > 1;
  const move = (direction: number) => { if (interactive) { setLoaded(false); setFailed(false); setIndex((current) => (current + direction + views.length) % views.length); } };
  const alt = copy.furnishedAlt.replace("{unit}", unitNumber);

  return <div className={`unit-preview ${interactive ? "is-interactive" : "is-static"}`}>
    <div className="unit-preview__stage" tabIndex={interactive ? 0 : undefined} onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }} onPointerDown={(event) => { pointerX.current = event.clientX; }} onPointerUp={(event) => { if (pointerX.current === null) return; const delta = event.clientX - pointerX.current; pointerX.current = null; if (Math.abs(delta) > 42) move(delta < 0 ? 1 : -1); }}>
      {!loaded && !failed ? <span className="unit-preview__skeleton" aria-hidden="true"/> : null}
      {active && !failed ? <Image key={active.id} src={active.src} alt={alt} fill sizes="(max-width:760px) 94vw, 55vw" priority={priority} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} className={loaded ? "is-loaded" : ""}/> : <div className="unit-preview__fallback"><span aria-hidden="true">⌑</span><p>{copy.mediaUnavailable}</p></div>}
      <button type="button" className="unit-preview__zoom" onClick={() => setZoomed(true)} disabled={!active || failed} aria-label={copy.zoom}>＋<span>{copy.zoom}</span></button>
      {interactive ? <><button type="button" className="unit-preview__arrow previous" onClick={() => move(-1)} aria-label={copy.previousView}>←</button><button type="button" className="unit-preview__arrow next" onClick={() => move(1)} aria-label={copy.nextView}>→</button></> : null}
    </div>
    {interactive ? <div className="unit-preview__thumbs" aria-label={copy.viewLabel}>{views.map((view, viewIndex) => <button type="button" key={view.id} className={index === viewIndex ? "active" : ""} aria-pressed={index === viewIndex} onClick={() => { setLoaded(false); setFailed(false); setIndex(viewIndex); }}><Image src={view.src} alt="" fill sizes="84px"/><span>{copy.viewNumber.replace("{number}", `${viewIndex + 1}`)}</span></button>)}</div> : <p className="unit-preview__static-label">{copy.staticView}</p>}
    <p className="unit-preview__disclaimer">{copy.furnishingDisclaimer}</p>
    <MediaZoomModal item={zoomed ? active : null} alt={alt} closeLabel={copy.closeZoom} onClose={() => setZoomed(false)}/>
  </div>;
}
