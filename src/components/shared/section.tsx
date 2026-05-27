import * as React from "react"

import { cn } from "@/lib/utils"

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div"
  size?: "default" | "wide" | "narrow"
  padded?: boolean
}

export function Section({
  as: Tag = "section",
  size = "default",
  padded = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(padded && "px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full",
          size === "default" && "max-w-6xl",
          size === "wide" && "max-w-7xl",
          size === "narrow" && "max-w-3xl"
        )}
      >
        {children}
      </div>
    </Tag>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-h2 text-balance">{title}</h2>
      {description ? (
        <p className="mt-4 text-lede">{description}</p>
      ) : null}
    </div>
  )
}
