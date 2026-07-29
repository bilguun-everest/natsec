import { NextResponse } from "next/server";
import { CACHE_TTL_MS, getMarketSnapshot } from "@/lib/mse";

/**
 * The snapshot the browser polls while the exchange is trading.
 *
 * Marked dynamic on purpose: the caching lives in `getMarketSnapshot()`, one
 * layer down, so this handler is a cheap read of an already-shared entry.
 * Putting a route-level cache here as well would only add a second, differently
 * aged copy of the same data.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const snapshot = await getMarketSnapshot();

  return NextResponse.json(snapshot, {
    headers: {
      // Let a CDN absorb the fan-out too, but never serve a snapshot older
      // than the upstream poll interval.
      "Cache-Control": `public, max-age=0, s-maxage=${Math.floor(
        CACHE_TTL_MS / 1000,
      )}, stale-while-revalidate=120`,
    },
  });
}
