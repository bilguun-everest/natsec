import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/lang";
import { DESCRIPTIONS, TITLES, alternatesFor, type Lang } from "@/lib/routes";
import "./(frontend)/globals.css";

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

/**
 * Two root layouts share this: one for the Mongolian pages at the bare paths,
 * one for the English pages under `/en/`. They are separate layouts because
 * `<html lang>` has to be right in the exported file — a single layout can
 * only ever declare one language, which is how the English pages came to be
 * served as Mongolian.
 */
export function siteMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: TITLES.home[lang],
    description: DESCRIPTIONS[lang],
    applicationName: "National Securities",
    alternates: {
      canonical: lang === "en" ? "/en/" : "/",
      languages: alternatesFor("home"),
    },
    openGraph: {
      type: "website",
      url: lang === "en" ? `${SITE_URL}/en/` : SITE_URL,
      siteName: lang === "en" ? "National Securities" : "Нэйшнл сэкюритис ҮЦК",
      title: TITLES.home[lang],
      description: DESCRIPTIONS[lang],
      locale: lang === "en" ? "en_US" : "mn_MN",
    },
    twitter: {
      card: "summary_large_image",
      title: TITLES.home[lang],
      description: DESCRIPTIONS[lang],
    },
    robots: { index: true, follow: true },
  };
}

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

export function SiteShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    // `motion-ready` gates the scroll-reveal styles: an element starts hidden
    // only because something is going to animate it back in. It ships in the
    // server-rendered class list rather than being added by a script, so
    // hydration stays clean — and the <noscript> block cancels the whole
    // mechanism when nothing is around to run the animation.
    <html
      lang={lang}
      data-lang={lang}
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

        <LanguageProvider initial={lang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
