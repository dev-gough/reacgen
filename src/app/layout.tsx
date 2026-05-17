import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reacgen Biosystems",
  description:
    "In-situ optical density for bioprocess monitoring. Real-time OD at the wall of every reactor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
