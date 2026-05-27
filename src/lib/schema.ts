import { SITE_URL } from "@/lib/env"
import { PRODUCT } from "@/lib/product"
import { SITE } from "@/lib/seo"

const ABSOLUTE = (path: string) => new URL(path, SITE_URL).toString()

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: "Reacgen Biosystems, Inc.",
    url: SITE_URL,
    logo: ABSOLUTE("/logo.png"),
    description: SITE.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@reacgen.com",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [],
  }
}

export function productSchema(price: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT.name,
    description: PRODUCT.shortDescription,
    sku: PRODUCT.slug,
    brand: { "@type": "Brand", name: SITE.name },
    image: [ABSOLUTE("/v5/products/hero.png")],
    category: "Laboratory & Industrial Sensors",
    offers: {
      "@type": "Offer",
      url: ABSOLUTE("/v5/buy"),
      priceCurrency: PRODUCT.currency,
      price: price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: SITE.name },
    },
    additionalProperty: PRODUCT.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  }
}

export function faqSchema(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: ABSOLUTE(c.path),
    })),
  }
}
