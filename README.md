# Нэйшнл сэкюритис ҮЦК — Landing page

Corporate site for **«Нэйшнл сэкюритис ҮЦК» ХХК** (National Securities LLC), a
licensed Mongolian broker / underwriter / investment advisor, built with
**Next.js (App Router)**, **TypeScript** and **Tailwind CSS**.

The page is bilingual (Монгол / English) and pulls **live trading data from the
Mongolian Stock Exchange** at build / revalidate time.

## Design system

| Token        | Value                                                         |
| ------------ | ------------------------------------------------------------- |
| Navy         | `#14225F` · deep navy `#0C1440` (hero, footer, dark panels)   |
| Brand blue   | `#48BEE6` · text blue `#0E7EAE` · soft `#E9F6FC`              |
| Ink / grey   | `#1A1D26` / `#6B7180`                                         |
| Hairline     | `#E2E5EC` · tinted band `#FBFBFD`                             |
| Up / down    | `#0E8A5F` / `#C93B3B`                                         |
| Display font | **Archivo** (Latin) — Cyrillic headings fall through to Inter |
| Body font    | **Inter** (latin + cyrillic)                                  |
| Data font    | **JetBrains Mono** — indices, prices, labels, eyebrows        |

The tögrög sign `₮` is missing from JetBrains Mono, so it renders in a fallback
font (`font-tg`). Every section leads with a mono eyebrow (short rule +
uppercase micro-label); the logo's concentric squares are reused as the hero's
ambient field, the service / value marks and the favicon.

## Page structure

Utility bar → header → hero + market panel → **securities trading board** →
about → leadership → achievements → services → stats → research → guides + FAQ
→ contact → footer.

```
app/
  layout.tsx      # fonts, metadata, JSON-LD, skip link, <LanguageProvider>
  page.tsx        # section assembly + MSE data fetch (revalidate: 5 min)
  globals.css     # tokens, justified-copy helper, focus ring, reduced motion
  icon.svg        # concentric-squares favicon
components/
  lang.tsx        # 'use client' — MN/EN context, <T> renderer, useLang()
  ui.tsx          # Wrap, Band, Eyebrow, Btn, SectionHeading, Mark, Rings, More
  UtilityBar.tsx  # 'use client' — live TOP-20 level, FX, language switch
  Header.tsx      # 'use client' — hover dropdowns, mobile drawer
  Hero.tsx        # value prop + live index / most-traded panel
  MarketBoard.tsx # 'use client' — ХУВЬЦАА / БОНД / ХБҮЦ × gainers/losers/turnover
  About.tsx  Leadership.tsx  Achievements.tsx  Services.tsx  Stats.tsx
  Research.tsx  Guides.tsx  Faq.tsx  Contact.tsx  Footer.tsx
lib/
  content.ts      # every string, as { mn, en } pairs
  mse.ts          # Mongolian Stock Exchange data layer
public/
  logo.png        # NatSec wordmark (footer uses brightness-0 invert)
```

## Language switching

All copy lives in `lib/content.ts` as `{ mn, en }` pairs and is rendered through
`<T>`, which also turns `₮` into a fallback-font span and `\n` into a line
break. Mongolian is what the server renders (and what no-JS users see); the
stored preference is applied on mount and mirrored onto `<html lang>`.

## Live market data (mse.mn)

`lib/mse.ts` reads two public surfaces of the exchange:

| Data                                         | Source                                                                                                                |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| TOP-20 / MSE-A / MSE-B index levels          | `GET https://mse.mn/api/index_table`                                                                                  |
| Company disclosures                          | `GET https://mse.mn/api/home_company_contents`                                                                        |
| Shares, bonds, ABS — gainers/losers/turnover | `stock_up` / `stock_down` / `stock_amount` (+ `_bond` with `type=BD\|IABS`), the endpoints the mse.mn front-end calls |

Each dataset is fetched in both languages (the exchange localises company
names), every call is timeout-bounded, and **any failure degrades to `null`** —
the hero panel then falls back to the reference figures in `lib/content.ts` and
the board shows an "unavailable" state, so the page always renders. Freshness is
controlled by `export const revalidate = 300` in `app/page.tsx`.

> These are the endpoints mse.mn serves to its own public front-end; they carry
> no service guarantee. If the exchange changes them, only `lib/mse.ts` needs
> updating.

## Accessibility & motion

Skip link, visible `:focus-visible` rings, `aria-expanded` / `aria-controls` on
the FAQ and drawer, `aria-pressed` on board tabs, anchor `scroll-margin` under
the sticky header, and a full `prefers-reduced-motion` fallback. The only
animation is the pulsing "live" dot.

## Content management (Payload CMS)

Research reports, financial statements and the weekly review are edited in a
dashboard at **`/admin`**, not in code. Payload 3 runs inside this same Next
app — same repo, same deploy, same domain — backed by Postgres for content and
Vercel Blob for the PDFs.

| Collection | Slug | What it holds |
| --- | --- | --- |
| Судалгаа | `research` | Research PDFs — category (macro / securities / weekly), date, optional summary |
| Санхүүгийн тайлан | `reports` | Audited statements — year, period, PDF |
| Долоо хоногийн тойм | `weekly` | The weekly review *page* — rich text, not a file |
| Зураг | `media` | Images placed inside weekly articles |
| Хэрэглэгчид | `users` | Admin accounts |

Notes on how it is wired:

- **Publishing is one action.** `research` and `reports` are upload-enabled
  collections, so creating an entry *is* uploading the PDF — no separate media
  step.
- **Drafts are enabled** on all three content collections. Anonymous readers
  only ever see `_status: published`, enforced in two places: `publishedOrStaff`
  in `collections/access.ts` for the REST API, and an explicit `where` clause in
  `lib/content.ts` because the Local API bypasses access control.
- **Locales are `mn` / `en`** at the Payload level. Editors get a language
  switcher rather than paired fields. `lib/content.ts` queries with
  `locale: "all"` and hands components `{ mn, en }` pairs, because the language
  switch happens in the browser.
- **File sizes are measured**, not typed — `PDF · 2.1MB` is derived from
  `filesize`.
- Admin chrome is English: Payload ships no Mongolian translation. Field labels
  and descriptions are Mongolian.

Content appears on the site within a minute of publishing (`revalidate = 60`).

## Getting started

```bash
npm install
cp .env.example .env    # fill in DATABASE_URL and PAYLOAD_SECRET
npm run dev             # site at /, dashboard at /admin
npm run build && npm run start
```

Without `BLOB_READ_WRITE_TOKEN`, uploads fall back to local disk
(`/research`, `/reports`, `/media` — all gitignored), which is what you want
for local development. On Vercel, both `DATABASE_URL` and
`BLOB_READ_WRITE_TOKEN` are injected by the Storage tab; `vercel env pull .env`
brings them down.

Payload CLI helpers:

```bash
npm run generate:types      # regenerate payload-types.ts after a schema change
npm run generate:importmap  # regenerate the admin import map
npm run migrate:create      # create a migration (push is off in production)
```

## TODO — picking this up on another device

State as of this commit: the full design is implemented, bilingual, building
clean (`npm run build`), verified in headless Chrome at 1280px / 500px, and the
MSE board / index / disclosures are live.

Next, roughly in priority order:

1. **Real links.** Almost every `href` in `lib/content.ts` and the section
   components is still `#`. The only real destinations wired up are
   `https://natsec.istock.mn/auth/login` (login / open account) and mse.mn.
   Sub-pages (Танилцуулга, Судалгаа, Тогтвортой хөгжил, ESG, privacy, terms)
   don't exist yet — decide route structure (`app/(pages)/...`) or external URLs.
2. ~~**Research & analyst reports are placeholder content.**~~ Done — they now
   come from Payload (see *Content management* above). Still outstanding:
   **no email adapter is configured**, so a staff member who forgets their
   password cannot reset it (Payload logs the mail to the console instead).
   Wire `@payloadcms/email-nodemailer` to real SMTP before handing the
   dashboard to anyone. Also undecided: whether research needs an approval
   step before publish, and there is still no archive route for
   "Бүх судалгаа →".
3. **Static stats need confirming.** `lib/content.ts → stats` (12 years,
   18,400+ accounts, 640bn ₮, 27 IPOs/bonds) came from the design mock — the
   About copy says 12,951 active clients as of 2025-04, so these disagree. Get
   the real figures.
4. **FX rate in the utility bar is hardcoded** (`util.rate`, USD 3,412₮). Wire
   it to a real source (Mongolbank publishes a daily rate) or drop it.
5. **"Арилжаа нээлттэй" is a static label** in the hero panel. Derive it from
   MSE trading hours (10:00–13:00 ICT, Mon–Fri) instead of always showing open.
6. **Add the trading-session timestamp** to the board footer so users can see
   how fresh the numbers are (the endpoints don't return one — use the
   revalidate time).
7. **Consider caching the board fetches** with `unstable_cache` if the page ever
   becomes dynamic; today it's static + `revalidate = 300`, so mse.mn is hit at
   most every 5 minutes.
8. **Content review with the client**: the leadership section has one CEO card
   and no photo (initials only), and the achievements list stops at 2021.
9. **Deploy**: no host configured yet. Vercel is the path of least resistance
   for ISR; if the target is a static export instead, note that
   `export const revalidate` and `output: "export"` are incompatible — the
   market board would need client-side fetching.
