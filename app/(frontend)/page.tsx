import App from "@/components/App";
import { getPageData } from "@/lib/page-data";

/**
 * The homepage.
 *
 * There is no server at runtime — cPanel serves files, and the only live thing
 * is `public/market.php`, which the browser polls for prices. So this component
 * runs exactly once, at build time.
 *
 * Every other page of the site is `[slug]/page.tsx`, exported the same way.
 */
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
