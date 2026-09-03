import { SiteShell, siteMetadata, viewport } from "@/app/site-shell";

/**
 * The English site, under `/en/`.
 *
 * A second root layout, not a nested one: `<html lang>` is declared here, and
 * it has to say "en" in the exported file rather than being corrected by a
 * script after the page has already been read.
 */
export const metadata = siteMetadata("en");
export { viewport };

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
