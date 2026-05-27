import type { Metadata } from "next"

import { DocsPageShell } from "@/components/docs/docs-page-shell"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "I2C register map",
  description:
    "I2C addresses, registers, and read/write semantics for the Turbid Vision Probe.",
  path: "/v5/docs/i2c-reference",
})

const REGISTERS = [
  { addr: "0x00", name: "DEVICE_ID", size: "2 bytes", access: "R", note: "ASCII 'RG' (0x5247)" },
  { addr: "0x02", name: "FIRMWARE_VER", size: "1 byte", access: "R", note: "Semver minor, e.g. 0x10 = v1.0" },
  { addr: "0x10", name: "OD_RAW", size: "4 bytes", access: "R", note: "IEEE-754 float, raw turbidity index" },
  { addr: "0x14", name: "OD_CALIBRATED", size: "4 bytes", access: "R", note: "IEEE-754 float, OD units (after 2-pt cal)" },
  { addr: "0x18", name: "BIOMASS_GL", size: "4 bytes", access: "R", note: "IEEE-754 float, g/L (after biomass fit)" },
  { addr: "0x1C", name: "TEMP_C", size: "2 bytes", access: "R", note: "int16, °C × 100" },
  { addr: "0x20", name: "STATUS", size: "1 byte", access: "R", note: "Bit field — see below" },
  { addr: "0x30", name: "CAL_ZERO", size: "4 bytes", access: "R/W", note: "Stored zero-point reading" },
  { addr: "0x34", name: "CAL_REF_OD", size: "4 bytes", access: "R/W", note: "Stored reference OD value" },
  { addr: "0x38", name: "CAL_REF_RAW", size: "4 bytes", access: "R/W", note: "Stored reference raw reading" },
  { addr: "0x3C", name: "BIOMASS_SLOPE", size: "4 bytes", access: "R/W", note: "OD → g/L slope, set by fit script" },
  { addr: "0x40", name: "SAMPLE_PERIOD", size: "2 bytes", access: "R/W", note: "Sampling period, ms" },
  { addr: "0x50", name: "RESET", size: "1 byte", access: "W", note: "Write 0xA5 to reset; 0x55 to clear cal" },
] as const

const STATUS_BITS = [
  { bit: "0", name: "READY", note: "1 when a fresh sample is available" },
  { bit: "1", name: "CAL_DONE", note: "1 when two-point cal has been performed" },
  { bit: "2", name: "BIOMASS_FIT", note: "1 when biomass slope is set" },
  { bit: "3", name: "OVER_RANGE", note: "1 if reading exceeds calibrated upper bound" },
  { bit: "4", name: "UNDER_RANGE", note: "1 if reading is below calibrated zero" },
  { bit: "5", name: "TEMP_FAULT", note: "1 if internal temp sensor failed" },
  { bit: "6", name: "I2C_ERROR", note: "1 if last transaction NACK'd" },
  { bit: "7", name: "RESERVED", note: "0" },
] as const

export default function I2cReferencePage() {
  return (
    <DocsPageShell
      slug="i2c-reference"
      lede="Register map for host integrations. All multi-byte values are little-endian; floats are IEEE-754."
    >
      <div className="not-prose mb-8 rounded-lg border border-warning/60 bg-warning/8 p-4 text-sm">
        <p className="font-semibold text-foreground">Draft — for beta integrators only.</p>
        <p className="mt-1 text-muted-foreground">
          Addresses and register layout will change before v1 firmware is final.
          Don&apos;t commit driver code against this map yet. Email{" "}
          <a href="mailto:sales@reacgen.com" className="underline">
            sales@reacgen.com
          </a>{" "}
          for a stable preview build if you need to start hardware bring-up early.
        </p>
      </div>

      <h2>I2C address</h2>
      <p>
        Default <code>0x4A</code>. Alternate addresses <code>0x4B</code> and{" "}
        <code>0x4C</code> selectable via the jumper on the back of the probe.
      </p>

      <h2>Register map</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-border/75">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Addr
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Size
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                R/W
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {REGISTERS.map((r) => (
              <tr key={r.addr}>
                <td className="px-4 py-2 font-mono nums">{r.addr}</td>
                <td className="px-4 py-2 font-mono">{r.name}</td>
                <td className="px-4 py-2 text-muted-foreground">{r.size}</td>
                <td className="px-4 py-2 text-muted-foreground">{r.access}</td>
                <td className="px-4 py-2 text-muted-foreground">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>STATUS bit field</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-border/75">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Bit
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {STATUS_BITS.map((b) => (
              <tr key={b.bit}>
                <td className="px-4 py-2 font-mono nums">{b.bit}</td>
                <td className="px-4 py-2 font-mono">{b.name}</td>
                <td className="px-4 py-2 text-muted-foreground">{b.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Reading a sample (Python)</h2>
      <pre><code>{`import smbus2
bus = smbus2.SMBus(1)
addr = 0x4a

# Wait for READY bit
status = bus.read_byte_data(addr, 0x20)
if status & 0x01:
    raw = bus.read_i2c_block_data(addr, 0x14, 4)
    od = float_from_bytes(raw)`}</code></pre>

      <p>
        A complete reference driver in Python and C will live on GitHub before v1.
      </p>
    </DocsPageShell>
  )
}
