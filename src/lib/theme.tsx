"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = "reacgen-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // SSR + first paint default. The inline script in <head> sets
  // document.documentElement.dataset.theme before hydration, so visual flash is
  // already avoided. We just sync React state from the DOM on mount.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme | undefined;
    if (current === "dark" || current === "light") {
      setThemeState(current);
    } else {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
        const initial = stored === "dark" ? "dark" : "light";
        setThemeState(initial);
        document.documentElement.dataset.theme = initial;
      } catch {
        /* localStorage unavailable — stick with light. */
      }
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, toggle, setTheme }),
    [theme, toggle, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// ---------------------------------------------------------------------------
// v5 palette. Other variants don't react to the theme yet — they still ship a
// toggle in the header but render with their own fixed palette. Once the v5
// dark mode lands and we like the result, the other variants will get their
// own dark passes and join this file.
// ---------------------------------------------------------------------------

export type V5Palette = {
  bg: string;
  ink: string;
  hair: string;
  soft: string;
  brand: string;
  highlight: string;
  /** Foreground when laid on top of `highlight` — always dark, since the
   *  highlight is yellow in both modes and needs the same readable contrast. */
  onHighlight: string;
  card: string;
  warn: string;
  /** Readout card gradient endpoints. */
  readoutFrom: string;
  readoutTo: string;
  /** Top announcement strip. */
  bannerBg: string;
  bannerFg: string;
  /** "Recording" pill on the readout. */
  recordingBg: string;
  recordingFg: string;
  /** Dark CTA card. */
  ctaBg: string;
  ctaFg: string;
  ctaSubtleBorder: string;
  ctaSubtleBg: string;
  /** Hover-state for nav links — same as ink in light, brand in dark. */
  navHover: string;
};

const V5_LIGHT: V5Palette = {
  bg: "#ECF2F8",
  ink: "#0B1F33",
  hair: "#CFDCE9",
  soft: "#5D7892",
  brand: "#2A74A8",
  highlight: "#F0D247",
  onHighlight: "#0B1F33",
  card: "#F6F9FC",
  warn: "#D98E1B",
  readoutFrom: "#F6F9FC",
  readoutTo: "#E2ECF5",
  bannerBg: "#0B1F33",
  bannerFg: "#ECF2F8",
  recordingBg: "rgba(15,110,59,0.10)",
  recordingFg: "#0F6E3B",
  ctaBg: "#0B1F33",
  ctaFg: "#ECF2F8",
  ctaSubtleBorder: "rgba(236,242,248,0.22)",
  ctaSubtleBg: "rgba(236,242,248,0.04)",
  navHover: "#0B1F33",
};

const V5_DARK: V5Palette = {
  bg: "#0A1622",
  ink: "#E6EEF6",
  hair: "#1F2D3F",
  soft: "#7E92A8",
  brand: "#5AAEE0",
  highlight: "#F0D247",
  onHighlight: "#0B1F33",
  card: "#111C2A",
  warn: "#E8A036",
  readoutFrom: "#142231",
  readoutTo: "#0A1622",
  bannerBg: "#050B14",
  bannerFg: "#E6EEF6",
  recordingBg: "rgba(74,222,128,0.14)",
  recordingFg: "#4ADE80",
  ctaBg: "#1A2A3E",
  ctaFg: "#E6EEF6",
  ctaSubtleBorder: "rgba(230,238,246,0.18)",
  ctaSubtleBg: "rgba(230,238,246,0.04)",
  navHover: "#E6EEF6",
};

export function useV5Palette(): V5Palette {
  const { theme } = useTheme();
  return theme === "dark" ? V5_DARK : V5_LIGHT;
}

// Inline script injected before React hydrates. Reads localStorage and sets
// the `data-theme` attribute on <html> so the first paint already matches the
// user's saved preference — no flash of the wrong palette.
export const themeBootstrapScript = `
try {
  var t = localStorage.getItem("${STORAGE_KEY}");
  if (t === "dark" || t === "light") document.documentElement.dataset.theme = t;
} catch (e) {}
`.trim();
