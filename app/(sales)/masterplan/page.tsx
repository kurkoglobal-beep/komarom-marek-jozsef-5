import { MasterplanDrilldown } from "@/components/sales/MasterplanDrilldown";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { getSalesSeed, getUnitViews } from "@/lib/sales/data";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const {messages}=getTranslations(defaultLocale);
export default function MasterplanPage(){const seed=getSalesSeed();return <><SalesHeader eyebrow="Interaktív 2D masterplan" title={messages.sales.masterplanTitle} lead={messages.sales.masterplanLead}/><MasterplanDrilldown buildings={seed.buildings} floors={seed.floors} units={getUnitViews()}/></>}
