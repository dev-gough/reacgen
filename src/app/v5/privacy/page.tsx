import type { Metadata } from "next"

import { Section } from "@/components/shared/section"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: "How Reacgen Biosystems handles personal data on its website.",
  path: "/v5/privacy",
})

export default function PrivacyPage() {
  return (
    <Section className="py-12 sm:py-16">
      <article className="prose prose-neutral mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Legal
        </p>
        <h1 className="mt-3 text-h1">Privacy policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This policy is a plain-language overview. Final terms should be reviewed by counsel before production.
        </p>

        <Block title="What we collect">
          <p>
            When you contact us or place an order, we collect the
            information you provide (name, work email, company, country,
            application, quantity, shipping address, phone). For orders, payment
            information is handled by Stripe and never touches our servers.
          </p>
        </Block>

        <Block title="What we do with it">
          <p>
            We use this information to fulfill orders, reply to sales inquiries,
            ship products, and follow up on technical support. We do not sell or
            rent customer information to third parties.
          </p>
        </Block>

        <Block title="Analytics">
          <p>
            We use privacy-respecting analytics (Plausible) that do not set
            tracking cookies or persistently identify visitors. We also use
            Vercel Speed Insights to monitor site performance. No personal data
            is shared with advertising networks.
          </p>
        </Block>

        <Block title="Cookies">
          <p>
            We use a small number of essential cookies (e.g. theme preference,
            cart state during Stripe checkout). We do not use advertising or
            cross-site tracking cookies.
          </p>
        </Block>

        <Block title="Data retention">
          <p>
            Order records are retained for as long as required by tax and
            commercial law. Sales inquiries are kept in our sales inbox for as
            long as the conversation is active. You can request deletion at any
            time by emailing sales@reacgen.com.
          </p>
        </Block>

        <Block title="Your rights">
          <p>
            If you are in the EU, UK, or California, you have the right to
            access, correct, or delete personal data we hold about you. Email
            sales@reacgen.com and we will respond within 30 days.
          </p>
        </Block>

        <Block title="Contact">
          <p>
            Questions about this policy go to{" "}
            <a href="mailto:sales@reacgen.com" className="text-primary underline">
              sales@reacgen.com
            </a>
            .
          </p>
        </Block>
      </article>
    </Section>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-h3">{title}</h2>
      <div className="mt-3 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  )
}
