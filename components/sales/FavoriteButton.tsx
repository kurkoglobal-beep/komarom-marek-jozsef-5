"use client";
import { useFavorites } from "@/lib/sales/favorites";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const { messages } = getTranslations(defaultLocale);
export function FavoriteButton({ unitId, compact = false }: { unitId: string; compact?: boolean }) { const favorites = useFavorites(); const active = favorites.has(unitId); return <button type="button" className={`favorite-button ${active ? "active" : ""} ${compact ? "compact" : ""}`} onClick={() => favorites.toggle(unitId)} aria-pressed={active} aria-label={active ? messages.sales.removeFavorite : messages.sales.addFavorite}><span aria-hidden="true">{active ? "♥" : "♡"}</span>{compact ? null : active ? messages.sales.saved : messages.sales.addFavorite}</button>; }
