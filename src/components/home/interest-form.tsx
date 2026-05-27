"use client"

import * as React from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Bell, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Section } from "@/components/shared/section"
import { submitInterest, type InterestState } from "@/app/v5/interest/actions"
import { track } from "@/lib/analytics"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" className="h-12 px-6 whitespace-nowrap" disabled={pending}>
      <Bell className="size-4" aria-hidden />
      {pending ? "Adding..." : "Notify me"}
    </Button>
  )
}

export function InterestForm() {
  const [state, action] = useActionState<InterestState | undefined, FormData>(
    submitInterest,
    undefined
  )

  React.useEffect(() => {
    if (state?.ok) {
      track("interest_submitted")
    }
  }, [state])

  return (
    <Section className="py-16 sm:py-24">
      <div className="overflow-hidden rounded-2xl border border-border/75 bg-card p-8 sm:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Not ready yet?
            </p>
            <h2 className="mt-3 text-h2 text-balance">
              Get an email when v1 ships.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              One message when production units start going out — that&apos;s it. No
              newsletter, no drip campaign. Same pattern Rafik uses on his other
              projects.
            </p>
          </div>

          <div className="lg:col-span-5">
            {state?.ok ? (
              <div className="rounded-xl border border-primary/40 bg-primary/5 p-5">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="size-5" aria-hidden />
                  <p className="font-medium">You&apos;re on the list.</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  We&apos;ll write back when v1 ships and only then.
                </p>
              </div>
            ) : (
              <form action={action} noValidate className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[10000px] h-0 w-0 opacity-0"
                  aria-hidden
                />
                <input type="hidden" name="source" value="home" />
                <div className="grid gap-2 sm:col-span-2 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="interest-email" className="sr-only">
                      Work email
                    </Label>
                    <Input
                      id="interest-email"
                      name="email"
                      type="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@lab.edu"
                      className="h-12"
                    />
                  </div>
                  <SubmitButton />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
