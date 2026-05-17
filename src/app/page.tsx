import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Onest, Reddit_Mono } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

const sans = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Reddit_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reacgen — Three landing-page directions",
  description:
    "Compare three design directions for the Reacgen Biosystems landing page.",
};

const variants = [
  {
    code: "v1",
    href: "/v1",
    name: "Editorial",
    tagline: "Scientific journal · paper, serif, footnotes",
    body: "A Nature/NEJM-style spread. Multi-column type, marginalia, drop-caps, and references at the foot. For an audience that reads the methods section.",
    palette: ["#F3EDE0", "#1A1814", "#2E7D5B"],
    fonts: "Fraunces · Newsreader · Fragment Mono",
  },
  {
    code: "v2",
    href: "/v2",
    name: "Instrument",
    tagline: "Engineer-to-engineer · dark, mono, schematic",
    body: "A page that looks like the device's own UI. Live-style readouts, a probe cross-section, a 48-hour fermentation chart, and an M12 pinout. For the people who buy the probe and the people who connect it.",
    palette: ["#06080A", "#3DA478", "#7CFFAE"],
    fonts: "Major Mono · IBM Plex Mono · IBM Plex Sans",
  },
  {
    code: "v3",
    href: "/v3",
    name: "Clinical",
    tagline: "Modern biotech · light, generous, refined",
    body: "Tempus / Recursion school. Generous whitespace, tight grid, italic serif accent, restrained brand-green. For a board deck, for a partner page, for execs.",
    palette: ["#FAFAF6", "#0F1311", "#2F8F66"],
    fonts: "Instrument Serif · Instrument Sans · DM Mono",
  },
];

const PAGE_BG = "#0A0A0A";
const INK = "#EDECE6";
const MUTED = "#7B7B77";
const BRAND = "#3DA478";

export default function IndexPage() {
  return (
    <main
      className={`${sans.variable} ${mono.variable} min-h-screen`}
      style={{
        background: PAGE_BG,
        color: INK,
        fontFamily: "var(--font-sans)",
      }}
    >
      <header
        className="mx-auto flex max-w-[78rem] items-center justify-between px-6 pt-8 md:px-12"
        style={{ animation: "rg-fade-in 600ms ease-out both" }}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt="Reacgen Biosystems"
            width={28}
            height={28}
          />
          <span className="text-[14px]" style={{ fontWeight: 500 }}>
            Reacgen Biosystems
          </span>
        </div>
        <span
          className="text-[11px] tracking-[0.22em] uppercase"
          style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
        >
          Landing · directions · 2026
        </span>
      </header>

      <section className="mx-auto max-w-[78rem] px-6 pt-20 pb-12 md:px-12 md:pt-32">
        <p
          className="text-[11px] tracking-[0.28em] uppercase"
          style={{
            color: BRAND,
            fontFamily: "var(--font-mono)",
            animation: "rg-fade-up 700ms ease-out 80ms both",
          }}
        >
          Three directions
        </p>
        <h1
          className="mt-6 max-w-3xl leading-[1] tracking-[-0.025em]"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
            fontWeight: 500,
            animation: "rg-fade-up 800ms ease-out 200ms both",
          }}
        >
          Three landing-page directions for the ODX-1 optical density sensor.
        </h1>
        <p
          className="mt-8 max-w-2xl text-[1.05rem] leading-[1.6]"
          style={{
            color: MUTED,
            animation: "rg-fade-up 800ms ease-out 360ms both",
          }}
        >
          Each variant tells the same story — a probe that measures cell density
          inside the reactor — to a different reader, with a distinct
          typographic and tonal voice. Pick one to develop, mix elements, or
          send back notes.
        </p>
      </section>

      <section className="mx-auto max-w-[78rem] px-6 pb-32 md:px-12">
        <ul
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border md:grid-cols-3"
          style={{ borderColor: "#1A1A1A", background: "#1A1A1A" }}
        >
          {variants.map((v, i) => (
            <li
              key={v.code}
              style={{
                background: PAGE_BG,
                animation: `rg-fade-up 800ms ease-out ${500 + i * 120}ms both`,
              }}
            >
              <Link
                href={v.href}
                className="group flex h-full flex-col p-8 transition-colors hover:bg-[#101010]"
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-[11px] tracking-[0.22em] uppercase"
                    style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
                  >
                    / {v.code}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: MUTED }}
                  />
                </div>

                <h2
                  className="mt-12 text-[2.2rem] leading-none tracking-[-0.02em]"
                  style={{ fontWeight: 500 }}
                >
                  {v.name}
                </h2>
                <p
                  className="mt-2 text-[12px] tracking-[0.16em] uppercase"
                  style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                >
                  {v.tagline}
                </p>

                <p
                  className="mt-8 flex-1 text-[14.5px] leading-[1.6]"
                  style={{ color: "rgba(237,236,230,0.78)" }}
                >
                  {v.body}
                </p>

                <div className="mt-10 flex items-center gap-2">
                  {v.palette.map((c) => (
                    <span
                      key={c}
                      className="inline-block size-5 rounded-full"
                      style={{
                        background: c,
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      aria-hidden
                    />
                  ))}
                </div>

                <p
                  className="mt-4 text-[11px] tracking-[0.12em]"
                  style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                >
                  {v.fonts}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer
        className="mx-auto flex max-w-[78rem] flex-col gap-3 px-6 pb-12 text-[11px] tracking-[0.18em] uppercase md:flex-row md:items-center md:justify-between md:px-12"
        style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
      >
        <span>© 2026 Reacgen Biosystems</span>
        <span>Built on reacgen.local · pnpm · Next 16</span>
      </footer>
    </main>
  );
}
