"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, getTranslations } from "@/lib/i18n";

const { messages } = getTranslations(defaultLocale);
const items = [
  ["/", "⌂", messages.sales.home], ["/masterplan", "◇", messages.sales.masterplan], ["/lakasok", "▦", messages.sales.apartments],
  ["/kedvencek", "♡", messages.sales.favorites], ["/#project-contact", "✉", messages.sales.contact]
] as const;
export function MobileBottomNav() {
  const pathname = usePathname();
  return <nav className="sales-bottom-nav" aria-label="Mobil értékesítési navigáció">{items.map(([href, icon, label]) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);
    return <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}><span aria-hidden="true">{icon}</span><small>{label}</small></Link>;
  })}</nav>;
}
