import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section, SectionHeading } from "@/components/shared/section"
import { JsonLd } from "@/components/shared/jsonld"
import { ProductGallery } from "@/components/product/gallery"
import { SensorBoxDiagram } from "@/components/product/sensor-box-diagram"
import { SpecTable } from "@/components/product/spec-table"
import { ComparisonTable } from "@/components/product/comparison-table"
import { breadcrumbSchema, productSchema } from "@/lib/schema"
import { pageMetadata } from "@/lib/seo"
import { PRODUCT } from "@/lib/product"

export const metadata: Metadata = pageMetadata({
  title: PRODUCT.name,
  description: PRODUCT.shortDescription,
  path: "/v5/products",
})

export default function ProductPage() {
  return (
    <>
      <JsonLd
        data={[
          productSchema(PRODUCT.priceUSD),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Product", path: "/v5/products" },
          ]),
        ]}
      />

      <Section className="pt-12 pb-8 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              The product
            </p>
            <h1 className="mt-3 text-h1 text-balance">{PRODUCT.name}</h1>
            <p className="mt-4 text-lede">{PRODUCT.shortDescription}</p>
            <p className="mt-6 font-mono text-3xl font-semibold nums">
              {PRODUCT.priceDisplay}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                / unit, USD
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-6">
                <Link href="/v5/buy">
                  Buy now <ArrowRight className="ml-1 size-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <ul className="mt-8 grid gap-2 text-sm">
              {PRODUCT.inTheBox.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border/75 bg-gradient-to-br from-card to-muted/50 p-4 sm:p-6">
              <SensorBoxDiagram />
            </div>
          </div>

          <ProductGallery />
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="How it's built"
          title="What's actually in the probe."
          description="A vertical cross-section of the optics and transmitter, followed by the operating envelope that ships in the datasheet."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <SpecTable />
          <div className="rounded-xl border border-border/75 bg-card p-6 sm:p-8">
            <h3 className="text-lg font-semibold">What it doesn&apos;t do</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              We&apos;re honest about scope. The Reacgen sensor is built for monitoring
              applications inside its rated range — it isn&apos;t a turnkey replacement
              for every specialty probe on the market.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li className="leading-relaxed">
                · Not a GMP-validated process analytical technology (PAT) unit. Bring
                your own qualification.
              </li>
              <li className="leading-relaxed">
                · Not designed for extreme pH (&lt; 2 or &gt; 12) without external pH
                control.
              </li>
              <li className="leading-relaxed">
                · Operating temperature stops at 60 °C (see spec table). For
                thermophile / high-temperature fermentation, talk to us about custom
                builds.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="Compare"
          title="Reacgen vs incumbent."
          description="Same fit, comparable performance, materially smaller invoice. Where we trade off, we say so."
        />
        <div className="mt-10">
          <ComparisonTable />
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="rounded-2xl border border-border/75 bg-card p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-h1 text-balance">Get one on your reactor.</h2>
              <p className="mt-4 text-lede">
                One unit takes a credit card. Larger deployments can start in the
                Reacgen forum or over email.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button asChild size="lg" className="h-12 px-6">
                <Link href="/v5/buy">
                  Buy now <ArrowRight className="ml-1 size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
