import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reacgen ODX-1 — In-situ Optical Density",
  description:
    "An in-situ optical density sensor for bioprocess monitoring. Volume I, Issue 01.",
};

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return children;
}
