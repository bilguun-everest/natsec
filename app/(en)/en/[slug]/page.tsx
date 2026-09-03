import type { Metadata } from "next";
import App from "@/components/App";
import { getPageData } from "@/lib/page-data";
import {
  PAGE_ROUTES,
  TITLES,
  alternatesFor,
  isRoute,
  pathOf,
  type Route,
} from "@/lib/routes";

/**
 * Every English page that is not the homepage.
 *
 * `output: "export"` turns this into one HTML file per route, carrying that
 * page's own markup, its own <title> and its own `hreflang` pair. That is the
 * whole point: a crawler, a shared link and a reader without JavaScript all
 * get the page they asked for, in the language they asked for.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PAGE_ROUTES.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = (isRoute(slug) ? slug : "not-found") as Route;

  // The 404 is reachable at a real URL so Apache can serve it, but it is not a
  // page anyone should arrive at from a search result.
  if (route === "not-found") {
    return { title: TITLES[route].en, robots: { index: false, follow: false } };
  }

  return {
    title: TITLES[route].en,
    alternates: {
      canonical: pathOf(route, "en"),
      languages: alternatesFor(route),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { snapshot, session, content } = await getPageData();

  return (
    <App
      snapshot={snapshot}
      session={session}
      content={content}
      initialRoute={(isRoute(slug) ? slug : "not-found") as Route}
    />
  );
}
