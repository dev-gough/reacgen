"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

/**
 * Fades + lifts its children into view when they intersect the viewport.
 * - Stagger via the `delay` prop (ms).
 * - Honors `prefers-reduced-motion`: renders at rest with no animation.
 * - Fires once; does not re-animate on scroll out.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: "div" | "li" | "section" | "article"
}) {
  const reduced = usePrefersReducedMotion()
  const ref = React.useRef<HTMLElement | null>(null)
  const [intersected, setIntersected] = React.useState(false)

  React.useEffect(() => {
    if (reduced) return
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIntersected(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [reduced])

  const shown = reduced || intersected

  const Component = Tag as React.ElementType
  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
    >
      {children}
    </Component>
  )
}
