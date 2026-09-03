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
  "sudalgaa-toim",
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

export const TITLES: Record<Route, string> = {
  home: "Нэйшнл сэкюритис ҮЦК | Хөрөнгийн зах зээлийн түнш",
  tanilcuulga: "Танилцуулга | Нэйшнл сэкюритис ҮЦК",
  // Legacy: the leadership section was removed, but the footer published
  // this link for long enough that it should still land somewhere real.
  udirdlaga: "Танилцуулга | Нэйшнл сэкюритис ҮЦК",
  ololt: "Ололт амжилт | Нэйшнл сэкюритис ҮЦК",
  tailan: "Санхүүгийн тайлан | Нэйшнл сэкюритис ҮЦК",
  broker: "Брокерийн үйлчилгээ | Нэйшнл сэкюритис ҮЦК",
  anderraiter: "Андеррайтер | Нэйшнл сэкюритис ҮЦК",
  zuvluh: "Хөрөнгө оруулалтын зөвлөгөө | Нэйшнл сэкюритис ҮЦК",
  sudalgaa: "Судалгаа | Нэйшнл сэкюритис ҮЦК",
  "sudalgaa-toim": "Долоо хоногийн тойм | Нэйшнл сэкюритис ҮЦК",
  zaavar: "Хэрхэн эхлэх | Нэйшнл сэкюритис ҮЦК",
  "zaavar-dansneeh": "Данс нээх | Нэйшнл сэкюритис ҮЦК",
  "zaavar-mhb": "МХБ-ийн арилжаанд оролцох | Нэйшнл сэкюритис ҮЦК",
  "zaavar-ipo": "IPO-д хэрхэн оролцох вэ | Нэйшнл сэкюритис ҮЦК",
  "zaavar-mungu": "Мөнгө байршуулах, татах | Нэйшнл сэкюритис ҮЦК",
  "zaavar-tsenegleh": "Данс цэнэглэх | Нэйшнл сэкюритис ҮЦК",
  "zaavar-nogdol": "Ногдол ашиг авах | Нэйшнл сэкюритис ҮЦК",
  "tog-hugjil": "Тогтвортой хөгжил | Нэйшнл сэкюритис ҮЦК",
  "tog-hugjil-esg": "Тогтвортой хөгжлийн бодлого (ESG) | Нэйшнл сэкюритис ҮЦК",
  "tog-hugjil-privacy": "Нууцлалын бодлого | Нэйшнл сэкюритис ҮЦК",
  "tog-hugjil-terms": "Үйлчилгээний нөхцөл | Нэйшнл сэкюритис ҮЦК",
  "holboo-barih": "Холбоо барих | Нэйшнл сэкюритис ҮЦК",
  faq: "Түгээмэл асуулт хариулт | Нэйшнл сэкюритис ҮЦК",
  "faq-1": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-2": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-3": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-4": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-5": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-6": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-7": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-8": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "not-found": "Хуудас олдсонгүй | Нэйшнл сэкюритис ҮЦК",
};

/** Every route but `home`, which owns `/` rather than a directory of its own. */
export const PAGE_ROUTES = ROUTES.filter((route) => route !== "home");

export function isRoute(value: string): value is Route {
  return (ROUTES as readonly string[]).includes(value);
}

/** The URL a route lives at. `trailingSlash` is on, so every path carries one. */
export function pathOf(route: Route): string {
  return route === "home" ? "/" : `/${route}/`;
}

/**
 * A stale or mistyped path used to land silently on the homepage, leaving the
 * reader to work out for themselves that the page they wanted is gone.
 */
export function routeFromPath(pathname: string): Route {
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!slug) return "home";
  return isRoute(slug) ? slug : "not-found";
}
