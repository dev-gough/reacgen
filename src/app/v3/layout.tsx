import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reacgen ODX-1 — Continuous optical density, on every reactor",
  description:
    "Plug-in optical density for bioreactors. Real-time OD at 50 Hz, no sampling, no drift. Ships from San Francisco.",
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return children;
}
