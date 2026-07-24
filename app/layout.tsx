import type { Metadata } from "next";
import "./globals.css";
import { defaultLocale, getTranslations } from "@/lib/i18n";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
