"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLang, type Lang } from "@/components/lang";
import {
  pollInterval,
  sessionState,
  type SessionState,
} from "@/lib/market-hours";
import {
  direction,
  formatIndex,
  formatPercent,
  type Board,
  type MarketSnapshot,
  type TradeRow,
} from "@/lib/mse";

/**
 * Live market state for the whole page.
 *
 * The first snapshot is rendered on the server, so the first paint already
 * carries real prices; from there the browser re-reads `/api/market` on the
 * cadence in `lib/market-hours.ts` — once a minute while the exchange is
 * trading, every fifteen when it is closed. The exchange itself is polled at
 * most once per `CACHE_TTL_MS` regardless of how many people are watching.
 */

interface MarketValue {
  snapshot: MarketSnapshot;
  session: SessionState;
  /** Board in the reader's language, already picked. */
  board: Board;
  /** True when the last poll reached the exchange. */
  live: boolean;
}

const MarketContext = createContext<MarketValue | null>(null);

export function MarketProvider({
  initial,
  initialSession,
  children,
}: {
  initial: MarketSnapshot;
  initialSession: SessionState;
  children: ReactNode;
}) {
  const { lang } = useLang();
  const [snapshot, setSnapshot] = useState(initial);
  const [session, setSession] = useState(initialSession);
  // Avoids a re-render storm if a poll returns data identical to what we hold.
  const lastPolledAt = useRef(initial.polledAt);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/market", { cache: "no-store" });
      if (!response.ok) return;
      const next = (await response.json()) as MarketSnapshot;
      if (next.polledAt === lastPolledAt.current) return;
      lastPolledAt.current = next.polledAt;
      setSnapshot(next);
    } catch {
      // Offline or a blip — keep showing what we have. `live` on the retained
      // snapshot already tells the reader it has stopped updating.
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const now = new Date();
      setSession(sessionState(now));
      // Interval is recomputed each time, so crossing the open or the close
      // changes the cadence without needing a separate scheduler.
      timer = setTimeout(() => {
        void refresh().finally(tick);
      }, pollInterval(now));
    };

    tick();
    return () => clearTimeout(timer);
  }, [refresh]);

  // A tab left open in the background stops polling; catch up on return.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [refresh]);

  const value = useMemo<MarketValue>(
    () => ({
      snapshot,
      session,
      board: snapshot.boards.data[lang as Lang],
      live: snapshot.index.live && snapshot.boards.live,
    }),
    [snapshot, session, lang],
  );

  return (
    <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
  );
}

export function useMarket(): MarketValue {
  const value = useContext(MarketContext);
  if (!value) throw new Error("useMarket must be used inside <MarketProvider>");
  return value;
}

/* ------------------------------------------------------------ derived views */

export interface Quote {
  symbol: string;
  name: string;
  /** Last traded price, formatted as the exchange gives it. */
  price: string;
  percent: number;
  dir: "up" | "down" | "flat";
}

export interface TurnoverRow {
  symbol: string;
  name: string;
  /** Value traded today, compacted — "127.3 сая". NOT a share price. */
  turnover: string;
  percent: number;
  dir: "up" | "down" | "flat";
}

function toQuote(row: TradeRow): Quote {
  return {
    symbol: row.symbol,
    name: row.name,
    price: row.value,
    percent: row.percent,
    dir: direction(row.percent),
  };
}

/**
 * The day's most-traded shares, by value traded.
 *
 * Careful: on this board `TradeRow.value` is turnover, not a price — TTL can
 * show 127,328,800 here while the share itself trades at 44,760. Callers get a
 * distinctly named `turnover` field so the two can never be rendered into the
 * same slot by accident.
 */
export function useTurnoverLeaders(limit = 10): TurnoverRow[] {
  const { board } = useMarket();
  const { lang } = useLang();

  return board.stock.amount.slice(0, limit).map((row) => ({
    symbol: row.symbol,
    name: row.name,
    turnover: compactTugrug(row.value, lang as Lang),
    percent: row.percent,
    dir: direction(row.percent),
  }));
}

/**
 * Turnover runs to nine digits, which is unreadable in a moving strip.
 * 127,328,800 → "127.3 сая" / "127.3M".
 */
export function compactTugrug(value: string, lang: Lang): string {
  const amount = Number(value.replace(/,/g, ""));
  if (!Number.isFinite(amount)) return value;

  const billion = lang === "en" ? "B" : " тэрбум";
  const million = lang === "en" ? "M" : " сая";
  const thousand = lang === "en" ? "K" : " мянга";

  if (amount >= 1e9) return `${(amount / 1e9).toFixed(2)}${billion}`;
  if (amount >= 1e6) return `${(amount / 1e6).toFixed(1)}${million}`;
  if (amount >= 1e3) return `${Math.round(amount / 1e3)}${thousand}`;
  return amount.toLocaleString("en-US");
}

/**
 * Gainers and losers interleaved, so the strip never reads as though every
 * share on the exchange moved the same way.
 */
export function useMovers(limit = 6): Quote[] {
  const { board } = useMarket();
  const up = board.stock.up.map(toQuote);
  const down = board.stock.down.map(toQuote);
  const mixed: Quote[] = [];

  for (let i = 0; mixed.length < limit && (i < up.length || i < down.length); i++) {
    if (i < up.length) mixed.push(up[i]);
    if (mixed.length < limit && i < down.length) mixed.push(down[i]);
  }

  return mixed;
}

/** TOP-20, MSE-A and MSE-B, formatted for display. */
export function useIndices() {
  const { snapshot } = useMarket();
  const index = snapshot.index.data;
  if (!index) return null;

  return {
    top20: {
      unit: formatIndex(index.top20Unit),
      percent: formatPercent(index.top20Percent),
      raw: index.top20Percent,
      dir: direction(index.top20Percent),
    },
    mseA: {
      unit: formatIndex(index.mseAUnit),
      percent: formatPercent(index.mseAPercent),
      raw: index.mseAPercent,
      dir: direction(index.mseAPercent),
    },
    mseB: {
      unit: formatIndex(index.mseBUnit),
      percent: formatPercent(index.mseBPercent),
      raw: index.mseBPercent,
      dir: direction(index.mseBPercent),
    },
  };
}
