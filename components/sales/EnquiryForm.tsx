"use client";

import { defaultLocale, getTranslations } from "@/lib/i18n";

const { content, messages } = getTranslations(defaultLocale);

export type EnquiryContext = {
  unitId: string;
  buildingId: string;
  floorId: string;
  sourceUrl: string;
  interest: string;
};

export function EnquiryForm({ context }: { context: EnquiryContext }) {
  return <form className="sales-enquiry-form" onSubmit={(event) => event.preventDefault()}>
    <p className="sales-feedback" role="status">{messages.forms.unavailable}</p>
    {context.unitId && <div className="enquiry-unit-summary"><small>{messages.sales.unitDetails}</small><strong>{context.unitId}</strong>{context.buildingId && <span>{context.buildingId} · {context.floorId}</span>}</div>}
    <input type="hidden" name="unitId" value={context.unitId}/><input type="hidden" name="buildingId" value={context.buildingId}/><input type="hidden" name="floorId" value={context.floorId}/><input type="hidden" name="sourceUrl" value={context.sourceUrl}/>
    <label><span>{messages.forms.name}</span><input name="name" autoComplete="name" required placeholder={messages.forms.namePlaceholder}/></label>
    <label><span>{messages.forms.email}</span><input name="email" type="email" autoComplete="email" required placeholder={messages.forms.emailPlaceholder}/></label>
    <label><span>{messages.forms.phone}</span><input name="phone" type="tel" autoComplete="tel" placeholder={messages.forms.phonePlaceholder}/></label>
    <label><span>{messages.forms.subject}</span><select name="interest" defaultValue={context.interest}><option value="" disabled>{messages.forms.select}</option><option value="residential-interest">{messages.forms.residentialInterest}</option><option value="investment">{messages.forms.investment}</option><option value="commercial-tenancy">{content.website.form.commercialTenancy}</option><option value="office-tenancy">{content.website.form.officeTenancy}</option><option value="other">{messages.forms.other}</option></select></label>
    <label className="consent"><input type="checkbox" required/><span>{messages.forms.consent}</span></label>
    <button className="button gold" type="submit" disabled>{messages.cta.contactProject} · {messages.status.comingSoon}</button>
  </form>;
}
