"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import {
  ArrowRight,
  ArrowUpRight,
  Cable,
  CircuitBoard,
  Cpu,
  Layers,
  MessagesSquare,
  Microscope,
  Ruler,
  ShoppingBag,
  Sparkles,
  Thermometer,
  UserRound,
  Waves,
} from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useV5Palette } from "@/lib/theme";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// v5 keeps v2's technical content (live readout, cross-section schematic,
// 48-hour growth chart, pinout, spec sheet) but presented in v3's vocabulary:
// Space Grotesk + JetBrains Mono on a calm cool palette. All colors flow
// through the shared palette object so the page can switch into dark mode
// from any header's ThemeToggle.

export default function V5Page() {
  const p = useV5Palette();
  return (
    <div
      className={`${sans.variable} ${mono.variable} min-h-screen`}
      style={
        {
          background: p.bg,
          color: p.ink,
          fontFamily: "var(--font-sans)",
          // CSS variables for Tailwind arbitrary hover utilities. These switch
          // with the palette so dark mode picks up the right hover targets.
          "--v5-hover": p.navHover,
          "--v5-card": p.card,
          "--v5-bg": p.bg,
        } as React.CSSProperties
      }
    >
      <Banner />
      <Nav />
      <Hero />
      <Schematic />
      <DataPanel />
      <Specs />
      <Pinout />
      <Deployments />
      <CTA />
      <Foot />
    </div>
  );
}

function Banner() {
  const p = useV5Palette();
  return (
    <div
      className="w-full border-b text-center text-[12.5px]"
      style={{
        background: p.bannerBg,
        color: p.bannerFg,
        borderColor: p.bannerBg,
        fontFamily: "var(--font-mono)",
      }}
    >
      <div className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2.5">
        <span style={{ color: p.highlight }}>●</span>
        <span>Spec sheet, pinouts, and a live OD readout — no PDF download.</span>
      </div>
    </div>
  );
}

function Nav() {
  const p = useV5Palette();
  return (
    <nav className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-5 md:px-10">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/logo-mark.png" alt="Reacgen Biosystems" width={26} height={26} />
        <span className="text-[1.05rem] tracking-tight" style={{ fontWeight: 600 }}>
          reacgen
        </span>
        <span
          className="ml-1.5 hidden rounded-full px-2 py-0.5 text-[10px] tracking-wider uppercase sm:inline"
          style={{
            background: p.highlight,
            color: p.onHighlight,
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
          }}
        >
          ODX-1
        </span>
      </Link>

      <div
        className="hidden items-center gap-7 text-[14px] md:flex"
        style={{ color: p.soft }}
      >
        <a href="#inside" className="hover:text-[var(--v5-hover)] transition-colors">
          Inside
        </a>
        <a href="#data" className="hover:text-[var(--v5-hover)] transition-colors">
          Live data
        </a>
        <a href="#specs" className="hover:text-[var(--v5-hover)] transition-colors">
          Specs
        </a>
        <a href="#pinout" className="hover:text-[var(--v5-hover)] transition-colors">
          Pinout
        </a>
        <TrackedLink
          href="http://forum.reacgen.local/"
          ctaId="forum-v5-nav"
          location="nav"
          className="inline-flex items-center gap-1 hover:text-[var(--v5-hover)] transition-colors"
        >
          Forum
          <MessagesSquare size={13} strokeWidth={1.75} />
        </TrackedLink>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle
          className="inline-flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-[var(--v5-card)]"
          style={{ borderColor: p.hair, color: p.ink, background: "transparent" }}
        />
        <Link
          href="/v5/account"
          className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] transition-colors hover:bg-[var(--v5-card)]"
          style={{ borderColor: p.hair, color: p.ink, background: "transparent" }}
        >
          <UserRound size={14} strokeWidth={1.75} />
          <span className="hidden sm:inline">Account</span>
        </Link>
        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-transform hover:translate-y-[-1px]"
          style={{
            background: p.ink,
            color: p.bg,
            borderColor: p.ink,
            fontWeight: 500,
          }}
        >
          <ShoppingBag size={14} strokeWidth={1.75} />
          Shop ODX-1
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const p = useV5Palette();
  return (
    <section className="mx-auto max-w-[80rem] px-6 pt-10 pb-20 md:px-10 md:pt-14 md:pb-24">
      <div className="grid grid-cols-12 gap-x-10 gap-y-10">
        <div className="col-span-12 md:col-span-7">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-wide"
            style={{
              borderColor: p.hair,
              background: p.card,
              color: p.soft,
              fontFamily: "var(--font-mono)",
              animation: "rg-fade-up 700ms ease-out 80ms both",
            }}
          >
            <Sparkles size={11} strokeWidth={2} style={{ color: p.brand }} />
            Engineered for the lab. Readable by everyone.
          </span>

          <h1
            className="mt-7 leading-[0.98] tracking-[-0.03em]"
            style={{
              fontSize: "clamp(2.6rem, 7.2vw, 5.4rem)",
              fontWeight: 600,
              animation: "rg-fade-up 800ms ease-out 200ms both",
            }}
          >
            Live{" "}
            <span className="relative inline-block">
              biomass
              <Squiggle />
            </span>
            ,
            <br />
            inside the reactor —
            <br />
            not beside it.
          </h1>

          <p
            className="mt-9 max-w-xl text-[1.15rem] leading-[1.55]"
            style={{
              color: p.soft,
              animation: "rg-fade-up 800ms ease-out 360ms both",
            }}
          >
            ODX-1 is a dual-wavelength optical density probe. The 600 nm
            channel reports cell density; the 850 nm channel subtracts bubble
            scatter. Both share the same sapphire window. Steam it, scale it,
            log it — the signal stays put.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3"
            style={{ animation: "rg-fade-up 800ms ease-out 520ms both" }}
          >
            <TrackedLink
              href="/v5/whitelist"
              ctaId="hero-evaluation-v5"
              location="hero"
              className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[15px] transition-transform hover:translate-y-[-1px]"
              style={{
                background: p.ink,
                color: p.bg,
                fontWeight: 500,
              }}
            >
              <ShoppingBag size={15} strokeWidth={1.75} />
              Request a unit
              <span
                className="hidden rounded-full px-2 py-0.5 text-[11.5px] sm:inline"
                style={{
                  background: p.highlight,
                  color: p.onHighlight,
                  fontFamily: "var(--font-mono)",
                }}
              >
                free trial · 4 weeks
              </span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </TrackedLink>
            <a
              href="#inside"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-[14.5px] transition-colors hover:bg-[var(--v5-card)]"
              style={{
                borderColor: p.hair,
                color: p.ink,
                background: "transparent",
              }}
            >
              See the schematic
              <ArrowRight size={14} strokeWidth={1.75} style={{ color: p.brand }} />
            </a>
          </div>

          <div
            className="mt-12 grid grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-4"
            style={{ animation: "rg-fade-up 800ms ease-out 620ms both" }}
          >
            <QuickStat label="OD range" value="0.001 – 200" />
            <QuickStat label="Accuracy" value="± 0.5%" />
            <QuickStat label="Refresh" value="50 Hz" />
            <QuickStat label="SIP" value="134 °C" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
          <Readout />
        </div>
      </div>
    </section>
  );
}

function Squiggle() {
  const p = useV5Palette();
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 16"
      preserveAspectRatio="none"
      className="absolute -bottom-1.5 left-0 w-full"
      style={{ height: "0.45em" }}
    >
      <path
        d="M2 10 Q 30 2, 55 9 T 110 9 T 165 8 T 218 10"
        fill="none"
        stroke={p.highlight}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  const p = useV5Palette();
  return (
    <div
      className="rounded-xl border bg-[var(--v5-card)] px-4 py-3"
      style={{ borderColor: p.hair }}
    >
      <p
        className="text-[10.5px] tracking-[0.16em] uppercase"
        style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
      >
        {label}
      </p>
      <p
        className="mt-1 text-[1.15rem] tracking-tight"
        style={{ fontWeight: 600 }}
      >
        {value}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live readout card — re-skinned from v2 with the v3 palette. Counts up on
// mount and runs a periodic "live" tick so the page never feels static.
// ---------------------------------------------------------------------------
function Readout() {
  const p = useV5Palette();
  const od = useCountUp(2.847);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, []);
  const noise = Math.sin(tick * 1.7) * 0.005 + Math.cos(tick * 0.6) * 0.003;
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-7"
      style={{
        borderColor: p.hair,
        background: `linear-gradient(180deg, ${p.readoutFrom} 0%, ${p.readoutTo} 100%)`,
        animation: "rg-fade-up 800ms ease-out 220ms both",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
        >
          OD₆₀₀ · live
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px]"
          style={{
            background: p.recordingBg,
            color: p.recordingFg,
            fontFamily: "var(--font-mono)",
          }}
        >
          <span
            className="inline-block size-1.5 rounded-full"
            style={{ background: p.recordingFg }}
          />
          recording
        </span>
      </div>

      <div className="mt-7 flex items-end gap-4">
        <span
          className="leading-none tracking-[-0.04em]"
          style={{
            fontSize: "clamp(3.4rem, 9vw, 5.8rem)",
            fontWeight: 600,
            color: p.ink,
          }}
        >
          {(od + noise).toFixed(3)}
        </span>
        <span
          className="pb-2 text-[11px] tracking-[0.2em] uppercase"
          style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
        >
          OD
        </span>
      </div>

      <div
        className="mt-2 text-[12px] tracking-[0.18em] uppercase"
        style={{ color: p.brand, fontFamily: "var(--font-mono)" }}
      >
        ± 0.012 · cv 0.4%
      </div>

      <div
        className="mt-8 grid grid-cols-3 gap-3 border-t pt-5 text-[11px] tracking-[0.16em] uppercase"
        style={{
          borderColor: p.hair,
          color: p.soft,
          fontFamily: "var(--font-mono)",
        }}
      >
        <div>
          <p>λ primary</p>
          <p className="mt-1 text-[1.05rem]" style={{ color: p.ink }}>
            600.0 nm
          </p>
        </div>
        <div>
          <p>temp</p>
          <p className="mt-1 text-[1.05rem]" style={{ color: p.ink }}>
            37.0 °C
          </p>
        </div>
        <div>
          <p>uptime</p>
          <p className="mt-1 text-[1.05rem]" style={{ color: p.ink }}>
            42:08:11
          </p>
        </div>
      </div>

      {/* sparkline */}
      <svg
        viewBox="0 0 320 80"
        className="mt-7 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="rg-v5-spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.brand} stopOpacity="0.32" />
            <stop offset="100%" stopColor={p.brand} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 40, 60].map((y) => (
          <line
            key={y}
            x1="0"
            x2="320"
            y1={y}
            y2={y}
            stroke={p.hair}
            strokeWidth="1"
          />
        ))}
        <path
          d="M0,72 L20,70 L40,68 L60,64 L80,58 L100,52 L120,46 L140,42 L160,36 L180,30 L200,24 L220,20 L240,16 L260,14 L280,12 L320,10"
          fill="none"
          stroke={p.brand}
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: 600,
            animation: "rg-draw 1800ms ease-out 300ms both",
          }}
        />
        <path
          d="M0,72 L20,70 L40,68 L60,64 L80,58 L100,52 L120,46 L140,42 L160,36 L180,30 L200,24 L220,20 L240,16 L260,14 L280,12 L320,10 L320,80 L0,80 Z"
          fill="url(#rg-v5-spark)"
          style={{ animation: "rg-fade-in 1200ms ease-out 1500ms both" }}
        />
      </svg>

      {/* scanning line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${p.brand}, transparent)`,
          animation: "rg-scan 6s ease-in-out 1s infinite",
        }}
      />
    </div>
  );
}

function useCountUp(target: number, duration = 1400) {
  const [v, setV] = useState(0);
  const start = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (start.current === null) start.current = t;
      const elapsed = t - start.current;
      const p = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

// ---------------------------------------------------------------------------
// Schematic — re-skinned cross-section. Same callout layout as v2, blue ink.
// ---------------------------------------------------------------------------
function Schematic() {
  const p = useV5Palette();
  const callouts: [string, string, string, React.ReactNode][] = [
    [
      "01",
      "Sapphire window",
      "Polished and flush-mounted at the tip — 8 mm across. Holds up to repeated steam cycles.",
      <Waves key="w" size={16} strokeWidth={1.75} />,
    ],
    [
      "02",
      "Two LEDs",
      "600 nm reads cell density. 850 nm reads bubbles. We subtract one from the other.",
      <Sparkles key="s" size={16} strokeWidth={1.75} />,
    ],
    [
      "03",
      "8-element detector ring",
      "A radial array of photodiodes catches the scattered light. Imbalance flags early fouling.",
      <CircuitBoard key="c" size={16} strokeWidth={1.75} />,
    ],
    [
      "04",
      "Reference path",
      "A built-in reference channel cancels LED aging, so calibration drift stays under 0.01 OD per day.",
      <Layers key="l" size={16} strokeWidth={1.75} />,
    ],
    [
      "05",
      "Sealed transmitter",
      "316L stainless, IP68. One M12 cable carries power, data, and field-bus to your DCS.",
      <Cpu key="p" size={16} strokeWidth={1.75} />,
    ],
  ];

  return (
    <section
      id="inside"
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <SectionHead
          kicker="01 — How it&apos;s built"
          title="A cross-section, in five parts."
          desc="The optics live inside the reactor. Everything you touch from outside is electronics; everything inside is sapphire, stainless, and a little silicone."
        />

        <div
          className="mt-12 grid grid-cols-12 gap-x-8 gap-y-10 rounded-2xl border bg-[var(--v5-card)] p-6 md:p-10"
          style={{ borderColor: p.hair }}
        >
          <div className="col-span-12 md:col-span-8">
            <svg
              viewBox="0 0 720 280"
              className="w-full"
              style={{ animation: "rg-fade-in 900ms ease-out 200ms both" }}
            >
              <defs>
                <pattern
                  id="hatch-v5"
                  width="6"
                  height="6"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="6"
                    stroke={p.soft}
                    strokeWidth="0.6"
                    opacity="0.35"
                  />
                </pattern>
              </defs>

              {/* probe body */}
              <rect
                x="160"
                y="100"
                width="380"
                height="80"
                fill="none"
                stroke={p.soft}
                strokeWidth="1"
              />
              <rect
                x="160"
                y="100"
                width="380"
                height="80"
                fill="url(#hatch-v5)"
              />

              {/* tip / window */}
              <path
                d="M160,100 L100,120 L100,160 L160,180 Z"
                fill={p.card}
                stroke={p.brand}
                strokeWidth="1.5"
              />
              <line
                x1="100"
                y1="120"
                x2="100"
                y2="160"
                stroke={p.highlight}
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* internal optics path */}
              <line
                x1="118"
                y1="130"
                x2="540"
                y2="130"
                stroke={p.brand}
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
              <line
                x1="118"
                y1="150"
                x2="540"
                y2="150"
                stroke={p.brand}
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />

              {/* transmitter */}
              <rect
                x="540"
                y="80"
                width="120"
                height="120"
                fill="none"
                stroke={p.soft}
                strokeWidth="1"
              />
              <rect
                x="540"
                y="80"
                width="120"
                height="120"
                fill="url(#hatch-v5)"
              />

              {/* M12 connector */}
              <circle cx="700" cy="140" r="14" fill="none" stroke={p.soft} strokeWidth="1" />
              <line x1="660" y1="140" x2="686" y2="140" stroke={p.soft} strokeWidth="1" />

              {/* callout lines + dots */}
              {[
                { x: 100, y: 140, lx: 60, ly: 30 },
                { x: 180, y: 130, lx: 200, ly: 30 },
                { x: 220, y: 150, lx: 280, ly: 240 },
                { x: 480, y: 130, lx: 520, ly: 30 },
                { x: 600, y: 140, lx: 660, ly: 240 },
              ].map((c, i) => (
                <g key={i}>
                  <circle cx={c.x} cy={c.y} r="3.5" fill={p.brand} />
                  <line
                    x1={c.x}
                    y1={c.y}
                    x2={c.lx}
                    y2={c.ly}
                    stroke={p.soft}
                    strokeWidth="0.6"
                  />
                  <circle cx={c.lx} cy={c.ly} r="11" fill={p.highlight} />
                  <text
                    x={c.lx}
                    y={c.ly + 4}
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                    fill={p.onHighlight}
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    0{i + 1}
                  </text>
                </g>
              ))}

              {/* dimension marks */}
              <line x1="100" y1="220" x2="660" y2="220" stroke={p.soft} strokeWidth="0.6" />
              <line x1="100" y1="216" x2="100" y2="224" stroke={p.soft} strokeWidth="0.6" />
              <line x1="660" y1="216" x2="660" y2="224" stroke={p.soft} strokeWidth="0.6" />
              <text
                x="380"
                y="240"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                fill={p.soft}
                textAnchor="middle"
                letterSpacing="2"
              >
                318 mm overall
              </text>
            </svg>
          </div>

          <ol className="col-span-12 space-y-4 md:col-span-4">
            {callouts.map(([n, t, d, icon]) => (
              <li
                key={n}
                className="flex gap-4 rounded-xl border p-4 transition-colors hover:bg-[var(--v5-bg)]"
                style={{ borderColor: p.hair, background: p.card }}
              >
                <span
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: p.highlight,
                    color: p.onHighlight,
                  }}
                >
                  <span
                    className="text-[11px] tracking-[0.12em]"
                    style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}
                  >
                    {n}
                  </span>
                </span>
                <div>
                  <p
                    className="text-[1rem]"
                    style={{ fontWeight: 600, color: p.ink }}
                  >
                    {t}
                  </p>
                  <p
                    className="mt-1 text-[13px] leading-[1.5]"
                    style={{ color: p.soft }}
                  >
                    {d}
                  </p>
                  <span
                    className="mt-2 inline-flex items-center gap-1 text-[11px] tracking-[0.16em] uppercase"
                    style={{ color: p.brand, fontFamily: "var(--font-mono)" }}
                  >
                    {icon}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Fermentation chart — same data as v2, light palette.
// ---------------------------------------------------------------------------
function DataPanel() {
  const p = useV5Palette();
  return (
    <section
      id="data"
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <SectionHead
          kicker="02 — Real data"
          title="48 hours of E. coli, in one chart."
          desc="A representative K-12 run logged at 50 Hz and downsampled to 1 Hz for the chart. The 850 nm channel only contributes a correction — it doesn't move the reported OD."
        />

        <div
          className="mt-12 rounded-2xl border bg-[var(--v5-card)] p-6 md:p-10"
          style={{ borderColor: p.hair }}
        >
          <FermentationChart />

          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-4">
            <Stat n="μmax" v="0.41 h⁻¹" hint="exp. phase" />
            <Stat n="ΔOD" v="187.4" hint="0 → 48 h" />
            <Stat n="σ vs offline" v="< 1.2%" hint="n = 36" />
            <Stat n="drift / 24 h" v="< 0.01 OD" hint="ratiometric" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FermentationChart() {
  const p = useV5Palette();
  const w = 1200;
  const h = 320;
  const points: [number, number][] = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const od = 0.1 + 198 / (1 + Math.exp(-9 * (t - 0.45)));
    const x = (i / 48) * w;
    const y = h - (Math.log10(od + 0.1) + 1) * (h / 3.4);
    points.push([x, y]);
  }
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="rg-v5-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.brand} stopOpacity="0.22" />
          <stop offset="100%" stopColor={p.brand} stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2={w}
          y1={h * g}
          y2={h * g}
          stroke={p.hair}
          strokeWidth="1"
        />
      ))}

      {[0, 12, 24, 36, 48].map((hour) => {
        const x = (hour / 48) * w;
        return (
          <g key={hour}>
            <line
              x1={x}
              x2={x}
              y1={h - 10}
              y2={h}
              stroke={p.soft}
              strokeWidth="1"
            />
            <text
              x={x}
              y={h - 14}
              fontSize="14"
              fontFamily="JetBrains Mono, monospace"
              fill={p.soft}
              textAnchor={hour === 0 ? "start" : hour === 48 ? "end" : "middle"}
            >
              {hour}h
            </text>
          </g>
        );
      })}

      {[
        { y: h * 0.95, v: "0.1" },
        { y: h * 0.65, v: "1" },
        { y: h * 0.35, v: "10" },
        { y: h * 0.08, v: "100" },
      ].map((t) => (
        <text
          key={t.v}
          x="10"
          y={t.y}
          fontSize="13"
          fontFamily="JetBrains Mono, monospace"
          fill={p.soft}
        >
          OD {t.v}
        </text>
      ))}

      <path
        d={areaPath}
        fill="url(#rg-v5-fill)"
        style={{ animation: "rg-fade-in 1200ms ease-out 600ms both" }}
      />
      <path
        d={linePath}
        fill="none"
        stroke={p.brand}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 1400,
          animation: "rg-draw 2200ms ease-out 200ms both",
        }}
      />

      {/* induction annotation */}
      <line
        x1={(20 / 48) * w}
        x2={(20 / 48) * w}
        y1="40"
        y2={h * 0.4}
        stroke={p.warn}
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <rect
        x={(20 / 48) * w + 8}
        y="40"
        rx="4"
        ry="4"
        width="150"
        height="22"
        fill={p.highlight}
      />
      <text
        x={(20 / 48) * w + 18}
        y="56"
        fontSize="13"
        fontFamily="JetBrains Mono, monospace"
        fill={p.onHighlight}
        fontWeight="500"
      >
        induction · IPTG
      </text>
    </svg>
  );
}

function Stat({ n, v, hint }: { n: string; v: string; hint: string }) {
  const p = useV5Palette();
  return (
    <div
      className="rounded-xl border bg-[var(--v5-card)] px-4 py-3"
      style={{ borderColor: p.hair }}
    >
      <p
        className="text-[10.5px] tracking-[0.16em] uppercase"
        style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
      >
        {n}
      </p>
      <p
        className="mt-1 text-[1.35rem] tracking-[-0.01em]"
        style={{ fontWeight: 600, color: p.ink }}
      >
        {v}
      </p>
      <p
        className="mt-0.5 text-[10.5px] tracking-[0.14em] uppercase"
        style={{ color: p.brand, fontFamily: "var(--font-mono)" }}
      >
        {hint}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Specs — same 4-column matrix as v2, light palette + plain-English subtitles.
// ---------------------------------------------------------------------------
function Specs() {
  const p = useV5Palette();
  const cols: [string, React.ReactNode, [string, string][]][] = [
    [
      "Optical",
      <Microscope key="m" size={16} strokeWidth={1.75} />,
      [
        ["Wavelengths", "600 nm · 850 nm"],
        ["Range", "0.001 – 200 OD"],
        ["Accuracy", "± 0.5% of reading"],
        ["Resolution", "0.001 OD"],
        ["Path length", "5 mm (effective)"],
      ],
    ],
    [
      "Mechanical",
      <Ruler key="r" size={16} strokeWidth={1.75} />,
      [
        ["Body", "316L stainless"],
        ["Window", "Sapphire ⌀ 8 mm"],
        ["Ingress", "IP68 / IP69K"],
        ["Mount", "12 / 25 mm Ingold"],
        ["Length", "120 / 220 / 318 mm"],
      ],
    ],
    [
      "Process",
      <Thermometer key="t" size={16} strokeWidth={1.75} />,
      [
        ["Temperature", "−5 to 140 °C"],
        ["Pressure", "0 – 10 bar"],
        ["SIP", "134 °C × 30 min"],
        ["CIP", "NaOH 2 M, 80 °C"],
        ["Cycles tested", "≥ 300"],
      ],
    ],
    [
      "Electrical",
      <Cable key="c" size={16} strokeWidth={1.75} />,
      [
        ["Supply", "24 VDC, 4.2 W"],
        ["Analog", "4–20 mA isolated"],
        ["Fieldbus", "Modbus RTU · TCP"],
        ["IIoT", "MQTT 5.0, TLS"],
        ["Connector", "M12 × 8 A-code"],
      ],
    ],
  ];

  return (
    <section
      id="specs"
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <SectionHead
          kicker="03 — Spec sheet"
          title="Every number, on one page."
          desc="Pulled straight from the ODX-1 datasheet. The full PDF is one click away if you'd rather read it offline."
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border md:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: p.hair, background: p.hair }}
        >
          {cols.map(([title, icon, rows]) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-7"
              style={{ background: p.card }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex size-8 items-center justify-center rounded-full"
                  style={{
                    background: p.bg,
                    color: p.brand,
                    border: `1px solid ${p.hair}`,
                  }}
                >
                  {icon}
                </span>
                <h3
                  className="text-[1.05rem] tracking-tight"
                  style={{ fontWeight: 600 }}
                >
                  {title}
                </h3>
              </div>
              <dl
                className="mt-2 space-y-3 text-[13.5px]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {rows.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-0.5">
                    <dt
                      className="text-[10.5px] tracking-[0.14em] uppercase"
                      style={{ color: p.soft }}
                    >
                      {k}
                    </dt>
                    <dd style={{ color: p.ink }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pinout — M12 × 8. Same wiring as v2 with a plain-English column added.
// ---------------------------------------------------------------------------
function Pinout() {
  const p = useV5Palette();
  const pins: [number, string, string, string][] = [
    [1, "24V", "Supply, isolated", "Power in"],
    [2, "GND", "Power return", "Power return"],
    [3, "I+", "4–20 mA loop, sourcing", "Analog output (+)"],
    [4, "I−", "4–20 mA loop, sinking", "Analog output (−)"],
    [5, "A/D+", "RS-485, Modbus RTU", "Field-bus +"],
    [6, "A/D−", "RS-485, Modbus RTU", "Field-bus −"],
    [7, "ETH", "100BASE-T1, MQTT", "Ethernet / MQTT"],
    [8, "PE", "Protective earth", "Chassis ground"],
  ];

  return (
    <section
      id="pinout"
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <SectionHead
              kicker="04 — Wiring"
              title="M12 × 8 connector."
              desc="A-coded — the same connector your DCS already has. Cable lengths up to 100 m without a repeater. A PoE variant ships in Q3."
              compact
            />

            <div
              className="mt-10 flex items-center justify-center rounded-2xl border bg-[var(--v5-card)] p-6"
              style={{
                borderColor: p.hair,
                animation: "rg-fade-in 900ms ease-out 200ms both",
              }}
            >
              <svg viewBox="-100 -100 200 200" className="size-64">
                <circle r="90" fill="none" stroke={p.hair} strokeWidth="1" />
                <circle r="60" fill={p.bg} stroke={p.brand} strokeWidth="1.5" />
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                  const cx = Math.cos(angle) * 40;
                  const cy = Math.sin(angle) * 40;
                  const lx = Math.cos(angle) * 78;
                  const ly = Math.sin(angle) * 78;
                  return (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="8" fill={p.card} stroke={p.brand} strokeWidth="1.5" />
                      <text
                        x={cx}
                        y={cy + 4}
                        fontSize="10"
                        fontFamily="JetBrains Mono, monospace"
                        fill={p.brand}
                        textAnchor="middle"
                        fontWeight="500"
                      >
                        {i + 1}
                      </text>
                      <text
                        x={lx}
                        y={ly + 4}
                        fontSize="11"
                        fontFamily="JetBrains Mono, monospace"
                        fill={p.soft}
                        textAnchor="middle"
                      >
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
                <circle r="3.5" fill={p.brand} />
              </svg>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div
              className="overflow-hidden rounded-2xl border bg-[var(--v5-card)]"
              style={{ borderColor: p.hair }}
            >
              <table className="w-full" style={{ fontFamily: "var(--font-mono)" }}>
                <thead>
                  <tr
                    className="text-[10.5px] tracking-[0.16em] uppercase"
                    style={{ color: p.soft }}
                  >
                    <th
                      className="border-b px-5 py-3 text-left"
                      style={{ borderColor: p.hair, fontWeight: 500 }}
                    >
                      pin
                    </th>
                    <th
                      className="border-b px-5 py-3 text-left"
                      style={{ borderColor: p.hair, fontWeight: 500 }}
                    >
                      signal
                    </th>
                    <th
                      className="border-b px-5 py-3 text-left"
                      style={{ borderColor: p.hair, fontWeight: 500 }}
                    >
                      in english
                    </th>
                    <th
                      className="hidden border-b px-5 py-3 text-left md:table-cell"
                      style={{ borderColor: p.hair, fontWeight: 500 }}
                    >
                      function
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pins.map(([n, s, f, plain]) => (
                    <tr key={n}>
                      <td
                        className="border-b px-5 py-3 text-[14px]"
                        style={{ borderColor: p.hair }}
                      >
                        <span
                          className="inline-flex size-6 items-center justify-center rounded-full"
                          style={{
                            background: p.highlight,
                            color: p.onHighlight,
                            fontWeight: 500,
                          }}
                        >
                          {n}
                        </span>
                      </td>
                      <td
                        className="border-b px-5 py-3 text-[14px]"
                        style={{ borderColor: p.hair, color: p.ink }}
                      >
                        {s}
                      </td>
                      <td
                        className="border-b px-5 py-3 text-[13.5px]"
                        style={{ borderColor: p.hair, color: p.ink, fontFamily: "var(--font-sans)" }}
                      >
                        {plain}
                      </td>
                      <td
                        className="hidden border-b px-5 py-3 text-[13px] md:table-cell"
                        style={{ borderColor: p.hair, color: p.soft }}
                      >
                        {f}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p
              className="mt-4 text-[12.5px]"
              style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
            >
              Full wiring diagrams + pre-made cables for DeltaV, Ignition, and
              Sartorius BIOSTAT — all on the docs site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Deployments — same names as v2, friendlier wrapper.
// ---------------------------------------------------------------------------
function Deployments() {
  const p = useV5Palette();
  const orgs: [string, string][] = [
    ["Top-10 biologics manufacturer", "2,000 L production"],
    ["Federal R&D laboratory", "Vaccine pilot"],
    ["European CDMO", "Perfusion CHO platform"],
    ["Academic bioengineering group", "Continuous fermentation"],
    ["Industrial yeast producer", "50 m³ scale"],
    ["Cell-therapy startup", "Single-use clamps"],
  ];

  return (
    <section className="border-t" style={{ borderColor: p.hair }}>
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <SectionHead
          kicker="05 — In the field"
          title="Where ODX-1 is running today."
          desc="Identities withheld at customer request. Sectors and scales are real."
        />

        <ul className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2">
          {orgs.map(([who, where], i) => (
            <li
              key={who}
              className="flex items-center gap-4 rounded-2xl border bg-[var(--v5-card)] px-5 py-4"
              style={{ borderColor: p.hair }}
            >
              <span
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[12px]"
                style={{
                  background: p.highlight,
                  color: p.onHighlight,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[14.5px]" style={{ fontWeight: 500 }}>
                  {who}
                </p>
                <p
                  className="text-[12.5px]"
                  style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
                >
                  {where}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CTA() {
  const p = useV5Palette();
  return (
    <section
      id="cta"
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <div
          className="relative overflow-hidden rounded-3xl border p-8 md:p-14"
          style={{
            background: p.ctaBg,
            color: p.ctaFg,
            borderColor: p.ctaBg,
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `radial-gradient(circle, ${p.ctaFg} 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7">
              <p
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ color: p.highlight, fontFamily: "var(--font-mono)" }}
              >
                ready when you are
              </p>
              <h2
                className="mt-4 tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                  fontWeight: 600,
                  lineHeight: 1.02,
                }}
              >
                Try it on your reactor.
                <br />
                Pay only if the numbers convince you.
              </h2>
              <p className="mt-6 max-w-lg text-[15.5px] leading-[1.55]" style={{ opacity: 0.78 }}>
                We ship a calibrated ODX-1 and an engineer to install it
                alongside your current method. Four weeks, your data, no card
                up-front.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <TrackedLink
                  href="/v5/whitelist"
                  ctaId="cta-evaluation-v5"
                  location="cta"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14.5px] transition-transform hover:translate-y-[-1px]"
                  style={{ background: p.highlight, color: p.onHighlight, fontWeight: 500 }}
                >
                  Request a unit
                  <ArrowRight size={14} />
                </TrackedLink>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[14px]"
                  style={{
                    borderColor: p.ctaSubtleBorder,
                    color: p.ctaFg,
                  }}
                >
                  Download datasheet (PDF)
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            <aside
              className="col-span-12 md:col-span-5 md:col-start-8"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <TrackedLink
                href="http://forum.reacgen.local/"
                ctaId="forum-v5-cta"
                location="cta-panel"
                className="group flex items-start gap-4 rounded-2xl border p-5 transition-colors no-underline"
                style={{
                  borderColor: p.ctaSubtleBorder,
                  background: p.ctaSubtleBg,
                }}
              >
                <span
                  className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full"
                  style={{ background: p.ctaFg, color: p.brand }}
                >
                  <MessagesSquare size={16} strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <p
                    className="text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: p.highlight }}
                  >
                    Open community
                  </p>
                  <p
                    className="mt-1.5 text-[15px] leading-[1.45]"
                    style={{ color: p.ctaFg, fontFamily: "var(--font-sans)", fontWeight: 500 }}
                  >
                    forum.reacgen.local
                  </p>
                  <p
                    className="mt-1 text-[13px] leading-[1.5]"
                    style={{ opacity: 0.7, fontFamily: "var(--font-sans)" }}
                  >
                    Wiring diagrams, integration recipes, and an open thread
                    where the engineers actually read replies.
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="mt-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: p.highlight }}
                />
              </TrackedLink>

              <div
                className="mt-6 grid grid-cols-2 gap-4 text-[12.5px]"
                style={{ opacity: 0.75 }}
              >
                <div>
                  <p style={{ color: p.highlight }}>SHIPPING</p>
                  <p className="mt-1" style={{ color: p.ctaFg }}>2-week lead</p>
                  <p style={{ color: p.ctaFg }}>from San Francisco</p>
                </div>
                <div>
                  <p style={{ color: p.highlight }}>SUPPORT</p>
                  <p className="mt-1" style={{ color: p.ctaFg }}>probe@reacgen.bio</p>
                  <p style={{ color: p.ctaFg }}>+1 (415) 555-0119</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function Foot() {
  const p = useV5Palette();
  return (
    <footer
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div
        className="mx-auto flex max-w-[80rem] flex-col gap-4 px-6 py-10 text-[13px] md:flex-row md:items-center md:justify-between md:px-10"
        style={{ color: p.soft }}
      >
        <div className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="Reacgen" width={22} height={22} />
          <span>© 2026 Reacgen Biosystems · made in SF</span>
        </div>
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Link href="#" className="hover:text-[var(--v5-hover)]">
            privacy
          </Link>
          <Link href="#" className="hover:text-[var(--v5-hover)]">
            terms
          </Link>
          <Link href="#" className="hover:text-[var(--v5-hover)]">
            careers
          </Link>
          <Link href="/" className="hover:text-[var(--v5-hover)]">
            ← variants
          </Link>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Shared section header (kicker + title + description).
// ---------------------------------------------------------------------------
function SectionHead({
  kicker,
  title,
  desc,
  compact,
}: {
  kicker: string;
  title: string;
  desc: string;
  compact?: boolean;
}) {
  const p = useV5Palette();
  return (
    <div className={compact ? "" : "flex flex-wrap items-end justify-between gap-y-4"}>
      <div className={compact ? "max-w-2xl" : "max-w-3xl"}>
        <p
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ color: p.brand, fontFamily: "var(--font-mono)" }}
        >
          {kicker}
        </p>
        <h2
          className={`mt-4 tracking-[-0.025em] ${
            compact
              ? "max-w-md text-[clamp(1.7rem,3vw,2.3rem)]"
              : "max-w-2xl text-[clamp(1.9rem,3.4vw,2.6rem)]"
          }`}
          style={{ fontWeight: 600, lineHeight: 1.05 }}
        >
          {title}
        </h2>
      </div>
      {!compact ? (
        <p
          className="max-w-md text-[14.5px] leading-[1.55]"
          style={{ color: p.soft }}
        >
          {desc}
        </p>
      ) : (
        <p
          className="mt-4 max-w-md text-[14.5px] leading-[1.55]"
          style={{ color: p.soft }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
