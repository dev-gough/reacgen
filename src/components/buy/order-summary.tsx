"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { track } from "@/lib/analytics"

type OrderPayload = {
  status: "complete"
  orderId: string
  email: string | null
  name: string | null
  total: number
  currency: string
  shippingCity: string | null
  shippingCountry: string | null
  items: { description: string | null; quantity: number; amountSubtotal: number }[]
}

export function OrderSummary() {
  const params = useSearchParams()
  const sessionId = params.get("session_id")
  const [data, setData] = React.useState<OrderPayload | null>(null)
  const [fetchError, setFetchError] = React.useState<string | null>(null)
  const trackedRef = React.useRef(false)

  React.useEffect(() => {
    if (!sessionId) return
    let cancelled = false
    async function run() {
      try {
        const res = await fetch(`/api/order/${sessionId}`, { cache: "no-store" })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body?.error ?? "Order lookup failed")
        }
        const payload = (await res.json()) as OrderPayload
        if (cancelled) return
        setData(payload)
        if (payload.status === "complete" && !trackedRef.current) {
          trackedRef.current = true
          track("purchase_completed", {
            qty: payload.items.reduce((sum, i) => sum + i.quantity, 0),
            total: payload.total / 100,
          })
        }
      } catch (e) {
        if (!cancelled) setFetchError(e instanceof Error ? e.message : "Order lookup failed")
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [sessionId])

  const error = !sessionId ? "Missing order reference." : fetchError

  if (error) {
    return (
      <div className="rounded-xl border border-border/75 bg-card p-8">
        <h1 className="text-h2">We couldn&apos;t find your order</h1>
        <p className="mt-3 text-muted-foreground">{error}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          If you were charged, your confirmation email is on the way. You can also
          email{" "}
          <a href="mailto:sales@reacgen.com" className="underline">
            sales@reacgen.com
          </a>{" "}
          and we&apos;ll sort it out.
        </p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="grid gap-4 rounded-xl border border-border/75 bg-card p-8">
        <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-32" />
      </div>
    )
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: data.currency,
  })

  return (
    <div className="rounded-xl border border-border/75 bg-card p-8">
      <div className="flex items-center gap-3 text-primary">
        <CheckCircle2 className="size-6" aria-hidden />
        <p className="text-sm font-semibold uppercase tracking-[0.18em]">Order confirmed</p>
      </div>
      <h1 className="mt-3 text-h2">Thank you{data.name ? `, ${data.name}` : ""}.</h1>
      <p className="mt-3 text-muted-foreground">
        We&apos;ve sent a confirmation to{" "}
        <span className="text-foreground font-medium">{data.email ?? "your email"}</span>.
        Your sensor ships within two business days; the tracking number lands in the
        same inbox.
      </p>
      <dl className="mt-6 grid gap-3 text-sm">
        <div className="flex justify-between border-b border-border/75 pb-2">
          <dt className="text-muted-foreground">Order #</dt>
          <dd className="font-mono nums">{data.orderId}</dd>
        </div>
        {data.items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <dt className="text-muted-foreground">
              {item.description ?? "Item"} × {item.quantity}
            </dt>
            <dd className="font-mono nums">{formatter.format(item.amountSubtotal / 100)}</dd>
          </div>
        ))}
        <div className="flex justify-between border-t border-border/75 pt-2 font-medium">
          <dt>Total</dt>
          <dd className="font-mono nums">{formatter.format(data.total / 100)}</dd>
        </div>
        {data.shippingCity ? (
          <div className="text-xs text-muted-foreground">
            Shipping to {data.shippingCity}
            {data.shippingCountry ? `, ${data.shippingCountry}` : ""}.
          </div>
        ) : null}
      </dl>
      <div className="mt-8 grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          While you wait
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Button asChild variant="outline" className="h-11">
            <Link href="/v5/docs/quickstart">Read the quickstart</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <Link href="/v5/forum">Join the forum</Link>
          </Button>
          <Button asChild variant="outline" className="h-11">
            <a href="mailto:sales@reacgen.com">Email support</a>
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Tracking number ships to <span className="text-foreground">{data.email ?? "your email"}</span>{" "}
          when the parcel leaves our facility (typically within 2 business days).
        </p>
      </div>
    </div>
  )
}
