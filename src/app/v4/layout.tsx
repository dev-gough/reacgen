import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reacgen ODX-1 — A quiet instrument for cell density",
  description:
    "A single instrument that reads cell density inside your bioreactor, fifty times a second.",
};

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return children;
}
