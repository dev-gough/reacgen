const CALLOUTS = [
  { n: "01", label: "Probe tip thingy", x: 150, y: 78, lx: 112, ly: 72 },
] as const

export function ProbeDiagram({ className }: { className?: string }) {
  return (
    <figure className={className} aria-label="Turbid Vision Probe vertical cross-section">
      <svg
        viewBox="0 0 320 680"
        className="block h-auto w-full text-muted-foreground"
        role="img"
      >
        <defs>
          <pattern
            id="rg-vertical-hatch"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="7"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.28"
            />
          </pattern>
          <radialGradient id="rg-window-glow" cx="0.5" cy="0.5" r="0.55">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.7" />
            <stop offset="65%" stopColor="var(--primary)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="320" height="680" fill="transparent" />

        {/* probe body */}
        <rect
          x="136"
          y="130"
          width="28"
          height="360"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <rect x="136" y="130" width="28" height="360" fill="url(#rg-vertical-hatch)" />

        {/* tip / sapphire window */}
        <path
          d="M136,130 L144,72 L156,72 L164,130 Z"
          fill="var(--card)"
          stroke="var(--primary)"
          strokeWidth="1.8"
        />
        <ellipse cx="150" cy="72" rx="9" ry="4" fill="url(#rg-window-glow)" />
        <line
          x1="144"
          y1="72"
          x2="156"
          y2="72"
          stroke="var(--primary)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* internal optics path */}
        <line
          x1="145"
          y1="88"
          x2="145"
          y2="565"
          stroke="var(--primary)"
          strokeWidth="0.9"
          strokeDasharray="4 4"
        />
        <line
          x1="155"
          y1="88"
          x2="155"
          y2="565"
          stroke="var(--primary)"
          strokeWidth="0.9"
          strokeDasharray="4 4"
        />

        {/* sealed transmitter */}
        <rect
          x="120"
          y="490"
          width="60"
          height="120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <rect x="120" y="490" width="60" height="120" fill="url(#rg-vertical-hatch)" />

        {/* M12 connector */}
        <circle cx="150" cy="650" r="14" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <line x1="150" y1="610" x2="150" y2="636" stroke="currentColor" strokeWidth="1.1" />

        {/* callout lines + dots */}
        {CALLOUTS.map((c) => (
          <g key={c.n}>
            <circle cx={c.x} cy={c.y} r="3.8" fill="var(--primary)" />
            <line
              x1={c.x}
              y1={c.y}
              x2={c.lx}
              y2={c.ly}
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.75"
            />
            <circle cx={c.lx} cy={c.ly} r="12" fill="var(--primary)" opacity="0.16" />
            <circle cx={c.lx} cy={c.ly} r="10" fill="var(--primary)" />
            <text
              x={c.lx}
              y={c.ly + 4}
              fontSize="10"
              fill="var(--primary-foreground)"
              textAnchor="middle"
              fontWeight="600"
            >
              {c.n}
            </text>
            <text
              x={c.lx < 160 ? c.lx - 18 : c.lx + 18}
              y={c.ly + 4}
              fontSize="11"
              fill="currentColor"
              textAnchor={c.lx < 160 ? "end" : "start"}
            >
              {c.label}
            </text>
          </g>
        ))}

        {/* dimension marks */}
        <line x1="250" y1="72" x2="250" y2="650" stroke="currentColor" strokeWidth="0.7" />
        <line x1="242" y1="72" x2="258" y2="72" stroke="currentColor" strokeWidth="0.7" />
        <line x1="242" y1="650" x2="258" y2="650" stroke="currentColor" strokeWidth="0.7" />
        <text
          x="270"
          y="365"
          fontSize="11"
          fill="currentColor"
          textAnchor="middle"
          letterSpacing="2"
          transform="rotate(90 270 365)"
        >
          318 mm overall
        </text>
      </svg>
    </figure>
  )
}
