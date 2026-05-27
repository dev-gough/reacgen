import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/shared/section"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...pageMetadata({ title: "Order canceled", path: "/v5/order/cancel" }),
  robots: { index: false, follow: false },
}

export default function OrderCancelPage() {
  return (
    <Section className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl rounded-xl border border-border/75 bg-card p-8 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Checkout canceled
        </p>
        <h1 className="mt-3 text-h2">No charge was made.</h1>
        <p className="mt-3 text-muted-foreground">
          You closed the checkout window before completing payment, so we
          haven&apos;t charged your card. Pick up where you left off, or get in touch
          if you ran into a snag.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/v5/buy">Try again</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/v5/forum">Ask in the forum</Link>
          </Button>
          <Button asChild variant="ghost">
            <a href="mailto:sales@reacgen.com">Email sales</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
