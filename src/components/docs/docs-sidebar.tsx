import * as React from "react"

import { DocsSidebarItem } from "@/components/docs/docs-sidebar-item"
import { DOCS_NAV } from "@/content/docs-nav"
import { cn } from "@/lib/utils"

export function DocsSidebar({
  onSelect,
  className,
}: {
  onSelect?: () => void
  className?: string
}) {
  return (
    <nav aria-label="Documentation" className={cn("flex flex-col gap-6", className)}>
      {DOCS_NAV.map((group) => (
        <div key={group.heading}>
          <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {group.heading}
          </h3>
          <ul className="flex flex-col gap-1">
            {group.items.map((item) => (
              <li key={item.slug || "overview"}>
                <DocsSidebarItem item={item} onSelect={onSelect} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
