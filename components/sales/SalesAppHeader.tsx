"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { salesNavigation, isSalesRouteActive } from "@/config/navigation";
import { defaultLocale, getTranslations } from "@/lib/i18n";

const { messages } = getTranslations(defaultLocale);

export function SalesAppHeader() {
  const pathname = usePathname();
  return <header className="sales-topbar">
    <Link href="/" className="sales-brand"><b>KF</b><span>KOMÁROM<small>FEJLESZTÉSI TERÜLET</small></span></Link>
    <nav aria-label="Értékesítési navigáció">
      {salesNavigation.slice(1).map((item) => {
        const label = messages.sales[item.labelKey];
        const active = isSalesRouteActive(pathname, item.href);
        return <Link key={item.href} href={item.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{label}</Link>;
      })}
    </nav>
  </header>;
}
