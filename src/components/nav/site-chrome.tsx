"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/nav/site-footer";
import { SiteHeader } from "@/components/nav/site-header";

const HIDE_CHROME_PREFIXES = [
  "/account",
  "/resources",
  "/v1",
  "/v2",
  "/v3",
  "/v4",
  "/v5",
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDE_CHROME_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (hideChrome) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
