import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Truck, Wrench } from "lucide-react"

import { Section } from "@/components/shared/section"
import { JsonLd } from "@/components/shared/jsonld"
import { BuyForm } from "@/components/buy/buy-form"
import { breadcrumbSchema, productSchema } from "@/lib/schema"
import { pageMetadata } from "@/lib/seo"
import { PRODUCT } from "@/lib/product"

export const metadata: Metadata = pageMetadata({
  title: "Buy the Turbid Vision Probe",
  description: `Buy the Turbid Vision Probe from ${PRODUCT.priceDisplay} per unit. Stripe checkout, worldwide shipping.`,
  path: "/v5/buy",
})

const TRUST = [
  { icon: Truck, label: "Worldwide shipping", body: "Ships in 2 business days." },
  { icon: Wrench, label: "12-month warranty", body: "Defects + spec drift." },
  { icon: ShieldCheck, label: "Secure payment", body: "Stripe + 3D Secure." },
] as const

export default function BuyPage() {
  const configured = false
  return (
    <>
      <JsonLd
        data={[
          productSchema(PRODUCT.priceUSD),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Buy", path: "/v5/buy" },
          ]),
        ]}
      />

      <Section className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Buy direct
            </p>
            <h1 className="mt-3 text-h1 text-balance">
              {PRODUCT.name}
            </h1>
            <p className="mt-4 text-lede">
              One unit at {PRODUCT.priceDisplay}. Need six or more, a PO, or a custom
              build? Use the{" "}
              <Link href="/v5/forum" className="text-foreground underline underline-offset-2">
                Reacgen forum
              </Link>{" "}
              or email sales.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {TRUST.map((t) => (
                <li key={t.label} className="rounded-lg border border-border/75 p-4">
                  <t.icon className="mb-2 size-5 text-primary" aria-hidden />
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg border border-border/75 bg-muted/30 p-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Lead time:</strong>{" "}
                {PRODUCT.leadTimeBusinessDays} business days after order, plus shipping.
              </p>
              <p className="mt-1">
                <strong className="text-foreground">Returns:</strong> Unused units returnable
                within 30 days. Calibrated or installed units fall under warranty.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/75 bg-card p-6 sm:p-8">
            {configured ? (
              <BuyForm unitPrice={PRODUCT.priceUSD} />
            ) : (
              <div className="grid gap-4 text-sm">
                <h2 className="text-lg font-semibold">Online checkout is being set up</h2>
                <p className="text-muted-foreground">
                  Stripe isn&apos;t live in this environment yet. In the meantime, the
                  forum or sales inbox is the fastest way to get a unit on order.
                </p>
                <Link
                  href="/v5/forum"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Open the forum
                </Link>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
