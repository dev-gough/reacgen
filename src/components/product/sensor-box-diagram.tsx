export function SensorBoxDiagram({ className }: { className?: string }) {
  return (
    <figure
      className={className}
      aria-label="Reacgen sensor box — dual FC fiber inputs, STEMMA QT I2C output"
    >
      <svg
        viewBox="0 0 400 200"
        className="block h-auto w-full text-muted-foreground"
        role="img"
      >
        <defs>
          <pattern
            id="sb-hatch"
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
        </defs>

        <rect width="400" height="200" fill="transparent" />

        {/* Box body */}
        <rect
          x="140"
          y="60"
          width="120"
          height="80"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <rect
          x="140"
          y="60"
          width="120"
          height="80"
          rx="3"
          fill="url(#sb-hatch)"
        />

        {/* FC Connector 1 */}
        <rect
          x="88"
          y="68"
          width="52"
          height="28"
          rx="2"
          fill="var(--card)"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <circle
          cx="114"
          cy="82"
          r="10"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />
        <circle cx="114" cy="82" r="3" fill="var(--primary)" />

        {/* FC Connector 2 */}
        <rect
          x="88"
          y="104"
          width="52"
          height="28"
          rx="2"
          fill="var(--card)"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <circle
          cx="114"
          cy="118"
          r="10"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
        />
        <circle cx="114" cy="118" r="3" fill="var(--primary)" />

        {/* STEMMA QT Connector */}
        <rect
          x="260"
          y="80"
          width="52"
          height="40"
          rx="2"
          fill="var(--card)"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        {[270, 278, 286, 294].map((x) => (
          <circle
            key={x}
            cx={x}
            cy="100"
            r="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.7"
          />
        ))}

        {/* Callout: FC ×2 */}
        <circle cx="114" cy="82" r="3.8" fill="var(--primary)" />
        <line
          x1="110"
          y1="78"
          x2="76"
          y2="36"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.75"
        />
        <circle cx="76" cy="36" r="12" fill="var(--primary)" opacity="0.16" />
        <circle cx="76" cy="36" r="10" fill="var(--primary)" />
        <text
          x="76"
          y="40"
          fontSize="10"
          fill="var(--primary-foreground)"
          textAnchor="middle"
          fontWeight="600"
        >
          01
        </text>
        <text x="60" y="36" fontSize="11" fill="currentColor" textAnchor="end">
          FC ×2
        </text>

        {/* Callout: STEMMA QT */}
        <circle cx="286" cy="100" r="3.8" fill="var(--primary)" />
        <line
          x1="290"
          y1="96"
          x2="324" y2="36"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.75"
        />
        <circle cx="324" cy="36" r="12" fill="var(--primary)" opacity="0.16" />
        <circle cx="324" cy="36" r="10" fill="var(--primary)" />
        <text
          x="324"
          y="40"
          fontSize="10"
          fill="var(--primary-foreground)"
          textAnchor="middle"
          fontWeight="600"
        >
          02
        </text>
        <text
          x="340"
          y="36"
          fontSize="11"
          fill="currentColor"
          textAnchor="start"
        >
          STEMMA QT
        </text>

        {/* Dimension marks */}
        <line
          x1="140"
          y1="170"
          x2="260"
          y2="170"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <line
          x1="140"
          y1="163"
          x2="140"
          y2="177"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <line
          x1="260"
          y1="163"
          x2="260"
          y2="177"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <text
          x="200"
          y="190"
          fontSize="11"
          fill="currentColor"
          textAnchor="middle"
          letterSpacing="2"
        >
          sensor box
        </text>
      </svg>
    </figure>
  )
}
