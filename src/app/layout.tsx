import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reacgen Biosystems",
  description:
    "In-situ optical density for bioprocess monitoring. Real-time OD at the wall of every reactor.",
};

const ANALYTICS_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "reacgen.local";
const ANALYTICS_DISABLED = process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        {ANALYTICS_DISABLED ? null : (
          <Script
            defer
            strategy="afterInteractive"
            src="/js/script.js"
            data-domain={ANALYTICS_DOMAIN}
            data-api="/api/event"
          />
        )}
      </body>
    </html>
  );
}
