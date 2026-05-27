"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/shared/logo"
import { NAV_LINKS } from "@/components/nav/site-header"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const close = React.useCallback(() => setOpen(false), [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "md:hidden h-11 w-11"
        )}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-base">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav
          aria-label="Mobile"
          className="mt-2 flex flex-col gap-1 px-4 pb-6"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="rounded-md px-3 py-3 text-base font-medium hover:bg-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 grid gap-2">
            <Button asChild variant="outline" className="h-11" onClick={close}>
              <Link href="/v5/account">Account</Link>
            </Button>
            <Button asChild className="h-11" onClick={close}>
              <Link href="/v5/buy">Buy now</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
