import { Cable, FlaskConical } from "lucide-react"

import { ProbeDiagram } from "@/components/product/probe-diagram"

export function ProductGallery() {
  return (
    <div className="grid gap-4">
      <div className="overflow-hidden rounded-2xl border border-border/75 bg-gradient-to-br from-card to-muted/50 p-4 sm:p-6">
        <ProbeDiagram />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ContextCard
          icon={Cable}
          eyebrow="Connection"
          title="One Stemma QT cable"
          body="3.3 V power + I2C signal share the same JST-SH connector, with adapter harnesses for common host boards."
        />
        <ContextCard
          icon={FlaskConical}
          eyebrow="In the box"
          title="Probe + adapter + cal kit"
          body="Reactor adapter, cable, two-point calibration standard, and a quickstart card."
        />
      </div>
    </div>
  )
}

function ContextCard({
  icon: Icon,
  eyebrow,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="rounded-xl border border-border/75 bg-card p-5">
      <Icon className="size-5 text-primary" aria-hidden />
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
      </p>
      <h3 className="mt-1 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  )
}
