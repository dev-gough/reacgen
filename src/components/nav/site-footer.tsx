import Link from "next/link"

import { Logo } from "@/components/shared/logo"

const COLS = [
  {
    heading: "Product",
    links: [
      { href: "/v5/products", label: "Sensor overview" },
      { href: "/v5/buy", label: "Buy" },
      { href: "/v5/docs", label: "Documentation" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/v5/about", label: "About" },
      { href: "/v5/faq", label: "FAQ" },
      { href: "/v5/contact", label: "Contact" },
      { href: "/v5/shipping-returns", label: "Shipping & returns" },
    ],
  },
  {
    heading: "Community",
    links: [
      { href: "/v5/forum", label: "Reacgen forum" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/v5/privacy", label: "Privacy" },
      { href: "/v5/terms", label: "Terms of sale" },
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/75 bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-3 lg:col-span-1">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-xs">
            Optical-density probes for fermentation, cell culture, and suspended solids.
          </p>
          <p className="text-xs text-muted-foreground">
            <a href="mailto:sales@reacgen.com" className="hover:text-foreground">
              sales@reacgen.com
            </a>
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.heading}>
            <h3 className="text-sm font-semibold mb-3">{col.heading}</h3>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/75">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Reacgen Biosystems, Inc. All rights reserved.</p>
          <p>Built for labs that need biomass readings in the reactor.</p>
        </div>
      </div>
    </footer>
  )
}
