"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
] as const;

export type Route = (typeof ROUTES)[number] | "not-found";

const TITLES: Record<Route, string> = {
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

function routeFromHash(): Route {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "");
  if (!hash) return "home";
  // A stale or mistyped link used to land silently on the homepage, leaving
  // the reader to work out for themselves that the page they wanted is gone.
  return (ROUTES as readonly string[]).includes(hash)
    ? (hash as Route)
    : "not-found";
}

/**
 * Hash routing, as in the design: every page lives in one document and the
 * fragment picks which one is mounted. The first render is always `home` so
 * server and client markup agree; the real route lands on mount.
 */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>("home");
  const firstRun = useRef(true);

  useEffect(() => {
    const sync = () => setRoute(routeFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    document.title = TITLES[route];
    // Every in-site navigation opens at the top — but the initial load keeps
    // whatever scroll position the browser restored. The jump is instant on
    // purpose: `html` smooth-scrolls, and animating a full page of travel
    // before the new page fades in reads as lag, not polish.
    if (firstRun.current) firstRun.current = false;
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);

  return route;
}

export function navigate(route: Route) {
  window.location.hash = route;
}

/**
 * The active route, shared. `useRoute()` owns a listener and the title/scroll
 * side effects, so it must be called exactly once; anything else that needs to
 * know where the reader is reads it from here.
 */
const RouteContext = createContext<Route>("home");
export const RouteProvider = RouteContext.Provider;
export const useCurrentRoute = () => useContext(RouteContext);

/** True when `route` is the section owned by this top-level nav entry. */
export function sectionOf(route: Route): string {
  if (route === "home") return "home";
  if (/^(tanilcuulga|udirdlaga|ololt|tailan)$/.test(route)) return "about";
  if (/^(broker|anderraiter|zuvluh)$/.test(route)) return "services";
  if (route.startsWith("sudalgaa")) return "research";
  // Customer Support owns two routes it does not look like it should. The
  // guides were their own top-level section until the bar ran out of room and
  // they became a group in this menu; Terms of Service is a policy page, but
  // Customer Support is where it is linked from, so that is the tab to light.
  if (
    route.startsWith("zaavar") ||
    route.startsWith("faq") ||
    route === "holboo-barih" ||
    route === "tog-hugjil-terms"
  )
    return "support";
  if (route.startsWith("tog-hugjil")) return "sustainability";
  return "home";
}
