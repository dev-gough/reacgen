"use client"

import * as React from "react"

/**
 * Reads `prefers-reduced-motion: reduce` via useSyncExternalStore so it can
 * be used at render time without `setState`-in-effect lint violations.
 * SSR snapshot returns `false`.
 */
export function usePrefersReducedMotion(): boolean {
  return React.useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined") return () => {}
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )
}
