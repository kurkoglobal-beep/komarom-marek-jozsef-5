import { FavoritesView } from "@/components/sales/FavoritesView";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { getUnitViews } from "@/lib/sales/data";
import { defaultLocale, getTranslations } from "@/lib/i18n";
const {messages}=getTranslations(defaultLocale);
export default function FavoritesPage(){return <main className="sales-app"><SalesHeader eyebrow="Személyes lista" title={messages.sales.favorites} lead="A kiválasztott lakások ezen az eszközön, oldalfrissítés után is megmaradnak."/><section className="favorites-page"><FavoritesView units={getUnitViews()}/></section></main>}
