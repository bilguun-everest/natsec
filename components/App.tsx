"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { A, useLang } from "@/components/lang";
import { MarketProvider } from "@/components/market";
import { useEffect, useRef } from "react";
import MarketTicker from "@/components/MarketTicker";
import About from "@/components/pages/About";
import Advisory from "@/components/pages/Advisory";
import Contact from "@/components/pages/Contact";
import Faq from "@/components/pages/Faq";
import FaqDetail from "@/components/pages/FaqDetail";
import GuideDetail from "@/components/pages/GuideDetail";
import Guides from "@/components/pages/Guides";
import Home from "@/components/pages/Home";
import NotFound from "@/components/pages/NotFound";
import Research from "@/components/pages/Research";
import Services from "@/components/pages/Services";
import Sustainability, { PolicyDetail } from "@/components/pages/Sustainability";
import Underwriter from "@/components/pages/Underwriter";
import WeeklyReview from "@/components/pages/WeeklyReview";
import {
  RouteProvider,
  navigate,
  langFromPath,
  routeFromPath,
  useRoute,
  type Route,
} from "@/components/router";
import type { SiteContent } from "@/lib/content";
import { FAQ } from "@/lib/faq";
import { GUIDES } from "@/lib/guides";
import type { SessionState } from "@/lib/market-hours";
import type { MarketSnapshot } from "@/lib/mse";
import { POLICIES } from "@/lib/policies";

function Page({ route, content }: { route: Route; content: SiteContent }) {
  const guide = GUIDES.find((entry) => entry.route === route);
  if (guide) return <GuideDetail guide={guide} />;

  const faq = FAQ.find((entry) => entry.route === route);
  if (faq) return <FaqDetail entry={faq} />;

  const policy = POLICIES.find((entry) => entry.route === route);
  if (policy) return <PolicyDetail policy={policy} />;

  switch (route) {
    // One About page, reached by four routes: the footer links to each part by
    // name, and <About> scrolls to whichever one was asked for. `udirdlaga` is
    // kept only so the leadership link the footer used to publish still lands
    // on a real page; it has no section left, so it opens at the top.
    case "tanilcuulga":
    case "udirdlaga":
    case "ololt":
    case "tailan":
      return <About reports={content.reports} />;
    case "broker":
      return <Services />;
    case "anderraiter":
      return <Underwriter />;
    case "zuvluh":
      return <Advisory />;
    case "sudalgaa":
      return <Research research={content.research} weekly={content.weekly} />;
    case "sudalgaa-toim":
      return <WeeklyReview weekly={content.weekly} />;
    case "zaavar":
      return <Guides />;
    case "faq":
      return <Faq />;
    case "tog-hugjil":
      return <Sustainability />;
    case "holboo-barih":
      return <Contact />;
    case "not-found":
      return <NotFound />;
    default:
      return <Home />;
  }
}

export default function App({
  snapshot,
  session,
  content,
  initialRoute,
}: {
  snapshot: MarketSnapshot;
  session: SessionState;
  content: SiteContent;
  initialRoute: Route;
}) {
  const route = useRoute(initialRoute);
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);

  // Every link on the site is a real anchor with a real path: it survives a middle
  // click, a crawler and a reader with no JavaScript. This turns the ones that
  // point at a page of ours into an in-place swap, so the site still navigates
  // without a reload. Anything else — a modified click, another tab, a file,
  // an outside domain — is left to the browser.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      const next = routeFromPath(new URL(anchor.href).pathname);
      // `not-found` here means the path is not one of ours at all — a PDF, an
      // image. Those are the browser's job, not the router's.
      if (next === "not-found") return;

      event.preventDefault();
      navigate(next, langFromPath(new URL(anchor.href).pathname));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Client-side navigation swaps the document's contents without any of the
  // signals a real navigation gives: focus stays wherever it was and assistive
  // tech is told nothing. Moving focus to the new <main> restores both.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // `preventScroll` matters: focusing an element scrolls it into view by
    // default, which would drop the reader past the utility bar and header
    // on every navigation.
    main.current?.focus({ preventScroll: true });
  }, [route]);

  return (
    <MarketProvider initial={snapshot} initialSession={session}>
      <RouteProvider value={route}>
        <SkipLink target={main} />
        <Header />
        {/* Keyed on the route so React remounts on navigation — that restarts
            both the enter animation and every scroll reveal on the new page. */}
        <main
          id="main"
          className="app-page page-view"
          key={route}
          ref={main}
          tabIndex={-1}
        >
          <Page route={route} content={content} />
        </main>
        <Footer />
        <MarketTicker />
      </RouteProvider>
    </MarketProvider>
  );
}

/**
 * A button, not an anchor. Moving focus is the whole job here, and an <A>
 * would also push a fragment onto a URL that is otherwise clean.
 */
function SkipLink({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const { t } = useLang();
  return (
    <button
      type="button"
      className="skip-link"
      onClick={() => target.current?.focus({ preventScroll: true })}
    >
      {t("Үндсэн хэсэг рүү очих", "Skip to main content")}
    </button>
  );
}
