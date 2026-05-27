import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { JsonLd } from "@/components/shared/jsonld"
import { PrevNext } from "@/components/docs/prev-next"
import { docsHref, findDocBySlug } from "@/content/docs-nav"
import { breadcrumbSchema } from "@/lib/schema"
import { cn } from "@/lib/utils"

export function DocsPageShell({
  slug,
  lede,
  children,
  className,
}: {
  slug: string
  lede?: string
  children: React.ReactNode
  className?: string
}) {
  const found = findDocBySlug(slug)
  if (!found) {
    // Fall back gracefully if a page passes a slug not in DOCS_NAV.
    return <article className={cn("max-w-3xl", className)}>{children}</article>
  }
  const { item } = found
  const isOverview = slug === ""

  return (
    <article className={cn("max-w-3xl", className)}>
      <JsonLd
        data={breadcrumbSchema(
          isOverview
            ? [
                { name: "Home", path: "/" },
                { name: "Docs", path: "/v5/docs" },
              ]
            : [
                { name: "Home", path: "/" },
                { name: "Docs", path: "/v5/docs" },
                { name: item.title, path: docsHref(slug) },
              ]
        )}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/v5/docs" className="hover:text-foreground">
              Docs
            </Link>
          </li>
          {!isOverview ? (
            <>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li className="text-foreground" aria-current="page">
                {item.title}
              </li>
            </>
          ) : null}
        </ol>
      </nav>

      <h1 className="mt-3 text-h1 text-balance">{item.title}</h1>
      {lede ? <p className="mt-3 text-lede">{lede}</p> : null}

      <div className="prose prose-neutral mt-8 max-w-none text-foreground">
        {children}
      </div>

      <PrevNext slug={slug} />
    </article>
  )
}
