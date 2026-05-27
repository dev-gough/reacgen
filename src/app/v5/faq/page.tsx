import type { Metadata } from "next"

import { Section, SectionHeading } from "@/components/shared/section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { JsonLd } from "@/components/shared/jsonld"
import { breadcrumbSchema, faqSchema } from "@/lib/schema"
import { pageMetadata } from "@/lib/seo"
import { FAQ } from "@/content/faq"

export const metadata: Metadata = pageMetadata({
  title: "Frequently asked questions",
  description: "Common questions about the Turbid Vision Probe, ordering, and shipping.",
  path: "/v5/faq",
})

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(FAQ.map((qa) => ({ q: qa.q, a: qa.a }))),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/v5/faq" },
          ]),
        ]}
      />
      <Section className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions, plainly answered."
          description="If you've got one that isn't here, ask in the forum or email sales@reacgen.com."
        />
        <div className="mt-10 max-w-3xl">
          <Accordion className="w-full">
            {FAQ.map((qa, i) => (
              <AccordionItem key={qa.q} value={`q-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium py-4">
                  {qa.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {qa.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  )
}
