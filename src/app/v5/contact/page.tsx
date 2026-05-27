import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MessagesSquare } from "lucide-react"

import { Section, SectionHeading } from "@/components/shared/section"
import { JsonLd } from "@/components/shared/jsonld"
import { breadcrumbSchema, organizationSchema } from "@/lib/schema"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Contact Reacgen",
  description: "Get in touch with Reacgen Biosystems sales and support.",
  path: "/v5/contact",
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/v5/contact" },
          ]),
        ]}
      />
      <Section className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Contact"
          title="Two ways to reach us."
          description="Most questions get a same-day reply during US business hours."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border/75 bg-card p-6 sm:p-8">
            <Mail className="size-6 text-primary" aria-hidden />
            <h2 className="mt-4 text-h3">Email</h2>
            <p className="mt-2 text-muted-foreground">
              For sales, orders, support, or anything else.
            </p>
            <a
              href="mailto:sales@reacgen.com"
              className="mt-4 inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              sales@reacgen.com
            </a>
          </div>
          <div className="rounded-xl border border-border/75 bg-card p-6 sm:p-8">
            <MessagesSquare className="size-6 text-primary" aria-hidden />
            <h2 className="mt-4 text-h3">Forum</h2>
            <p className="mt-2 text-muted-foreground">
              Best for integration questions, build logs, and comparing reactor
              setups with other users.
            </p>
            <Link
              href="/v5/forum"
              className="mt-4 inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Open the forum
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
