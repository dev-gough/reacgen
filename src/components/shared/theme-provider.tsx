"use client"

import type * as React from "react"
import { ThemeProvider as LocalThemeProvider } from "@/lib/theme"

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <LocalThemeProvider>{children}</LocalThemeProvider>
}
