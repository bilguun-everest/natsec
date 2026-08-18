/**
 * Live market data from the Mongolian Stock Exchange (mse.mn).
 *
 * Two public surfaces are used:
 *   • `https://mse.mn/api/*`  — plain REST (index levels, disclosures).
 *   • the data endpoint the mse.mn front-end itself calls for the trading
 *     board, reached through their public server action.
 *
 * Everything here runs on the server only, and every call degrades to `null`
 * rather than throwing: the page must render even when the exchange is down.
 *
 * Freshness is owned by `getMarketSnapshot()` at the bottom of this file — a
 * single process-wide cache shared by the page render and `/api/market`, so a
 * thousand polling browsers still produce one set of upstream requests per
 * interval. Every payload carries the instant it was retrieved, because the
 * exchange itself sends no timestamp.
 */

const API = "https://mse.mn/api";
const WEB = "https://www.mse.mn";
const TIMEOUT_MS = 8000;

/**
 * The trading board is not a REST endpoint. It is reached through the React
 * server action that the mse.mn front-end itself calls, and a server action is
 * addressed by a build hash rather than by a name — so this value changes every
 * time they redeploy.
 *
 * A stale hash does not fail loudly: mse.mn answers `200 OK` with its ordinary
 * homepage HTML instead of a Flight payload, so status codes stay green while
 * the board quietly empties. That is why this is a *seed* rather than the
 * address — it saves the first lookup, and `board()` re-discovers the real one
 * from mse.mn's own bundles the moment it stops working.
 */
const SEED_ACTION_ID = "6d867ebd99fb6edef2f9537b22668cd0c00a71c2";

/* ------------------------------------------------------------------ types */

export interface IndexTable {
  top20Unit: number;
  top20Change: number;
  top20Percent: number;
  mseAUnit: number;
  mseAChange: number;
  mseAPercent: number;
  mseBUnit: number;
  mseBChange: number;
  mseBPercent: number;
}

/** One row of the trading board, normalised across shares / bonds / ABS. */
export interface TradeRow {
  symbol: string;
  name: string;
  /** Last price, or turnover when the board is sorted by turnover. */
  value: string;
  percent: number;
  change: number;
}

export interface BoardTables {
  up: TradeRow[];
  down: TradeRow[];
  amount: TradeRow[];
}

export interface Board {
  stock: BoardTables;
  bond: BoardTables;
  abs: BoardTables;
}

export interface Disclosure {
  symbol: string;
  company: string;
  type: string;
  date: string;
}

/* ---------------------------------------------------------------- fetching */

async function withTimeout(input: string, init: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Failures are logged rather than swallowed. A silent feed is the dangerous
 * case: the page keeps rendering and nobody notices the numbers stopped.
 */
function warn(what: string, detail: unknown) {
  console.warn(`[mse] ${what} failed:`, detail);
}

async function rest<T>(path: string): Promise<T | null> {
  try {
    const res = await withTimeout(`${API}/${path}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      warn(path, `HTTP ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    warn(path, error);
    return null;
  }
}

/* ------------------------------------------------------- the board action */

/** The hash currently believed to address the board action. */
let actionId = SEED_ACTION_ID;

/** Shared, so eighteen simultaneous board failures cause one scan, not eighteen. */
let discovering: Promise<string | null> | null = null;
let lastDiscoveryAt = 0;

/**
 * How long to wait before scanning again after a scan that found nothing.
 * A fruitless scan means the exchange is unreachable far more often than it
 * means the hash rotated, and re-reading thirty bundles on every poll would
 * turn their outage into our traffic.
 */
const DISCOVERY_COOLDOWN_MS = 5 * 60_000;

/** A question whose answer is recognisably the board, used to identify the hash. */
const PROBE_BODY = JSON.stringify([
  {
    url: "stock_up",
    parameter: "?lang=mn&segments=[1,2,3]",
    config: { hasToken: false },
  },
]);

type ActionResult =
  | { ok: true; payload: unknown }
  | { ok: false; stale: boolean };

/**
 * Posts one server-action call and unwraps the React Flight response — the
 * payload arrives as a `1:<json>` line.
 *
 * `stale` means the request was answered, but not by the action we asked for.
 * That is the exact shape a rotated hash takes, and it is why the check is on
 * the body rather than the status: mse.mn returns 200 either way.
 */
async function postAction(id: string, body: string): Promise<ActionResult> {
  const res = await withTimeout(WEB, {
    method: "POST",
    headers: { "Next-Action": id, "Content-Type": "text/plain;charset=UTF-8" },
    body,
  });
  if (!res.ok) return { ok: false, stale: res.status === 404 };

  const line = (await res.text())
    .split("\n")
    .find((candidate) => candidate.startsWith("1:"));
  if (!line) return { ok: false, stale: true };

  const payload = JSON.parse(line.slice(2));
  // Paginated endpoints wrap their rows in `{ data, total }`.
  return {
    ok: true,
    payload: (payload as { data?: unknown })?.data ?? payload,
  };
}

/** Every server-action hash registered in mse.mn's own client bundles. */
async function scanActionIds(): Promise<string[]> {
  const res = await withTimeout(WEB, { headers: { Accept: "text/html" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} reading the bundle list`);

  const html = await res.text();
  const chunks = [
    ...new Set(html.match(/\/_next\/static\/chunks\/[\w./-]+\.js/g) ?? []),
  ];

  const sources = await Promise.all(
    chunks.map(async (chunk) => {
      try {
        const chunkRes = await withTimeout(`${WEB}${chunk}`, {});
        return chunkRes.ok ? await chunkRes.text() : "";
      } catch {
        // One unreadable bundle should not cost us the other twenty-eight.
        return "";
      }
    }),
  );

  const ids = new Set<string>();
  for (const source of sources) {
    for (const match of source.matchAll(/\b[0-9a-f]{40}\b/g)) ids.add(match[0]);
  }
  return [...ids];
}

/**
 * Is this the board talking?
 *
 * An empty array is deliberately *not* accepted. It would match almost any
 * action on a quiet day, and caching a wrong hash that always answers `[]` is
 * the one failure this whole mechanism exists to prevent — it would look like
 * a healthy call forever. Refusing it costs nothing: if the exchange really has
 * no gainers, an empty board is the correct thing to show anyway, and the scan
 * simply succeeds on a later poll once trading produces rows.
 */
function looksLikeBoard(payload: unknown): boolean {
  if (!Array.isArray(payload) || payload.length === 0) return false;
  const row: unknown = payload[0];
  if (typeof row !== "object" || row === null) return false;
  return "legalDocument" in row || "typeBD" in row;
}

/**
 * Finds the hash that currently addresses the board action.
 *
 * The bundles say which hashes exist but not which one is the board, so every
 * candidate is asked the same question and the one that answers with rows wins.
 * Probes run in sequence and stop at the first match: firing all of them at
 * once would be a burst of pointless load on an exchange we have just
 * established is behaving unexpectedly.
 */
async function discoverActionId(failed: string): Promise<string | null> {
  const candidates = (await scanActionIds()).filter((id) => id !== failed);

  for (const candidate of candidates) {
    try {
      const result = await postAction(candidate, PROBE_BODY);
      if (result.ok && looksLikeBoard(result.payload)) return candidate;
    } catch {
      // A candidate that times out is simply not the one we keep.
    }
  }
  return null;
}

/**
 * A hash to retry with after `failed` was rejected, or null when there is
 * nothing new worth trying.
 */
async function refreshActionId(failed: string): Promise<string | null> {
  // A sibling call in the same batch already refreshed it.
  if (actionId !== failed) return actionId;
  if (discovering) return discovering;
  if (Date.now() - lastDiscoveryAt < DISCOVERY_COOLDOWN_MS) return null;

  lastDiscoveryAt = Date.now();
  discovering = discoverActionId(failed)
    .then((found) => {
      if (found) {
        console.warn(`[mse] board action id rotated: ${failed} -> ${found}`);
        actionId = found;
      } else {
        warn("action id discovery", "no candidate answered with board rows");
      }
      return found;
    })
    .catch((error) => {
      warn("action id discovery", error);
      return null;
    })
    .finally(() => {
      discovering = null;
    });

  return discovering;
}

/**
 * One table of the trading board.
 *
 * At the first sign the hash has rotated the correct one is re-discovered and
 * the call retried, so an mse.mn redeploy costs a single poll rather than
 * blanking the board until somebody notices and edits this file.
 */
async function board<T>(url: string, parameter: string): Promise<T | null> {
  const body = JSON.stringify([{ url, parameter, config: { hasToken: false } }]);

  try {
    const attempted = actionId;
    const first = await postAction(attempted, body);
    if (first.ok) return first.payload as T;

    if (!first.stale) {
      warn(url, "the exchange rejected the request");
      return null;
    }

    const fresh = await refreshActionId(attempted);
    if (!fresh || fresh === attempted) {
      warn(url, "no usable board action id");
      return null;
    }

    const retry = await postAction(fresh, body);
    if (retry.ok) return retry.payload as T;

    warn(url, "no flight payload even after re-discovering the action id");
    return null;
  } catch (error) {
    warn(url, error);
    return null;
  }
}

/* --------------------------------------------------------------- normalise */

interface RawShare {
  legalDocument: string;
  companyName: string;
  price?: string;
  amount?: string;
  changePercentage: number;
  changePrice: number;
}

interface RawBond {
  typeBD: string;
  company: string;
  price?: string;
  amount?: string;
  changePercentage: number;
  changePrice: number;
}

const toRows = (raw: unknown): TradeRow[] => {
  if (!Array.isArray(raw)) return [];
  return raw.map((row: RawShare & RawBond) => ({
    symbol: row.legalDocument ?? row.typeBD ?? "",
    name: row.companyName ?? row.company ?? "",
    value: row.price ?? row.amount ?? "",
    percent: Number(row.changePercentage ?? 0),
    change: Number(row.changePrice ?? 0),
  }));
};

/* ----------------------------------------------------------------- queries */

export function getIndexTable() {
  return rest<IndexTable>("index_table?lang=mn");
}

/**
 * Shares, bonds and asset-backed securities — gainers, losers, turnover.
 *
 * `reachable` distinguishes the two ways a board comes back empty: the exchange
 * answered and there genuinely were no trades, or nothing answered at all. The
 * UI must say different things in those two cases.
 */
export async function getBoard(
  lang: "mn" | "en" = "mn",
): Promise<{ board: Board; reachable: boolean }> {
  const shares = `?lang=${lang}&segments=[1,2,3]`;
  const bonds = `?lang=${lang}&type=BD`;
  const abs = `?lang=${lang}&type=IABS`;

  const results = await Promise.all([
    board("stock_up", shares),
    board("stock_down", shares),
    board("stock_amount", shares),
    board("stock_up_bond", bonds),
    board("stock_down_bond", bonds),
    board("stock_amount_bond", bonds),
    board("stock_up_bond", abs),
    board("stock_down_bond", abs),
    board("stock_amount_bond", abs),
  ]);

  const [
    stockUp,
    stockDown,
    stockAmount,
    bondUp,
    bondDown,
    bondAmount,
    absUp,
    absDown,
    absAmount,
  ] = results;

  return {
    reachable: results.some((result) => result !== null),
    board: {
      stock: {
        up: toRows(stockUp),
        down: toRows(stockDown),
        amount: toRows(stockAmount),
      },
      bond: {
        up: toRows(bondUp),
        down: toRows(bondDown),
        amount: toRows(bondAmount),
      },
      abs: {
        up: toRows(absUp),
        down: toRows(absDown),
        amount: toRows(absAmount),
      },
    },
  };
}

/** Latest company disclosures published on the exchange. */
export async function getDisclosures(
  lang: "mn" | "en" = "mn",
  limit = 6,
): Promise<{ disclosures: Disclosure[]; reachable: boolean }> {
  const raw = await rest<
    { companySymbol: string; description: string; type: string; date: string }[]
  >(`home_company_contents?lang=${lang}`);
  if (!Array.isArray(raw)) return { disclosures: [], reachable: false };
  return {
    reachable: true,
    disclosures: raw.slice(0, limit).map((item) => ({
      symbol: item.companySymbol,
      company: item.description,
      type: item.type,
      date: item.date,
    })),
  };
}

/** The same payload in both site languages — company names are localised. */
export interface Bilingual<T> {
  mn: T;
  en: T;
}

/* ------------------------------------------------------------- the snapshot */

/**
 * A payload plus the instant it was actually retrieved.
 *
 * `live: false` means the most recent attempt failed and `data` is the last
 * copy we managed to get — still worth showing, but only alongside its real
 * age. `fetchedAt: null` means we have never had data at all.
 */
export interface Feed<T> {
  data: T;
  fetchedAt: string | null;
  live: boolean;
}

export interface MarketSnapshot {
  index: Feed<IndexTable | null>;
  boards: Feed<Bilingual<Board>>;
  disclosures: Feed<Bilingual<Disclosure[]>>;
  /** Instant of the most recent poll attempt, successful or not. */
  polledAt: string;
}

const EMPTY_TABLES: BoardTables = { up: [], down: [], amount: [] };
const EMPTY_BOARD: Board = {
  stock: EMPTY_TABLES,
  bond: EMPTY_TABLES,
  abs: EMPTY_TABLES,
};

/** How long a retrieved snapshot is served before the exchange is polled again. */
export const CACHE_TTL_MS = 60_000;

interface CacheEntry {
  snapshot: MarketSnapshot;
  expiresAt: number;
}

// Process-wide, deliberately: the page render and every `/api/market` request
// share one entry, so upstream load is a function of time rather than of how
// many people have the site open. On a platform that runs several instances
// each keeps its own copy — still bounded, just multiplied by instance count.
let cache: CacheEntry | null = null;
let inflight: Promise<MarketSnapshot> | null = null;

/**
 * Carries a previous feed forward when the latest attempt failed, so a blip
 * downgrades the data's stated age instead of blanking the page.
 */
function retain<T>(previous: Feed<T> | undefined, empty: T): Feed<T> {
  if (!previous || previous.fetchedAt === null) {
    return { data: empty, fetchedAt: null, live: false };
  }
  return { ...previous, live: false };
}

async function poll(previous: MarketSnapshot | null): Promise<MarketSnapshot> {
  const now = new Date().toISOString();

  const [index, boardMn, boardEn, disclosuresMn, disclosuresEn] =
    await Promise.all([
      getIndexTable(),
      getBoard("mn"),
      getBoard("en"),
      getDisclosures("mn"),
      getDisclosures("en"),
    ]);

  const boardsOk = boardMn.reachable && boardEn.reachable;
  const disclosuresOk = disclosuresMn.reachable && disclosuresEn.reachable;

  return {
    polledAt: now,
    index: index
      ? { data: index, fetchedAt: now, live: true }
      : retain(previous?.index, null),
    boards: boardsOk
      ? {
          data: { mn: boardMn.board, en: boardEn.board },
          fetchedAt: now,
          live: true,
        }
      : retain(previous?.boards, { mn: EMPTY_BOARD, en: EMPTY_BOARD }),
    disclosures: disclosuresOk
      ? {
          data: {
            mn: disclosuresMn.disclosures,
            en: disclosuresEn.disclosures,
          },
          fetchedAt: now,
          live: true,
        }
      : retain(previous?.disclosures, { mn: [], en: [] }),
  };
}

/**
 * The one entry point for market data. Serves the cached snapshot until it
 * expires, then polls the exchange once — concurrent callers await the same
 * request rather than each starting their own.
 */
export async function getMarketSnapshot(): Promise<MarketSnapshot> {
  if (cache && cache.expiresAt > Date.now()) return cache.snapshot;
  if (inflight) return inflight;

  const previous = cache?.snapshot ?? null;

  inflight = poll(previous)
    .catch((error): MarketSnapshot => {
      // `poll` catches per-request, so reaching here means something
      // unexpected broke. Degrade to the retained snapshot rather than
      // letting the page render throw.
      warn("snapshot", error);
      const now = new Date().toISOString();
      return {
        polledAt: now,
        index: retain(previous?.index, null),
        boards: retain(previous?.boards, { mn: EMPTY_BOARD, en: EMPTY_BOARD }),
        disclosures: retain(previous?.disclosures, { mn: [], en: [] }),
      };
    })
    .then((snapshot) => {
      cache = { snapshot, expiresAt: Date.now() + CACHE_TTL_MS };
      return snapshot;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

/**
 * The snapshot as it should be embedded in a statically exported page.
 *
 * That HTML is written once at build time and then served unchanged for as long
 * as the site is up, so its prices are a starting point, never a quotation.
 * Marking every feed `live: false` while keeping the real `fetchedAt` is what
 * the UI already understands as "this is the last thing we had, and here is how
 * old it is" — the panel shows its reconnecting state and the true timestamp
 * until the browser's first poll of `market.php` lands a moment later.
 *
 * Keeping the numbers rather than blanking them avoids the page reflowing
 * around an empty ticker on every first paint.
 */
export function asBuildTimeSnapshot(snapshot: MarketSnapshot): MarketSnapshot {
  return {
    ...snapshot,
    index: { ...snapshot.index, live: false },
    boards: { ...snapshot.boards, live: false },
    disclosures: { ...snapshot.disclosures, live: false },
  };
}

/* ------------------------------------------------------------- formatting */

export const formatIndex = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatPercent = (value: number) =>
  `${value > 0 ? "▲" : value < 0 ? "▼" : "—"} ${Math.abs(value).toFixed(2)}%`;

export const direction = (value: number): "up" | "down" | "flat" =>
  value > 0 ? "up" : value < 0 ? "down" : "flat";
