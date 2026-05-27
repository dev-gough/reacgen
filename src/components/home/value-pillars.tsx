import { CircuitBoard, FlaskConical, Gauge, Wrench } from "lucide-react"

import { Section, SectionHeading } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"

const PILLARS = [
  {
    icon: CircuitBoard,
    title: "Reactor-adaptable",
    body: "Top-mounted optics adapt from 80 mL vessels to production-scale reactors without constraining vessel diameter.",
  },
  {
    icon: Gauge,
    title: "300 g/L yeast range",
    body: "The probe is specified for a linear biomass range to 300 g/L yeast, so dense fed-batch runs stay readable without awkward dilutions.",
  },
  {
    icon: Wrench,
    title: "Field-recalibratable",
    body: "Two-point calibration plus an automated biomass script that fits OD→g/L for your organism in under 20 minutes. No vendor lock-in.",
  },
  {
    icon: FlaskConical,
    title: "Autoclave-friendly",
    body: "Designed to survive routine cycles (121 °C / 20 min). Final probe materials are in qualification — ship date for the autoclave-rated build is published per order.",
  },
] as const

export function ValuePillars() {
  return (
    <Section className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Why Reacgen"
        title="High-density biomass data without the enterprise wrapper."
        description="Most of what makes a biomass probe expensive isn't the optics. We strip the fluff and focus on a practical, calibratable probe for real reactors."
      />
      <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal
            as="li"
            key={p.title}
            delay={i * 80}
            className="group rounded-xl border border-border/75 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
          >
            <p.icon
              className="mb-4 size-6 text-primary transition-transform duration-300 group-hover:scale-110"
              aria-hidden
              strokeWidth={1.75}
            />
            <h3 className="text-base font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
