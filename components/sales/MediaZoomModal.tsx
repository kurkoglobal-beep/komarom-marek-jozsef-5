"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { UnitMedia } from "@/types/experience";

export function MediaZoomModal({ item, alt, closeLabel, onClose }: { item: UnitMedia | null; alt: string; closeLabel: string; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [item, onClose]);
  if (!item) return null;
  return <div className="media-zoom" role="dialog" aria-modal="true" aria-label={alt} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <button type="button" className="media-zoom__close" onClick={onClose} aria-label={closeLabel}>×</button>
    <div className="media-zoom__canvas"><Image src={item.src} alt={alt} fill sizes="100vw"/></div>
  </div>;
}
