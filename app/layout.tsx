import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/lang";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

// Display grotesque. Archivo has no Cyrillic, so the font stack in
// `tailwind.config.ts` hands Mongolian headings to Inter.
const display = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Data face — indices, prices, labels.
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
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
    <html
      lang="mn"
      data-lang="mn"
      className={`${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-white font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-900"
        >
          Үндсэн хэсэг рүү очих
        </a>

        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
