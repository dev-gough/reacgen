"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const SheetContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <SheetContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(SheetContext);
  return (
    <button type="button" onClick={() => ctx?.setOpen(true)} {...props}>
      {children}
    </button>
  );
}

export function SheetContent({
  className,
  side = "right",
  children,
}: React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }) {
  const ctx = React.useContext(SheetContext);
  if (!ctx?.open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-black/35"
        onClick={() => ctx.setOpen(false)}
      />
      <div
        className={cn(
          "absolute top-0 h-full overflow-y-auto border-border bg-background shadow-xl",
          side === "left" ? "left-0 border-r" : "right-0 border-l",
          className,
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
          onClick={() => ctx.setOpen(false)}
        >
          <X className="size-4" />
        </button>
        <div className="pt-12">{children}</div>
      </div>
    </div>
  );
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 pb-4", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("font-semibold", className)} {...props} />;
}
