import App from "@/components/App";
import { getSiteContent } from "@/lib/content";
import { sessionState } from "@/lib/market-hours";
import { asBuildTimeSnapshot, getMarketSnapshot } from "@/lib/mse";

/**
 * The whole site is one statically exported document.
 *
 * There is no server at runtime — cPanel serves files, and the only live thing
 * is `public/market.php`, which the browser polls for prices. So this component
 * runs exactly once, at build time.
 *
 * The market snapshot is still fetched here, because shipping the numbers in
 * the markup means the first paint has a filled-in panel and ticker rather than
 * an empty frame that reflows a moment later. `asBuildTimeSnapshot` marks them
 * not-live so nothing claims to be current that isn't.
 */
export default async function Page() {
  const [snapshot, content] = await Promise.all([
    getMarketSnapshot(),
    getSiteContent(),
  ]);

  return (
    <App
      snapshot={asBuildTimeSnapshot(snapshot)}
      session={sessionState()}
      content={content}
    />
  );
}
