import { SiteShell, siteMetadata, viewport } from "@/app/site-shell";

/**
 * The Japanese site, under `/ja/`.
 *
 * A third root layout, not a nested one: `<html lang>` is declared here, and it
 * has to say "ja" in the exported file rather than being corrected by a script
 * after the page has already been read — which is also what tells the browser
 * to reach for a Japanese face for the CJK glyphs.
 */
export const metadata = siteMetadata("ja");
export { viewport };

export default function JapaneseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="ja">{children}</SiteShell>;
}
