import Link from "next/link";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const {messages}=getTranslations(defaultLocale);
export default function OfflinePage(){return <main className="offline-page"><span>⌁</span><h1>{messages.sales.offlineTitle}</h1><p>{messages.sales.offlineLead}</p><Link href="/">{messages.sales.retry}</Link></main>}
