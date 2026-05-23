import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Tenor_Sans } from "next/font/google";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-v4-display",
  display: "swap",
});

const sans = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v4-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Account · Reacgen",
};

const BG = "#EFE7D6";
const INK = "#2C2218";
const INK_SOFT = "#74634F";
const HAIR = "#D7CDB9";

export default async function V4AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen flex flex-col`}
      style={{
        background: BG,
        color: INK,
        fontFamily: "var(--font-v4-display)",
      }}
    >
      <header className="mx-auto flex w-full max-w-[72rem] items-center justify-between px-6 py-8 md:px-12 md:py-10">
        <Link href="/v4" className="flex items-baseline gap-3">
          <Image
            src="/logo-mark.png"
            alt="Reacgen Biosystems"
            width={26}
            height={26}
            className="translate-y-1"
          />
          <span
            className="text-[14px]"
            style={{
              fontFamily: "var(--font-v4-display)",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            Reacgen
          </span>
        </Link>

        <div
          className="flex items-center gap-8 text-[11px]"
          style={{
            fontFamily: "var(--font-v4-sans)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: INK_SOFT,
          }}
        >
          <Link href="/v4" className="hover:text-[#2C2218] transition-colors">
            Instrument
          </Link>
          {user ? (
            <>
              <span style={{ color: INK }}>{user.name || user.email}</span>
              <form action={signOut}>
                <input type="hidden" name="returnTo" value="/v4" />
                <button
                  type="submit"
                  className="hover:text-[#2C2218] transition-colors"
                  style={{
                    fontFamily: "var(--font-v4-sans)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: INK_SOFT,
                  }}
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/v4/account/sign-in"
              className="hover:text-[#2C2218] transition-colors"
            >
              Sign in
            </Link>
          )}
          <ThemeToggle
            className="inline-flex items-center transition-colors hover:text-[#2C2218]"
            size={12}
          />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer
        className="mx-auto mt-24 w-full max-w-[72rem] border-t px-6 py-10 md:px-12"
        style={{ borderColor: HAIR }}
      >
        <div
          className="flex flex-col gap-3 text-[11px] md:flex-row md:items-center md:justify-between"
          style={{
            fontFamily: "var(--font-v4-sans)",
            color: INK_SOFT,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          <span>Reacgen Biosystems</span>
          <div className="flex gap-8">
            <Link href="/v4" className="hover:text-[#2C2218]">Index</Link>
            <Link href="#" className="hover:text-[#2C2218]">Privacy</Link>
            <Link href="#" className="hover:text-[#2C2218]">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
