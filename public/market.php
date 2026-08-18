<?php
/**
 * Live market data from the Mongolian Stock Exchange, for a static site.
 *
 * This is the PHP twin of `lib/mse.ts`. The site is exported as static files
 * onto cPanel hosting, so there is no Node process to hold the snapshot — but
 * the browser cannot talk to mse.mn directly either: the trading board is a
 * React server action that answers `405 Method Not Allowed` to a CORS
 * preflight. PHP has no such restriction, so this file stands in the middle.
 *
 * It emits exactly the shape `MarketSnapshot` in `lib/mse.ts` describes,
 * because `components/market.tsx` parses the response as that type.
 *
 * KEEP IN SYNC with lib/mse.ts. The two are separate implementations of one
 * contract; if the exchange changes something, both need the change.
 */

declare(strict_types=1);

/**
 * Shared hosting frequently ships with `display_errors` on. A single notice
 * printed into the body would corrupt the JSON and blank the market panel for
 * every visitor, so errors go to the log and never to the response.
 */
ini_set('display_errors', '0');
error_reporting(E_ALL);

const API                 = 'https://mse.mn/api';
const WEB                 = 'https://www.mse.mn';
const TIMEOUT             = 8;

/** Seed only — see discoverActionId(). mse.mn rotates this on every deploy. */
const SEED_ACTION_ID      = '6d867ebd99fb6edef2f9537b22668cd0c00a71c2';

/** How long a retrieved snapshot is served before the exchange is polled again. */
const CACHE_TTL           = 60;

/** Wait this long before scanning for a new action id after a fruitless scan. */
const DISCOVERY_COOLDOWN  = 300;

$cacheFile = sys_get_temp_dir() . '/natsec-market.json';
$stateFile = sys_get_temp_dir() . '/natsec-market-state.json';
$lockFile  = sys_get_temp_dir() . '/natsec-market.lock';

/* ---------------------------------------------------------------- fetching */

/**
 * Runs many requests at once. Sequentially this handler would make twenty-one
 * round trips to Ulaanbaatar and take several seconds; in parallel it is one
 * round trip's worth of waiting.
 *
 * $requests: ['key' => ['url' => ..., 'post' => ?string, 'headers' => [...]]]
 * Returns   ['key' => ?string]  — null for anything that failed.
 */
function httpMulti(array $requests): array
{
    $multi   = curl_multi_init();
    $handles = [];

    foreach ($requests as $key => $spec) {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL            => $spec['url'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => TIMEOUT,
            CURLOPT_CONNECTTIMEOUT => TIMEOUT,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_HTTPHEADER     => $spec['headers'] ?? [],
        ]);
        if (isset($spec['post'])) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $spec['post']);
        }
        curl_multi_add_handle($multi, $ch);
        $handles[$key] = $ch;
    }

    $running = null;
    do {
        curl_multi_exec($multi, $running);
        if ($running) {
            curl_multi_select($multi, 1.0);
        }
    } while ($running > 0);

    $out = [];
    foreach ($handles as $key => $ch) {
        $body   = curl_multi_getcontent($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $out[$key] = ($status === 200 && is_string($body) && $body !== '') ? $body : null;
        curl_multi_remove_handle($multi, $ch);
    }
    curl_multi_close($multi);

    return $out;
}

function httpOne(string $url, ?string $post = null, array $headers = []): ?string
{
    $result = httpMulti(['only' => ['url' => $url, 'post' => $post, 'headers' => $headers]]);
    return $result['only'];
}

/** The body of one board request. */
function boardBody(string $url, string $parameter): string
{
    return json_encode([[
        'url'       => $url,
        'parameter' => $parameter,
        'config'    => ['hasToken' => false],
    ]]);
}

function boardHeaders(string $actionId): array
{
    return [
        'Next-Action: ' . $actionId,
        'Content-Type: text/plain;charset=UTF-8',
    ];
}

/**
 * Unwraps a React Flight response — the payload arrives as a `1:<json>` line.
 * Returns null when the response is not a Flight payload at all, which is what
 * a rotated action id looks like: mse.mn answers 200 with its homepage HTML.
 */
function parseFlight(?string $body)
{
    if ($body === null) {
        return null;
    }
    foreach (explode("\n", $body) as $line) {
        if (strncmp($line, '1:', 2) === 0) {
            $payload = json_decode(substr($line, 2), true);
            if ($payload === null) {
                return null;
            }
            // Paginated endpoints wrap their rows in `{ data, total }`.
            return $payload['data'] ?? $payload;
        }
    }
    return null;
}

/* ------------------------------------------------------- the board action */

/** Every server-action hash registered in mse.mn's own client bundles. */
function scanActionIds(): array
{
    $html = httpOne(WEB, null, ['Accept: text/html']);
    if ($html === null) {
        return [];
    }

    preg_match_all('#/_next/static/chunks/[\w./-]+\.js#', $html, $matches);
    $chunks = array_unique($matches[0]);
    if (!$chunks) {
        return [];
    }

    $requests = [];
    foreach ($chunks as $i => $chunk) {
        $requests[$i] = ['url' => WEB . $chunk];
    }

    $ids = [];
    foreach (httpMulti($requests) as $source) {
        if ($source === null) {
            continue;
        }
        if (preg_match_all('/\b[0-9a-f]{40}\b/', $source, $found)) {
            foreach ($found[0] as $id) {
                $ids[$id] = true;
            }
        }
    }
    return array_keys($ids);
}

/**
 * Is this the board talking?
 *
 * An empty array is deliberately not accepted — it would match almost any
 * action on a quiet day, and caching a hash that always answers `[]` would look
 * healthy forever while showing nothing.
 */
function looksLikeBoard($payload): bool
{
    if (!is_array($payload) || !$payload || !isset($payload[0]) || !is_array($payload[0])) {
        return false;
    }
    return isset($payload[0]['legalDocument']) || isset($payload[0]['typeBD']);
}

/**
 * Finds the hash that currently addresses the board action. The bundles say
 * which hashes exist but not which one is the board, so each candidate is asked
 * the same question and the one that answers with rows wins.
 */
function discoverActionId(string $failed): ?string
{
    $probe = boardBody('stock_up', '?lang=mn&segments=[1,2,3]');

    foreach (scanActionIds() as $candidate) {
        if ($candidate === $failed) {
            continue;
        }
        $payload = parseFlight(httpOne(WEB, $probe, boardHeaders($candidate)));
        if (looksLikeBoard($payload)) {
            return $candidate;
        }
    }
    return null;
}

/* --------------------------------------------------------------- normalise */

function toRows($raw): array
{
    if (!is_array($raw)) {
        return [];
    }
    $rows = [];
    foreach ($raw as $row) {
        if (!is_array($row)) {
            continue;
        }
        $rows[] = [
            'symbol'  => (string) ($row['legalDocument'] ?? $row['typeBD'] ?? ''),
            'name'    => (string) ($row['companyName'] ?? $row['company'] ?? ''),
            'value'   => (string) ($row['price'] ?? $row['amount'] ?? ''),
            'percent' => (float) ($row['changePercentage'] ?? 0),
            'change'  => (float) ($row['changePrice'] ?? 0),
        ];
    }
    return $rows;
}

const EMPTY_TABLES = ['up' => [], 'down' => [], 'amount' => []];

function emptyBoard(): array
{
    return ['stock' => EMPTY_TABLES, 'bond' => EMPTY_TABLES, 'abs' => EMPTY_TABLES];
}

/* ----------------------------------------------------------------- polling */

/**
 * One pass over the exchange: index levels, both language boards, and both
 * language disclosure lists — twenty-one requests, issued together.
 *
 * `$actionId` is passed by reference so a rotation discovered here is visible
 * to the caller, which persists it.
 */
function poll(string &$actionId, int &$lastDiscoveryAt): array
{
    $requests = [
        'index'          => ['url' => API . '/index_table?lang=mn',           'headers' => ['Accept: application/json']],
        'disclosures_mn' => ['url' => API . '/home_company_contents?lang=mn', 'headers' => ['Accept: application/json']],
        'disclosures_en' => ['url' => API . '/home_company_contents?lang=en', 'headers' => ['Accept: application/json']],
    ];

    $boardSpecs = [];
    foreach (['mn', 'en'] as $lang) {
        $shares = "?lang={$lang}&segments=[1,2,3]";
        $bonds  = "?lang={$lang}&type=BD";
        $abs    = "?lang={$lang}&type=IABS";
        $boardSpecs["{$lang}_stock_up"]     = ['stock_up',          $shares];
        $boardSpecs["{$lang}_stock_down"]   = ['stock_down',        $shares];
        $boardSpecs["{$lang}_stock_amount"] = ['stock_amount',      $shares];
        $boardSpecs["{$lang}_bond_up"]      = ['stock_up_bond',     $bonds];
        $boardSpecs["{$lang}_bond_down"]    = ['stock_down_bond',   $bonds];
        $boardSpecs["{$lang}_bond_amount"]  = ['stock_amount_bond', $bonds];
        $boardSpecs["{$lang}_abs_up"]       = ['stock_up_bond',     $abs];
        $boardSpecs["{$lang}_abs_down"]     = ['stock_down_bond',   $abs];
        $boardSpecs["{$lang}_abs_amount"]   = ['stock_amount_bond', $abs];
    }

    foreach ($boardSpecs as $key => $spec) {
        $requests[$key] = [
            'url'     => WEB,
            'post'    => boardBody($spec[0], $spec[1]),
            'headers' => boardHeaders($actionId),
        ];
    }

    $responses = httpMulti($requests);

    $boards = [];
    foreach ($boardSpecs as $key => $spec) {
        $boards[$key] = parseFlight($responses[$key]);
    }

    // Every board came back without a Flight payload: the hash has rotated.
    // One scan, then one retry of the board requests with what it found.
    $allStale = true;
    foreach ($boards as $payload) {
        if ($payload !== null) {
            $allStale = false;
            break;
        }
    }

    if ($allStale && (time() - $lastDiscoveryAt) >= DISCOVERY_COOLDOWN) {
        $lastDiscoveryAt = time();
        $fresh = discoverActionId($actionId);
        if ($fresh !== null) {
            error_log("[mse] board action id rotated: {$actionId} -> {$fresh}");
            $actionId = $fresh;

            $retry = [];
            foreach ($boardSpecs as $key => $spec) {
                $retry[$key] = [
                    'url'     => WEB,
                    'post'    => boardBody($spec[0], $spec[1]),
                    'headers' => boardHeaders($actionId),
                ];
            }
            foreach (httpMulti($retry) as $key => $body) {
                $boards[$key] = parseFlight($body);
            }
        } else {
            error_log('[mse] action id discovery failed: no candidate answered with board rows');
        }
    }

    $buildBoard = function (string $lang) use ($boards): array {
        return [
            'stock' => [
                'up'     => toRows($boards["{$lang}_stock_up"]),
                'down'   => toRows($boards["{$lang}_stock_down"]),
                'amount' => toRows($boards["{$lang}_stock_amount"]),
            ],
            'bond' => [
                'up'     => toRows($boards["{$lang}_bond_up"]),
                'down'   => toRows($boards["{$lang}_bond_down"]),
                'amount' => toRows($boards["{$lang}_bond_amount"]),
            ],
            'abs' => [
                'up'     => toRows($boards["{$lang}_abs_up"]),
                'down'   => toRows($boards["{$lang}_abs_down"]),
                'amount' => toRows($boards["{$lang}_abs_amount"]),
            ],
        ];
    };

    $boardsReachable = false;
    foreach ($boards as $payload) {
        if ($payload !== null) {
            $boardsReachable = true;
            break;
        }
    }

    $index = $responses['index'] !== null ? json_decode($responses['index'], true) : null;

    $readDisclosures = function (?string $body): ?array {
        if ($body === null) {
            return null;
        }
        $raw = json_decode($body, true);
        if (!is_array($raw)) {
            return null;
        }
        $out = [];
        foreach (array_slice($raw, 0, 6) as $item) {
            $out[] = [
                'symbol'  => (string) ($item['companySymbol'] ?? ''),
                'company' => (string) ($item['description'] ?? ''),
                'type'    => (string) ($item['type'] ?? ''),
                'date'    => (string) ($item['date'] ?? ''),
            ];
        }
        return $out;
    };

    $disclosuresMn = $readDisclosures($responses['disclosures_mn']);
    $disclosuresEn = $readDisclosures($responses['disclosures_en']);
    $disclosuresOk = $disclosuresMn !== null && $disclosuresEn !== null;

    $now = gmdate('Y-m-d\TH:i:s.000\Z');

    return [
        'polledAt' => $now,
        'index' => is_array($index)
            ? ['data' => $index, 'fetchedAt' => $now, 'live' => true]
            : ['data' => null, 'fetchedAt' => null, 'live' => false],
        'boards' => $boardsReachable
            ? ['data' => ['mn' => $buildBoard('mn'), 'en' => $buildBoard('en')], 'fetchedAt' => $now, 'live' => true]
            : ['data' => ['mn' => emptyBoard(), 'en' => emptyBoard()], 'fetchedAt' => null, 'live' => false],
        'disclosures' => $disclosuresOk
            ? ['data' => ['mn' => $disclosuresMn, 'en' => $disclosuresEn], 'fetchedAt' => $now, 'live' => true]
            : ['data' => ['mn' => [], 'en' => []], 'fetchedAt' => null, 'live' => false],
    ];
}

/**
 * Carries a previous feed forward when the latest attempt failed, so a blip
 * downgrades the data's stated age instead of blanking the page.
 */
function retain(array $fresh, ?array $previous, string $key): array
{
    if ($fresh[$key]['live']) {
        return $fresh[$key];
    }
    if ($previous !== null && isset($previous[$key]) && $previous[$key]['fetchedAt'] !== null) {
        $carried = $previous[$key];
        $carried['live'] = false;
        return $carried;
    }
    return $fresh[$key];
}

/* -------------------------------------------------------------- responding */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=0, s-maxage=' . CACHE_TTL . ', stale-while-revalidate=120');

$cached = is_readable($cacheFile) ? json_decode((string) file_get_contents($cacheFile), true) : null;
$fresh  = is_array($cached) && (time() - (int) ($cached['_at'] ?? 0)) < CACHE_TTL;

if ($fresh) {
    unset($cached['_at']);
    echo json_encode($cached, JSON_UNESCAPED_UNICODE);
    exit;
}

// One visitor refreshes; everyone arriving mid-refresh gets the stale copy
// rather than starting a second set of twenty-one requests of their own.
$lock = fopen($lockFile, 'c');
if ($lock === false || !flock($lock, LOCK_EX | LOCK_NB)) {
    if (is_array($cached)) {
        unset($cached['_at']);
        echo json_encode($cached, JSON_UNESCAPED_UNICODE);
        exit;
    }
    // Nothing held and someone else is fetching: ask the browser to retry.
    http_response_code(503);
    header('Retry-After: 5');
    echo json_encode(['error' => 'warming up']);
    exit;
}

$state           = is_readable($stateFile) ? json_decode((string) file_get_contents($stateFile), true) : null;
$actionId        = is_array($state) && !empty($state['actionId']) ? (string) $state['actionId'] : SEED_ACTION_ID;
$lastDiscoveryAt = is_array($state) ? (int) ($state['lastDiscoveryAt'] ?? 0) : 0;

$snapshot = poll($actionId, $lastDiscoveryAt);

$previous = is_array($cached) ? $cached : null;
foreach (['index', 'boards', 'disclosures'] as $key) {
    $snapshot[$key] = retain($snapshot, $previous, $key);
}

file_put_contents($stateFile, json_encode([
    'actionId'        => $actionId,
    'lastDiscoveryAt' => $lastDiscoveryAt,
]), LOCK_EX);

$store = $snapshot;
$store['_at'] = time();
file_put_contents($cacheFile, json_encode($store, JSON_UNESCAPED_UNICODE), LOCK_EX);

flock($lock, LOCK_UN);
fclose($lock);

echo json_encode($snapshot, JSON_UNESCAPED_UNICODE);
