import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans, Major_Mono_Display } from "next/font/google";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

const display = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v2-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-v2-mono",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-v2-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Account · Reacgen ODX-1",
};

const BG = "#06080A";
const GRID = "#1A2128";
const TEXT = "#D4DDE0";
const MUTED = "#5A6770";
const BRAND = "#3DA478";
const HOT = "#7CFFAE";

export default async function V2AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <div
      className={`${display.variable} ${mono.variable} ${sans.variable} min-h-screen overflow-x-hidden flex flex-col`}
      style={{
        background: BG,
        color: TEXT,
        fontFamily: "var(--font-v2-sans)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <header
          className="flex flex-wrap items-center justify-between gap-y-2 border-b px-6 py-3 text-[10.5px] tracking-[0.16em] uppercase md:px-10"
          style={{
            borderColor: GRID,
            fontFamily: "var(--font-v2-mono)",
            color: MUTED,
          }}
        >
          <Link href="/v2" className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Image src="/logo-mark.png" alt="Reacgen" width={20} height={20} />
              <span style={{ color: TEXT }}>Reacgen / ODX-1</span>
            </div>
            <span className="hidden md:inline">{">"} session.account</span>
          </Link>
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className="hidden md:inline" style={{ color: BRAND }}>
                  ack {user.email}
                </span>
                <form action={signOut}>
                  <input type="hidden" name="returnTo" value="/v2" />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-[#7CFFAE]"
                    style={{ color: BRAND, fontFamily: "var(--font-v2-mono)" }}
                  >
                    // sign-out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/v2/account/sign-in"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#7CFFAE]"
                style={{ color: BRAND }}
              >
                // sign-in
              </Link>
            )}
            <ThemeToggle
              className="inline-flex items-center transition-colors hover:text-[#7CFFAE]"
              style={{ color: BRAND }}
              size={13}
            />
            <div className="flex items-center gap-2">
              <span
                className="inline-block size-2 rounded-full"
                style={{ background: HOT, boxShadow: `0 0 8px ${HOT}` }}
              />
              <span style={{ color: HOT }}>
                {user ? "session ok" : "anon"}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer
          className="border-t px-6 py-4 text-[10.5px] tracking-[0.16em] uppercase md:px-10"
          style={{
            borderColor: GRID,
            color: MUTED,
            fontFamily: "var(--font-v2-mono)",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-y-1">
            <span>© 2026 Reacgen / firmware-grade auth</span>
            <div className="flex gap-5">
              <Link href="/v2" className="hover:text-[#7CFFAE]">← console</Link>
              <Link href="#" className="hover:text-[#7CFFAE]">privacy</Link>
              <Link href="#" className="hover:text-[#7CFFAE]">terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
