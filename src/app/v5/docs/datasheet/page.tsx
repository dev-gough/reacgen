import type { Metadata } from "next"
import Link from "next/link"
import { Download, FileText } from "lucide-react"

import { DocsPageShell } from "@/components/docs/docs-page-shell"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Datasheet",
  description: "Request the full datasheet PDF for the Turbid Vision Probe.",
  path: "/v5/docs/datasheet",
})

export default function DatasheetPage() {
  return (
    <DocsPageShell
      slug="datasheet"
      lede="The datasheet PDF goes into more detail than the web docs — final electrical specs, optical envelopes, mechanical drawings, and validation curves. We send it on request so it stays up to date as the hardware finalizes."
    >
      <p>
        Email <a href="mailto:sales@reacgen.com?subject=Reacgen datasheet request">
        sales@reacgen.com</a> with your name and use case, and we&apos;ll send the
        current revision within one business hour during US business hours.
      </p>

      <div className="not-prose mt-8 flex flex-col gap-3 rounded-xl border border-border/75 bg-muted/30 p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <FileText className="size-6 text-primary" aria-hidden />
          <div>
            <p className="font-medium">Datasheet (PDF)</p>
            <p className="text-sm text-muted-foreground">
              Current draft revision · sent by email
            </p>
          </div>
        </div>
        <Link
          href="mailto:sales@reacgen.com?subject=Reacgen datasheet request"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Download className="size-4" aria-hidden />
          Request datasheet
        </Link>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Prefer to chat first? Post in the{" "}
        <a
          href="/v5/forum"
          className="underline underline-offset-2"
        >
          Reacgen forum
        </a>{" "}
        or email us directly.
      </p>
    </DocsPageShell>
  )
}
