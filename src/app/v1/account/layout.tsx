import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Newsreader, Fragment_Mono } from "next/font/google";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-v1-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const body = Newsreader({
  subsets: ["latin"],
  variable: "--font-v1-body",
  display: "swap",
});

const mono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v1-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Account · Reacgen Bulletin",
};

const PAPER = "#F3EDE0";
const INK = "#1A1814";
const GREEN = "#2E7D5B";

export default async function V1AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen flex flex-col`}
      style={{
        background: PAPER,
        color: INK,
        fontFamily: "var(--font-v1-body)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1A1814 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <header
          className="mx-auto flex w-full max-w-[78rem] items-end justify-between px-6 pt-8 pb-4 md:px-16"
        >
          <Link href="/v1" className="flex items-baseline gap-3">
            <Image
              src="/logo-mark.png"
              alt="Reacgen Biosystems"
              width={36}
              height={36}
              className="translate-y-1"
            />
            <span
              className="text-[11px] tracking-[0.22em] uppercase"
              style={{ fontFamily: "var(--font-v1-mono)" }}
            >
              Reacgen Biosystems &nbsp;·&nbsp; Bulletin
            </span>
          </Link>
          <div
            className="hidden items-baseline gap-6 text-[11px] tracking-[0.22em] uppercase md:flex"
            style={{ fontFamily: "var(--font-v1-mono)" }}
          >
            <span>The Subscriber&apos;s Folio</span>
            {user ? (
              <form action={signOut}>
                <input type="hidden" name="returnTo" value="/v1" />
                <button
                  type="submit"
                  className="inline-flex items-baseline gap-1.5 transition-opacity hover:opacity-60"
                  style={{ fontFamily: "var(--font-v1-mono)" }}
                >
                  Sign out
                  <span aria-hidden style={{ color: GREEN }}>×</span>
                </button>
              </form>
            ) : (
              <Link
                href="/v1/account/sign-in"
                className="inline-flex items-baseline gap-1.5 transition-opacity hover:opacity-60"
              >
                Sign in
                <span aria-hidden style={{ color: GREEN }}>§</span>
              </Link>
            )}
            <ThemeToggle
              className="inline-flex items-center transition-opacity hover:opacity-60"
              style={{ color: GREEN }}
              size={13}
            />
          </div>
        </header>

        <hr
          className="mx-6 md:mx-16 border-0 border-t"
          style={{ borderColor: "rgba(26,24,20,0.25)" }}
        />

        <main className="flex-1">{children}</main>

        <footer
          className="mt-20 mx-auto w-full max-w-[78rem] px-6 pb-10 md:px-16"
        >
          <hr
            className="mb-6 border-0 border-t"
            style={{ borderColor: "rgba(26,24,20,0.25)" }}
          />
          <div
            className="flex flex-col gap-2 text-[10.5px] tracking-[0.22em] uppercase md:flex-row md:items-center md:justify-between"
            style={{ fontFamily: "var(--font-v1-mono)", color: "rgba(26,24,20,0.55)" }}
          >
            <span>Colophon · Set in Fraunces &amp; Newsreader</span>
            <div className="flex gap-6">
              <Link href="/v1" className="hover:opacity-70">← Bulletin</Link>
              <Link href="#" className="hover:opacity-70">Privacy</Link>
              <Link href="#" className="hover:opacity-70">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
