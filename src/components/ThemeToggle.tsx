"use client";

import type { CSSProperties } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export interface ThemeToggleProps {
  /** Lucide icon size in px (default 14). */
  size?: number;
  /** Tailwind / utility classes for the button element. */
  className?: string;
  /** Inline style merged onto the button. */
  style?: CSSProperties;
  /** Optional short label shown next to the icon (e.g. "Theme"). */
  label?: string;
  /** Stroke width passed through to the Lucide icon. Default 1.75. */
  strokeWidth?: number;
}

/**
 * Compact light/dark toggle. Renders Moon when in light mode (i.e. clicking
 * switches to dark) and Sun in dark mode. Visual chrome is delegated entirely
 * to the caller via `className` + `style` so each variant header can adopt
 * its own typographic and color vocabulary.
 */
export function ThemeToggle({
  size = 14,
  className,
  style,
  label,
  strokeWidth = 1.75,
}: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;
  const aria = isDark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={aria}
      title={aria}
      className={className}
      style={style}
    >
      <Icon size={size} strokeWidth={strokeWidth} />
      {label ? <span>{label}</span> : null}
    </button>
  );
}
