import { T } from "@/components/lang";
import { Btn, Eyebrow, LiveDot, Rings, Wrap } from "@/components/ui";
import { hero, LOGIN_URL, market, marketPanel, type Bi } from "@/lib/content";
import {
  direction,
  formatIndex,
  formatPercent,
  type Bilingual,
  type IndexTable,
  type TradeRow,
} from "@/lib/mse";

interface PanelRow {
  name: Bi;
  sub: Bi;
  value: string;
  change: Bi;
  dir: "up" | "down" | "flat";
}

const both = (value: string): Bi => ({ mn: value, en: value });

/**
 * Builds the market panel from live exchange data — the three MSE indices
 * followed by the day's most-traded names. Falls back to the reference rows
 * that ship with the design when the feed is unavailable.
 */
function panelRows(
  index: IndexTable | null,
  movers: Bilingual<TradeRow[]>,
): PanelRow[] {
  if (!index) return marketPanel.ticks as PanelRow[];

  const indices: PanelRow[] = [
    {
      name: market.indices.top20,
      sub: both("MSE TOP-20"),
      value: formatIndex(index.top20Unit),
      change: both(formatPercent(index.top20Percent)),
      dir: direction(index.top20Percent),
    },
    {
      name: market.indices.mseA,
      sub: both("MSE A"),
      value: formatIndex(index.mseAUnit),
      change: both(formatPercent(index.mseAPercent)),
      dir: direction(index.mseAPercent),
    },
    {
      name: market.indices.mseB,
      sub: both("MSE B"),
      value: formatIndex(index.mseBUnit),
      change: both(formatPercent(index.mseBPercent)),
      dir: direction(index.mseBPercent),
    },
  ];

  const english = new Map(movers.en.map((row) => [row.symbol, row.name]));
  const traded: PanelRow[] = movers.mn.slice(0, 2).map((row) => ({
    name: { mn: row.name, en: english.get(row.symbol) ?? row.name },
    sub: { mn: `${row.symbol} · МХБ`, en: `${row.symbol} · MSE` },
    value: `${row.value}₮`,
    change: both(formatPercent(row.percent)),
    dir: direction(row.percent),
  }));

  return [...indices, ...traded];
}

export default function Hero({
  index,
  movers,
}: {
  index: IndexTable | null;
  movers: Bilingual<TradeRow[]>;
}) {
  const rows = panelRows(index, movers);

  return (
    <div className="relative overflow-hidden bg-navy-900 pt-[78px] text-white">
      <Rings className="-right-[140px] -top-[90px] h-[720px] w-[720px] opacity-50 max-sm:opacity-25" />

      <Wrap>
        <div className="relative z-[2] grid grid-cols-[1.08fr_.92fr] items-start gap-14 pb-20 max-nav:grid-cols-1 max-nav:gap-[38px]">
          <div>
            <Eyebrow tone="light">{hero.eyebrow}</Eyebrow>

            <h1 className="mb-5 font-display text-[clamp(38px,5.1vw,62px)] font-extrabold tracking-[-0.035em]">
              <T>{hero.title}</T>
              <br />
              <span className="text-blue">
                <T>{hero.titleAccent}</T>
              </span>
            </h1>

            <p className="justify mb-[30px] max-w-[520px] text-[17.5px] text-[#B9C1DF]">
              <T>{hero.lead}</T>
            </p>

            <div className="mb-9 flex flex-wrap gap-3">
              <Btn href={LOGIN_URL} variant="w">
                {hero.ctaPrimary}
              </Btn>
              <Btn href={LOGIN_URL} variant="g">
                {hero.ctaSecondary}
              </Btn>
            </div>

            <div className="flex flex-wrap gap-x-[26px] gap-y-4 border-t border-white/[.12] pt-6">
              {hero.licences.map((licence) => (
                <div
                  key={licence.code.mn}
                  className="text-[12.5px] text-[#8E98C4]"
                >
                  <strong className="mb-0.5 block font-mono text-[13.5px] font-medium text-white">
                    <T>{licence.code}</T>
                  </strong>
                  <T>{licence.note}</T>
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------ market panel */}
          <div className="overflow-hidden rounded-xl border border-white/[.13] bg-white/[.055] backdrop-blur-[6px]">
            <div className="flex items-center justify-between gap-3 border-b border-white/[.11] px-[18px] py-3.5">
              <span className="font-mono text-[11px] uppercase tracking-[.14em] text-[#9BA5CF]">
                <T>{marketPanel.title}</T>
              </span>
              <span className="flex items-center whitespace-nowrap font-mono text-[11px] uppercase tracking-[.14em] text-[#4FD497]">
                <LiveDot />
                <T>{marketPanel.status}</T>
              </span>
            </div>

            {rows.map((row, rowIndex) => (
              <div
                key={`${row.sub.mn}-${rowIndex}`}
                className="flex items-center justify-between gap-4 border-b border-white/[.07] px-[18px] py-[13px] last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="truncate font-display text-[14.5px] font-semibold">
                    <T>{row.name}</T>
                  </div>
                  <div className="mt-px font-mono text-[11px] text-[#8E98C4]">
                    <T>{row.sub}</T>
                  </div>
                </div>
                <div className="shrink-0 text-right font-mono">
                  <b className="block text-[15px] font-medium">
                    <T>{both(row.value)}</T>
                  </b>
                  <i
                    className={`text-xs not-italic ${
                      row.dir === "up"
                        ? "text-[#4FD497]"
                        : row.dir === "down"
                          ? "text-[#FF7B7B]"
                          : "text-[#8E98C4]"
                    }`}
                  >
                    <T>{row.change}</T>
                  </i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </div>
  );
}
