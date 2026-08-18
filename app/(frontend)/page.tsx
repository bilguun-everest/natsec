import App from "@/components/App";
import { getSiteContent } from "@/lib/content";
import { sessionState } from "@/lib/market-hours";
import { getMarketSnapshot } from "@/lib/mse";

/**
 * Regenerated at most once a minute rather than on every request.
 *
 * The in-process cache in `getMarketSnapshot()` bounds upstream load on a
 * long-running server, but serverless instances are ephemeral — a cold one
 * would poll mse.mn again. Letting the platform cache the rendered HTML puts a
 * hard ceiling on that regardless of instance count or traffic, and the first
 * paint is at worst a minute old because the browser then polls `/api/market`
 * directly.
 *
 * The same window applies to editable content: a report published in the
 * dashboard appears on the site within a minute.
 */
export const revalidate = 60;

export default async function Page() {
  const [snapshot, content] = await Promise.all([
    getMarketSnapshot(),
    getSiteContent(),
  ]);

  return <App snapshot={snapshot} session={sessionState()} content={content} />;
}
