import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://komarom-marek-jozsef-5.openai.site"),
  title: "Marek 5 Komárom – Prémium otthonok",
  description: "Modern, energiahatékony otthonok Komárom szívében, a Marek József utca 5. szám alatt.",
  openGraph: {
    title: "Marek 5",
    description: "Prémium otthonok Komárom szívében",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Marek 5 – Prémium otthonok Komárom szívében" }],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marek 5",
    description: "Prémium otthonok Komárom szívében",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
