import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // cPanel shared hosting serves files; it does not run Node. The build emits
  // the finished site into `out/`, which is what gets uploaded. The one piece
  // of server-side behaviour left is `public/market.php`, copied along with it,
  // which the browser polls for prices.
  output: "export",

  // Static export has no image optimiser behind it, so `next/image` has to be
  // told to emit the files as they are. The four images on the site are already
  // sized for their slots.
  images: { unoptimized: true },

  // cPanel serves `/path/` from `/path/index.html`, so directory-style URLs
  // resolve without rewrite rules.
  trailingSlash: true,
};

export default withPayload(nextConfig);
