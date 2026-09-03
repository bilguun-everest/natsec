"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  ROUTES,
  ROUTE_EVENT,
  TITLES,
  isRoute,
  langFromPath,
  pathOf,
  routeFromPath,
  type Lang,
  type Route,
} from "@/lib/routes";

export {
  ROUTES,
  ROUTE_EVENT,
  TITLES,
  langFromPath,
  pathOf,
  routeFromPath,
  type Lang,
  type Route,
};

export function navigate(route: Route, lang: Lang = "mn") {
  const path = pathOf(route, lang);
  if (path === window.location.pathname) return;
  window.history.pushState(null, "", path);
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

/**
 * Path routing. Every route is its own exported HTML file, so the first render
 * is already the right page — `initial` comes from the file the reader loaded,
 * and server and client markup agree without a round trip through the DOM.
 */
export function useRoute(initial: Route): Route {
  const [route, setRoute] = useState<Route>(initial);
  // Tracked only so the title can follow it: switching language changes the
  // page's language without changing which page it is, and the title has to
  // move with it.
  const [lang, setLang] = useState<Lang>("mn");
  const firstRun = useRef(true);

  useEffect(() => {
    // The site addressed its pages by fragment until the move to real paths.
    // Anything bookmarked or shared before that still arrives as `/#broker`;
    // rewrite it in place so the reader lands on the page they asked for and
    // the old-style URL leaves no trace in the address bar.
    const legacy = window.location.hash.replace("#", "");
    if (legacy && isRoute(legacy)) {
      window.history.replaceState(
        null,
        "",
        pathOf(legacy, langFromPath(window.location.pathname)),
      );
      setRoute(legacy);
    }

    const sync = () => {
      setRoute(routeFromPath(window.location.pathname));
      setLang(langFromPath(window.location.pathname));
    };
    // Once on mount as well as on every navigation. `initial` already gives
    // the right route, but nothing has told this hook which language the file
    // it is hydrating was written in.
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  useEffect(() => {
    // The exported file already carries the right <title>, so the first pass
    // has nothing to correct; this keeps it true through the client-side
    // navigations that follow, language switches included.
    if (!firstRun.current) document.title = TITLES[route][lang];
  }, [route, lang]);

  useEffect(() => {
    // Every in-site navigation opens at the top — but the initial load keeps
    // whatever scroll position the browser restored, and a language switch
    // stays where the reader was. The jump is instant on purpose: animating a
    // full page of travel before the new page arrives reads as lag.
    if (firstRun.current) firstRun.current = false;
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);

  return route;
}

/**
 * The active route, shared. `useRoute()` owns the listeners and the title and
 * scroll side effects, so it must be called exactly once; anything else that
 * needs to know where the reader is reads it from here.
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
