import Link from "next/link"
import { MessagesSquare } from "lucide-react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/shared/section"
import { PRODUCT } from "@/lib/product"

export function CtaBand() {
  return (
    <Section className="py-16 sm:py-24">
      <div className="overflow-hidden rounded-2xl border border-border/75 bg-card p-8 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-h1 text-balance">
              Ready to put one on a reactor?
            </h2>
            <p className="mt-4 text-lede">
              Buy a unit at <span className="nums font-medium text-foreground">{PRODUCT.priceDisplay}</span>{" "}
              and have it on your bench in two weeks — or talk to us about pilot
                lots, multi-reactor deployments, and OEM pricing.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button asChild size="lg" className="h-12 px-6">
              <Link href="/v5/buy">
                Buy now <ArrowRight className="ml-1 size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6">
              <Link href="/v5/forum">
                Ask in the forum
                <MessagesSquare className="ml-1 size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
