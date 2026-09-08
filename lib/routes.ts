/**
 * Every page on the site, and the URL it lives at.
 *
 * These were fragments once — the whole site was one document and `#broker`
 * picked which page was mounted. That worked for a reader with JavaScript and
 * for nobody else: Google saw a single URL, a shared link always opened the
 * homepage, and an auditor reading the DOM found no `id` to match the `href`
 * and concluded every link in the menu was dead.
 *
 * Now each route is a real path with its own exported HTML file. The routing
 * still happens in the client — the reader gets the same instant page swap —
 * but the address bar, the crawler and the `curl` all see a real page.
 *
 * This module is deliberately free of React: the static build reads it to know
 * which files to emit, and that runs on the server.
 */
export const ROUTES = [
  "home",
  "tanilcuulga",
  "udirdlaga",
  "ololt",
  "tailan",
  "broker",
  "anderraiter",
  "zuvluh",
  "sudalgaa",
  "zaavar",
  "zaavar-dansneeh",
  "zaavar-mhb",
  "zaavar-ipo",
  "zaavar-mungu",
  "zaavar-tsenegleh",
  "zaavar-nogdol",
  "tog-hugjil",
  "tog-hugjil-esg",
  "tog-hugjil-privacy",
  "tog-hugjil-terms",
  "holboo-barih",
  "faq",
  "faq-1",
  "faq-2",
  "faq-3",
  "faq-4",
  "faq-5",
  "faq-6",
  "faq-7",
  "faq-8",
  // A real page, not just a state. `public/.htaccess` points Apache's
  // ErrorDocument at `/not-found/`, so a mistyped URL gets the site's own 404
  // — header, footer and a way back — rather than the host's default page.
  "not-found",
] as const;

export type Route = (typeof ROUTES)[number];

/** `history.pushState` fires no event; navigation raises this instead. */
export const ROUTE_EVENT = "natsec:route";

export type Lang = "mn" | "en";
export const LANGS: readonly Lang[] = ["mn", "en"];

/**
 * The <title> of every page, in both languages. A single Mongolian title on
 * every URL was one of the two reasons the English site did not exist as far
 * as a search engine was concerned; the other was that it had no URL.
 */
export const TITLES: Record<Route, Record<Lang, string>> = {
  home: { mn: "Нэйшнл сэкюритис ҮЦК | Хөрөнгийн зах зээлийн түнш", en: "National Securities | Your place in the capital market" },
  tanilcuulga: { mn: "Танилцуулга | Нэйшнл сэкюритис ҮЦК", en: "About us | National Securities" },
  udirdlaga: { mn: "Танилцуулга | Нэйшнл сэкюритис ҮЦК", en: "About us | National Securities" },
  ololt: { mn: "Ололт амжилт | Нэйшнл сэкюритис ҮЦК", en: "Track record | National Securities" },
  tailan: { mn: "Санхүүгийн тайлан | Нэйшнл сэкюритис ҮЦК", en: "Financial statements | National Securities" },
  broker: { mn: "Брокерийн үйлчилгээ | Нэйшнл сэкюритис ҮЦК", en: "Broker services | National Securities" },
  anderraiter: { mn: "Андеррайтер | Нэйшнл сэкюритис ҮЦК", en: "Underwriting | National Securities" },
  zuvluh: { mn: "Хөрөнгө оруулалтын зөвлөгөө | Нэйшнл сэкюритис ҮЦК", en: "Investment advisory | National Securities" },
  sudalgaa: { mn: "Үнэт цаасны судалгаа | Нэйшнл сэкюритис ҮЦК", en: "Securities research | National Securities" },
  zaavar: { mn: "Хэрхэн эхлэх | Нэйшнл сэкюритис ҮЦК", en: "Getting started | National Securities" },
  "zaavar-dansneeh": { mn: "Данс нээх | Нэйшнл сэкюритис ҮЦК", en: "Opening an account | National Securities" },
  "zaavar-mhb": { mn: "МХБ-ийн арилжаанд оролцох | Нэйшнл сэкюритис ҮЦК", en: "Trading on the MSE | National Securities" },
  "zaavar-ipo": { mn: "IPO-д хэрхэн оролцох вэ | Нэйшнл сэкюритис ҮЦК", en: "Taking part in an IPO | National Securities" },
  "zaavar-mungu": { mn: "Мөнгө байршуулах, татах | Нэйшнл сэкюритис ҮЦК", en: "Deposits and withdrawals | National Securities" },
  "zaavar-tsenegleh": { mn: "Данс цэнэглэх | Нэйшнл сэкюритис ҮЦК", en: "Adding money to your account | National Securities" },
  "zaavar-nogdol": { mn: "Ногдол ашиг авах | Нэйшнл сэкюритис ҮЦК", en: "Receiving dividends | National Securities" },
  "tog-hugjil": { mn: "Тогтвортой хөгжил | Нэйшнл сэкюритис ҮЦК", en: "Sustainability | National Securities" },
  "tog-hugjil-esg": { mn: "Тогтвортой хөгжлийн бодлого (ESG) | Нэйшнл сэкюритис ҮЦК", en: "Sustainability policy (ESG) | National Securities" },
  "tog-hugjil-privacy": { mn: "Нууцлалын бодлого | Нэйшнл сэкюритис ҮЦК", en: "Privacy policy | National Securities" },
  "tog-hugjil-terms": { mn: "Үйлчилгээний нөхцөл | Нэйшнл сэкюритис ҮЦК", en: "Terms of service | National Securities" },
  "holboo-barih": { mn: "Холбоо барих | Нэйшнл сэкюритис ҮЦК", en: "Contact us | National Securities" },
  faq: { mn: "Түгээмэл асуулт хариулт | Нэйшнл сэкюритис ҮЦК", en: "Frequently asked questions | National Securities" },
  "faq-1": { mn: "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК", en: "Frequently asked questions | National Securities" },
  "faq-2": { mn: "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК", en: "Frequently asked questions | National Securities" },
  "faq-3": { mn: "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК", en: "Frequently asked questions | National Securities" },
  "faq-4": { mn: "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК", en: "Frequently asked questions | National Securities" },
  "faq-5": { mn: "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК", en: "Frequently asked questions | National Securities" },
  "faq-6": { mn: "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК", en: "Frequently asked questions | National Securities" },
  "faq-7": { mn: "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК", en: "Frequently asked questions | National Securities" },
  "faq-8": { mn: "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК", en: "Frequently asked questions | National Securities" },
  "not-found": { mn: "Хуудас олдсонгүй | Нэйшнл сэкюритис ҮЦК", en: "Page not found | National Securities" },
};

/** Every route but `home`, which owns `/` rather than a directory of its own. */
export const PAGE_ROUTES = ROUTES.filter((route) => route !== "home");

export function isRoute(value: string): value is Route {
  return (ROUTES as readonly string[]).includes(value);
}

export const DESCRIPTIONS: Record<Lang, string> = {
  mn: "Санхүүгийн зохицуулах хорооны тусгай зөвшөөрөлтэй үнэт цаасны компани. Брокер, андеррайтер, хөрөнгө оруулалтын зөвлөх үйлчилгээ.",
  en: "A securities company licensed by Mongolia's Financial Regulatory Commission. Broker, underwriter and investment advisory services.",
};

/**
 * The URL a route lives at, in a given language. `trailingSlash` is on, so
 * every path carries one. Mongolian is the site's own language and holds the
 * bare paths; English lives under `/en/`.
 */
export function pathOf(route: Route, lang: Lang = "mn"): string {
  const base = route === "home" ? "/" : `/${route}/`;
  return lang === "en" ? `/en${base}` : base;
}

/** Which language a path is written in. */
export function langFromPath(pathname: string): Lang {
  return /^\/en(\/|$)/.test(pathname) ? "en" : "mn";
}

/**
 * A stale or mistyped path used to land silently on the homepage, leaving the
 * reader to work out for themselves that the page they wanted is gone.
 */
export function routeFromPath(pathname: string): Route {
  const slug = pathname
    .replace(/^\/en(?=\/|$)/, "")
    .replace(/^\/+|\/+$/g, "");
  if (!slug) return "home";
  return isRoute(slug) ? slug : "not-found";
}

/**
 * The `hreflang` set for one route: each language pointing at its own URL, and
 * `x-default` at the Mongolian one, which is the site's own language.
 */
export function alternatesFor(route: Route): Record<string, string> {
  return {
    mn: pathOf(route, "mn"),
    en: pathOf(route, "en"),
    "x-default": pathOf(route, "mn"),
  };
}
