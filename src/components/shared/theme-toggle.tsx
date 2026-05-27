"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const next = theme === "dark" ? "light" : "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Switch to ${next} mode`}
      onClick={toggle}
      className="h-10 w-10"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
