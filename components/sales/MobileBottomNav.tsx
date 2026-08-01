"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import { salesNavigation, isSalesRouteActive } from "@/config/navigation";

const { messages } = getTranslations(defaultLocale);
export function MobileBottomNav() {
  const pathname = usePathname();
  return <nav className="sales-bottom-nav" aria-label={messages.accessibility.mobileNavigation}>{salesNavigation.map(({ href, icon, labelKey }) => {
    const active = isSalesRouteActive(pathname, href);
    return <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}><span aria-hidden="true">{icon}</span><small>{messages.sales[labelKey]}</small></Link>;
  })}</nav>;
}
