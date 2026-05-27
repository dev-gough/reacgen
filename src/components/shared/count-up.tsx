"use client"

import * as React from "react"

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

/**
 * Lightweight count-up that fires once when the element enters the viewport.
 * Honors prefers-reduced-motion (renders final value immediately).
 *
 * Use for small numeric flourishes — keep `to` modest and `durationMs` short
 * so it reads as polish, not as a stunt.
 */
export function CountUp({
  to,
  durationMs = 1200,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number
  durationMs?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = React.useState(0)
  const startedRef = React.useRef(false)

  React.useEffect(() => {
    if (reduced) return
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            io.disconnect()
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / durationMs)
              const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
              setValue(to * eased)
              if (t < 1) requestAnimationFrame(tick)
              else setValue(to)
            }
            requestAnimationFrame(tick)
            break
          }
        }
      },
      { threshold: 0.4 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [to, durationMs, reduced])

  const display = reduced ? to : value

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}
