import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "outline"
          ? "border border-border bg-background"
          : variant === "secondary"
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}
