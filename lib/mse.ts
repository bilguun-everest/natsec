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
const ACTION_ID = "6d867ebd99fb6edef2f9537b22668cd0c00a71c2";
const TIMEOUT_MS = 8000;

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

/**
 * Calls the mse.mn data action and unwraps the React Flight response — the
 * payload arrives as a `1:<json>` line.
 *
 * `ACTION_ID` is a build hash of the mse.mn front-end: when they redeploy, it
 * changes and every call here starts returning null. That is why the failure is
 * logged loudly and surfaced through `health.board` — the symptom is an empty
 * board on a page that otherwise looks perfectly healthy.
 */
async function board<T>(url: string, parameter: string): Promise<T | null> {
  try {
    const res = await withTimeout(WEB, {
      method: "POST",
      headers: {
        "Next-Action": ACTION_ID,
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: JSON.stringify([{ url, parameter, config: { hasToken: false } }]),
    });
    if (!res.ok) {
      warn(url, `HTTP ${res.status} — ACTION_ID may be stale`);
      return null;
    }

    const line = (await res.text())
      .split("\n")
      .find((candidate) => candidate.startsWith("1:"));
    if (!line) {
      warn(url, "no flight payload — ACTION_ID may be stale");
      return null;
    }

    const payload = JSON.parse(line.slice(2));
    // Paginated endpoints wrap their rows in `{ data, total }`.
    return (payload?.data ?? payload) as T;
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
