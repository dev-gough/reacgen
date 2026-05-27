import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Cable, Gauge } from "lucide-react"

import { DocsPageShell } from "@/components/docs/docs-page-shell"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Documentation",
  description:
    "Documentation for the Turbid Vision Probe — setup, calibration, I2C reference, and troubleshooting.",
  path: "/v5/docs",
})

const STARTERS = [
  {
    href: "/v5/docs/quickstart",
    icon: BookOpen,
    title: "Quickstart",
    body: "Mount the probe, plug in the Stemma QT cable, and take your first reading.",
  },
  {
    href: "/v5/docs/compatibility",
    icon: Cable,
    title: "Compatibility setup",
    body: "Wire the I2C connection, configure the host, and expose the sensor in your control UI.",
  },
  {
    href: "/v5/docs/calibration",
    icon: Gauge,
    title: "Calibration",
    body: "Two-point procedure plus the automated OD → g/L biomass fit for your organism.",
  },
] as const

export default function DocsOverviewPage() {
  return (
    <DocsPageShell
      slug=""
      lede="Everything you need to install, calibrate, and run the Turbid Vision Probe. Some sections will be marked draft until the first production batch ships — we're publishing as we validate."
    >
      <p>
        The Turbid Vision Probe is a top-mounted optical density probe for dense
        cultures. These docs cover installation, calibration, host integration, and
        the I2C register map.
      </p>

      <p>
        New here? Start with the Quickstart. If you&apos;re wiring into a custom
        reactor, jump to Compatibility setup for the I2C details and adapt from there.
      </p>

      <div className="not-prose mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STARTERS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-xl border border-border/75 bg-card p-5 transition-colors hover:border-primary/40"
          >
            <s.icon className="size-5 text-primary" aria-hidden />
            <h2 className="mt-3 text-base font-semibold">{s.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {s.body}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Read
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>

      <h2>What&apos;s in this section</h2>
      <ul>
        <li>
          <Link href="/v5/docs/quickstart">Quickstart</Link> — unbox to first reading.
        </li>
        <li>
          <Link href="/v5/docs/compatibility">Compatibility setup</Link> — Stemma QT
          wiring + host configuration.
        </li>
        <li>
          <Link href="/v5/docs/calibration">Calibration</Link> — two-point and
          automated biomass fit.
        </li>
        <li>
          <Link href="/v5/docs/i2c-reference">I2C register map</Link> — addresses,
          read/write semantics.
        </li>
        <li>
          <Link href="/v5/docs/troubleshooting">Troubleshooting</Link> — common
          issues and recovery.
        </li>
        <li>
          <Link href="/v5/docs/datasheet">Datasheet</Link> — request the PDF datasheet
          by email.
        </li>
      </ul>
    </DocsPageShell>
  )
}
