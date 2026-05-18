import { noopProvider } from "./noop";
import { plausibleProvider } from "./plausible";
import type { AnalyticsEvent, AnalyticsProvider } from "./types";

// Single switch point — change this (or add env-based selection) if we ever
// swap analytics providers. Document/CTA components don't care which is in use.
const provider: AnalyticsProvider =
  process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "1" ? noopProvider : plausibleProvider;

export function track(event: AnalyticsEvent) {
  provider.track(event);
}

export type { AnalyticsEvent, AnalyticsProvider, DocumentKind } from "./types";
