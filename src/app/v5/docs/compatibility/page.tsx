import type { Metadata } from "next"

import { DocsPageShell } from "@/components/docs/docs-page-shell"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Compatibility setup",
  description:
    "Wire the Turbid Vision Probe over Stemma QT or I2C and expose readings in your host system.",
  path: "/v5/docs/compatibility",
})

export default function CompatibilitySetupPage() {
  return (
    <DocsPageShell
      slug="compatibility"
      lede="The probe is an I2C peripheral with a simple register map. Use this page to wire the host and verify live readings."
    >
      <h2>Hardware connection</h2>
      <p>
        Use the supplied cable or adapter harness. Power and signal share the same
        connector. Keep the host side at the rated voltage and avoid adding a
        second external supply unless your integration requires isolation.
      </p>

      <h2>I2C address</h2>
      <p>
        Default address: <code>0x4A</code>. If you have a bus collision, the probe
        supports alternate addresses selectable on the board.
      </p>

      <h2>Host integration</h2>
      <p>
        The probe can be read by any host with a compatible I2C bus, including
        Raspberry Pi, ESP32, PLC gateway hardware, or lab automation controllers.
      </p>

      <h2>Configuration</h2>
      <pre><code>{`i2c_address = 0x4a
sample_rate_seconds = 5
average_window = 3
clip_below_od = 0.05
clip_above_od = 300`}</code></pre>
      <p>
        Reduce <code>sample_rate_seconds</code> for transient work; increase{" "}
        <code>average_window</code> for noisier media.
      </p>

      <h2>Verifying the install</h2>
      <p>
        Confirm that the host can see the default address, then read the raw OD
        register. If the device does not respond, reseat the cable and check bus
        voltage before swapping hardware.
      </p>
    </DocsPageShell>
  )
}
