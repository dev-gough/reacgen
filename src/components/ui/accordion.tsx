import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("divide-y divide-border", className)} {...props} />;
}

export function AccordionItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDetailsElement> & { value?: string }) {
  return <details className={cn("group", className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <summary
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
    </summary>
  );
}

export function AccordionContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}
