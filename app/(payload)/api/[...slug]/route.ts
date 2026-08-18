/* THIS FILE IS GENERATED BOILERPLATE — see Payload's docs before editing.
 * Payload's REST API mounts here as a catch-all under /api. The site's own
 * `app/api/market/route.ts` is a static segment, which Next matches ahead of a
 * catch-all, so the two coexist.
 */
import config from "@payload-config";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";

export const GET = REST_GET(config);
export const POST = REST_POST(config);
export const DELETE = REST_DELETE(config);
export const PATCH = REST_PATCH(config);
export const PUT = REST_PUT(config);
export const OPTIONS = REST_OPTIONS(config);
