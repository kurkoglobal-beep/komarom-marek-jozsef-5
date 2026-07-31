import type { Metadata, Viewport } from "next";
import "./globals.css";
import { defaultLocale, getTranslations } from "@/lib/i18n";
import { MobileBottomNav } from "@/components/sales/MobileBottomNav";
import { PwaRegister } from "@/components/sales/PwaRegister";

const { content } = getTranslations(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL("https://komarom-marek-jozsef-5.openai.site"),
  title: content.seo.title,
  description: content.seo.description,
  openGraph: {
    title: content.brand.name,
    description: content.seo.socialDescription,
    images: [{ url: "/assets/social-media/KMJ5_Social_OG_v01.webp", width: 1730, height: 909, alt: content.seo.socialImageAlt }],
    locale: content.seo.openGraphLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.brand.name,
    description: content.seo.socialDescription,
    images: ["/assets/social-media/KMJ5_Social_OG_v01.webp"],
  },
  icons: {
    icon: "/assets/branding/favicon/KMJ5_Favicon_v01.svg",
    shortcut: "/assets/branding/favicon/KMJ5_Favicon_v01.svg",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Komárom Lakáskereső", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = { themeColor: "#17201b", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale}>
      <body>{children}<MobileBottomNav/><PwaRegister/></body>
    </html>
  );
}
