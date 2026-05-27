import * as React from "react"

import { SiteFooter } from "@/components/nav/site-footer"
import { SiteHeader } from "@/components/nav/site-header"

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
