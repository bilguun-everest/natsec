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
 * Freshness is controlled by `export const revalidate` in `app/page.tsx`.
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

async function rest<T>(path: string): Promise<T | null> {
  try {
    const res = await withTimeout(`${API}/${path}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Calls the mse.mn data action and unwraps the React Flight response — the
 * payload arrives as a `1:<json>` line.
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
    if (!res.ok) return null;

    const line = (await res.text())
      .split("\n")
      .find((candidate) => candidate.startsWith("1:"));
    if (!line) return null;

    const payload = JSON.parse(line.slice(2));
    // Paginated endpoints wrap their rows in `{ data, total }`.
    return (payload?.data ?? payload) as T;
  } catch {
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

/** Shares, bonds and asset-backed securities — gainers, losers, turnover. */
export async function getBoard(lang: "mn" | "en" = "mn"): Promise<Board> {
  const shares = `?lang=${lang}&segments=[1,2,3]`;
  const bonds = `?lang=${lang}&type=BD`;
  const abs = `?lang=${lang}&type=IABS`;

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
  ] = await Promise.all([
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

  return {
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
    abs: { up: toRows(absUp), down: toRows(absDown), amount: toRows(absAmount) },
  };
}

/** Latest company disclosures published on the exchange. */
export async function getDisclosures(
  lang: "mn" | "en" = "mn",
  limit = 6,
): Promise<Disclosure[]> {
  const raw = await rest<
    { companySymbol: string; description: string; type: string; date: string }[]
  >(`home_company_contents?lang=${lang}`);
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, limit).map((item) => ({
    symbol: item.companySymbol,
    company: item.description,
    type: item.type,
    date: item.date,
  }));
}

/** The same payload in both site languages — company names are localised. */
export interface Bilingual<T> {
  mn: T;
  en: T;
}

export async function getBoards(): Promise<Bilingual<Board>> {
  const [mn, en] = await Promise.all([getBoard("mn"), getBoard("en")]);
  return { mn, en };
}

export async function getAllDisclosures(): Promise<Bilingual<Disclosure[]>> {
  const [mn, en] = await Promise.all([
    getDisclosures("mn"),
    getDisclosures("en"),
  ]);
  return { mn, en };
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
