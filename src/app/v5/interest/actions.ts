"use server"

import { z } from "zod"

const interestSchema = z.object({
  email: z.email("Enter a valid email address").max(200),
  source: z.string().max(40).optional(),
  website: z.string().max(0).optional().or(z.literal("")),
})

export type InterestState = {
  ok: boolean
  error?: string
}

export async function submitInterest(
  _prev: InterestState | undefined,
  formData: FormData,
): Promise<InterestState> {
  const parsed = interestSchema.safeParse({
    email: formData.get("email"),
    source: formData.get("source") ?? "home",
    website: formData.get("website") ?? "",
  })

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Please enter a valid email.",
    }
  }

  return { ok: true }
}
