import type { Metadata } from "next"
import { Suspense } from "react"

import { Section } from "@/components/shared/section"
import { OrderSummary } from "@/components/buy/order-summary"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...pageMetadata({ title: "Order confirmed", path: "/v5/order/success" }),
  robots: { index: false, follow: false },
}

export default function OrderSuccessPage() {
  return (
    <Section className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <Suspense fallback={<p className="text-muted-foreground">Loading your order...</p>}>
          <OrderSummary />
        </Suspense>
      </div>
    </Section>
  )
}
