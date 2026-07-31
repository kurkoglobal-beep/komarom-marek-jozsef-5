import Link from "next/link";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const { messages } = getTranslations(defaultLocale);
export function SalesHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return <><header className="sales-topbar"><Link href="/" className="sales-brand"><b>KF</b><span>KOMÁROM<small>MAREK JÓZSEF UTCA 5.</small></span></Link><nav><Link href="/masterplan">{messages.sales.masterplan}</Link><Link href="/lakasok">{messages.sales.apartments}</Link><Link href="/kedvencek">{messages.sales.favorites}</Link><Link href="/#project-contact">{messages.sales.contact}</Link></nav></header><section className="sales-hero"><p>{eyebrow}</p><h1>{title}</h1><span>{lead}</span></section></>;
}
