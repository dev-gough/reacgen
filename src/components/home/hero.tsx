import Link from "next/link"
import { ArrowRight, MessagesSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/shared/section"
import { LiveOdChart } from "@/components/home/live-od-chart"
import { PRODUCT } from "@/lib/product"

export function Hero() {
  return (
    <Section as="section" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* Subtle dotted-grid background — confined to the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45] dark:opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-display text-balance">
            Turbid Vision Probe.
            <br />
            Biomass readings inside the reactor.
          </h1>
          <p className="mt-5 max-w-xl text-lede">
            A top-mounted optical density probe for cell culture, fermentation,
            and suspended solids inside your bioreactor. It supports reactor
            volumes from 80 mL to effectively unlimited process scale and stays
            linear to 300 g/L yeast.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 px-6 whitespace-nowrap">
              <Link href="/v5/buy">
                Buy from <span className="nums">{PRODUCT.priceDisplay}</span>
                <ArrowRight className="ml-1 size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6">
              <Link href="/v5/forum">
                Forum
                <MessagesSquare className="ml-1 size-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border/75 pt-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Lead time</dt>
              <dd className="mt-1 font-semibold nums">1–2 wks</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Linear range</dt>
              <dd className="mt-1 font-semibold nums">300 g/L</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Warranty</dt>
              <dd className="mt-1 font-semibold nums">12 mo</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5">
          <LiveOdChart />
        </div>
      </div>
    </Section>
  )
}
