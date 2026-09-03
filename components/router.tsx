"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  ROUTES,
  TITLES,
  isRoute,
  pathOf,
  routeFromPath,
  type Route,
} from "@/lib/routes";

export { ROUTES, TITLES, pathOf, routeFromPath, type Route };

/**
 * `history.pushState` fires no event of its own, so navigation raises this and
 * `useRoute` listens for it alongside the browser's own `popstate`.
 */
const ROUTE_EVENT = "natsec:route";

export function navigate(route: Route) {
  const path = pathOf(route);
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
  const firstRun = useRef(true);

  useEffect(() => {
    // The site addressed its pages by fragment until the move to real paths.
    // Anything bookmarked or shared before that still arrives as `/#broker`;
    // rewrite it in place so the reader lands on the page they asked for and
    // the old-style URL leaves no trace in the address bar.
    const legacy = window.location.hash.replace("#", "");
    if (legacy && isRoute(legacy)) {
      window.history.replaceState(null, "", pathOf(legacy));
      setRoute(legacy);
    }

    const sync = () => setRoute(routeFromPath(window.location.pathname));
    window.addEventListener("popstate", sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  useEffect(() => {
    // The exported file already carries the right <title>; this keeps it true
    // through the client-side navigations that follow.
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
