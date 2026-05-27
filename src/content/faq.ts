export const FAQ = [
  {
    q: "What does the Turbid Vision Probe measure?",
    a: "Optical density (OD) and calibrated biomass. The probe is specified for a linear range up to 300 g/L yeast, with field calibration for your organism and media.",
  },
  {
    q: "What reactor volumes does it support?",
    a: "The rated range starts at 80 mL and extends to effectively unlimited process volumes, assuming the vessel can accept the top-mounted adapter and the optical window is placed in the culture.",
  },
  {
    q: "Is it compatible with Pioreactor?",
    a: "Yes. Pioreactor compatibility is available through the Stemma QT adapter. The probe itself is not limited to Pioreactor vessels.",
  },
  {
    q: "How long do orders take to ship?",
    a: "Stocked units ship within 2 business days from our facility. Worldwide delivery typically lands 5–10 business days after dispatch. Bulk and custom orders have a 1–2 week build window.",
  },
  {
    q: "Is the probe autoclavable?",
    a: "That's the target. Final probe materials are still in qualification for repeated 121 °C / 20 min cycles, and we flag the qualified build on every order.",
  },
  {
    q: "How do I calibrate it?",
    a: "Two-point field calibration plus an automated biomass fit. The biomass script uses a calibrated dilution at a known rate against a culture of known density to fit OD to g/L for your organism.",
  },
  {
    q: "What about stirring and aeration interfering with the reading?",
    a: "Bubble scatter is handled with filtering and optical correction, so the goal is to avoid the usual pause-stirring workflow for routine readings.",
  },
  {
    q: "Do you offer a warranty?",
    a: "12 months from shipment, covering defects in materials and workmanship. Drift outside published spec within the warranty window is also covered.",
  },
  {
    q: "Do you offer volume pricing?",
    a: "Yes. Pricing tiers kick in at 6+ units and again at 25+. Start a thread in the Reacgen forum or email sales with the quantity and deployment details.",
  },
  {
    q: "What's the return policy?",
    a: "Unopened, unused units can be returned within 30 days for a full refund minus shipping. Calibrated or installed units fall under the warranty rather than the return policy.",
  },
  {
    q: "Where does Reacgen ship from?",
    a: "Orders fulfill from the United States. We currently ship to most countries; sanctions-restricted destinations are excluded at checkout.",
  },
  {
    q: "How do you compare to Hamilton Dencytee or Mettler Toledo InPro probes?",
    a: "Same broad job: top-mounted, wide linear range, biomass-grade data. Incumbent probes often add vendor-locked calibration, long lead times, and higher pricing. Turbid Vision is built to be practical, calibratable, and easier to deploy.",
  },
] as const
