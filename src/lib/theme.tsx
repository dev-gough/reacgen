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
// Variant palettes. Each variant exposes a typed palette and a hook that
// returns the right side based on the current theme. The shapes don't share
// a base interface on purpose — every variant has its own semantic vocabulary
// (v1 talks about "paper" and "ink", v3 talks about "card" and "highlight"),
// and forcing a common shape would muddy that.
// ---------------------------------------------------------------------------

export type V1Palette = {
  bg: string;
  ink: string;
  green: string;
  inkMuted: string;
  inkHair: string;
  inkHairSoft: string;
  inverseBg: string;
  inverseInk: string;
  inverseInkSoft: string;
  inverseBgWash: string;
  grainColor: string;
  grainBlend: "multiply" | "screen";
};

const V1_LIGHT: V1Palette = {
  bg: "#F3EDE0",
  ink: "#1A1814",
  green: "#2E7D5B",
  inkMuted: "rgba(26,24,20,0.4)",
  inkHair: "rgba(26,24,20,0.25)",
  inkHairSoft: "rgba(26,24,20,0.15)",
  inverseBg: "#0a0908",
  inverseInk: "#F3EDE0",
  inverseInkSoft: "rgba(243,237,224,0.6)",
  inverseBgWash: "rgba(243,237,224,0.04)",
  grainColor: "#1A1814",
  grainBlend: "multiply",
};

const V1_DARK: V1Palette = {
  bg: "#14110C",
  ink: "#E8DFCB",
  green: "#5FB088",
  inkMuted: "rgba(232,223,203,0.4)",
  inkHair: "rgba(232,223,203,0.25)",
  inkHairSoft: "rgba(232,223,203,0.15)",
  inverseBg: "#E8DFCB",
  inverseInk: "#14110C",
  inverseInkSoft: "rgba(20,17,12,0.6)",
  inverseBgWash: "rgba(20,17,12,0.04)",
  grainColor: "#E8DFCB",
  grainBlend: "screen",
};

export function useV1Palette(): V1Palette {
  const { theme } = useTheme();
  return theme === "dark" ? V1_DARK : V1_LIGHT;
}

export type V2Palette = {
  bg: string;
  panel: string;
  grid: string;
  text: string;
  muted: string;
  brand: string;
  hot: string;
  warn: string;
  deepBg: string;
  forestBg: string;
  textHair: string;
  textBody: string;
  brandSoft: string;
};

const V2_LIGHT: V2Palette = {
  bg: "#F4F6F7",
  panel: "#FFFFFF",
  grid: "#DCE3E8",
  text: "#14181B",
  muted: "#6B7780",
  brand: "#1E7A52",
  hot: "#0FA362",
  warn: "#B8741C",
  deepBg: "#E6ECEF",
  forestBg: "#EAF2EC",
  textHair: "rgba(20,24,27,0.7)",
  textBody: "rgba(20,24,27,0.78)",
  brandSoft: "rgba(30,122,82,0.12)",
};

const V2_DARK: V2Palette = {
  bg: "#06080A",
  panel: "#0C1014",
  grid: "#1A2128",
  text: "#D4DDE0",
  muted: "#5A6770",
  brand: "#3DA478",
  hot: "#7CFFAE",
  warn: "#F4B860",
  deepBg: "#0a0d11",
  forestBg: "#0A1410",
  textHair: "rgba(212,221,224,0.7)",
  textBody: "rgba(212,221,224,0.78)",
  brandSoft: "rgba(61,164,120,0.18)",
};

export function useV2Palette(): V2Palette {
  const { theme } = useTheme();
  return theme === "dark" ? V2_DARK : V2_LIGHT;
}

export type V3Palette = {
  bg: string;
  ink: string;
  hair: string;
  hairSoft: string;
  card: string;
  cardWarm: string;
  cardCool: string;
  soft: string;
  brand: string;
  highlight: string;
  inkHair: string;
  bgWash: string;
  bgWashStrong: string;
  bgWashSoft: string;
  highlightSoft: string;
  brandWash: string;
  brandSoft: string;
};

const V3_LIGHT: V3Palette = {
  bg: "#F4F8FC",
  ink: "#0B1F33",
  hair: "#DBE6F1",
  hairSoft: "#C9DCEE",
  card: "#FFFFFF",
  cardWarm: "#F0F6FC",
  cardCool: "#E8F1FA",
  soft: "#5D7892",
  brand: "#2F7FB8",
  highlight: "#FFE45A",
  inkHair: "rgba(11,31,51,0.12)",
  bgWash: "rgba(244,248,252,0.04)",
  bgWashStrong: "rgba(244,248,252,0.2)",
  bgWashSoft: "rgba(244,248,252,0.8)",
  highlightSoft: "rgba(255,228,90,0.95)",
  brandWash: "rgba(47,127,184,0.08)",
  brandSoft: "rgba(47,127,184,0.5)",
};

const V3_DARK: V3Palette = {
  bg: "#0A1622",
  ink: "#E8EEF6",
  hair: "#1F2D3F",
  hairSoft: "#16212F",
  card: "#11202E",
  cardWarm: "#162536",
  cardCool: "#192B3F",
  soft: "#7E92A8",
  brand: "#5AAEE0",
  highlight: "#F0D247",
  inkHair: "rgba(232,238,246,0.12)",
  bgWash: "rgba(10,22,34,0.04)",
  bgWashStrong: "rgba(10,22,34,0.2)",
  bgWashSoft: "rgba(10,22,34,0.8)",
  highlightSoft: "rgba(240,210,71,0.95)",
  brandWash: "rgba(90,174,224,0.08)",
  brandSoft: "rgba(90,174,224,0.5)",
};

export function useV3Palette(): V3Palette {
  const { theme } = useTheme();
  return theme === "dark" ? V3_DARK : V3_LIGHT;
}

export type V4Palette = {
  bg: string;
  light: string;
  ink: string;
  inkSoft: string;
  hair: string;
};

const V4_LIGHT: V4Palette = {
  bg: "#EFE7D6",
  light: "#F4EDDD",
  ink: "#2C2218",
  inkSoft: "#74634F",
  hair: "#D7CDB9",
};

// Warm dark — espresso, not jet — to preserve v4's quiet sand-paper mood.
const V4_DARK: V4Palette = {
  bg: "#1F1A14",
  light: "#2A241D",
  ink: "#EFE7D6",
  inkSoft: "#B5A88E",
  hair: "#3E342A",
};

export function useV4Palette(): V4Palette {
  const { theme } = useTheme();
  return theme === "dark" ? V4_DARK : V4_LIGHT;
}

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
  logoPlate: string;
  logoPlateBorder: string;
  shadow: string;
  /** Hover-state for nav links — same as ink in light, brand in dark. */
  navHover: string;
};

const V5_LIGHT: V5Palette = {
  bg: "#F2F7F4",
  ink: "#10251E",
  hair: "#CADBD1",
  soft: "#5E746B",
  brand: "#409974",
  highlight: "#CDEBDD",
  onHighlight: "#10251E",
  card: "#FBFCFA",
  warn: "#B9852C",
  readoutFrom: "#FBFCFA",
  readoutTo: "#E5F0EA",
  bannerBg: "#10251E",
  bannerFg: "#F2F7F4",
  recordingBg: "rgba(64,153,116,0.14)",
  recordingFg: "#276F53",
  ctaBg: "#0F2A21",
  ctaFg: "#F2F7F4",
  ctaSubtleBorder: "rgba(242,247,244,0.22)",
  ctaSubtleBg: "rgba(242,247,244,0.05)",
  logoPlate: "rgba(255,255,255,0.86)",
  logoPlateBorder: "rgba(64,153,116,0.18)",
  shadow: "rgba(31,84,63,0.16)",
  navHover: "#409974",
};

const V5_DARK: V5Palette = {
  bg: "#081511",
  ink: "#EAF4EF",
  hair: "#1C332B",
  soft: "#93A79F",
  brand: "#409974",
  highlight: "#8DD8B9",
  onHighlight: "#07120F",
  card: "#10201A",
  warn: "#D9A348",
  readoutFrom: "#132820",
  readoutTo: "#081511",
  bannerBg: "#050D0A",
  bannerFg: "#EAF4EF",
  recordingBg: "rgba(64,153,116,0.18)",
  recordingFg: "#8DD8B9",
  ctaBg: "#10251E",
  ctaFg: "#EAF4EF",
  ctaSubtleBorder: "rgba(234,244,239,0.18)",
  ctaSubtleBg: "rgba(234,244,239,0.05)",
  logoPlate: "rgba(255,255,255,0.92)",
  logoPlateBorder: "rgba(141,216,185,0.24)",
  shadow: "rgba(0,0,0,0.34)",
  navHover: "#8DD8B9",
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
