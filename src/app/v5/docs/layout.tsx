import * as React from "react"

import { Section } from "@/components/shared/section"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsMobileNav } from "@/components/docs/docs-mobile-nav"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Section size="wide" className="py-10 sm:py-14">
      <div className="grid gap-10 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden md:block">
          <div className="sticky top-20 max-h-[calc(100dvh-6rem)] overflow-y-auto pr-2">
            <DocsSidebar />
          </div>
        </aside>
        <div className="min-w-0">
          <DocsMobileNav className="mb-6 md:hidden" />
          {children}
        </div>
      </div>
    </Section>
  )
}
