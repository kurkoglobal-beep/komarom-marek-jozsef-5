"use client";
import type { UnitView } from "@/types/sales";
import { useFavorites } from "@/lib/sales/favorites";
import { UnitCard } from "./UnitCard";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const { messages } = getTranslations(defaultLocale);
export function FavoritesView({ units }:{units:UnitView[]}) { const favorites=useFavorites(); const saved=units.filter(u=>favorites.ids.includes(u.id)); return saved.length?<div className="unit-grid">{saved.map(u=><UnitCard key={u.id} unit={u}/>)}</div>:<div className="sales-empty"><span>♡</span><p>{messages.sales.emptyFavorites}</p></div>; }
