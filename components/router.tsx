"use client";

import { useEffect, useRef, useState } from "react";

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
  "faq-1",
  "faq-2",
  "faq-3",
  "faq-4",
  "faq-5",
  "faq-6",
  "faq-7",
  "faq-8",
] as const;

export type Route = (typeof ROUTES)[number];

const TITLES: Record<Route, string> = {
  home: "Нэйшнл сэкюритис ҮЦК | Хөрөнгийн зах зээлийн түнш",
  tanilcuulga: "Танилцуулга | Нэйшнл сэкюритис ҮЦК",
  udirdlaga: "Удирдах албан тушаалтан | Нэйшнл сэкюритис ҮЦК",
  ololt: "Ололт амжилт | Нэйшнл сэкюритис ҮЦК",
  tailan: "Санхүүгийн тайлан | Нэйшнл сэкюритис ҮЦК",
  broker: "Брокерийн үйлчилгээ | Нэйшнл сэкюритис ҮЦК",
  anderraiter: "Андеррайтер | Нэйшнл сэкюритис ҮЦК",
  zuvluh: "Хөрөнгө оруулалтын зөвлөгөө | Нэйшнл сэкюритис ҮЦК",
  sudalgaa: "Судалгаа | Нэйшнл сэкюритис ҮЦК",
  "sudalgaa-toim": "Долоо хоногийн тойм | Нэйшнл сэкюритис ҮЦК",
  zaavar: "Харилцагчийн туслах | Нэйшнл сэкюритис ҮЦК",
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
  "faq-1": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-2": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-3": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-4": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-5": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-6": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-7": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
  "faq-8": "Түгээмэл асуулт | Нэйшнл сэкюритис ҮЦК",
};

function routeFromHash(): Route {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "");
  return (ROUTES as readonly string[]).includes(hash) ? (hash as Route) : "home";
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
