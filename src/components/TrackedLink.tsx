"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;

export interface TrackedLinkProps extends Omit<LinkProps, "onClick"> {
  /** Stable id used as the `id` prop on the CTA Click event. */
  ctaId: string;
  /** Where on the page the click came from (e.g. "masthead", "footer-cta"). */
  location: string;
}

/**
 * Wraps next/link and fires a CTA Click analytics event before navigation.
 * Use inside server-rendered pages where wiring up onClick directly would
 * otherwise require flipping the whole component to "use client".
 */
export function TrackedLink({
  ctaId,
  location,
  href,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      onClick={() =>
        track({
          name: "CTA Click",
          props: {
            id: ctaId,
            location,
            href: typeof href === "string" ? href : undefined,
          },
        })
      }
      {...rest}
    >
      {children}
    </Link>
  );
}
