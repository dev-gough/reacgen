import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { docsHref, prevNext } from "@/content/docs-nav"

export function PrevNext({ slug }: { slug: string }) {
  const { prev, next } = prevNext(slug)
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Documentation pagination"
      className="mt-12 grid gap-3 border-t border-border/75 pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={docsHref(prev.slug)}
          className="group flex flex-col gap-1 rounded-lg border border-border/75 p-4 hover:border-primary/40 hover:bg-accent/30 transition-colors"
        >
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <ArrowLeft className="size-3" aria-hidden />
            Previous
          </span>
          <span className="text-base font-medium group-hover:text-primary">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Link
          href={docsHref(next.slug)}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border/75 p-4 text-right hover:border-primary/40 hover:bg-accent/30 transition-colors sm:col-start-2"
        >
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Next
            <ArrowRight className="size-3" aria-hidden />
          </span>
          <span className="text-base font-medium group-hover:text-primary">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
