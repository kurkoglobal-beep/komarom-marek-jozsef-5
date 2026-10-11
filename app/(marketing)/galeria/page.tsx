import Image from "next/image";
import { defaultLocale, getTranslations } from "@/lib/i18n";

const { content, messages } = getTranslations(defaultLocale);
const galleryAssets = [
  { category: "Projekt", status: messages.visualLabels.conceptVisual, src: "/assets/hero/KMJ5_Hero_DevelopmentMaster_v01.webp", alt: `${messages.visualLabels.conceptVisual}: ${content.project.imageAlt}` },
  { category: "Külső látványok", status: messages.visualLabels.conceptVisual, src: "/assets/renders/exterior/KMJ5_Exterior_IntegratedDevelopment_v01.webp", alt: content.project.imageAlt },
  { category: "Belső terek", status: messages.visualLabels.conceptVisual, src: "/assets/renders/interior/KMJ5_Interior_Collection_v01.webp", alt: content.gallery.items[0].alt },
  { category: "Életmód", status: messages.visualLabels.conceptVisual, src: "/assets/smart-park/KMJ5_SmartPark_CentralLake_v01.webp", alt: content.gallery.items[2].alt },
  { category: content.gallery.items[1].caption.split(" · ")[0], status: messages.visualLabels.conceptVisual, src: "/assets/smart-home/KMJ5_SmartHome_Livingroom_ParkView_v01.webp", alt: content.gallery.items[1].alt },
  { category: "Masterplan", status: messages.visualLabels.conceptVisual, src: "/assets/masterplan/KMJ5_Residential_InteractiveMasterplan_v01.webp", alt: content.residentialMasterplan.mapAriaLabel },
] as const;

export default function GalleryPage() {
  return <main className="marketing-subpage gallery-page"><section className="marketing-page-hero"><p>{content.gallery.kicker}</p><h1>{content.gallery.title}<br/><em>{content.gallery.titleEmphasis}</em></h1><span>{content.gallery.description}</span></section><nav className="gallery-categories" aria-label="Galéria kategóriák">{galleryAssets.map((asset) => <a key={asset.category} href={`#${asset.category.toLowerCase().replaceAll(" ", "-")}`}>{asset.category}</a>)}</nav><section className="gallery-library">{galleryAssets.map((asset) => <figure id={asset.category.toLowerCase().replaceAll(" ", "-")} key={asset.category}><div><Image src={asset.src} alt={asset.alt} fill sizes="(max-width: 760px) 100vw, 50vw"/></div><figcaption>{asset.category}<small>{asset.status}</small></figcaption></figure>)}</section></main>;
}
