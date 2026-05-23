"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";
import { initialAuthState } from "@/app/actions/auth.types";

const INK = "#2C2218";
const INK_SOFT = "#74634F";
const HAIR = "#D7CDB9";
const DANGER = "#7A1F1F";

export default function V4SignInPage() {
  const [state, formAction, pending] = useActionState(signIn, initialAuthState);

  return (
    <section className="mx-auto max-w-[72rem] px-6 pt-16 pb-32 md:px-12 md:pt-24">
      <div className="grid grid-cols-12 gap-x-8 gap-y-14">
        <aside className="col-span-12 md:col-span-1">
          <Marginalia label="Sign in" />
        </aside>

        <div className="col-span-12 md:col-span-7">
          <h1
            className="leading-[0.95]"
            style={{
              fontFamily: "var(--font-v4-display)",
              fontWeight: 400,
              fontSize: "clamp(3rem, 7vw, 5.4rem)",
              letterSpacing: "-0.015em",
            }}
          >
            Return,{" "}
            <span style={{ fontStyle: "italic", color: INK_SOFT }}>
              quietly.
            </span>
          </h1>
          <p
            className="mt-10 max-w-md text-[19px] leading-[1.6]"
            style={{ fontFamily: "var(--font-v4-display)", color: INK_SOFT }}
          >
            Your reservations and any instruments on their way to you are kept
            here, waiting.
          </p>
        </div>

        <div className="col-span-12 md:col-span-1" />
        <div className="col-span-12 md:col-span-7">
          <form
            action={formAction}
            className="flex flex-col gap-10"
            style={{ fontFamily: "var(--font-v4-display)" }}
          >
            <input type="hidden" name="returnTo" value="/v4/account" />

            <SerifField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={pending}
              error={state.errors?.email}
            />
            <SerifField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              disabled={pending}
              error={state.errors?.password}
            />

            {state.message ? (
              <p
                role="alert"
                className="text-[15px] italic"
                style={{ color: DANGER, fontFamily: "var(--font-v4-display)" }}
              >
                — {state.message}
              </p>
            ) : null}

            <div
              className="flex flex-wrap items-baseline justify-between gap-6 border-t pt-8"
              style={{ borderColor: HAIR }}
            >
              <p
                className="text-[11px]"
                style={{
                  fontFamily: "var(--font-v4-sans)",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: INK_SOFT,
                }}
              >
                — Tap to return —
              </p>
              <button
                type="submit"
                disabled={pending}
                className="text-[13px] underline underline-offset-8 transition-opacity hover:opacity-60 disabled:opacity-50"
                style={{
                  fontFamily: "var(--font-v4-sans)",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: INK,
                }}
              >
                {pending ? "Returning…" : "Sign in"}
              </button>
            </div>
          </form>

          <p
            className="mt-14 text-[16px] italic"
            style={{ fontFamily: "var(--font-v4-display)", color: INK_SOFT }}
          >
            Not yet enrolled?{" "}
            <Link
              href="/v4/account/sign-up"
              className="not-italic underline underline-offset-4"
              style={{ color: INK }}
            >
              Begin →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function SerifField({
  label,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span
        className="text-[11px]"
        style={{
          fontFamily: "var(--font-v4-sans)",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: INK_SOFT,
        }}
      >
        {label}
      </span>
      <input
        {...rest}
        required
        className="mt-4 w-full border-0 border-b bg-transparent px-1 pb-3 text-[26px] outline-none transition-colors focus:border-[#2C2218]"
        style={{
          borderBottomColor: HAIR,
          borderBottomWidth: 1,
          color: INK,
          fontFamily: "var(--font-v4-display)",
        }}
      />
      {error ? (
        <small
          role="alert"
          className="mt-2 block text-[13px] italic"
          style={{ color: DANGER, fontFamily: "var(--font-v4-display)" }}
        >
          {error}
        </small>
      ) : null}
    </label>
  );
}

function Marginalia({ label }: { label: string }) {
  return (
    <span
      className="block text-[11px]"
      style={{
        fontFamily: "var(--font-v4-sans)",
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: INK_SOFT,
      }}
    >
      {label}
    </span>
  );
}
