import Link from "next/link"
import { MessagesSquare, UserRound } from "lucide-react"

import { Logo } from "@/components/shared/logo"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { MobileNav } from "@/components/nav/mobile-nav"
import { buttonVariants } from "@/components/ui/button-variants"

export const NAV_LINKS = [
  { href: "/v5/products", label: "Product" },
  { href: "/v5/docs", label: "Docs" },
  { href: "/v5/faq", label: "FAQ" },
  { href: "/v5/about", label: "About" },
  { href: "/v5/contact", label: "Contact" },
  { href: "/v5/forum", label: "Forum" },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/75 bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/v5"
          aria-label="Reacgen Biosystems home"
          className="flex items-center gap-2 rounded-md"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={buttonVariants({ variant: "ghost", size: "sm", className: "h-10 px-3 text-sm font-medium" })}
            >
              {link.href === "/v5/forum" ? (
                <span className="inline-flex items-center gap-1">
                  {link.label}
                  <MessagesSquare className="size-3.5" aria-hidden />
                </span>
              ) : link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/v5/account"
            className={buttonVariants({ variant: "ghost", size: "sm", className: "hidden sm:inline-flex h-10 gap-1.5" })}
          >
            <UserRound className="size-4" aria-hidden />
            Account
          </Link>
          <Link
            href="/v5/buy"
            className={buttonVariants({ size: "sm", className: "hidden md:inline-flex h-10" })}
          >
            Buy now
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
