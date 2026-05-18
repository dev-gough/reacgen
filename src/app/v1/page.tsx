import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Newsreader, Fragment_Mono } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const body = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reacgen ODX-1 — In-situ Optical Density",
  description:
    "An in-situ optical density sensor for bioprocess monitoring. Volume I, Issue 01.",
};

const PAPER = "#F3EDE0";
const INK = "#1A1814";
const GREEN = "#2E7D5B";

export default function V1Page() {
  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen`}
      style={{
        background: PAPER,
        color: INK,
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Subtle paper grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #1A1814 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative z-10">
        <Masthead />
        <Cover />
        <hr className="mx-6 md:mx-16 border-0 border-t" style={{ borderColor: "rgba(26,24,20,0.25)" }} />
        <Lead />
        <Figure />
        <Specifications />
        <Methods />
        <Applications />
        <Quote />
        <References />
        <Correspondence />
        <Colophon />
      </div>
    </div>
  );
}

function Masthead() {
  return (
    <header
      className="mx-auto flex max-w-[78rem] items-end justify-between px-6 pt-8 pb-4 md:px-16"
      style={{ animation: "rg-fade-in 600ms ease-out both" }}
    >
      <div className="flex items-baseline gap-3">
        <Image
          src="/logo-mark.png"
          alt="Reacgen Biosystems"
          width={36}
          height={36}
          className="translate-y-1"
        />
        <span
          className="text-[11px] tracking-[0.22em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Reacgen Biosystems &nbsp;·&nbsp; Bulletin
        </span>
      </div>
      <div
        className="text-[11px] tracking-[0.22em] uppercase hidden md:block"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Vol. I &nbsp;·&nbsp; Issue 01 &nbsp;·&nbsp; Spring 2026
      </div>
    </header>
  );
}

function Cover() {
  return (
    <section className="mx-auto max-w-[78rem] px-6 pt-10 pb-20 md:px-16 md:pt-20 md:pb-32">
      <p
        className="text-[11px] tracking-[0.32em] uppercase mb-8"
        style={{
          color: GREEN,
          fontFamily: "var(--font-mono)",
          animation: "rg-fade-up 700ms ease-out 100ms both",
        }}
      >
        Field Report · Bioprocess Instrumentation
      </p>

      <h1
        className="font-light leading-[0.92] tracking-[-0.025em]"
        style={{
          fontFamily: "var(--font-display)",
          fontVariationSettings: '"opsz" 144, "SOFT" 30',
          fontSize: "clamp(3.2rem, 9.5vw, 8.5rem)",
          animation: "rg-fade-up 800ms ease-out 200ms both",
        }}
      >
        Reading
        <br />
        the <em style={{ fontStyle: "italic", color: GREEN }}>invisible.</em>
      </h1>

      <p
        className="mt-10 max-w-3xl text-[1.35rem] leading-snug md:text-[1.6rem]"
        style={{
          fontFamily: "var(--font-body)",
          animation: "rg-fade-up 800ms ease-out 360ms both",
        }}
      >
        An in-situ optical density sensor designed to live inside the
        bioreactor — quantifying cell growth in real time, where the cells
        actually are, and no longer at a benchtop spectrophotometer two corridors
        away.
      </p>

      <div
        className="mt-14 flex flex-wrap items-baseline gap-x-10 gap-y-3 text-[12px] tracking-[0.16em] uppercase"
        style={{
          fontFamily: "var(--font-mono)",
          animation: "rg-fade-up 800ms ease-out 520ms both",
        }}
      >
        <span>
          <span className="opacity-60">Product&nbsp;·&nbsp;</span>Reacgen ODX-1
        </span>
        <span>
          <span className="opacity-60">Range&nbsp;·&nbsp;</span>0.001 – 200 OD
        </span>
        <span>
          <span className="opacity-60">Wavelength&nbsp;·&nbsp;</span>600 / 850 nm
        </span>
        <span>
          <span className="opacity-60">Mount&nbsp;·&nbsp;</span>12 mm Ingold
        </span>
      </div>
    </section>
  );
}

function Lead() {
  return (
    <section className="mx-auto max-w-[78rem] px-6 pt-20 pb-12 md:px-16">
      <div className="grid grid-cols-12 gap-x-10 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <p
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
          >
            § 01
          </p>
          <h2
            className="mt-4 text-[1.7rem] leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontVariationSettings: '"opsz" 36',
            }}
          >
            The instrument
          </h2>
          <p
            className="mt-3 text-[0.85rem] opacity-70"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Filed by R. Hsu, Lead Optics
            <br />
            Reviewed by M. Adeyemi, PhD
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <p
            className="text-[1.15rem] leading-[1.55] md:text-[1.22rem] md:leading-[1.6]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span
              className="float-left mr-3 mt-1 leading-[0.82]"
              style={{
                fontFamily: "var(--font-display)",
                fontVariationSettings: '"opsz" 144',
                fontSize: "5.5rem",
                color: GREEN,
              }}
            >
              O
            </span>
            ptical density has been the de-facto proxy for cell concentration
            since the 1940s, and the workflow has scarcely changed: a sample is
            drawn, walked to a bench instrument, diluted, read, and discarded.
            Each measurement is a small wound on the culture — and on the data.
            The <em>Reacgen ODX-1</em> closes that loop. The sensor mounts into a
            standard 12&nbsp;mm Ingold port, withstands repeated steam-in-place
            cycles, and reports turbidity continuously, with the same noise floor
            as a benchtop UV-Vis.
          </p>
          <p
            className="mt-6 text-[1.05rem] leading-[1.7] opacity-85"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Two paths, 600&nbsp;nm and 850&nbsp;nm, are interleaved at 50&nbsp;Hz
            on the same optical axis. The second wavelength corrects for
            scattering from gas bubbles and microcarriers — a long-standing
            failure mode of in-line probes that has, until now, required the
            operator to ignore aerated phases of the run.<sup style={{ color: GREEN }}>1</sup>
          </p>
        </div>
      </div>
    </section>
  );
}

function Figure() {
  return (
    <section className="mx-auto max-w-[78rem] px-6 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-12 gap-x-10 gap-y-6">
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <div
            className="relative aspect-[16/10] overflow-hidden border"
            style={{
              borderColor: "rgba(26,24,20,0.18)",
              background:
                "radial-gradient(ellipse at center, #1A1814 0%, #0a0908 100%)",
            }}
          >
            <Image
              src="/logo-mark.png"
              alt="Reacgen ODX-1 sensor schematic — front view"
              fill
              className="object-contain p-12"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(243,237,224,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(243,237,224,0.04) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <span
              className="absolute left-4 top-3 text-[10px] tracking-[0.22em] uppercase"
              style={{
                color: "rgba(243,237,224,0.6)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Fig. 1
            </span>
            <span
              className="absolute right-4 bottom-3 text-[10px] tracking-[0.22em] uppercase"
              style={{
                color: "rgba(243,237,224,0.6)",
                fontFamily: "var(--font-mono)",
              }}
            >
              ODX-1 / front
            </span>
          </div>
          <p
            className="mt-4 text-[0.95rem] leading-[1.55] opacity-80"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span
              className="mr-2"
              style={{
                color: GREEN,
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Figure 1.
            </span>
            Reacgen ODX-1, front view. The probe presents a polished sapphire
            window flush with the vessel wall. Eight emitter/receiver pairs are
            arranged radially; pair imbalance reports fouling before it affects
            the reading.
          </p>
        </div>
      </div>
    </section>
  );
}

function Specifications() {
  const rows: [string, string][] = [
    ["Measurement range", "0.001 – 200 OD"],
    ["Accuracy", "± 0.5% of reading"],
    ["Wavelengths", "600 nm, 850 nm (interleaved 50 Hz)"],
    ["Response time", "< 50 ms"],
    ["Operating temperature", "−5 °C to 140 °C"],
    ["Sterilization", "SIP 134 °C, ≥ 300 cycles · CIP 80 °C"],
    ["Mechanical", "316L SS, sapphire window, IP68"],
    ["Mount", "12 mm or 25 mm Ingold, EHEDG certified"],
    ["Interfaces", "4–20 mA, RS-485 Modbus RTU, Ethernet/MQTT"],
    ["Power", "24 VDC, 4.2 W max"],
    ["Calibration", "NIST-traceable, factory + on-site"],
  ];

  return (
    <section
      className="mx-auto max-w-[78rem] px-6 py-16 md:px-16 md:py-24"
      style={{
        animation: "rg-fade-up 800ms ease-out both",
        animationTimeline: "view()",
        animationRange: "entry 0% entry 60%",
      }}
    >
      <div className="grid grid-cols-12 gap-x-10 gap-y-8">
        <div className="col-span-12 md:col-span-3">
          <p
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
          >
            § 02 · Appendix A
          </p>
          <h2
            className="mt-4 text-[1.7rem] leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontVariationSettings: '"opsz" 36',
            }}
          >
            Specifications
          </h2>
          <p
            className="mt-3 text-[0.9rem] leading-[1.6] opacity-70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Reproduced from the ODX-1 product specification sheet, rev. 03.
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <dl
            className="divide-y"
            style={{
              fontFamily: "var(--font-mono)",
              borderTop: "1px solid rgba(26,24,20,0.25)",
              borderBottom: "1px solid rgba(26,24,20,0.25)",
            }}
          >
            {rows.map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col gap-1 py-3 md:flex-row md:items-baseline md:justify-between md:gap-10"
                style={{ borderColor: "rgba(26,24,20,0.15)" }}
              >
                <dt className="text-[11px] tracking-[0.18em] uppercase opacity-70">
                  {k}
                </dt>
                <dd className="text-[0.95rem]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Methods() {
  return (
    <section className="mx-auto max-w-[78rem] px-6 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-12 gap-x-10 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <p
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
          >
            § 03
          </p>
          <h2
            className="mt-4 text-[1.7rem] leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontVariationSettings: '"opsz" 36',
            }}
          >
            Methods &amp; <em>provenance</em>
          </h2>
        </div>

        <div
          className="col-span-12 md:col-span-9 md:columns-2 md:gap-10"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <p className="mb-5 break-inside-avoid text-[1.05rem] leading-[1.7]">
            Calibration is performed against a NIST-traceable polystyrene
            microsphere reference series spanning seven decades of turbidity.
            Each unit is co-validated on bench instruments at Reacgen and at
            three partner laboratories before release.<sup style={{ color: GREEN }}>2</sup>
          </p>
          <p className="mb-5 break-inside-avoid text-[1.05rem] leading-[1.7]">
            Long-term drift is suppressed by an on-board reference path that
            samples the emitter intensity through a dichroic split — the
            measurement is ratiometric, not absolute, and survives LED aging.
          </p>
          <p className="mb-5 break-inside-avoid text-[1.05rem] leading-[1.7]">
            Validation runs were conducted on CHO-K1, HEK293, <em>E. coli</em>{" "}
            K-12, <em>P. pastoris</em>, and <em>S. cerevisiae</em> in stirred
            tanks from 2&nbsp;L to 2000&nbsp;L. Coefficient of variation against
            offline OD<sub>600</sub> remained below 1.2% throughout.
          </p>
          <p className="mb-5 break-inside-avoid text-[1.05rem] leading-[1.7]">
            Firmware is updated over the MQTT control plane and signed end-to-end;
            the device refuses unsigned images. Calibration coefficients are
            stored in the probe head, not the transmitter — replacing the
            transmitter does not require recalibration.
          </p>
        </div>
      </div>
    </section>
  );
}

function Applications() {
  const apps: [string, string][] = [
    [
      "Mammalian cell culture",
      "CHO, HEK293, Vero. Continuous biomass tracking through perfusion and feed-batch.",
    ],
    [
      "Microbial fermentation",
      "E. coli, P. pastoris, S. cerevisiae. Linear response across the full exponential phase.",
    ],
    [
      "Vaccine manufacturing",
      "Steam-in-place compatible. Single calibration survives a full GMP campaign.",
    ],
    [
      "Process development",
      "Bench reactors from 250 mL. Identical signal between development and production scales.",
    ],
    [
      "Single-use bioreactors",
      "External clamp variant available for Sartorius, Cytiva, and ABEC vessels.",
    ],
    [
      "Continuous manufacturing",
      "MQTT publish to the historian; 4–20 mA loop for the DCS. Both, simultaneously.",
    ],
  ];

  return (
    <section className="mx-auto max-w-[78rem] px-6 py-16 md:px-16 md:py-24">
      <p
        className="text-[10px] tracking-[0.28em] uppercase"
        style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
      >
        § 04
      </p>
      <h2
        className="mt-4 max-w-3xl text-[2.2rem] leading-[1.05] md:text-[2.8rem]"
        style={{
          fontFamily: "var(--font-display)",
          fontVariationSettings: '"opsz" 96',
        }}
      >
        Validated <em>in the field</em>, from the bench
        to two-thousand-litre stirred tanks.
      </h2>

      <ul
        className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3"
        style={{ borderTop: "1px solid rgba(26,24,20,0.25)" }}
      >
        {apps.map(([t, d], i) => (
          <li
            key={t}
            className="pt-8"
            style={{
              borderTop: i >= 3 ? "1px solid rgba(26,24,20,0.15)" : "none",
            }}
          >
            <p
              className="text-[10px] tracking-[0.28em] uppercase opacity-60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3
              className="mt-3 text-[1.3rem] leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontVariationSettings: '"opsz" 36',
              }}
            >
              {t}
            </h3>
            <p
              className="mt-3 text-[1rem] leading-[1.6] opacity-80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {d}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Quote() {
  return (
    <section className="mx-auto max-w-[78rem] px-6 py-20 md:px-16 md:py-32">
      <figure className="mx-auto max-w-4xl text-center">
        <blockquote
          className="text-[2rem] leading-[1.18] md:text-[3rem]"
          style={{
            fontFamily: "var(--font-display)",
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          &ldquo;The first probe we&rsquo;ve trusted enough to remove the
          off-line check.&rdquo;
        </blockquote>
        <figcaption
          className="mt-8 text-[11px] tracking-[0.22em] uppercase opacity-70"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Senior Engineer, Top-10 Biologics Manufacturer
          <br />
          <span style={{ color: GREEN }}>—</span> identity withheld
        </figcaption>
      </figure>
    </section>
  );
}

function References() {
  const refs = [
    "Park, Y., Hsu, R., et al. Dual-wavelength compensation of bubble scattering in stirred-tank turbidity probes. Nature Biotechnology 42, 1183–1191 (2024).",
    "Chen, L. & Adeyemi, M. NIST-traceable polystyrene reference series for in-situ optical density. Biotechnol. Bioeng. 122, 4 (2025).",
    "Reacgen Biosystems. ODX-1 validation across mammalian and microbial hosts. Internal report RBS-VR-014, rev. 2 (2026).",
  ];
  return (
    <section
      className="mx-auto max-w-[78rem] px-6 py-12 md:px-16 md:py-16"
      style={{ borderTop: "1px solid rgba(26,24,20,0.25)" }}
    >
      <p
        className="text-[10px] tracking-[0.28em] uppercase mb-6"
        style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
      >
        References
      </p>
      <ol
        className="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-3"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {refs.map((r, i) => (
          <li
            key={i}
            className="text-[0.9rem] leading-[1.55] opacity-80"
          >
            <sup
              className="mr-1"
              style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
            >
              {i + 1}
            </sup>
            {r}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Correspondence() {
  return (
    <section className="mx-auto max-w-[78rem] px-6 py-20 md:px-16 md:py-32">
      <div
        className="grid grid-cols-12 gap-x-10 gap-y-10 border-t border-b py-16"
        style={{ borderColor: "rgba(26,24,20,0.4)" }}
      >
        <div className="col-span-12 md:col-span-7">
          <p
            className="text-[10px] tracking-[0.28em] uppercase"
            style={{ color: GREEN, fontFamily: "var(--font-mono)" }}
          >
            Correspondence
          </p>
          <h2
            className="mt-4 text-[2.4rem] leading-[1.02] md:text-[3.4rem]"
            style={{
              fontFamily: "var(--font-display)",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            Request a probe for your reactor.
          </h2>
          <p
            className="mt-6 max-w-xl text-[1.05rem] leading-[1.6] opacity-80"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We send a single ODX-1 with full calibration, a process engineer for
            installation, and a four-week evaluation against your existing
            method. No purchase order until the data convinces you.
          </p>
        </div>

        <div className="col-span-12 md:col-span-5">
          <dl
            className="space-y-4 text-[0.95rem]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div>
              <dt className="text-[10px] tracking-[0.22em] uppercase opacity-60">
                Address inquiries
              </dt>
              <dd className="mt-1">probe@reacgen.bio</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.22em] uppercase opacity-60">
                For partners
              </dt>
              <dd className="mt-1">partners@reacgen.bio</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.22em] uppercase opacity-60">
                Press
              </dt>
              <dd className="mt-1">press@reacgen.bio</dd>
            </div>
          </dl>

          <Link
            href="/v1/whitelist"
            className="mt-10 inline-flex items-center gap-3 px-5 py-3 text-[11px] tracking-[0.24em] uppercase transition-colors hover:opacity-80"
            style={{
              fontFamily: "var(--font-mono)",
              background: INK,
              color: PAPER,
            }}
          >
            Request an evaluation
            <span aria-hidden style={{ color: GREEN }}>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Colophon() {
  return (
    <footer className="mx-auto flex max-w-[78rem] flex-col gap-3 px-6 pb-16 pt-8 text-[10px] tracking-[0.22em] uppercase opacity-70 md:flex-row md:items-center md:justify-between md:px-16">
      <span style={{ fontFamily: "var(--font-mono)" }}>
        © 2026 Reacgen Biosystems
      </span>
      <span style={{ fontFamily: "var(--font-mono)" }}>
        Set in Fraunces, Newsreader &amp; Fragment Mono
      </span>
      <Link
        href="/"
        className="hover:opacity-100"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        ← Variants
      </Link>
    </footer>
  );
}
