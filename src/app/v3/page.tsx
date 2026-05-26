"use client";

import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import {
  ArrowRight,
  ArrowUpRight,
  Beaker,
  CircuitBoard,
  Cpu,
  Gauge,
  Layers,
  MessagesSquare,
  Plug,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Thermometer,
  UserRound,
  Workflow,
} from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useV3Palette, type V3Palette } from "@/lib/theme";

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

export default function V3Page() {
  const p = useV3Palette();
  return (
    <div
      className={`${sans.variable} ${mono.variable} min-h-screen`}
      style={{
        background: p.bg,
        color: p.ink,
        fontFamily: "var(--font-sans)",
      }}
    >
      <Banner />
      <Nav />
      <Hero />
      <Features />
      <DesignedFor />
      <Dashboard />
      <Specs />
      <Notebook />
      <Newsletter />
      <Foot />
    </div>
  );
}

function Banner() {
  const p = useV3Palette();
  return (
    <div
      className="w-full border-b text-center text-[12.5px]"
      style={{
        background: p.ink,
        color: p.bg,
        borderColor: p.ink,
        fontFamily: "var(--font-mono)",
        animation: "rg-fade-in 500ms ease-out both",
      }}
    >
      <div className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2.5">
        <span style={{ color: p.highlight }}>● </span>
        <span>Now shipping v0.4 — 2-week lead time from San Francisco.</span>
        <Link href="#shop" className="underline underline-offset-2 opacity-80 hover:opacity-100">
          See what&apos;s in the box →
        </Link>
      </div>
    </div>
  );
}

function Nav() {
  const p = useV3Palette();
  return (
    <nav
      className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-5 md:px-10"
      style={{ animation: "rg-fade-in 600ms ease-out both" }}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/logo-mark.png" alt="Reacgen Biosystems" width={26} height={26} />
        <span className="text-[1.05rem] tracking-tight" style={{ fontWeight: 600 }}>
          reacgen
        </span>
        <span
          className="ml-1.5 hidden rounded-full px-2 py-0.5 text-[10px] tracking-wider uppercase sm:inline"
          style={{
            background: p.highlight,
            color: p.ink,
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
          }}
        >
          v0.4
        </span>
      </Link>

      <div
        className="hidden items-center gap-7 text-[14px] md:flex"
        style={
          {
            color: p.soft,
            "--v3-nav-hover": p.ink,
          } as React.CSSProperties
        }
      >
        <Link href="#shop" className="hover:text-[var(--v3-nav-hover)] transition-colors">
          Shop
        </Link>
        <Link href="#how" className="hover:text-[var(--v3-nav-hover)] transition-colors">
          How it works
        </Link>
        <Link href="#specs" className="hover:text-[var(--v3-nav-hover)] transition-colors">
          Specs
        </Link>
        <Link href="#notebook" className="hover:text-[var(--v3-nav-hover)] transition-colors">
          Notebook
        </Link>
        <TrackedLink
          href="http://forum.reacgen.local/"
          ctaId="forum-v3-nav"
          location="nav"
          className="inline-flex items-center gap-1 hover:text-[var(--v3-nav-hover)] transition-colors"
        >
          Forum
          <MessagesSquare size={13} strokeWidth={1.75} />
        </TrackedLink>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle
          className="inline-flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-[var(--v3-hover-bg)]"
          style={
            {
              borderColor: p.hair,
              color: p.ink,
              background: "transparent",
              "--v3-hover-bg": p.card,
            } as React.CSSProperties
          }
        />
        <Link
          href="/v3/account"
          className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] transition-colors hover:bg-[var(--v3-hover-bg)]"
          style={
            {
              background: "transparent",
              color: p.ink,
              borderColor: p.hair,
              "--v3-hover-bg": p.card,
            } as React.CSSProperties
          }
        >
          <UserRound size={14} strokeWidth={1.75} />
          <span className="hidden sm:inline">Account</span>
        </Link>
        <Link
          href="#shop"
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
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  const p = useV3Palette();
  return (
    <section className="relative mx-auto max-w-[80rem] px-6 pt-10 pb-20 md:px-10 md:pt-16 md:pb-28">
      {/* margin note, top right */}
      <p
        className="absolute right-6 top-12 hidden max-w-[180px] rotate-[3deg] text-right text-[12px] leading-snug md:block md:right-10"
        style={{
          color: p.soft,
          fontFamily: "var(--font-mono)",
          animation: "rg-fade-up 1000ms ease-out 900ms both",
        }}
      >
        ↘ no sampling.
        <br />
        no drift.
        <br />
        no excuses.
      </p>

      <p
        className="mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-wide"
        style={{
          color: p.soft,
          borderColor: p.hair,
          background: p.card,
          fontFamily: "var(--font-mono)",
          animation: "rg-fade-up 700ms ease-out 80ms both",
        }}
      >
        <Sparkles size={11} strokeWidth={2} style={{ color: p.brand }} />
        For fermentation teams who hate pulling samples.
      </p>

      <h1
        className="max-w-[60rem] leading-[0.98] tracking-[-0.03em]"
        style={{
          fontSize: "clamp(2.6rem, 7.5vw, 5.8rem)",
          fontWeight: 600,
          animation: "rg-fade-up 800ms ease-out 200ms both",
        }}
      >
        Watch your{" "}
        <span className="relative inline-block">
          cells grow
          <Squiggle />
        </span>
        ,
        <br />
        on every reactor,
        <br />
        in real time.
      </h1>

      <p
        className="mt-9 max-w-[40rem] text-[1.15rem] leading-[1.5]"
        style={{
          color: p.soft,
          animation: "rg-fade-up 800ms ease-out 360ms both",
        }}
      >
        ODX-1 is a drop-in optical density probe for bioreactors. Plug it into
        an Ingold port, point your DCS at it, and skip the sampling protocol.
        Same number your bench instrument would give you. At 50 Hz.
      </p>

      <div
        className="mt-10 flex flex-wrap items-center gap-3"
        style={{ animation: "rg-fade-up 800ms ease-out 520ms both" }}
      >
        <Link
          href="/v3/whitelist"
          className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[15px] transition-transform hover:translate-y-[-1px]"
          style={{
            background: p.ink,
            color: p.bg,
            fontWeight: 500,
          }}
        >
          <ShoppingBag size={15} strokeWidth={1.75} />
          Shop ODX-1
          <span
            className="hidden rounded-full px-2 py-0.5 text-[11.5px] sm:inline"
            style={{
              background: p.highlightSoft,
              color: p.ink,
              fontFamily: "var(--font-mono)",
            }}
          >
            from $4,800
          </span>
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="#how"
          className="inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-[14.5px] transition-colors hover:bg-[var(--v3-hover-bg)]"
          style={
            {
              borderColor: p.hair,
              color: p.ink,
              background: "transparent",
              "--v3-hover-bg": p.card,
            } as React.CSSProperties
          }
        >
          See how it works
          <ArrowRight size={14} strokeWidth={1.75} style={{ color: p.brand }} />
        </Link>
      </div>

      {/* Product card */}
      <div
        className="mt-16 grid grid-cols-12 gap-6"
        style={{ animation: "rg-fade-up 900ms ease-out 700ms both" }}
      >
        <div className="col-span-12 md:col-span-8">
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-2xl border"
            style={{
              background: `radial-gradient(ellipse at 30% 25%, ${p.card} 0%, ${p.cardCool} 55%, ${p.hairSoft} 100%)`,
              borderColor: p.hair,
            }}
          >
            <Image
              src="/logo-horizontal.png"
              alt="Reacgen ODX-1 probe"
              fill
              className="object-contain p-10 md:p-16"
              priority
            />

            {/* hand-drawn-ish callouts */}
            <div
              className="absolute left-6 top-6 max-w-[200px] text-[11px] leading-snug"
              style={{ color: p.ink, fontFamily: "var(--font-mono)" }}
            >
              <span
                className="inline-block rounded-full px-2 py-0.5"
                style={{ background: p.highlight }}
              >
                01 · 12 mm Ingold thread
              </span>
            </div>
            <div
              className="absolute right-6 bottom-6 max-w-[200px] text-right text-[11px] leading-snug"
              style={{ color: p.ink, fontFamily: "var(--font-mono)" }}
            >
              <span
                className="inline-block rounded-full px-2 py-0.5"
                style={{ background: p.highlight }}
              >
                02 · sapphire window
              </span>
            </div>

            {/* shipping sticker */}
            <div
              className="absolute right-5 top-5 rotate-[6deg] rounded-md border-2 px-3 py-1 text-[10.5px] tracking-[0.18em] uppercase"
              style={{
                borderColor: p.ink,
                color: p.ink,
                background: p.bg,
                fontFamily: "var(--font-mono)",
                boxShadow: `2px 2px 0 ${p.inkHair}`,
              }}
            >
              Ships from SF
            </div>
          </div>
        </div>

        <aside className="col-span-12 flex flex-col gap-3 md:col-span-4">
          {[
            ["OD range", "0.001 – 200", "five decades, one probe"],
            ["Refresh", "50 Hz", "captures induction in <50 ms"],
            ["Endurance", "≥ 300 SIP", "validated at 134 °C"],
            ["Accuracy", "± 0.5%", "matches the bench spec"],
          ].map(([label, val, sub]) => (
            <div
              key={label}
              className="flex items-baseline gap-4 rounded-xl border px-4 py-3"
              style={{ borderColor: p.hair, background: p.card }}
            >
              <span
                className="w-[72px] shrink-0 text-[10.5px] tracking-[0.16em] uppercase"
                style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
              >
                {label}
              </span>
              <span className="text-[1.05rem]" style={{ fontWeight: 600 }}>
                {val}
              </span>
              <span className="ml-auto text-right text-[12px]" style={{ color: p.soft }}>
                {sub}
              </span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function Squiggle() {
  const p = useV3Palette();
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

function Features() {
  const p = useV3Palette();
  const items: [React.ReactNode, string, string][] = [
    [<Gauge key="g" size={20} strokeWidth={1.75} />, "Continuous OD", "Reads 50 times a second. No more guessing between offline samples."],
    [<Thermometer key="t" size={20} strokeWidth={1.75} />, "SIP-rated", "316L body, sapphire window. 300+ steam cycles, no drift."],
    [<Plug key="p" size={20} strokeWidth={1.75} />, "Talks to everything", "Modbus, MQTT, 4–20 mA, REST. DeltaV, Ignition, your homemade Python script."],
    [<Layers key="l" size={20} strokeWidth={1.75} />, "Bench to 2000 L", "Same probe, same calibration coefficients. No re-fitting at scale."],
    [<Cpu key="c" size={20} strokeWidth={1.75} />, "Open API + SDK", "Stream raw photodiode counts if you want. We document everything."],
    [<Workflow key="w" size={20} strokeWidth={1.75} />, "Two-channel optics", "850 nm subtracts bubble scatter from 600 nm. Aeration becomes a non-issue."],
  ];
  return (
    <section
      id="how"
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-y-4">
          <h2
            className="max-w-2xl tracking-[-0.025em]"
            style={{
              fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)",
              fontWeight: 600,
              lineHeight: 1.05,
            }}
          >
            Everything you wish your old OD probe did.
          </h2>
          <p
            className="max-w-md text-[14.5px] leading-[1.55]"
            style={{ color: p.soft }}
          >
            We started Reacgen because we were tired of pulling samples at 3am.
            ODX-1 is the probe we wanted to buy.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border md:grid-cols-3"
          style={{ borderColor: p.hair, background: p.hair }}
        >
          {items.map(([icon, title, body]) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-7 transition-colors"
              style={{ background: p.card }}
            >
              <span
                className="inline-flex size-9 items-center justify-center rounded-full"
                style={{ background: p.bg, color: p.brand, border: `1px solid ${p.hair}` }}
              >
                {icon}
              </span>
              <h3 className="mt-1 text-[1.05rem] tracking-[-0.01em]" style={{ fontWeight: 600 }}>
                {title}
              </h3>
              <p className="text-[14px] leading-[1.55]" style={{ color: p.soft }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignedFor() {
  const p = useV3Palette();
  const pills = [
    "process dev teams",
    "bioprocess engineers",
    "CHO + HEK + Vero",
    "E. coli + yeast",
    "perfusion runs",
    "fed-batch",
    "Sartorius bags",
    "ABEC",
    "Cytiva",
    "grad students with one shaker flask",
  ];
  return (
    <section
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-24">
        <p
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ color: p.brand, fontFamily: "var(--font-mono)" }}
        >
          designed for
        </p>
        <h2
          className="mt-4 max-w-3xl tracking-[-0.025em]"
          style={{
            fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          Bioprocess teams, fermentation labs, and anyone who&apos;s ever
          watched a culture crash overnight.
        </h2>

        <div className="mt-10 flex flex-wrap gap-2.5">
          {pills.map((pill, i) => (
            <span
              key={pill}
              className="rounded-full border px-3.5 py-1.5 text-[13px]"
              style={{
                borderColor: p.hair,
                background: i % 3 === 0 ? p.brandWash : p.card,
                color: p.ink,
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  const p = useV3Palette();
  return (
    <section
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <p
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: p.brand, fontFamily: "var(--font-mono)" }}
            >
              the dashboard
            </p>
            <h2
              className="mt-4 max-w-md tracking-[-0.025em]"
              style={{
                fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              See every reactor on one screen. Or don&apos;t — your DCS is fine too.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.6]" style={{ color: p.soft }}>
              We ship a free web app that auto-discovers any ODX-1 on the same
              network. Live charts, run comparison, CSV export. No login wall,
              no SaaS subscription, no &ldquo;contact sales for pricing.&rdquo;
            </p>

            <ul className="mt-7 space-y-3 text-[14.5px]" style={{ color: p.ink }}>
              {[
                "Self-hosted, runs in a Docker container",
                "Reads from any DCS historian via OPC UA",
                "Per-run annotations, Jupyter export",
                "Same dashboard the founders use in our pilot lab",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span
                    className="mt-2 inline-block size-1.5 rounded-full"
                    style={{ background: p.brand }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-7">
            <FakeChart />
          </div>
        </div>
      </div>
    </section>
  );
}

function FakeChart() {
  const p = useV3Palette();
  // Sketchy hand-drawn-ish growth curve
  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-2xl border"
      style={{
        background: `linear-gradient(180deg, ${p.card} 0%, ${p.cardWarm} 100%)`,
        borderColor: p.hair,
      }}
    >
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {/* gridlines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`h${i}`}
            x1="40"
            x2="780"
            y1={80 + i * 80}
            y2={80 + i * 80}
            stroke={p.hair}
            strokeWidth="1"
          />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={`v${i}`}
            x1={40 + i * 124}
            x2={40 + i * 124}
            y1="80"
            y2="400"
            stroke={p.hair}
            strokeWidth="1"
          />
        ))}

        {/* growth curve */}
        <path
          d="M 40 390 C 120 388, 180 380, 230 360 S 320 270, 380 200 S 480 110, 560 95 S 700 95, 780 105"
          fill="none"
          stroke={p.brand}
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            strokeDasharray: 1400,
            animation: "rg-draw 2200ms ease-out 600ms both",
          }}
        />
        {/* secondary noisy curve */}
        <path
          d="M 40 392 C 120 391, 180 384, 230 365 S 320 278, 380 207 S 480 118, 560 100 S 700 102, 780 112"
          fill="none"
          stroke={p.brand}
          strokeOpacity="0.25"
          strokeWidth="6"
        />

        {/* axis labels */}
        <text x="20" y="90" fill={p.soft} fontSize="11" fontFamily="JetBrains Mono, monospace">10²</text>
        <text x="20" y="170" fill={p.soft} fontSize="11" fontFamily="JetBrains Mono, monospace">10¹</text>
        <text x="20" y="250" fill={p.soft} fontSize="11" fontFamily="JetBrains Mono, monospace">10⁰</text>
        <text x="14" y="330" fill={p.soft} fontSize="11" fontFamily="JetBrains Mono, monospace">10⁻¹</text>
        <text x="14" y="410" fill={p.soft} fontSize="11" fontFamily="JetBrains Mono, monospace">10⁻²</text>

        <text x="40" y="430" fill={p.soft} fontSize="11" fontFamily="JetBrains Mono, monospace">0h</text>
        <text x="408" y="430" fill={p.soft} fontSize="11" fontFamily="JetBrains Mono, monospace">12h</text>
        <text x="772" y="430" fill={p.soft} fontSize="11" fontFamily="JetBrains Mono, monospace">24h</text>

        {/* phase annotation */}
        <line x1="380" y1="200" x2="380" y2="450" stroke={p.ink} strokeOpacity="0.25" strokeDasharray="4 4" />
        <text
          x="386"
          y="470"
          fill={p.ink}
          fontSize="12"
          fontFamily="JetBrains Mono, monospace"
        >
          induction →
        </text>
      </svg>

      <div
        className="absolute left-5 top-5 flex items-center gap-2 text-[11px] tracking-wide"
        style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
      >
        <span
          className="inline-block size-1.5 rounded-full"
          style={{ background: p.brand }}
        />
        reactor-04 · E. coli BL21 · 2026-03-12
      </div>

      <div
        className="absolute right-5 top-5 rounded-md border px-2 py-1 text-[10.5px] tracking-wider uppercase"
        style={{
          borderColor: p.hair,
          background: p.card,
          color: p.ink,
          fontFamily: "var(--font-mono)",
        }}
      >
        live
      </div>
    </div>
  );
}

function Specs() {
  const p = useV3Palette();
  const rows: [string, string][] = [
    ["Wavelengths", "600 nm + 850 nm (alternating, ratiometric)"],
    ["Process connection", "12 mm Ingold (standard) · 25 mm Ingold (option)"],
    ["Wetted materials", "316L stainless · sapphire · EPDM o-ring"],
    ["Operating temperature", "4 °C – 60 °C process · 134 °C SIP"],
    ["Operating pressure", "0 – 6 bar"],
    ["Outputs", "Modbus TCP · MQTT · 4–20 mA · REST · OPC UA"],
    ["Power", "24 V DC · ≤ 4 W"],
    ["Cable", "M12 8-pin · 3 m or 10 m"],
    ["Compliance", "EHEDG · ATEX zone 2 (option) · CE · FCC"],
    ["Warranty", "24 months · 12 months on optical window"],
  ];
  return (
    <section
      id="specs"
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-y-4">
          <div>
            <p
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: p.brand, fontFamily: "var(--font-mono)" }}
            >
              the specs
            </p>
            <h2
              className="mt-4 tracking-[-0.025em]"
              style={{
                fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Nothing buried, nothing footnoted.
            </h2>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-[14px]"
            style={{ color: p.ink }}
          >
            Datasheet (PDF) <ArrowUpRight size={14} style={{ color: p.brand }} />
          </Link>
        </div>

        <dl
          className="mt-10 overflow-hidden rounded-2xl border"
          style={{ borderColor: p.hair, background: p.card }}
        >
          {rows.map(([k, v], i) => (
            <div
              key={k}
              className="grid grid-cols-12 gap-x-4 px-5 py-4 text-[14.5px] md:px-7"
              style={{
                borderTop: i === 0 ? "none" : `1px solid ${p.hair}`,
              }}
            >
              <dt
                className="col-span-12 text-[12px] tracking-[0.12em] uppercase md:col-span-4"
                style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
              >
                {k}
              </dt>
              <dd className="col-span-12 md:col-span-8" style={{ color: p.ink }}>
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Notebook() {
  const p = useV3Palette();
  const posts: [string, string, string, string, React.ReactNode][] = [
    [
      "Why we built a probe instead of a SaaS",
      "engineering · 8 min",
      "We spent a year on a pure-software analytics platform. Then we realized: the limiting reagent in bioprocess monitoring isn't data, it's measurement. So we burned the SaaS and built a sensor.",
      "Read",
      <Beaker key="b" size={16} strokeWidth={1.75} />,
    ],
    [
      "How to subtract bubble scatter without lying",
      "science · 6 min",
      "A 850 nm reference channel sounds simple. It isn't. Here's the math, the photodiode noise floor, and why our first three prototypes lied to us about CHO densities.",
      "Read",
      <CircuitBoard key="c" size={16} strokeWidth={1.75} />,
    ],
    [
      "Field notes: 90 days at a CDMO pilot plant",
      "logbook · 11 min",
      "What broke. What didn't. A week-by-week log of running ODX-1 next to incumbent probes on six parallel 200 L runs. (Spoiler: the o-rings were the hardest part.)",
      "Read",
      <ShieldCheck key="s" size={16} strokeWidth={1.75} />,
    ],
  ];
  return (
    <section
      id="notebook"
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-y-4">
          <div>
            <p
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: p.brand, fontFamily: "var(--font-mono)" }}
            >
              from the notebook
            </p>
            <h2
              className="mt-4 tracking-[-0.025em]"
              style={{
                fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              We write everything down.
            </h2>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-[14px]"
            style={{ color: p.ink }}
          >
            All posts <ArrowUpRight size={14} style={{ color: p.brand }} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map(([title, meta, body, cta, icon]) => (
            <NotebookCard
              key={title}
              p={p}
              title={title}
              meta={meta}
              body={body}
              cta={cta}
              icon={icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function NotebookCard({
  p,
  title,
  meta,
  body,
  cta,
  icon,
}: {
  p: V3Palette;
  title: string;
  meta: string;
  body: string;
  cta: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href="#"
      className="group flex h-full flex-col rounded-2xl border p-6 transition-colors hover:border-[var(--v3-hover-border)]"
      style={
        {
          borderColor: p.hair,
          background: p.card,
          "--v3-hover-border": p.brandSoft,
        } as React.CSSProperties
      }
    >
      <span
        className="inline-flex size-9 items-center justify-center rounded-full"
        style={{ background: p.bg, color: p.brand, border: `1px solid ${p.hair}` }}
      >
        {icon}
      </span>
      <p
        className="mt-5 text-[11px] tracking-[0.16em] uppercase"
        style={{ color: p.soft, fontFamily: "var(--font-mono)" }}
      >
        {meta}
      </p>
      <h3 className="mt-2 text-[1.15rem] leading-[1.25]" style={{ fontWeight: 600 }}>
        {title}
      </h3>
      <p className="mt-3 flex-1 text-[14px] leading-[1.55]" style={{ color: p.soft }}>
        {body}
      </p>
      <span
        className="mt-5 inline-flex items-center gap-1.5 text-[13.5px]"
        style={{ color: p.brand }}
      >
        {cta} <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function Newsletter() {
  const p = useV3Palette();
  return (
    <section
      id="shop"
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:px-10 md:py-28">
        <div
          className="relative overflow-hidden rounded-3xl border p-8 md:p-14"
          style={{
            background: p.ink,
            color: p.bg,
            borderColor: p.ink,
          }}
        >
          {/* subtle dotted bg */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `radial-gradient(circle, ${p.bgWashSoft} 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7">
              <p
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ color: p.highlight, fontFamily: "var(--font-mono)" }}
              >
                get one in your lab
              </p>
              <h2
                className="mt-4 tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                  fontWeight: 600,
                  lineHeight: 1.02,
                }}
              >
                Try it for four weeks.
                <br />
                Keep it if the numbers convince you.
              </h2>
              <p className="mt-6 max-w-lg text-[15.5px] leading-[1.55]" style={{ opacity: 0.78 }}>
                We&apos;ll ship a calibrated ODX-1 and an engineer to install it
                alongside your current method. You keep the run data. Pay only
                if it earns its place.
              </p>

              <form className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="you@yourlab.org"
                  className="flex-1 rounded-full border bg-transparent px-5 py-3 text-[14.5px] outline-none placeholder:text-white/40 focus:border-white/40"
                  style={{ borderColor: p.bgWashStrong, color: p.bg }}
                />
                <Link
                  href="/v3/whitelist"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14.5px] transition-transform hover:translate-y-[-1px]"
                  style={{
                    background: p.highlight,
                    color: p.ink,
                    fontWeight: 500,
                  }}
                >
                  Reserve a unit <ArrowRight size={14} />
                </Link>
              </form>
              <p
                className="mt-3 text-[12px]"
                style={{ color: p.highlight, fontFamily: "var(--font-mono)" }}
              >
                no spam · two emails a month, max · unsubscribe with one click
              </p>
            </div>

            <aside
              className="col-span-12 md:col-span-5 md:col-start-8"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <TrackedLink
                href="http://forum.reacgen.local/"
                ctaId="forum-v3-contact"
                location="contact-panel"
                className="group flex items-start gap-4 rounded-2xl border p-5 transition-colors no-underline"
                style={{ borderColor: p.bgWashStrong, background: p.bgWash }}
              >
                <span
                  className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full"
                  style={{ background: p.bg, color: p.brand }}
                >
                  <MessagesSquare size={16} strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: p.highlight }}>
                    Open community
                  </p>
                  <p
                    className="mt-1.5 text-[15px] leading-[1.45]"
                    style={{ color: p.bg, fontFamily: "var(--font-sans)", fontWeight: 500 }}
                  >
                    Ask anything at forum.reacgen.local
                  </p>
                  <p
                    className="mt-1 text-[13px] leading-[1.5]"
                    style={{ opacity: 0.7, fontFamily: "var(--font-sans)" }}
                  >
                    Manuals, FAQs, and an open thread the engineers actually
                    read. No ticketing system. No bots.
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="mt-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: p.highlight }}
                />
              </TrackedLink>

              <div className="mt-6 grid grid-cols-2 gap-4 text-[12.5px]" style={{ opacity: 0.7 }}>
                <div>
                  <p style={{ color: p.highlight }}>SHIPPING</p>
                  <p className="mt-1" style={{ color: p.bg }}>2-week lead</p>
                  <p style={{ color: p.bg }}>from San Francisco</p>
                </div>
                <div>
                  <p style={{ color: p.highlight }}>SUPPORT</p>
                  <p className="mt-1" style={{ color: p.bg }}>probe@reacgen.bio</p>
                  <p style={{ color: p.bg }}>+1 (415) 555-0119</p>
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
  const p = useV3Palette();
  return (
    <footer
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div
        className="mx-auto flex max-w-[80rem] flex-col gap-6 px-6 py-10 text-[13px] md:flex-row md:items-center md:justify-between md:px-10"
        style={
          {
            color: p.soft,
            "--v3-foot-hover": p.ink,
          } as React.CSSProperties
        }
      >
        <div className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="Reacgen" width={22} height={22} />
          <span>© 2026 Reacgen Biosystems · made in SF</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2" style={{ fontFamily: "var(--font-mono)" }}>
          <Link href="#" className="hover:text-[var(--v3-foot-hover)]">privacy</Link>
          <Link href="#" className="hover:text-[var(--v3-foot-hover)]">terms</Link>
          <Link href="#" className="hover:text-[var(--v3-foot-hover)]">careers</Link>
          <Link href="/" className="hover:text-[var(--v3-foot-hover)]">← variants</Link>
        </div>
      </div>
    </footer>
  );
}
