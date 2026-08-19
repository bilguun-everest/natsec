import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { LanguageProvider } from "@/components/lang";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Editorial voice — every heading, and the headline figures.
 *
 * It replaces Archivo, which had no Cyrillic: on a Mongolian-first site that
 * meant the display face silently fell back to Inter for the primary language
 * and the site had no typographic voice of its own. Source Serif 4 ships
 * Cyrillic, so the same heading reads the same way in both languages.
 */
const display = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  // No `weight`: both of these are variable fonts, so leaving the axis open
  // ships one file per subset and style instead of one per cut. On a 10GB-a-
  // month shared host that is the difference between 728KB and 260KB of face.
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Data face — indices, prices, labels.
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://natsec.mn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Нэйшнл сэкюритис ҮЦК | Хөрөнгийн зах зээлийн түнш",
  description:
    "Санхүүгийн зохицуулах хорооны тусгай зөвшөөрөлтэй үнэт цаасны компани. Брокер, андеррайтер, хөрөнгө оруулалтын зөвлөх үйлчилгээ.",
  applicationName: "National Securities",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Нэйшнл сэкюритис ҮЦК",
    title: "Нэйшнл сэкюритис ҮЦК | Хөрөнгийн зах зээлийн түнш",
    description:
      "Брокер, андеррайтер, хөрөнгө оруулалтын зөвлөхийн үйлчилгээг нэг дороос.",
    locale: "mn_MN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Нэйшнл сэкюритис ҮЦК",
    description:
      "Брокер, андеррайтер, хөрөнгө оруулалтын зөвлөхийн үйлчилгээг нэг дороос.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0C1440",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "«Нэйшнл сэкюритис ҮЦК» ХХК",
  url: SITE_URL,
  description:
    "Санхүүгийн зохицуулах хорооны тусгай зөвшөөрөлтэй үнэт цаасны компани.",
  areaServed: "MN",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eco Tower, 9 давхарт 904, Сүхбаатар дүүрэг",
    addressLocality: "Улаанбаатар",
    addressCountry: "MN",
  },
  telephone: "+976 7709 7070",
  email: "info@natsec.mn",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `motion-ready` gates the scroll-reveal styles: an element starts hidden
    // only because something is going to animate it back in. It ships in the
    // server-rendered class list rather than being added by a script, so
    // hydration stays clean — and the <noscript> block cancels the whole
    // mechanism when nothing is around to run the animation.
    <html
      lang="mn"
      data-lang="mn"
      className={`motion-ready ${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
