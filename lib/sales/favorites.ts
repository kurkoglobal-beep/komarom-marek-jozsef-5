"use client";
import { useCallback, useEffect, useState } from "react";

const storageKey = "kmj5-favorite-unit-ids";
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { queueMicrotask(() => { try { setIds(JSON.parse(localStorage.getItem(storageKey) ?? "[]")); } catch { setIds([]); } }); }, []);
  const update = useCallback((next: string[]) => { setIds(next); localStorage.setItem(storageKey, JSON.stringify(next)); }, []);
  const toggle = useCallback((id: string) => update(ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]), [ids, update]);
  return { ids, toggle, has: (id: string) => ids.includes(id) };
}
