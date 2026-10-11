import { EnquiryForm } from "@/components/sales/EnquiryForm";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { defaultLocale, getTranslations } from "@/lib/i18n";

const { content, messages } = getTranslations(defaultLocale);
type SearchParams = Record<string, string | string[] | undefined>;
const value = (entry: string | string[] | undefined) => Array.isArray(entry) ? entry[0] ?? "" : entry ?? "";

export default async function ContactPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const context = { unitId: value(params.unitId), buildingId: value(params.buildingId), floorId: value(params.floorId), sourceUrl: value(params.sourceUrl), interest: value(params.interest) || (params.unitId ? "residential-interest" : "") };
  return <><SalesHeader eyebrow={content.interest.kicker} title={messages.sales.contact} lead={content.interest.description}/><section className="sales-contact-page"><div className="sales-contact-copy"><h2>{content.interest.title}<br/><em>{content.interest.titleEmphasis}</em></h2><p>{content.interest.privacy}</p><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></div><EnquiryForm context={context}/></section></>;
}
