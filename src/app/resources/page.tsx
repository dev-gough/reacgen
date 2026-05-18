import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Onest, Reddit_Mono, Fraunces, Newsreader, Fragment_Mono, IBM_Plex_Mono, IBM_Plex_Sans, Major_Mono_Display, Instrument_Sans, Instrument_Serif, DM_Mono } from "next/font/google";
import { Datasheet, Manual, Whitepaper, AppNote } from "@/components/Document";

const indexSans = Onest({ subsets: ["latin"], variable: "--font-index-sans", display: "swap" });
const indexMono = Reddit_Mono({ subsets: ["latin"], variable: "--font-index-mono", display: "swap" });

const editDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});
const editBody = Newsreader({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const editMono = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono", display: "swap" });

const instMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-mono", display: "swap" });
const instSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans", display: "swap" });
const instDisplay = Major_Mono_Display({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });

const clinSans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const clinSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const clinMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Reacgen — Document component preview",
  description:
    "Internal preview of the tracked Document component in editorial, instrument, and clinical variants.",
};

export default function ResourcesPage() {
  return (
    <main
      className={`${indexSans.variable} ${indexMono.variable} min-h-screen`}
      style={{ background: "#0A0A0A", color: "#EDECE6", fontFamily: "var(--font-index-sans)" }}
    >
      <header className="mx-auto flex max-w-[80rem] items-center justify-between px-6 pt-8 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-mark.png" alt="Reacgen" width={28} height={28} />
          <span className="text-[14px]" style={{ fontWeight: 500 }}>
            Reacgen Biosystems
          </span>
        </Link>
        <span
          className="text-[11px] tracking-[0.22em] uppercase"
          style={{ color: "#7B7B77", fontFamily: "var(--font-index-mono)" }}
        >
          Document component · preview
        </span>
      </header>

      <section className="mx-auto max-w-[80rem] px-6 pt-20 pb-12 md:px-12 md:pt-28">
        <p
          className="text-[11px] tracking-[0.28em] uppercase"
          style={{ color: "#3DA478", fontFamily: "var(--font-index-mono)" }}
        >
          Tracked document component
        </p>
        <h1
          className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.025em]"
          style={{ fontWeight: 500 }}
        >
          Three visual variants. One tracking pipeline.
        </h1>
        <p
          className="mt-6 max-w-2xl text-[1.05rem] leading-[1.55]"
          style={{ color: "#7B7B77" }}
        >
          Every click on these cards fires{" "}
          <code style={{ color: "#3DA478", fontFamily: "var(--font-index-mono)" }}>
            Document View
          </code>{" "}
          (and{" "}
          <code style={{ color: "#3DA478", fontFamily: "var(--font-index-mono)" }}>
            Document Download
          </code>{" "}
          for file links) to Plausible with the document id, kind, format and
          version as props. Drop the wrappers <em>Datasheet</em>,{" "}
          <em>Manual</em>, <em>Whitepaper</em>, <em>AppNote</em> anywhere on the
          site to add tracked entries.
        </p>
        <pre
          className="mt-8 inline-block border px-4 py-3 text-[12px] leading-[1.6]"
          style={{
            borderColor: "#1A1A1A",
            background: "#0F0F0F",
            color: "#D4DDE0",
            fontFamily: "var(--font-index-mono)",
          }}
        >
{`import { Datasheet } from "@/components/Document";

<Datasheet
  id="odx-1-datasheet-v3"
  variant="clinical"
  title="ODX-1 Datasheet"
  description="Optical, mechanical, electrical, environmental."
  href="/docs/odx-1-datasheet-v3.pdf"
  meta={{ format: "PDF", size: "2.4 MB", pages: 12, version: "rev 03" }}
/>`}
        </pre>
      </section>

      <Section
        title="Editorial variant"
        kicker="/ v1 · editorial"
        wrapperClass={`${editDisplay.variable} ${editBody.variable} ${editMono.variable}`}
        wrapperStyle={{ background: "#F3EDE0", color: "#1A1814", fontFamily: "var(--font-body)" }}
      >
        <Datasheet
          id="odx-1-datasheet-v3-editorial"
          variant="editorial"
          title="ODX-1 Datasheet"
          description="Optical, mechanical, electrical, environmental. Reproduced from the master spec, rev. 03."
          href="#"
          meta={{ format: "PDF", size: "2.4 MB", pages: 12, version: "rev 03", updated: "May 2026" }}
        />
        <Manual
          id="odx-1-installation-editorial"
          variant="editorial"
          title="Installation &amp; calibration manual"
          description="Mounting, SIP cycling, on-site calibration against a microsphere reference."
          href="#"
          meta={{ format: "PDF", size: "6.8 MB", pages: 48, version: "v1.2" }}
        />
        <Whitepaper
          id="dual-wavelength-compensation-editorial"
          variant="editorial"
          title="Dual-wavelength compensation of bubble scattering"
          description="Park &amp; Hsu, Nature Biotechnology, 2024 — the technique behind ODX-1's scatter correction."
          href="#"
          badge="Open access"
          meta={{ format: "PDF", pages: 9 }}
        />
      </Section>

      <Section
        title="Instrument variant"
        kicker="// v2 · instrument"
        wrapperClass={`${instDisplay.variable} ${instMono.variable} ${instSans.variable}`}
        wrapperStyle={{ background: "#06080A", color: "#D4DDE0", fontFamily: "var(--font-sans)" }}
      >
        <Datasheet
          id="odx-1-datasheet-v3-instrument"
          variant="instrument"
          title="ODX-1 datasheet"
          description="Spec sheet · optical, mechanical, electrical, process."
          href="#"
          meta={{ format: "PDF", size: "2.4 MB", pages: 12, version: "rev 03" }}
        />
        <Manual
          id="odx-1-modbus-instrument"
          variant="instrument"
          title="Modbus RTU + TCP register map"
          description="Holding registers, scaling, byte order, function codes 03 / 06 / 16."
          href="#"
          meta={{ format: "PDF", size: "780 KB", pages: 6, version: "v2.4" }}
        />
        <AppNote
          id="ecoli-fermentation-instrument"
          variant="instrument"
          title="E. coli K-12 · 48-hour run"
          description="Representative log-phase capture with IPTG induction annotation."
          href="#"
          badge="new"
          meta={{ format: "PDF", pages: 5 }}
        />
      </Section>

      <Section
        title="Clinical variant"
        kicker="03 · Clinical"
        wrapperClass={`${clinSans.variable} ${clinSerif.variable} ${clinMono.variable}`}
        wrapperStyle={{ background: "#FAFAF6", color: "#0F1311", fontFamily: "var(--font-sans)" }}
      >
        <Datasheet
          id="odx-1-datasheet-v3-clinical"
          variant="clinical"
          title="ODX-1 Datasheet"
          description="Full specification: optical, mechanical, electrical, environmental, and process compatibility."
          href="#"
          meta={{ format: "PDF", size: "2.4 MB", pages: 12, version: "rev 03", updated: "May 2026" }}
        />
        <Manual
          id="odx-1-quickstart-clinical"
          variant="clinical"
          title="Quick-start guide"
          description="Unbox, mount, connect, calibrate. Twelve pages, no jargon."
          href="#"
          meta={{ format: "PDF", size: "3.1 MB", pages: 12, version: "v1.0" }}
        />
        <Whitepaper
          id="continuous-od-clinical"
          variant="clinical"
          title="The case for continuous OD"
          description="Why in-situ measurement changes process development economics."
          href="#"
          badge="Updated"
          meta={{ format: "PDF", pages: 14 }}
        />
      </Section>

      <footer
        className="mx-auto flex max-w-[80rem] flex-col gap-3 px-6 pb-12 pt-16 text-[11px] tracking-[0.18em] uppercase md:flex-row md:items-center md:justify-between md:px-12"
        style={{ color: "#7B7B77", fontFamily: "var(--font-index-mono)" }}
      >
        <span>© 2026 Reacgen Biosystems</span>
        <Link href="/">← Variants</Link>
      </footer>
    </main>
  );
}

function Section({
  title,
  kicker,
  wrapperClass,
  wrapperStyle,
  children,
}: {
  title: string;
  kicker: string;
  wrapperClass: string;
  wrapperStyle: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`${wrapperClass} mx-auto my-12 max-w-[80rem]`}
      style={{ ...wrapperStyle }}
    >
      <div className="px-6 py-16 md:px-12 md:py-20">
        <p
          className="text-[10.5px] tracking-[0.32em] uppercase"
          style={{ color: "#3DA478", fontFamily: "var(--font-mono)" }}
        >
          {kicker}
        </p>
        <h2
          className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight tracking-[-0.02em]"
          style={{ fontWeight: 500 }}
        >
          {title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {children}
        </div>
      </div>
    </section>
  );
}
