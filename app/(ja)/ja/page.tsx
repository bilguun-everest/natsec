import type { Metadata } from "next";
import App from "@/components/App";
import { getPageData } from "@/lib/page-data";
import { TITLES, alternatesFor } from "@/lib/routes";

/** The Japanese homepage, at `/ja/`. */
export const metadata: Metadata = {
  title: TITLES.home.ja,
  alternates: { canonical: "/ja/", languages: alternatesFor("home") },
};

export default async function Page() {
  const { snapshot, session, content } = await getPageData();

  return (
    <App
      snapshot={snapshot}
      session={session}
      content={content}
      initialRoute="home"
    />
  );
}
