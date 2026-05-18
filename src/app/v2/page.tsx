"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IBM_Plex_Mono, IBM_Plex_Sans, Major_Mono_Display } from "next/font/google";

const display = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const BG = "#06080A";
const PANEL = "#0C1014";
const GRID = "#1A2128";
const TEXT = "#D4DDE0";
const MUTED = "#5A6770";
const BRAND = "#3DA478";
const HOT = "#7CFFAE";
const WARN = "#F4B860";

export default function V2Page() {
  return (
    <div
      className={`${display.variable} ${mono.variable} ${sans.variable} min-h-screen overflow-x-hidden`}
      style={{
        background: BG,
        color: TEXT,
        fontFamily: "var(--font-sans)",
      }}
    >
      <BackdropGrid />
      <div className="relative">
        <StatusBar />
        <Hero />
        <Schematic />
        <DataPanel />
        <Specs />
        <Pinout />
        <Deployments />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

function BackdropGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
        maskImage:
          "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        opacity: 0.5,
      }}
    />
  );
}

function StatusBar() {
  return (
    <header
      className="relative z-10 flex flex-wrap items-center justify-between gap-y-2 border-b px-6 py-3 text-[10.5px] tracking-[0.16em] uppercase md:px-10"
      style={{
        borderColor: GRID,
        fontFamily: "var(--font-mono)",
        color: MUTED,
      }}
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Image src="/logo-mark.png" alt="Reacgen" width={20} height={20} />
          <span style={{ color: TEXT }}>Reacgen / ODX-1</span>
        </div>
        <span className="hidden md:inline">FW 2.4.1</span>
        <span className="hidden md:inline">SN 00-A4-7C-13</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="hidden md:inline">Modbus · MQTT · 4–20 mA</span>
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-2 rounded-full"
            style={{
              background: HOT,
              boxShadow: `0 0 8px ${HOT}`,
              animation: "rg-fade-in 800ms ease-out both",
            }}
          />
          <span style={{ color: HOT }}>ready</span>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-[88rem] px-6 pt-12 pb-16 md:px-10 md:pt-20 md:pb-24">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 md:col-span-7">
          <p
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{
              color: BRAND,
              fontFamily: "var(--font-mono)",
              animation: "rg-fade-up 700ms ease-out 80ms both",
            }}
          >
            // optical density sensor · in-situ
          </p>

          <h1
            className="mt-6 leading-[0.95] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
              animation: "rg-fade-up 800ms ease-out 200ms both",
            }}
          >
            Live biomass.
            <br />
            <span style={{ color: BRAND }}>Inside</span> the reactor,
            <br />
            not beside it.
          </h1>

          <p
            className="mt-8 max-w-xl text-[1.05rem] leading-[1.55]"
            style={{
              color: "rgba(212,221,224,0.78)",
              animation: "rg-fade-up 800ms ease-out 360ms both",
            }}
          >
            ODX-1 is a dual-wavelength, ratiometric turbidity probe with a
            polished sapphire window, scatter-compensated optics, and a 50 Hz
            sample loop. Steam it, scale it, log it. The signal does not move.
          </p>

          <div
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4"
            style={{
              fontFamily: "var(--font-mono)",
              animation: "rg-fade-up 800ms ease-out 520ms both",
            }}
          >
            <Spec label="Range" value="0.001 – 200 OD" />
            <Spec label="Accuracy" value="±0.5%" />
            <Spec label="Loop" value="50 Hz" />
            <Spec label="SIP" value="134 °C" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
          <Readout />
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="text-[10px] tracking-[0.22em] uppercase"
        style={{ color: MUTED }}
      >
        {label}
      </p>
      <p className="mt-1 text-[1.05rem]" style={{ color: TEXT }}>
        {value}
      </p>
    </div>
  );
}

function useCountUp(target: number, duration = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(eased * target);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

function Readout() {
  const od = useCountUp(2.847);
  const wl = useCountUp(600.0);
  return (
    <div
      className="relative overflow-hidden border p-6 md:p-8"
      style={{
        borderColor: GRID,
        background: `linear-gradient(180deg, ${PANEL} 0%, #0a0d11 100%)`,
        animation: "rg-fade-up 800ms ease-out 220ms both",
      }}
    >
      {/* corner brackets */}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <div
        className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase"
        style={{ fontFamily: "var(--font-mono)", color: MUTED }}
      >
        <span>OD₆₀₀ · live</span>
        <span style={{ color: HOT }}>● recording</span>
      </div>

      <div className="mt-8 flex items-end gap-4">
        <span
          className="leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 11vw, 7.2rem)",
            color: TEXT,
            letterSpacing: "-0.04em",
          }}
        >
          {od.toFixed(3)}
        </span>
        <span
          className="pb-3 text-[11px] tracking-[0.22em] uppercase"
          style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
        >
          OD
        </span>
      </div>

      <div
        className="mt-3 text-[11px] tracking-[0.18em] uppercase"
        style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
      >
        ± 0.012 · cv 0.4%
      </div>

      <div
        className="mt-10 grid grid-cols-3 gap-3 border-t pt-6 text-[10px] tracking-[0.18em] uppercase"
        style={{
          borderColor: GRID,
          color: MUTED,
          fontFamily: "var(--font-mono)",
        }}
      >
        <div>
          <p>λ primary</p>
          <p className="mt-1 text-[1.05rem]" style={{ color: TEXT }}>
            {wl.toFixed(1)} nm
          </p>
        </div>
        <div>
          <p>temp</p>
          <p className="mt-1 text-[1.05rem]" style={{ color: TEXT }}>
            37.0 °C
          </p>
        </div>
        <div>
          <p>uptime</p>
          <p className="mt-1 text-[1.05rem]" style={{ color: TEXT }}>
            42:08:11
          </p>
        </div>
      </div>

      {/* sparkline */}
      <svg
        viewBox="0 0 320 80"
        className="mt-8 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="rg-spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRAND} stopOpacity="0.35" />
            <stop offset="100%" stopColor={BRAND} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,72 L20,70 L40,68 L60,64 L80,58 L100,52 L120,46 L140,42 L160,36 L180,30 L200,24 L220,20 L240,16 L260,14 L280,12 L320,10"
          fill="none"
          stroke={BRAND}
          strokeWidth="1.5"
          style={{
            strokeDasharray: 600,
            animation: "rg-draw 1800ms ease-out 300ms both",
          }}
        />
        <path
          d="M0,72 L20,70 L40,68 L60,64 L80,58 L100,52 L120,46 L140,42 L160,36 L180,30 L200,24 L220,20 L240,16 L260,14 L280,12 L320,10 L320,80 L0,80 Z"
          fill="url(#rg-spark)"
          style={{ animation: "rg-fade-in 1200ms ease-out 1500ms both" }}
        />
        {/* gridlines */}
        {[20, 40, 60].map((y) => (
          <line
            key={y}
            x1="0"
            x2="320"
            y1={y}
            y2={y}
            stroke={GRID}
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* scanning line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)`,
          animation: "rg-scan 6s ease-in-out 1s infinite",
        }}
      />
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cls: Record<typeof pos, string> = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return (
    <span
      aria-hidden
      className={`absolute size-3 ${cls[pos]}`}
      style={{ borderColor: BRAND }}
    />
  );
}

function Schematic() {
  const callouts = [
    { num: "01", label: "Sapphire window", desc: "flush mount, polished ⌀ 8 mm" },
    { num: "02", label: "Emitter pair", desc: "600 + 850 nm, dichroic split" },
    { num: "03", label: "Detector ring", desc: "8-element, radial layout" },
    { num: "04", label: "Reference path", desc: "ratiometric, LED-drift cancel" },
    { num: "05", label: "Sealed transmitter", desc: "316L SS, IP68, M12 conn." },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-[88rem] px-6 py-16 md:px-10 md:py-24">
      <SectionHead
        kicker="// 02 / mechanical"
        title="Cross-section"
        desc="The optics live inside the vessel. Everything you can touch from outside is electronics; everything inside is sapphire, 316L, and silicone."
      />

      <div
        className="mt-12 grid grid-cols-12 gap-x-8 gap-y-10 border p-6 md:p-10"
        style={{ borderColor: GRID, background: PANEL }}
      >
        <div className="col-span-12 md:col-span-8">
          <svg
            viewBox="0 0 720 280"
            className="w-full"
            style={{ animation: "rg-fade-in 900ms ease-out 200ms both" }}
          >
            <defs>
              <pattern
                id="hatch"
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
                  stroke={MUTED}
                  strokeWidth="0.6"
                  opacity="0.4"
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
              stroke={MUTED}
              strokeWidth="1"
            />
            <rect
              x="160"
              y="100"
              width="380"
              height="80"
              fill="url(#hatch)"
            />

            {/* tip / window */}
            <path
              d="M160,100 L100,120 L100,160 L160,180 Z"
              fill={PANEL}
              stroke={BRAND}
              strokeWidth="1.5"
            />
            <line
              x1="100"
              y1="120"
              x2="100"
              y2="160"
              stroke={HOT}
              strokeWidth="2"
            />

            {/* internal optics path */}
            <line x1="118" y1="130" x2="540" y2="130" stroke={BRAND} strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="118" y1="150" x2="540" y2="150" stroke={BRAND} strokeWidth="0.8" strokeDasharray="3 3" />

            {/* transmitter */}
            <rect x="540" y="80" width="120" height="120" fill="none" stroke={MUTED} strokeWidth="1" />
            <rect x="540" y="80" width="120" height="120" fill="url(#hatch)" />

            {/* M12 connector */}
            <circle cx="700" cy="140" r="14" fill="none" stroke={MUTED} strokeWidth="1" />
            <line x1="660" y1="140" x2="686" y2="140" stroke={MUTED} strokeWidth="1" />

            {/* callout lines + dots */}
            {[
              { x: 100, y: 140, lx: 60, ly: 30 },
              { x: 180, y: 130, lx: 200, ly: 30 },
              { x: 220, y: 150, lx: 280, ly: 240 },
              { x: 480, y: 130, lx: 520, ly: 30 },
              { x: 600, y: 140, lx: 660, ly: 240 },
            ].map((c, i) => (
              <g key={i}>
                <circle cx={c.x} cy={c.y} r="3" fill={BRAND} />
                <line
                  x1={c.x}
                  y1={c.y}
                  x2={c.lx}
                  y2={c.ly}
                  stroke={MUTED}
                  strokeWidth="0.6"
                />
                <text
                  x={c.lx}
                  y={c.ly - 6}
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                  fill={TEXT}
                  textAnchor={c.lx > 360 ? "start" : "end"}
                >
                  0{i + 1}
                </text>
              </g>
            ))}

            {/* dimension marks */}
            <line x1="100" y1="220" x2="660" y2="220" stroke={MUTED} strokeWidth="0.6" />
            <line x1="100" y1="216" x2="100" y2="224" stroke={MUTED} strokeWidth="0.6" />
            <line x1="660" y1="216" x2="660" y2="224" stroke={MUTED} strokeWidth="0.6" />
            <text
              x="380"
              y="240"
              fontSize="10"
              fontFamily="IBM Plex Mono, monospace"
              fill={MUTED}
              textAnchor="middle"
              letterSpacing="2"
            >
              318 MM
            </text>
          </svg>
        </div>

        <ol className="col-span-12 space-y-4 md:col-span-4">
          {callouts.map((c) => (
            <li
              key={c.num}
              className="flex gap-4 border-l py-2 pl-4"
              style={{ borderColor: GRID, fontFamily: "var(--font-mono)" }}
            >
              <span style={{ color: BRAND }}>{c.num}</span>
              <div>
                <p className="text-[0.95rem]" style={{ color: TEXT }}>
                  {c.label}
                </p>
                <p className="mt-1 text-[0.8rem]" style={{ color: MUTED }}>
                  {c.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DataPanel() {
  return (
    <section className="relative z-10 mx-auto max-w-[88rem] px-6 py-16 md:px-10 md:py-24">
      <SectionHead
        kicker="// 03 / data"
        title="Fermentation, 48 hours"
        desc="A representative E. coli K-12 run logged at 50 Hz, downsampled to 1 Hz for the chart. The 850 nm channel is used only to subtract bubble scatter — it does not contribute to reported OD."
      />

      <div
        className="mt-12 border p-6 md:p-10"
        style={{ borderColor: GRID, background: PANEL }}
      >
        <FermentationChart />

        <div
          className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Stat n="μmax" v="0.41 h⁻¹" hint="exp. phase" />
          <Stat n="ΔOD" v="187.4" hint="0 → 48 h" />
          <Stat n="σ vs offline" v="< 1.2%" hint="n = 36" />
          <Stat n="drift / 24 h" v="< 0.01 OD" hint="ratiometric" />
        </div>
      </div>
    </section>
  );
}

function FermentationChart() {
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
        <linearGradient id="rg-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BRAND} stopOpacity="0.25" />
          <stop offset="100%" stopColor={BRAND} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* horizontal gridlines */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1="0"
          x2={w}
          y1={h * g}
          y2={h * g}
          stroke={GRID}
          strokeWidth="1"
        />
      ))}

      {/* vertical hour ticks */}
      {[0, 12, 24, 36, 48].map((hour) => {
        const x = (hour / 48) * w;
        return (
          <g key={hour}>
            <line
              x1={x}
              x2={x}
              y1={h - 10}
              y2={h}
              stroke={MUTED}
              strokeWidth="1"
            />
            <text
              x={x}
              y={h - 14}
              fontSize="12"
              fontFamily="IBM Plex Mono, monospace"
              fill={MUTED}
              textAnchor={hour === 0 ? "start" : hour === 48 ? "end" : "middle"}
            >
              {hour}h
            </text>
          </g>
        );
      })}

      {/* y axis labels */}
      {[
        { y: h * 0.95, v: "0.1" },
        { y: h * 0.65, v: "1" },
        { y: h * 0.35, v: "10" },
        { y: h * 0.08, v: "100" },
      ].map((t) => (
        <text
          key={t.v}
          x="8"
          y={t.y}
          fontSize="11"
          fontFamily="IBM Plex Mono, monospace"
          fill={MUTED}
        >
          OD {t.v}
        </text>
      ))}

      {/* area + line */}
      <path d={areaPath} fill="url(#rg-fill)" style={{ animation: "rg-fade-in 1200ms ease-out 600ms both" }} />
      <path
        d={linePath}
        fill="none"
        stroke={BRAND}
        strokeWidth="2"
        style={{
          strokeDasharray: 1400,
          animation: "rg-draw 2200ms ease-out 200ms both",
        }}
      />

      {/* annotation */}
      <line
        x1={(20 / 48) * w}
        x2={(20 / 48) * w}
        y1="40"
        y2={h * 0.4}
        stroke={WARN}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <text
        x={(20 / 48) * w + 8}
        y="56"
        fontSize="11"
        fontFamily="IBM Plex Mono, monospace"
        fill={WARN}
      >
        induction · IPTG
      </text>
    </svg>
  );
}

function Stat({ n, v, hint }: { n: string; v: string; hint: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: MUTED }}>
        {n}
      </p>
      <p className="mt-1 text-[1.4rem]" style={{ color: TEXT }}>
        {v}
      </p>
      <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: BRAND }}>
        {hint}
      </p>
    </div>
  );
}

function Specs() {
  const cols: [string, [string, string][]][] = [
    [
      "Optical",
      [
        ["Wavelengths", "600 nm · 850 nm"],
        ["Range", "0.001 – 200 OD"],
        ["Accuracy", "± 0.5% reading"],
        ["Resolution", "0.001 OD"],
        ["Path length", "5 mm (effective)"],
      ],
    ],
    [
      "Mechanical",
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
    <section className="relative z-10 mx-auto max-w-[88rem] px-6 py-16 md:px-10 md:py-24">
      <SectionHead
        kicker="// 04 / specifications"
        title="Spec sheet"
        desc="Reproduced verbatim from the ODX-1 datasheet. Full datasheet available on request."
      />

      <div
        className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {cols.map(([title, rows]) => (
          <div key={title}>
            <h3
              className="border-b pb-3 text-[11px] tracking-[0.22em] uppercase"
              style={{ borderColor: GRID, color: BRAND }}
            >
              {title}
            </h3>
            <dl className="mt-4 space-y-3">
              {rows.map(([k, v]) => (
                <div key={k}>
                  <dt
                    className="text-[10px] tracking-[0.16em] uppercase"
                    style={{ color: MUTED }}
                  >
                    {k}
                  </dt>
                  <dd className="mt-0.5 text-[0.95rem]" style={{ color: TEXT }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pinout() {
  const pins: [number, string, string][] = [
    [1, "24V", "Supply, isolated"],
    [2, "GND", "Power return"],
    [3, "I+ ", "4–20 mA loop, sourcing"],
    [4, "I−", "4–20 mA loop, sinking"],
    [5, "A/D+", "RS-485, Modbus RTU"],
    [6, "A/D−", "RS-485, Modbus RTU"],
    [7, "ETH", "100BASE-T1, MQTT"],
    [8, "PE", "Protective earth"],
  ];

  return (
    <section className="relative z-10 mx-auto max-w-[88rem] px-6 py-16 md:px-10 md:py-24">
      <div className="grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 md:col-span-5">
          <SectionHead
            kicker="// 05 / interface"
            title="M12 × 8 pinout"
            desc="A-coded. Cable lengths to 100 m without repeater. PoE-capable variant ships Q3."
            compact
          />

          <div
            className="mt-10 flex items-center justify-center"
            style={{ animation: "rg-fade-in 900ms ease-out 200ms both" }}
          >
            <svg viewBox="-100 -100 200 200" className="w-64 h-64">
              <circle r="90" fill="none" stroke={GRID} strokeWidth="1" />
              <circle r="60" fill={PANEL} stroke={BRAND} strokeWidth="1.5" />
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                const cx = Math.cos(angle) * 40;
                const cy = Math.sin(angle) * 40;
                const lx = Math.cos(angle) * 78;
                const ly = Math.sin(angle) * 78;
                return (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="7" fill={BG} stroke={BRAND} />
                    <text
                      x={lx}
                      y={ly + 4}
                      fontSize="11"
                      fontFamily="IBM Plex Mono, monospace"
                      fill={TEXT}
                      textAnchor="middle"
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}
              <circle r="3" fill={BRAND} />
            </svg>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7">
          <table
            className="w-full"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <thead>
              <tr
                className="text-[10px] tracking-[0.22em] uppercase"
                style={{ color: MUTED }}
              >
                <th className="border-b py-3 text-left font-normal" style={{ borderColor: GRID }}>
                  pin
                </th>
                <th className="border-b py-3 text-left font-normal" style={{ borderColor: GRID }}>
                  signal
                </th>
                <th className="border-b py-3 text-left font-normal" style={{ borderColor: GRID }}>
                  function
                </th>
              </tr>
            </thead>
            <tbody>
              {pins.map(([n, s, f]) => (
                <tr key={n}>
                  <td
                    className="border-b py-3 text-[0.95rem]"
                    style={{ borderColor: GRID, color: BRAND }}
                  >
                    0{n}
                  </td>
                  <td
                    className="border-b py-3 text-[0.95rem]"
                    style={{ borderColor: GRID, color: TEXT }}
                  >
                    {s}
                  </td>
                  <td
                    className="border-b py-3 text-[0.95rem]"
                    style={{ borderColor: GRID, color: MUTED }}
                  >
                    {f}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Deployments() {
  const orgs = [
    "Top-10 Biologics Manufacturer · 2000 L production",
    "Federal R&D Laboratory · vaccine pilot",
    "European CDMO · perfusion CHO platform",
    "Academic Bioengineering Group · continuous fermentation",
    "Industrial Yeast Producer · 50 m³ scale",
    "Cell Therapy Startup · single-use clamps",
  ];

  return (
    <section className="relative z-10 mx-auto max-w-[88rem] px-6 py-16 md:px-10 md:py-24">
      <SectionHead
        kicker="// 06 / field"
        title="Where ODX-1 is running"
        desc="Identities withheld at customer request."
      />
      <ul
        className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {orgs.map((o, i) => (
          <li
            key={o}
            className="flex items-center gap-4 border-b py-4 text-[0.95rem]"
            style={{ borderColor: GRID, color: TEXT }}
          >
            <span style={{ color: BRAND }}>{String(i + 1).padStart(2, "0")}</span>
            <span className="opacity-90">{o}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative z-10 mx-auto max-w-[88rem] px-6 py-20 md:px-10 md:py-32">
      <div
        className="border p-8 md:p-16"
        style={{
          borderColor: BRAND,
          background:
            `radial-gradient(circle at 20% 0%, rgba(61,164,120,0.18) 0%, transparent 60%), ${PANEL}`,
        }}
      >
        <p
          className="text-[11px] tracking-[0.32em] uppercase"
          style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
        >
          // request
        </p>
        <h2
          className="mt-4 max-w-3xl leading-[0.98] tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "clamp(2rem, 5vw, 3.6rem)",
          }}
        >
          Put a probe in your next run.
        </h2>
        <p
          className="mt-5 max-w-xl text-[1.05rem] opacity-80"
          style={{ color: TEXT }}
        >
          We ship a calibrated unit, install it with you, and run it alongside
          your current method for four weeks. You keep the data.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            href="/v2/whitelist"
            className="inline-flex items-center gap-3 px-6 py-3 text-[11px] tracking-[0.22em] uppercase transition-colors"
            style={{
              fontFamily: "var(--font-mono)",
              background: BRAND,
              color: BG,
            }}
          >
            Request unit
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-3 px-6 py-3 text-[11px] tracking-[0.22em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              border: `1px solid ${GRID}`,
              color: TEXT,
            }}
          >
            Download datasheet (PDF)
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  kicker,
  title,
  desc,
  compact,
}: {
  kicker: string;
  title: string;
  desc?: string;
  compact?: boolean;
}) {
  return (
    <div>
      <p
        className="text-[10.5px] tracking-[0.32em] uppercase"
        style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
      >
        {kicker}
      </p>
      <h2
        className={`mt-4 leading-[1.05] tracking-[-0.01em] ${
          compact ? "max-w-md" : "max-w-3xl"
        }`}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontSize: compact ? "clamp(1.6rem, 3vw, 2.2rem)" : "clamp(2rem, 4vw, 2.8rem)",
        }}
      >
        {title}
      </h2>
      {desc && (
        <p
          className="mt-5 max-w-2xl text-[1rem] leading-[1.55]"
          style={{ color: "rgba(212,221,224,0.7)" }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="relative z-10 mx-auto flex max-w-[88rem] flex-col gap-3 border-t px-6 pb-10 pt-8 text-[10.5px] tracking-[0.22em] uppercase md:flex-row md:items-center md:justify-between md:px-10"
      style={{ borderColor: GRID, color: MUTED, fontFamily: "var(--font-mono)" }}
    >
      <span>© 2026 Reacgen Biosystems · ODX-1</span>
      <span>probe@reacgen.bio · +1 (415) 555-0190</span>
      <Link href="/" className="hover:opacity-100">
        ← variants
      </Link>
    </footer>
  );
}
