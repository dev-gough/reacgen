import type { Metadata } from "next"

import { Hero } from "@/components/home/hero"
import { ValuePillars } from "@/components/home/value-pillars"
import { UseCases } from "@/components/home/use-cases"
import { HowItWorks } from "@/components/home/how-it-works"
import { InterestForm } from "@/components/home/interest-form"
import { CtaBand } from "@/components/home/cta-band"
import { JsonLd } from "@/components/shared/jsonld"
import { productSchema } from "@/lib/schema"
import { pageMetadata } from "@/lib/seo"
import { PRODUCT } from "@/lib/product"

export const metadata: Metadata = pageMetadata({
  title: "Turbid Vision Probe",
  description:
    "A top-mounted optical density probe for cell culture, fermentation, and suspended solids. Linear to 300 g/L yeast and compatible with reactor volumes from 80 mL upward.",
  path: "/v5",
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={productSchema(PRODUCT.priceUSD)} />
      <Hero />
      <ValuePillars />
      <UseCases />
      <HowItWorks />
      <InterestForm />
      <CtaBand />
    </>
  )
}
