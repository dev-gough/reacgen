import type { Metadata } from "next"

import { Section, SectionHeading } from "@/components/shared/section"
import { JsonLd } from "@/components/shared/jsonld"
import { breadcrumbSchema } from "@/lib/schema"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Shipping & returns",
  description: "How Reacgen ships and handles returns, RMAs, and warranty claims.",
  path: "/v5/shipping-returns",
})

const SECTIONS = [
  {
    h: "Shipping",
    body: [
      "Stocked units ship from the United States within 2 business days of order confirmation.",
      "Worldwide delivery typically arrives 5–10 business days after dispatch, depending on destination and carrier.",
      "Tracking numbers are emailed automatically as soon as the parcel leaves our facility.",
      "International customers are responsible for import duties, taxes, and any customs paperwork required by the destination country.",
      "We currently exclude sanctions-restricted destinations at checkout.",
    ],
  },
  {
    h: "Returns",
    body: [
      "Unopened, uninstalled units can be returned within 30 days for a refund minus original shipping.",
      "Calibrated or installed units fall under the warranty rather than the return policy.",
      "To start a return, email sales@reacgen.com with your order number. We'll issue an RMA and return-shipping instructions within one business day.",
    ],
  },
  {
    h: "Warranty",
    body: [
      "12 months from the date of shipment, covering defects in materials and workmanship.",
      "Drift outside the published spec within the warranty window is also covered — we'll replace or recalibrate at our cost.",
      "The warranty does not cover damage from misuse, modifications, or use outside the published operating envelope.",
      "Warranty claims also start with an RMA from sales@reacgen.com.",
    ],
  },
] as const

export default function ShippingReturnsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Shipping & returns", path: "/v5/shipping-returns" },
        ])}
      />
      <Section className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Policies"
          title="Shipping, returns, and warranty."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <article key={s.h} className="rounded-xl border border-border/75 bg-card p-6 sm:p-8">
              <h2 className="text-h3">{s.h}</h2>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground leading-relaxed">
                {s.body.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}
