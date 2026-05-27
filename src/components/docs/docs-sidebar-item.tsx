"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { docsHref, type DocsItem } from "@/content/docs-nav"

export function DocsSidebarItem({
  item,
  onSelect,
}: {
  item: DocsItem
  onSelect?: () => void
}) {
  const pathname = usePathname()
  const href = docsHref(item.slug)
  const active = pathname === href
  return (
    <Link
      href={href}
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      )}
    >
      {item.title}
    </Link>
  )
}
