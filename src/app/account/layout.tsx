import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-account-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-account-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-account-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Account · Reacgen",
};

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div
      className={`${sans.variable} ${serif.variable} ${mono.variable} min-h-screen flex flex-col`}
      style={{
        background: "#FAFAF7",
        color: "#0F1311",
        fontFamily: "var(--font-account-sans), system-ui, sans-serif",
      }}
    >
      <header
        className="border-b"
        style={{ borderColor: "#E5E5DC" }}
      >
        <div className="mx-auto flex max-w-[64rem] items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt="Reacgen Biosystems"
              width={26}
              height={26}
            />
            <span className="text-[1rem] tracking-tight" style={{ fontWeight: 500 }}>
              Reacgen
            </span>
            <span
              className="ml-2 text-[11px] tracking-[0.18em] uppercase"
              style={{ color: "#67726B", fontFamily: "var(--font-account-mono)" }}
            >
              Account
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle
              className="inline-flex size-8 items-center justify-center rounded-full border transition-colors hover:bg-white"
              style={{ borderColor: "#E5E5DC", color: "#0F1311", background: "transparent" }}
            />
            {user ? (
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border px-4 py-1.5 text-[13px] transition-colors hover:bg-white"
                style={{
                  borderColor: "#E5E5DC",
                  color: "#0F1311",
                  background: "transparent",
                }}
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/account/sign-in"
              className="text-[13px] underline underline-offset-4"
              style={{ color: "#67726B" }}
            >
              Sign in
            </Link>
          )}
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer
        className="mt-16 border-t"
        style={{ borderColor: "#E5E5DC", color: "#67726B" }}
      >
        <div className="mx-auto flex max-w-[64rem] flex-col gap-2 px-6 py-8 text-[12.5px] md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 Reacgen Biosystems</span>
          <div
            className="flex items-center gap-5"
            style={{ fontFamily: "var(--font-account-mono)" }}
          >
            <Link href="/" className="hover:text-[#0F1311]">
              ← back to site
            </Link>
            <Link href="#" className="hover:text-[#0F1311]">
              support
            </Link>
            <Link href="#" className="hover:text-[#0F1311]">
              privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
