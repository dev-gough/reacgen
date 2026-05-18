import type { AnalyticsEvent, AnalyticsProvider } from "./types";

// Plausible exposes a global `plausible(eventName, opts)` function after its
// script loads. Before that, it queues calls on `window.plausible.q` and
// flushes them once the script initializes.
//
// We define a tiny type to avoid pulling in plausible-tracker as a dep.
type PlausibleFn = (
  eventName: string,
  opts?: { props?: Record<string, string | number | boolean | undefined>; callback?: () => void },
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn & { q?: unknown[] };
  }
}

export const plausibleProvider: AnalyticsProvider = {
  ready: () => typeof window !== "undefined" && typeof window.plausible === "function",
  track: (event: AnalyticsEvent) => {
    if (typeof window === "undefined") return;
    // The script self-installs a queue at window.plausible.q, so calls made
    // before the script loads are still delivered. We just call it.
    const fn = window.plausible;
    if (typeof fn === "function") {
      fn(event.name, { props: event.props as Record<string, string | number | boolean | undefined> });
      return;
    }
    // Fallback: queue manually until the script loads.
    window.plausible =
      window.plausible ||
      (((...args: unknown[]) => {
        (window.plausible!.q = window.plausible!.q || []).push(args);
      }) as PlausibleFn);
    window.plausible(event.name, { props: event.props as Record<string, string | number | boolean | undefined> });
  },
};
