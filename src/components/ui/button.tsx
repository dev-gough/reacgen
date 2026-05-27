"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import type { ButtonVariant, ButtonSize } from "@/components/ui/button-variants";

export { buttonVariants } from "@/components/ui/button-variants";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  asChild,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, className });

  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
