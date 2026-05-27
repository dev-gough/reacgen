import type { Metadata } from "next"

import { DocsPageShell } from "@/components/docs/docs-page-shell"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Calibration",
  description:
    "Two-point OD calibration plus the automated dilution-based OD → g/L biomass fit for the Turbid Vision Probe.",
  path: "/v5/docs/calibration",
})

export default function CalibrationPage() {
  return (
    <DocsPageShell
      slug="calibration"
      lede="Calibration has two parts: a two-point OD reference at install time, and an organism-specific OD → g/L fit you run once per culture. Both take under 20 minutes."
    >
      <h2>Why calibrate</h2>
      <p>
        Out of the box, the probe reports a raw turbidity index that is proportional
        to OD across its full range. Two-point calibration anchors that index to OD
        units. The biomass fit converts OD into grams per liter for your specific
        organism — which always varies (E. coli, yeast, and Spirulina have different
        cell sizes, shapes, and refractive index, so the OD → g/L slope is different
        for each).
      </p>

      <h2>Two-point OD calibration</h2>
      <ol>
        <li>
          Fill the vessel with clean DI water and start the <code>reacgen_od</code>{" "}
          job. Wait 60 seconds for the reading to settle.
        </li>
        <li>
          From your host UI or calibration script, set the zero point. This stores
          the current reading as OD 0.
        </li>
        <li>
          Replace the water with a known-OD reference standard (we ship a 1.0 OD
          standard in the calibration kit). Wait 60 seconds.
        </li>
        <li>
          Click <strong>Calibrate → Set reference point</strong> and enter the OD of
          the standard.
        </li>
      </ol>
      <p>
        The probe stores the calibration in non-volatile memory; it survives
        power-cycles.
      </p>

      <h2>Automated biomass fit (OD → g/L)</h2>
      <p>
        The calibration tooling fits an OD → g/L line for your organism by
        running a controlled dilution against a starter culture of known dry weight.
        The procedure:
      </p>
      <ol>
        <li>
          Inoculate the vessel with a starter culture you&apos;ve dry-weight measured
          (a 1 mL sample, vacuum-filtered and oven-dried, is enough for an estimate).
        </li>
        <li>
          Run <code>reacgen-fit-biomass --dry-weight 8.4</code> (replace the
          number with your measured g/L).
        </li>
        <li>
          The script dilutes the culture at a fixed flow rate, samples OD over the
          dilution curve, and fits a linear relationship.
        </li>
        <li>
          The fit is saved per-organism. Subsequent runs report g/L directly.
        </li>
      </ol>

      <h2>Why per-organism matters</h2>
      <p>
        The same OD reading corresponds to different cell densities for different
        microbes. Rough conversions at OD 10:
      </p>
      <ul>
        <li>
          <em>E. coli</em>: ~5 g/L (well-supported in literature).
        </li>
        <li>
          <em>S. cerevisiae</em> (yeast): ~2.5 g/L (Rafik&apos;s number — published
          conversions sometimes run higher; calibrate against your strain).
        </li>
        <li>
          Spirulina: ~1.5 g/L (Rafik&apos;s number — same caveat; pigments matter).
        </li>
      </ul>
      <p>
        Always re-fit if you change strain, media, or wavelength. The script handles
        all of that in 10–15 minutes.
      </p>

      <h2>Re-calibration cadence</h2>
      <p>
        Two-point OD calibration is good for ~200 autoclave cycles or 3 months,
        whichever comes first — based on supplier material specifications; final
        hardware validation is in progress. The biomass fit needs re-running
        whenever you change organism, strain, or media.
      </p>
    </DocsPageShell>
  )
}
