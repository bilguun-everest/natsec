import { getSiteContent, type SiteContent } from "@/lib/content";
import { sessionState } from "@/lib/market-hours";
import {
  asBuildTimeSnapshot,
  getMarketSnapshot,
  type MarketSnapshot,
} from "@/lib/mse";
import type { SessionState } from "@/lib/market-hours";

export type PageData = {
  snapshot: MarketSnapshot;
  session: SessionState;
  content: SiteContent;
};

/**
 * Everything every page needs, fetched once for the whole build.
 *
 * There are thirty-odd exported pages now and they all carry the same market
 * panel and the same footer. Without this the build would poll mse.mn once per
 * page — slow, and rude to a service that answers for free. The promise is held
 * at module scope, so the first page to ask does the work and the rest await it.
 */
let pending: Promise<PageData> | null = null;

export function getPageData(): Promise<PageData> {
  if (!pending) {
    pending = (async () => {
      const [snapshot, content] = await Promise.all([
        getMarketSnapshot(),
        getSiteContent(),
      ]);
      return {
        // Marks the numbers not-live, so the panel shows its true timestamp
        // rather than claiming build-time prices are current.
        snapshot: asBuildTimeSnapshot(snapshot),
        session: sessionState(),
        content,
      };
    })();
  }
  return pending;
}
