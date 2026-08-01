"use client";
import { usePathname, useSearchParams } from "next/navigation";
export function RouteProgress() { const pathname = usePathname(); const query = useSearchParams().toString(); return <span key={`${pathname}?${query}`} className="ui-route-progress" aria-hidden="true"/>; }
