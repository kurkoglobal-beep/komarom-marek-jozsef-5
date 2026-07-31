"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, getTranslations } from "@/lib/i18n";

const { content, messages } = getTranslations(defaultLocale);

export function MarketingSubpageChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return children;
  return <>
    <header className="marketing-subnav">
      <Link href="/" className="sales-brand"><b>KF</b><span>{content.brand.name}<small>{content.brand.tagline}</small></span></Link>
      <nav aria-label={messages.accessibility.mainNavigation}>
        <Link href="/projekt" aria-current={pathname === "/projekt" ? "page" : undefined}>{messages.navigation.developmentArea}</Link>
        <Link href="/galeria" aria-current={pathname === "/galeria" ? "page" : undefined}>{messages.navigation.gallery}</Link>
        <Link href="/masterplan">{messages.sales.masterplan}</Link>
        <Link href="/lakasok">{messages.sales.apartments}</Link>
        <Link href="/kapcsolat">{messages.common.contact}</Link>
      </nav>
    </header>
    {children}
    <footer className="marketing-subfooter"><span>{content.contact.copyright}</span><Link href="/">{messages.sales.home}</Link></footer>
  </>;
}
