"use client"

import * as React from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createCheckoutSession, type CheckoutState } from "@/app/v5/buy/actions"
import { track } from "@/lib/analytics"
import { PRODUCT } from "@/lib/product"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" className="h-12 w-full" disabled={pending}>
      <ShoppingCart className="size-4" aria-hidden />
      {pending ? "Redirecting to Stripe..." : "Continue to checkout"}
    </Button>
  )
}

export function BuyForm({ unitPrice }: { unitPrice: number }) {
  const [qty, setQty] = React.useState(1)
  const [, formAction] = useActionState<CheckoutState | undefined, FormData>(
    createCheckoutSession,
    undefined
  )

  const total = qty * unitPrice
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: PRODUCT.currency,
    maximumFractionDigits: 0,
  })

  return (
    <form
      action={(data) => {
        track("checkout_started", { qty })
        return formAction(data)
      }}
      className="grid gap-6"
    >
      <div className="grid gap-2">
        <Label htmlFor="quantity" className="text-sm font-medium">
          Quantity
        </Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Decrease quantity"
            className="size-11"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
          >
            <Minus className="size-4" aria-hidden />
          </Button>
          <input
            id="quantity"
            name="quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={PRODUCT.maxOnlineQuantity}
            value={qty}
            onChange={(e) => {
              const v = parseInt(e.target.value || "1", 10)
              if (!Number.isNaN(v)) setQty(Math.min(PRODUCT.maxOnlineQuantity, Math.max(1, v)))
            }}
            className="h-11 w-24 rounded-md border border-input bg-background px-3 text-center font-mono nums text-base focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Increase quantity"
            className="size-11"
            onClick={() => setQty((q) => Math.min(PRODUCT.maxOnlineQuantity, q + 1))}
            disabled={qty >= PRODUCT.maxOnlineQuantity}
          >
            <Plus className="size-4" aria-hidden />
          </Button>
          <span className="ml-2 text-xs text-muted-foreground">
            Max {PRODUCT.maxOnlineQuantity} online · larger orders can start in the{" "}
            <a
              href="/v5/forum"
              className="underline underline-offset-2"
            >
              forum
            </a>
          </span>
        </div>
      </div>

      <dl className="grid gap-2 rounded-lg border border-border/75 bg-muted/30 p-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Unit price</dt>
          <dd className="font-mono nums">{formatter.format(unitPrice)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Quantity</dt>
          <dd className="font-mono nums">{qty}</dd>
        </div>
        <div className="flex justify-between border-t border-border/75 pt-2 font-medium">
          <dt>Subtotal</dt>
          <dd className="font-mono nums">{formatter.format(total)}</dd>
        </div>
        <p className="text-xs text-muted-foreground">
          Shipping and tax are calculated by Stripe on the next page.
        </p>
      </dl>

      <SubmitButton />

      <p className="text-center text-xs text-muted-foreground">
        Powered by Stripe · 256-bit TLS · cards, Apple Pay, Google Pay
      </p>
    </form>
  )
}
