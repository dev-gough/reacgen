import Image from "next/image"
import type * as React from "react"
import { cn } from "@/lib/utils"

type LogoProps = React.HTMLAttributes<HTMLSpanElement> & {
  withWordmark?: boolean
}

export function LogoMark({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border",
        className,
      )}
      {...props}
    >
      <Image src="/logo-mark.png" alt="Reacgen Biosystems" width={24} height={24} />
    </span>
  )
}

export function Logo({ withWordmark = true, className, ...props }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} {...props}>
      {withWordmark ? (
        <Image
          src="/logo-horizontal.png"
          alt="Reacgen Biosystems"
          width={268}
          height={88}
          className="h-10 w-auto"
          priority
        />
      ) : (
        <LogoMark />
      )}
    </span>
  )
}
