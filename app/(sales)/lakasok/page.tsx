import { ApartmentFinder } from "@/components/sales/ApartmentFinder";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { getUnitViews } from "@/lib/sales/data";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const { messages }=getTranslations(defaultLocale);
export default function ApartmentsPage(){return <><SalesHeader eyebrow="Digitális lakásválasztó" title={messages.sales.finderTitle} lead={messages.sales.finderLead}/><ApartmentFinder units={getUnitViews()}/></>}
