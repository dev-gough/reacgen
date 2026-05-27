import type { Metadata } from "next"
import { env, SITE_URL } from "@/lib/env"

export const SITE = {
  name: "Reacgen Biosystems",
  tagline: "An OD sensor that lifts the Pioreactor's density ceiling.",
  description:
    "Reacgen Biosystems makes a top-mounted optical density (OD) sensor for the Pioreactor open-source bioreactor. Plugs into the Stemma QT (I2C) port, stays linear past the stock OD-10 saturation point, ships in 1–2 weeks.",
  twitter: "@reacgen",
} as const

export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE.name} — ${SITE.tagline}`,
      template: `%s — ${SITE.name}`,
    },
    description: SITE.description,
    applicationName: SITE.name,
    generator: "Next.js",
    keywords: [
      "Pioreactor OD sensor",
      "Pioreactor optical density",
      "bioreactor OD sensor",
      "fermentation sensor",
      "cell culture sensor",
      "I2C biomass probe",
      "Reacgen",
      "biotech hardware",
    ],
    authors: [{ name: SITE.name, url: SITE_URL }],
    creator: SITE.name,
    publisher: SITE.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE.name,
      url: SITE_URL,
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
    },
    robots: {
      index: env.NODE_ENV === "production",
      follow: env.NODE_ENV === "production",
      googleBot: {
        index: env.NODE_ENV === "production",
        follow: env.NODE_ENV === "production",
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      email: false,
      telephone: false,
    },
  }
}

export function pageMetadata(opts: {
  title: string
  description?: string
  path?: string
}): Metadata {
  const url = opts.path ? new URL(opts.path, SITE_URL).toString() : SITE_URL
  return {
    title: opts.title,
    description: opts.description ?? SITE.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: opts.title,
      description: opts.description ?? SITE.description,
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description ?? SITE.description,
    },
  }
}
