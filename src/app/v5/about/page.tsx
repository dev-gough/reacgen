import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Play, CirclePlay } from "lucide-react"

import { Section, SectionHeading } from "@/components/shared/section"
import { JsonLd } from "@/components/shared/jsonld"
import { CountUp } from "@/components/shared/count-up"
import { breadcrumbSchema, organizationSchema } from "@/lib/schema"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "About Reacgen Biosystems",
  description:
    "We build practical optical-density probes for high-density reactors. Founder Rafik Nassif builds DIY scientific instrumentation on YouTube.",
  path: "/v5/about",
})

const FOUNDER_VIDEO = {
  id: "Vdy6F3-Gg1M",
  title: "Unlocking the Potential of Algae: A Journey into Photobioreactor Technology",
  views: "49K views",
  channel: "Rafik Nassif",
  href: "https://www.youtube.com/watch?v=Vdy6F3-Gg1M",
  thumb: "https://i.ytimg.com/vi/Vdy6F3-Gg1M/hqdefault.jpg",
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/v5/about" },
          ]),
        ]}
      />

      <Section className="pt-12 pb-8 sm:pt-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          About
        </p>
        <h1 className="mt-3 text-h1 text-balance">
          We make sensors smaller labs can actually afford.
        </h1>
        <p className="mt-6 max-w-2xl text-lede">
          Reacgen Biosystems started because a small fermentation team kept hitting
          the same wall: dense cultures quickly outrun entry-level optical sensors,
          while commercial top-mounted biomass probes are priced like capital
          equipment. So we built the Turbid Vision Probe: top-mounted, I2C-native,
          and priced for the people actually running the reactors.
        </p>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          The first release supports reactor volumes from 80 mL upward, with an
          optical path intended for dense yeast, bacteria, and algae cultures.
        </p>
      </Section>

      <Section className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="What we believe"
          title="A few short rules."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Cost is a feature.",
              body: "If a probe is so expensive you only put it on one reactor, every other reactor is flying blind. Cheaper sensors expand what labs can measure.",
            },
            {
              title: "Specs should be honest.",
              body: "Every number on our datasheet is what we measured, not what marketing wanted. If we don't know, we say we don't know.",
            },
            {
              title: "Lead time is part of the price.",
              body: "An 8-week lead time means an 8-week pause. We stock what we sell so a PO becomes a tracking number, not a calendar invite.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-border/75 bg-card p-6">
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="relative aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl border border-border/75 bg-muted">
              <Image
                src="/team/rafik.jpg"
                alt="Rafik Nassif, founder of Reacgen Biosystems, in swim cap and goggles"
                fill
                sizes="(max-width: 1024px) 260px, 240px"
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="lg:col-span-9">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Founder
            </p>
            <h2 className="mt-3 text-h1 text-balance">Rafik Nassif</h2>
            <p className="mt-4 text-lede">
              Rafik leads Reacgen and owns the mechanical side — probe geometry,
              optics integration, and the reactor interface. Outside the lab he
              documents DIY scientific builds on YouTube: lab automation rigs,
              3D-printed particle-size analyzers, and the photobioreactor work
              that paved the way to launching reacgen biosystems.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-2xl border border-border/75 bg-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Background
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Designing photobioreactors for algae growth research for years
                before Reacgen.
              </li>
              <li>
                Photobioreactor automation work has been viewed 49,000+ times — the
                same audience that needs practical biomass data without buying a
                six-figure instrumentation stack.
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.youtube.com/@rafik.nassif"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
              >
                <CirclePlay className="size-4 text-primary" aria-hidden />
                YouTube channel
                <ExternalLink className="size-3" aria-hidden />
              </a>
              <Link
                href="/v5/contact"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Get in touch
              </Link>
            </div>
          </div>

          <a
            href={FOUNDER_VIDEO.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-border/75 bg-card lg:col-span-7"
            aria-label={`Watch on YouTube: ${FOUNDER_VIDEO.title}`}
          >
            <div className="relative aspect-video">
              <Image
                src={FOUNDER_VIDEO.thumb}
                alt={`Thumbnail for "${FOUNDER_VIDEO.title}"`}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                unoptimized
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur transition-transform group-hover:scale-110">
                  <Play className="size-7 translate-x-0.5 text-primary" aria-hidden />
                </span>
              </span>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-background/85 px-2 py-1 text-xs font-medium backdrop-blur">
                <CirclePlay className="size-3.5 text-primary" aria-hidden />
                <CountUp to={49} suffix="K views" />
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Featured · {FOUNDER_VIDEO.channel}
              </p>
              <p className="mt-2 text-base font-medium leading-snug group-hover:text-primary">
                {FOUNDER_VIDEO.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Plays on YouTube. We don&apos;t embed third-party players on this page.
              </p>
            </div>
          </a>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="relative aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl border border-border/75 bg-muted flex items-center justify-center">
              <span className="text-5xl font-semibold tracking-tight text-muted-foreground/50">
                TK
              </span>
            </div>
          </div>
          <div className="lg:col-span-9">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Co-founder
            </p>
            <h2 className="mt-3 text-h1 text-balance">Thomas Kulin</h2>
            <p className="mt-4 text-lede">
              Thomas likes to play with electricity. When he was a young boy, he licked live 120v from the wall socket. He has never been the same. one click of the buy button = one pray for his health and well-being.
              In his free time he builds Tesla coils, coilguns, electric skateboards, and embedded iot devices;
              the same mix of precision analog and real-time control that makes those
              work is exactly what the Turbid Vision Probe signal chain demands.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="rounded-2xl border border-border/75 bg-card p-6 sm:p-8 lg:max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Background
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-muted-foreground leading-relaxed">
              <li>
                Desgining analog electronics, and building embedded firmware for 100000 years before gifting reacgen with his presence.
              </li>
              <li>
                MASc Control Systems &amp; Electrical Engineering, Queen&apos;s University.
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/ThomasKulin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
              >
                GitHub
                <ExternalLink className="size-3" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
