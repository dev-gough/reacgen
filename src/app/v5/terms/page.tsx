import type { Metadata } from "next"

import { Section } from "@/components/shared/section"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Terms of sale",
  description:
    "Reacgen Biosystems terms of sale for B2B hardware orders. Plain-language overview pending lawyer review.",
  path: "/v5/terms",
})

export default function TermsPage() {
  return (
    <Section className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Legal
        </p>
        <h1 className="mt-3 text-h1">Terms of sale</h1>
        <p className="mt-3 rounded-lg border border-warning/50 bg-warning/5 px-4 py-3 text-sm text-foreground">
          <strong>Draft — pending lawyer review.</strong> This page outlines our
          intended terms in plain language. Final, enforceable terms will replace
          this draft before commercial launch.
        </p>

        {SECTIONS.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="text-h3">{s.h}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
          </section>
        ))}
      </article>
    </Section>
  )
}

const SECTIONS = [
  {
    h: "Orders",
    body: "All orders are subject to acceptance by Reacgen Biosystems, Inc. We may cancel an order before shipment if stock, pricing, or destination restrictions change. In that case we issue a full refund within 5 business days.",
  },
  {
    h: "Pricing & taxes",
    body: "Prices listed are exclusive of tax and shipping. Stripe calculates applicable sales tax / VAT at checkout. Buyers are responsible for any import duties and customs paperwork required in the destination country.",
  },
  {
    h: "Shipping & title",
    body: "Title and risk of loss pass to the buyer when the carrier picks up the parcel. Shipping ETAs are best-effort and not guaranteed. We will replace lost-in-transit shipments at our cost upon completion of a standard carrier claim.",
  },
  {
    h: "Warranty",
    body: "Sensors are warranted for 12 months from shipment against defects in materials, workmanship, and drift outside published specification. The warranty does not cover damage from misuse, modifications, or operation outside the published envelope.",
  },
  {
    h: "Limitation of liability",
    body: "To the maximum extent permitted by law, Reacgen Biosystems' aggregate liability for any claim arising out of the sale or use of a sensor is limited to the amount paid for that sensor. We are not liable for incidental, consequential, or indirect damages.",
  },
  {
    h: "Governing law",
    body: "These terms are governed by the laws of the State of Delaware, USA, without regard to its conflict-of-law principles.",
  },
] as const
