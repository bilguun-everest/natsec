import { SiteShell, siteMetadata, viewport } from "@/app/site-shell";

/** The Mongolian site, at the bare paths. */
export const metadata = siteMetadata("mn");
export { viewport };

export default function MongolianLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="mn">{children}</SiteShell>;
}
