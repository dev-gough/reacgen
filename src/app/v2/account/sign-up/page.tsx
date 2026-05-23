"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";
import { initialAuthState } from "@/app/actions/auth.types";

const PANEL = "#0C1014";
const GRID = "#1A2128";
const TEXT = "#D4DDE0";
const MUTED = "#5A6770";
const BRAND = "#3DA478";
const HOT = "#7CFFAE";
const WARN = "#F4B860";
const DANGER = "#F47860";

export default function V2SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, initialAuthState);

  return (
    <section className="mx-auto max-w-[64rem] px-6 pt-12 pb-20 md:px-10 md:pt-16">
      <p
        className="text-[10.5px] tracking-[0.18em] uppercase"
        style={{ color: BRAND, fontFamily: "var(--font-v2-mono)" }}
      >
        // auth /register
      </p>
      <h1
        className="mt-5 leading-[0.95] tracking-[-0.01em]"
        style={{
          fontFamily: "var(--font-v2-display)",
          fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
        }}
      >
        provision
        <br />
        <span style={{ color: HOT }}>session</span>
      </h1>
      <p
        className="mt-6 max-w-xl text-[15px] leading-[1.55]"
        style={{ color: MUTED, fontFamily: "var(--font-v2-mono)" }}
      >
        {">"} register a console. existing waitlist entries linked by email will
        attach to your account on first sign-in.
      </p>

      <form
        action={formAction}
        className="mt-12 max-w-2xl border"
        style={{
          borderColor: GRID,
          background: PANEL,
          fontFamily: "var(--font-v2-mono)",
        }}
      >
        <input type="hidden" name="returnTo" value="/v2/account" />

        <div
          className="flex items-center justify-between border-b px-5 py-3 text-[10.5px] tracking-[0.18em] uppercase"
          style={{ borderColor: GRID, color: MUTED }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block size-1.5 rounded-full"
              style={{ background: HOT }}
            />
            <span>tty/auth · provision-new-user</span>
          </div>
          <span>3 fields</span>
        </div>

        <div className="space-y-7 px-5 py-8 md:px-8 md:py-10">
          <Field
            prompt="$ name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Last, First"
            disabled={pending}
            error={state.errors?.name}
          />
          <Field
            prompt="$ email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="user@host.lab"
            disabled={pending}
            error={state.errors?.email}
          />
          <Field
            prompt="$ passphrase"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="≥ 10 characters"
            minLength={10}
            disabled={pending}
            error={state.errors?.password}
          />

          {state.message ? (
            <div
              role="alert"
              className="border px-4 py-3 text-[13px]"
              style={{
                borderColor: state.status === "exists" ? WARN : DANGER,
                color: state.status === "exists" ? WARN : DANGER,
                background:
                  state.status === "exists"
                    ? "rgba(244,184,96,0.06)"
                    : "rgba(244,120,96,0.06)",
              }}
            >
              <span
                className="text-[10.5px] tracking-[0.2em] uppercase block mb-1"
                style={{
                  color: state.status === "exists" ? WARN : HOT,
                }}
              >
                {state.status === "exists"
                  ? "INFO · already_provisioned"
                  : "ERR · provision_failed"}
              </span>
              {state.message}
              {state.status === "exists" ? (
                <>
                  {" "}
                  <Link
                    href="/v2/account/sign-in"
                    className="underline underline-offset-4"
                    style={{ color: HOT }}
                  >
                    /sign-in →
                  </Link>
                </>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <span
              className="text-[11px] tracking-[0.18em] uppercase"
              style={{ color: MUTED }}
            >
              {">"} press ↵ to commit
            </span>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-3 border px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase transition-colors hover:bg-[#7CFFAE] hover:text-[#06080A] disabled:opacity-60"
              style={{
                borderColor: HOT,
                color: HOT,
                background: "transparent",
              }}
            >
              {pending ? "provisioning…" : "provision"}
              <span aria-hidden style={{ color: HOT }}>▸</span>
            </button>
          </div>
        </div>
      </form>

      <p
        className="mt-10 text-[11px] tracking-[0.18em] uppercase"
        style={{ color: MUTED, fontFamily: "var(--font-v2-mono)" }}
      >
        {">"} already registered?{" "}
        <Link
          href="/v2/account/sign-in"
          className="ml-2 underline underline-offset-4"
          style={{ color: HOT }}
        >
          /sign-in
        </Link>
      </p>
    </section>
  );
}

function Field({
  prompt,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  prompt: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[11px] tracking-[0.18em] uppercase"
        style={{ color: BRAND }}
      >
        {prompt}
      </span>
      <input
        {...rest}
        required
        className="w-full border-b bg-transparent px-1 py-2 text-[18px] outline-none transition-colors placeholder:text-[#3A4148] focus:border-[#7CFFAE]"
        style={{
          borderBottomColor: GRID,
          borderBottomWidth: 1,
          color: TEXT,
          fontFamily: "var(--font-v2-mono)",
        }}
      />
      {error ? (
        <small role="alert" style={{ color: DANGER }}>
          {error}
        </small>
      ) : null}
    </label>
  );
}
