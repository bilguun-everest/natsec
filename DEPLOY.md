# Deploying to GreenSoft shared hosting (cPanel)

The site is exported as plain static files. Nothing server-side runs except one
PHP script, which is what keeps the market data live.

## Why there is a PHP file

The browser can read mse.mn's REST endpoints directly — they send
`Access-Control-Allow-Origin: *`. It cannot read the **trading board**: that is a
React server action, and a CORS preflight against it comes back
`405 Method Not Allowed` with `Allow: GET, HEAD` and no CORS headers at all.

The board is what feeds the bottom ticker and the movers panel, so losing it
would mean losing the marquee entirely. `public/market.php` sits in between:
PHP fetches server-side, where CORS does not apply, caches the result for 60
seconds, and hands the browser the same JSON a Node server would have.

It is a deliberate second implementation of `lib/mse.ts`. **The two must be kept
in sync** — if mse.mn changes something, both need the change.

## Build

```bash
npm run build          # writes ./out
```

`out/` is the entire site, about 2.6 MB against the plan's 500 MB. `market.php`
is copied into it automatically because it lives in `public/`.

## Upload

Via cPanel **File Manager** (or FTP): put the *contents* of `out/` — not the
folder itself — into `public_html/`.

```
public_html/
├── index.html
├── market.php
├── _next/
├── logo.png  mark.png  …
└── 404.html
```

Delete the default `public_html/index.html` cPanel ships with, or it wins over
yours.

## After the first upload, check these three things

```bash
curl -s https://natsec.mn/market.php | head -c 300
```

1. **It returns JSON, not HTML.** If you see `<br /><b>Warning</b>`, PHP is
   printing errors into the body. The script already sets `display_errors` off,
   so this would mean the host overrides it — ask GreenSoft to disable it.
2. **`"boards":{"live":true`** — if that says `false` while `"index"` says
   `true`, PHP reached mse.mn but the board action did not answer. See below.
3. **`allow_url_fopen` / outbound curl is permitted.** If the whole response is
   `"live":false` everywhere, the host is blocking outbound HTTP from PHP.
   That is the one thing that would sink this setup, and only GreenSoft can
   change it.

## DNS

`natsec.mn` currently answers from `198.54.116.54`, the registrar's parking
page. Replace that A record with GreenSoft's server address — from cPanel's
sidebar, or from their welcome email — rather than adding alongside it.

Keep the MX records pointing at GreenSoft so `info@natsec.mn` keeps working;
it is on the site's contact page and in the footer.

Enable **AutoSSL** in cPanel once DNS has propagated. Without it `https://`
fails and every link on the page is https.

## The self-healing feed

mse.mn addresses its board action by a build hash that changes every time they
redeploy. A stale hash does not fail loudly — mse.mn answers `200 OK` with its
homepage HTML — so `market.php` detects the missing payload, re-reads mse.mn's
own bundles to find the new hash, verifies it by asking for rows, and carries
on. The working hash is remembered in the system temp directory.

Recovery from a dead hash was measured at 887ms, once, after which it is
cached.

In cPanel's **Errors** log you may see:

```
[mse] board action id rotated: <old> -> <new>
```

That is the mechanism working. No action needed. What does need attention is
`[mse] action id discovery failed`, meaning mse.mn changed something the
recovery could not work around.

## Cache files

`market.php` writes three files into the system temp directory:
`natsec-market.json` (the snapshot), `natsec-market-state.json` (the working
action hash) and `natsec-market.lock`. They are recreated automatically; deleting
them just forces the next visitor to do a fresh poll.

Only one visitor ever refreshes the snapshot — the rest are served the cached
copy while it happens, so mse.mn sees one poll a minute no matter how busy the
site is.

## What this setup gives up

Server rendering. The exported HTML carries the prices from build time, marked
not-live so the panel shows its reconnecting state and the true timestamp, and
the browser replaces them on load. Nothing ever claims to be current when it
isn't — but the numbers in the file do age until the next `npm run build`.

If you later move to a VPS, `lib/mse.ts` already does all of this in Node and
`market.php` becomes unnecessary. The VPS setup (systemd, nginx, standalone
output) is in this repo's git history.
