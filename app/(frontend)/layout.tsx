import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/lang";
import "./globals.css";

/**
 * The whole voice of the site — body copy, UI, and every heading.
 *
 * Headings were on Source Serif 4, chosen because it ships Cyrillic where the
 * previous face did not. It reads badly in Mongolian at display size for a
 * reason that only shows up in Cyrillic: и, й, н, з and х all carry paired
 * bracket serifs on the baseline, so a line of caps becomes an unbroken row of
 * teeth — readers described it as the edge of a saw. Loosening the tracking
 * does not help; the teeth are the face. Inter has no serifs, already carries
 * Cyrillic, and was already being downloaded, so this also drops a font file.
 *
 * `italic` is here for the two pull-quote rules that used the serif's italic.
 */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-inter",
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
      className={`motion-ready ${inter.variable} ${mono.variable}`}
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
