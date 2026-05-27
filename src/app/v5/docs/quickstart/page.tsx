import type { Metadata } from "next"

import { DocsPageShell } from "@/components/docs/docs-page-shell"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Quickstart",
  description: "Unbox, mount, and take your first reading with the Turbid Vision Probe.",
  path: "/v5/docs/quickstart",
})

export default function QuickstartPage() {
  return (
    <DocsPageShell
      slug="quickstart"
      lede="The whole loop — from unboxing to the first OD reading — takes under an hour the first time."
    >
      <h2>What you&apos;ll need</h2>
      <ul>
        <li>A reactor with a compatible top-mounted adapter.</li>
        <li>The Turbid Vision Probe + cable + adapter hardware.</li>
        <li>Host access for reading I2C data or logging through your control stack.</li>
        <li>Two reference solutions for calibration — water and a known-OD standard.</li>
      </ul>

      <h2>Step 1 — Mount the probe</h2>
      <p>
        Seat the adapter so the optical window is exposed to the culture and the
        probe body remains vertical. Keep the cable gland above the reactor lid.
      </p>

      <h2>Step 2 — Connect the cable</h2>
      <p>
        Plug the supplied cable into the probe and host adapter. The connector is
        keyed, carries power and signal, and should not require an external supply
        unless your host system is isolated.
      </p>

      <h2>Step 3 — Confirm host readings</h2>
      <p>
        Read the default I2C address from your host. The probe should return live
        raw OD values within a few seconds. If the values look stuck or out of
        range, jump to <a href="/v5/docs/troubleshooting">Troubleshooting</a>.
      </p>

      <h2>Step 4 — Calibrate</h2>
      <p>
        Out of the box the probe reports raw OD. To convert to biomass density
        (g/L), run the calibration procedure described in{" "}
        <a href="/v5/docs/calibration">Calibration</a>. Plan about 20 minutes the
        first time for each organism.
      </p>

      <h2>You&apos;re done</h2>
      <p>
        From here, log the probe like any other process sensor and feed readings
        into your experiment scripts or control system.
      </p>
    </DocsPageShell>
  )
}
