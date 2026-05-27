import { Beaker, Dna, Leaf } from "lucide-react"

import { Section, SectionHeading } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"

const USE_CASES = [
  {
    icon: Beaker,
    title: "Microbial fermentation",
    body: "E. coli, yeast, and other workhorses routinely push past OD 10 in fed-batch. Reacgen keeps the OD trace honest where the stock 45° scatter sensor flattens.",
    stat: "Useful past ~5 g/L E. coli, ~5 g/L yeast",
  },
  {
    icon: Dna,
    title: "Mammalian cell culture",
    body: "Lower density than microbial work, but the long, slow runs reward a sensor that doesn't drift between calibrations. Two-point cal once, biomass fit once per cell line.",
    stat: "Calibration holds for ≥ 3 months / 200 cycles",
  },
  {
    icon: Leaf,
    title: "Suspended solids",
    body: "Dense suspended cultures and particle-rich broths can live well past OD 10, and pigment scatter throws stock sensors off. Turbid Vision is built for real reactor media, not only clean standards.",
    stat: "Built for dense, particle-rich reactor runs",
  },
] as const

export function UseCases() {
  return (
    <Section className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Use cases"
        title="Built for the densities people actually run."
        description="The same probe spans aerobic fermentation, cell culture, and suspended solids — re-fit the OD → g/L line for each organism or media and you're done."
      />
      <ul className="mt-9 grid gap-6 md:grid-cols-3">
        {USE_CASES.map((u, i) => (
          <Reveal
            as="li"
            key={u.title}
            delay={i * 100}
            className="flex flex-col gap-4 rounded-xl border border-border/75 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
          >
            <u.icon className="size-6 text-primary" aria-hidden strokeWidth={1.75} />
            <div>
              <h3 className="text-base font-semibold">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{u.body}</p>
            </div>
            <p className="mt-auto rounded-md bg-muted/40 px-3 py-2 font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
              {u.stat}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
