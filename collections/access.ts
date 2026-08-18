import type { Access } from "payload";

/**
 * Published content is a public website — but "public" must not include drafts.
 * With `versions.drafts` enabled, an unpublished document still lives in the
 * collection with `_status: 'draft'`, so a bare `() => true` would serve a
 * half-finished securities report — target prices and all — over the REST API.
 *
 * Returning a query constraint instead of a boolean narrows what anonymous
 * readers can see; logged-in staff still get everything.
 */
export const publishedOrStaff: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};

/** Anything that changes what the public sees requires a logged-in account. */
export const staffOnly: Access = ({ req }) => Boolean(req.user);

/** For collections with no draft state of their own, such as images. */
export const anyone: Access = () => true;
