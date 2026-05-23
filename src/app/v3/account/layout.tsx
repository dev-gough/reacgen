import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { LogOut, UserRound } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-v3-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-v3-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Account · Reacgen",
};

const BG = "#F4F8FC";
const INK = "#0B1F33";
const HAIR = "#DBE6F1";
const SOFT = "#5D7892";
const BRAND = "#2F7FB8";
const HIGHLIGHT = "#FFE45A";

export default async function V3AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div
      className={`${sans.variable} ${mono.variable} min-h-screen flex flex-col`}
      style={{
        background: BG,
        color: INK,
        fontFamily: "var(--font-v3-sans)",
      }}
    >
      <header className="mx-auto flex w-full max-w-[80rem] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/v3" className="flex items-center gap-2.5">
          <Image src="/logo-mark.png" alt="Reacgen Biosystems" width={26} height={26} />
          <span className="text-[1.05rem] tracking-tight" style={{ fontWeight: 600 }}>
            reacgen
          </span>
          <span
            className="ml-1.5 rounded-full px-2 py-0.5 text-[10px] tracking-wider uppercase"
            style={{
              background: HIGHLIGHT,
              color: INK,
              fontFamily: "var(--font-v3-mono)",
              fontWeight: 500,
            }}
          >
            account
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle
            className="inline-flex size-8 items-center justify-center rounded-full border transition-colors hover:bg-white"
            style={{ borderColor: HAIR, color: INK, background: "transparent" }}
          />
          {user ? (
            <>
              <span
                className="hidden sm:inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px]"
                style={{ borderColor: HAIR, color: SOFT, background: "#FFFFFF" }}
              >
                <UserRound size={13} strokeWidth={1.75} style={{ color: BRAND }} />
                {user.name || user.email.split("@")[0]}
              </span>
              <form action={signOut}>
                <input type="hidden" name="returnTo" value="/v3" />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors hover:bg-white"
                  style={{ borderColor: HAIR, color: INK, background: "transparent" }}
                >
                  <LogOut size={13} strokeWidth={1.75} />
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/v3/account/sign-in"
              className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors hover:bg-white"
              style={{ borderColor: HAIR, color: INK, background: "transparent" }}
            >
              <UserRound size={13} strokeWidth={1.75} />
              Sign in
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t" style={{ borderColor: HAIR }}>
        <div
          className="mx-auto flex max-w-[80rem] flex-col gap-2 px-6 py-8 text-[12.5px] md:flex-row md:items-center md:justify-between md:px-10"
          style={{ color: SOFT }}
        >
          <span>© 2026 Reacgen Biosystems · made in SF</span>
          <div className="flex items-center gap-5" style={{ fontFamily: "var(--font-v3-mono)" }}>
            <Link href="/v3" className="hover:text-[#0B1F33]">← back to site</Link>
            <Link href="#" className="hover:text-[#0B1F33]">support</Link>
            <Link href="#" className="hover:text-[#0B1F33]">privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
