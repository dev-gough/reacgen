"use client"

import * as React from "react"
import { BookOpen, Menu } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { cn } from "@/lib/utils"

export function DocsMobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-10 px-4 text-sm font-medium"
          )}
          aria-label="Open documentation menu"
        >
          <Menu className="size-4" aria-hidden />
          Browse docs
        </SheetTrigger>
        <SheetContent side="left" className="w-72 sm:w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-base">
              <BookOpen className="size-5 text-primary" aria-hidden />
              Documentation
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 max-h-[calc(100dvh-7rem)] overflow-y-auto px-2 pb-8">
            <DocsSidebar onSelect={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
