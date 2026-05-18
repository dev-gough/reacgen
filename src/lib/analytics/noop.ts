import type { AnalyticsEvent, AnalyticsProvider } from "./types";

// Used in tests and when NEXT_PUBLIC_ANALYTICS_DISABLED=1. Drops events,
// optionally logs them in dev so you can see what would have been tracked.
export const noopProvider: AnalyticsProvider = {
  ready: () => true,
  track: (event: AnalyticsEvent) => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.debug("[analytics:noop]", event.name, event.props);
    }
  },
};
