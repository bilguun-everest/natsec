import type { Metadata } from "next";
import App from "@/components/App";
import { getPageData } from "@/lib/page-data";
import { PAGE_ROUTES, TITLES, isRoute, type Route } from "@/lib/routes";

/**
 * Every page that is not the homepage.
 *
 * `output: "export"` turns this into one HTML file per route — `/broker/` is
 * really `out/broker/index.html`, carrying that page's own markup and its own
 * <title>. That is the whole point: a crawler, a shared link and a reader
 * without JavaScript all get the page they asked for. Once the reader has it,
 * `App` takes over and navigation is client-side again.
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
  // The 404 page is reachable at a real URL so Apache can serve it, but it is
  // not a page anyone should arrive at from a search result.
  if (route === "not-found") {
    return { title: TITLES[route], robots: { index: false, follow: false } };
  }

  return {
    title: TITLES[route],
    alternates: { canonical: `/${slug}/` },
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
