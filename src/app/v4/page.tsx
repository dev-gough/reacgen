"use client";

import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Tenor_Sans } from "next/font/google";
import { TrackedLink } from "@/components/TrackedLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useV4Palette } from "@/lib/theme";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

export default function V4Page() {
  const p = useV4Palette();
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen`}
      style={{
        background: p.bg,
        color: p.ink,
        fontFamily: "var(--font-display)",
      }}
    >
      <Nav />
      <Hero />
      <Product />
      <Behavior />
      <Specifications />
      <BuiltWith />
      <CallToAction />
      <Foot />
    </div>
  );
}

function Nav() {
  const p = useV4Palette();
  return (
    <nav
      className="mx-auto flex max-w-[72rem] items-center justify-between px-6 py-8 md:px-12 md:py-10"
      style={{ animation: "rg-fade-in 900ms ease-out both" }}
    >
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
          style={{ fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "0.02em" }}
        >
          Reacgen
        </span>
      </Link>

      <div
        className="flex items-center gap-8 text-[11px]"
        style={
          {
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: p.inkSoft,
            "--v4-hover-fg": p.ink,
          } as React.CSSProperties
        }
      >
        <Link
          href="#instrument"
          className="hover:text-[var(--v4-hover-fg)] transition-colors"
        >
          Instrument
        </Link>
        <TrackedLink
          href="http://forum.reacgen.local/"
          ctaId="forum-v4-nav"
          location="nav"
          className="hover:text-[var(--v4-hover-fg)] transition-colors"
        >
          Letters
        </TrackedLink>
        <Link
          href="#contact"
          className="hover:text-[var(--v4-hover-fg)] transition-colors"
        >
          Contact
        </Link>
        <Link
          href="/v4/account"
          className="hover:text-[var(--v4-hover-fg)] transition-colors"
        >
          Account
        </Link>
        <ThemeToggle
          className="inline-flex items-center transition-colors hover:text-[var(--v4-hover-fg)]"
          size={12}
        />
      </div>
    </nav>
  );
}

function Hero() {
  const p = useV4Palette();
  return (
    <section className="mx-auto max-w-[72rem] px-6 pt-24 pb-32 md:px-12 md:pt-40 md:pb-48">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 md:col-span-1">
          <Marginalia label="2026" />
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-2">
          <h1
            className="leading-[0.96] tracking-[-0.015em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(3.4rem, 9.5vw, 8rem)",
              animation: "rg-fade-up 1200ms ease-out 120ms both",
            }}
          >
            We make
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>one</em>{" "}
            instrument.
          </h1>

          <p
            className="mt-10 max-w-2xl text-[1.45rem] leading-[1.45] md:text-[1.7rem] md:leading-[1.4]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: p.inkSoft,
              animation: "rg-fade-up 1200ms ease-out 340ms both",
            }}
          >
            It reads cell density inside your bioreactor —{" "}
            <em style={{ fontStyle: "italic", color: p.ink }}>
              fifty times a second, three hundred steam cycles long.
            </em>
          </p>

          <div
            className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4"
            style={{ animation: "rg-fade-up 1200ms ease-out 540ms both" }}
          >
            <TrackedLink
              href="/v3/whitelist"
              ctaId="hero-evaluation-v4"
              location="hero"
              className="group inline-flex items-baseline gap-3 border-b pb-1 text-[1.15rem] transition-colors"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                color: p.ink,
                borderColor: p.ink,
              }}
            >
              Request an evaluation
              <span
                className="transition-transform group-hover:translate-x-1"
                style={{ fontStyle: "italic" }}
              >
                →
              </span>
            </TrackedLink>
            <Link
              href="#instrument"
              className="text-[14px]"
              style={{
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: p.inkSoft,
              }}
            >
              About the instrument
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Product() {
  const p = useV4Palette();
  return (
    <section
      id="instrument"
      className="mx-auto max-w-[72rem] border-t px-6 py-24 md:px-12 md:py-32"
      style={{ borderColor: p.hair }}
    >
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 md:col-span-1">
          <Marginalia label="i." />
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-2">
          <h2
            className="leading-[1.05] tracking-[-0.01em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)",
            }}
          >
            The Reacgen <em style={{ fontStyle: "italic" }}>ODX-1.</em>
          </h2>

          <p
            className="mt-8 text-[1.15rem] leading-[1.6]"
            style={{ color: p.inkSoft }}
          >
            A single dual-wavelength probe. Sapphire window, 316L body. It
            mounts into the Ingold port on your reactor and stays there —
            through steam, through perfusion, through the night.
          </p>

          <p
            className="mt-4 text-[1.15rem] leading-[1.6]"
            style={{ color: p.inkSoft }}
          >
            We have made the same instrument for four years.{" "}
            <em style={{ fontStyle: "italic", color: p.ink }}>
              It is the only thing we sell.
            </em>
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8">
          <div
            className="relative aspect-square overflow-hidden"
            style={{ background: p.light, animation: "rg-fade-in 1400ms ease-out 200ms both" }}
          >
            <Image
              src="/logo-mark.png"
              alt="Reacgen ODX-1"
              fill
              className="object-contain p-16 md:p-24"
              priority
            />
          </div>
          <p
            className="mt-4 text-[12px]"
            style={{
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: p.inkSoft,
            }}
          >
            ODX-1 · front
          </p>
        </div>
      </div>
    </section>
  );
}

function Behavior() {
  const p = useV4Palette();
  const points: { kicker: string; body: string }[] = [
    {
      kicker: "It measures",
      body: "Two wavelengths at fifty hertz. The second channel subtracts bubble scatter, so the reading does not flinch during aeration.",
    },
    {
      kicker: "It endures",
      body: "Three hundred SIP cycles at 134°C. Calibration lives in the probe head, not the transmitter — drift does not creep in.",
    },
    {
      kicker: "It listens",
      body: "Modbus, MQTT, and a four-to-twenty milliamp loop, all at once. Your DCS and your historian read the same value.",
    },
  ];

  return (
    <section
      className="mx-auto max-w-[72rem] border-t px-6 py-24 md:px-12 md:py-32"
      style={{ borderColor: p.hair }}
    >
      <div className="grid grid-cols-12 gap-x-8 gap-y-16">
        <div className="col-span-12 md:col-span-1">
          <Marginalia label="ii." />
        </div>

        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <h2
            className="mb-16 leading-[1.05] tracking-[-0.01em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)",
            }}
          >
            What it <em style={{ fontStyle: "italic" }}>does.</em>
          </h2>

          <ol className="grid grid-cols-1 gap-y-14 md:grid-cols-3 md:gap-x-12 md:gap-y-0">
            {points.map((pt, i) => (
              <li key={pt.kicker}>
                <span
                  className="text-[11px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: p.inkSoft,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="mt-3 text-[1.4rem] leading-[1.15]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                  }}
                >
                  {pt.kicker}
                </p>
                <p
                  className="mt-4 text-[1.05rem] leading-[1.6]"
                  style={{ color: p.inkSoft }}
                >
                  {pt.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Specifications() {
  const p = useV4Palette();
  const rows: [string, string][] = [
    ["Range", "0.001 – 200 OD"],
    ["Accuracy", "± 0.5% of reading"],
    ["Wavelengths", "600 / 850 nm"],
    ["Response", "Under 50 ms"],
    ["Sterilization", "SIP 134 °C · ≥ 300 cycles"],
    ["Mount", "12 mm or 25 mm Ingold"],
    ["Interfaces", "Modbus · MQTT · 4–20 mA"],
  ];

  return (
    <section
      className="mx-auto max-w-[72rem] border-t px-6 py-24 md:px-12 md:py-32"
      style={{ borderColor: p.hair }}
    >
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 md:col-span-1">
          <Marginalia label="iii." />
        </div>

        <div className="col-span-12 md:col-span-3 md:col-start-2">
          <h2
            className="leading-[1.05] tracking-[-0.01em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)",
            }}
          >
            In <em style={{ fontStyle: "italic" }}>numbers.</em>
          </h2>
        </div>

        <dl className="col-span-12 md:col-span-7 md:col-start-6">
          {rows.map(([k, v], i) => (
            <div
              key={k}
              className="grid grid-cols-2 items-baseline gap-x-6 py-5"
              style={{
                borderTop: i === 0 ? `1px solid ${p.hair}` : "none",
                borderBottom: `1px solid ${p.hair}`,
              }}
            >
              <dt
                className="text-[11px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: p.inkSoft,
                }}
              >
                {k}
              </dt>
              <dd
                className="text-right text-[1.05rem]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                }}
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function BuiltWith() {
  const p = useV4Palette();
  const partners = [
    "Stanford Bioengineering",
    "ETH Zürich",
    "Broad Institute",
    "MPI Magdeburg",
    "NIST",
    "EMBL Heidelberg",
  ];

  return (
    <section
      className="mx-auto max-w-[72rem] border-t px-6 py-24 md:px-12 md:py-32"
      style={{ borderColor: p.hair }}
    >
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 md:col-span-1">
          <Marginalia label="iv." />
        </div>

        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <h2
            className="leading-[1.05] tracking-[-0.01em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)",
            }}
          >
            Built <em style={{ fontStyle: "italic" }}>with.</em>
          </h2>

          <ul
            className="mt-12 grid grid-cols-2 gap-y-5 md:grid-cols-3 md:gap-y-7"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            {partners.map((name) => (
              <li
                key={name}
                className="text-[1.15rem]"
                style={{ color: p.ink }}
              >
                {name}
              </li>
            ))}
          </ul>

          <p
            className="mt-16 max-w-2xl text-[1rem] italic leading-[1.6]"
            style={{
              fontFamily: "var(--font-display)",
              color: p.inkSoft,
              fontStyle: "italic",
            }}
          >
            Co-development partners, validation labs, and the unhurried
            colleagues who told us, more than once, when we had a thing wrong.
          </p>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  const p = useV4Palette();
  return (
    <section
      id="contact"
      className="mx-auto max-w-[72rem] border-t px-6 py-32 md:px-12 md:py-48"
      style={{ borderColor: p.hair }}
    >
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-12 md:col-span-1">
          <Marginalia label="v." />
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-2">
          <h2
            className="leading-[0.98] tracking-[-0.015em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
            }}
          >
            Reserve <em style={{ fontStyle: "italic", fontWeight: 300 }}>a probe.</em>
          </h2>

          <p
            className="mt-8 max-w-xl text-[1.2rem] leading-[1.55]"
            style={{ color: p.inkSoft }}
          >
            We send one calibrated unit and a process engineer for the
            installation. Four weeks, alongside whatever you use today. You
            keep the data; the purchase order comes only if the numbers tell
            you so.
          </p>

          <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
            <Link
              href="/v3/whitelist"
              className="group inline-flex items-baseline gap-3 border-b pb-1 text-[1.1rem] transition-colors"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                color: p.ink,
                borderColor: p.ink,
              }}
            >
              Request an evaluation
              <span
                className="transition-transform group-hover:translate-x-1"
                style={{ fontStyle: "italic" }}
              >
                →
              </span>
            </Link>

            <Link
              href="mailto:probe@reacgen.bio"
              className="text-[14px]"
              style={{
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: p.inkSoft,
              }}
            >
              probe@reacgen.bio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marginalia({ label }: { label: string }) {
  const p = useV4Palette();
  return (
    <span
      className="block text-[11px]"
      style={{
        fontFamily: "var(--font-sans)",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: p.inkSoft,
      }}
    >
      {label}
    </span>
  );
}

function Foot() {
  const p = useV4Palette();
  return (
    <footer
      className="border-t"
      style={{ borderColor: p.hair }}
    >
      <div className="mx-auto flex max-w-[72rem] flex-col gap-4 px-6 py-12 md:flex-row md:items-baseline md:justify-between md:px-12">
        <div className="flex items-baseline gap-3">
          <Image src="/logo-mark.png" alt="Reacgen" width={20} height={20} className="translate-y-1" />
          <span
            className="text-[14px]"
            style={{
              fontFamily: "var(--font-display)",
              color: p.inkSoft,
            }}
          >
            Reacgen Biosystems · 2026
          </span>
        </div>

        <div
          className="flex items-baseline gap-8 text-[11px]"
          style={
            {
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: p.inkSoft,
              "--v4-hover-fg": p.ink,
            } as React.CSSProperties
          }
        >
          <TrackedLink
            href="http://forum.reacgen.local/"
            ctaId="forum-v4-footer"
            location="footer"
            className="hover:text-[var(--v4-hover-fg)] transition-colors"
          >
            Forum
          </TrackedLink>
          <Link
            href="/"
            className="hover:text-[var(--v4-hover-fg)] transition-colors"
          >
            ← Variants
          </Link>
        </div>
      </div>
    </footer>
  );
}
