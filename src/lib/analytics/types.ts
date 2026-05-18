// A discriminated union of every analytics event the app emits.
// New events should be added here so call sites are type-checked.

export type DocumentKind = "datasheet" | "manual" | "whitepaper" | "appnote" | "other";

export type AnalyticsEvent =
  | { name: "Document View"; props: { id: string; kind: DocumentKind; title: string; format?: string; version?: string } }
  | { name: "Document Download"; props: { id: string; kind: DocumentKind; title: string; format?: string; version?: string } }
  | { name: "CTA Click"; props: { id: string; location: string; href?: string } }
  | { name: "Whitelist Submit"; props: { batchSlug: string; result: "success" | "duplicate" | "error" } }
  | { name: "Outbound Link"; props: { href: string; location?: string } };

export type AnalyticsProvider = {
  track: (event: AnalyticsEvent) => void;
  ready: () => boolean;
};
