export const PRODUCT = {
  slug: "turbid-vision-probe",
  name: "Turbid Vision Probe",
  tagline: "A biomass probe built for dense cultures and clear process data.",
  shortDescription:
    "A top-mounted optical density probe for cell culture, fermentation, and suspended solids inside your bioreactor. It supports vessels from 80 mL to effectively unlimited process volumes, and stays linear to 300 g/L yeast.",
  // PLACEHOLDER PRICE — Rafik has not finalized pricing. When confirmed, change this value
  // and `priceDisplay` below; every page reads from this constant.
  priceUSD: 1495,
  currency: "USD",
  priceDisplay: "$1,495",
  maxOnlineQuantity: 5,
  leadTimeBusinessDays: "1–2 weeks (estimated)",

  // Spec table — drives JSON-LD and the product page
  specs: [
    { label: "Measurement", value: "Optical density, top-mounted probe" },
    { label: "Interface", value: "I2C via Stemma QT (3.3 V); adapters available" },
    { label: "Reactor range", value: "80 mL → infinite process volume" },
    { label: "Linear range", value: "300 g/L yeast" },
    { label: "Operating temperature", value: "Ambient to 60 °C" },
    { label: "Position sensitivity", value: "None — readings independent of vial rotation" },
    { label: "Sterilization", value: "Autoclavable target (final material in qualification)" },
    { label: "Power", value: "3.3 V via Stemma QT" },
    { label: "Output", value: "I2C register map — see /v5/docs/i2c-reference" },
    { label: "Calibration", value: "Two-point + automated dilution biomass script" },
    { label: "Compatibility", value: "Compatible with Pioreactor via Stemma QT adapter" },
    { label: "Warranty", value: "12 months, defects in materials" },
  ],

  // Comparison vs incumbent — drives the comparison table
  comparison: {
    headers: ["", "Turbid Vision Probe", "Hamilton Dencytee / Mettler InPro"],
    rows: [
      ["Unit price", "$1,495 (placeholder)", "~$2,500 used / $3–5K+ new"],
      ["Mount", "Top-mounted, reactor-adapted", "Top-mounted, generic"],
      ["Interface", "I2C / Stemma QT", "4–20 mA / Modbus RS-485"],
      ["Linear range", "300 g/L yeast", "0–200 g/L"],
      ["Reactor volume", "80 mL → infinite", "Lab → industrial only"],
      ["Lead time", "1–2 weeks", "4–12 weeks"],
      ["Position sensitivity", "None", "None"],
    ],
  },

  // Application targets — populate the form's "Application" select
  applications: [
    "Mammalian cell culture",
    "Microbial fermentation (E. coli, yeast)",
    "Suspended solids",
    "Small reactor compatibility projects",
    "Other",
  ],
  inTheBox: [
    "Turbid Vision Probe (top-mounted)",
    "Stemma QT (I2C) cable",
    "Two-point calibration kit",
    "Quickstart card + datasheet",
  ],
} as const

export type ProductSpec = (typeof PRODUCT.specs)[number]
