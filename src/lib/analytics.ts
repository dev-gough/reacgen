import type { AnalyticsEvent, AnalyticsProvider, DocumentKind } from "./analytics/types"

type EventProps = Record<string, string | number | boolean | undefined>

export function track(event: string | AnalyticsEvent, props?: EventProps) {
  if (typeof window === "undefined") return
  const name = typeof event === "string" ? event : event.name
  const eventProps = typeof event === "string" ? props : event.props
  const plausible = (window as unknown as {
    plausible?: (event: string, options?: { props?: EventProps }) => void
  }).plausible
  try {
    plausible?.(name, eventProps ? { props: eventProps } : undefined)
  } catch {
    // analytics failures must never break the UI
  }
}

export type { AnalyticsEvent, AnalyticsProvider, DocumentKind }
