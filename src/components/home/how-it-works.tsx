import { Section, SectionHeading } from "@/components/shared/section"
import { Reveal } from "@/components/shared/reveal"

const STEPS = [
  {
    n: "01",
    title: "Order online",
    body: "1–5 units check out at the listed price. Larger deployments can start from the forum or a direct sales conversation.",
  },
  {
    n: "02",
    title: "Receive in ~2 weeks",
    body: "Stocked units ship within two business days. Worldwide delivery typically lands within 5–10 business days after dispatch.",
  },
  {
    n: "03",
    title: "Plug in + calibrate",
    body: "Mount the probe, connect the cable, and run the two-point calibration from your host UI or calibration script.",
  },
] as const

export function HowItWorks() {
  return (
    <Section className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="How it works"
        title="From PO to first reading in two weeks."
        description="No demo loop, no field engineer visit, no integration project. The sensor arrives, you mount it, calibrate it, and get back to running experiments."
      />
      <ol className="mt-9 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal
            as="li"
            key={s.n}
            delay={i * 120}
            className="relative rounded-xl border border-border/75 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              Step {s.n}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
