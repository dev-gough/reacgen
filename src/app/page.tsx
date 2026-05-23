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
  title: "Reacgen — Five landing-page directions",
  description:
    "Compare five design directions for the Reacgen Biosystems landing page.",
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
    name: "Startup",
    tagline: "Pioreactor school · pale blue, scrappy product-led",
    body: "Live dashboard mock, six-tile feature grid, hand-drawn squiggle under the headline, rotated 'ships from SF' sticker, inline pricing. First-person founder voice. For an audience that wants to skip the corporate intro and read the spec.",
    palette: ["#F4F8FC", "#0B1F33", "#FFE45A"],
    fonts: "Space Grotesk · JetBrains Mono",
  },
  {
    code: "v4",
    href: "/v4",
    name: "Quiet",
    tagline: "Monochrome warm · serif, asymmetric, sparse",
    body: "Aesop / Cereal school. Sand background, umber ink, no second accent — the brand green only appears via the logo. Indented asymmetric grid, marginalia-style section labels. All-serif type, no monospace. For the customer who reads slowly.",
    palette: ["#EFE7D6", "#2C2218", "#74634F"],
    fonts: "Cormorant Garamond · Tenor Sans",
  },
  {
    code: "v5",
    href: "/v5",
    name: "Approachable instrument",
    tagline: "v2's content in v3's vocabulary · light blue, dark-mode ready",
    body: "Every technical asset from v2 (live readout, cross-section schematic, 48-hour fermentation chart, M12 pinout, four-column spec sheet) rewritten in a friendly first-person voice and re-skinned in v3's pale-blue / yellow-highlight palette. Ships with the project's only working dark mode toggle.",
    palette: ["#ECF2F8", "#0B1F33", "#F0D247"],
    fonts: "Space Grotesk · JetBrains Mono",
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
        className="mx-auto flex max-w-[96rem] items-center justify-between px-6 pt-8 md:px-12"
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

      <section className="mx-auto max-w-[96rem] px-6 pt-20 pb-12 md:px-12 md:pt-32">
        <p
          className="text-[11px] tracking-[0.28em] uppercase"
          style={{
            color: BRAND,
            fontFamily: "var(--font-mono)",
            animation: "rg-fade-up 700ms ease-out 80ms both",
          }}
        >
          Five directions
        </p>
        <h1
          className="mt-6 max-w-3xl leading-[1] tracking-[-0.025em]"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
            fontWeight: 500,
            animation: "rg-fade-up 800ms ease-out 200ms both",
          }}
        >
          Five landing-page directions for the ODX-1 optical density sensor.
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

      <section className="mx-auto max-w-[96rem] px-6 pb-32 md:px-12">
        <ul
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
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
        className="mx-auto flex max-w-[96rem] flex-col gap-3 px-6 pb-12 text-[11px] tracking-[0.18em] uppercase md:flex-row md:items-center md:justify-between md:px-12"
        style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
      >
        <span>© 2026 Reacgen Biosystems</span>
        <span>Built on reacgen.local · pnpm · Next 16</span>
      </footer>
    </main>
  );
}
