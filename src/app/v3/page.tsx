import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Instrument_Serif, DM_Mono } from "next/font/google";
import { ArrowUpRight, Beaker, CircuitBoard, Microscope, MessagesSquare, ShieldCheck, Waves } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reacgen — Continuous optical density for bioprocess",
  description:
    "An in-situ optical density sensor designed for continuous bioprocess monitoring. Validated across CHO, HEK, E. coli, and yeast.",
};

const BG = "#FAFAF6";
const INK = "#0F1311";
const HAIR = "#E5E5DC";
const SOFT = "#67726B";
const BRAND = "#2F8F66";

export default function V3Page() {
  return (
    <div
      className={`${sans.variable} ${serif.variable} ${mono.variable} min-h-screen`}
      style={{
        background: BG,
        color: INK,
        fontFamily: "var(--font-sans)",
      }}
    >
      <Nav />
      <Hero />
      <Metrics />
      <Showcase />
      <HowItWorks />
      <DesignedFor />
      <Research />
      <Partners />
      <CTA />
      <Foot />
    </div>
  );
}

function Nav() {
  return (
    <nav
      className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-6 md:px-10"
      style={{ animation: "rg-fade-in 600ms ease-out both" }}
    >
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo-mark.png" alt="Reacgen Biosystems" width={28} height={28} />
        <span className="text-[1rem] tracking-tight" style={{ fontWeight: 500 }}>
          Reacgen
        </span>
      </Link>

      <div
        className="hidden items-center gap-8 text-[14px] md:flex"
        style={{ color: SOFT }}
      >
        <Link href="#product" className="hover:text-[#0F1311] transition-colors">
          Product
        </Link>
        <Link href="#science" className="hover:text-[#0F1311] transition-colors">
          Science
        </Link>
        <Link href="#research" className="hover:text-[#0F1311] transition-colors">
          Research
        </Link>
        <TrackedLink
          href="http://forum.reacgen.local/"
          ctaId="forum-v3-nav"
          location="nav"
          className="inline-flex items-center gap-1.5 hover:text-[#0F1311] transition-colors"
        >
          Community
          <MessagesSquare size={14} strokeWidth={1.5} />
        </TrackedLink>
        <Link href="#contact" className="hover:text-[#0F1311] transition-colors">
          Contact
        </Link>
      </div>

      <Link
        href="#contact"
        className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] transition-colors"
        style={{
          background: INK,
          color: BG,
        }}
      >
        Request a demo
        <ArrowUpRight size={14} />
      </Link>
    </nav>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-[80rem] px-6 pt-12 pb-24 md:px-10 md:pt-20 md:pb-32">
      <p
        className="mb-10 flex items-center gap-3 text-[12px] tracking-wide"
        style={{
          color: SOFT,
          animation: "rg-fade-up 700ms ease-out 80ms both",
        }}
      >
        <span
          className="inline-block size-1.5 rounded-full"
          style={{ background: BRAND }}
        />
        Now shipping · Reacgen ODX-1
      </p>

      <h1
        className="max-w-5xl leading-[0.98] tracking-[-0.025em]"
        style={{
          fontSize: "clamp(2.6rem, 7.5vw, 6.2rem)",
          fontWeight: 500,
          animation: "rg-fade-up 800ms ease-out 200ms both",
        }}
      >
        Continuous optical density
        <br />
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 400,
            color: BRAND,
          }}
        >
          for every bioreactor
        </span>{" "}
        you operate.
      </h1>

      <p
        className="mt-10 max-w-2xl text-[1.2rem] leading-[1.55]"
        style={{
          color: SOFT,
          animation: "rg-fade-up 800ms ease-out 360ms both",
        }}
      >
        An in-situ probe that measures cell density at 50 Hz, survives every
        SIP cycle, and reports the same value the offline spectrophotometer
        would have — without ever pulling a sample.
      </p>

      <div
        className="mt-12 flex flex-wrap items-center gap-5"
        style={{ animation: "rg-fade-up 800ms ease-out 520ms both" }}
      >
        <Link
          href="/v3/whitelist"
          className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[15px] transition-transform hover:translate-y-[-1px]"
          style={{
            background: INK,
            color: BG,
          }}
        >
          Request a four-week evaluation
          <ArrowUpRight size={16} />
        </Link>
        <Link
          href="#science"
          className="inline-flex items-center gap-2 text-[15px]"
          style={{ color: INK }}
        >
          See the validation data
          <span style={{ color: BRAND }}>→</span>
        </Link>
      </div>
    </section>
  );
}

function Metrics() {
  const items: [string, string, string][] = [
    ["0.001 – 200", "OD", "Five decades of dynamic range on a single probe."],
    ["± 0.5%", "of reading", "Bench-instrument accuracy, in-line."],
    ["< 50 ms", "response", "Captures induction transitions in real time."],
    ["≥ 300", "SIP cycles", "Validated thermal endurance, 134 °C."],
  ];

  return (
    <section
      className="border-t border-b"
      style={{ borderColor: HAIR }}
    >
      <div
        className="mx-auto grid max-w-[80rem] grid-cols-1 md:grid-cols-4"
        style={{ animation: "rg-fade-up 800ms ease-out 600ms both" }}
      >
        {items.map(([n, l, d], i) => (
          <div
            key={n}
            className="border-t px-6 py-10 md:border-t-0 md:border-l md:px-10 md:py-14"
            style={{
              borderColor: HAIR,
              borderLeftWidth: i === 0 ? 0 : 1,
              borderTopWidth: i === 0 ? 0 : undefined,
            }}
          >
            <p
              className="text-[10.5px] tracking-[0.18em] uppercase"
              style={{ color: SOFT, fontFamily: "var(--font-mono)" }}
            >
              {l}
            </p>
            <p
              className="mt-3 tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              {n}
            </p>
            <p className="mt-4 text-[14px] leading-[1.5]" style={{ color: SOFT }}>
              {d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section
      id="product"
      className="mx-auto max-w-[80rem] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="grid grid-cols-12 gap-x-10 gap-y-12">
        <div className="col-span-12 md:col-span-5">
          <p
            className="text-[11px] tracking-[0.22em] uppercase"
            style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
          >
            The Product
          </p>
          <h2
            className="mt-5 max-w-md tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 2.8rem)",
              fontWeight: 500,
              lineHeight: 1.05,
            }}
          >
            One probe.{" "}
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Every host, every scale.
            </span>
          </h2>
          <p
            className="mt-6 max-w-md text-[16px] leading-[1.6]"
            style={{ color: SOFT }}
          >
            ODX-1 is a dual-wavelength, ratiometric turbidity probe. The 600 nm
            channel reports OD; the 850 nm channel subtracts bubble scatter.
            Both share the same optical axis, so calibration is portable across
            bench, pilot, and production reactors.
          </p>

          <ul className="mt-10 space-y-5">
            {[
              ["12 mm or 25 mm Ingold port", "Drop-in for legacy reactors and EHEDG-compliant for GMP."],
              ["316L body, sapphire window", "Repeated SIP at 134 °C. No drift across cycles."],
              ["Modbus, MQTT, 4–20 mA", "Talk to the DCS and the historian at the same time."],
            ].map(([t, d]) => (
              <li
                key={t}
                className="flex gap-4 border-b pb-5"
                style={{ borderColor: HAIR }}
              >
                <span
                  className="mt-2 inline-block size-1.5 rounded-full"
                  style={{ background: BRAND }}
                />
                <div>
                  <p className="text-[15px]" style={{ fontWeight: 500 }}>
                    {t}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.5]" style={{ color: SOFT }}>
                    {d}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-7">
          <div
            className="relative aspect-[5/4] overflow-hidden rounded-sm"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, #ffffff 0%, #F4F1E8 60%, #E8E4D5 100%)",
            }}
          >
            <Image
              src="/logo-horizontal.png"
              alt="Reacgen ODX-1"
              fill
              className="object-contain p-12 md:p-20"
              priority
            />
            <div
              className="absolute right-6 bottom-6 flex items-baseline gap-3 text-[11px] tracking-[0.22em] uppercase"
              style={{ color: SOFT, fontFamily: "var(--font-mono)" }}
            >
              <span>ODX-1</span>
              <span style={{ color: BRAND }}>·</span>
              <span>2026</span>
            </div>
          </div>

          <div
            className="mt-6 grid grid-cols-3 gap-x-4 gap-y-2 text-[12px]"
            style={{ color: SOFT, fontFamily: "var(--font-mono)" }}
          >
            <span>L · 318 mm</span>
            <span>Ø · 12 mm</span>
            <span>m · 0.42 kg</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps: [string, string, string, React.ReactNode][] = [
    [
      "01",
      "Photons in",
      "Two LEDs, 600 nm and 850 nm, fire in alternation through a polished sapphire window.",
      <Waves key="w" size={20} strokeWidth={1.5} />,
    ],
    [
      "02",
      "Scatter measured",
      "An 8-element radial detector array reads the diffuse field. Pair imbalance flags fouling early.",
      <CircuitBoard key="c" size={20} strokeWidth={1.5} />,
    ],
    [
      "03",
      "OD reported",
      "850 nm subtracts bubble scatter; the ratio is invariant to LED aging. The output is what your bench would say.",
      <ShieldCheck key="s" size={20} strokeWidth={1.5} />,
    ],
  ];

  return (
    <section
      id="science"
      className="border-t"
      style={{ borderColor: HAIR }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-24 md:px-10 md:py-32">
        <p
          className="text-[11px] tracking-[0.22em] uppercase"
          style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
        >
          How it works
        </p>
        <h2
          className="mt-5 max-w-2xl tracking-[-0.02em]"
          style={{
            fontSize: "clamp(2rem, 3.6vw, 2.8rem)",
            fontWeight: 500,
            lineHeight: 1.05,
          }}
        >
          The optics are inside the vessel.{" "}
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: SOFT,
            }}
          >
            Everything else is signal.
          </span>
        </h2>

        <ol className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map(([n, t, d, icon]) => (
            <li key={n} className="relative">
              <div
                className="absolute -left-1 -top-1 inline-flex size-9 items-center justify-center rounded-full"
                style={{ background: BG, color: BRAND, border: `1px solid ${HAIR}` }}
              >
                {icon}
              </div>
              <p
                className="ml-14 text-[11px] tracking-[0.22em] uppercase"
                style={{ color: SOFT, fontFamily: "var(--font-mono)" }}
              >
                Step {n}
              </p>
              <h3
                className="ml-14 mt-2 text-[1.4rem] tracking-[-0.01em]"
                style={{ fontWeight: 500, lineHeight: 1.15 }}
              >
                {t}
              </h3>
              <p
                className="ml-14 mt-3 text-[15px] leading-[1.6]"
                style={{ color: SOFT }}
              >
                {d}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DesignedFor() {
  const tiles: [string, string, string, React.ReactNode][] = [
    [
      "Mammalian cell culture",
      "CHO, HEK293, Vero",
      "Tracks biomass through perfusion, fed-batch, and seed train without sampling.",
      <Microscope key="m" size={18} strokeWidth={1.5} />,
    ],
    [
      "Microbial fermentation",
      "E. coli, P. pastoris, S. cerevisiae",
      "Linear across the full exponential phase. Captures induction in under 50 ms.",
      <Beaker key="b" size={18} strokeWidth={1.5} />,
    ],
    [
      "Single-use platforms",
      "Sartorius · Cytiva · ABEC",
      "External clamp variant for bagged reactors. Same calibration as the wetted unit.",
      <CircuitBoard key="c" size={18} strokeWidth={1.5} />,
    ],
  ];

  return (
    <section className="mx-auto max-w-[80rem] px-6 py-24 md:px-10 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-y-6">
        <div>
          <p
            className="text-[11px] tracking-[0.22em] uppercase"
            style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
          >
            Designed for
          </p>
          <h2
            className="mt-5 max-w-2xl tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 2.8rem)",
              fontWeight: 500,
              lineHeight: 1.05,
            }}
          >
            Validated across the bioprocess stack.
          </h2>
        </div>
        <p className="max-w-md text-[15px] leading-[1.6]" style={{ color: SOFT }}>
          From 250 mL development reactors to 2000 L production tanks. The same
          probe, the same calibration coefficients.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiles.map(([title, sub, body, icon]) => (
          <article
            key={title}
            className="group relative flex h-full flex-col rounded-sm border p-8 transition-colors hover:bg-white"
            style={{ borderColor: HAIR }}
          >
            <div
              className="inline-flex size-9 items-center justify-center rounded-full"
              style={{ background: BG, color: BRAND, border: `1px solid ${HAIR}` }}
            >
              {icon}
            </div>
            <h3
              className="mt-8 text-[1.25rem] tracking-[-0.01em]"
              style={{ fontWeight: 500, lineHeight: 1.2 }}
            >
              {title}
            </h3>
            <p
              className="mt-1 text-[12px] tracking-[0.12em] uppercase"
              style={{ color: SOFT, fontFamily: "var(--font-mono)" }}
            >
              {sub}
            </p>
            <p className="mt-5 flex-1 text-[15px] leading-[1.6]" style={{ color: SOFT }}>
              {body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Research() {
  const papers: [string, string, string, string][] = [
    [
      "Dual-wavelength compensation of bubble scattering",
      "Nature Biotechnology",
      "Park, Hsu et al. · 2024",
      "Read",
    ],
    [
      "NIST-traceable references for in-situ OD",
      "Biotechnol. Bioeng.",
      "Chen, Adeyemi · 2025",
      "Read",
    ],
    [
      "ODX-1 validation across mammalian & microbial hosts",
      "Reacgen Internal Report",
      "RBS-VR-014 · 2026",
      "Download (PDF)",
    ],
  ];

  return (
    <section
      id="research"
      className="border-t"
      style={{ borderColor: HAIR }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-y-6">
          <div>
            <p
              className="text-[11px] tracking-[0.22em] uppercase"
              style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
            >
              Selected research
            </p>
            <h2
              className="mt-5 max-w-2xl tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 2.8rem)",
                fontWeight: 500,
                lineHeight: 1.05,
              }}
            >
              The work behind the instrument.
            </h2>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-[15px]"
            style={{ color: INK }}
          >
            Publications archive
            <ArrowUpRight size={15} style={{ color: BRAND }} />
          </Link>
        </div>

        <ul
          className="mt-12 divide-y border-t border-b"
          style={{ borderColor: HAIR }}
        >
          {papers.map(([t, j, a, cta]) => (
            <li
              key={t}
              className="grid grid-cols-12 gap-x-6 gap-y-2 py-7 transition-colors hover:bg-white"
              style={{ borderColor: HAIR }}
            >
              <p
                className="col-span-12 text-[10.5px] tracking-[0.22em] uppercase md:col-span-3"
                style={{ color: SOFT, fontFamily: "var(--font-mono)" }}
              >
                {j}
              </p>
              <div className="col-span-12 md:col-span-7">
                <p
                  className="text-[1.05rem] leading-tight"
                  style={{ fontWeight: 500 }}
                >
                  {t}
                </p>
                <p className="mt-1.5 text-[13px]" style={{ color: SOFT }}>
                  {a}
                </p>
              </div>
              <Link
                href="#"
                className="col-span-12 inline-flex items-center gap-2 text-[14px] md:col-span-2 md:justify-end"
                style={{ color: BRAND }}
              >
                {cta} <ArrowUpRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Partners() {
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
      className="border-t"
      style={{ borderColor: HAIR }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:px-10 md:py-20">
        <p
          className="text-[10.5px] tracking-[0.22em] uppercase"
          style={{ color: SOFT, fontFamily: "var(--font-mono)" }}
        >
          Co-developed and validated with
        </p>
        <div
          className="mt-8 grid grid-cols-2 gap-y-6 md:grid-cols-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {partners.map((p) => (
            <span
              key={p}
              className="text-[1.05rem] tracking-tight"
              style={{ color: INK, opacity: 0.75 }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="contact"
      className="border-t"
      style={{ borderColor: HAIR }}
    >
      <div className="mx-auto max-w-[80rem] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10">
          <div className="col-span-12 md:col-span-7">
            <p
              className="text-[11px] tracking-[0.22em] uppercase"
              style={{ color: BRAND, fontFamily: "var(--font-mono)" }}
            >
              Get started
            </p>
            <h2
              className="mt-5 max-w-2xl tracking-[-0.02em]"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              Try the probe in{" "}
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: BRAND,
                }}
              >
                your next run.
              </span>
            </h2>
            <p
              className="mt-6 max-w-xl text-[1.1rem] leading-[1.55]"
              style={{ color: SOFT }}
            >
              We&apos;ll send a calibrated ODX-1 and a process engineer to install
              it. Four weeks alongside your current method. You keep the data
              — purchase only if the numbers convince you.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/v3/whitelist"
                className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[15px] transition-transform hover:translate-y-[-1px]"
                style={{ background: INK, color: BG }}
              >
                Request an evaluation
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-[15px]"
                style={{ color: INK }}
              >
                Download datasheet (PDF)
                <span style={{ color: BRAND }}>→</span>
              </Link>
            </div>
          </div>

          <div
            className="col-span-12 md:col-span-5 md:col-start-8"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <dl
              className="space-y-6 border-l pl-6"
              style={{ borderColor: HAIR }}
            >
              <Contact label="Product inquiries" value="probe@reacgen.bio" />
              <Contact label="Research partnerships" value="research@reacgen.bio" />
              <Contact label="Press" value="press@reacgen.bio" />
              <Contact label="Address" value={`1842 Industrial Way\nSouth San Francisco, CA 94080`} />
            </dl>

            <TrackedLink
              href="http://forum.reacgen.local/"
              ctaId="forum-v3-contact"
              location="contact-panel"
              className="group mt-10 flex items-start gap-4 rounded-sm border bg-white p-5 transition-colors hover:border-[rgba(47,143,102,0.5)] no-underline"
              style={{ borderColor: HAIR }}
            >
              <span
                className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: BG, color: BRAND, border: `1px solid ${HAIR}` }}
              >
                <MessagesSquare size={16} strokeWidth={1.5} />
              </span>
              <div className="flex-1">
                <p
                  className="text-[11px] tracking-[0.22em] uppercase"
                  style={{ color: BRAND }}
                >
                  Community
                </p>
                <p
                  className="mt-1.5 text-[15px] leading-[1.45]"
                  style={{ color: INK, fontFamily: "var(--font-sans)", fontWeight: 500 }}
                >
                  Public discussion at forum.reacgen.local
                </p>
                <p
                  className="mt-1 text-[13px] leading-[1.5]"
                  style={{ color: SOFT, fontFamily: "var(--font-sans)" }}
                >
                  FAQs, manuals, and an open thread for engineering questions.
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="mt-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                style={{ color: SOFT }}
              />
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt
        className="text-[10.5px] tracking-[0.22em] uppercase"
        style={{ color: SOFT }}
      >
        {label}
      </dt>
      <dd
        className="mt-1.5 text-[14px] whitespace-pre-line"
        style={{ color: INK }}
      >
        {value}
      </dd>
    </div>
  );
}

function Foot() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: HAIR }}
    >
      <div
        className="mx-auto flex max-w-[80rem] flex-col gap-4 px-6 py-10 text-[13px] md:flex-row md:items-center md:justify-between md:px-10"
        style={{ color: SOFT }}
      >
        <div className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="Reacgen" width={22} height={22} />
          <span>© 2026 Reacgen Biosystems, Inc.</span>
        </div>
        <div className="flex items-center gap-6" style={{ fontFamily: "var(--font-mono)" }}>
          <Link href="#" className="hover:text-[#0F1311]">
            Privacy
          </Link>
          <Link href="#" className="hover:text-[#0F1311]">
            Terms
          </Link>
          <Link href="/" className="hover:text-[#0F1311]">
            ← Variants
          </Link>
        </div>
      </div>
    </footer>
  );
}
