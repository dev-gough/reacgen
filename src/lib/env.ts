import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),

  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  STRIPE_PRICE_ID: z.string().min(1).optional(),

  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z
    .string()
    .default("Reacgen Biosystems <noreply@reacgen.com>"),
  SALES_EMAIL: z.string().email().default("sales@reacgen.com"),

  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  PLAUSIBLE_API_KEY: z.string().optional(),

  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),

  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
})

function parseEnv() {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    console.error(
      "Invalid environment variables:",
      z.treeifyError(parsed.error)
    )
    throw new Error("Invalid environment variables")
  }
  return parsed.data
}

export const env = parseEnv()

export const isProd = env.NODE_ENV === "production"
export const SITE_URL = env.NEXT_PUBLIC_SITE_URL
