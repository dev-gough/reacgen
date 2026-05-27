"use server"

import { z } from "zod"
import { PRODUCT } from "@/lib/product"

const checkoutSchema = z.object({
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Minimum 1 unit")
    .max(
      PRODUCT.maxOnlineQuantity,
      `For more than ${PRODUCT.maxOnlineQuantity} units, please email sales@reacgen.com`,
    ),
})

export type CheckoutState = {
  ok: boolean
  error?: string
}

export async function createCheckoutSession(
  _prev: CheckoutState | undefined,
  formData: FormData,
): Promise<CheckoutState> {
  const parsed = checkoutSchema.safeParse({
    quantity: formData.get("quantity"),
  })

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid request" }
  }

  return {
    ok: false,
    error:
      "Online checkout is not configured in this local environment. Please email sales@reacgen.com.",
  }
}
