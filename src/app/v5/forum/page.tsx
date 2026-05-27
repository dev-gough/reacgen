import type { Metadata } from "next"
import Link from "next/link"
import { MessageCircle, Pin } from "lucide-react"

import { Section, SectionHeading } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Forum",
  description:
    "Reacgen forum placeholder for Turbid Vision Probe integration questions, build notes, and support threads.",
  path: "/v5/forum",
})

const THREADS = [
  {
    title: "Turbid Vision Probe integration notes",
    tag: "Pinned",
    body: "Wiring, host software, and calibration notes for early builds.",
  },
  {
    title: "Reactor adapter examples",
    tag: "Builds",
    body: "Share photos, drawings, and fit notes for top-mounted installations.",
  },
  {
    title: "Calibration data and organisms",
    tag: "Data",
    body: "Compare OD to g/L fits for yeast, bacteria, cell culture, and suspended solids.",
  },
] as const

export default function ForumPage() {
  return (
    <Section className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="Forum"
        title="Reacgen forum"
        description="The standalone forum is not live yet. This page keeps the v5 navigation working locally and gives us a place to route community/support traffic."
      />

      <div className="mt-10 grid gap-4">
        {THREADS.map((thread, i) => (
          <article
            key={thread.title}
            className="rounded-xl border border-border/75 bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-start gap-3">
              {i === 0 ? (
                <Pin className="mt-1 size-5 text-primary" aria-hidden />
              ) : (
                <MessageCircle className="mt-1 size-5 text-primary" aria-hidden />
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {thread.tag}
                </p>
                <h2 className="mt-1 text-lg font-semibold">{thread.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{thread.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <a href="mailto:sales@reacgen.com">Email Reacgen</a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/v5/docs">Read the docs</Link>
        </Button>
      </div>
    </Section>
  )
}
