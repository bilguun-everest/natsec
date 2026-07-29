"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";
import TickerBar from "@/components/TickerBar";
import UtilityBar from "@/components/UtilityBar";
import About from "@/components/pages/About";
import Achievements from "@/components/pages/Achievements";
import Advisory from "@/components/pages/Advisory";
import Contact from "@/components/pages/Contact";
import FaqDetail from "@/components/pages/FaqDetail";
import GuideDetail from "@/components/pages/GuideDetail";
import Guides from "@/components/pages/Guides";
import Home from "@/components/pages/Home";
import Leadership from "@/components/pages/Leadership";
import Reports from "@/components/pages/Reports";
import Research from "@/components/pages/Research";
import Services from "@/components/pages/Services";
import Sustainability, { PolicyDetail } from "@/components/pages/Sustainability";
import Underwriter from "@/components/pages/Underwriter";
import WeeklyReview from "@/components/pages/WeeklyReview";
import { useRoute, type Route } from "@/components/router";
import { FAQ } from "@/lib/faq";
import { GUIDES } from "@/lib/guides";
import { POLICIES } from "@/lib/policies";

function Page({ route }: { route: Route }) {
  const guide = GUIDES.find((entry) => entry.route === route);
  if (guide) return <GuideDetail guide={guide} />;

  const faq = FAQ.find((entry) => entry.route === route);
  if (faq) return <FaqDetail entry={faq} />;

  const policy = POLICIES.find((entry) => entry.route === route);
  if (policy) return <PolicyDetail policy={policy} />;

  switch (route) {
    case "tanilcuulga":
      return <About />;
    case "udirdlaga":
      return <Leadership />;
    case "ololt":
      return <Achievements />;
    case "tailan":
      return <Reports />;
    case "broker":
      return <Services />;
    case "anderraiter":
      return <Underwriter />;
    case "zuvluh":
      return <Advisory />;
    case "sudalgaa":
      return <Research />;
    case "sudalgaa-toim":
      return <WeeklyReview />;
    case "zaavar":
      return <Guides />;
    case "tog-hugjil":
      return <Sustainability />;
    case "holboo-barih":
      return <Contact />;
    default:
      return <Home />;
  }
}

export default function App() {
  const route = useRoute();

  return (
    <>
      <UtilityBar />
      <Header />
      <TickerBar />
      {/* Keyed on the route so React remounts on navigation — that restarts
          both the enter animation and every scroll reveal on the new page. */}
      <main id="main" className="app-page page-view" key={route}>
        <Page route={route} />
      </main>
      <Footer />
      <MarketTicker />
    </>
  );
}
