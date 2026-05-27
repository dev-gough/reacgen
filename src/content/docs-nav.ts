export type DocsItem = {
  slug: string
  title: string
  summary: string
}

export type DocsGroup = {
  heading: string
  items: DocsItem[]
}

export const DOCS_NAV: DocsGroup[] = [
  {
    heading: "Getting started",
    items: [
      {
        slug: "",
        title: "Overview",
        summary: "What the Turbid Vision Probe does and how the docs are laid out.",
      },
      {
        slug: "quickstart",
        title: "Quickstart",
        summary: "Unbox the probe and take your first reading in under an hour.",
      },
    ],
  },
  {
    heading: "Integration",
    items: [
      {
        slug: "compatibility",
        title: "Compatibility setup",
        summary: "Wire the Stemma QT cable and expose readings to your host system.",
      },
      {
        slug: "calibration",
        title: "Calibration",
        summary: "Two-point calibration plus the automated OD → g/L biomass fit.",
      },
    ],
  },
  {
    heading: "Reference",
    items: [
      {
        slug: "i2c-reference",
        title: "I2C register map",
        summary: "I2C addresses, register layout, read/write semantics.",
      },
      {
        slug: "troubleshooting",
        title: "Troubleshooting",
        summary: "Common issues and how to recover from them.",
      },
      {
        slug: "datasheet",
        title: "Datasheet PDF",
        summary: "Request the full datasheet by email.",
      },
    ],
  },
]

// Flat, ordered list — used for prev/next + sitemap enumeration.
export const DOCS_FLAT: DocsItem[] = DOCS_NAV.flatMap((g) => g.items)

export function docsHref(slug: string): string {
  return slug ? `/v5/docs/${slug}` : "/v5/docs"
}

export function findDocBySlug(slug: string): {
  item: DocsItem
  index: number
  group: DocsGroup
} | null {
  for (const group of DOCS_NAV) {
    for (const item of group.items) {
      if (item.slug === slug) {
        return {
          item,
          group,
          index: DOCS_FLAT.findIndex((i) => i.slug === slug),
        }
      }
    }
  }
  return null
}

export function prevNext(slug: string): {
  prev: DocsItem | null
  next: DocsItem | null
} {
  const idx = DOCS_FLAT.findIndex((i) => i.slug === slug)
  return {
    prev: idx > 0 ? DOCS_FLAT[idx - 1]! : null,
    next: idx >= 0 && idx < DOCS_FLAT.length - 1 ? DOCS_FLAT[idx + 1]! : null,
  }
}
