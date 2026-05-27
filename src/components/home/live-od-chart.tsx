"use client"

import * as React from "react"
import { Activity } from "lucide-react"

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

/**
 * Animated SVG chart that loops through a simulated bioreactor OD trace.
 * - Turbid Vision line tracks the true sigmoid growth curve, climbing past OD 100.
 * - Baseline OD line follows the same curve but clamps at OD 10.
 * Honors prefers-reduced-motion by skipping animation and rendering the
 * full curve at rest.
 */

const W = 480
const H = 320
const PAD_L = 38
const PAD_R = 12
const PAD_T = 18
const PAD_B = 28

const X_MIN = 0
const X_MAX = 24 // simulated hours
const Y_MIN = 0
const Y_MAX = 110
const OD_CEILING = 10

// Sigmoid growth curve.
function odAt(t: number): number {
  const K = 100
  const r = 0.32
  const tMid = 13
  return K / (1 + Math.exp(-r * (t - tMid)))
}

function xToPx(t: number): number {
  return PAD_L + ((t - X_MIN) / (X_MAX - X_MIN)) * (W - PAD_L - PAD_R)
}

function yToPx(od: number): number {
  return PAD_T + (1 - (od - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD_T - PAD_B)
}

function buildPath(samples: { t: number; od: number }[]): string {
  if (!samples.length) return ""
  return samples
    .map((s, i) => `${i === 0 ? "M" : "L"}${xToPx(s.t).toFixed(2)},${yToPx(s.od).toFixed(2)}`)
    .join(" ")
}

const TOTAL_SAMPLES = 100
const FRAME_MS = 110 // total loop: ~11s

export function LiveOdChart() {
  const reduced = usePrefersReducedMotion()
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    if (reduced) return
    let cancelled = false
    let raf = 0
    const tick = () => {
      if (cancelled) return
      setProgress((p) => (p >= TOTAL_SAMPLES ? 0 : p + 1))
      raf = window.setTimeout(tick, FRAME_MS) as unknown as number
    }
    raf = window.setTimeout(tick, FRAME_MS) as unknown as number
    return () => {
      cancelled = true
      window.clearTimeout(raf)
    }
  }, [reduced])

  const effectiveProgress = reduced ? TOTAL_SAMPLES : progress

  // Build samples up to `effectiveProgress`
  const samples = React.useMemo(() => {
    const out: { t: number; od: number; capped: number }[] = []
    for (let i = 0; i <= effectiveProgress; i++) {
      const t = (i / TOTAL_SAMPLES) * (X_MAX - X_MIN)
      const od = odAt(t)
      out.push({ t, od, capped: Math.min(od, OD_CEILING) })
    }
    return out
  }, [effectiveProgress])

  const turbidVisionPath = buildPath(samples.map((s) => ({ t: s.t, od: s.od })))
  const stockPath = buildPath(samples.map((s) => ({ t: s.t, od: s.capped })))
  const last = samples[samples.length - 1]
  const currentTurbidVisionY = last ? yToPx(last.od) : null
  const currentStockY = last ? yToPx(last.capped) : null
  const currentX = last ? xToPx(last.t) : null

  // Y axis tick lines
  const yTicks = [0, 25, 50, 75, 100]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/75 bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <Activity className="size-3.5 text-primary" aria-hidden />
          Live demo · simulated OD trace
        </div>
        <span className="hidden sm:inline rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
          24h compressed
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full text-muted-foreground"
        role="img"
        aria-label="Animated chart: baseline OD sensor saturates at OD 10 while Turbid Vision continues climbing past OD 100"
      >
        {/* horizontal grid */}
        {yTicks.map((y) => (
          <g key={y}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={yToPx(y)}
              y2={yToPx(y)}
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeDasharray={y === 0 ? "0" : "2 4"}
            />
            <text
              x={PAD_L - 8}
              y={yToPx(y) + 4}
              textAnchor="end"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="currentColor"
            >
              {y}
            </text>
          </g>
        ))}

        {/* OD 10 ceiling marker */}
        <line
          x1={PAD_L}
          x2={W - PAD_R}
          y1={yToPx(OD_CEILING)}
          y2={yToPx(OD_CEILING)}
          stroke="oklch(65% 0.090 80)"
          strokeOpacity="0.7"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <text
          x={W - PAD_R}
          y={yToPx(OD_CEILING) - 4}
          textAnchor="end"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill="oklch(58% 0.110 80)"
        >
          stock ceiling · OD 10
        </text>

        {/* X axis label */}
        <text
          x={W - PAD_R}
          y={H - 6}
          textAnchor="end"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill="currentColor"
          opacity="0.7"
        >
          time →
        </text>
        <text
          x={PAD_L}
          y={H - 6}
          textAnchor="start"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill="currentColor"
          opacity="0.7"
        >
          OD
        </text>

        {/* baseline trace (capped) */}
        <path
          d={stockPath}
          fill="none"
          stroke="oklch(55% 0.02 250)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 4"
          opacity="0.7"
        />
        {currentStockY != null && currentX != null ? (
          <circle cx={currentX} cy={currentStockY} r="3.5" fill="oklch(55% 0.02 250)" />
        ) : null}

        {/* Turbid Vision trace */}
        <path
          d={turbidVisionPath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {currentTurbidVisionY != null && currentX != null ? (
          <g>
            <circle
              cx={currentX}
              cy={currentTurbidVisionY}
              r="6"
              fill="var(--primary)"
              opacity="0.18"
            >
              {!reduced ? (
                <animate
                  attributeName="r"
                  values="4;9;4"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              ) : null}
            </circle>
            <circle cx={currentX} cy={currentTurbidVisionY} r="4" fill="var(--primary)" />
          </g>
        ) : null}
      </svg>

      {/* legend + reading */}
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-md border border-border/75 px-2.5 py-1.5 text-xs">
          <span className="block h-0.5 w-5 rounded bg-primary" aria-hidden />
          <span className="text-muted-foreground">Turbid Vision</span>
          <span className="ml-auto font-mono nums text-foreground">
            {last ? last.od.toFixed(1) : "—"}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border/75 px-2.5 py-1.5 text-xs">
          <span
            className="block h-0.5 w-5 rounded border-t-2 border-dashed border-muted-foreground/70"
            aria-hidden
          />
          <span className="text-muted-foreground">Stock OD</span>
          <span className="ml-auto font-mono nums text-foreground">
            {last ? last.capped.toFixed(1) : "—"}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-primary/10 px-2.5 py-1.5 text-xs">
          <span className="text-muted-foreground">Headroom</span>
          <span className="ml-auto font-mono nums font-semibold text-primary">
            +{last ? (last.od - last.capped).toFixed(1) : "0"} OD
          </span>
        </div>
      </div>
    </div>
  )
}
