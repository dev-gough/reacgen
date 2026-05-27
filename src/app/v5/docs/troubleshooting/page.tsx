import type { Metadata } from "next"

import { DocsPageShell } from "@/components/docs/docs-page-shell"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Troubleshooting",
  description: "Common issues with the Turbid Vision Probe and how to recover.",
  path: "/v5/docs/troubleshooting",
})

const ISSUES = [
  {
    q: "The reading is stuck at zero.",
    a: "Almost always a wiring issue: the cable isn't fully seated, or the I2C address is wrong. Reseat the cable, scan the bus, and confirm that the device responds at 0x4A or your alternate address.",
  },
  {
    q: "The reading drifts upward over time, even with no biomass change.",
    a: "Most likely temperature drift from a recently sterilized probe. Give it 15 minutes to equilibrate inside the reactor. If it persists, the optical window may be fouled; remove and clean with isopropyl alcohol.",
  },
  {
    q: "OVER_RANGE bit is set permanently.",
    a: "You're past the calibrated upper bound. Dilute a sample for a quick read, or extend the upper bound by repeating calibration with a higher reference standard.",
  },
  {
    q: "Biomass readings are wildly off for my organism.",
    a: "OD to g/L is organism-specific. Re-run the biomass fit using a dry-weight sample of the actual organism and media you're running.",
  },
  {
    q: "I have two probes conflicting on the I2C bus.",
    a: "Set one probe to an alternate address, then update the host configuration so the second instance points to the new address.",
  },
  {
    q: "Nothing in this list matches my problem.",
    a: "Email sales@reacgen.com or post in the Reacgen forum with the host hardware, firmware/software version, and a brief description.",
  },
] as const

export default function TroubleshootingPage() {
  return (
    <DocsPageShell
      slug="troubleshooting"
      lede="Issues we've seen during bring-up and how to clear them."
    >
      {ISSUES.map((qa) => (
        <section key={qa.q} className="mt-6 not-prose">
          <h3 className="text-base font-semibold">{qa.q}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{qa.a}</p>
        </section>
      ))}
    </DocsPageShell>
  )
}
