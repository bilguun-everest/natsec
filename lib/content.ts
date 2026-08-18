import { getPayload } from "payload";
import config from "@payload-config";
import type { Bi } from "@/lib/guides";

/**
 * Server-side reads of the editable content. Everything here returns plain
 * serialisable view models with `{ mn, en }` pairs, because the language switch
 * happens in the browser (`components/lang.tsx`) — the server cannot know which
 * language a reader wants, so it ships both.
 *
 * That is why these queries pass `locale: "all"`: Payload then returns each
 * localized field as an object keyed by locale rather than one resolved string.
 */

export interface ResearchItem {
  id: number;
  title: Bi;
  summary: Bi | null;
  category: "macro" | "securities" | "weekly";
  /** Pre-formatted `2026.07.20`, matching the design's date style. */
  date: string;
  url: string | null;
  /** Pre-formatted `PDF · 2.1MB`, measured rather than typed by hand. */
  size: string | null;
}

export interface ReportItem {
  id: number;
  title: Bi;
  year: string;
  period: "annual" | "q1" | "q2" | "q3" | "q4";
  url: string | null;
  size: string | null;
}

export interface WeeklyItem {
  id: number;
  title: Bi;
  lead: Bi | null;
  date: string;
  content: { mn: unknown; en: unknown };
}

export interface SiteContent {
  research: ResearchItem[];
  reports: ReportItem[];
  weekly: WeeklyItem | null;
}

/** Payload hands back `{ mn, en }` under `locale: "all"`; missing values fall
 *  back to Mongolian, so a half-translated entry still renders. */
function bi(value: unknown): Bi {
  const pair = (value ?? {}) as Partial<Record<"mn" | "en", string>>;
  const mn = pair.mn ?? pair.en ?? "";
  return { mn, en: pair.en || mn };
}

function biOrNull(value: unknown): Bi | null {
  const pair = bi(value);
  return pair.mn || pair.en ? pair : null;
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

/** Within a year the annual statement leads, then quarters newest first.
 *  Postgres would sort these alphabetically, which buries `annual` last. */
const PERIOD_RANK: Record<ReportItem["period"], number> = {
  annual: 0,
  q4: 1,
  q3: 2,
  q2: 3,
  q1: 4,
};

/** `PDF · 2.1MB`. Sizes under a megabyte read better in KB. */
function formatSize(bytes: number | null | undefined): string | null {
  if (!bytes || bytes <= 0) return null;
  if (bytes < 1024 * 1024) return `PDF · ${Math.round(bytes / 1024)}KB`;
  return `PDF · ${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

/**
 * The Local API runs with `overrideAccess: true` by default, so the collections'
 * `publishedOrStaff` read rule does not apply here — these queries would happily
 * return drafts. The constraint has to be stated again, explicitly.
 */
const publishedOnly = { _status: { equals: "published" } } as const;

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const payload = await getPayload({ config });

    const [research, reports, weekly] = await Promise.all([
      payload.find({
        collection: "research",
        where: publishedOnly,
        locale: "all",
        limit: 50,
        sort: "-publishedAt",
        depth: 0,
      }),
      payload.find({
        collection: "reports",
        where: publishedOnly,
        locale: "all",
        limit: 50,
        sort: "-year",
        depth: 0,
      }),
      payload.find({
        collection: "weekly",
        where: publishedOnly,
        locale: "all",
        limit: 1,
        sort: "-publishedAt",
        depth: 1,
      }),
    ]);

    const latest = weekly.docs[0];

    return {
      research: research.docs.map((doc) => ({
        id: doc.id,
        title: bi(doc.title),
        summary: biOrNull(doc.summary),
        category: doc.category,
        date: formatDate(doc.publishedAt),
        url: doc.url ?? null,
        size: formatSize(doc.filesize),
      })),
      reports: reports.docs
        .map((doc) => ({
          id: doc.id,
          title: bi(doc.title),
          year: String(doc.year),
          period: doc.period,
          url: doc.url ?? null,
          size: formatSize(doc.filesize),
        }))
        .sort(
          (a, b) =>
            Number(b.year) - Number(a.year) ||
            PERIOD_RANK[a.period] - PERIOD_RANK[b.period],
        ),
      weekly: latest
        ? {
            id: latest.id,
            title: bi(latest.title),
            lead: biOrNull(latest.lead),
            date: formatDate(latest.publishedAt),
            // `payload-types.ts` describes a localized field as its resolved
            // single-locale value. Under `locale: "all"` it is really a map
            // keyed by locale, which the generated types cannot express.
            content: (latest.content ?? {}) as unknown as {
              mn: unknown;
              en: unknown;
            },
          }
        : null,
    };
  } catch (error) {
    // A database that is unreachable should cost the reader the research
    // listings, not the whole site — every other page is static.
    console.error("[content] failed to load from Payload:", error);
    return { research: [], reports: [], weekly: null };
  }
}
